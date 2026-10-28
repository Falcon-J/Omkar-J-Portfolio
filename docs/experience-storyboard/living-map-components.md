# Living map: destination and component design specification

27 October 2026. Status: design proposal for review, not an implemented or visually approved system. This extends `living-map-spec.md` with the details each destination and reusable component must show in the storyboard. The approved direction is an ambient 2D world, selectable places and static Omkar and Stella illustrations inside content panels. The portfolio helps visitors understand Omkar. It is not a game and has no movement, collection or completion requirement.

## Evidence and decision boundary

Verified from the repository: `lib/portfolio-projects.ts` contains Saathi and AtlasPay descriptions, technical decisions, source links and evidence boundaries. `components/portfolio/sections/contact-section.tsx` contains email, LinkedIn, GitHub, résumé and the existing contact form. Those facts support content design; they are not renewed external availability or production claims.

User approved: the living map, destination popups, static characters, a day/night simulator, a gradual clock-based world, removal of section links as the primary map navigation, and a complete storyboard before rebuilding. Exact compositions, materials, spacing, fonts, day/night artwork and timing below are proposed. Existing map imagery is a flattened reference, not an editable component library. The five content places are Home (personal introduction and interests), Journey, Workshop, Now and Contact. A brief first-load welcome is a shell state, not a sixth required destination.

## Principles that keep the design distinctive and usable

- A destination has a recognizable physical metaphor and a clear question it answers. The metaphor organizes content; it does not obscure labels or turn reading into a puzzle.
- Use one panel architecture with distinct interior compositions. Share Close, Back, heading, focus, scrolling and responsive rules; vary illustration, grouping and meaningful content interactions.
- Use ordinary text and HTML controls above world artwork. No important copy is baked into a raster image.
- Static character art belongs in reserved space and supports the scene. It never overlaps copy, labels, input fields or primary actions.
- A visible Places control and résumé shortcut always remain available. Labeled map hotspots and Places items open the same destination state.
- Only populate authored and verified content. No invented favorites, current activity, employer claims, benchmark figures, history or project evidence.

## Shared visual foundation: proposed tokens

| Token | Proposed value or rule | Review requirement |
| --- | --- | --- |
| Light canvas | `#F8F3EB` | Warm background, no paper texture behind body copy |
| Light panel | `#FFFAF3` | Opaque reading surface above the world |
| Light primary ink | `#302438` | Measure 4.5:1 for body text |
| Light muted ink | `#685B6B` | Measure contrast in every state |
| Accent | `#684A86` | Selection and focus family; never sole state signal |
| Warm detail | `#F4C3A3` | Decorative accents; dark ink for text |
| Dark canvas / panel / ink | `#211D27` / `#2D2635` / `#F8F3EB` | Proposed companion palette, needs visual board and measurements |
| Border | Light `#D8CAD1`, dark `#5E5268` | Relevant controls must meet 3:1 against adjacent surfaces |
| Type | Existing readable sans; display weight 700, body 400 | Confirm actual licensed font; pixel art does not imply pixel body type |
| Body / secondary text | 16–18px / at least 14px | Reflow and zoom without truncating essential text |
| Heading | 32–40px desktop; 26–32px mobile | One panel heading, orderly nested headings |
| Spacing scale | 4, 8, 12, 16, 24, 32, 48px | Apply consistently; no arbitrary offsets to fit one screenshot |
| Control size | At least 44 × 44 CSS px for primary touch targets | Adequate gaps and focus visibility at 360px |
| Panel radius | 20px desktop, 16px sheet; squared reading pages inside if useful | Decorative materials remain subordinate to content |
| Motion | Panel 180–240ms; disclosure 160–200ms; world phase gradual | Proposed timings, immediate equivalent for reduced motion |

## Shared components and complete states

| Component | Anatomy | States and behavior |
| --- | --- | --- |
| Map hotspot | Landmark, visible label, hit region, selected marker | Default, hover, focus, pressed, selected. Keyboard activates with Enter/Space. Shape/label changes accompany color. No invisible tiny targets. |
| Places menu | Labeled trigger, destination list, résumé action | Closed/open, selected item, keyboard focus. Escape closes and restores trigger focus. Selecting a destination closes the menu and opens the panel. |
| Destination panel | Place label, heading, static art, content, Close; Back for detail | Opening/open/closing; parent/detail; scroll retained per parent. Modal focus is contained and restored. No stacked nested dialogs. |
| Object choice | Illustration or icon, text label, short optional descriptor | Default, focus, hover, selected/expanded. Same action through visible text; no hover-only reveal. |
| Detail page | Back, heading, body, evidence/source actions | Parent position restored on Back. Close returns to map. External links remain ordinary links. |
| Link/action | Icon where useful, explicit text, external indicator | Default, hover, focus, pressed, disabled only for meaningful pending work. Never show a dead illustrative control in production. |
| Media | Reserved aspect ratio, actual preview, caption/alt where meaningful | Loading, loaded, missing/error. On failure retain title, description and source link. No fake app screenshot. |
| Feedback | Inline message, optional status announcement, recovery action | Pending, success, validation, failure. Text/shape signals accompany color. Do not announce ambient animation frames. |
| Clock controls | Time, timezone, Live/Preview label, slider, Live reset | Live, preview, hidden/resume, changed timezone, reduced motion. Never changes device time. |
| Ambient layer | Small authored water, foliage, window light or daylight layer | Active, paused, reduced motion, missing asset. Failed effects do not hide navigation. |

## Place 1: Home as a personal desk

**Insight:** “I can understand the person, not only his résumé.”

**Composition:** a warm desktop vignette with a short introduction on the left and a small arrangement of labeled personal objects on the right. Static Omkar and Stella occupy a reserved lower corner. The first reading view contains the introduction and four choices without requiring visitors to move objects. The metaphor is a desk, not a draggable inventory.

**Component anatomy:** heading “Meet Omkar”; short authored introduction; normal portrait if used; an interest rail with Music & dance, Cars, Sports and Stories; each has a small object illustration and visible label. Music may use headphones, Cars a model-car sketch, Sports a racket and Stories a book. These are illustrative categories, not claims of ownership.

**Detail composition:** a focused page within the same panel. Music & dance can show Martin Garrix and Arijit Singh as confirmed taste clues, short user-authored context and an optional playlist-exchange contact action. Other subjects remain lightly populated until genuine content is supplied. Unknown stories are omitted, not filled by AI.

**Storyboard states:** closed map → Home introduction → interest focused → interest detail → Back to the same interest rail → Close to invoking map control. No selected interest is hidden by a narrow layout. A missing illustration leaves its text choice intact. A missing detail is omitted from public choices; the review artifact labels the content gap.

**Mobile:** introduction first, reserved static pair second, interest list in a readable two-column or single-column layout. Detail replaces the panel body. No arbitrary object placement that causes touch-target overlap.

**Acceptance:** all four populated categories are identifiable; music references are accurate; no fabricated anecdotes; keyboard reaches each choice; Back restores selection/focus; character art never overlaps prose at zoom.

## Place 2: Journey as a foldout route journal

**Insight:** “I understand what shaped him and how he has grown.”

**Composition:** a foldout route sheet with a connected chronology on one side and a selected milestone account on the other. A static pointing Omkar sits beside the selected account, not on the path label. The route sheet uses restrained path markers and dates rather than a graph that implies numeric achievement.

**Component anatomy:** title; chronological milestone list; solid history path; selected marker with text; selected story heading, date/context and account; future branch with dashed line and the explicit label “Aspiration.” Include a readable list equivalent of the illustration.

**Content boundary:** birth in 2004 is user confirmed. School names/dates remain unverified. VIT, internships and Anarock work require résumé reconciliation before final public copy. Never collapse internship and employment into one misleading claim. The future is not a promised role, employer or date.

**Storyboard states:** default milestone → milestone selected by pointer/keyboard → selected story updated → another milestone selected → Close. Selection updates content without requiring a modal inside the panel. If a selected story is longer, retain the path and provide a clear heading. A partial content gap is labeled during review and excluded from published claims.

**Mobile:** vertical chronology; selected account directly after the selected entry or in a clearly associated detail view. Keep chronological order in the DOM. No drag, zoom or precision map interaction is required.

**Acceptance:** selected state is visible without color; all milestones are keyboard reachable; future branch is unmistakably aspiration; mobile labels do not collide; the chronology and text equivalent communicate the same facts.

## Place 3: Workshop as a project workbench

**Insight:** “I see how he frames problems, makes decisions and validates work.”

**Composition:** a workbench with two labeled project folders or blueprints, Saathi and AtlasPay. A small static workshop illustration frames the area. The project title, purpose and Open story action remain ordinary legible content. The blueprint metaphor provides structure, not tiny technical diagrams as decoration.

**Project overview anatomy:** project name; one-sentence purpose; meaningful preview or designed text cover; evidence/status label; Open story; source and verified demo actions where appropriate. No production badge or metric is inferred from the concept artwork.

**Project story anatomy, in reading order:**

1. The problem and why it matters.
2. Omkar's actual role and scope, verified before final publication.
3. A concise system view or accurate diagram.
4. Two or three meaningful decisions and their tradeoffs.
5. Evidence, limitations and links.
6. What he learned; optional small demonstration where it teaches the decision.

**Saathi content source:** collaborative workspace; tasks, memberships and invitations; Next.js, TypeScript, PostgreSQL, Redis Streams and SSE. Existing data describes cursor-based replay, expected-version checks, authoritative reconciliation and server-side workspace permissions. Do not rename it offline-first editing or imply production use beyond verified evidence. Source: `https://github.com/Falcon-J/saathi`.

**AtlasPay content source:** checkout reliability lab using Go, Kafka, PostgreSQL, Redis and Docker. Existing data describes persisted saga recovery, idempotency, bounded retries, compensation and dead-letter handling. Its local lab/contract-check evidence is distinct from hosted or production proof. Source: `https://github.com/Falcon-J/AtlasPay`; demo candidate from existing data: `https://atlas-pay-two.vercel.app`. External availability is not rechecked here.

**Optional demonstration:** a local labeled duplicate-request illustration with Send, protection off/on, received/applied result, explanation and Reset. It performs no live payment. Verify the example's relation to AtlasPay before attributing it to that implementation. Turning protection on resets or clearly starts a new comparison so results do not mix modes.

**Storyboard states:** project list → selected project → overview → decisions/evidence disclosure → optional simulation → Back to same project → Back to list with selection/scroll preserved → Close. Source navigation is explicit. Missing preview leaves a designed text cover and link. Simulation controls have normal, pending if used, result and Reset states; no arbitrary spinner is required for a synchronous local demonstration.

**Mobile:** stacked project folders, one clear primary Open story action each; blueprint story becomes a normal readable article. Diagrams have a text explanation. Horizontal browsing is optional and has buttons; it never traps vertical scrolling.

**Acceptance:** only the two selected projects appear; claims match source evidence; actual role is verified; source/demo labels are honest; Back retains project context; simulation is understandable without the static character and has deterministic behavior.

## Place 4: Now as a reading table

**Insight:** “I see what he is curious about today.”

**Composition:** a reading-table vignette with a small number of dated notes or book-like entries. Treat them as authored updates with readable titles and source labels, rather than a decorative shelf of unidentifiable covers. The static seated pair remains quiet in reserved space.

**Component anatomy:** title “Now”; last-edited date if maintained; populated groups such as Building, Reading and Writing; entry title, concise personal context, date and source. Listening may be included only when actual content exists. Personal favorites must be user supplied.

**Storyboard states:** Now overview → select entry → read an authored note or follow an external source → Back/return → Close. An external link is a link, not a fake in-app article. Empty groups are hidden. Unavailable media retains title, date and source; no failed feed blocks the panel. No live scraping or account connection is implied.

**Mobile:** entries stack in reading order with visible date/source. Avoid horizontal shelves that hide all but a sliver of the next item. Long titles wrap.

**Acceptance:** dates and sources are clear; stale entries are not called live; no unfilled public slots; source links and return path work; content explains why the item interests Omkar rather than merely listing it.

## Place 5: Contact as an open letter

**Insight:** “I know how to start a conversation.”

**Composition:** an open letter or postcard with a short invitation and clear contact actions. A static Omkar and Stella illustration acts like a small signature vignette. Avoid form fields styled so decoratively that labels or errors become ambiguous.

**Component anatomy:** invitation; direct email, LinkedIn, GitHub and résumé links; optional “Write a message” disclosure; existing contact form. Link destinations verified from current source: `mailto:omkarjawalikar04@gmail.com`, `https://www.linkedin.com/in/omkar-jawalikar/`, `https://github.com/Falcon-J`, `/Omkar-Jawalikar-Resume.pdf`.

**Form storyboard:** Contact overview → expand form → enter required values → invalid submission with field-specific messages and preserved input OR valid submission → sending with duplicate submit prevented → success confirmation OR failure with preserved text and retry. Closing with an unsent draft must preserve it for the current session or offer a clear discard confirmation; final policy must be selected and represented in the visual board. Do not silently lose a draft when changing places or themes.

**Validation and feedback:** preserve existing API contract and validation rules; do not invent new required fields. Pending state is announced; failures are readable and associated with the relevant inputs; success wording does not claim email delivery unless the backend actually confirms it. No form submission occurs in the storyboard prototype.

**Mobile:** the letter becomes a readable panel with stacked actions and full-width fields. Soft keyboard does not cover the focused field or primary action. Static illustration can move below content or be omitted when space is tight.

**Acceptance:** all direct actions remain available before form expansion; keyboard focus, labels and error associations work; failure preserves data; pending blocks duplicate sends; actual delivery remains a separate integration check.

## Panel lifecycle, navigation and focus

- One authoritative place/detail state drives the selected hotspot, Places item, panel heading and useful URL. Rendering and clock ticks do not add history entries.
- Opening from a hotspot or Places item stores the opener and map position. Focus moves into the panel to its heading or first logical control; the exact behavior is consistent and tested.
- Nested details replace the panel body with Back, rather than opening stacked dialogs. Back restores parent selection, scroll and focus. Close returns to the map and opener. Escape closes only the active reading layer according to this same hierarchy.
- Modal panels contain focus and prevent accidental map interaction underneath. Non-modal desktop layouts require a separate explicit design; do not mix modal focus trapping with a non-modal visual treatment.
- Browser Back follows real user navigation; direct links open useful content without a welcome gate. Refreshing a deep link must not require discovering its building again.
- When the opener no longer exists after responsive changes, restore focus to the matching Places item or Places trigger. Changing map time or UI theme never changes selection, focus, panel scroll or form values.

## Day/night, interface themes and mobile

World time is independent from interface theme. Map daylight changes gradually; reading panels and controls use stable contrast. Night artwork may add window lights and altered water/sky color without reducing readability. Browser-local time is a proposed default, clearly labeled, not a claim about Omkar's location or astronomical sunrise. The Preview slider and Live action form an explicit simulator state.

Every destination needs a light interface and dark interface board, with day and night map examples, plus a 360px mobile reading view and tablet composition. Key visual checks include hotspot alignment after crop/resize, object labels that wrap, reserved static art, no text baked into raster art, no horizontal overflow at zoom, and no content dependent on an ambient animation.

Use static fallback art when layers fail, the device requests reduced motion or effects are paused. The Places list and normal content remain available if the world fails to render. Offscreen/hidden worlds stop optional effects. An expensive effect may be removed without removing a destination.

## Visual storyboard deliverables and acceptance gate

The HTML storyboard should visibly include the following for review, not only describe them in prose:

- [ ] Master map with clean landmark labels, actual hit regions, selected/focus state, Places and résumé access.
- [ ] All five destination opening compositions with their distinct object-inspired design.
- [ ] Home interest detail and return; Journey milestone selection; Workshop project story, evidence and optional simulation; Now entry/source; Contact form validation, pending, success, failure and draft-close policy.
- [ ] Back, Close, Escape, direct link and browser Back behavior represented in the interaction map.
- [ ] Desktop and mobile panel compositions, light/dark interfaces and map day/night examples.
- [ ] Buttons, disclosures, links, selection, focus, loading, empty, media failure and recovery examples.
- [ ] Consistent static Omkar/Stella illustrations with source/license records and defined asset dimensions.
- [ ] Measured contrast, keyboard/touch/focus/reflow checks, and a real small-scene runtime proof before scaling to the full map.

This document is a detailed behavior and composition specification. It does not establish that these visual boards, editable artwork, external destination checks, production accessibility or smooth animation have been completed. The first runtime proof should use one real layered map area and one fully designed destination panel, with representative mobile and clock behavior, before the whole world is built.
