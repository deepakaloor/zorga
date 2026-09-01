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

export const nav = [
  { href: "#approach", label: "Approach" },
  { href: "#concepts", label: "Concepts" },
  { href: "#work", label: "Work with us" },
  { href: "#contact", label: "Contact" },
] as const;
