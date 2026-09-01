import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Footer. Content in its own band; the official wordmark (exact proportions,
 * no effects) printed into the page below it like a watermark. Studio credit
 * bottom-right, deliberately near-invisible.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-rule overflow-hidden">
      <div className="wrap pt-14 md:pt-20 pb-6">
        <div className="grid12 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <p className="t-label">{site.legalLine}</p>
            <p className="t-micro text-ink-2 mt-3">{site.tagline}</p>
          </div>
          <div className="col-span-6 md:col-span-3 md:col-start-7">
            <p className="t-label">{site.domain}</p>
          </div>
          <nav aria-label="Footer" className="col-span-6 md:col-span-2 md:col-start-11 flex flex-col items-start gap-3">
            <Link href="/privacy" className="t-label u-line">Privacy</Link>
            <Link href="/terms" className="t-label u-line">Terms</Link>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- next/link drops /#hash navigations from other routes */}
            <a href="/#contact" className="t-label u-line">Contact</a>
          </nav>
        </div>

        {/* Watermark: official wordmark, aspect 6092:1798, ~88vw, no effects. */}
        <div className="mt-16 md:mt-24 relative left-1/2 -translate-x-1/2 w-[92vw] md:w-[90vw] max-w-none pointer-events-none select-none" aria-hidden="true">
          <Image src="/logos/zorga-wordmark.svg" alt="" width={6092} height={1798} unoptimized className="block w-full h-auto" style={{ opacity: 0.05 }} />
        </div>

        <div className="mt-8 flex items-end justify-between gap-6">
          <p className="t-micro text-mute">© {new Date().getFullYear()} Zorga</p>
          <a
            href="https://pixnut.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mute text-[9px] leading-none tracking-[0.12em] uppercase no-underline hover:underline focus-visible:underline py-2 -my-2"
            style={{ opacity: 0.18 }}
          >
            Crafted by Pixnut
          </a>
        </div>
      </div>
    </footer>
  );
}
