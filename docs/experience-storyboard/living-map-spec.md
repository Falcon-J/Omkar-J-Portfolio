# Living map portfolio: interaction and component specification

27 October 2026. Status: revised design draft. The user approved the direction of an ambient 2D map with selectable places and static Omkar and Stella illustrations inside content panels. The portfolio's purpose is insight into Omkar. This supersedes the traveling-character behavior in `map-motion-spec.md`; that file remains historical. No production application or dependency change is represented by this specification.

## Approved direction and proposals

Approved: the map is the navigation; visitors select a place and open its content; Omkar and Stella are static inside the panel; the world may have ambient movement; the review should include a day/night simulator and a gradual clock-based cycle. AgentArena is excluded. The remaining project selection is Saathi and AtlasPay.

Proposed defaults to review: use the visitor's browser local time for the automatic cycle, with the active timezone displayed; allow a time slider to preview a different hour and an explicit “Use live time” control to resume the clock. Do not imply real sunrise/sunset, weather or Omkar's current location. No location permission or external time service is required. An India-fixed clock is an alternative product decision, not approved by this document.

## World and content contract

The map is an expressive navigation surface. All readable content and controls remain normal HTML. A Places list reaches the same content as the map; no precision dragging, camera movement, game control or animation is required. Opening a place never waits for an ambient animation.

| Place | Visitor insight | First panel | Deeper action |
| --- | --- | --- | --- |
| Home / welcome | Who Omkar is and how to explore | Brief introduction and visible place choices | Open any place or résumé |
| About house | The person behind the work | Short introduction and labeled interests | Music & dance, Cars, Sports or Stories detail |
| Journey trail | What shaped his path | Readable chronology and selected milestone | Select a milestone and read its account |
| Workshop | How he builds and reasons | Saathi and AtlasPay, with clear purposes | Project story, source/demo where verified, optional labeled simulation |
| Reading corner / Now | What occupies him currently | Curated dated building, reading or writing entries | Open an actual source |
| Mailbox / Contact | How to connect | Email, LinkedIn, GitHub and résumé | Optional existing contact form |

Do not invent school history, favorites, performance results or current activity. Preserve existing useful URLs and contact contracts during the later implementation. A project illustration must not be presented as a screenshot of a real application. Static panel characters support the story, never replace the explanation.

## Interaction storyboard

| Trigger | Immediate state | Result | Return / recovery |
| --- | --- | --- | --- |
| First load | Labeled map or readable Places fallback | Welcome is available immediately | No fake loading delay or compulsory introduction |
| Activate landmark | Selected label updates | Open the corresponding panel | Close returns focus to the invoking landmark |
| Activate Places item | Same destination selection | Open the same panel and content | Close returns to the menu item or Places trigger |
| Open interest / project | Preserve parent selection | Show focused detail with Back | Back restores the parent position; Close returns to map |
| Select milestone | Update selected label and detail | Show its story without character travel | Choose another or close; future is explicitly aspiration |
| Open external source | Clear destination and link behavior | Follow the real link | Browser navigation remains standard |
| Submit contact | Validate; expose pending state | Success confirmation or readable failure | Preserve text on failure and allow retry; prevent duplicate pending submits |
| Press Escape / Close | Close the active overlay level | Return to preceding context | Restore focus and map position |
| Browser Back / direct URL | Restore authoritative destination state | Useful place content without an entrance gate | Do not create duplicate history entries on render |
| Map or character asset failure | Keep text navigation visible | Places and content remain functional | Static fallback or optional retry; no blocked site |

Nested reading should use one consistent pattern: replace the active panel body with an explicit Back action rather than stacking dialogs. On desktop the design may use one accessible modal panel; mobile uses a full-width reading surface with visible Close and Back. The final visual board must settle exact geometry. Selecting a new place replaces the current place and cancels obsolete asynchronous content work; stale data cannot reopen an earlier panel.

## Components and ownership

These are proposed responsibility boundaries, not a requirement to add a file or abstraction for every row. Reuse existing house primitives and fit implementation to actual scope.

| Responsibility | Owns | Must not own |
| --- | --- | --- |
| Portfolio shell | Active place/detail, URL/history, top-level error fallback | Per-frame ambient updates |
| Map scene | World layers, landmark geometry, responsive crop | Content visibility or form state |
| Place control | Accessible label, hit area, focus and selected signal | Separate navigation rules from Places list |
| Places menu | Direct destination list and keyboard access | A competing destination state |
| Place panel | Heading, static character illustration, Close/Back, scroll and focus | World animation or clock |
| Content views | About, milestones, project stories, Now and contact | Renderer-dependent navigation |
| World clock | Live timestamp, timezone label, preview override, normalized day phase | UI form state or geolocation |
| Ambient layers | Daylight, window lights and bounded effects from day phase | React state updates on every animation frame |
| Time controls | Preview hour, Live action and visible mode label | Silent persistent time override |

The same destination data must supply map labels and Places menu items. Selected state should be application-owned. The map renderer is optional decoration around accessible navigation and content, not the authority that decides which panel may open.

## Day and night behavior

The cycle is a stylized local clock, not an astronomical simulation. Proposed schedule: night around 00:00–05:00, a gradual dawn through 05:00–08:00, daytime through 16:00, gradual dusk through 16:00–20:00, then night. Final palette and schedule are design choices to review. The phase function must be continuous at segment boundaries and midnight; use minutes and seconds rather than snapping at each hour.

- Live mode reads the current browser clock on entry, periodically while visible, and immediately on visibility/focus return. Derive the phase from the timestamp; do not accumulate elapsed timer ticks, which drift when a tab sleeps.
- In live mode, blend the lighting gradually between readings. A resume after a long absence may settle to the current state without a long animated catch-up. Update the timezone label if the environment changes.
- Preview mode takes an explicit hour from a labeled slider. It pauses the live clock's effect on the scene while keeping the display clearly labeled “Preview”. A Live control removes the override and applies current time.
- Optional accelerated preview can demonstrate one full cycle in seconds, clearly labeled simulation. It must stop when hidden and must not alter the system clock. A slider is sufficient for the smallest version.
- Do not animate a full-map CSS blur, large shadow or expensive filter continuously by default. Prefer authored day/night layers and small lighting overlays, then measure. A prototype tint is an approximation and must be labeled as such.
- Separate world time from readable interface theme. Panels, landmark labels and focus rings retain contrast throughout every phase; dusk must not darken text along with scenery. A future UI theme override should not secretly change the clock.
- Reduced motion removes ambient travel and animated transitions while retaining immediate time selection and readable phase changes. No flicker or rapid light pulses.

Initial proof cases: 00:00, just before/after dawn, noon, dusk, 23:59 and the midnight wrap; manual preview followed by Live; hidden tab resume; changed timezone; reduced motion. The clock must display the same hour used by the scene.

## Artwork and responsive layout

The current reference is a flattened generated image containing baked-in interface elements and figures. It cannot be treated as final production layers. Prepare a clean map background without baked-in header/panels/characters, landmark placement metadata, separate windows/lights/water or foliage effects, and static destination character illustrations. Record source and license; keep editable artwork where possible.

Desktop: map and visible labels establish the whole world; a selected place opens a readable panel. Mobile: use an intentional crop or simplified map with all destinations available through Places. Do not shrink desktop labels until they are unreadable. If map panning is added, it needs an obvious reset and cannot be required. Destination targets should be at least 44 by 44 CSS pixels and avoid overlap at supported sizes.

Panel figures have reserved dimensions, appropriate cropping and no animation requirement. Decorative images have empty alternative text. Meaningful pictures receive accurate alternative text. Character image failure leaves content and layout usable.

## Accessibility and lifecycle

Use native buttons or links for landmarks. Places, résumé, time controls and all content are reachable by keyboard. Focus is visible against every daylight state. Modal panels contain focus, expose a heading and Close, support Escape and restore focus; a non-modal reading layout should instead preserve a logical document order. Do not combine the two patterns accidentally.

Pause optional ambient rendering in hidden tabs and offscreen scenes. No autoplay audio, compulsory scrolling, global movement keys or cursor chasing. Changing time must not move focus, reset a form, change the destination or announce each animation frame. The selected destination needs a text/shape signal as well as color. Failed art or disabled JavaScript must leave a clear content/navigation fallback in the production design.

## Proof and acceptance evidence

First build one clean map area with two or more accessible landmark buttons, a working panel with a static pair, Close/Back/focus restoration, the clock and preview slider, and one small ambient effect. Test before expanding the world.

Check at 360 CSS pixels, tablet and desktop, with keyboard and touch, reduced motion and forced asset failure. Validate every selected destination aligns with its landmark after resizing and cropping. Measure in a production build: cold/warm load, transfer size, frame pacing during ambient animation and panel opening, long tasks and interaction responsiveness. Record device, browser, viewport and refresh rate. A screenshot, build pass or requestAnimationFrame callback count is not proof of smooth presentation.

60 fps is a target on suitable devices, not a guarantee. Reduce optional effects when necessary; content and navigation have priority. Compare the small effect with the static scene before selecting a canvas runtime or 3D engine. Three.js is not a default dependency for this 2D direction. Keep Next.js and existing UI/Motion until a measured requirement justifies a different renderer.

Full implementation follows approval of the revised visual storyboard, actual clean assets, panel compositions and measured proof. This document establishes proposed behavior and ownership; it does not establish completed artwork, production accessibility or performance.
