/**
 * Hero. Three lines, each sized to span the full content width, forming one
 * justified typographic block that carries about three quarters of the first
 * viewport. No label, no image; the statement is the composition. Intro
 * motion is CSS-only, under a second, then the section is completely still.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-16 md:pt-20">
      <div className="wrap flex min-h-[54svh] md:min-h-[78svh] flex-col justify-between pt-[clamp(1.5rem,4svh,3.5rem)] pb-[clamp(2rem,5svh,3.5rem)]">
        <h1 id="hero-title" className="t-hero">
          <span className="hero-line hero-l1"><span>We design what</span></span>
          <span className="hero-line hero-l2"><span>industries</span></span>
          <span className="hero-line hero-l3"><span>gather around<span className="text-blue">.</span></span></span>
        </h1>

        <div className="grid12 items-end pt-[clamp(2rem,5svh,3.5rem)]">
          <p className="hero-fade col-span-12 md:col-span-5 t-lead max-w-[30ch]">
            We develop the idea, structure and model behind new industry platforms.
          </p>
          <p className="hero-fade col-span-12 md:col-span-4 md:col-start-9 flex md:justify-end mt-8 md:mt-0">
            <a href="#statement" className="t-label u-line arrow-link inline-flex items-center gap-3 text-ink">
              Explore Zorga <span aria-hidden className="arr-d">↓</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
