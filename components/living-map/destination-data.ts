import type { MapPlace } from "./map-state";

export const destinationScenes: Record<MapPlace, { title: string; subtitle: string; width: number; height: number; focus: string }> = {
  home: { title: "Meet Omkar", subtitle: "A little beyond the work.", width: 1536, height: 1024, focus: "58%" },
  journey: { title: "Journey", subtitle: "A path still unfolding.", width: 1536, height: 1024, focus: "50%" },
  workshop: { title: "Workshop", subtitle: "The work, and the decisions behind it.", width: 1774, height: 887, focus: "50%" },
  now: { title: "Reading Corner", subtitle: "Ideas worth spending time with.", width: 1672, height: 941, focus: "27%" },
  contact: { title: "Let’s talk", subtitle: "Good conversations can go a long way.", width: 1536, height: 1024, focus: "55%" },
};

export const personalCards = [
  { title: "How I think", label: "01 · Perspective", text: "Understand the why. Make things clear. Get the details right. That is the approach I bring to learning and building.", image: "home", position: "46% 80%" },
  { title: "Always curious", label: "02 · Curiosity", text: "Cars and the engineering behind them. Fiction and nonfiction. There is plenty to explore beyond the screen.", image: "journey", position: "20% 75%" },
  { title: "Off the clock", label: "03 · Life outside work", text: "Music and dance, from Martin Garrix to Arijit Singh. Badminton, cricket and football. A few things we could talk about.", image: "now", position: "14% 65%" },
];

export const legacyInterests = {
  music: { title: "Music & dance", text: "Martin Garrix and Arijit Singh. Send me a playlist when we talk." },
  cars: { title: "Cars", text: "Cars and the engineering behind them are another conversation we could have." },
  sports: { title: "Sports", text: "Badminton, cricket and football." },
  stories: { title: "Stories", text: "Fiction and nonfiction. What are you reading?" },
};

export const milestones = [
  { label: "2004", short: "Beginnings", title: "The beginning", subtitle: "Born", text: "The start of the story, before the code and the systems." },
  { label: "2025–26", short: "Learning", title: "Learning through the work", subtitle: "Anarock · Software Engineering Intern", text: "December 2025–June 2026. FastAPI services, facility workflows, typed contracts and Redis-backed context." },
  { label: "2026", short: "Graduation", title: "Vellore Institute of Technology", subtitle: "B.Tech · Computer Science and Engineering", text: "July 2026. A foundation for the products and systems that followed." },
  { label: "Today", short: "Building", title: "Building at Anarock", subtitle: "Software Development Engineer I", text: "July 2026–present. Configurable editors, tenant-scoped APIs, campus discovery and mobile WebView experiences, alongside dependable execution boundaries for AI workflows." },
  { label: "Next", short: "Aspiration", title: "Still becoming", subtitle: "Aspiration", text: "More depth, more ownership and more dependable systems. There is plenty left to learn.", future: true },
];

export const toolkit = [
  ["Programming languages", "Python · Go · C · C++ · Java · TypeScript · JavaScript · SQL"],
  ["Web and backend", "Node.js · React · Next.js · Angular · REST APIs"],
  ["AI and machine learning", "LangGraph · LangChain · OpenRouter · OCR · S-BERT · MLflow · DagsHub"],
  ["Cloud and development", "GCP · AWS · Docker · Git · GitHub"],
  ["Databases and persistence", "MySQL · PostgreSQL · MongoDB · Redis · Firebase"],
  ["Core concepts", "Data structures and algorithms · System design · Distributed systems · Networking · Object-oriented programming"],
];
