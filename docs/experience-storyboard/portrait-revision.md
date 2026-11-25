# Loader and About revision
25 October 2026 · User-requested storyboard update

This revision supersedes the scribbled-cat entrance and interest-grid About page. The header's optional cat game remains a separate component; this update does not replace it or require an illustration-to-game morph.

## Sources
- Loader: user-supplied `C:/Users/1552441/Downloads/stella.jpg`, copied unchanged to `assets/loader-stella.jpg`.
- About: existing `public/omkar-jacket.webp`, copied unchanged to `assets/about-jacket.webp`.
- These source copies are the implementation assets. Generated boards approximate their placement; never replace the source portraits with a generated rendition.

## Loader
The illustrated image of Omkar and Stella appears in a modest portrait panel, surrounded by quiet space. Preserve both faces and the cat's ears: use contained framing rather than cropping a square thumbnail.
1. First render: neutral page shell and loading label appear immediately; source image decodes.
2. Reveal: when the illustration is ready, a short soft mask/fade reveals it. This is visual feedback, not a percentage measurement.
3. Ready: proceed to the requested chapter as soon as essential content is ready. A 250–400ms crossfade may bridge the transition; do not hold the page open for the reveal to finish.
4. Failure/slow image: skip the illustration and allow content through. The loader asset must not become the reason the site cannot load.
5. Repeat visit/reduced motion: show the complete illustration briefly only if content is still loading; otherwise enter the page directly. No automatic game or button gate.

The header cat is independent. A literal morph from Stella's illustration into a scribble is not assumed feasible or necessary.

## About: paragraph becomes a portrait
Title: **A few pieces of me.**

Proposed paragraph:
> I’m Omkar, a software engineer who likes understanding how things fit together. Work is one part of the picture. Music, cars, sport, and stories fill in a little more. The rest is a conversation.

The full paragraph is readable from the start. As it comes into view, three meaningful phrase groups pair with three pairs of image tiles. Six rectangular tiles share the SAME jacket image and join seamlessly into a single portrait. No user must solve, drag or hover to read the paragraph or see the image.

- Desktop: paragraph left, portrait right. Three subtle text-emphasis beats accompany the tile assembly. Keep the portrait's position and size fixed to prevent layout movement.
- Mobile: paragraph first, portrait below. Trigger assembly when the portrait enters view, rather than completing it offscreen while the reader is still above it.
- Tiles move a short distance and fade in over roughly 200–300ms each, with light overlap; avoid repeated loops.
- Final state: full portrait without visible grid seams. The original source image is used throughout.
- Reduced motion or animation unavailable: full text and complete portrait immediately.
- Assistive technology: one image description, not six repeated image elements read aloud. Tiles are decorative copies; the meaningful image has a single alternative description.
- Under the paragraph: understated Music & dance, Cars, Sports and Stories links. Existing music detail remains available; interests are no longer the page's main grid.
- Continue my journey leads to Journey; browser Back/navigation remain normal.

Suggested mechanism for later implementation: existing Motion viewport/scroll utilities and CSS clipping of one source image. This is composition of existing image/motion primitives, not a new puzzle engine or custom canvas renderer. The user asked for an image assembling effect; no additional puzzle library is needed.

## Visual scope
Updated desktop board, updated mobile board, and a new reveal/complete interaction sheet. Light and dark retain the same imagery and layout. Portrait saturation is not arbitrarily changed by theme. A subtle surface may support the jacket's dark edges in dark mode.

Storyboard typography and generated image crops are illustrative. Production must preserve original asset fidelity. No changes to Next.js source, routes, game logic or APIs in this revision.

