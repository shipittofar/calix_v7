import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } from "next/constants";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // A full nonce-based Content-Security-Policy is planned (docs/implementation-plan.md §14.1).
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
];

/**
 * The olive story on the home page uses generated imagery of a person, which
 * docs/imagery-direction.md §5 does not allow on the public site. It is included only in:
 * - `next dev`, unless STORY_PREVIEW=false;
 * - production builds with STORY_PREVIEW=true, which must also set NOINDEX=true (preview only).
 * Otherwise components/home/story/StorySlot resolves to an empty stand-in, so neither the section
 * nor its images and motion code are in the build output. See docs/olive-story.md.
 *
 * Preview builds are written to PREVIEW_DIST_DIR, not .next. The pages are prerendered, so a
 * build's story and noindex settings are fixed in its output: if a preview build replaced .next, a
 * plain `next start` (the production process) would serve the story with noindex on every page.
 * `next start` with STORY_PREVIEW=true serves the preview output, and also requires NOINDEX=true.
 */
const PREVIEW_DIST_DIR = ".next-preview";

function isPreview(phase: string) {
  if (phase !== PHASE_PRODUCTION_BUILD && phase !== PHASE_PRODUCTION_SERVER) return false;
  if (process.env.STORY_PREVIEW !== "true") return false;
  if (process.env.NOINDEX !== "true") {
    throw new Error(
      "STORY_PREVIEW=true is for preview builds only and requires NOINDEX=true. The olive story uses generated imagery that is not cleared for the public site (docs/olive-story.md).",
    );
  }
  return true;
}

function storyPreviewEnabled(phase: string) {
  if (phase === PHASE_DEVELOPMENT_SERVER) return process.env.STORY_PREVIEW !== "false";
  return isPreview(phase);
}

const nextConfig: NextConfig = {
  // Cache Components is deliberately off: with it enabled, a no-JavaScript submission of
  // the enquiry form loses its validation state on re-render (verified on 16.4.0).
  // The form must work without JavaScript (docs/conversion-strategy.md §4.3).
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default function config(phase: string): NextConfig {
  if (isPreview(phase)) return { ...nextConfig, distDir: PREVIEW_DIST_DIR };
  if (storyPreviewEnabled(phase)) return nextConfig;
  return {
    ...nextConfig,
    turbopack: {
      ...nextConfig.turbopack,
      resolveAlias: { "@/components/home/story/StorySlot": "./components/home/story/StorySlot.off.tsx" },
    },
  };
}
