import { Ml } from "./Ml";

export function Closing() {
  return (
    <section aria-labelledby="closing-title">
      <div className="wrap border-t border-rule pt-[clamp(5rem,16vh,11rem)] pb-[clamp(3rem,8vh,5rem)]">
        <h2 id="closing-title" className="t-display grid" data-reveal="lines">
          <Ml>The next platform</Ml>
          <Ml className="pl-[5vw] md:pl-[8vw]">starts with</Ml>
          <Ml>the right question<span className="text-blue">.</span></Ml>
        </h2>
        <div className="grid12 mt-[clamp(3rem,8vh,5rem)] items-end">
          <p className="col-span-12 md:col-span-4 t-lead text-ink-2" data-reveal>Bring us the question.</p>
          <p className="col-span-12 md:col-span-5 md:col-start-8 flex md:justify-end mt-8 md:mt-0" data-reveal="fade">
            <a href="#contact" className="t-label u-line arrow-link inline-flex items-center gap-3 text-ink" data-track="contact_start_cta">
              Start a conversation <span aria-hidden className="arr">→</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
