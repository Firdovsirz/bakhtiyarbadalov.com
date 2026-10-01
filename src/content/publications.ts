export type Theme = "edu" | "eco" | "eu";

export const themes: { id: Theme; label: string }[] = [
  { id: "edu", label: "Education and AI" },
  { id: "eco", label: "Economy and sustainability" },
  { id: "eu", label: "Energy and the EU" },
];

type Author = { family: string; initials: string; self?: boolean };

export type Publication = {
  year: number;
  title: string;
  authors: Author[];
  /** Journal or venue as it should appear in citations. */
  venue?: string;
  /** Short line shown on the website when there is no venue. */
  webNote?: string;
  theme: Theme;
};

const me: Author = { family: "Badalov", initials: "B", self: true };
const a = (family: string, initials: string): Author => ({ family, initials });
const RTA = "Reliability: Theory & Applications";

export const publications: Publication[] = [
  { year: 2025, theme: "edu", title: "Causal Evidence on Generative AI in Education", authors: [a("Saikia", "AP"), a("Bairagi", "PP"), a("Kalita", "A"), me], venue: `${RTA} 20 (SI 10)` },
  { year: 2025, theme: "edu", title: "The Role of Artificial Intelligence in Engineering Studies", authors: [me, a("Movsumova", "P")], venue: `${RTA} 20 (SI 7)` },
  { year: 2025, theme: "edu", title: "Intelligent Adaptive Systems for Personalized Education", authors: [a("Ezozbek", "T"), a("Namazov", "S"), me], venue: `${RTA} 20 (SI 7)` },
  { year: 2025, theme: "eco", title: "Exploring the Causal Relationship Between Technology-Intensive Exports and Economic Growth", authors: [a("Eminov", "A"), me, a("Hasanov", "R")], venue: `${RTA} 20 (SI 10)` },
  { year: 2024, theme: "eco", title: "Green Economy as a Means of Ensuring Eco-Friendly Agricultural Production", authors: [a("Eminov", "A"), a("Gojaeva", "E"), a("Gutium", "T"), me, a("Guliyeva", "G")], venue: `${RTA} 19 (SI 6)` },
  { year: 2024, theme: "edu", title: "The Influence of Human Factors on Perception of Sustainability in Educational Technologies", authors: [a("Meshchangina", "E"), me, a("Bisultanova", "A")], venue: `${RTA} 19 (SI 6)` },
  { year: 2024, theme: "eco", title: "Principles of Sustainable Development: Regional Aspect", authors: [a("Gishkaeva", "L"), a("Savina", "N"), me], venue: `${RTA} 19 (SI 6)` },
  { year: 2018, theme: "edu", title: "Azerbaijan Education System: Transition from Traditional to Modern Teaching and Learning Strategies", authors: [a("Musayeva", "A"), a("Jafarov", "E"), me, a("Mammadova", "S")], venue: "HEAd'18, Universitat Politècnica de València" },
  { year: 2012, theme: "eu", title: "The European Union and Russian Federation Energy Relations: Petrification or Revival?", authors: [me], webNote: "Written during his master's at Lund University" },
  { year: 2009, theme: "eu", title: "Europe's Energy Security: Caspian Energy as an Alternative", authors: [me], webNote: "Single-author paper" },
];

/** "A.P. Saikia" style for the website. */
export const webName = (x: Author) => `${x.initials.split("").join(".")}. ${x.family}`;
/** "Saikia AP" style for the CV. */
export const citeName = (x: Author) => `${x.family} ${x.initials}`;

/** Sentence case for CV citations, keeping acronyms and proper nouns. */
const KEEP = new Set(["AI", "EU", "Azerbaijan", "European", "Union", "Russian", "Federation", "Europe's", "Caspian"]);
export const sentenceCase = (title: string) =>
  title
    .split(" ")
    .map((w, i) => (i === 0 || KEEP.has(w.replace(/[?:,]/g, "")) ? w : w.toLowerCase()))
    .join(" ");
