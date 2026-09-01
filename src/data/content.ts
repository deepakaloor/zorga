/** Copy blocks. Kept out of components so wording can be edited without touching layout. */

/** Approach — editorial statements, not workflow steps. No numbering. */
export const approach = [
  { title: "Find the reason", q: "What has changed enough to justify a platform?" },
  { title: "Define the room", q: "Who genuinely needs to be part of it?" },
  { title: "Build the proposition", q: "Why should they participate?" },
  { title: "Create the model", q: "How does it create strategic and commercial value?" },
] as const;

/** The Question — the four fields Zorga has already asked it in. */
export const questionItems = [
  { field: "Defence", line: "What does defence growth actually require?", concept: "IDGS, in development" },
  { field: "Revenue", line: "What if revenue worked as one system?", concept: "RevX, platform concept" },
  { field: "Islamic Finance", line: "How does a centuries-old institution evolve?", concept: "AI-WAQF, platform concept" },
  { field: "Hospitality", line: "What if the relationship was the format?", concept: "SourceScape, platform concept" },
] as const;

/** Quiet editorial band. Short and substantive; no filler terms. */
export const crawlTerms = [
  "DEFENCE",
  "CAPITAL",
  "MARKETS",
  "HOSPITALITY",
  "REVENUE",
  "POLICY",
  "INSTITUTIONS",
  "SOURCING",
  "COMMERCE",
  "TECHNOLOGY",
] as const;

export const ways = [
  { name: "Originate", text: "Create a platform from an opportunity." },
  { name: "Co-create", text: "Build around a shared objective." },
  { name: "Architect", text: "Rethink an existing platform." },
  { name: "Partner", text: "Bring a Zorga concept to market." },
] as const;

export const audienceLines = [
  ["Governments", "Institutions", "Industry", "Capital"],
  ["Corporations", "Associations", "Strategic Partners"],
] as const;
