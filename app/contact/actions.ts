"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { deliverEnquiry, mailConfig } from "@/lib/enquiry/mail";
import { readEnquiry, validateEnquiry, type EnquiryState } from "@/lib/enquiry/schema";
import {
  HONEYPOT_FIELD,
  TOKEN_FIELD,
  checkFormToken,
  createFormToken,
  hashKey,
  looksLikeLinkSpam,
  rateLimited,
} from "@/lib/enquiry/spam";

const UNAVAILABLE =
  "We could not send your enquiry just now. Please try again in a few minutes. Your details are still in the form.";
const RESEND = "Please check your details and press Send again. Nothing has been sent yet.";

/**
 * Order matters for lead safety: only the honeypot, which people never see, gets a
 * silent "thank you". Everything a real visitor could trigger (validation, timing,
 * rate limit, delivery) returns a visible, recoverable message, and link-heavy
 * messages are delivered with a flag instead of being dropped.
 */
export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const values = readEnquiry(formData);
  const now = Date.now();

  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.length > 0) {
    console.info("[enquiry] rejected by honeypot");
    redirect("/contact/thank-you");
  }

  const result = validateEnquiry(values);
  if (!result.ok) {
    return { status: "error", errors: result.errors, values };
  }

  const tokenCheck = checkFormToken(String(formData.get(TOKEN_FIELD) ?? ""), now);
  if (tokenCheck === "invalid") {
    // Not submitted through our form: same outcome as a person, so automation learns nothing.
    console.info("[enquiry] rejected: missing or forged form token");
    redirect("/contact/thank-you");
  }
  if (tokenCheck !== "ok") {
    // "too-fast" keeps the rendered token, which is old enough by the time the visitor resends.
    const token = tokenCheck === "expired" ? createFormToken(now) : undefined;
    return { status: "error", errors: {}, formError: RESEND, values, token };
  }

  const requestHeaders = await headers();
  const ip = (requestHeaders.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(hashKey(ip), now)) {
    return {
      status: "error",
      errors: {},
      formError: "Too many enquiries were sent from this connection. Please wait ten minutes and try again.",
      values,
    };
  }

  const config = mailConfig();
  if (!config) {
    console.error("[enquiry] mail delivery is not configured");
    return { status: "error", errors: {}, formError: UNAVAILABLE, values };
  }

  const message = [result.data.goals, result.data.context].filter(Boolean).join("\n");
  const ref = String(formData.get("ref") ?? "").slice(0, 80) || undefined;
  try {
    await deliverEnquiry(config, result.data, { ref, flagged: looksLikeLinkSpam(message) });
  } catch {
    console.error("[enquiry] delivery failed");
    return { status: "error", errors: {}, formError: UNAVAILABLE, values };
  }

  // Non-personal summary for the conversion event (TrackSubmission). Silent rejections above redirect without it.
  const summary = new URLSearchParams({
    submitted: "1",
    services: result.data.services.join(","),
    timeline: result.data.start,
  });
  redirect(`/contact/thank-you?${summary.toString()}`);
}
