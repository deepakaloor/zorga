import type { ReactNode } from "react";

/**
 * One masked line of a display heading. Place inside an element carrying
 * data-reveal="lines"; the inner span rises into view when the heading
 * scrolls in. `className` styles the line box (indents, alignment).
 */
export function Ml({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`ml ${className}`}>
      <span>{children}</span>
    </span>
  );
}
