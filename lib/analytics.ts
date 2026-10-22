/**
 * Conversion events (docs/conversion-audit.md §6). Event names supersede the
 * draft names in docs/conversion-strategy.md §7.1.
 *
 * No analytics provider is configured, so events are only dispatched in the page
 * as a "calix:analytics" DOM event (used by tests and, later, by the provider
 * adapter). Nothing is sent, stored or written to cookies. When a provider is
 * chosen, forward events in `sendToProvider` and load it only after any consent
 * the provider requires.
 *
 * Properties are a closed, non-personal set: never names, emails, companies or
 * free-text answers.
 */

export type AnalyticsEvent =
  | "primary_cta_clicked"
  | "service_page_viewed"
  | "case_study_opened"
  | "project_form_started"
  | "project_form_submitted";

export type AnalyticsProps = {
  location?: string; // where a CTA sits: header, hero, page-header, cta-band, home-final, sequence, work-gap
  label?: string; // the CTA's visible label
  service?: string; // service key, e.g. "web"
  services?: string; // comma-separated service keys
  timeline?: string; // timeline option value
  slug?: string; // case-study slug
};

export type AnalyticsDetail = { event: AnalyticsEvent; props: AnalyticsProps & { path: string } };

function sendToProvider(detail: AnalyticsDetail) {
  // Intentionally empty until a provider and consent approach are decided.
  void detail;
}

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;
  const detail: AnalyticsDetail = { event, props: { ...props, path: window.location.pathname } };
  window.dispatchEvent(new CustomEvent<AnalyticsDetail>("calix:analytics", { detail }));
  sendToProvider(detail);
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, detail.props);
}
