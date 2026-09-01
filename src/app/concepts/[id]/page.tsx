import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts, conceptPageIds, conceptHasPage } from "@/data/concepts";
import { Wordmark } from "@/components/Logo";
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
      <header className="border-b border-rule">
        <div className="wrap h-16 md:h-20 flex items-center justify-between">
          <Link href="/" aria-label="Zorga home" className="flex items-center">
            <Wordmark height={27} />
          </Link>
          <nav aria-label="Concept page" className="flex items-center gap-8">
            <Link href="/#concepts" className="t-label u-line text-ink">All concepts</Link>
            <Link href="/#contact" className="t-label u-line text-ink hidden sm:inline-flex">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="wrap pt-10 md:pt-14">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule pb-4">
            <p className="t-micro text-ink-2">{c.marker}</p>
            <p className="t-micro text-mute">{c.status}</p>
          </div>
        </div>

        <div className="wrap pt-[clamp(3.5rem,10vh,7rem)]">
          <h1 className="t-display grid">
            {c.question.map((l, i) => (
              <span key={i} className="hero-line"><span>{l}</span></span>
            ))}
          </h1>
          <p className="hero-fade t-lead mt-[clamp(2.5rem,7vh,4.5rem)] max-w-[44ch]">{c.text}</p>
        </div>

        <div className="wrap pt-[clamp(4rem,12vh,8rem)] pb-[clamp(5rem,14vh,10rem)] grid12 items-start">
          <div className="col-span-8 sm:col-span-6 lg:col-span-4" data-reveal="fade">
            {c.logo &&
              (c.logo.onDark ? (
                <div className="bg-ink px-8 py-14 flex items-center">
                  <Image src={c.logo.src} alt={c.logo.alt} width={c.logo.width} height={c.logo.height} className="w-full h-auto" />
                </div>
              ) : (
                <Image src={c.logo.src} alt={c.logo.alt} width={c.logo.width} height={c.logo.height} className="w-full max-w-[18rem] h-auto" />
              ))}
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

        <div className="wrap border-t border-rule py-[clamp(3.5rem,10vh,6.5rem)] flex flex-wrap items-baseline justify-between gap-6">
          <p className="t-lead text-ink-2" data-reveal>Bring us the question.</p>
          <Link href="/#contact" className="t-label u-line arrow-link inline-flex items-center gap-3 text-ink" data-reveal="fade">
            Start a conversation <span aria-hidden className="arr">→</span>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
