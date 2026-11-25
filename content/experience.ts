export type Role = {
  title: string;
  org: string;
  start: string;
  end: string;
  bullets: string[];
};

export const work: Role[] = [
  {
    title: "Software Development Engineer I",
    org: "Anarock",
    start: "Jul 2026",
    end: "Present",
    bullets: [
      "Lead backend architecture for an authenticated, production-grade AI assistant hosted on AWS.",
      "Engineer orchestration with FastAPI, LangGraph, Redis and PostgreSQL for reliable multi-turn execution.",
      "Set up API contracts, observability and quality gates to improve reliability across mobile integrations.",
    ],
  },
  {
    title: "Software Engineering Intern",
    org: "Anarock",
    start: "Dec 2025",
    end: "Jun 2026",
    bullets: [
      "Built FastAPI services for AI-driven community workflows covering 5+ use cases.",
      "Engineered LangGraph and LangChain orchestration for 4 facility agents with multi-step conversations.",
      "Made the conversational assistant deterministic and stateful through intent routing and Redis-backed session restore.",
    ],
  },
  {
    title: "AI/ML Intern",
    org: "ForgeAhead Solutions",
    start: "Jun 2025",
    end: "Sep 2025",
    bullets: [
      "Built an agentic pipeline on the OpenRouter API for job-data parsing at 80% accuracy.",
      "Added S-BERT embeddings and OCR to extract keywords, improving semantic-matching precision by 15%.",
      "Tracked 5+ ML dataset versions with MLflow and DagsHub across a 4-person team.",
    ],
  },
];

export const leadership: Role[] = [
  {
    title: "Director of Operations",
    org: "Entrepreneurship Cell, VIT",
    start: "Jul 2024",
    end: "Jun 2025",
    bullets: [
      "Led a 20-member team through 15+ campus-wide events with 1,000+ cumulative attendees.",
      "Standardised processes across 8 departments; cut coordination time by 30% with Google Workspace workflows.",
    ],
  },
  {
    title: "Core Committee Member",
    org: "Entrepreneurship Cell, VIT",
    start: "Feb 2023",
    end: "Jul 2024",
    bullets: [
      "Coordinated 8 departments and 77 core members for flagship events; raised member participation by 40%.",
    ],
  },
  {
    title: "Person of Contact, Technext",
    org: "ICETITE Conference",
    start: "Jun 2023",
    end: "Mar 2024",
    bullets: ["Organised the conference's technology exhibition and coordinated speakers, exhibitors and attendees."],
  },
  {
    title: "Organising Committee Volunteer",
    org: "AGAAZ 7.0, Riviera",
    start: "Feb 2024",
    end: "Feb 2024",
    bullets: ["Helped run Riviera's largest comedy show with 4 headline performers and 1,000+ attendees."],
  },
];

export const awards = [
  {
    title: "Best UI/UX Award, Game Development Track",
    event: "Hackstory Hackathon, VIT",
    year: "2023",
    detail: "Built Mental Quest, an RPG about mental-health awareness, and pitched its business model.",
  },
  {
    title: "2nd Runner-up, Cryptic Hunt 2.0",
    event: "ACM-VIT, graVITas 2023",
    year: "2023",
    detail: "Placed 3rd university-wide in a cryptographic puzzle competition.",
  },
];
