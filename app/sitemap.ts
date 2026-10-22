import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { projects, workGateMet } from "@/content/work";
import { articles, insightsGateMet } from "@/content/insights";
import { siteUrl } from "@/lib/site-url";

/** Indexable routes only. Gated archives and fixtures are excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/studio",
    "/contact",
    "/privacy",
    ...(workGateMet ? ["/work", ...projects.filter((p) => !p.fixture).map((p) => `/work/${p.slug}`)] : []),
    ...(insightsGateMet ? ["/insights", ...articles.filter((a) => !a.fixture).map((a) => `/insights/${a.slug}`)] : []),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path === "/" ? "" : path}` }));
}
