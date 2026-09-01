import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { concepts, conceptPageIds, conceptHasPage } from "@/data/concepts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/**
 * One page per developed platform concept. The same restraint as the
 * homepage: the question, one explanation, the vocabulary, a way in.
 */

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return conceptPageIds.map((id) => ({ id }));
}


export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const c = concepts.find((c) => c.id === id);
  if (!c) return {};
  return {
    title: c.fullName.toLowerCase().startsWith(c.name.toLowerCase()) ? c.fullName : `${c.name}. ${c.fullName}`,
    description: c.text,
    alternates: { canonical: `/concepts/${c.id}` },
  };
}

export default async function ConceptPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const c = concepts.find((c) => c.id === id);
  if (!c || !conceptHasPage(c.id)) notFound();

  return (
    <>
      <Header />

      <main className="flex-1 pt-16 md:pt-20">
        <div className="wrap pt-8 md:pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule pb-4">
            <p className="t-micro text-ink-2">{c.marker}</p>
            <p className="t-micro text-mute">{c.status}</p>
          </div>
        </div>

        <div className="wrap pt-[clamp(2.5rem,6vh,4.5rem)]">
          <h1 className="t-display grid">
            {c.question.map((l, i) => (
              <span key={i} className="hero-line"><span>{l}</span></span>
            ))}
          </h1>
          <p className="hero-fade t-lead mt-[clamp(2rem,5vh,3.5rem)] max-w-[44ch]">{c.text}</p>
        </div>

        <div className="wrap pt-[clamp(2rem,5vh,3.5rem)] pb-[clamp(3rem,8vh,6rem)] grid12 items-start">
          <div className="col-span-8 sm:col-span-6 lg:col-span-4" data-reveal="fade">
            {c.logo && (
              <Image
                src={c.logo.src}
                alt={c.logo.alt}
                width={c.logo.width}
                height={c.logo.height}
                className={`w-full h-auto ${c.logo.width / c.logo.height > 4 ? "max-w-[26rem]" : "max-w-[18rem]"}`}
              />
            )}
            {!c.logo?.carriesName && <p className="t-micro text-ink-2 mt-6">{c.fullName}</p>}
          </div>
          <ul className="col-span-12 lg:col-span-5 lg:col-start-7 mt-12 lg:mt-0">
            {c.words.map((w, i) => (
              <li key={w} className="border-t border-rule py-3" data-reveal="fade" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <span className="t-h3 uppercase">{w}</span>
              </li>
            ))}
          </ul>
        </div>

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
