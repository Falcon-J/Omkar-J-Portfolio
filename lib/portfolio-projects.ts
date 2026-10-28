export const projects = [
  {
    id: "saathi",
    title: "Saathi",
    category: "Collaborative workspace",
    tagline: "A little more in sync.",
    description:
      "Tasks, memberships, and invitations, with real-time updates that can find their way back after a disconnect.",
    technologies: "Next.js · TypeScript · PostgreSQL · Redis Streams · SSE",
    source: "https://github.com/Falcon-J/saathi",
    problem:
      "Shared work is only useful when everyone can trust what they are looking at. Reconnecting clients and concurrent edits make that harder than it sounds.",
    decisions: [
      "Cursor-based SSE replay and Redis Streams recover missed events after an interrupted connection.",
      "Expected-version checks protect edits from stale updates; authoritative reconciliation restores saved state.",
      "Supabase Auth establishes identity. Server-side workspace permissions and PostgreSQL transactions protect tasks, memberships, and invitations.",
    ],
    boundary:
      "Explore the implementation and recovery flows in the source repository.",
    cover: "workspace",
  },
  {
    id: "atlaspay",
    title: "AtlasPay",
    category: "Checkout reliability lab",
    tagline: "What happens after failure?",
    description:
      "An event-driven payment workflow exploring durable checkout, duplicate delivery, and recovery across service boundaries.",
    technologies: "Go · Kafka · PostgreSQL · Redis · Docker",
    source: "https://github.com/Falcon-J/AtlasPay",
    live: "https://atlas-pay-two.vercel.app",
    problem:
      "A checkout spans order, payment, and inventory. A process restart or a repeated message must not silently leave the workflow in an inconsistent state.",
    decisions: [
      "Persisted saga state supports recovery across process restarts.",
      "Payment idempotency, bounded retries, inventory compensation, and dead-letter handling address duplicate delivery and partial failures.",
      "Order, payment, and inventory contract smoke tests exercise service interactions.",
    ],
    boundary:
      "Local reliability lab, tested with Docker Compose and service contract smoke tests. Benchmark details are in the résumé.",
    cover: "payment",
  },
  {
    id: "agentarena",
    title: "AgentArena",
    category: "AI orchestration experiment",
    tagline: "Make the reasoning inspectable.",
    description:
      "A trading-analysis orchestrator exploring coordinated strategy agents, recorded outputs, and visible execution state.",
    technologies: "Python · FastAPI · React · PostgreSQL · WebSockets",
    source: "https://github.com/Falcon-J/deepagentarena",
    problem:
      "Multiple agents can produce an answer. Understanding which inputs and contributions produced it is the more interesting engineering problem.",
    decisions: [
      "LangGraph coordination brings strategy agents together around shared execution state.",
      "Recorded market snapshots, outputs, and weighted contributions make analysis inspectable.",
      "WebSocket events expose execution progress in the interface.",
    ],
    boundary:
      "An experimental analysis project. Explore the orchestration and recorded execution state in the source repository.",
    cover: "agents",
  },
] as const;
