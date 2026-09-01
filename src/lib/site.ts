/**
 * Site-level configuration. Anything that may need to change before
 * launch (legal line, contact routing, canonical URL) lives here or in env.
 */
export const site = {
  name: "Zorga",
  tagline: "Strategic Platform Architecture",
  title: "Zorga | Strategic Platform Architecture",
  description:
    "Zorga develops the idea, structure and model behind new industry platforms.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zorga.co",
  domain: "zorga.co",
  /** Keep conservative until legal status is confirmed for publication. */
  legalLine: process.env.NEXT_PUBLIC_LEGAL_LINE ?? "ZORGA / United Arab Emirates",
  region: "United Arab Emirates",
} as const;

/**
 * Primary navigation. Root-relative hashes so the same header works from any
 * route: on the homepage the browser treats them as in-page scrolls, from any
 * other page they perform a normal navigation to the homepage section.
 */
export const nav = [
  { href: "/#approach", label: "Approach" },
  { href: "/#concepts", label: "Concepts" },
  { href: "/#work", label: "Work with us" },
  { href: "/#contact", label: "Contact" },
] as const;
