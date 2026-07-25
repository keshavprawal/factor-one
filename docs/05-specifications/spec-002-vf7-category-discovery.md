# SPEC-002 — VF7 Category Discovery

**Document ID:** SPEC-002

**Version:** 1.0.0

**Status:** Implementation-ready, subject to final VF7 product photography and
approved category routes

**Owner:** Product

**Route:** `/vehicles/vf7`

**Parent specification:** `docs/05-specifications/spec-000.md`

## 1. Objective

Make the VF7 Browse by Category section compact, truthful, and useful without
inventing inventory, routes, or compatibility claims.

## 2. Product Discovery

The page may reference only product directions already approved in SPEC-001:

- Parcel Tray
- Screen Guard
- Door Visor
- Decals
- Rear Door Mud Guard
- Bumper Mud Guard

Product cards link to the distinct central homepage product anchors. Decals has
no approved route and remains a truthful unavailable state.

## 3. Category Model

Use three non-overlapping discovery groups:

1. Screen & Cabin — Screen Guard
2. Exterior Details — Rear Door Mud Guard, Bumper Mud Guard, Door Visor, Decals
3. Cargo & Storage — Parcel Tray

These labels organise the current product direction and are not final catalogue
taxonomy.

Category routes are not approved. Cards therefore render as disabled controls
with a visible `Coming soon` status and must not link to placeholder pages.

## 4. Layout

- Desktop: three balanced columns in one compact row.
- Tablet: two columns with normal vertical scrolling.
- Mobile: one column with normal vertical scrolling.
- No horizontal overflow.
- At 1440 × 900 the complete category section should fit cleanly within a
  normal viewport.
- At 1366 × 768 the section must appear intentional without a clipped card
  fragment.

## 5. Media

Do not use images under `public/images/categories/` in the VF7 category section.
They contain generic or unidentified cars and are not approved VF7 media.

Until approved VF7 product photography exists, use neutral CSS category studies
with a visible provisional label. A wrong car must never be used as a
placeholder.

## 6. Accessibility

- The section uses a labelled discovery group while category routes are
  unavailable.
- Each category has a clear heading, concise description, current product list,
  and visible availability status.
- Unavailable categories use semantic disabled controls rather than dead links.
- Text and status remain readable without relying on colour alone.

## 7. Route Integrity

- Product labels and destinations come from the shared typed configuration.
- Rear Door Mud Guard and Bumper Mud Guard always use distinct anchors.
- Door Visor never falls back to Parcel Tray.
- No category, product, support, or contact link may target an unimplemented
  route.

## 8. Acceptance Criteria

- [ ] The complete category grid is clean at 1440 × 900.
- [ ] The layout is intentional at 1366 × 768.
- [ ] Tablet and mobile remain readable and overflow-free.
- [ ] No generic or unidentified car appears in the category section.
- [ ] Category groups reflect current product direction without overlap.
- [ ] Category routes remain truthfully unavailable.
- [ ] Every visible product uses its configured destination/state.
