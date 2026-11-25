export const education = {
  degree: "B.Tech, Computer Science and Engineering",
  school: "Vellore Institute of Technology, Vellore",
  period: "Class of 2026",
  grade: "CGPA 8.33",
  coursework: [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Computer Networks",
    "Database Systems",
    "Machine Learning",
    "Artificial Intelligence",
    "Software Engineering",
    "Web Technologies",
  ],
};

export const certifications = [
  { title: "Generative AI Leader", issuer: "Google Cloud", date: "Apr 2026" },
  {
    title: "OCI Generative AI Professional",
    issuer: "Oracle",
    date: "Jul 2025",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4EAA05D1470DF9F2F3EAB04361CF6120A4E409A32C80B248D9B742B79CBC1C06",
  },
  {
    title: "McKinsey Forward Program",
    issuer: "McKinsey & Company",
    date: "Jul 2025",
    url: "https://www.credly.com/badges/f4530a79-ae37-4ea2-b2a5-9df37f41ddc2/linked_in?t=sz0nx1",
  },
  {
    title: "Generative AI and LLMs: Architecture and Data Preparation",
    issuer: "IBM",
    date: "2025",
    url: "https://www.coursera.org/account/accomplishments/verify/VYE081TE2HBI",
  },
  { title: "AI for All: From Basics to GenAI Practice", issuer: "NVIDIA" },
] as { title: string; issuer: string; date?: string; url?: string }[];

export const principles = [
  { title: "Reliability first", body: "Idempotency, retries and observability are part of the first version, not an afterthought." },
  { title: "Small, clear contracts", body: "Typed APIs and explicit state make agents and services easy to reason about and test." },
  { title: "Measure, then optimise", body: "Load tests and tracing decide where the effort goes." },
  { title: "Ship with the team", body: "Readable code, written decisions and fast reviews beat heroics." },
];

export const interests = [
  { title: "Tech", body: "Exploring new tools and systems" },
  { title: "Music", body: "Discovering diverse genres" },
  { title: "Cars", body: "Automotive design and engineering" },
  { title: "Badminton", body: "Competitive matches" },
  { title: "Stories", body: "Books, films and narratives" },
];
