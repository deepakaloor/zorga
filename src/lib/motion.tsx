"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * MotionPreferences — single source of truth for reduced-motion.
 * Adds `.no-motion` to <html> so CSS can neutralise transitions/animations,
 * and exposes the flag to components that drive JS animation.
 */
const MotionCtx = createContext<{ reduced: boolean }>({ reduced: false });

export function MotionPreferences({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      document.documentElement.classList.toggle("no-motion", mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return <MotionCtx.Provider value={{ reduced }}>{children}</MotionCtx.Provider>;
}

export function useReducedMotion() {
  return useContext(MotionCtx).reduced;
}
