"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Logo";
import { nav } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = nav
      .map((n) => document.getElementById(n.href.split("#")[1] ?? ""))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(`/#${hit.target.id}`);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? "bg-white border-b border-rule" : "border-b border-transparent"}`}>
      <div className="wrap flex items-center justify-between h-16 md:h-20">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full navigation guarantees a clean homepage state (next/link can resurrect a stale hash) */}
        <a href="/" aria-label="Zorga home" className="flex items-center">
          <Wordmark height={27} />
        </a>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-10">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="t-label u-line text-ink" aria-current={active === n.href ? "true" : undefined}>
              {n.label}
            </a>
          ))}
        </nav>

        <button type="button" className="md:hidden t-label flex items-center gap-3" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)}>
          <span>{open ? "Close" : "Menu"}</span>
          <span aria-hidden className="relative block w-5 h-[9px]">
            <span className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`absolute left-0 bottom-0 h-px w-full bg-ink transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div id="mobile-nav" hidden={!open} className="md:hidden bg-white border-t border-rule">
        <nav aria-label="Primary mobile" className="wrap py-8 flex flex-col gap-6">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="t-h2" onClick={() => setOpen(false)}>{n.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
