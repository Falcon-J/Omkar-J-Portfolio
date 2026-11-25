# Living Map Portfolio Completion Plan

**Status:** Review plan, 27 October 2026. The map and destination visual direction is approved; detailed screens, content, artwork and runtime proof remain open.

**Goal:** Create a personal portfolio that reveals who Omkar is and how he thinks through an accessible, gently animated 2D map and distinctive destination panels.

**Architecture direction:** Next.js owns content, direct URLs and navigation. The map is a presentation layer around ordinary accessible controls and content. Static Omkar and Stella illustrations appear in panels; ambient world motion is optional. A clock controls world lighting independently of the interface theme. Renderer and character/asset tooling remain subject to the proof.

**Design references:** `docs/experience-storyboard/living-map-storyboard.html`, `docs/experience-storyboard/living-map-spec.md`, `docs/experience-storyboard/living-map-components.md`.

**Boundaries:** Saathi and AtlasPay only; no AgentArena. No fabricated personal or project claims. Preserve useful existing links, contact contract, direct access and unrelated work. No commitment, push or deployment without explicit authorization. The concept image is not production artwork.

## 1. Complete the visual storyboard and approve it

- [ ] Draw the master map with labeled destinations, selected and focus states, Places access, résumé access, and a clean welcome state.
- [ ] Design Home, Journey, Workshop, Now and Contact at first open and each meaningful deeper state. Include Back, Close and recovery.
- [ ] Show project overview and story, milestone selection, interest detail, Now source, and contact validation, pending, success, failure and unsent draft decision.
- [ ] Create actual desktop and mobile compositions, light and dark reading interfaces, and map day/dusk/night treatments. Show interactive controls and focus, not only decorative screenshots.
- [ ] Resolve browser-local vs fixed timezone, clock controls placement, and contact draft policy. Reconcile content and external links; leave uncertain claims unpublished.
- [ ] Review each scene with Omkar. Gate: approved screen/state inventory and content boundaries, with open decisions recorded. No app rebuild before this gate.

## 2. Prepare the design system and artwork

- [ ] Finalize measured typography, color, spacing, control targets, focus, contrast and panel behavior; record tokens and states in the component specification.
- [ ] Prepare a clean map without baked-in controls or characters, separate landmarks and ambient layers, hotspot geometry and static character illustrations for destinations. Record editable sources, licensing, dimensions and fallbacks.
- [ ] Review scene-specific desk, route journal, workbench, reading table and letter designs against the same shared navigation/accessibility contract.
- [ ] Gate: each required screen has implementable assets and a reviewed state specification. No claim that generated reference imagery is ready to ship.

## 3. Build a small proof, not the full portfolio

- [ ] Inspect existing app shell, route redirects, contact, project content, themes and tests before deciding the exact file changes; preserve dirty work.
- [ ] Build one real map area, one accessible destination and one complete panel, with a static fallback and the approved static artwork.
- [ ] Implement preview and live clock for that slice: local time is a proposal pending decision; show preview mode, allow Live reset, derive time on resume, handle midnight and reduced motion. Keep interface theme separate.
- [ ] Test destination access, close/focus restoration, asset failure, clock boundaries, preview-to-live and hidden tab resume. Inspect desktop and mobile in a real browser.
- [ ] Measure frame timing, loading and responsiveness on a desktop and representative phone; record devices and conditions. 60 fps is a target, not a guarantee. Evaluate whether existing Motion/CSS suffices before considering a renderer or dependency.
- [ ] Gate: visual and interaction review of the actual proof, plus documented measurements and an explicit keep/change decision. If artwork or motion fails, revise the proof rather than scaling it.

## 4. Implement the rest in reviewable slices

- [ ] Implement shared map/Places navigation and panel lifecycle with focus, direct links, Back, Escape and fallback; use existing accessible primitives where suitable.
- [ ] Implement Home and Journey using reviewed authored content and verified milestones.
- [ ] Implement Workshop for Saathi and AtlasPay, verified claims and an optional clearly labeled local demonstration only if approved.
- [ ] Implement Now and Contact, preserving existing form/API behavior and chosen draft protection.
- [ ] Add approved ambient layers, day/night artwork and separate interface themes; pause optional effects when hidden and respect reduced motion.
- [ ] After each slice compare with the corresponding approved storyboard and run focused behavior and accessibility checks before continuing.

## 5. Verify the entire experience

- [ ] Run applicable focused tests, type check and production build; inspect existing lint configuration and record limitations.
- [ ] Exercise every destination, nested state, direct URL, browser Back, focus restoration, mobile/touch, theme and clock mode in a real browser. Check 360px, tablet and desktop, reduced motion, zoom, missing assets and form failure/recovery.
- [ ] Recheck actual content, source and demo links, résumé, contact integration and delivery separately. Document production dependency and security findings before release.
- [ ] Compare actual screens with the approved boards and repeat targeted performance measurements. Log discrepancies and fix them before claiming fidelity or performance.
- [ ] Gate: user review of the working portfolio; no deploy, commit or push without separate explicit authorization.

## Remaining decisions / evidence

- Clock timezone and whether the simulator is visitor-facing or review-only.
- Contact draft retention vs explicit discard confirmation.
- Final authored interest, journey and Now content; project role/evidence and external link verification.
- Exact asset pipeline and renderer; use the proof to decide instead of assuming Three.js, Rive or another dependency.
- Final design boards, editable artwork, browser verification and performance measurements have not yet been completed.
