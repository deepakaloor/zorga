import { HeroWord } from "./HeroWord";

/**
 * Hero. Three lines, each sized to span the full content width; the middle
 * word rotates through industries / leaders / institutions without moving
 * anything around it. Supporting copy and the Explore link sit below, then
 * the blue-tipped divider leads into the first line of the next section.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-16 md:pt-20">
      <div className="wrap pt-[clamp(2.25rem,13.5svh,9.75rem)] md:pt-[clamp(1.5rem,4svh,3.5rem)] pb-[clamp(2.25rem,13.5svh,9.75rem)] md:pb-[clamp(2rem,5svh,3.5rem)]">
        <h1 id="hero-title" className="t-hero">
          <span className="hero-line hero-l1"><span>We design what</span></span>
          <span className="hero-line hero-l2"><span><HeroWord /></span></span>
          <span className="hero-line hero-l3"><span>gather around<span className="text-blue hero-dot">.</span></span></span>
        </h1>

        <div className="grid12 items-end pt-[clamp(2.5rem,8svh,5.5rem)] md:pt-[clamp(1.5rem,4svh,3.5rem)]">
          <p className="hero-fade col-span-12 md:col-span-5 t-lead max-w-[30ch]">
            We develop the idea, structure and model behind new industry platforms.
          </p>
          <p className="hero-fade col-span-12 md:col-span-4 md:col-start-9 flex md:justify-end mt-8 md:mt-0">
            <a href="#statement" className="t-label u-line arrow-link inline-flex items-center gap-3 text-ink">
              <span aria-hidden className="h-px w-6 bg-blue" />
              Explore Zorga <span aria-hidden className="arr-d">↓</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
