# Personal index: original composition proposal

Status: direction for review, not approved implementation. Supersedes the derivative reference-reset sample. Generated sample: `portfolio-personal-index.png`. Prompt: `portfolio-personal-index-prompt.txt`.

## Idea

Meet Omkar, then choose a story. A personal introduction and expandable index share the opening screen. The interaction makes room for curiosity without hiding the basic identity, work or contact information. The design takes playfulness and progressive discovery from the user's brief; it does not reuse Owoetoni's colored word collage, centered hero, pill navigation or project folders.

## Composition

Desktop: coral introduction surface on the left, warm neutral project index on the right, then a full-width personal section. Use the existing `public/pfp_side.jpg` portrait, not generated character art. Each project row presents name, short purpose and an explicit expand control. The expanded row shows a preview and links to the deeper story and source where public. This is an accordion composition, not a set of floating cards.

Mobile: introduction first, index below in normal scroll flow. Expanded project content pushes following rows downward. No horizontal carousel, pinned split layout or hover dependency. The second mobile frame depicts the same page scrolled with Saathi open.

Proposed first-view copy:

- Hi, I’m Omkar.
- Software engineer · Anarock
- I like making things work. And understanding why they don’t.
- See my work / Say hello

Copy is proposed positioning, not an approved quotation. Initial project index: At Anarock (Product workflows & APIs), Saathi (A collaborative workspace), AtlasPay (Payment workflows). Personal section: Music, Cars, Badminton, Stories. Preserve Tech within About/exploration content. Do not invent anecdotes or publish private chat details.

## Visual system

Proposed typography: Bricolage Grotesque for display and DM Sans for reading, subject to font availability/license verification before adding assets. The generated image approximates the direction; it is not proof of exact fonts. Coral #ED6948, deep aubergine #302334, warm neutral #F1F0EA and muted lilac #DDD6EB. Thin row separators, 8px control corners, expressive type scale and generous space create personality without illustrations or stickers.

Dark mode remains required: proposed aubergine canvas, pale text, muted coral introduction and raised lilac-tinted detail surfaces. Validate actual foreground/background combinations before implementation. The current sample focuses on light composition; it does not claim to finalize dark mode.

## Behavior and reuse

Use existing Radix Accordion for project expansion and existing Button/Sheet/Dialog controls. One project open at a time; all names and summaries always visible. Desktop sample shows Saathi open to demonstrate the state; proposed initial state is all collapsed. Expanding a row must not unexpectedly move keyboard focus. The button reports expanded state and controls a labeled region. Link actions remain separate from the expand button. Employer work never exposes a public-source link unless an authorized public artifact exists.

Use installed Motion only for a short 180–250ms expansion and a 2–3px hover response. No scroll trapping or looping movement. Reduced-motion mode removes movement; content stays readable. Navigation is ordinary text links; mobile uses an accessible menu with Escape, focus containment and focus restoration. Existing ThemeToggle/next-themes remains responsible for theme state.

## What belongs behind each story

Problem, individual contribution, decisions, evidence and limitations. Anarock content must be sanitized and authorized for public sharing. Saathi story should distinguish reconnect/event replay from unsupported offline-editing claims. AtlasPay metrics require reproducible workload context. The preview shown is explicitly a placeholder until real project media is selected. The existing Projects, Experience, About, Skills, Blog and Contact routes remain available; this opening does not remove them. Resume and contact should remain directly accessible.

## Review boundary

This iteration evaluates originality, hierarchy, personality and desktop/mobile composition. It is not another final site document. No application source, routes, APIs or deployments changed. The sample is generated, not an interactive browser render. Font fidelity, color contrast, keyboard behavior, responsive breakpoints, actual project media and dark-mode rendering require implementation verification after the direction is accepted.
