# About puzzle: solve → click to flip → discover
26 October 2026 · Latest user correction

This supersedes the automatic paragraph/portrait assembly described in portrait-revision.md. The loader remains the supplied image of Omkar with Stella. The header game remains independent.

## Interaction
1. **Unsolved:** six jigsaw pieces form a paragraph on their front face. A few pieces can be pre-placed for an inviting first impression; the storyboard shows four placed and two remaining. The jacket portrait and four interest entrances are not visible yet.
2. **Placement:** drag a piece into its matching slot, or select the piece and then select the slot. Fixed pieces and targets make every attempt solvable. Incorrect placement returns the piece to its tray and gives gentle textual feedback; no countdown, punishment or score.
3. **Solved, awaiting click:** all pieces fit, completing the paragraph. Announce “All pieces fit.” Reveal a real button labeled “Click to flip” (tap/Enter/Space also work). Remain on the text-only front indefinitely until activation. No portrait or interests are visible yet.
4. **Flip, on explicit activation only:** pressing “Click to flip” makes the joined board one object and rotates 180 degrees around its vertical axis, revealing the existing jacket portrait on its reverse. Use a short crossfade instead for reduced motion, still only after the explicit click. The portrait is a single continuous image, never divided into jigsaw pieces or shown through the unfinished board.
5. **Explore:** once the portrait is facing the visitor, reveal Music & dance, Cars, Sports and Stories below it. Each action opens its view. Preserve solved state while navigating so returning does not require another solve.

Proposed front-face copy:
> I’m Omkar. I like understanding how things fit together. Work is one part of the picture. There’s more beyond it.

The paragraph is proposed copy; the relationship between solving and learning about Omkar is the central interaction. Do not substitute an automatic scroll reveal.

## Desktop, mobile and keyboard
Desktop uses a centered board with a piece tray alongside or below. Mobile stacks board and tray with generous tap targets. Keyboard: select piece with Enter/Space, move to a labeled slot, activate to place; announce success and completion. Focus stays predictable during animation; the newly revealed interests appear next in reading/tab order. The visual fragments should have one coherent accessible paragraph equivalent.

This gates only the About interest reveal. Main navigation, projects, résumé and Contact remain accessible throughout. No whole-site lock, autoplay audio or forced replay.

## Ownership and states
Use a source-vetted accessible drag/drop primitive if necessary, not a custom physics or puzzle engine. A final library is not selected in this design pass. Existing buttons support the tap/keyboard placement fallback; installed Motion owns the board flip and interest entrance. The source jacket image remains public/omkar-jacket.webp (also copied to assets/about-jacket.webp). Do not use the AI-rendered preview as the actual portrait.

Minimal state: placed piece IDs, selected piece ID, phase (solving / solved-awaiting-click / flipping / revealed). Completion is deterministic: every required piece is in its matching slot. Completion only enables the flip button. Only explicit button activation from solved-awaiting-click triggers the flip; ignore repeat activation while flipping. Restore solved-awaiting-click if the visitor solved but never flipped. Restore revealed only if the visitor already activated the reveal.

Artwork depicts interlocking jigsaw edges; exact masking and asset approach remain implementation choices. No new dependency installed and no puzzle code implemented. All controls within the boards are static illustrations.

## Current artifacts
- desktop-a-v3.png: revised desktop About initial state, other chapters retained.
- mobile-a-v3.png: revised mobile About initial state, other chapters retained.
- about-puzzle-flow-v2.png: solved, click-to-flip and reveal sequence, including the portrait and four interests.
- portrait-motion.png is archived because it showed automatic assembly rather than solving.

