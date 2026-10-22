import type { Metadata } from "next";
import { site } from "@/content/site";

export const TITLE_SUFFIX = " — CALIX";

/**
 * Consistent per-page metadata (docs/seo-audit.md): unique title and
 * description, a self-referencing canonical, Open Graph and Twitter tags.
 * Every page shares one social image made from the real logo artwork
 * (public/brand/og-default.png, generated with the calix-logo placement script).
 */
const shareImage = { url: "/brand/og-default.png", width: 1200, height: 630, alt: "CALIX creative studio logo" };

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noindex = false,
  follow = true,
  type = "website",
  publishedTime,
  authors,
}: {
  title: string;
  description: string;
  /** Canonical path, for example "/services". Omit for pages that should have none. */
  path?: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
  follow?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title}${TITLE_SUFFIX}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      type,
      siteName: site.name,
      locale: "en_GB",
      title: fullTitle,
      description,
      url: path,
      images: [shareImage],
      ...(type === "article" ? { publishedTime, authors } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [shareImage.url] },
    // Preview deployments (NOINDEX=true) stay noindex on every page. Without this fallback, the
    // page-level `robots` key would override the noindex set in app/layout.tsx.
    robots:
      process.env.NOINDEX === "true"
        ? { index: false, follow: false }
        : noindex
          ? { index: false, follow }
          : undefined,
  };
}
