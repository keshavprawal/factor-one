# SPEC-001 — Homepage V2

**Document ID:** SPEC-001

**Version:** 2.0.0

**Status:** Implementation-ready, subject to final product photography

**Owner:** Product

**Route:** `/`

**Parent specification:** `docs/05-specifications/spec-000.md`

## 1. Authority and Intent

This specification defines Homepage V2 for Factor One. It replaces the previous
SPEC-001 homepage direction.

The homepage must communicate, within five seconds:

> Factor One helps VinFast owners discover thoughtfully designed accessories
> built by people who own the same car.

It must answer, in order:

1. What problem exists?
2. Why does this matter to an owner?
3. How did Factor One solve it?
4. Why is the solution different?
5. What can the owner do next?

Factor One solves ownership problems first and sells products second.

## 2. Business Objective

Establish Factor One as the most trusted place for VinFast owners to discover,
improve, and help build accessories for their cars.

Success is measured by clarity and trust, not catalogue size or immediate
conversion. A visitor should understand:

- what Factor One makes;
- that Factor One currently serves VinFast owners;
- that products are shaped by people who live with the same cars;
- where to start with their car or an accessory;
- how owners can influence what is built next.

## 3. Brand Operating Principle

**Built with Owners** is the company operating principle and a permanent product
capability. It is not a campaign or a generic community forum.

The origin story supports, but does not replace, the operating principle:

> Started by VinFast owners. Built with owners.

“By VinFast owners, for VinFast owners” may be used only as supporting origin
context.

## 4. Information Hierarchy

The homepage must render in this order:

1. Product strip
2. Global navigation
3. Large Factor One wordmark
4. Built with Owners principle and origin
5. Hero explanation
6. Car and accessories entry paths
7. Featured products
8. Knowledge
9. Built with Owners roadmap preview
10. Why Factor One and PPF standard
11. Shared footer

Trust-building proof follows product discovery. Philosophy must not obscure the
initial explanation of the company.

## 5. Global Header

### Purpose

Give owners direct access to the current product ecosystem while remaining
truthful about unavailable destinations.

### Product strip

Render above the main navigation and include current product concepts:

- Screen Guard
- Rear Door Mud Guard
- Mud Guards
- Parcel Tray
- Door Visor

Each available item must link to a valid in-page product anchor. The strip must
remain horizontally usable on small screens.

### Primary navigation

Use the centralized navigation configuration:

- Parcel Tray
- Mud Guards
- Screen Guard
- Knowledge
- Built with Owners
- Assistance

Do not expose Decals without explicit approval. Configure Vehicles for future
use but do not render it. Assistance must remain disabled until an approved
route exists.

### Utility navigation

Use the label **My Garage**. It remains disabled until garage functionality and
an approved route exist.

### Responsive behaviour

- Desktop: product strip, wordmark, primary navigation, My Garage.
- Mobile and tablet: product strip, wordmark, My Garage status, accessible menu.
- Preserve keyboard order, visible focus, and the existing modal menu
  behaviour.

## 6. Brand Introduction and Hero

### Purpose

Explain Factor One before asking the visitor to explore.

### Required content

- Large wordmark: `FACTOR ONE`
- Operating principle: `Built with Owners`
- Origin: `Started by VinFast owners. Built with owners.`
- Headline: `Accessories that belong on your car.`
- Supporting copy conveying: Factor One designs accessories first for VinFast
  owners, informed by people who drive the cars every day.
- Primary action: `Explore My Car`
- Secondary action: `Explore Accessories`

### Visual

Use approved local product photography or an explicitly identified development
visual. Do not use a hero car, random stock photography, or third-party brand
imagery.

### Desktop layout

Use a charcoal surface. The wordmark and operating principle establish identity
before a two-column explanation and product visual. Keep copy widths controlled.

### Mobile layout

Keep identity and message concise. Stack copy, actions, and visual without an
artificial full-screen height. Ensure both actions remain easy to reach.

## 7. Two Entry Paths

### Purpose

Let visitors begin with either the car they drive or the accessory they need.
Both paths remain visible rather than being hidden behind tabs.

### My Car

- VinFast VF7 links to the existing `/vehicles/vf7` route.
- VinFast VF6 displays `Coming Soon` and has no navigation action.

### Accessories

List in this order:

1. Screen Guard
2. Rear Door Mud Guard
3. Mud Guards
4. Parcel Tray
5. Door Visor

Parcel Tray must remain second-last. Each item links to its matching featured
product anchor.

### Responsive behaviour

- Desktop: balanced two-column paths.
- Mobile: stacked paths with the car path first.
- Disabled states must remain legible and unavailable without appearing broken.

## 8. Featured Products

### Purpose

Introduce the current product direction without pretending that commerce,
pricing, or product pages are available.

### Interaction

Create a manual-first carousel with:

- adjacent previews;
- an active product that is subtly elevated;
- previous and next controls;
- touch and trackpad scrolling;
- restrained transitions;
- no autoplay.

### Product content

Use typed configuration outside presentation markup. Each item supports:

- stable ID;
- name;
- plain-language purpose;
- availability or development state;
- local visual and honest visual status;
- optional Owner Built evidence.

Do not invent prices, ratings, reviews, discounts, stock, compatibility, or
purchase destinations.

### Initial products

- Screen Guard
- Rear Door Mud Guard
- Mud Guards
- Parcel Tray
- Door Visor

Where final product photography is unavailable, label the image as a
development visual.

## 9. Knowledge

### Purpose

Show how Factor One will help owners understand fit, installation, protection,
and everyday use.

### Content

Use static, non-linking topics until approved destinations exist:

- Fit before you buy
- Install it properly
- Protect what gets used
- Learn from other owners

Do not invent articles, policies, support promises, or routes.

## 10. Built with Owners

### Purpose

Preview a public product-development roadmap that shows how owner problems move
through research, design, prototypes, and testing.

This is not a forum. The architecture must be ready to support future roadmap
detail, idea submission, voting, discussions, beta testing, founder updates,
prototype galleries, and product version history without implementing them now.

### Initial roadmap data

| Idea                        | Raised by  | Owners agree | Status       |
| --------------------------- | ---------- | ------------ | ------------ |
| Close the Parcel Tray Gap   | Keshav     | 184          | Designing    |
| Need Better Moonroof Cover  | Factor Lab | —            | Research     |
| Rear Door Mud Guard         | Factor Lab | 67           | Testing      |
| Better Protection Mud Flaps | —          | 212          | Prototype    |
| Frunk Organiser             | —          | 143          | Under Review |

Counts are founder-provided evidence. Do not fabricate absent raisers or counts.
Version 1 cards are read-only; do not render fake Vote, Discuss, or Beta Tester
controls.

## 11. Owner Built Badge

Products developed from documented owner feedback may display:

- badge: `OWNER BUILT`
- supporting line: `Requested by [approved count] owners.`

The badge must be reusable, compact, premium, and must never appear without
approved evidence.

## 12. Why Factor One

### Purpose

Explain the practical standard behind the products after visitors understand
what Factor One offers.

### Headline

`By the owners. For the owners.`

### Proof themes

- Engineered to Fit
- Designed to Belong
- Built to Protect

Descriptions must remain grounded in intent and current product direction.
Unsupported testing, manufacturing, material, safety, or compatibility claims
are prohibited.

### PPF standard

Introduce:

- Purpose — solves a real ownership problem.
- Protection — helps care for the parts of the car owners use.
- Fit — designed around the intended car and how owners use it.

Explicitly state that PPF is Factor One’s product standard in this context and
does not mean Paint Protection Film.

## 13. Visual System

Use the existing design system with a charcoal-led extension:

- charcoal;
- warm white;
- graphite;
- white;
- Factor One Red as a restrained accent.

Alternate section surfaces to create rhythm. Do not create an entirely dark
website.

Avoid:

- racing red-and-black styling;
- carbon-fibre textures;
- speedometer motifs;
- decorative gradients;
- glassmorphism;
- excessive rounded cards;
- excessive shadows;
- theatrical motion.

Hierarchy must come from typography, spacing, composition, scale, image
treatment, contrast, and section rhythm.

## 14. Language

Write like real owners speak.

Prefer:

- Protect your car
- Fits properly
- Solves real ownership problems
- Built because owners asked for it

Use `car` instead of `vehicle` in customer-facing copy unless the context is
technical.

Do not use:

- Less uncertainty
- Better ownership decisions
- Optimise
- Leverage
- Empower
- unsupported corporate or promotional claims

## 15. Component and Data Architecture

Reuse:

- `AppShell`
- `Navbar`
- `Footer`
- `Container`
- `Grid`
- `Button`
- `Card`
- `Badge`
- `ScrollLink`

Keep navigation, products, knowledge topics, proof themes, and roadmap items in
typed configuration.

New components are limited to repeated behaviour that existing primitives do
not provide:

- manual featured-products carousel;
- owner-roadmap card;
- Owner Built evidence treatment.

No CMS, API, global state, route, or dependency is authorized.

## 16. Accessibility

- One page-level `h1` and logical heading hierarchy.
- Semantic header, navigation, main, sections, articles, and footer.
- Keyboard access to every interactive element.
- Visible focus at WCAG AA contrast.
- Minimum 44 × 44 pixel targets.
- Disabled destinations use the ADR-0001 pattern.
- Carousel controls have descriptive names and expose position.
- Horizontal carousel remains usable without drag gestures.
- Colour never carries meaning alone.
- Decorative media uses empty alternative text.
- Product media uses accurate alternative text and identifies development
  visuals in visible text.
- Reduced motion disables smooth scrolling and transforms.
- No autoplay or timed content.

## 17. Performance

- Server Components by default.
- One focused client boundary for carousel interaction.
- No homepage data fetching.
- No new dependency.
- Next Image with reserved geometry and responsive sizes.
- Priority only for the hero visual.
- Lazy-load below-the-fold images.
- CSS-first motion.
- No avoidable layout shift or horizontal page overflow.

## 18. Out of Scope

- product purchases, prices, carts, and checkout;
- authentication and garage functionality;
- search;
- product, knowledge, assistance, community, or VF6 routes;
- compatibility engine;
- backend services or APIs;
- voting, discussions, beta applications, or roadmap detail;
- Decals without approval;
- final claims or photography not supplied by Product.

## 19. Acceptance Criteria

### Clarity and product intent

- [ ] The first viewport explains what Factor One is, who it serves, and why it
      is different within five seconds.
- [ ] `Built with Owners` is presented as the operating principle.
- [ ] Product discovery precedes trust philosophy.
- [ ] Both car and accessory entry paths are immediately understandable.

### Truth and scope

- [ ] No fake route, product fact, price, stock, rating, review, purchase state,
      compatibility claim, or business commitment exists.
- [ ] VF6, My Garage, and Assistance are truthfully unavailable.
- [ ] Vehicles is architected but not exposed.
- [ ] Decals is omitted.
- [ ] Product visuals that require replacement are visibly identified.

### Experience

- [ ] The page alternates charcoal, warm white, graphite, and white surfaces
      without a racing aesthetic.
- [ ] The manual carousel shows adjacent products and has no autoplay.
- [ ] Knowledge remains static and non-linking.
- [ ] The owner roadmap preview uses only founder-approved data.
- [ ] PPF is explained without confusion with Paint Protection Film.

### Architecture

- [ ] Existing AppShell, shared primitives, and navigation configuration are
      reused.
- [ ] Only `/` content and supporting shared presentation/configuration change.
- [ ] `/vehicles/vf7` remains functional.
- [ ] No new route, API, dependency, or global state is introduced.

### Responsive and accessibility

- [ ] The page works without horizontal overflow at 320, 390, 768, 1024, and
      1440 pixels.
- [ ] Header, entry paths, carousel, roadmap, and footer are intentionally
      composed for mobile, tablet, and desktop.
- [ ] Keyboard, focus, landmarks, headings, contrast, and reduced motion meet
      the repository baseline.

### Validation

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm build`
- [ ] `pnpm format:check`
- [ ] `git diff --check`
- [ ] Browser review at desktop, tablet, and mobile widths
- [ ] Draft PR #5 updated and remains Draft
