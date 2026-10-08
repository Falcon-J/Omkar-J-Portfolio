import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  proof: string;
  technologies: string[];
  github: string;
  live?: string;
  visual: "payments" | "collaboration" | "agents";
};

const projects: Project[] = [
  {
    number: "01",
    name: "AtlasPay",
    category: "Distributed systems",
    description:
      "A distributed checkout and payments platform designed around idempotency, retries, and reliable transaction processing.",
    proof: "Around 12.5k requests per minute in local load tests.",
    technologies: ["Go", "Kafka", "PostgreSQL", "Redis"],
    github: "https://github.com/Falcon-J/AtlasPay",
    live: "https://atlas-pay-two.vercel.app",
    visual: "payments",
  },
  {
    number: "02",
    name: "Saathi",
    category: "Realtime collaboration",
    description:
      "A collaborative task manager that uses event streams and server sent events to keep multiple clients in sync.",
    proof: "Tested with 200+ concurrent users.",
    technologies: ["Next.js", "TypeScript", "Redis Streams", "SSE"],
    github: "https://github.com/Falcon-J/saathi",
    visual: "collaboration",
  },
  {
    number: "03",
    name: "AgentArena",
    category: "Agent orchestration",
    description:
      "An auditable multiagent analysis system with concurrent execution, persisted run state, and deterministic replay.",
    proof: "Coordinates 15 strategy agents in parallel.",
    technologies: ["Python", "LangGraph", "FastAPI", "WebSockets"],
    github: "https://github.com/Falcon-J/deepagentarena",
    visual: "agents",
  },
];

const experience = [
  {
    role: "Software Development Engineer I",
    organization: "ANAROCK",
    duration: "Jul 2026 — Present",
    description:
      "Engineering backend services and production AI workflows, with an emphasis on state, reliability, and integration boundaries.",
  },
  {
    role: "Software Engineering Intern",
    organization: "ANAROCK",
    duration: "Dec 2025 — Jun 2026",
    description:
      "Built authenticated conversational workflows and service integrations using FastAPI, LangGraph, Redis, and PostgreSQL.",
  },
  {
    role: "AI/ML Intern",
    organization: "ForgeAhead Solutions",
    duration: "Jun 2025 — Sep 2025",
    description:
      "Worked on agentic data processing, semantic matching, and evaluation of extraction pipelines.",
  },
];

const principles = [
  {
    title: "Make state explicit",
    description:
      "Reliable systems start with clear ownership, deterministic transitions, and carefully defined contracts.",
    icon: Workflow,
  },
  {
    title: "Design for failure",
    description:
      "Retries, duplicate events, partial failures, and recovery paths deserve as much attention as the happy path.",
    icon: ShieldCheck,
  },
  {
    title: "Measure what matters",
    description:
      "Performance numbers mean more when they are reproducible, observable, and tied to a real workload.",
    icon: Network,
  },
];

function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  if (visual === "payments") {
    return (
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-[#eaf0fc] px-6 dark:bg-[#172541]" aria-hidden="true">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(#9bb4e7_1px,transparent_1px),linear-gradient(90deg,#9bb4e7_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative flex w-full max-w-sm items-center justify-between gap-1 text-center text-[10px] font-semibold tracking-wide text-[#234c96] dark:text-[#a8c5ff] sm:text-xs">
          <div className="rounded-xl border border-[#b6c9ee] bg-white px-3 py-4 shadow-sm dark:border-[#4a648c] dark:bg-[#243550]">CLIENT</div>
          <div className="h-px flex-1 bg-[#7c9fdf]" />
          <div className="rounded-xl border border-[#b6c9ee] bg-white px-3 py-4 shadow-sm dark:border-[#4a648c] dark:bg-[#243550]">API</div>
          <div className="h-px flex-1 bg-[#7c9fdf]" />
          <div className="rounded-xl border border-[#b6c9ee] bg-white px-3 py-4 shadow-sm dark:border-[#4a648c] dark:bg-[#243550]">EVENTS</div>
          <div className="h-px flex-1 bg-[#7c9fdf]" />
          <div className="rounded-xl border border-[#b6c9ee] bg-white px-3 py-4 shadow-sm dark:border-[#4a648c] dark:bg-[#243550]">LEDGER</div>
        </div>
        <span className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#456596] dark:text-[#93b5f2]">Conceptual event flow</span>
      </div>
    );
  }

  if (visual === "collaboration") {
    return (
      <div className="relative flex h-48 items-center justify-center bg-[#e8f4f1] px-7 dark:bg-[#15332d]" aria-hidden="true">
        <div className="w-full max-w-sm rounded-xl border border-[#bbd9d0] bg-white/90 p-4 shadow-sm dark:border-[#35675e] dark:bg-[#233f39]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2c6255] dark:text-[#b0e2d2]">Team workspace</span>
            <span className="flex items-center gap-1 text-[10px] text-[#438974] dark:text-[#89d5bf]"><span className="h-1.5 w-1.5 rounded-full bg-[#3da88a]" /> Live sync</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-md bg-[#ecf6f2] px-3 py-2 text-[11px] text-[#2c6255] dark:bg-[#34574d] dark:text-[#d0f0e6]"><span>Review API contracts</span><span>Done</span></div>
            <div className="flex items-center justify-between rounded-md bg-[#ecf6f2] px-3 py-2 text-[11px] text-[#2c6255] dark:bg-[#34574d] dark:text-[#d0f0e6]"><span>Check event ordering</span><span>In progress</span></div>
            <div className="flex items-center justify-between rounded-md bg-[#ecf6f2] px-3 py-2 text-[11px] text-[#2c6255] dark:bg-[#34574d] dark:text-[#d0f0e6]"><span>Test reconnection</span><span>Next</span></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-[#f1edfa] px-7 dark:bg-[#27213b]" aria-hidden="true">
      <div className="flex w-full max-w-sm items-center gap-3">
        <div className="rounded-xl border border-[#cbbfe9] bg-white px-4 py-5 text-center font-mono text-[11px] font-semibold text-[#5b448c] shadow-sm dark:border-[#655288] dark:bg-[#3c3159] dark:text-[#e0d4ff]">ORCHESTRATOR</div>
        <div className="h-px w-6 bg-[#9e8bbf]" />
        <div className="grid flex-1 grid-cols-2 gap-2">
          {["Agent A", "Agent B", "Agent C", "Audit"].map((label) => (
            <div key={label} className="rounded-lg border border-[#cbbfe9] bg-white px-2 py-3 text-center font-mono text-[10px] text-[#5b448c] shadow-sm dark:border-[#655288] dark:bg-[#3c3159] dark:text-[#e0d4ff]">{label}</div>
          ))}
        </div>
      </div>
      <span className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#7b69a2] dark:text-[#baa8e1]">Concurrent execution</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#161d2b] dark:bg-[#0d121b] dark:text-[#f2f4fa]">
      <Header />
      <main id="main-content">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-20 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:px-10 md:pb-28 md:pt-28">
          <div>
            <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#4869b8] dark:text-[#9bb9fa]">
              <span className="h-2 w-2 rounded-full bg-[#416ad5]" />
              Software engineer · Bengaluru, India
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-[76px]">
              Building systems that work{" "}
              <span className="text-[#416ad5] dark:text-[#8aabf8]">beyond the demo.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#586275] dark:text-[#b1b9c8]">
              I&apos;m Omkar Jawalikar. I work on backend engineering, distributed systems, and production AI. I care about what happens when software meets real users, real failures, and real scale.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#selected-work" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#233e81] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#365cc0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416ad5]">
                Explore my work <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#cdd2da] px-6 text-sm font-semibold text-[#273550] transition-colors hover:border-[#416ad5] dark:border-[#414b5a] dark:text-white dark:hover:border-[#8aabf8]">
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-9 flex items-center gap-5 text-sm text-[#647086] dark:text-[#9facbf]">
              <a className="inline-flex items-center gap-2 transition-colors hover:text-[#416ad5]" href="https://github.com/Falcon-J" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Github className="h-4 w-4" /> GitHub</a>
              <a className="inline-flex items-center gap-2 transition-colors hover:text-[#416ad5]" href="https://www.linkedin.com/in/omkar-jawalikar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin className="h-4 w-4" /> LinkedIn</a>
              <span className="hidden items-center gap-1 sm:inline-flex"><MapPin className="h-4 w-4" /> Bengaluru</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[430px] md:ml-auto">
            <div className="absolute -right-3 -top-3 h-full w-full rounded-[28px] border border-[#d7dce5] dark:border-[#394454]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#e5e8eb] shadow-[0_20px_70px_rgba(25,37,66,0.12)] dark:bg-[#263142]">
              <Image src="/stella.jpg" alt="Portrait of Omkar Jawalikar" fill sizes="(max-width: 768px) 90vw, 430px" className="object-cover object-center" priority />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/25 bg-[#121826]/80 p-4 text-white backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a9c2f8]">Currently</p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <div><p className="font-semibold">SDE I at ANAROCK</p><p className="mt-0.5 text-xs text-[#d5dbe5]">Backend systems & production AI</p></div>
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#81cfad]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Engineering focus" className="border-y border-[#e5e7ec] bg-white/70 dark:border-[#293342] dark:bg-[#151d29]">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#59667a] dark:text-[#a9b6c7] md:px-10">
            <span>Backend engineering</span><span>Distributed systems</span><span>Production AI</span><span>Reliability first</span>
          </div>
        </section>

        <section id="selected-work" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#416ad5] dark:text-[#96b4ff]">01 / Selected work</p>
              <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Proof is in the systems.</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#647086] dark:text-[#acb5c4]">Projects where architecture, failure handling, and engineering decisions matter more than a feature checklist.</p>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#3458ac] hover:underline dark:text-[#a1baff]">All projects <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.name} className="group flex flex-col overflow-hidden rounded-[22px] border border-[#e0e4eb] bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(31,49,86,0.09)] dark:border-[#30394a] dark:bg-[#171f2b]">
                <ProjectVisual visual={project.visual} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64738a] dark:text-[#aab6c9]"><span>{project.category}</span><span>{project.number}</span></div>
                  <h3 className="text-[27px] font-semibold tracking-[-0.04em]">{project.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5d687c] dark:text-[#b2bbca]">{project.description}</p>
                  <p className="mt-4 text-sm font-medium text-[#314a7f] dark:text-[#b5cbff]">{project.proof}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="rounded-full bg-[#f0f3f7] px-3 py-1.5 text-[11px] font-medium text-[#536073] dark:bg-[#283445] dark:text-[#c8d2e2]">{technology}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center gap-5 pt-7 text-sm font-semibold">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#3458ac] hover:underline dark:text-[#a1baff]">Source code <ArrowUpRight className="h-4 w-4" /></a>
                    {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#3458ac] hover:underline dark:text-[#a1baff]">Live demo <ArrowUpRight className="h-4 w-4" /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#e5e7ec] bg-[#f0f2f6] py-24 dark:border-[#293342] dark:bg-[#151d29] md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[0.75fr_1.25fr] md:gap-24 md:px-10">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#416ad5] dark:text-[#96b4ff]">02 / Experience</p>
              <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Building in the real world.</h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-[#647086] dark:text-[#acb5c4]">From experimenting with systems to shipping and maintaining them in professional environments.</p>
              <Link href="/experience" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#3458ac] hover:underline dark:text-[#a1baff]">Full experience <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="divide-y divide-[#cfd5df] border-t border-[#cfd5df] dark:divide-[#364354] dark:border-[#364354]">
              {experience.map((item) => (
                <div key={item.role + item.duration} className="grid gap-3 py-7 sm:grid-cols-[145px_1fr] sm:gap-6">
                  <p className="pt-1 text-xs font-semibold text-[#65748b] dark:text-[#a9b7c9]">{item.duration}</p>
                  <div><h3 className="text-lg font-semibold">{item.role}</h3><p className="mt-1 text-sm font-semibold text-[#365db4] dark:text-[#9db9ff]">{item.organization}</p><p className="mt-2 text-sm leading-6 text-[#59667a] dark:text-[#b0bbca]">{item.description}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#416ad5] dark:text-[#96b4ff]">03 / How I work</p>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Curiosity, with engineering discipline.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {principles.map(({ title, description, icon: Icon }) => (
              <div key={title} className="border-t border-[#cdd4df] pt-7 dark:border-[#354153]">
                <Icon className="h-7 w-7 text-[#416ad5] dark:text-[#98b4f8]" strokeWidth={1.7} />
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[#647086] dark:text-[#b0bbca]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
          <div className="grid overflow-hidden rounded-[28px] bg-[#1e3158] text-white md:grid-cols-[1.25fr_0.75fr] dark:bg-[#202f4d]">
            <div className="p-8 sm:p-12 md:p-14">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#b6cbff]">04 / Beyond code</p>
              <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">I like understanding how things work. Not only software.</h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-[#d4dff4]">Cars and engineering, a good badminton rally, discovering music, and stories worth thinking about. I bring that same curiosity to the systems I build and the teams I work with.</p>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline">More about me <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="flex items-center justify-center border-t border-white/10 p-8 md:border-l md:border-t-0">
              <div className="grid w-full max-w-xs grid-cols-2 gap-3 text-sm">
                {["Engineering", "Automotive", "Badminton", "Music", "Stories", "Building"].map((interest, i) => (
                  <div key={interest} className={"flex min-h-24 items-end rounded-2xl border border-white/15 p-4 font-medium " + (i % 3 === 0 ? "bg-white/15" : "bg-white/5")}>{interest}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#e5e7ec] bg-white/70 px-6 py-20 text-center dark:border-[#293342] dark:bg-[#151d29] md:py-28">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#416ad5] dark:text-[#96b4ff]">Let's build something worthwhile</p>
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Have a problem that needs thoughtful engineering?</h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#647086] dark:text-[#acb5c4]">Always happy to talk about challenging systems, interesting ideas, and engineering opportunities.</p>
          <a href="mailto:omkarjawalikar04@gmail.com" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#233e81] px-7 text-sm font-semibold text-white hover:bg-[#365cc0]"><Mail className="h-4 w-4" /> Say hello <ArrowUpRight className="h-4 w-4" /></a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
