/**
 * Standalone concept-page content. Everything here is rendered into
 * server HTML so crawlers and answer engines read the full concept.
 * Only publicly defensible framing: these pages describe concepts and
 * architecture, never executed events, speakers, sponsors or results.
 */

export type ConceptSection =
  | { kind: "lead"; title: string; paras: string[] }
  | { kind: "list"; title: string; items: string[]; note?: string }
  | { kind: "inline"; title: string; items: string[] }
  | { kind: "pairs"; title: string; rows: { label: string; text: string }[] }
  | { kind: "bigq"; title: string; items: string[] };

export interface ConceptPage {
  id: string;
  seoTitle: string;
  seoDescription: string;
  sections: ConceptSection[];
  next: string;
}

export const conceptPages: Record<string, ConceptPage> = {
  idgs: {
    id: "idgs",
    seoTitle: "IDGS | India Defence Growth Summit",
    seoDescription:
      "IDGS is a senior platform in development on the economics of India's defence and aerospace growth: the capital, markets and capability behind it.",
    sections: [
      {
        kind: "lead",
        title: "Why it exists",
        paras: [
          "India's defence and aerospace industry is growing, and the hardest questions now sit around the growth itself. Where does the capital come from? Which markets can Indian capability serve? What does the industrial base need to deliver?",
          "IDGS is being developed as a senior platform for that conversation: the economics of defence growth rather than the hardware.",
        ],
      },
      {
        kind: "pairs",
        title: "The four pillars",
        rows: [
          { label: "Capital", text: "The investment behind defence growth, public and private." },
          { label: "Markets", text: "Where Indian defence capability can compete, at home and abroad." },
          { label: "Capability", text: "The industrial base, technology and talent required to deliver." },
          { label: "Growth", text: "The economics that turn ambition into a sustained industry." },
        ],
      },
      {
        kind: "list",
        title: "Who needs to be in the room",
        items: ["Policy and government", "Industry and manufacturers", "Capital and investors", "Technology and capability partners"],
        note: "Senior leadership across the interests that defence growth actually depends on.",
      },
      {
        kind: "pairs",
        title: "What Zorga is architecting",
        rows: [
          { label: "Thesis", text: "The economics of India's defence and aerospace growth" },
          { label: "Pillars", text: "Capital, markets, capability, growth" },
          { label: "Audience", text: "Senior leadership across policy, industry and capital" },
          { label: "Status", text: "In development" },
        ],
      },
    ],
    next: "revx",
  },

  revx: {
    id: "revx",
    seoTitle: "RevX | Revenue Architecture Forum",
    seoDescription:
      "RevX is a platform concept built around Revenue Architecture: a closed-door senior forum on designing revenue as one system across marketing, sales, RevOps and customer growth.",
    sections: [
      {
        kind: "lead",
        title: "Why it exists",
        paras: [
          "Growth teams often chase the same revenue number through separate systems, data and priorities. Marketing, sales, RevOps, customer success, product and finance all contribute to one commercial outcome, yet rarely operate as one discipline.",
          "RevX was developed around a simple question: what changes when revenue is treated as one operating discipline?",
        ],
      },
      {
        kind: "lead",
        title: "The platform idea",
        paras: [
          "RevX was conceived as a closed-door senior forum built around Revenue Architecture: the practical design of revenue as one system. The intent is working sessions on real revenue problems rather than a generic marketing conference.",
        ],
      },
      {
        kind: "list",
        title: "Who it was designed for",
        items: ["Revenue leadership", "Marketing", "Sales", "RevOps", "Customer success", "Business leadership"],
        note: "Senior commercial decision-makers responsible for revenue performance.",
      },
      {
        kind: "inline",
        title: "Sector relevance",
        items: [
          "Technology and cloud",
          "BFSI and FinTech",
          "Retail and digital commerce",
          "Healthcare",
          "Energy",
          "Real estate",
          "Hospitality",
          "Defence and aerospace",
        ],
      },
      {
        kind: "pairs",
        title: "Format architecture",
        rows: [
          { label: "Blueprint breakouts", text: "Hands-on sessions around specific revenue and go-to-market problems." },
          { label: "Unpanel discussions", text: "A participatory format where audience experience shapes the discussion." },
          { label: "Majlis networking", text: "Smaller settings designed for stronger senior-level conversations." },
          { label: "Visionary keynotes", text: "Macro commercial perspectives from senior leadership." },
        ],
      },
      {
        kind: "list",
        title: "On the table",
        items: [
          "Account-based go-to-market",
          "RevOps and forecast accuracy",
          "AI-powered revenue intelligence",
          "Pipeline acceleration",
          "Demand-to-revenue performance",
          "Retention and expansion",
        ],
      },
      {
        kind: "pairs",
        title: "Zorga's work",
        rows: [
          { label: "Thesis", text: "Revenue Architecture" },
          { label: "Audience", text: "Senior commercial leadership" },
          { label: "Format", text: "Closed-door and problem-led" },
          { label: "Partner model", text: "Expertise-led participation without conventional product pitching" },
          { label: "Experience", text: "Practical discussion rather than passive programming" },
        ],
      },
    ],
    next: "ai-waqf",
  },

  "ai-waqf": {
    id: "ai-waqf",
    seoTitle: "AI-WAQF | Islamic Endowments, Finance and Technology",
    seoDescription:
      "AI-WAQF is a platform concept examining Awqaf, Islamic endowments, through finance, technology, governance and social impact.",
    sections: [
      {
        kind: "lead",
        title: "What Awqaf are",
        paras: [
          "Awqaf are Islamic endowments created to preserve assets or resources for religious, charitable or social purposes. Many hold significant assets, and how those assets are governed, managed and mobilised is a live institutional question.",
        ],
      },
      {
        kind: "lead",
        title: "Why it exists",
        paras: [
          "AI-WAQF explored how artificial intelligence, blockchain and financial technology could address long-standing questions in the sector: transparency, efficiency, governance and the management of Waqf assets.",
          "The tension is real. Technology can modernise how endowments work, but only in ways that respect governance and Shariah integrity.",
        ],
      },
      {
        kind: "bigq",
        title: "The central questions",
        items: [
          "How can digital systems improve Waqf governance?",
          "How can Waqf work more effectively with Islamic finance?",
          "What should regulators address before technology scales?",
          "How can digital tools improve transparency and asset management?",
          "Where do Waqf, Zakat and social finance connect?",
        ],
      },
      {
        kind: "list",
        title: "Who needs to be in the room",
        items: [
          "Government and regulators",
          "Islamic financial institutions",
          "Waqf and Zakat organisations",
          "FinTech, blockchain and AI companies",
          "Asset managers and investment firms",
          "Shariah scholars and academics",
          "Philanthropists and social-impact investors",
        ],
      },
      {
        kind: "inline",
        title: "Key themes",
        items: [
          "Governance and regulation",
          "AI, blockchain and FinTech",
          "Waqf asset management",
          "Islamic finance integration",
          "Cross-border digital transformation",
          "Zakat and social finance",
          "Innovation and social impact",
        ],
      },
      {
        kind: "pairs",
        title: "Zorga's work",
        rows: [
          { label: "Thesis", text: "Modernising Awqaf through finance, governance and technology" },
          { label: "Stakeholders", text: "Institutions, regulators, finance, technology and capital" },
          { label: "Platform", text: "Senior institutional dialogue" },
          { label: "Core tension", text: "Technology without compromising governance and Shariah integrity" },
          { label: "Opportunity", text: "Better transparency, management and social-finance outcomes" },
        ],
      },
    ],
    next: "sourcescape",
  },

  sourcescape: {
    id: "sourcescape",
    seoTitle: "SourceScape | Hospitality Sourcing Platform Concept",
    seoDescription:
      "SourceScape is a hospitality sourcing platform concept built around hosted one-to-one commercial meetings and relationship-building rather than a conventional exhibition floor.",
    sections: [
      {
        kind: "lead",
        title: "Why it exists",
        paras: [
          "SourceScape explored whether hospitality sourcing could move beyond the conventional exhibition floor. Sourcing usually separates the transaction from the relationship. This concept was designed to hold both in one place.",
          "It combined commercial meetings, product and specification conversations, and hosted relationship-building in a single designed experience.",
        ],
      },
      {
        kind: "list",
        title: "The platform idea",
        items: [
          "One-to-one meetings with solution providers",
          "Real-time commercial conversations",
          "Curated introductions",
          "Hosted buyer and supplier interaction",
          "Relationship-building beyond the formal meeting",
        ],
      },
      {
        kind: "pairs",
        title: "The experience model",
        rows: [
          { label: "Arrive", text: "Create familiarity and informal introductions." },
          { label: "Do business", text: "Focused one-to-one sourcing meetings and commercial conversations." },
          { label: "Build relationships", text: "Give conversations room to continue beyond formal meetings." },
        ],
      },
      {
        kind: "list",
        title: "Who it was for",
        items: ["Hospitality buyers", "Solution providers", "Suppliers", "Procurement leadership", "Commercial partners"],
      },
      {
        kind: "pairs",
        title: "Zorga's work",
        rows: [
          { label: "Problem", text: "Sourcing often separates transaction from relationship" },
          { label: "Audience", text: "Hospitality buyers and suppliers" },
          { label: "Format", text: "Hosted one-to-one commercial interaction" },
          { label: "Experience", text: "Formal meetings supported by informal relationship-building" },
          { label: "Commercial idea", text: "Quality of interaction over footfall" },
        ],
      },
    ],
    next: "idgs",
  },
};
