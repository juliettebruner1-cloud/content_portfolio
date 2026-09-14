/**
 * Privacy-conscious analytics adapter.
 *
 * Nothing here fingerprints visitors — it fires named events with a
 * small payload. By default events just go to the console in
 * development so you can see the event names while wiring the site up.
 *
 * To connect a real, privacy-conscious analytics tool later (Plausible,
 * Fathom, PostHog in anonymous mode, etc.), implement `dispatch` to call
 * that tool's script and leave every `track(...)` call in the app
 * exactly as-is — the event names below are the full contract.
 */
export type AnalyticsEvent =
  | { name: "visitor_intent_selected"; intent: string }
  | { name: "portfolio_filter_used"; category: string }
  | { name: "search_used"; query: string }
  | { name: "video_opened"; projectId: string }
  | { name: "case_study_opened"; slug: string }
  | { name: "resume_downloaded" }
  | { name: "resume_viewed" }
  | { name: "contact_cta_clicked"; intent: string }
  | { name: "contact_form_submitted"; intent: string }
  | { name: "curated_view_generated"; audience: string; industry?: string }
  | { name: "curated_view_reset" }
  | { name: "brand_fit_selected"; industry: string }
  | { name: "compare_used"; projectIds: string[] };

function dispatch(event: AnalyticsEvent) {
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event.name, event);
  }
  // Wire a real provider here when one is added, e.g.:
  // window.plausible?.(event.name, { props: event });
}

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  try {
    dispatch(event);
  } catch {
    // analytics must never break the site
  }
}
