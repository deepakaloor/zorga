import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts, conceptPageIds, conceptHasPage } from "@/data/concepts";
import { conceptPages, type ConceptSection } from "@/data/concept-pages";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/**
 * Standalone concept pages. The full concept lives in server-rendered HTML:
 * hero identity, thesis, structure and Zorga's work, in the same editorial
 * system as the homepage. Nothing implies an executed event.
 */

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return conceptPageIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const page = conceptPages[id];
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: `/concepts/${id}` },
    openGraph: {
      title: `${page.seoTitle} | Zorga`,
      description: page.seoDescription,
      url: `/concepts/${id}`,
      type: "article",
    },
  };
}

function Section({ s }: { s: ConceptSection }) {
  return (
    <section className="wrap pt-[clamp(2.5rem,6vh,4rem)]">
      <div className="sec-bar">
        <span className="t-micro text-mute">{s.title}</span>
      </div>

      {s.kind === "lead" && (
        <div className="grid12 pt-[clamp(1.5rem,4vh,2.5rem)] pb-[clamp(1.5rem,4vh,2.5rem)]">
          <div className="col-span-12 lg:col-span-7 space-y-5">
            {s.paras.map((p, i) => (
              <p key={i} className={i === 0 ? "t-lead max-w-[52ch]" : "t-body max-w-[58ch]"} data-reveal>
                {p}
              </p>
            ))}
          </div>
        </div>
      )}

      {s.kind === "list" && (
        <div className="pt-[clamp(1rem,3vh,1.75rem)] pb-[clamp(1.5rem,4vh,2.5rem)]">
          {s.note && (
            <p className="t-body max-w-[44ch] pb-5" data-reveal>
              {s.note}
            </p>
          )}
          <ul className="lg:max-w-[64%]">
            {s.items.map((w, i) => (
              <li
                key={w}
                className="border-t border-rule py-3"
                data-reveal="fade"
                style={{ ["--reveal-delay" as string]: `${Math.min(i, 5) * 60}ms` }}
              >
                <span className="t-h3">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {s.kind === "inline" && (
        <p className="t-label text-ink-2 pt-[clamp(1.25rem,3vh,2rem)] pb-[clamp(1.5rem,4vh,2.5rem)] max-w-[70ch] leading-loose" data-reveal>
          {s.items.map((w, i) => (
            <span key={w}>
              {w}
              {i < s.items.length - 1 && <span aria-hidden className="text-rule-strong"> / </span>}
            </span>
          ))}
        </p>
      )}

      {s.kind === "pairs" && (
        <dl className="pt-[clamp(1rem,3vh,1.75rem)] pb-[clamp(1.5rem,4vh,2.5rem)]">
          {s.rows.map((r) => (
            <div key={r.label} className="border-t border-rule py-5 grid12 gap-y-2" data-reveal="fade">
              <dt className="col-span-12 md:col-span-4 lg:col-span-3 t-label">{r.label}</dt>
              <dd className="col-span-12 md:col-span-8 lg:col-span-6 t-body max-w-[52ch]">{r.text}</dd>
            </div>
          ))}
        </dl>
      )}

      {s.kind === "bigq" && (
        <ul className="pt-[clamp(1rem,3vh,1.75rem)] pb-[clamp(1.5rem,4vh,2.5rem)]">
          {s.items.map((q, i) => (
            <li key={q} className="border-t border-rule py-[clamp(1.25rem,3.5vh,2.25rem)]" data-reveal="fade" style={{ ["--reveal-delay" as string]: `${Math.min(i, 4) * 60}ms` }}>
              <p className="t-h3 max-w-[26ch]">{q}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default async function ConceptPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const c = concepts.find((c) => c.id === id);
  const page = conceptPages[id];
  if (!c || !page || !conceptHasPage(c.id)) notFound();
  const next = concepts.find((n) => n.id === page.next)!;

  return (
    <>
      <Header />

      <main className="flex-1 pt-16 md:pt-20">
        {/* Back + meta */}
        <div className="wrap pt-6 md:pt-8">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- next/link drops /#hash navigations from other routes */}
          <a href="/#concepts" className="t-micro text-ink-2 u-line inline-flex items-center gap-2">
            <span aria-hidden>←</span> Selected Concepts
          </a>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule pb-4 pt-5">
            <p className="t-micro text-ink-2 annot">{c.marker}</p>
            <p className="t-micro text-mute">{c.status}</p>
          </div>
        </div>

        {/* Concept hero: identity, question, one line. */}
        <div className="wrap pt-[clamp(2rem,5vh,3.5rem)]">
          {c.logo ? (
            <Image
              src={c.logo.src}
              alt={c.logo.alt}
              width={c.logo.width}
              height={c.logo.height}
              priority
              className={`h-auto w-full ${c.logo.width / c.logo.height > 4 ? "max-w-[18rem] md:max-w-[24rem]" : "max-w-[12rem] md:max-w-[16rem]"}`}
            />
          ) : (
            <p className="t-h2">{c.name}</p>
          )}
          {(!c.logo || !c.logo.carriesName) && <p className="t-micro text-ink-2 mt-4">{c.fullName}</p>}

          <h1 className="t-display grid mt-[clamp(2rem,5vh,3.5rem)]">
            {c.question.map((l, i) => (
              <span key={i} className="hero-line"><span>{l}</span></span>
            ))}
          </h1>
          <p className="hero-fade t-lead mt-[clamp(1.75rem,4vh,2.75rem)] max-w-[46ch]">{c.text}</p>
        </div>

        {/* Editorial sections */}
        <div className="pt-[clamp(2rem,5vh,3.5rem)]">
          {page.sections.map((s, i) => (
            <Section key={i} s={s} />
          ))}
        </div>

        {/* Next concept */}
        <div className="wrap pt-[clamp(2rem,5vh,3.5rem)]">
          <div className="sec-bar">
            <span className="t-micro text-mute">Next concept</span>
          </div>
          <Link href={`/concepts/${next.id}`} className="group block pt-[clamp(1.5rem,4vh,2.5rem)] pb-[clamp(2rem,5vh,3.5rem)]">
            <span className="t-micro text-ink-2">{next.marker}</span>
            <span className="t-h2 mt-3 flex flex-wrap items-baseline gap-x-4">
              {next.name}
              <span aria-hidden className="arr inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </Link>
        </div>

        {/* CTA */}
        <div className="wrap border-t border-rule py-[clamp(2.5rem,6vh,4.5rem)] flex flex-wrap items-baseline justify-between gap-6">
          <p className="t-lead text-ink-2" data-reveal>Bring us the question.</p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- next/link drops /#hash navigations from other routes */}
          <a href="/#contact" className="t-label u-line arrow-link inline-flex items-center gap-3 text-ink" data-reveal="fade">
            Start a conversation <span aria-hidden className="arr">→</span>
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}
