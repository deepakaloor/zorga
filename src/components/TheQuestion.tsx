"use client";

import { useEffect, useRef, useState } from "react";
import { questionItems } from "@/data/content";
import { Ml } from "./Ml";

/**
 * The one signature scroll moment. A sticky question on the left; the right
 * column moves through four real Zorga fields with clean fades. No pinned
 * theatrics — IntersectionObserver sentinels decide which item is visible.
 * Small screens and reduced motion get a static editorial list instead.
 */
export function TheQuestion() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !("IntersectionObserver" in window)) return;
    const sentinels = Array.from(track.querySelectorAll<HTMLElement>("[data-q-idx]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.qIdx));
        }
      },
      // A narrow band around the viewport centre decides the active item.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sentinels.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const statement = (
    <>
      <span className="block">What should exist</span>
      <span className="block pl-[4vw]">that doesn’t</span>
      <span className="block">exist yet?</span>
    </>
  );

  return (
    <section aria-label="The question">
      <div className="wrap">
        <div className="sec-bar">
          <span className="t-micro text-mute">The question</span>
        </div>
      </div>

      {/* Desktop: sticky statement, right column swaps. */}
      <div ref={trackRef} className="q-desktop relative hidden lg:block" style={{ height: `${questionItems.length * 85}vh` }}>
        <div aria-hidden className="absolute inset-0 grid" style={{ gridTemplateRows: `repeat(${questionItems.length}, 1fr)` }}>
          {questionItems.map((_, i) => (
            <div key={i} data-q-idx={i} />
          ))}
        </div>
        <div className="sticky top-0 h-screen flex items-center">
          <div className="wrap w-full grid12 items-center">
            <h2 className="col-span-7 t-h1">{statement}</h2>
            <div className="col-span-4 col-start-9 relative min-h-[16rem]">
              {questionItems.map((it, i) => (
                <div key={it.field} className={`q-item absolute inset-x-0 top-1/2 -translate-y-1/2 ${active === i ? "is-active" : ""}`} aria-hidden={active !== i}>
                  <p aria-hidden className="h-px w-8 bg-blue" />
                  <p className="t-h2 mt-6">{it.field}</p>
                  <p className="t-body mt-5 max-w-[30ch]">{it.line}</p>
                  <p className="t-micro text-mute mt-6">{it.concept}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Small screens / reduced motion: the same content, composed statically. */}
      <div className="q-static lg:hidden wrap pt-[clamp(3.5rem,10vh,6rem)]">
        <h2 className="t-h1">{statement}</h2>
        <ul className="mt-12">
          {questionItems.map((it) => (
            <li key={it.field} className="border-t border-rule py-9">
              <p className="t-h3 uppercase">{it.field}</p>
              <p className="t-body mt-2">{it.line}</p>
              <p className="t-micro text-mute mt-3">{it.concept}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="wrap pt-[clamp(4rem,12vh,8rem)] pb-[clamp(5rem,16vh,11rem)]">
        <p className="t-display text-right" aria-label="That is where Zorga starts." data-reveal="lines">
          <Ml>That is where</Ml>
          <Ml>Zorga starts<span className="text-blue">.</span></Ml>
        </p>
      </div>
    </section>
  );
}
