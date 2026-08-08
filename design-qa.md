# Design QA — VF7 Parcel Tray Product Page System

## Visual sources

- Horizontal logo: `docs/07-reference/brand-assets/factor-one-logo-horizontal.png`
- Footer behavior: `docs/07-reference/brand-assets/factor-one-footer-annotation.png`
- Adobe footer reference: `docs/07-reference/brand-assets/adobe-footer-reference.png`

## Implementation evidence

- Desktop: 1440 × 900 CSS pixels at 1× capture density
- Tablet: 768 × 1024 CSS pixels at 1× capture density
- Mobile: 390 × 844 CSS pixels at 1× capture density
- Route: `/products/parcel-tray`
- States reviewed: initial load, sticky problem state, sticky solution state, product details, final footer, gallery pagination, swipe, fullscreen, mobile menu, accordions, and FAQ

## Mandatory combined comparisons

- Logo comparison: `docs/07-reviews/assets/product-page-system-v1-final/design-qa-logo-comparison.png`
- Footer comparison: `docs/07-reviews/assets/product-page-system-v1-final/design-qa-footer-comparison.png`

The supplied reference and implementation were inspected together in each comparison image. The implementation preserves the supplied logo lockup proportions and spacing while scaling it to the existing 72px navigation. The footer consolidates the existing navigation and policy access into one dark section, then terminates with the oversized text-only wordmark at the page edge. It uses the reference for ending behavior only and does not reproduce its branding or interface.

## Findings

- No P0, P1, or P2 visual fidelity issues remain.
- The gallery uses a reserved aspect-ratio surface and keeps the approved image visible independently of hydration state; cache-cold reloads and all three slides resolve without a blank image.
- Desktop sticky storytelling uses normal document scrolling. Tablet and mobile retain the same semantic order without sticky positioning.
- Header logo, matched hero controls, feature hierarchy, compact product details, ownership/FAQ grouping, and footer remain free of clipping and horizontal overflow at all required viewports.
- The mobile closing wordmark uses explicit word spacing so both words remain legible while still touching the page edge.
- Representative visualisation and prototype-evidence disclosures remain visible and are not styled as production proof.

## Comparison history

1. Initial mobile evidence showed a blank gallery shell because image opacity depended on the client load state.
2. The image was made visible by default over the reserved placeholder; loading state now controls only the placeholder and accessibility status.
3. The initial stitched full-page captures repeated clamped scroll frames. Capture composition was corrected and the final evidence now represents the page once from top to bottom.

final result: passed
