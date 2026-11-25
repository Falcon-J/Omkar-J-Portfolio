# Five sections, one short portfolio

27 October 2026 · Design for review · No Next.js implementation changes

Open index.html for a responsive clickable design. The existing five-section storyboard image is the visual reference, not the final content source. The live site remains on its previous revision.

## Visitor progression

Who is he? → What has he built? → How did he get here? → How does he think? → Let’s connect.

1. **Introduction.** A single professional positioning statement, one sentence identifying Omkar and his work, Explore my work, and Get in touch. The landscape and small companion pair form the bottom edge rather than an entire screen.
2. **Selected work.** Saathi, AtlasPay, and AgentArena. Three short selectable cards control one shared case panel: problem, contribution, key decision, evidence. The source link is the evidence destination; no invented metrics or fabricated product screenshot. A single line covers current work at Anarock. The older reinforcement-learning article is labeled an earlier experiment, not a current activity or evidence for AgentArena.
3. **Journey.** VIT → ForgeAhead internship → Anarock internship → Anarock SDE I → aspiration. Selecting a node reveals a short story, with education and the two internships kept distinct. Future connection is dashed and labeled. No empty school node, birth milestone, skill score, or guessed future employer.
4. **About / How I work.** The existing jacket portrait and one thoughtful paragraph: understand systems, question complexity, reuse good tools, care about experience, and grow toward ownership. No interests grid or repeated résumé paragraph.
5. **Contact.** Email, LinkedIn, GitHub, résumé. Direct links and a small resting companion; no form or additional chapter.

## Visual system

Warm ivory, deep plum, lavender, peach; existing assets and identity. Dark mode uses the existing plum-based surface and higher-contrast text. No new sticker pack or visual brand.

Desktop uses a 1040px reading width, 40px section padding, 16–24px internal gaps, 64px hero heading, 28–36px section headings. Body text is 14–17px. There are no viewport-height sections or scroll-jacking effects.

Mobile uses 20px side margins and 28px section padding. Work cards form a short horizontal row with the next card visible; the selected case uses four labeled rows. Journey becomes a connected vertical path with a shared story beneath it. About reads before the portrait; contact links wrap naturally. Desktop and mobile have the same copy and section order.

All navigation items lead to sections. Each content control changes something visible. Native scrolling, visible focus, and reduced-motion support are requirements.

## Supporting interaction storyboard

| Moment | Design | Exit / alternative |
| --- | --- | --- |
| Essential page content loading | Only mini Omkar and Stella walking together. No photo, progress percentage, or minimum wait. | Content appears immediately when ready. Reduced motion shows the still pair. Fast loads may show no loader. |
| Introduction arrives | One short wave; small pair rests beside the landscape. | No further motion until relevant visitor input. |
| Visitor scrolls | A brief walk in reserved edge positions, then a resting pose. | No endless bouncing, roaming over text, or mandatory character navigation. |
| Project selection | Selected border, tab state, and case details update together. | Keyboard arrows, Home, End, click, or tap. |
| Milestone selection | Current node and story change together; miniature can gesture beside the story. | Focus stays with the selected control. No numerical growth chart. |
| Four treats | One optional treat each in Work, Journey, About, Contact; collection is unique. | No content is gated. Hidden guide does not hide reward access. |
| Surprise ready | Footer control changes to ready; the visitor chooses to open it. | No automatic dialog or navigation. |
| Photo reveal | Original Omkar-and-Stella photo beneath a scratch layer in eventual implementation. | Equivalent Reveal image button. The design preview demonstrates tap reveal only. Escape closes; focus returns to opener. |
| Hide guide / reduced motion | Hide guide removes companions; reduced motion stops travel. | All work, timeline, contacts, and reward remain usable. |

The prototype animates only a short entrance. Loading, scroll walking, scratch gestures, and project simulation are specified here rather than fabricated as finished behavior. It does not install a pet or run a model.

## Proposed content and evidence boundaries

- Project descriptions and source destinations come from lib/portfolio-projects.ts. Contribution wording is a proposed summary of that existing record, not a fresh source-code audit.
- Current work comes from the current portfolio’s Anarock description. Publication and confidentiality still need review before release.
- Education and role history come from components/portfolio/journey.tsx. ForgeAhead dates were marked in the existing storyboard as needing résumé reconciliation. Exact dates remain a release content check.
- About and milestone stories are proposed first-person copy for Omkar to review; they do not assert new accomplishments or private personal details.
- No live activity feed, email sending, account, tracking, public wall, map, or digital twin is part of this design.

## Implementation handoff after design review

Reuse the current Next.js sections, Motion, Radix, Embla, and theme tokens. Reorder the homepage; remove Now and interests; fold the article/current-work line into Work; simplify Contact; move the fourth treat from Now to Contact. Update navigation, old route redirects, and section/reward tests together. Keep the optional Workshop behind the relevant project detail.

Acceptance: exactly five named sections, same order on mobile, no dead controls, one h1, no horizontal page overflow, keyboard-selectable projects and milestones, accurate active navigation at the short page bottom, no obstructed reward control, and preserved reduced motion and optional photo reveal.

## Review evidence

The design preview was checked at 1440px desktop and 390px mobile, with all five sections in order and no horizontal page overflow. Project click and keyboard selection update the shared case panel and source URL. Milestone selection changes the story. Four unique treats enable the original-photo reveal; closing restores opener focus. Theme and guide controls are local preview state.

A source review identified and corrected duplicate anchor offsets, focus loss after photo reveal, persistent mobile-menu state after resizing, and small mobile case text. Screenshot capture was reliable for the desktop introduction/work view; the responsive preview is the primary artifact for inspecting the complete page.

Desktop: index.html. Mobile frame: mobile.html. Supporting loader/companion/reward state board: states.html. These remain design artifacts, separate from the Next.js application.

## Redundancy pass

Removed duplicate section eyebrows, the intro role label, selected-project name repetition, three repeated case-study prompts, generic evidence filler, the portrait caption/signature, the timeline slogan, and the contact preamble. Current work stays in Selected work; the current-role story now explains progression instead of repeating the same responsibilities. About focuses on working approach; aspirations remain in Journey. The mobile frame hides the internal design-review toolbar.

All three projects, five sections, four treat controls, evidence links, and navigation remain available. Only the design artifact was edited.
