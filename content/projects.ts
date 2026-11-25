export type Project = {
  slug: string;
  title: string;
  summary: string;
  /** One measurable result, shown on cards. */
  impact: string;
  highlights: string[];
  stack: string[];
  repo: string;
  live?: string;
  /** Optional screenshot in /public. Without one, a generated cover is shown. */
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "atlaspay",
    title: "AtlasPay",
    summary:
      "Distributed payment platform with event-driven checkout and fault-tolerant transaction handling.",
    impact: "~12.5k RPM across 4 services in load tests",
    highlights: [
      "Kafka-backed checkout across 4 services handling ~12.5k requests per minute in k6 load tests.",
      "Idempotency keys, retries and failure handling for reliable payment workflows.",
      "10+ service-interaction scenarios validated with Docker-based integration tests.",
    ],
    stack: ["Go", "Kafka", "PostgreSQL", "Redis", "Docker", "k6"],
    repo: "https://github.com/Falcon-J/AtlasPay",
    live: "https://atlas-pay-two.vercel.app",
    featured: true,
  },
  {
    slug: "agentarena",
    title: "AgentArena",
    summary:
      "Auditable multi-agent trading-analysis orchestrator with deterministic strategy runs and live execution state.",
    impact: "15 strategy agents run concurrently with deterministic replay",
    highlights: [
      "Coordination layer running 15 strategy agents concurrently via LangGraph fan-out and shared state.",
      "Auditable persistence of market snapshots, agent outputs and weighted contributions, with deterministic replay.",
      "TTL-bound encrypted in-memory credentials and ordered execution events streamed over WebSockets.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "React", "PostgreSQL", "WebSockets"],
    repo: "https://github.com/Falcon-J/deepagentarena",
    featured: true,
  },
  {
    slug: "saathi",
    title: "Saathi",
    summary: "Collaborative task manager with real-time updates over Redis Streams and Server-Sent Events.",
    impact: "~50 ms real-time updates for 200+ concurrent users in testing",
    highlights: [
      "Event-driven backend supporting 200+ concurrent users in testing.",
      "~50 ms real-time updates delivered with Server-Sent Events.",
      "3 serverless workflows built on Next.js Server Actions.",
    ],
    stack: ["Next.js", "TypeScript", "Redis Streams", "SSE", "Server Actions"],
    repo: "https://github.com/Falcon-J/saathi",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
