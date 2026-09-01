import { site } from "@/lib/site";

/**
 * Hero. Label, one headline composed with typographic tension across the grid,
 * one supporting thought, one CTA. Spacing is bounded so tall viewports never
 * open a void between the statement and its support line. Intro motion is
 * CSS-only, under a second, then the section is completely still.
 */
export function Hero() {
  return (
    <section id="top" className="relative pt-24 md:pt-32" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="flex items-baseline justify-between gap-6 border-b border-rule pb-4">
          <p className="t-micro text-ink flex items-center gap-4">
            <span aria-hidden className="hero-rule inline-block h-px w-8 bg-blue" />
            <span className="hero-fade">Strategic Platform Architecture</span>
          </p>
          <p className="t-micro text-mute hero-fade hidden sm:block">{site.region}</p>
        </div>

        <h1 id="hero-title" className="t-hero mt-[clamp(2rem,6vh,4rem)] grid">
          <span className="hero-line justify-self-start"><span>We design</span></span>
          <span className="hero-line justify-self-start md:pl-[min(7vw,6rem)]"><span>what industries</span></span>
          <span className="hero-line justify-self-end text-right">
            <span>gather around<span className="text-blue">.</span></span>
          </span>
        </h1>

        <div className="mt-[clamp(3rem,12svh,7.5rem)] pb-[clamp(3rem,8vh,5rem)] grid12 items-end">
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
