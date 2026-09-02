import { HeroWord } from "./HeroWord";

/**
 * Hero. Three lines, each sized to span the full content width; the middle
 * word rotates through industries / leaders / institutions without moving
 * anything around it. Supporting copy below, then a single centred scroll
 * cue leads to the blue-tipped divider and the next section.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-16 md:pt-20">
      <div className="wrap pt-[clamp(2.25rem,13.5svh,9.75rem)] md:pt-[clamp(1.5rem,4svh,3.5rem)] pb-[clamp(2.25rem,13.5svh,9.75rem)] md:pb-[clamp(2rem,5svh,3.5rem)]">
        <h1 id="hero-title" className="t-hero">
          <span className="hero-line hero-l1"><span>We <span className="text-blue">design</span> what</span></span>
          <span className="hero-line hero-l2"><span><HeroWord /></span></span>
          <span className="hero-line hero-l3"><span>gather around<span className="text-blue hero-dot">.</span></span></span>
        </h1>

        <div className="grid12 pt-[clamp(2.5rem,8svh,5.5rem)] md:pt-[clamp(1.5rem,4svh,3.5rem)]">
          <p className="hero-fade col-span-12 md:col-span-5 t-lead max-w-[30ch]">
            We develop the idea, structure and model behind new industry platforms.
          </p>
        </div>

        <p className="hero-fade flex justify-center mt-[clamp(1.75rem,5svh,3rem)] md:mt-[clamp(1.25rem,3svh,2.25rem)]">
          <a href="#statement" aria-label="Continue to the next section" className="scroll-cue p-3 -m-3 text-ink">
            <span aria-hidden>↓</span>
          </a>
        </p>
      </div>
    </section>
  );
}
