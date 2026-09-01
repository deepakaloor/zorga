import { audienceLines } from "@/data/content";
import { Ml } from "./Ml";

export function Audience() {
  return (
    <section aria-labelledby="audience-title">
      <div className="wrap border-t border-rule py-[clamp(2.5rem,6vh,4.5rem)] grid12 items-end">
        <h2 id="audience-title" className="col-span-12 lg:col-span-7 t-h1" data-reveal="lines">
          <Ml>Built for</Ml>
          <Ml>people shaping</Ml>
          <Ml>industries<span className="text-blue">.</span></Ml>
        </h2>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-10 lg:mt-0 space-y-3">
          {audienceLines.map((line, i) => (
            <p key={i} className="t-lead text-ink-2" data-reveal style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}>
              {line.map((w, j) => (
                <span key={w}>
                  {w}
                  {j < line.length - 1 && <span aria-hidden className="text-rule-strong"> / </span>}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
