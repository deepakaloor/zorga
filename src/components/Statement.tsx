import { Ml } from "./Ml";

/**
 * Second section. One strong editorial statement, then one short line.
 * Whitespace is the composition.
 */
export function Statement() {
  return (
    <section id="statement" aria-labelledby="statement-title">
      <div className="wrap">
        {/* The divider carries the one blue segment; it draws in once on reveal. */}
        <div aria-hidden className="border-t border-rule rule-tick" data-reveal="rule" />
      </div>
      <div className="wrap pt-[clamp(3rem,21.2svh,15rem)] md:pt-[clamp(3.5rem,11vh,7rem)] pb-[clamp(2.5rem,6vh,4.5rem)]">
        <h2 id="statement-title" className="t-display grid" data-reveal="lines">
          <Ml>Before there is</Ml>
          <Ml className="pl-[6vw] md:pl-[9vw]">an event,</Ml>
          <Ml>there is a reason</Ml>
          <Ml className="justify-self-end text-right">to convene.</Ml>
        </h2>
        <p className="t-lead mt-[clamp(2.5rem,6vh,4.5rem)]" data-reveal>Zorga works on that reason.</p>
      </div>
    </section>
  );
}
