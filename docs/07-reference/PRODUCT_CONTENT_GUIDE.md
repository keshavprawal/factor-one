# Product Content Entry Guide

## Purpose

This guide explains how to add founder-approved product copy and media without
editing presentation components or creating another source of truth.

## Authoritative Files

- Product identity, copy, compatibility, commercial state, specifications, and
  media references: `apps/web/src/config/products.ts`
- Product media paths, placements, rights, and approval state:
  `apps/web/src/config/product-media.ts`
- Product anchor destinations: `apps/web/src/config/product-routes.ts`

Do not add product image paths directly to pages, cards, carousels, navigation,
or vehicle configuration.

## Content States

Every field that requires approval uses one of these states:

- `pending` — no approved value is available; `value` must be `null`.
- `draft` — a real working value exists but is not approved for launch.
- `approved` — the founder-approved launch value is present.

Product identity, category, lifecycle status, availability, and compatibility
are explicit fields rather than implied by customer-facing copy.

### Required for launch

- Unique id and slug
- Name and category
- Verified vehicle compatibility
- Approved short and full descriptions
- Approved problem statement and key benefits
- Approved specifications, materials, and included items
- Approved installation method, difficulty, and estimated time
- Approved care, warranty, and limitations content
- Approved SEO title and description
- Accurate availability and purchasable state
- Final approved media with resolved rights and useful alt text
- Approved price when the product is available for purchase

Variants, badges, and related products are optional. They should remain empty
rather than being invented.

## Adding Founder-Supplied Copy

1. Open the matching record in `apps/web/src/config/products.ts`.
2. Replace only the relevant `value`.
3. Set its status to `draft` while it is being reviewed.
4. Set the status to `approved` only after founder approval.
5. Keep unknown values as `{ status: 'pending', value: null }`.
6. Run `pnpm content:check`.

Do not infer specifications, pricing, warranty, compatibility, materials, or
limitations from photography or supplier copy.

## Adding Founder-Supplied Images

1. Optimise the image for web delivery before committing it.
2. Store product media under
   `apps/web/public/images/products/<product-slug>/`.
3. Use lowercase kebab-case names:
   `<product-slug>-<placement>-<sequence>.<extension>`.
4. Add one record per asset and intended placement to
   `productMediaManifest`.
5. Add the media id to the matching product's `media` array.
6. Record:
   - local source path
   - product id
   - intended placement
   - aspect ratio
   - accurate alt text
   - source and credit
   - rights status
   - approval status
   - temporary or final status
   - viewport and focal point
7. Remove the superseded temporary media record only after every consumer has
   moved to the approved asset.
8. Run `pnpm content:check` and inspect the relevant route at mobile, tablet,
   and desktop sizes.

Hero and featured-carousel placements require distinct approved assets. Reusing
the same source in both locations is reported by content validation.

## Validation

Run structural validation during development:

```bash
pnpm content:check
```

This fails for broken references, duplicate identity, missing alt text, absent
local files, invalid purchase state, and other structural errors. Expected
draft incompleteness is reported as a launch warning.

Run strict launch validation before public release:

```bash
pnpm content:check:launch
```

Strict mode converts launch warnings into failures. A product is ready only when
strict validation passes and its deployed presentation has been reviewed.
