/**
 * Whether internal content placeholders ("[… to be confirmed]", "Content
 * placeholder" blocks) are shown.
 *
 * Shown in development and on previews (SHOW_CONTENT_PLACEHOLDERS=true), so the
 * gaps in docs/content-gaps.md stay visible for review. Hidden in public
 * production builds, where prospects see honest generic copy instead
 * (docs/conversion-audit.md). Hiding a gap never fills it with invented facts.
 */
export const showInternalPlaceholders =
  process.env.SHOW_CONTENT_PLACEHOLDERS === "true" || process.env.NODE_ENV !== "production";
