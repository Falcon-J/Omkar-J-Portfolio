# Companion-led experience storyboard
26 October 2026 · Current direction for review

This supersedes the puzzle, automatic portrait assembly and click-to-flip About concepts. Those files remain archived and are not part of the active gallery.

## Current navigation revision

26 October 2026: the user selected one continuous scrollable page instead of route-separated chapters. Preserve the board compositions in Home → About → Journey → Projects → Now → Contact order. Sticky navigation targets section anchors and reflects the visible section. Older chapter URLs redirect to anchors. The optional Workshop stays separate. Remove the header play/purr control; use a decorative pencil-style cat. Theme, guide visibility, interests, project controls and the reward remain functional. Native scrolling, reduced motion and readable content take precedence over forced scroll effects.

## Concept
Mini Omkar accompanies visitors through the chapter-based portfolio. His movement responds to their actions and reading pace. Visitors do not control a character to access content. This is a website with an expressive companion, not a compulsory exploration game.

The user-supplied pixel character establishes likeness and proportion. Black jacket is the proposed everyday outfit; hard hat, vest and tools appear only during Workshop interactions. Stella can join at entrance/contact. Generated sprite depictions are direction samples, not a consistent production sprite sheet.

## Current boards
- companion-desktop-a.png: entrance, Home, About, Journey.
- companion-desktop-b.png: Projects, optional Workshop, Now, Contact.
- companion-mobile.png: mobile Home, Journey, Projects and About.
- companion-movement.png: arrival, walking, pause, selection, reaction and accessibility.

## Choreography
| State | Trigger | Behavior | Exit |
| --- | --- | --- | --- |
| Arrive | Essential page assets ready | Wave once; settle at chapter's start anchor | Idle |
| Walk | Scroll or chapter transition | Short bounded walk in reserved edge lane | Settle when scrolling stops |
| Pause | No relevant visitor action | Static pose; no perpetual bouncing or talking | Relevant navigation/selection |
| Select | Timeline node or project changes | Move to the corresponding anchor and gesture once | Idle |
| Help | Deliberate Workshop action | Change to tool outfit and react to simulation state | Return to normal outfit when leaving |
| Hidden | Hide guide | Companion removed; space collapses if safe | Show guide |
| Reduced motion | System preference | Stationary pose changes, no travel/parallax | Preference changes |

Movement follows progress but is not a literal pixel-for-pixel scroll translation. Use short walks between safe anchors, never jump unpredictably across text. Long scroll jumps can settle at the new anchor without traversing the entire page. Pause animation when hidden or offscreen. Keyboard focus stays with the visitor's control, never follows the sprite.

## Screens
Entrance shows only mini Omkar and Stella walking or running together. Enter immediately when essential content is ready, with no minimum animation time or fabricated progress. Reduced motion shows a still pair. Companion asset failure must not block the site. Reserve the supplied image for the optional treat-hunt surprise.

### Stella's optional surprise
Four treats is the proposed storyboard count: one each in About, Journey, Projects and Now. Place accessible treat buttons in discoverable margins, never over content or behind hover-only interactions. Portfolio content remains freely accessible.

States: undiscovered → collected once → all collected → surprise available → visitor opens card → scratch or select Reveal image → image visible. Repeated clicks never increment the count. Announce progress politely without moving focus. A small Stella control shows progress and reopens the reward; completion never forces a modal or route change.

Keep progress across chapter navigation for the current visit. Reload persistence is outside this first design. Hide guide hides animated figures without removing access to the progress/reward control. Use the original Omkar-and-Stella image in the reward, not its generated approximation.

Scratching is optional: Reveal image gives keyboard and touch visitors an equivalent action. Closing returns focus to the opener. Reduced motion removes running and celebratory motion. Reuse Motion and Radix Dialog if implemented; evaluate a lightweight scratch component at implementation time. No game engine, backend, timer, account or data collection is needed.

Landing introduces Omkar and offers Meet me / Explore my journey. A small wave invites attention; the miniature is not the headline.

About uses a readable paragraph and direct Music & dance, Cars, Sports, Stories links. There is no puzzle and no locked identity or interests. Confirmed artists remain Martin Garrix and Arijit Singh. Other interests stay intentionally light. The jacket portrait may appear as normal content in detailed design; it does not require a reveal task.

Journey is a connected life path with selected detail. Born 2004 is user-confirmed; school details remain unknown. VIT, internships and Anarock work require final résumé reconciliation. The diagram compresses internship detail; final content must distinguish ForgeAhead, Anarock internship and SDE I. Current node is Today, future dashed and labeled aspiration. Companion moves beside selected node, not over its label.

Projects retains the horizontal Embla wall and explicit navigation. Mini gestures toward the active card; opening a detail and returning restores selected card and focus. Typography covers are legitimate when screenshots are unavailable; they are not fabricated app captures.

Workshop is an optional proposed interaction reachable from project detail, not a new mandatory chapter. A duplicate-request simulation can illustrate a failure and mitigation. It must be labeled simulated and verified against the corresponding project before its behavior is attributed to Omkar's implementation. No API or live payment action is required.

Now uses curated dated updates, not an assumed live feed. Contact remains direct and quiet, with an optional single wave.

## Mobile and access
Reserve a small side lane for timeline anchors or a footer position for the figure. No overlay above tap targets, sticky full-screen game, global keyboard interception or forced horizontal scrolling. Hide guide remains reachable through a visible control or the menu. Reduced motion uses stationary poses. Treat purely decorative sprite imagery as hidden from assistive technology; all meaningful controls and explanations are ordinary UI.

The header now uses a decorative pencil-style cat, with no play button or implied game. Nothing in this storyboard creates or installs a Codex pet.

## Reuse and implementation boundary
Keep Next.js routes and existing Motion, Radix, Embla and next-themes. React Flow remains the proposed MIT core for graph display. A sprite renderer/assets and any animation helper are not yet selected. Do not add a game engine just to move a small figure between anchors. Existing Motion can own movement; sprite frames can supply walk/idle poses once a consistent asset is sourced or prepared.

No local model, digital twin, open map, public sticker wall, feed integration, analytics or API work is included. A future explore map remains a separate decision.

## Verification and known limits
These are static generated design artifacts. Likeness, sprite consistency, exact paths, timing, mobile clearance, theme contrast and keyboard behavior need prototype verification. Generated copies of photos are not production assets; preserve original files. Existing historical board artifacts are retained, but index.html links only the current companion direction.

