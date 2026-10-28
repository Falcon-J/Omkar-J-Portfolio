# Scene reference implementation

User approved implementation of the app-wide reference on 28 October 2026. No further design approval or deployment is part of this run.

1. Shell worker owns map-shell.tsx, map-shell.module.css and map-state.ts: full scene dialog, shared Back/Explore, URL details and toolkit compatibility, 700ms peripheral mist. Preserve clock and map behavior.
2. Main owns destinations.tsx, destinations.module.css and destination-data.ts: shared image coordinate plane, scene actions, readable content sheets, Home cards, Journey journal, project story/toolkit, notebook and persistent contact form. Extend existing form only if verification identifies a real accessibility defect.
3. Test worker owns tests: update obsolete interest-menu expectations, exercise valid/invalid details, focus and Back behavior, scene states and contact preservation. Real browser checks supplement synthetic tests.
4. Main starts one preview, verifies Home against the reference at desktop and 360px before finalizing remaining sections, then checks every scene and relevant failure paths. Production build and frame measurements follow.
5. Architect reviews final source and evidence. Resolve material findings, preserve unrelated work, report only observed verification. No commits, pushes or deployment.

Navigation contract: home/personal (legacy interest deep links retained); journey/journal; workshop/saathi, atlaspay, toolkit; now/notebook; contact/letter. #skills routes workshop/toolkit. Shell owns history and native dialog; details remain within the same focus boundary. ContactForm stays mounted through navigation. CSS scene coordinates use the rendered artwork's dimensions, with explicit mobile focal points and a visible mobile Toolbox action.

Checks: TypeScript, focused node tests, production build, real browser desktop/mobile screenshots, all scenes and detail Back/Escape/deep links, keyboard, overflow/zoom, image failure, reduced motion, mocked contact success/failure/draft retention. Do not send real email during validation or claim physical-device performance from desktop emulation.
