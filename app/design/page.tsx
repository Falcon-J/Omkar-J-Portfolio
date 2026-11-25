import Image from "next/image";
import { Suspense } from "react";
import { ArticleFeed } from "./article-feed";
import { ArrowDown, ArrowUpRight, Database, GitBranch, Workflow } from "lucide-react";
import { ScrollRow } from "./scroll-row";
import styles from "./journal.module.css";

export default function JournalHome() {
  return <>
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>Hi, I&apos;m Omkar.</p>
        <h1 id="hero-title">Systems,<br />AI and <em>everything</em><br />in between<span>.</span></h1>
        <p className={styles.lead}>I build backend systems and AI applications.<br />Currently at Anarock, working across product engineering and agentic systems.</p>
        <p className={styles.currentRole}>SDE I · Bengaluru</p>
        <a className={styles.scrollLink} href="#selected-work"><ArrowDown size={28} strokeWidth={1} aria-hidden="true" /> Scroll to explore</a>
      </div>
      <div className={styles.heroPortrait}>
        <Image className={styles.portraitImage} src="/omkar-jacket.webp" alt="Illustrated portrait of Omkar wearing a black jacket" width={1000} height={750} priority sizes="(max-width: 700px) 90vw, 520px" />
        <p className={styles.handNote}>Curious builder.<br />Always learning.</p>
      </div>
    </section>

    <section id="selected-work" className={styles.section} aria-labelledby="work-title">
      <div className={styles.sectionHeading}><span className={styles.sectionNumber}>01</span><div><h2 id="work-title">Featured projects</h2><p className={styles.sectionIntro}>A few systems I&apos;ve spent time understanding.</p></div><a className={styles.textLink} href="https://github.com/Falcon-J" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      <ScrollRow className={styles.projectGrid} label="Featured projects">
        <article id="saathi" className={styles.projectCard}>
          <div className={styles.projectArtwork} role="img" aria-label="Conceptual Saathi workspace showing tasks and live updates">
            <div className={styles.workspaceMock} aria-hidden="true"><div className={styles.workspaceSidebar}><b>✦ Saathi</b><span>⌂ Home</span><span>☑ My tasks</span><span>▤ Inbox</span><span>♧ Members</span></div><div className={styles.workspaceMessages}><small>WORKSPACE / PRODUCT</small><strong>A little more in sync.</strong><div className={styles.message}><span>OJ</span><p>Task updated.<small>Changes saved to workspace</small></p></div><div className={styles.message}><span>✓</span><p>Back online.<small>Missed events replayed</small></p></div><div className={styles.message}><span>↻</span><p>Everyone, up to date.<small>Reconciled with saved state</small></p></div></div></div>
          </div>
          <div className={styles.projectBody}><p className={styles.kicker}>Full stack / Real-time systems</p><h3>Saathi</h3><p>Collaborative workspace for tasks, memberships, and invitations. Built around reliable sync, conflict protection, and server-side permissions.</p><p className={styles.tags}>Next.js · PostgreSQL · Redis Streams · SSE</p><details className={styles.detail}><summary>Inside the engineering</summary><ul><li>Cursor-based SSE replay and Redis Streams deduplication recover updates after a reconnect.</li><li>Optimistic edits use expected-version checks. Authoritative reconciliation restores saved state.</li><li>PostgreSQL transactions and server-side workspace permissions protect tasks, memberships, and invitations. Supabase Auth handles identity.</li></ul></details><a className={styles.textLink} href="https://github.com/Falcon-J/saathi" target="_blank" rel="noopener noreferrer">View project <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        </article>
        <article id="atlaspay" className={styles.projectCard}>
          <div className={styles.projectArtwork} role="img" aria-label="AtlasPay conceptual architecture: client to API and Kafka, with order, payment and inventory services backed by PostgreSQL and Redis">
            <div className={styles.architecture} aria-hidden="true"><div className={styles.architectureNode}><Workflow /><span>Client</span></div><span>→</span><div className={styles.architectureNode}><GitBranch /><span>API</span></div><span>→</span><div className={styles.architectureNode}><Workflow /><span>Kafka</span></div><span>→</span><div className={styles.architectureServices}><span>Order service</span><span>Payment service</span><span>Inventory service</span></div></div><div className={styles.architectureServices} aria-hidden="true"><span><Database size={14} /> PostgreSQL</span><span><Database size={14} /> Redis</span></div>
          </div>
          <div className={styles.projectBody}><p className={styles.kicker}>Backend / Distributed systems</p><h3>AtlasPay</h3><p>Checkout reliability lab. An event-driven workflow exploring durability, payment idempotency, and recovery when things go sideways.</p><p className={styles.tags}>Go · Kafka · PostgreSQL · Redis · Docker</p><details className={styles.detail}><summary>Inside the engineering</summary><ul><li>Durable saga state supports restart recovery, bounded retries, inventory compensation, and dead-letter handling.</li><li>Contract smoke tests cover order, payment, and inventory behavior.</li><li>Résumé-reported local Docker Compose benchmark: 167/167 checkouts completed, 520.3 ms p95 completion latency, at a 1,000 RPM arrival target over 10 seconds. Not independently rerun here; this is not production performance evidence.</li></ul></details><a className={styles.textLink} href="https://github.com/Falcon-J/AtlasPay" target="_blank" rel="noopener noreferrer">View project <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        </article>
      </ScrollRow>
    </section>

    <section id="about" className={styles.section} aria-labelledby="experience-title">
      <div className={styles.sectionHeading}><span className={styles.sectionNumber}>02</span><div><h2 id="experience-title">The path so far</h2><p className={styles.sectionIntro}>Building systems. Learning through the work.</p></div></div>
      <ol className={styles.timeline}>
        <li className={styles.experienceRow}><p className={styles.kicker}>Jul 2026 — Present<br />Bengaluru</p><div><h3>SDE I <span>· Anarock</span></h3><p>Configurable editors, tenant-scoped APIs, campus discovery, and mobile WebView experiences.</p><details className={styles.detail}><summary>A closer look</summary><p>Enabled authoring across 12 field types using React, TypeScript, backend validation, and PostgreSQL JSONB. Built dynamic filters and stable card assignments with legacy payload compatibility.</p><p>Validated an AI inspection-summary workflow with 18 released tickets across 9 units in a local browser/provider demo, with bounded record selection, source provenance, and authorization controls. Designed typed LangGraph execution boundaries for routing, validation, persistence, and replay-safe recovery.</p></details></div></li>
        <li className={styles.experienceRow}><p className={styles.kicker}>Dec 2025 — Jun 2026</p><div><h3>Software Engineering Intern <span>· Anarock</span></h3><p>Facility discovery, booking, cancellation, rebooking, and dues workflows using FastAPI, platform APIs, LangGraph, LangChain, Redis context, and typed validation.</p></div></li>
        <li className={styles.experienceRow}><p className={styles.kicker}>Jul 2026<br />Vellore</p><div><h3>B.Tech, Computer Science &amp; Engineering</h3><p>Vellore Institute of Technology · CGPA 8.33</p></div></li>
      </ol>
      <details className={`${styles.detail} ${styles.toolkit}`}><summary>Toolkit &amp; certifications</summary><p><strong>Build:</strong> React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Node.js, Express, FastAPI, REST APIs, SSE.</p><p><strong>Systems:</strong> Python, Go, Java, C++, SQL, PostgreSQL, Redis, Kafka, Docker, AWS, GCP.</p><p><strong>AI &amp; engineering:</strong> LangGraph, LangChain, structured outputs, tool integration, Git, GitHub Actions, automated testing, API contracts, multi-tenant authorization.</p><p><strong>Certifications &amp; training:</strong> Google Cloud Certified Generative AI Leader; Oracle Cloud Infrastructure Generative AI Professional; NVIDIA AI for All: From Basics to GenAI Practice; IBM Generative AI and LLMs: Architecture and Data Preparation.</p></details>
    </section>

    <section id="writing" className={styles.section} aria-labelledby="writing-title">
      <div className={styles.sectionHeading}><span className={styles.sectionNumber}>03</span><div><h2 id="writing-title">Notes from my brain</h2><p className={styles.sectionIntro}>Articles on Medium. Conversations on LinkedIn.</p></div></div>
      <Suspense fallback={<p className={styles.feedStatus} role="status">Finding the latest stories…</p>}><ArticleFeed /></Suspense>
    </section>

    <section className={styles.section} aria-labelledby="personal-title"><div className={styles.sectionHeading}><span className={styles.sectionNumber}>04</span><div><h2 id="personal-title">Beyond the terminal</h2><p className={styles.sectionIntro}>Music, cars, a good match, and a good story.</p></div></div><ScrollRow className={styles.personalGrid} label="Personal interests">{[{ title: "Music", art: styles.artMusic, text: "Discovering different genres and finding a soundtrack for the day." }, { title: "Cars", art: styles.artCars, text: "Automotive design, thoughtful details, and the engineering underneath." }, { title: "Badminton", art: styles.artBadminton, text: "A competitive match and a good reason to step away from the keyboard." }, { title: "Stories", art: styles.artBooks, text: "Books, films, and narratives that stay with you." }].map(({title, art, text})=><details className={styles.personalCard} key={title}><summary><div className={`${styles.personalArtwork} ${art}`} aria-hidden="true" /><span>{title}</span><ArrowUpRight size={14} aria-hidden="true" /></summary><p>{text}</p></details>)}</ScrollRow></section>

  </>;
}
