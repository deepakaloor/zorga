/**
 * Hero. Three lines, each sized to span the full content width, forming one
 * justified typographic block. On mobile the block and its support line are
 * distributed across the hero region, with only the first line of the next
 * section rising into view at the fold. Intro motion is CSS-only, under a
 * second, then the section is completely still.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-16 md:pt-20">
      <div className="wrap flex flex-col min-h-[calc(76svh-4rem)] md:min-h-0 pt-[clamp(1.5rem,4svh,3.5rem)] pb-8 md:pb-[clamp(2rem,5svh,3.5rem)]">
        <h1 id="hero-title" className="t-hero">
          <span className="hero-line hero-l1"><span>We design what</span></span>
          <span className="hero-line hero-l2"><span>industries</span></span>
          <span className="hero-line hero-l3"><span>gather around<span className="text-blue hero-dot">.</span></span></span>
        </h1>

        <div className="grid12 mt-auto pt-[clamp(1.5rem,4svh,3.5rem)]">
          <p className="hero-fade col-span-12 md:col-span-5 t-lead max-w-[30ch]">
            We develop the idea, structure and model behind new industry platforms.
          </p>
        </div>
      </div>
    </section>
  );
}
