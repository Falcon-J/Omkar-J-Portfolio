# Portfolio experience: corrected brief

25 October 2026. User's clarified brief is the authority. This supersedes the earlier homepage compositions and their implied content hierarchy. Status: interaction plan for review; not implemented.

## Purpose and personality

A visitor encounters Omkar through successive places: who he is, what he enjoys, where he has been, work he is proud of and what occupies him now. Connection is the purpose; a résumé download serves visitors who need a résumé. The website should not duplicate that document as its primary experience.

Working personality interpretation: curious about mechanisms and fundamentals, careful about correctness and ownership, direct about quality, playful and broadly interested outside work. These are interpretations from the conversation, not public biographical claims. Current user-confirmed interests include music, dance, cars, badminton, cricket, football, fiction, nonfiction, posts and articles. Specific favorites and reasons remain user-authored content to collect.

Earlier misses: reducing a lived experience to a homepage/card inventory; interpreting hiring relevance as a reason to remove personality; copying the reference's visual composition; using generated static images to decide interactions; declaring designs final before agreeing on the journey. These are superseded, not implementation assets.

## Architecture of the experience

Shared shell with header, theme setting and route transitions. Each chapter is a dedicated page, not a section of an everything-at-once homepage. Each page initially presents only its essential context. Depth is opened intentionally. Label destinations clearly; progressive disclosure must not hide what a control does.

Suggested sequence: Entrance → Landing → About → Journey / Projects → Now → Contact. This is an invitation, not a forced tour. Direct URLs, navigation and browser Back remain available. A small previous/next chapter action supports visitors following the sequence.

| Place | First visible state | Interaction and deeper state |
| --- | --- | --- |
| Entrance | Small scribbled cat and genuine loading state | Cat drawing resolves, then settles into the header when the page is ready |
| Landing | Personal introduction, visual atmosphere, invitation to explore | Choose Meet me or Explore my work; no full timeline, project inventory or interests grid here |
| About | Brief human introduction and four interest entry points | Music & dance, Cars, Sports, Stories each open a focused view; return to About without losing position |
| Journey | Graph path connecting education, work and current position | Select a node for that chapter's account; aspiration branch is distinctly labeled future direction |
| Projects | Horizontal preview wall with one dominant project and glimpse of next | Swipe or use arrows; open a project story with preview, purpose, ownership, decisions and links |
| Now | Small dated snapshot of current building, listening and reading/writing | Open a selected article, LinkedIn post or current project; distinguish active work from completed projects |
| Contact | Direct invitation and email/social actions | Minimal contact interaction; keep existing form behavior if the form remains |

Existing routes `/`, `/about`, `/experience`, `/projects`, `/blog`, `/contact` can own these chapters. Display `/experience` as Journey and `/blog` as Now, preserving existing article URLs. Skills remains available through secondary navigation or résumé context. Exact new nested routes are deferred until the content model is inspected; do not introduce competing routes for the same story.

## Entrance and cat header

The loader must be available in the initial HTML/CSS shell, not wait for a large client script. It can appear at the browser's first render; a website cannot show custom UI before the browser receives and renders it. Critical shell/assets determine readiness, not optional social feeds. No fake percentage or imposed delay. On quick loads, use only a brief entrance transition; never slow down the visitor to finish an animation. A failed optional asset must not keep the entrance locked. Reduced motion uses a static cat/loading label.

Header left: a compact cat strip, not Omkar's name. Center/right: clear chapter navigation, theme control, secondary résumé access. The cat is an optional tiny runner inspired by the interaction pattern of a jump game, with original scribbled-cat artwork. Idle until the visitor presses Play; explicit start, jump, pause, retry and exit states. Pointer/tap and keyboard alternatives; keyboard capture only while the game has focus. No sound by default. Pause when hidden or unfocused. Playing is never necessary to access any content.

Small-screen header keeps cat trigger, menu and theme control. Starting the game may expand a narrow accessible tray so navigation remains usable; final size to test. The same cat can connect loader and header, giving the entrance a purpose. A suitable licensed cat animation can be sourced; original art is now a specifically requested exception to the earlier no-custom-sticker direction. Do not import a heavy animation/game engine for this small interaction.

## About interest views

- Music & dance: chosen artists/tracks, why they matter, dance as an explicit interest. Text links or permitted artwork; no autoplay. Spotify is optional, and curated track links are enough initially.
- Cars: actual favorites, a short personal observation and photos the user owns or has permission to use. Do not infer car ownership.
- Sports: badminton, cricket and football. Capture whether Omkar plays, follows teams or both; do not invent teams, achievements or routines.
- Stories: fiction/nonfiction books, selected posts/articles and short personal reflections. Distinguish read, reading and want-to-read if used.

“Unlock” means reveal/open, never game completion, signup or a score requirement. Use visible labels beside symbols; asterisk/dance symbol styling remains a visual exploration, not a fixed requirement. Photographs and cultural favorites create connection more effectively than generic stock decoration.

## Journey graph

Use a directed path with labeled nodes and branches, not a dense draggable node cloud. Education, internships and work show verified dates and descriptions. Current position has a distinct “Now” label. Future direction is dashed and explicitly marked aspiration; no fabricated employer or future date. Clicking a node opens its small story panel. No skill scores or implied growth measurement on a numeric axis.

Desktop: graph and detail panel can share the viewport. Mobile: vertical graph with detail below the selected node. Offer a readable chronological list/text equivalent; zooming and precision dragging are not requirements to understand it. Journey / Projects switch connects career progression and personal projects while preserving separate destinations and Back behavior.

## Projects wall and Now

Wall: horizontal cards with CSS scroll-snap, visible next/previous controls and position indication. Touch swipes horizontally; normal vertical page scrolling is never converted into forced horizontal movement. Each card contains a title, a one-sentence idea, status and meaningful cover. Use a real preview, recorded demo, accurate diagram or designed text cover; lack of screenshots is not a blocker. A decorative placeholder must not be the final artifact. Opening detail preserves the wall position on return.

Now: curated entries with dates and source links are the first implementation. No automatic LinkedIn scraping, Spotify authentication or live integration is required. Building, listening and reading/writing are separate categories, with only populated items shown. Failed media/link previews retain the title and source link. Do not call stale entries “live”.

## Themes and motion

Design light and dark together with the same geometry and interaction rules. Light: warm neutral canvas and dark ink; dark: charcoal canvas and pale ink. One coherent accent family carries selection and playfulness. Cat strokes and media frames adapt explicitly. Theme preference persists using existing next-themes and existing mounted guards. Follow system preference until overridden.

Motion carries meaning: loader-to-header handoff; chapter entry; node selection; opening an interest; project browsing. Avoid simultaneous loops. Reduced motion removes travel/parallax and retains clear immediate state changes. The game remains opt-in. All controls have visible focus, tap targets and meaningful labels; overlays close with Escape and restore focus.

## Implementation ownership and future scope

Use the existing Next.js routes, header, ThemeProvider, ThemeToggle, Radix controls and installed Motion. Before implementation inspect all affected callers of shared transitions and FadeIn. Timeline layout and a very small optional runner are the specifically custom interactions; reuse existing controls around them. Preserve contact behavior and API contracts; no API change is assumed.

Future digital twin: explicitly excluded. No model, download, cache, consent banner, hidden toggle or speculative backend in this version. Preserve content as maintainable authored data where existing architecture fits. A later design must honestly specify what runs on device, model/download size, caching behavior, user control, data boundaries, fallback and deletion; small footprint is an aspiration, not a present technical promise.

## Next review artifact and verification

Next deliverable is a desktop/mobile interaction storyboard: entrance, landing, About with an interest open, graph with a node selected, project wall with detail, Now and Contact; both themes represented. Then a small clickable prototype proves the transitions, cat activation and graph/wall use before full implementation. Do not call a static homepage image a complete experience design.

Acceptance: independent chapter navigation, direct links and Back; genuine loading and recovery; no game or animation gating; accessible graph and horizontal wall; mobile/touch/keyboard behavior; reduced motion; contrast in both themes; authentic personal content and correctly scoped work claims. Tests and browser verification follow implementation, not this planning step.

## Follow-up decisions from the user

Interests are deliberately understated and lower priority than the core experience. Confirmed artists: Martin Garrix and Arijit Singh. Show these as taste clues, not recommendations. A small “Exchange a playlist?” invitation may link to Contact with an optional Spotify/Apple Music URL in the message; no music-account connection or upload required. Cars, sports and stories may remain lightly populated. Avoid dating-profile framing, forced quirkiness and fabricated favorites. Discoverability can reward exploration, but contact information and professional material remain obvious.

Journey covers the whole life path: 2004 (birth, explicitly user-confirmed), schooling, college, experiences, current work and future human/engineering aspirations. Unknown school names/dates stay out of public copy until verified. Future label can simply be “Still becoming” pending authentic wording; it does not promise a role or employer.

## Source and reuse decisions

- [React Flow](https://reactflow.dev/): recommended graph foundation, MIT-licensed core. Its [accessibility support](https://reactflow.dev/learn/advanced-use/accessibility) includes keyboard and screen-reader behavior. Use built-in nodes/edges with styling, disable editing/connection creation, and keep mobile navigation simple. No bespoke graph engine; Pro examples are not assumed available or needed.
- [Embla Carousel](https://www.embla-carousel.com/): already used by `components/ui/carousel.tsx`. Reuse that component for the project wall instead of the earlier CSS-scroll-snap proposal. No upgrade or new carousel dependency is needed for the design.
- Existing Radix controls, Motion and next-themes own dialogs, menus, transitions and themes. Cat runner remains a source-selection task: find a suitable reusable licensed implementation/art asset before committing to custom logic. No cat-game package has yet been selected or license-verified.
- LinkedIn public profile was located at https://in.linkedin.com/in/omkar-jawalikar, but direct retrieval returned HTTP 999. Indexed snippets are insufficient to reconstruct school history. Do not claim a complete LinkedIn audit. Existing About source confirms VIT CSE but still says “Expected Graduation: July 2026”; reconcile this stale wording with the résumé before publication. Do not use people-search aggregators as biographical authority.

No code, deployment or public content changed in this step. Unfilled interests do not block the storyboard. School history and precise aspiration copy remain content gaps, not reasons to invent details.
