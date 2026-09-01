import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function LegalShell({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <div className="wrap py-[clamp(3rem,8vh,6rem)]">
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
