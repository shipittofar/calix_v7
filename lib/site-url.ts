import { site } from "@/content/site";

/**
 * Canonical site origin. SITE_URL overrides it per environment (previews,
 * staging). Without it, production builds use the domain in the founder's
 * specification and development uses localhost.
 */
export const siteUrl = (
  process.env.SITE_URL ?? (process.env.NODE_ENV === "production" ? site.productionUrl : "http://localhost:3000")
).replace(/\/$/, "");
