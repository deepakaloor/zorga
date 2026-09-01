/**
 * Concept portfolio data. Presentation renders from these objects; add a
 * future Zorga platform here. Only publicly defensible framing is included:
 * no speakers, dates, venues, partners, endorsements or performance claims.
 */
export type ConceptStatus = "IN DEVELOPMENT" | "PLATFORM CONCEPT DEVELOPED";

export interface Concept {
  id: string;
  order: number;
  name: string;
  fullName: string;
  /** Approved logo asset. `null` = no approved identity exists; set in text only. */
  logo: { src: string; width: number; height: number; onDark?: boolean; alt: string; carriesName?: boolean } | null;
  status: ConceptStatus;
  /** Small marker line, e.g. "INDIA / DEFENCE" */
  marker: string;
  /** The question, as display lines */
  question: string[];
  /** One short explanation, sentence case */
  text: string;
  /** Vocabulary the restrained visual uses */
  words: string[];
}

/** Concepts with a page of their own. IDGS stays homepage-only until its identity exists. */
export const conceptPageIds = ["revx", "ai-waqf", "sourcescape"] as const;
export const conceptHasPage = (id: string) => (conceptPageIds as readonly string[]).includes(id);

export const concepts: Concept[] = [
  {
    id: "idgs",
    order: 1,
    name: "IDGS",
    fullName: "India Defence Growth Summit",
    logo: null,
    status: "IN DEVELOPMENT",
    marker: "INDIA / DEFENCE",
    question: ["What does", "defence growth", "actually require?"],
    text: "A senior platform on the economics of India’s defence and aerospace growth.",
    words: ["CAPITAL", "MARKETS", "CAPABILITY", "GROWTH"],
  },
  {
    id: "revx",
    order: 2,
    name: "RevX",
    fullName: "Revenue Architecture Forum",
    logo: { src: "/logos/revx.svg", width: 388, height: 169, alt: "RevX, Revenue Architecture Forum", carriesName: true },
    status: "PLATFORM CONCEPT DEVELOPED",
    marker: "GCC / REVENUE",
    question: ["What if revenue", "worked as", "one system?"],
    text: "RevX examines revenue as one system across marketing, sales, operations and customer growth.",
    words: ["MARKETING", "SALES", "REVOPS", "CUSTOMER"],
  },
  {
    id: "ai-waqf",
    order: 3,
    name: "AI-WAQF",
    fullName: "AI-WAQF Summit",
    logo: { src: "/logos/ai-waqf.png", width: 762, height: 195, alt: "AI-WAQF Summit", carriesName: true },
    status: "PLATFORM CONCEPT DEVELOPED",
    marker: "ISLAMIC FINANCE / TECHNOLOGY",
    question: ["How does a", "centuries-old", "institution evolve?"],
    text: "AI-WAQF examines Awqaf, the Islamic endowment, through finance, technology, governance and social impact.",
    words: ["FINANCE", "TECHNOLOGY", "GOVERNANCE", "IMPACT"],
  },
  {
    id: "sourcescape",
    order: 4,
    name: "SourceScape",
    fullName: "Hospitality Sourcing Experience",
    logo: { src: "/logos/sourcescape.png", width: 774, height: 87, onDark: true, alt: "SourceScape" },
    status: "PLATFORM CONCEPT DEVELOPED",
    marker: "HOSPITALITY / SOURCING",
    question: ["What if the", "relationship", "was the format?"],
    text: "A hosted sourcing concept centred on better commercial conversations and stronger relationships.",
    words: ["BUYERS", "SUPPLIERS"],
  },
];
