"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveal — one IntersectionObserver for every [data-reveal] element on the page.
 * CSS owns the transition; this only toggles `.is-in`. Elements stay revealed
 * once seen so nothing disappears while reading.
 *
 * Re-runs on every route change: this component lives in the root layout, so
 * without the pathname dependency, elements rendered by client-side navigation
 * would never be observed and would stay invisible.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      // Large top margin: anything at or above the viewport counts as seen,
      // so fast scrolling can never leave content stuck invisible.
      { rootMargin: "10000px 0px -8% 0px", threshold: 0.01 },
    );
    // Anything already inside the first viewport reveals immediately (hero).
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.classList.contains("is-in")) return;
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add("is-in");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
