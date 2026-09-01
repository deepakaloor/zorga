import Link from "next/link";
import type { ReactNode } from "react";
import { Wordmark } from "./Logo";
import { Footer } from "./Footer";

export function LegalShell({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-rule">
        <div className="wrap h-16 md:h-[72px] flex items-center justify-between">
          <Link href="/" aria-label="Zorga home"><Wordmark height={27} /></Link>
          <Link href="/" className="t-label u-line">Home</Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="wrap py-[clamp(4rem,10vh,7rem)]">
          <div className="grid12">
            <div className="col-span-12 lg:col-span-4">
              <p className="t-micro text-ink-2 mb-6">{title}</p>
              <h1 className="t-h2">{title}</h1>
              <p className="t-micro text-mute mt-6">Last updated: {updated}</p>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-6 mt-10 lg:mt-0 space-y-5 t-body">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
