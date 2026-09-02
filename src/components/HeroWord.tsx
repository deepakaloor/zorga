"use client";

import { useEffect, useRef } from "react";

/**
 * The one changing word in the hero. Server-rendered and default text is
 * "industries" (the canonical statement); "leaders" and "institutions" are
 * visual alternates only. Editorial replacement: the old word lifts out, the
 * new one rises in. Nothing else in the headline moves. Reduced motion (OS
 * preference or the site's no-motion class) never rotates.
 */
const WORDS = ["industries", "leaders", "institutions"];
const HOLD_MS = 2600;
const OUT_MS = 220;

export function HeroWord() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let i = 0;
    let swap = 0;

    const still = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("no-motion");

    const tick = () => {
      if (still()) return;
      el.classList.add("hw-out");
      swap = window.setTimeout(() => {
        i = (i + 1) % WORDS.length;
        el.textContent = WORDS[i];
        el.classList.toggle("hw-alt", WORDS[i] === "institutions");
        el.classList.remove("hw-out");
        el.classList.add("hw-in");
        void el.offsetWidth; // commit the entry offset before releasing it
        el.classList.remove("hw-in");
      }, OUT_MS);
    };

    const loop = window.setInterval(tick, HOLD_MS);
    return () => {
      window.clearInterval(loop);
      window.clearTimeout(swap);
    };
  }, []);

  return <span ref={ref} className="hw">industries</span>;
}
