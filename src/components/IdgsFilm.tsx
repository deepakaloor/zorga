"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { track } from "@/lib/track";

const VIDEO_SRC = "/media/idgs-intro.mp4";
const POSTER_SRC = "/media/idgs-intro-poster.png";

export function IdgsFilm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previewRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const trackedOpenRef = useRef(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const isOpen = searchParams.get("video") === "intro";

  const setVideoQuery = useCallback((open: boolean, replace = false) => {
    const params = new URLSearchParams(searchParams.toString());
    if (open) params.set("video", "intro");
    else params.delete("video");
    const query = params.toString();
    const href = query ? `${pathname}?${query}` : pathname;
    if (replace) router.replace(href, { scroll: false });
    else router.push(href, { scroll: false });
  }, [pathname, router, searchParams]);

  const openFilm = () => {
    lastFocusRef.current = previewRef.current;
    setLoadFailed(false);
    setVideoQuery(true);
  };

  const closeFilm = useCallback(() => {
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
    setVideoQuery(false, true);
  }, [setVideoQuery]);

  useEffect(() => {
    if (!isOpen) {
      trackedOpenRef.current = false;
      return;
    }

    if (!lastFocusRef.current) lastFocusRef.current = document.activeElement as HTMLElement;
    if (!trackedOpenRef.current) {
      track("idgs_video_open");
      trackedOpenRef.current = true;
    }

    const body = document.body;
    const video = videoRef.current;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    const videoTimer = window.setTimeout(() => {
      video?.play().catch(() => {
        // Sound autoplay is intentionally left to browser policy.
      });
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeFilm();
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = document.getElementById("idgs-film-dialog");
      const focusable = dialog?.querySelectorAll<HTMLElement>("button, [href], video, [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.clearTimeout(videoTimer);
      window.removeEventListener("keydown", onKeyDown);
      video?.pause();
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      lastFocusRef.current?.focus?.();
      lastFocusRef.current = null;
    };
  }, [closeFilm, isOpen]);

  const retry = () => {
    setLoadFailed(false);
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => undefined);
  };

  return (
    <>
      <section className="wrap pt-[clamp(2.5rem,6vh,4rem)]" aria-labelledby="idgs-film-label">
        <div className="sec-bar">
          <span id="idgs-film-label" className="t-micro text-mute">IDGS / Film</span>
        </div>
        <button ref={previewRef} type="button" className="idgs-film-preview" onClick={openFilm} aria-haspopup="dialog">
          <Image src={POSTER_SRC} width={1920} height={1080} alt="A precision engineer inspecting an aerospace engine" />
          <span className="idgs-film-preview__cta">
            <span className="idgs-film-preview__play" aria-hidden>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
            </span>
            <span className="idgs-film-preview__label t-micro">Play film</span>
          </span>
        </button>
      </section>

      {isOpen ? (
        <div className="idgs-film-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeFilm(); }}>
          <section id="idgs-film-dialog" className="idgs-film-dialog" role="dialog" aria-modal="true" aria-label="IDGS introduction film">
            <button ref={closeRef} type="button" className="idgs-film-close" onClick={closeFilm} aria-label="Close film">
              <span aria-hidden>×</span>
            </button>
            <video
              ref={videoRef}
              className="idgs-film-player"
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              controls
              playsInline
              preload="metadata"
              onPlay={() => track("idgs_video_play")}
              onEnded={() => track("idgs_video_complete")}
              onLoadStart={() => setLoadFailed(false)}
              onError={() => setLoadFailed(true)}
            />
            {loadFailed ? (
              <div className="idgs-film-error" role="alert">
                <p>Unable to load the film. Please try again.</p>
                <button type="button" className="t-micro u-line" onClick={retry}>Retry</button>
              </div>
            ) : null}
          </section>
        </div>
      ) : null}
    </>
  );
}
