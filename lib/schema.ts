import { siteUrl } from "@/lib/site-url";

/**
 * Stable JSON-LD identifiers, so every page describes the same entity
 * (calix-geo schema patterns). Structured data describes visible content; it
 * does not guarantee rich results, rankings or AI citations.
 */
export const orgId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const pageUrl = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;
export const serviceId = (path: string) => `${pageUrl(path)}#service`;
export const ref = (id: string) => ({ "@id": id });
