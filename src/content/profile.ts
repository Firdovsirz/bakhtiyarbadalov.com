/**
 * Everything the site and the CV say about Bakhtiyar Badalov lives here.
 * Edit this file (and publications.ts / places.json) to update the site;
 * then run `npm run generate:cv` to refresh the downloadable PDF.
 */

export const site = {
  url: "https://bakhtiyarbadalov.com",
  name: "Bakhtiyar Badalov",
  nativeName: "Bəxtiyar Bədəlov",
  role: "Director, Research, Development & Reputation Department",
  shortRole: "Director · Research, Development & Reputation",
  org: "Azerbaijan Technical University",
  orgShort: "AzTU",
  city: "Baku",
  country: "Azerbaijan",
  description:
    "Bakhtiyar Badalov is Director of the Research, Development and Reputation Department at Azerbaijan Technical University (AzTU) in Baku, working on research development, international partnerships and university rankings.",
  cvPdf: "/Bakhtiyar-Badalov-CV.pdf",
  cvUpdated: "September 2026",
  links: {
    linkedin: "https://www.linkedin.com/in/bakhtiyar-badalov-26747162/",
    linkedinLabel: "bakhtiyar-badalov-26747162",
    scholar: "https://scholar.google.com/citations?user=Yvl8JvoAAAAJ",
    aztu: "https://aztu.edu.az",
  },
  office: "25 Huseyn Javid Avenue, Baku AZ1073, Azerbaijan",
} as const;

/** A bullet with an optional bold lead-in. */
export type Point = { lead?: string; text: string };

export const lede =
  "He leads the department at Azerbaijan Technical University responsible for research development, international partnerships and the university's place in the global rankings. He has worked in university international affairs since 2013.";

export const about = [
  "Bakhtiyar Badalov is Director of the Research, Development and Reputation Department at Azerbaijan Technical University (AzTU) in Baku. The department grows the university's research, builds its partnerships abroad and shapes how rankings bodies, partners and applicants see it.",
  "He came to AzTU from Azerbaijan University, where he directed international affairs from 2013 and coordinated an EU-funded Jean Monnet Module. He has taught EU law, EU politics and Azerbaijani foreign policy at Khazar and Qafqaz universities. He holds a master's in political science from Lund University and is a PhD candidate in international relations at Baku State University.",
];

export const cvProfile =
  "University leader working where research, international partnerships and institutional reputation meet. Director of the Research, Development & Reputation Department at Azerbaijan Technical University (AzTU). More than a decade in university internationalisation at Azerbaijan University, including coordination of an EU Jean Monnet Module. Trained in international relations in Baku and in political science at Lund University, Sweden. PhD candidate in international relations at Baku State University.";

export const record = [
  { value: "2022", label: "Jean Monnet Module selected by the European Commission" },
  { value: "801–850", label: "AzTU in the QS World University Rankings 2027, up from 851–900" },
  { value: "Since 2013", label: "Leading international affairs and partnerships at Azerbaijani universities" },
  { value: "10", label: "Papers on EU energy policy, AI in education and sustainability" },
];

export const mandate = [
  {
    word: "Research",
    lead: "More research, read more widely.",
    text: "Supports AzTU researchers in publishing and collaborating internationally, and publishes on AI in education, sustainability and economic growth himself.",
    points: ["7 co-authored papers in 2024–2025", "Topics include generative AI in education and adaptive learning systems"],
  },
  {
    word: "Development",
    lead: "Partners, programmes and platforms.",
    text: "Opens and develops partnerships with universities abroad, from joint research to double-degree programmes, and builds the university's digital presence.",
    points: [
      "MoU with Universitas Indonesia, May 2025",
      "Joint research and double degrees discussed with the University of Milano-Bicocca, May 2026",
      "AzTU's new official website, launched 7 May 2026",
    ],
  },
  {
    word: "Reputation",
    lead: "Making the work visible.",
    text: "Presents the university's results to ranking agencies, partner universities and future students.",
    points: [
      "QS World University Rankings: 851–900 in 2026, 801–850 in 2027",
      "First QS subject ranking: Computer Science & Information Systems, 701–750",
    ],
  },
];

export type Role = {
  /** Date label on the CV, e.g. "From 2013". */
  period: string;
  /** Date label on the website when it differs from the CV. */
  webPeriod?: string;
  current?: boolean;
  org: string;
  place?: string;
  title?: string;
  points: Point[];
  courses?: string[];
};

export const experience: Role[] = [
  {
    period: "Present",
    webPeriod: "Current role",
    current: true,
    org: "Azerbaijan Technical University",
    place: "Baku",
    title: "Director, Research, Development & Reputation Department",
    points: [
      { text: "Leads research development, international rankings work, partnerships and the university's digital presence. The department was previously named Research & Development." },
      { text: "His department delivered AzTU's new official website, launched on 7 May 2026." },
      { text: "Member of AzTU delegations to Universitas Indonesia (MoU signed, May 2025), UET Lahore in Pakistan, and the University of Milano-Bicocca in Italy (May 2026)." },
      { text: "In this period AzTU entered the QS World University Rankings top 1,000 for the first time (851–900, QS 2026), rose to 801–850 in QS 2027, placed 476th in QS Europe 2026 and entered its first QS subject ranking." },
    ],
  },
  {
    period: "From 2013",
    org: "Azerbaijan University",
    place: "Baku",
    title: "Director of International Affairs; Head, International Relations Department",
    points: [
      { text: "Coordinated the Erasmus+ Jean Monnet Module EUPIA, selected by the European Commission in 2022." },
      { text: "Coordinated the Linnaeus-Palme partnership with Lund University, and TEMPUS projects." },
      { text: "Represented the university in the Erasmus+ PETRA project on teaching and learning, and coordinated its Teaching & Learning Center." },
      { text: "Director of the Career Centre, 2015–2016." },
      { text: "Lecturer in the Faculty of Business and Economics from 2017." },
    ],
    courses: ["Research Methods for Business Students"],
  },
  {
    period: "2020 – 2021",
    org: "Khazar University",
    place: "Baku",
    title: "Lecturer, Political Science & Philosophy",
    points: [],
    courses: ["Foreign Policy of Azerbaijan", "Comparative Regionalism (MA)", "European Politics: Comparative Analysis", "EU Law", "EU Policies and Politics"],
  },
  {
    period: "From 2012",
    org: "Qafqaz University",
    place: "Baku",
    title: "Lecturer, Department of International Relations",
    points: [],
    courses: ["Contemporary International Problems", "Professional Language for Diplomats", "Research Methods", "EU Law"],
  },
  {
    period: "2007 – 2010",
    org: "Early career",
    points: [
      { lead: "Research intern, Energy Research Centre, Qafqaz University", text: " (2008–2009). Researched EU energy security and Azerbaijan's role in it." },
      { lead: "Intern, Ministry of Foreign Affairs of the Republic of Azerbaijan", text: " (2008)." },
      { lead: "Volunteer, transparency NGO", text: " informing citizens of their rights (2007–2010)." },
    ],
  },
];

export type Degree = { period: string; degree: string; field: string; institution: string; place: string; note: string; cvNote?: string };

export const education: Degree[] = [
  {
    period: "In progress",
    degree: "PhD candidate",
    field: "International Relations",
    institution: "Baku State University",
    place: "Baku, Azerbaijan",
    note: "Doctoral research in international relations and political science.",
  },
  {
    period: "2010 – 2012",
    degree: "Master's",
    field: "Political Science",
    institution: "Lund University",
    place: "Lund, Sweden",
    note: "Two-year programme concentrating on European affairs. Thesis on EU–Russia energy relations.",
    cvNote: "Concentration in European affairs. Thesis on EU–Russia energy relations.",
  },
  {
    period: "2004 – 2009",
    degree: "Bachelor's",
    field: "International Relations",
    institution: "Qafqaz University",
    place: "Baku, Azerbaijan",
    note: "Five-year programme covering international law, comparative politics, EU law and economics.",
    cvNote: "Five-year programme.",
  },
];

export type Dated = { year: string; lead: string; text: string; cvText?: string; onCv?: boolean };

export const training: Dated[] = [
  // Listed under "Awards, grants and certification" on the CV, so not repeated there.
  { year: "2021", lead: "IPMA Level C", text: " certification in project management, through AzPMA.", onCv: false },
  { year: "2018", lead: "Erasmus+ PETRA", text: " seminar on teaching and learning, Universitat Politècnica de València, Spain." },
  { year: "2017", lead: "Erasmus+ capacity building", text: " in teaching and learning at the University of Debrecen, Hungary (16–22 October), and Gazi University, Türkiye (20–24 November)." },
  { year: "2014", lead: "TEMPUS", text: " training in EU Studies, University of Social Sciences, Łódź, Poland (27 January – 16 February)." },
  { year: "2013", lead: "TEMPUS", text: " training in European Studies, University of Genoa, Italy (27 May – 6 June)." },
];

export const grants: Dated[] = [
  {
    year: "2022",
    lead: "Jean Monnet Module",
    text: ", Erasmus+ (European Commission). Coordinator of EUPIA at Azerbaijan University.",
    cvText:
      ", Erasmus+ (European Commission). Coordinator of “European Union, its institutions, values and potential: professional implications for Azerbaijan” (EUPIA), Azerbaijan University.",
  },
  { year: "2021", lead: "IPMA Level C", text: " project management certificate.", cvText: " certification in project management, awarded through AzPMA." },
  { year: "2017", lead: "Erasmus+ teaching mobility grant", text: ". Lectures at the Department of International Relations, Anadolu University, Türkiye (2–8 April)." },
  { year: "2017", lead: "Erasmus+ staff training grant", text: ". Cracow University of Economics, Poland (18–24 June)." },
];

export const jeanMonnet = {
  eyebrow: "Erasmus+ · European Commission · 2022",
  title: "Jean Monnet Module EUPIA",
  fullTitle: "European Union, its institutions, values and potential: professional implications for Azerbaijan",
  body: "He coordinated “European Union, its institutions, values and potential: professional implications for Azerbaijan”, selected by the European Commission in 2022. The module builds courses and training that deepen staff and student understanding of the EU and strengthen economic, democratic and social links between Europe and Azerbaijan.",
  note: "Jean Monnet Modules are three-year EU-studies teaching programmes with at least 40 teaching hours a year.",
};

export const rankings = [
  { label: "QS World University Rankings 2027", value: "801–850", note: "Up one band from 851–900 in QS 2026, AzTU's first year in the global top 1,000.", ladder: true },
  { label: "QS Europe 2026", value: "476", suffix: "th", note: "Among European universities, and 30th among universities in Western Asia." },
  { label: "QS Subject Rankings 2026", value: "701–750", note: "Computer Science & Information Systems. AzTU's first entry in a QS subject ranking." },
];

export const languages = [
  { name: "Azerbaijani", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Turkish", level: "Fluent" },
  { name: "Swedish", level: "Intermediate" },
  { name: "Russian", level: "Good written, basic spoken" },
  { name: "German", level: "Basic" },
];

export const interests = [
  "International relations and EU politics",
  "energy security in the Caspian region",
  "AI in engineering education",
  "sustainability and the green economy",
  "university rankings and reputation",
];
