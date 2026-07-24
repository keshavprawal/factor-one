# TASK-001 — Global Navigation and App Shell

**Status:** READY  
**Priority:** P0  
**Owner:** Product  
**Implementation owner:** Codex / AI engineering agent  
**Depends on:** Existing Next.js application and design system  
**Canonical specification:** `docs/05-specifications/spec-000.md`

## 1. Objective

Implement the permanent application shell for the Factor One website so that every public route shares a consistent, responsive, accessible header, navigation system, main-content boundary, and footer.

This task creates the structural foundation for all later launch pages. It must not redesign or complete the page-specific content inside the shell.

## 2. User outcome

A visitor can immediately identify Factor One, understand the primary destinations, open search or cart, navigate using a keyboard or touch device, and always know where page content begins.

## 3. Governing requirements

This task implements the relevant requirements in `SPEC-000`, including:

- the Version 1.0 information architecture,
- consistent desktop and mobile navigation,
- immediate access to Search and Cart,
- predictable interaction behaviour,
- minimal visual presentation,
- responsive design,
- accessibility,
- performance and maintainability.

`AGENTS.md` is binding for implementation workflow and quality checks.

## 4. In scope

- Root application layout integration
- Skip link
- Site header
- Brand/logo link to `/`
- Desktop primary navigation
- Mobile navigation trigger and navigation panel
- Search control linking to or opening the existing search experience
- Cart control linking to the existing cart route
- Active-route indication
- Main-content landmark and stable content container
- Site footer
- Responsive behaviour from 320 px through large desktop widths
- Keyboard, focus, screen-reader, and reduced-motion behaviour
- Reusable navigation configuration
- Tests for critical navigation behaviour

## 5. Out of scope

- Homepage section design or copy changes
- Collection-page implementation
- Product-detail implementation
- Search-results logic
- Cart business logic
- Checkout
- Authentication or profile menus
- Notifications
- Garage, Learn, Assistance, or other future-platform navigation
- New analytics vendor integration
- New CMS or commerce integration
- Decorative animation systems
- Broad design-system refactors

The Version 1.0 navigation remains aligned with the canonical specification: Shop, About, Contact, Search, and Cart.

## 6. Required routes and destinations

| Control | Destination | Requirement |
|---|---|---|
| Factor One brand/logo | `/` | Must be a real link with an accessible name. |
| Shop | Existing canonical shop or collection route | Reuse the route already present in the application. Do not invent a duplicate route. |
| About | `/about` or existing canonical route | Reuse existing route if different. |
| Contact | `/contact` or existing canonical route | Reuse existing route if different. |
| Search | Existing canonical search route or approved search overlay | Must remain accessible from every public page. |
| Cart | Existing canonical cart route | Accessible label must communicate cart purpose; include item count only if reliable data already exists. |

Before implementation, inspect the repository and record the actual canonical paths in the pull request.

## 7. Functional requirements

### FR-001 — Shared shell

All public pages must render inside one shared root layout rather than duplicating header or footer markup.

### FR-002 — Header

The header must contain:

- Factor One brand/logo link,
- desktop primary navigation,
- search control,
- cart control,
- mobile menu trigger where desktop navigation does not fit.

The header must remain visually stable while route content loads.

### FR-003 — Desktop navigation

At the repository's established desktop breakpoint:

- Shop, About, and Contact are visible without opening a menu.
- Search and Cart remain directly accessible.
- The current destination is visually distinguishable and exposed programmatically with `aria-current="page"` when applicable.

### FR-004 — Mobile navigation

On smaller viewports:

- A single clearly labelled menu trigger opens the navigation panel.
- The trigger exposes expanded state with `aria-expanded`.
- Focus moves into the panel when opened and returns to the trigger when closed.
- Escape closes the panel.
- Selecting a destination closes the panel.
- Background scrolling is prevented while a modal navigation panel is open, if the selected pattern is modal.
- The implementation must use existing Radix primitives when they already satisfy the required behaviour.

### FR-005 — Search and cart access

Search and Cart must be reachable from every public page in no more than one interaction from the header.

Do not build search or cart business logic in this task.

### FR-006 — Main content

- Include one `main` landmark with a stable id.
- Add a keyboard-visible skip link targeting the main landmark.
- Page content must not be obscured by the header.
- Route content must not redefine the global page shell.

### FR-007 — Footer

The footer must provide concise groups for:

- navigation,
- company,
- support,
- legal,
- social links only where approved destinations already exist,
- current copyright.

Do not add fake links or placeholder social profiles. Omit unavailable destinations.

### FR-008 — Navigation configuration

Primary destinations must come from one typed configuration source used by desktop and mobile navigation. Do not duplicate labels and hrefs across components.

### FR-009 — Failure safety

The shell must render without depending on optional page data. Missing cart-count data or non-critical external content must not crash the layout.

## 8. UX requirements

- The shell must feel quiet, precise, premium, and predictable.
- Navigation labels must use plain language.
- Header and footer must not compete with product content.
- Do not use promotional banners, countdowns, flashing badges, or attention traps.
- Interactive feedback must be immediate and restrained.
- The mobile menu must clearly show open and closed states.
- The active destination must not rely on colour alone.
- The shell must support long page content without overlap or clipping.

## 9. Responsive requirements

Verify at minimum:

- 320 × 568 px
- 390 × 844 px
- 768 × 1024 px
- 1024 × 768 px
- 1440 × 900 px

At every size:

- no horizontal overflow,
- no clipped controls,
- no overlapping navigation,
- minimum 44 × 44 px touch targets,
- readable labels,
- footer groups remain understandable,
- shell spacing follows existing design tokens.

Do not introduce a new breakpoint system if the repository already defines one.

## 10. Accessibility requirements

- Semantic `header`, `nav`, `main`, and `footer` landmarks
- Navigation has an accessible label
- Logo link has a meaningful accessible name
- Icon-only controls have accessible names
- Visible `:focus-visible` treatment
- Logical tab order
- Skip link becomes visible on focus
- Mobile panel keyboard behaviour matches FR-004
- Active route uses `aria-current` where applicable
- Decorative icons are hidden from assistive technology
- Reduced-motion preference is respected
- No control depends solely on hover
- Colour is not the only indicator of state

## 11. Performance requirements

- Prefer Server Components for the shell.
- Isolate mobile-menu interactivity in the smallest practical Client Component.
- Do not add a new global state library.
- Do not add a new animation library.
- Do not block initial rendering on cart count or optional remote data.
- Avoid layout shift caused by late-loading header assets.
- Use the existing image or wordmark asset if present; do not add a large new asset.

## 12. Component guidance

Inspect and reuse existing components before creating new files. The following names are guidance, not mandatory architecture:

```text
apps/web/
  app/
    layout.tsx
  components/
    site-header.tsx
    desktop-navigation.tsx
    mobile-navigation.tsx
    site-footer.tsx
  config/
    navigation.ts
```

Acceptable alternatives are permitted when they better match the existing repository structure.

Business logic must not live in `app/layout.tsx`. The layout should compose the shell.

## 13. Visual implementation constraints

- Reuse existing colours, typography, spacing, border, radius, and shadow tokens.
- Do not define a second design language.
- Avoid oversized navigation, excessive blur, glass effects, or decorative gradients unless already canonical.
- The wordmark must remain legible at mobile sizes.
- Icons must use the existing icon library.
- Footer contrast and text size must remain accessible.

## 14. Analytics

Do not introduce an analytics dependency.

When an existing typed analytics utility is present, emit the following events through it:

- `navigation_clicked`
- `search_opened`
- `cart_opened`
- `mobile_navigation_opened`

Event payloads must not contain personal data. If no approved analytics utility exists, omit instrumentation and report this in the handoff.

## 15. Test requirements

Add or update tests appropriate to the repository's existing test setup.

At minimum verify:

1. Brand link points to `/`.
2. Primary navigation destinations render.
3. Main landmark and skip-link target exist.
4. Active route exposes `aria-current="page"`.
5. Mobile menu can open and close.
6. Escape closes the mobile menu.
7. Selecting a mobile destination closes the menu.
8. Search and Cart have accessible names and destinations.

If no automated UI test framework exists, do not add a large framework solely for this task. Add the smallest maintainable tests supported by the repository and document manual verification.

## 16. Acceptance criteria

The task is complete only when all statements below are true:

- [ ] Every existing public route renders inside the shared shell.
- [ ] Header and footer markup are not duplicated by page routes.
- [ ] Desktop users can reach Shop, About, Contact, Search, and Cart directly.
- [ ] Mobile users can open, navigate, and close the menu using touch and keyboard.
- [ ] Escape and focus-return behaviour work correctly.
- [ ] The active destination is visible and programmatically identified.
- [ ] A skip link moves focus to the main content.
- [ ] Search and Cart are accessible from every public route.
- [ ] The shell has no horizontal overflow at required viewport sizes.
- [ ] Interactive targets satisfy the 44 × 44 px minimum.
- [ ] The shell works with JavaScript hydration delayed; non-interactive structure remains visible.
- [ ] No placeholder links, fake counts, or unapproved destinations are shipped.
- [ ] Required tests pass.
- [ ] `pnpm lint` passes.
- [ ] `pnpm typecheck` passes.
- [ ] `pnpm build` passes.
- [ ] `pnpm format:check` passes.
- [ ] The pull request includes desktop and mobile screenshots.
- [ ] The pull request contains no unrelated feature or redesign work.

## 17. Verification commands

Run from the repository root:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build
pnpm format:check
```

Also perform keyboard-only and responsive manual verification on all required viewport sizes.

## 18. Implementation handoff format

The implementing agent must include the following in the pull request:

```text
Task: TASK-001
Canonical routes discovered:
Summary:
Files changed:
Components reused:
Tests added or changed:
Commands run and results:
Keyboard verification:
Screen-reader semantics checked:
Viewport verification:
Analytics status:
Assumptions:
Deviations:
Known limitations:
```

## 19. Open decisions

None are expected before implementation. If the repository contains conflicting canonical routes or duplicate shell implementations, do not invent a resolution. Document the conflict and choose the smallest change consistent with the authority order in `AGENTS.md`.
