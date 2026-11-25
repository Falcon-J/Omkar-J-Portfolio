# Map portfolio: character and motion specification

27 October 2026. Status: proposed design for review, not implemented or performance verified. This document accompanies the fresh map storyboard. The earlier scroll-based companion specification remains historical; it does not define map movement. No dependency has been added and no renderer has been selected.

## Experience contract

The visitor selects a destination; Omkar and Stella travel together along a defined path. Movement reinforces the selection but never delays access to its content. A destination can be opened immediately from the map or Places menu. Navigation is guided rather than direct character control: no joystick, collision puzzle or required keyboard movement is proposed.

The website owns destination selection, panel state, URL/history and focus. The character renderer receives the current pose and movement progress. Animation does not own navigation or decide when a panel is allowed to open. Content remains usable if the character assets or renderer fail.

## Character identity and assets

Omkar uses the approved likeness, black jacket and green shirt for ordinary travel. The workshop outfit is limited to the optional engineering demonstration. Stella retains the orange and white tabby identity. Both need one consistent source asset and shared proportions across their poses. The current separately generated images are visual references, not proof that an animation rig or aligned production sprite set exists.

| Asset | Required preparation | Acceptance evidence |
| --- | --- | --- |
| Omkar | Idle, walk, arrival acknowledgement, gesture, workshop reaction; left/right direction | Consistent likeness, scale, baseline and transition between poses |
| Stella | Idle, walk, settle, short acknowledgement | Same body proportions and markings; feet do not slide |
| Pair anchors | Start, path waypoints and a resting anchor at each destination | Characters clear labels, doors, panel edges and every interactive area |
| World | Separate background, terrain, paths, landmarks, foreground and optional ambient effects | Editable layer sources and documented ordering; no text baked into terrain |
| Interface | Native text labels, focus/selection signals, menus and panels | Readable independently of artwork, in both themes |
| Fallbacks | Still pair, destination illustration, readable content view | Site works when motion is disabled or optional assets fail |

Any adopted artwork needs recorded authorship/license and editable source. Do not assume generated concept art can be sliced into a coherent production world. The map illustration sets direction; production layers and paths must be authored deliberately.

## State and transition sheet

Timings below are initial design targets to test, not measured results. Character actions should feel responsive while allowing the visitor to read calmly.

| State | Entered by | Character behavior | Exit / interruption |
| --- | --- | --- | --- |
| Loading | Essential shell is not ready | A still pair or minimal loading indication; no fake percentage | Enter as soon as content is ready; asset failure cannot block it |
| Welcome | First map entry | One acknowledgement, approximately 600–900 ms, then rest | Destination selection interrupts immediately |
| Idle | No active travel or reaction | Still pose; optional subtle authored breathing only if unobtrusive | Selection, hide, reduced motion or document hidden |
| Walk | Destination selected | Follow the defined route; walk phase matches travel speed | Arrive, new destination, panel interaction, hide or pause |
| Arrive | Destination anchor reached | Decelerate, face the destination, one 250–450 ms acknowledgement | Rest, or respond immediately to a new selection |
| Interact | Interest, milestone or project selected | One brief contextual gesture, approximately 250–600 ms | Return to idle; never queue repeated reactions |
| Workshop | Deliberate demonstration action | Workshop outfit and short reaction to simulation result | Restore everyday outfit when leaving Workshop |
| Hidden | Hide characters selected | Remove both figures; retain destinations and all content | Show returns to the current destination anchor without replaying welcome |
| Suspended | Tab hidden or world offscreen | Pause rendering and discard ambient work | Resume from a stable current state without replaying missed actions |
| Reduced motion | System preference or explicit motion setting | Still pose at selected anchor; immediate position change | Preference changes affect subsequent actions, not a forced replay |
| Failed | Optional character asset/runtime fails | Still fallback or no figures; destination remains selected | Retry may be offered, but navigation continues normally |

## Travel and interruption rules

- Route movement uses a small authored path graph connecting named destinations. This avoids walking through buildings, water or content. Free roaming and general pathfinding are outside this design.
- On selection, show the destination's selected signal immediately. Offer or open its panel immediately according to the storyboard; walking is never a waiting gate.
- Start from the current position, not the previous destination. A new destination replaces the old travel target. Cancel obsolete arrival callbacks so an old destination cannot open after a newer selection.
- Repeated activation of the current destination opens/focuses its panel without replaying travel.
- Keep short travel within roughly 0.8–1.6 seconds. For a distant destination, use a short camera transition and settle at its anchor rather than fast-forwarding a long walk. Exact thresholds belong to the motion proof.
- Opening a panel pauses or settles the pair at a safe anchor. Panels are the reading surface; no character travel runs behind text to compete for attention.
- Closing a panel restores its map context and destination selection. It does not replay arrival or send the pair back to Home.
- Browser Back restores the preceding destination/panel state. Restore a stable pose rather than replaying the entire prior movement.
- Direction changes must match the walking asset. Mirroring is allowed only after checking asymmetrical clothing, tools and markings; do not mirror embedded text.

Stella follows the same route with a small spatial offset, initially approximately half a body length behind Omkar, rather than using a separate navigation system. She settles beside him at each anchor. Both use a shared movement target; rapid navigation must not strand Stella at an obsolete destination. The follow distance and turn behavior require visual testing.

## Camera, layout and reading

Desktop presents enough of the map to establish the world. Destination activation may move the camera gently to reveal its anchor, while preserving a sense of location. Use one camera owner; do not independently animate camera, map transform and browser scroll for the same action. No zoom is needed to read or activate a destination.

Panels have ordinary HTML headings, text and controls. On desktop they occupy a reserved side or centered dialog area; the characters settle outside that area. The final storyboard must specify one pattern consistently. On mobile, destination details occupy a full-width reading sheet or page with an explicit Back/Close action. Long content scrolls inside the reading surface without accidentally moving the world.

Mobile shows a framed part of the world rather than a scaled-down desktop screenshot. The Places control always offers direct destination selection. If panning is included, it needs an obvious reset/recenter action and must not be the only way to reach a place. A vertically scrollable destination list is the non-map equivalent. The motion proof must include narrow portrait and landscape layouts before the full world is built.

## Keyboard, touch and accessibility

- Landmarks are real labeled buttons or links with visible focus, selected state and touch targets of at least 44 by 44 CSS pixels. Decorative canvas content is hidden from assistive technology.
- Tab reaches Places, Resume, motion/theme controls and map destinations in a meaningful order. Arrow keys are not intercepted globally. The page remains usable without precision pointing or hover.
- Selecting a destination moves focus to the opened panel heading or first appropriate element. Dialog focus is contained where applicable; Escape and the close control return focus to the invoking destination or Places item.
- Announce a destination/panel change once. Do not announce every walk step or animation frame. Meaning must never depend on character expression, color or sound alone.
- No sound autoplays. No flash, continuous camera drift or compulsory parallax is proposed.
- Respect system reduced motion from first render and respond to changes. Essential content, selected state and navigation are identical with motion disabled.
- A motion/hide control remains reachable without entering the animated world. Theme changes preserve geometry, current selection and focus.

## Runtime candidates and ownership

Keep the existing Next.js application and HTML/Radix content controls while evaluating the scene. Existing Motion can coordinate interface transitions and the map camera. Rive is a candidate for consistent authored character states; a prepared sprite renderer is a valid alternative if it produces better tested motion for this pixel-art direction. Neither is selected by this document. Do not stack Rive, a game engine and multiple animation libraries without a demonstrated requirement.

The first proof should expose a small contract: destination selected, movement cancelled, arrival completed, characters hidden and reduced motion. The application retains the authoritative destination. Renderer events are advisory and cannot navigate to a stale target. Keep the asset/runtime failure fallback in the same proof rather than adding it at the end.

## Representative motion proof

Build only a small map area, one start anchor, one destination and both characters. Demonstrate welcome → walk → arrive → idle → button reaction, then test the same sequence with a changed destination and a panel interruption. Include a still fallback. This is a disposable verification prototype, not approval to replace the portfolio.

| Check | Required observation |
| --- | --- |
| Visual continuity | No scale/likeness jumps, crop changes, floor sliding or mismatched character direction |
| Response | Selection signal appears immediately; panel access never waits for travel |
| Cancellation | Rapid repeated selection produces one current target and no stale panel/arrival |
| Focus | Keyboard can select, open, close and return; character movement never moves focus |
| Mobile | Characters, labels and panel remain clear at 360 CSS px and in landscape; no accidental page overflow |
| Reduced motion | Complete journey works with stationary poses and no camera travel |
| Failure | Block character asset/runtime; content and destination controls still work |
| Lifecycle | Hidden tab/offscreen scene pauses; return does not replay welcome or missed events |
| Theme | Selection, path, focus and panels remain readable in light and dark |

## Performance evidence

60 fps is a target on a 60 Hz display, approximately 16.7 ms per frame, not a promise for every device. Compare the proof with the map idle and during travel/panel opening. Record browser, device, viewport, display refresh rate, build mode, asset transfer size and cold/warm load conditions. Use a production build and browser performance traces; a screenshot or a count of requestAnimationFrame callbacks alone does not prove smooth presentation.

Start with one active scene and one character pair. Update position through the renderer or transform rather than React state every frame. Pause hidden work, reserve dimensions, defer destination media and avoid animated full-map filters/shadows. Measure before adding ambient water, foliage or particles. These effects are optional and the first things to reduce on constrained devices.

The proof is accepted only after observed frame pacing, long tasks and interaction responsiveness are reviewed on desktop and at least one representative mobile device or clearly identified emulation. Record stutter cases and limits rather than claiming universal 60 fps. Production asset size budgets and final renderer choice should be set from these measurements.

## Review gate

Before full implementation, the visual storyboard must show the master map, each destination panel and its deeper state, travel/arrival/interrupt frames, mobile composition, reduced motion and failure views. Approve the character identity, navigation behavior and asset workflow. Then accept the representative motion proof with recorded evidence. The current concept and this document do not establish finished assets, accessible implementation or animation performance.
