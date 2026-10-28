# Omkar: experience storyboard

**26 October loader update:** Mini Omkar and Stella walk or run during loading. The original image is now an optional scratch-card reward after collecting treats; see stella-surprise.png and companion-spec.md. Four treats is a proposed count.

**26 October update:** The active direction is now the companion-led experience. Open `index.html` and read [companion-spec.md](companion-spec.md). The puzzle and portrait-unlock directions below are archived; About now opens directly. The current boards are companion-desktop-a.png, companion-desktop-b.png, companion-mobile.png and companion-movement.png. The earlier gallery is preserved as archive-puzzle-gallery.html.
25 October 2026 · Design artifacts for review · Not a working application

This is the canonical review package for the clarified chapter-based experience. Previous one-page layouts are superseded. Open **index.html** for the ordered visual gallery.

## Boards
1. **desktop-a-v3.png** — entrance with Omkar and Stella, landing, solvable paragraph jigsaw, music open.
2. **desktop-b.png** — Journey, project wall, Now, Contact.
3. **mobile-a-v3.png** — mobile entrance, landing, solvable paragraph jigsaw, music open.
4. **mobile-b.png** — mobile Journey, project wall, Now, Contact.
5. **details.png** — cat controls, project detail, mobile menu/contact context, paired themes.
6. **about-puzzle-flow-v2.png** — solve → completion → Click to flip → board flip → jacket portrait and four interests. [About puzzle specification](about-puzzle.md) is authoritative. Older automatic-assembly boards are archived. [Portrait revision](portrait-revision.md) remains relevant only to the unchanged loader and original image sources.

Each numbered frame is a separate page or state. A storyboard contact sheet showing them together does not mean they appear together on the website. Generated images approximate typography and geometry. This specification is authoritative where image lettering or invented details differ. No metrics, awards or unverified biographical claims should be promoted from generated art.

## Experience sequence
Entrance → Home → About → Journey ⇄ Projects → Now → Contact.
Visitors can also jump chapters through navigation, follow a direct link, or use browser Back. The screen sequence is an invitation, not mandatory onboarding.

## Frame-to-action map
| Frame | Visitor action | Result | Return / fallback |
| --- | --- | --- | --- |
| 01 Entrance | Wait for essential shell readiness | Omkar-and-Stella illustration reveals, then page appears | Portrait failure cannot lock entry; header cat is independent |
| 02 Home | Meet me / Explore my journey | About / Journey | Normal navigation and browser Back |
| 03 About | Solve the paragraph jigsaw by drag or select-and-place | Completed text-only board shows Click to flip; activating it reveals a continuous portrait, then four interest entrances | Solved state retained during navigation; reduced motion uses crossfade |
| 04 Music | Exchange a playlist | Contact with optional playlist context | No Spotify/Apple authentication, autoplay or upload |
| 05 Journey | Select a milestone | Its story appears beside the graph, or below the node on mobile | Choose another node; readable timeline alternative |
| 06 Projects | Swipe, Previous or Next | Selected preview changes; indicator updates | Vertical page scrolling remains normal |
| 06 Projects | Open project | Project story with overview and optional depth | Back restores card, wall position and invoking control focus |
| 07 Now | Open source | Relevant writing, post or project destination | Preserve clear source label; stale content never called live |
| 08 Contact | Email / LinkedIn / GitHub | Intended contact destination | No new form/backend necessary for the first composition |
| 09 Cat | Play | Runner takes focus intentionally | Pause, Exit, hidden-tab pause, retry after ending |
| 10 Project | Open a detail accordion | Contribution or decisions/evidence | Overview and source remain available |
| 11 Menu | Select chapter | Navigate and close menu | Escape closes, focus returns to menu trigger |
| 12 Theme | Light / Dark / System | Same screen/content and selection, new theme | Preference persists using existing next-themes |

## Loader and cat states
- Loader belongs in the first HTML/CSS shell. It cannot render before the browser receives the document.
- Wait only for what is necessary to display the requested page. Optional feeds and images never block it.
- No fake percentages, forced multi-second delay or compulsory game. Fast/repeat navigation goes straight to content or a brief transition.
- Loader illustration is now user-supplied stella.jpg. The separate header-game cat artwork remains illustrative; no reusable game asset has been selected.
- Cat game: Idle → Playing → Paused → Playing; Playing → Finished → Retry or Exit; Exit returns to Idle.
- Keyboard jump works only while the active game is focused; touch has an explicit Jump control. Escape exits. Do not intercept document-wide Space or arrow keys.
- Reduced motion: static entrance and immediate chapter changes; game remains opt-in. No automatic sound.

## Content truth and timeline data
The life graph starts at **2004 — Born**, explicitly confirmed by Omkar. School name/dates remain unknown. A review-board “Details to add” label is not intended as public final copy.

Expand the artwork's compressed “Experience” node into the known professional progression during detailed design:
- VIT — Computer Science and Engineering; reconcile current résumé wording before publishing graduation details.
- ForgeAhead — internship, June–September 2025 (existing portfolio record; verify against résumé).
- Anarock — internship, December 2025–June 2026 (existing portfolio and prior résumé review).
- Anarock — Software Engineer I, July 2026–present.
- Future — “Still becoming”, marked **Aspiration**, with no invented future employer, year or guaranteed outcome.

Use **Today** for the current graph milestone in final copy; the generated boards sometimes use “Now”, which otherwise names the separate current-activity chapter. Selected state needs a label/shape as well as color. Future links are dashed. History follows a path; it is not a quantified growth chart.

Details should say what that period meant, not just reproduce job bullets. Specific human aspiration copy remains to be authored; do not infer private life goals for public display.

## About and Now content
Music & dance: Martin Garrix and Arijit Singh are confirmed. “Exchange a playlist?” is a conversation prompt, not a recommendation service. Cars, Sports and Stories stay intentionally light; no fabricated car ownership, team allegiance, books or habits.

Now begins with manually curated, dated entries. The storyboard's “Latest update to add” is an editorial slot, not a live feed or a public launch requirement. Hide unfilled categories in production. Do not assume recent repository work is ready to announce publicly. Existing Medium/LinkedIn destinations can be used once checked.

## Visual direction and themes
One identity across chapters: warm ivory #F4F1E9, deep plum #302538, muted violet #7761A8 and apricot #EDB78D. Dark canvas #211D27 with ivory text. Generated colors are approximate; proposed exact tokens require implementation contrast testing. Friendly display sans and readable body sans; choose actual available licensed fonts during implementation.

Use scale and spacing for emphasis; no collage of colored word blocks, folder-card imitation, or resume grid. A restrained route/path motif can connect loading, progression and navigation. Cat appears in the shell, not as decorative clutter throughout content.

Light and dark share layout and state. Journey lines, selected nodes, preview frames, controls and cat strokes must each have theme-aware values. Both themes need 4.5:1 normal-text contrast and 3:1 relevant UI/large-text contrast. Do not rely on accent color alone for the selected node.

## Component-state theme handoff
| Component | Light | Dark | Shared state signal |
| --- | --- | --- | --- |
| Graph edge | Dark neutral edge on ivory | Pale neutral edge on charcoal | Solid history, dashed aspiration |
| Selected milestone | Plum outline, pale violet panel | Apricot outline, raised dark panel | “Selected”/“Today” label and expanded detail |
| Project cover | Toned neutral surface, dark type | Raised charcoal surface, pale type | Title, purpose, explicit Open project |
| Contact action | Dark filled control, ivory type | Ivory filled control, dark type | Focus ring and external destination label |
| Cat strip | Dark stroke | Pale stroke | Play/Pause/Exit labels; no color-only state |
| Missing media | Purposeful text cover | Same cover adapted to dark | No broken image or fake app screenshot |

## Reuse map
| Surface | Foundation | Boundary |
| --- | --- | --- |
| Journey graph | React Flow MIT core | Built-in nodes/edges with themed styling; no custom graph engine; disable editing |
| Project wall | Existing components/ui/carousel.tsx, Embla | Keep installed version; no new carousel package |
| Menu and story details | Existing Radix Sheet/Dialog/Accordion | Preserve focus, labels, Escape and semantic controls |
| Transitions | Installed framer-motion | Respect reduced motion; no mandatory animation |
| Theme | Existing ThemeProvider and ThemeToggle, next-themes | Preserve mounting/hydration safeguards |
| Cat | Reusable asset/game candidate to source | No library or license selected yet; no heavy game engine assumed |
| Contact | Existing contact destination/behavior | No API changes assumed |

Sources previously checked: [React Flow](https://reactflow.dev/), [accessibility guidance](https://reactflow.dev/learn/advanced-use/accessibility), [Embla](https://www.embla-carousel.com/). LinkedIn direct retrieval was blocked; school history remains unverified.

## Verification boundary
Generated with built-in imagegen; prompts saved as prompts.json. The review gallery has ordinary image links and chapter anchors. The pictures are not interactive controls. No application code, dependencies, routes, API or deployment changed.

Review checks: all seven chapters represented; separate desktop/mobile layouts; interest-open and selected-node states; project detail/back; cat controls; theme pair; authentic limited personal content; no future digital twin. Source verification, actual asset licensing, pixel-perfect fonts, keyboard interactions, responsive behavior, motion, contrast and performance remain implementation checks.

Next step after reviewing this storyboard: a focused clickable prototype of entrance → landing → Journey/Projects → detail → Contact, plus About/music, using existing components. Digital twin, local models, model downloads, caches and related consent UI remain out of scope.

