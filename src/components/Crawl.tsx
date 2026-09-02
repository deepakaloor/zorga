import { crawlTerms } from "@/data/content";

/**
 * Quiet editorial band between sections. One very slow horizontal drift,
 * CSS-only. Reduced motion gets a static line (scrollable if it overflows).
 */
export function Crawl() {
  return (
    <div className="crawl w-full border-y border-rule" role="region" aria-label="Fields Zorga works in">
      <div className="crawl-track py-4">
        {[0, 1].map((half) => (
          <ul key={half} className="crawl-half flex items-center shrink-0 whitespace-nowrap" aria-hidden={half === 1}>
            {crawlTerms.map((t, i) => (
              <li key={t} className="t-micro text-ink-2 flex items-center">
                <span className="px-[clamp(1.25rem,2.5vw,2.75rem)]">{t}</span>
                {(i + 1) % 5 === 0 ? (
                  <span aria-hidden className="inline-block size-[4px] bg-blue" />
                ) : (
                  <span aria-hidden className="text-rule-strong">/</span>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
