# Living map portfolio: content inventory

27 October 2026. Repository and bundled résumé inventory for the approved living map direction. This is a content review document, not renewed verification of employment, project behavior, external links or email delivery. No application content was changed.

## Evidence labels

- **Source present:** the wording or fact exists in the current local source inspected below.
- **Résumé corroborated:** the same claim or date is also present in `public/Omkar-Jawalikar-Resume.pdf`, extracted during this review. The résumé is authored evidence, not independent external validation.
- **Needs confirmation:** content is absent from the résumé, is stale by nature, or needs the author's intended wording before publication.

Use only the selected projects Saathi and AtlasPay in the new Workshop. Do not infer public launch, production usage, ownership, impact metrics or current status from an illustration or from a source-code description alone.

## 1. Welcome and Home / About house

**Visitor insight:** who Omkar is, what he enjoys and how to explore the portfolio.

| Content | Inspected source | Evidence and publishing boundary |
| --- | --- | --- |
| Name: Omkar Jawalikar | Résumé; `components/portfolio/sections/home-section.tsx` | Source present and résumé corroborated. |
| Software engineer at Anarock | Home section; résumé | Résumé records Software Development Engineer I, July 2026–present. This is a dated current-employment claim; recheck before publication if circumstances change. |
| Based in Bengaluru | `components/portfolio/sections/about-section.tsx`; résumé work locations | Source present and résumé corroborated for work location. Do not imply precise personal location or publish an address. |
| Product interfaces, APIs and recovery-oriented systems | Home section; résumé | Source present, supported by the scope described in the résumé. Keep this as positioning; avoid an unqualified reliability guarantee. |
| Music and dance; Martin Garrix and Arijit Singh | About section | Source present. The résumé does not cover personal tastes. Preserve these taste clues without inventing favorites, concert history or routines. |
| Cars and their engineering | About section | Source present. No ownership, model preference or personal car story is established. |
| Badminton, cricket and football | About section | Source present. No team allegiance, achievement or frequency is established. |
| Fiction and nonfiction | About section | Source present. No particular book, author or reading status is established. |
| Stella keeps Omkar company | About section | Source present. Existing character and illustration assets support the design, not additional biographical claims. |

**Reusable authored copy:** “Hi, I'm Omkar.” and a concise version of the current engineering introduction can anchor the welcome. The existing phrase “Send me a playlist when we talk” can support a direct contact invitation; it does not establish an upload feature or music-account integration.

**Author input still useful:** one or two short first-person stories explaining why selected interests matter; any actual books, car examples or dance context the author wants public. Sparse interests may remain sparse. Do not invent anecdotes to fill the desk composition.

## 2. Journey trail

**Visitor insight:** the periods that shaped Omkar and the distinction between work already done and aspirations.

| Milestone | Current source text | Evidence and action |
| --- | --- | --- |
| 2004 / Born | `components/portfolio/journey.tsx` | Source present; not stated in the résumé. Do not add birth date or birthplace. |
| School / Early chapters | Journey component contains generic text | School name, dates and formative story remain unfilled. Omit specific public claims until supplied. |
| Vellore Institute of Technology, B.Tech Computer Science and Engineering, July 2026, CGPA 8.33 | Journey component; résumé | Résumé corroborated. Keep graduation wording consistent with July 2026, not an old “expected” formulation. |
| Campus Entrepreneurship Cell and technology events | Journey component | Source present but not corroborated by the inspected résumé. Do not infer role, leadership or accomplishments. Confirm before expanding. |
| ForgeAhead Solutions, AI/ML Intern, June–September 2025 | Journey component explicitly labels the dates as from an earlier portfolio record | Not present in the inspected résumé. Confirm organization, role, dates and scope before publishing this as a verified milestone. |
| Anarock, Software Engineering Intern, December 2025–June 2026 | Journey component; résumé | Résumé corroborated. Scope includes FastAPI services for facility workflows, Redis-backed context and typed contracts. Keep this separate from the later full-time role. |
| Anarock, Software Development Engineer I, July 2026–present | Journey component; résumé | Résumé corroborated. Scope includes configurable content editors, tenant-scoped published APIs, campus discovery/WebViews, stable identifiers and bounded AI execution. Avoid exposing internal customer or operational data. |
| Next / Aspiration / Keep building | Journey component | Aspirational authored copy. Label as aspiration and do not attach an invented future role, employer or date. |

**Author input still useful:** what each period meant personally, why computer science, one transition or lesson from internships to the current role, and authentic future wording. These are story gaps, not reasons to repeat résumé bullets verbatim.

## 3. Workshop: Saathi

**Visitor insight:** collaboration is a consistency and authorization problem as well as an interface problem.

**Source present:** `lib/portfolio-projects.ts` describes Saathi as a collaborative workspace with tasks, memberships and invitations. Stack: Next.js, TypeScript, PostgreSQL, Redis Streams and SSE. Source link: `https://github.com/Falcon-J/saathi`.

**Résumé corroborated:** authenticated task, membership and invitation workflows; Supabase Auth; PostgreSQL transactions; server-side workspace permissions; cursor-based SSE replay; Redis Streams; event deduplication; authoritative reconciliation; optimistic UI and expected-version checks.

**Reusable project-story structure:**

1. Problem: reconnecting clients and concurrent edits make shared work difficult to trust.
2. Scope: authenticated task, membership and invitation workflows.
3. Decisions: recover missed events using replay; protect stale writes using expected versions; keep workspace authorization and database operations server owned.
4. Evidence: source repository, with specific evidence added only after the relevant tests and saved results are inspected.
5. Limitations: the inspected portfolio source does not establish production usage, current deployment status or a complete user-facing demo.

**Needs confirmation:** the author's exact ownership and collaboration context; project status; which release or saved test output can be linked; what lesson deserves emphasis. Do not call this offline-first editing. Do not turn event replay into a promise that every offline edit is accepted.

## 4. Workshop: AtlasPay

**Visitor insight:** reliable checkout requires explicit recovery across service boundaries.

**Source present:** `lib/portfolio-projects.ts` describes a checkout reliability lab using Go, Kafka, PostgreSQL, Redis and Docker. Source: `https://github.com/Falcon-J/AtlasPay`. Demo candidate: `https://atlas-pay-two.vercel.app`. External availability was not checked.

**Résumé corroborated:** persisted saga state and recovery across restarts; order/payment/inventory contract smoke tests; payment idempotency; bounded retries; inventory compensation; dead-letter handling.

**Benchmark in the résumé:** 167/167 checkouts completed, 520.3 ms p95 completion latency, in a recorded local Docker Compose benchmark with a 1,000 RPM arrival target over 10 seconds. This is a local short-run condition. It is not production throughput, a sustained capacity guarantee or a hosted-service performance result. The benchmark artifact itself was not inspected in this task.

**Reusable project-story structure:**

1. Problem: repeated messages, restarts and partial failures can leave checkout inconsistent.
2. Scope: a local checkout reliability lab spanning order, payment and inventory.
3. Decisions: persist saga state; use idempotency; bound retries; compensate inventory; expose dead-letter recovery.
4. Evidence: repository and service contract smoke tests; cite measured claims only with their conditions and supporting artifact.
5. Limitations: local evidence is distinct from a verified hosted end-to-end release.

**Needs confirmation:** exact ownership context, current demo availability, current benchmark evidence and which failure scenario best teaches the engineering decision. The optional duplicate-request UI must remain a labeled local simulation until its relationship to the real implementation is checked.

## 5. Reading corner / Now

**Visitor insight:** what Omkar is thinking about, with dates and sources.

`components/portfolio/sections/now-section.tsx` currently contains one article:

- **Title:** Meet your digital pet, born with RL.
- **Existing label:** Reinforcement learning experiment · 8 June 2025 · Medium.
- **Existing source:** `https://medium.com/@omkarjawalikar04/meet-your-digital-pet-born-with-rl-d4bb419ee4ef`.

This establishes an existing portfolio reference, not a fresh verification of the article page or publication date. A 2025 article can be selected writing; it must not be called a live or current activity feed.

**Needs author input:** dated current building, reading, writing or listening entries and a short reason each matters. Hide empty categories. No automatic feed, scraping or account connection is justified by this inventory.

## 6. Mailbox / Contact

`components/portfolio/sections/contact-section.tsx` currently supplies:

- Email: `mailto:omkarjawalikar04@gmail.com` (also present in the résumé).
- LinkedIn: `https://www.linkedin.com/in/omkar-jawalikar/`.
- GitHub: `https://github.com/Falcon-J`.
- Résumé: `/Omkar-Jawalikar-Resume.pdf`.
- Invitation: “About a project, an idea, or a playlist.”

The map panel can reuse these destinations. The calendar / “Schedule a call” action drawn in the generated concept is not established by current content and should not become a feature by accident.

The existing `components/portfolio/contact-form.tsx` uses name, email, subject and message, with required browser validation and maximum lengths of 100, 254, 200 and 5000. It has a 15-second abort, a synchronous duplicate-submit guard and a delivery-confirmation check. On failure it retains the DOM input values and offers retry/direct email; on confirmed success it resets the form. Destination-panel integration must additionally preserve drafts across panel unmounts or deliberately protect discard. Actual email delivery and external URL reachability were not tested here.

## Publication checklist

- [ ] Reconcile current employment, graduation wording and any résumé refresh.
- [ ] Confirm school details and the ForgeAhead milestone before adding specific claims.
- [ ] Supply authentic short personal stories and dated Now entries, or omit unfilled content.
- [ ] State exact project ownership and status; inspect linked evidence before expanding claims.
- [ ] Recheck source/demo/article/contact links and résumé download.
- [ ] Keep metrics tied to the recorded conditions; do not infer production readiness.
- [ ] Remove illustrative dates, interest labels and calendar actions inherited from generated concept art.

## Inspected material and limits

Read during this task: the Home, About, Now and Contact section sources; Journey component; canonical project data; contact form; and text extracted from the bundled résumé using the installed `pypdf` library. No external sites, project repositories, live deployment, email delivery, physical device behavior or runtime performance were verified. No personal narrative was invented and no application code was edited.
