import { approach } from "@/data/content";
import { Ml } from "./Ml";

/**
 * The thinking before execution — four editorial statements, not workflow
 * steps. Mobile is the primary composition: one clean vertical block per
 * thought. Desktop lets alternate statements move to the right edge.
 */
export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title">
      <div className="wrap">
        <div className="sec-bar">
          <span className="t-micro text-mute">Approach</span>
        </div>
      </div>

      <div className="wrap pt-[clamp(2.5rem,6vh,4.5rem)]">
        <h2 id="approach-title" className="t-display" data-reveal="lines">
          <Ml>Before execution,</Ml>
          <Ml>comes the thinking<span className="text-blue">.</span></Ml>
        </h2>
      </div>

      <div className="wrap pt-[clamp(2rem,5vh,3.5rem)] pb-[clamp(3rem,8vh,6rem)]">
        {approach.map((s, i) => (
          <div
            key={s.title}
            className={`${i > 0 ? "mt-[clamp(3rem,9vh,6.5rem)]" : ""} ${i % 2 === 1 ? "lg:text-right" : ""}`}
          >
            <h3 className="t-h1" data-reveal="lines"><Ml>{s.title}</Ml></h3>
            <p
              className={`t-body mt-4 max-w-[34ch] ${i % 2 === 1 ? "lg:ml-auto" : ""}`}
              data-reveal
              style={{ ["--reveal-delay" as string]: "100ms" }}
            >
              {s.q}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
