import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Spam protection without third-party services (docs/implementation-plan.md §11.3):
 * honeypot, signed render timestamp, per-IP rate limit and link heuristics.
 */

export const HONEYPOT_FIELD = "company_fax";
export const TOKEN_FIELD = "form_token";

const MIN_AGE_MS = 3_000;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

// In development a per-process secret is enough. Production must set FORM_SECRET
// so tokens stay valid across server instances (checked in lib/enquiry/config.ts).
const devSecret = randomBytes(32).toString("hex");

function secret() {
  return process.env.FORM_SECRET || devSecret;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

/** Token embedded in the form when it is rendered. Call only at request time. */
export function createFormToken(now: number = Date.now()) {
  const ts = String(now);
  return `${ts}.${sign(ts)}`;
}

export type TokenCheck = "ok" | "invalid" | "too-fast" | "expired";

/**
 * "invalid" means the token was missing or forged (not our form). "too-fast" and
 * "expired" can happen to people (autofill, a tab left open overnight), so the
 * action answers them with a visible, recoverable message rather than dropping them.
 */
export function checkFormToken(token: string, now: number): TokenCheck {
  const [ts, mac] = token.split(".");
  if (!ts || !mac || !/^\d+$/.test(ts)) return "invalid";
  const expected = Buffer.from(sign(ts));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "invalid";
  const age = now - Number(ts);
  if (age < MIN_AGE_MS) return "too-fast";
  if (age > MAX_AGE_MS) return "expired";
  return "ok";
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/**
 * In-memory limiter: effective per server instance only. Back it with the
 * host's edge rate limiting in production.
 */
export function rateLimited(key: string, now: number): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export function hashKey(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex").slice(0, 32);
}

export function looksLikeLinkSpam(message: string): boolean {
  const links = message.match(/https?:\/\/|www\./gi)?.length ?? 0;
  const withoutLinks = message.replace(/\S*(https?:\/\/|www\.)\S*/gi, "").trim();
  return links > 3 || (links > 0 && withoutLinks.length < 10);
}
