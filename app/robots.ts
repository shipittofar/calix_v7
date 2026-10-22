import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  // Preview and staging deployments set NOINDEX=true.
  if (process.env.NOINDEX === "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  // Pages that must stay out of search results use a noindex robots meta tag rather than
  // Disallow, so crawlers can read it.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
