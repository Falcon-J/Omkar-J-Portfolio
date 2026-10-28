# Companion portfolio implementation plan

**Goal:** Implement the approved chapter-based portfolio locally, including mini Omkar, Stella, and the optional treat reward.

**Architecture:** A persistent client provider beneath the existing theme provider owns visit state. Separate Next routes share a shell; chapter content owns its own selection and detail. Reuse installed UI and animation dependencies.

**Spec:** ../../experience-storyboard/companion-spec.md and the latest loader/treat direction in this chat.

**Tech stack:** Existing Next.js, React, Tailwind, Motion, Radix, Embla, Recharts and next-themes.

## Constraints
- No commit, push, deployment, API changes, or fabricated personal/project claims.
- Existing contact backend remains intact. Do not send test emails.
- Portfolio content and navigation never depend on the optional hunt or asset readiness.
- Four unique treat IDs; count derives from the collected set and survives client route changes.
- Preserve legacy route access, article links and resume access.
- Original supplied image is the reward; generated cutouts are decorative assets.

## Work and proof
1. Shared shell, tokens and visit provider: keep one header/footer; verify theme, menu, direct route entry and client navigation.
2. Home, About, Journey, Projects, Now and Contact: use factual existing content, connected selectable timeline and horizontal project wall with explicit controls. Check mobile reflow and project return focus.
3. Companion and loader: safe reserved positions, reduced motion, guide visibility, no forced loading delay or asset-dependent content gate.
4. Treats and reward: accessible collect controls, collect-once state, optional Radix dialog, native scratch surface if no existing component fits, equivalent Reveal image button and close focus return.
5. Proof: focused state tests, TypeScript, build, browser desktop/mobile, light/dark, hunt across routes, dialog keyboard behavior, reduced motion and overflow. Document any evidence gaps.

## Review focus
- Provider remounts and full-page links resetting progress.
- Hidden companion accidentally hiding reward access.
- Canvas pointer capture interfering with mobile scrolling.
- Reduced-motion users seeing infinite loader or travel animation.
- Generated imagery obscuring content or being mistaken for verified product screenshots.

Implementation is delegated to an explicitly requested Astra High agent. Parent owns asset preparation, independent browser validation, integration review and final handoff. Architect reviewed ownership and invariants before implementation.
