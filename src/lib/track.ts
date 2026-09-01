/**
 * Analytics preparation. No third-party tracking is loaded.
 * Events are dispatched on `window` and pushed to `dataLayer` if one exists,
 * so a future analytics integration can subscribe without touching components.
 */
export type TrackEvent =
  | "hero_explore"
  | "concept_select"
  | "engagement_interact"
  | "contact_start"
  | "contact_submit"
  | "contact_success"
  | "contact_error";

export function track(event: TrackEvent, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("zorga:track", { detail: { event, ...detail } }));
  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: `zorga_${event}`, ...detail });
}
