# SPEC-002 — VF7 Category Discovery

**Document ID:** SPEC-002

**Version:** 1.1.0

**Status:** Implementation-ready, subject to final VF7 product photography

**Owner:** Product

**Route:** `/vehicles/vf7`

**Parent specification:** `docs/05-specifications/spec-000.md`

## 1. Objective

Make the VF7 Browse by Category section compact, truthful, and useful without
inventing inventory, routes, or compatibility claims.

No fake destination may be created, but the best truthful path that currently
exists must be used. A missing dedicated category route is not a dead end when
an existing product destination can help the owner.

## 2. Product Discovery

The page may publicly reference only products with useful configured
destinations:

- Parcel Tray
- Screen Guard
- Door Visor
- Rear Door Mud Guard
- Bumper Mud Guard

Product actions link to the distinct central homepage product anchors. Decals
remains in central typed configuration but is hidden because it has no useful
destination.

## 3. Category Model

Use three non-overlapping discovery groups:

1. Screen & Cabin — Screen Guard
2. Exterior Details — Rear Door Mud Guard, Bumper Mud Guard, Door Visor
3. Cargo & Storage — Parcel Tray

These labels organise the current product direction and are not final catalogue
taxonomy.

Each category communicates:

- category name;
- the area of the car it relates to;
- an accurate available-product count derived from configuration;
- every currently available product as a valid link;
- a clear action label.

Screen & Cabin uses `View Screen Guard`. Exterior Details uses `Explore
Exterior Products` and exposes all three distinct product choices. Cargo &
Storage uses `View Parcel Tray`.

Dedicated category routes are not approved and must not be invented. Category
cards therefore route through their valid product actions rather than linking
the whole card to a fake page.

## 4. Layout

- Desktop: three balanced, useful columns in one compact row.
- Tablet: two columns with the third card wrapping naturally.
- Mobile: one column with proportionate visual height and 44-pixel product
  actions.
- No horizontal overflow.
- At 1440 × 900 the complete category section should fit cleanly within a
  normal viewport.
- At 1366 × 768 the complete row should remain visible where practical; any
  continuation must feel intentional rather than clipped.

## 5. Media

Do not use images under `public/images/categories/` in the VF7 category section.
They contain generic or unidentified cars and are not approved VF7 media.

Until approved VF7 product photography exists, use clearly non-photographic CSS
visuals with consistent line geometry, restrained category-specific shapes,
warm-neutral surfaces, and minimal charcoal and red accents.

Customer-facing visuals may say `For your VF7` and show the accurate product
count. They must not expose internal terms such as study, prototype,
placeholder, test category, or provisional UI. A wrong car must never be used
as a placeholder.

## 6. Accessibility

- The section uses semantic articles and a labelled discovery group.
- Each category has a clear heading, concise description, accurate product
  count, and visible product actions.
- Every product link has a minimum 44 × 44 pixel target and visible focus.
- Links work by keyboard without requiring hover, expansion, or drag.
- Text and availability remain readable without relying on colour alone.

## 7. Route Integrity

- Product labels and destinations come from shared typed configuration.
- Rear Door Mud Guard and Bumper Mud Guard always use distinct anchors.
- Door Visor never falls back to Parcel Tray.
- Screen Guard resolves to `/#product-screen-guard`.
- Parcel Tray resolves to `/#product-parcel-tray`.
- No category, product, support, or contact link may target an unimplemented
  route.
- Routing must never depend on label guessing, array index, or a first-item
  fallback.

## 8. Acceptance Criteria

- [ ] Screen & Cabin exposes Screen Guard through its correct product anchor.
- [ ] Exterior Details exposes Rear Door Mud Guard, Bumper Mud Guard, and Door
      Visor through three distinct anchors.
- [ ] Cargo & Storage exposes Parcel Tray through its correct product anchor.
- [ ] Accurate counts show one, three, and one available products.
- [ ] Decals is not rendered publicly.
- [ ] No category is labelled `Coming soon` while it contains a valid product.
- [ ] No internal prototype language is customer-facing.
- [ ] The complete category grid is clean at 1440 × 900.
- [ ] The layout is intentional at 1366 × 768.
- [ ] Tablet and mobile remain readable and overflow-free.
- [ ] No generic, unidentified, or AI-generated car appears.
- [ ] Every visible product uses its configured destination.
- [ ] No fake category route is created.
