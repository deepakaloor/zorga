import Image from "next/image";
import Link from "next/link";
import { concepts, conceptHasPage, type Concept } from "@/data/concepts";
import { Ml } from "./Ml";

/**
 * The evidence section. Four large editorial spreads — no cards, nothing
 * hidden. The homepage carries only the question; the three developed
 * concepts open onto their own pages for the rest.
 */

const byId = (id: string): Concept => {
  const c = concepts.find((c) => c.id === id);
  if (!c) throw new Error(`Unknown concept: ${id}`);
  return c;
};

function Meta({ c }: { c: Concept }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule pt-4">
      <p className="t-micro text-ink-2">{c.marker}</p>
      <p className="t-micro text-mute">{c.status}</p>
    </div>
  );
}

function Question({ c }: { c: Concept }) {
  return (
    <h3 className="t-h2" data-reveal="lines">
      {c.question.map((l, i) => (
        <Ml key={i}>{l}</Ml>
      ))}
    </h3>
  );
}

function ConceptLink({ c }: { c: Concept }) {
  if (!conceptHasPage(c.id)) return null;
  return (
    <p className="mt-10" data-reveal="fade">
      <Link href={`/concepts/${c.id}`} className="t-label u-line arrow-link inline-flex items-center gap-3 text-ink">
        {c.name} in full <span aria-hidden className="arr">→</span>
      </Link>
    </p>
  );
}

export function ConceptSpreads() {
  const idgs = byId("idgs");
  const revx = byId("revx");
  const waqf = byId("ai-waqf");
  const scape = byId("sourcescape");

  return (
    <section id="concepts" aria-labelledby="concepts-title">
      <div className="wrap">
        <div className="sec-bar">
          <span className="t-micro text-mute">Featured platform concepts</span>
        </div>
      </div>

      <div className="wrap pt-[clamp(2rem,5vh,3.5rem)] pb-[clamp(2.5rem,6vh,4.5rem)] grid12 items-end">
        <h2 id="concepts-title" className="col-span-12 lg:col-span-8 t-display" data-reveal="lines">
          <Ml>Featured</Ml>
          <Ml>platform concepts</Ml>
        </h2>
        <p className="col-span-12 lg:col-span-3 lg:col-start-10 t-body max-w-[26ch] mt-8 lg:mt-0 lg:pb-3" data-reveal>
          Different markets. Different questions. The same discipline.
        </p>
      </div>

      {/* IDGS: official logo, concise preview plus its page. */}
      <article className="wrap pb-[clamp(3rem,8vh,6rem)]" aria-label={idgs.fullName}>
        <Meta c={idgs} />
        <div className="grid12 pt-[clamp(2rem,5vh,3.5rem)]">
          <div className="col-span-12 lg:col-span-6">
            <Question c={idgs} />
            <p className="t-body mt-8 max-w-[44ch]" data-reveal>{idgs.text}</p>
            <ConceptLink c={idgs} />
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-12 lg:mt-0">
            <div data-reveal="fade">
              {idgs.logo && (
                <Image src={idgs.logo.src} alt={idgs.logo.alt} width={idgs.logo.width} height={idgs.logo.height} className="w-full max-w-[13rem] sm:max-w-[16rem] h-auto" />
              )}
            </div>
            <p className="t-micro text-ink-2 mt-5" data-reveal="fade">{idgs.fullName}</p>
            <ul className="mt-10">
              {idgs.words.map((w, i) => (
                <li key={w} className="border-t border-rule py-3" data-reveal="fade" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                  <span className="t-h3 uppercase">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {/* RevX — identity left, question right. */}
      <article className="wrap pb-[clamp(3rem,8vh,6rem)]" aria-label={revx.fullName}>
        <Meta c={revx} />
        <div className="grid12 pt-[clamp(2rem,5vh,3.5rem)] items-start">
          <div className="col-span-8 sm:col-span-5 lg:col-span-3" data-reveal="fade">
            {revx.logo && (
              <Image src={revx.logo.src} alt={revx.logo.alt} width={revx.logo.width} height={revx.logo.height} className="w-full max-w-[16rem] h-auto" />
            )}
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 mt-12 lg:mt-0">
            <Question c={revx} />
            <ConceptLink c={revx} />
          </div>
        </div>
      </article>

      {/* AI-WAQF — question left, identity right. */}
      <article className="wrap pb-[clamp(3rem,8vh,6rem)]" aria-label={waqf.fullName}>
        <Meta c={waqf} />
        <div className="grid12 pt-[clamp(2rem,5vh,3.5rem)] items-start">
          <div className="col-span-12 lg:col-span-7">
            <Question c={waqf} />
            <ConceptLink c={waqf} />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-9 mt-12 lg:mt-2" data-reveal="fade">
            {waqf.logo && (
              <Image src={waqf.logo.src} alt={waqf.logo.alt} width={waqf.logo.width} height={waqf.logo.height} className="w-full max-w-[18rem] h-auto" />
            )}
          </div>
        </div>
      </article>

      {/* SourceScape — identity left, question right. */}
      <article className="wrap pb-[clamp(2.5rem,6vh,4.5rem)]" aria-label={scape.fullName}>
        <Meta c={scape} />
        <div className="grid12 pt-[clamp(2rem,5vh,3.5rem)] items-center">
          <div className="col-span-12 sm:col-span-10 lg:col-span-4" data-reveal="fade">
            {scape.logo && (
              <Image src={scape.logo.src} alt={scape.logo.alt} width={scape.logo.width} height={scape.logo.height} className="w-full max-w-[24rem] h-auto" />
            )}
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-6 mt-12 lg:mt-0">
            <Question c={scape} />
            <ConceptLink c={scape} />
          </div>
        </div>
      </article>
    </section>
  );
}
