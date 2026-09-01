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
  /** Approved logo asset. */
  logo: { src: string; width: number; height: number; alt: string; carriesName?: boolean } | null;
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

/** Concepts with a standalone page. IDGS has one too; its page stays text-only until an identity exists. */
export const conceptPageIds = ["idgs", "revx", "ai-waqf", "sourcescape"] as const;
export const conceptHasPage = (id: string) => (conceptPageIds as readonly string[]).includes(id);

export const concepts: Concept[] = [
  {
    id: "idgs",
    order: 1,
    name: "IDGS",
    fullName: "India Defence Growth Summit",
    logo: { src: "/logos/idgs.webp", width: 794, height: 250, alt: "IDGS" },
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
    marker: "REVENUE / GCC",
    question: ["What if revenue", "worked as", "one system?"],
    text: "RevX examines revenue as one system across marketing, sales, operations and customer growth.",
    words: ["MARKETING", "SALES", "REVOPS", "CUSTOMER"],
  },
  {
    id: "ai-waqf",
    order: 3,
    name: "AI-WAQF",
    fullName: "AI-WAQF Summit",
    logo: { src: "/logos/ai-waqf.webp", width: 762, height: 195, alt: "AI-WAQF Summit", carriesName: true },
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
    logo: { src: "/logos/sourcescape-black.webp", width: 900, height: 111, alt: "SourceScape" },
    status: "PLATFORM CONCEPT DEVELOPED",
    marker: "HOSPITALITY / SOURCING",
    question: ["What if the", "relationship", "was the format?"],
    text: "A hosted sourcing concept centred on better commercial conversations and stronger relationships.",
    words: ["BUYERS", "SUPPLIERS"],
  },
];
