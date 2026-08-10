# Design QA — Projects redesign v2

## Scope

- Homepage Projects section only.
- Existing `/projects/[id]` case-study template.
- Existing animated GIF contact treatment and global footer retained.

## Evidence

- Projects reference: `/Users/moses/Documents/Codex/2026-07-29/raymanmoha-mohagraphics-https-github-com-raymanmoha/work/selected-projects-concept.png`
- Detail reference: `/Users/moses/Documents/Codex/2026-07-29/raymanmoha-mohagraphics-https-github-com-raymanmoha/work/selected-project-detail-concept.png`
- Current Projects capture: `/Users/moses/Documents/Codex/2026-07-29/raymanmoha-mohagraphics-https-github-com-raymanmoha/outputs/projects-redesign-v2.jpg` (1269 × 720 viewport)
- Current project row: `/Users/moses/Documents/Codex/2026-07-29/raymanmoha-mohagraphics-https-github-com-raymanmoha/outputs/projects-case-study-row-v2.jpg` (1269 × 720 viewport)
- Current Budj detail: `/Users/moses/Documents/Codex/2026-07-29/raymanmoha-mohagraphics-https-github-com-raymanmoha/outputs/budj-project-detail-v2.jpg` (1269 × 720 viewport)
- Current Budj story: `/Users/moses/Documents/Codex/2026-07-29/raymanmoha-mohagraphics-https-github-com-raymanmoha/outputs/budj-project-story-v2.jpg` (1269 × 720 viewport)
- Current GIF footer: `/Users/moses/Documents/Codex/2026-07-29/raymanmoha-mohagraphics-https-github-com-raymanmoha/outputs/budj-gif-footer-v2.jpg` (1269 × 720 viewport)
- Side-by-side comparisons: `design-qa-projects-v2.jpg` and `design-qa-detail-v2.jpg` in `outputs/`.

## Audit findings and fixes

1. P1 — Global `svg { height: 7rem; }` stretched every arrow-bearing link to 112px tall. Scoped icon dimensions inside both redesigned surfaces.
2. P1 — The Projects opening spent too much space on a generic statement. Replaced it with a compact three-product gallery and a direct case-study entry.
3. P1 — Feature rows felt oversized and inconsistent. Standardized all three as image-left, evidence-right rows with tighter type and spacing.
4. P1 — Project details repeated a full long-form markdown article plus metadata. Extracted and limited the story to Product, What I worked on, and Outcome.
5. P2 — The project-detail intro did not reveal product imagery in the first viewport. Reduced vertical padding and corrected CTA/icon height so the hero media now begins above the fold.
6. P2 — Related work did not match the selected source sequence. Budj now leads to ShambaBoy and Sava.
7. P2 — Retain the animated footer. `/img/herogifo2.gif` remains visible in the contact band and the existing global footer remains unchanged beneath it.

## Accessibility and interaction checks

- Semantic h1/h2 hierarchy and project `article` structure retained.
- Descriptive image alt text retained for product previews.
- Project links, All projects, live product, next-project, email, and footer links remain keyboard-addressable anchors.
- Focus outline retained on primary project media links.
- Compact breakpoints preserve source order and stack two-column layouts.
- Screenshot review cannot establish full WCAG compliance; screen-reader and browser zoom testing remain outside this visual QA.

## Verification

- Source and implementation were reviewed together at the same visible state.
- TypeScript, targeted lint, production build, and changed-file whitespace checks are required before handoff.
- Repository-wide lint contains pre-existing unrelated formatting failures; changed files have no lint errors.

final result: passed
