# SPEC-001 — Homepage V2

**Document ID:** SPEC-001

**Version:** 2.4.0

**Status:** Implementation-ready, subject to final product photography

**Owner:** Product

**Route:** `/`

**Parent specification:** `docs/05-specifications/spec-000.md`

## 1. Authority and Intent

This specification defines the founder-approved Homepage V2 direction. Version
2.4 supersedes conflicting navigation, wordmark, imagery, colour, hierarchy,
and section-order requirements in earlier SPEC-001 versions.

Within five seconds the homepage must communicate:

> Factor One helps VinFast owners discover thoughtfully designed accessories
> built by people who own the same car.

Every customer-facing experience must answer, in order:

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

The homepage origin statement is:

> By VinFast owners, for VinFast owners.

Required homepage brand statement:

1. Factor One
2. By VinFast owners, for VinFast owners.

The two lines must read as one cohesive statement. **Built with Owners** remains
the operating principle and roadmap capability but is not repeated between the
homepage wordmark and origin statement.

## 4. Information Hierarchy

Render in this order:

1. Global navigation
2. Large Factor One wordmark
3. Owner origin statement
4. Hero proposition
5. Car and accessories entry paths
6. Featured products
7. Built with Owners roadmap preview
8. Knowledge
9. Why Factor One and PPF standard
10. Shared footer

There is one header and one navigation layer. Product discovery precedes
trust-building philosophy.

## 5. Global Header

### Purpose

Provide one calm, configuration-driven navigation system without inventing
routes.

### Desktop navigation

Subject to truthful availability, the header contains:

- Parcel Tray
- Mud Guards
  - Rear Door Mud Guard
  - Bumper Mud Guard
- Screen Guard
- Door Visor
- Decals, only after a useful destination is approved
- Built with Owners
- Knowledge
- My Garage

Mud Guards is a compact, accessible submenu. It must:

- open reliably by click;
- support keyboard navigation;
- close with Escape;
- restore focus to its trigger;
- close after a destination is selected;
- not depend on hover.

Product destinations are followed by restrained spacing before Built with
Owners and Knowledge. Decals remains in typed configuration but is hidden until
a useful destination is approved; it must not render as a disabled product.
Valid destinations use stronger contrast and must not resemble disabled
controls. Vehicles remains configured for future use but is not rendered.

My Garage is the far-right account menu trigger. Its menu contains disabled,
truthfully labelled My Garage and Assistance destinations until approved routes
exist. Assistance is not a top-level navigation item.

### Mobile navigation

Use the existing accessible dialog. Mud Guards becomes one expandable item with
both sub-options visible inside it. Product, company, and account destinations
remain clearly grouped. The account group contains the My Garage menu with My
Garage and Assistance marked `Coming soon`. Avoid nested dialogs or
touch-dependent hover behaviour.

### Architecture

Navigation configuration must support available links, unavailable links, and
groups with children so products can be regrouped later without rebuilding the
header.

## 6. Wordmark

Use one reusable live-text wordmark component for the header, large brand
introduction, and footer.

Required text:

> Factor One

Requirements:

- title case;
- same identity and casing at every size;
- live, accessible text;
- no invented permanent logo;
- display version sits in an invisible rectangular viewport;
- clipping or masking may control scale without a visible box;
- elegant and restrained rather than campaign-like.

The founder’s future hand-drawn logo will replace this temporary wordmark.

## 7. Brand Introduction and Hero

### Purpose

Explain the company before asking the owner to explore.

### Required copy

- Wordmark: `Factor One`
- Origin: `By VinFast owners, for VinFast owners.`
- Headline: `Accessories that belong on your car.`
- Supporting copy: `Designed by owners who understand the small details because
we drive the same cars every day.`
- Discovery action: `Explore My Car`
- Discovery action: `Explore Accessories`

Do not add another eyebrow or positioning statement above the headline.
Both actions have equal visual weight. Neither may imply that Factor One sells
cars.

### Visual

The homepage is product-led. Do not show a generic or unidentified car.

Permitted:

- real Factor One product photographs;
- approved VinFast imagery already in the repository;
- close-up product compositions;
- clearly labelled non-photographic development placeholders.

The hero uses a manual-first multi-product media carousel representing Screen
Guard, Rear Door Mud Guard, Bumper Mud Guard, Parcel Tray, and Door Visor. One
product is prominent while adjacent products remain partially visible.

Until final photography is approved, the repository screen-guard close-up may
serve as clearly labelled provisional media. Products without approved
photography use intentional labelled placeholders. Reusing the Screen Guard
image in both the hero and featured carousel is a launch-blocking limitation:
production requires distinct approved hero and Screen Guard carousel
photography. Generic exterior car images and composite accessory collages are
prohibited on the homepage.

Hero media is controlled by one typed product-media configuration containing
stable product ID, product name, short purpose, desktop image, mobile image, alt
text, media status, focal point, destination, and availability state. Replacing
media must not require component restructuring.

### Responsive behaviour

Desktop uses controlled brand scale followed by a balanced product proposition.
Mobile keeps the complete hierarchy and both actions visible without an
artificial full-screen height or horizontal overflow.

## 8. Two Entry Paths

### Purpose

Let visitors begin with either the car they drive or the accessory they need.
Both paths remain visible instead of being hidden behind tabs.

### My Car

- VinFast VF7 links to `/vehicles/vf7`.
- VinFast VF6 displays `Coming Soon` with no navigation action.

### Accessories

Display in this order:

1. Screen Guard
2. Rear Door Mud Guard
3. Bumper Mud Guard
4. Parcel Tray
5. Door Visor

Parcel Tray remains second-last. Each item links to the matching featured
product anchor.

The stable product destinations are:

| Product             | Destination/state               |
| ------------------- | ------------------------------- |
| Parcel Tray         | `/#product-parcel-tray`         |
| Screen Guard        | `/#product-screen-guard`        |
| Door Visor          | `/#product-door-visor`          |
| Rear Door Mud Guard | `/#product-rear-door-mud-guard` |
| Bumper Mud Guard    | `/#product-bumper-mud-guard`    |
| Decals              | Hidden; no useful destination   |

Labels, stable IDs, and destinations must come from the central typed
configuration. Product discovery controls must not infer destinations from
array position, label matching, or copied fallback URLs.

### Responsive behaviour

- Desktop: balanced two-column paths.
- Mobile: stacked paths with My Car first.
- Disabled states remain legible and cannot navigate.

## 9. Featured Products

### Purpose

Introduce current product direction without pretending that commerce, pricing,
or product pages exist.

### Products

- Screen Guard
- Rear Door Mud Guard
- Bumper Mud Guard
- Parcel Tray
- Door Visor

### Interaction

Use a manual-first carousel with:

- adjacent previews;
- subtly elevated active product;
- previous and next controls;
- touch and trackpad scrolling;
- restrained transitions;
- no autoplay.

### Data and media

Typed configuration remains outside presentation markup. Each item supports:

- stable ID;
- name;
- plain-language purpose;
- development or availability state;
- optional approved image;
- honest visual status;
- optional Owner Built evidence.

Use the screen-guard close-up only for Screen Guard. Products without approved
photography use a neutral, non-photographic placeholder labelled `Photography
pending`. Never substitute a generic car image for a missing product
photograph. Homepage hero and featured-product media read from the same central
typed product-media configuration.

Do not invent prices, ratings, reviews, discounts, stock, compatibility, or
purchase destinations.

## 10. Built with Owners

### Purpose

Preview a public product-development roadmap showing how owner problems move
through research, design, prototypes, and testing.

This is not a forum. The architecture must be ready for future roadmap detail,
idea submission, voting, discussions, beta testing, founder updates, prototype
galleries, and product version history without implementing them now.

### Initial roadmap data

| Idea                        | Raised by  | Owners agree | Status       |
| --------------------------- | ---------- | ------------ | ------------ |
| Close the Parcel Tray Gap   | Keshav     | 184          | Designing    |
| Need Better Moonroof Cover  | Factor Lab | —            | Research     |
| Rear Door Mud Guard         | Factor Lab | 67           | Testing      |
| Better Protection Mud Flaps | —          | 212          | Prototype    |
| Frunk Organiser             | —          | 143          | Under Review |

Counts are founder-provided evidence. Version 1 cards are read-only. Do not
render fake Vote, Discuss, or Beta Tester controls.

This section uses charcoal as a selected high-impact surface.

## 11. Owner Built Badge

Products developed from documented owner feedback may display:

- badge: `OWNER BUILT`
- supporting line: `Requested by [approved count] owners.`

The badge is reusable and must never appear without approved evidence.

## 12. Knowledge

### Purpose

Show how Factor One will help owners understand fit, installation, protection,
and everyday use.

Use static, non-linking topics until approved destinations exist:

- Fit before you buy
- Install it properly
- Protect what gets used
- Learn from other owners

Do not invent articles, policies, support promises, or routes.

## 13. Why Factor One

### Purpose

Explain the practical standard after visitors understand what Factor One
offers.

### Headline

`By the owners. For the owners.`

### Proof themes

- Engineered to Fit
- Designed to Belong
- Built to Protect

Descriptions remain grounded in current intent. Unsupported testing,
manufacturing, material, safety, or compatibility claims are prohibited.

### PPF standard

- Purpose — solves a real ownership problem.
- Protection — helps care for the parts of the car owners use.
- Fit — designed around the intended car and how owners use it.

State that PPF is Factor One’s product standard in this context and does not
mean Paint Protection Film.

## 14. Visual System

The homepage is light-led:

- primary surface: warm white or off-white;
- primary text: charcoal;
- secondary surfaces: soft grey and warm neutrals;
- accent: Factor One Red, used sparingly;
- dark surfaces: Built with Owners and footer only.

Required rhythm:

1. Header — warm white
2. Brand and hero — warm white
3. Discovery — white or warm neutral
4. Featured products — warm white or soft grey
5. Built with Owners — charcoal
6. Knowledge — warm white
7. Why Factor One and PPF — soft grey or warm white
8. Footer — charcoal

Avoid:

- duplicated navigation layers;
- generic black-and-red automotive styling;
- dark automotive-template appearance;
- carbon-fibre textures;
- speedometer motifs;
- decorative gradients;
- glassmorphism;
- excessive rounded cards;
- excessive shadows;
- theatrical motion;
- compressed sections;
- unnecessary borders or decorative noise.

Hierarchy comes from typography, spacing, composition, scale, image treatment,
contrast, and section rhythm.

## 15. Language

Write like real owners speak. Use `car` instead of `vehicle` unless the context
is technical.

Prefer:

- Protect your car
- Fits properly
- Solves real ownership problems
- Built because owners asked for it

Prohibited customer-facing phrases:

- previously rejected corporate ownership slogans
- Optimise
- Leverage
- Empower
- generic consulting language
- duplicated philosophy statements

Use the correct spelling `VinFast`.

## 16. Component and Data Architecture

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

Approved focused components:

- reusable live-text wordmark;
- accessible grouped navigation;
- manual featured-products carousel;
- owner-roadmap card;
- Owner Built evidence treatment;
- neutral product visual placeholder.

No CMS, API, global state, route, or dependency is authorized.

## 17. Accessibility

- One page-level `h1` and logical heading hierarchy.
- Semantic header, navigation, main, sections, articles, and footer.
- Keyboard access to every interactive element.
- Visible focus at WCAG AA contrast.
- Minimum 44 × 44 pixel targets.
- Disabled destinations follow ADR-0001.
- Desktop submenu supports click, keyboard, Escape, and focus restoration.
- Mobile Mud Guards item expands without a nested dialog.
- Carousel controls have descriptive names and expose position.
- Horizontal carousel works without drag gestures.
- Colour never carries meaning alone.
- Product media has accurate alternative text.
- Development placeholders are visibly identified.
- Reduced motion disables smooth scrolling and transforms.
- No autoplay or timed content.

## 18. Performance

- Server Components by default.
- Client boundaries only for navigation interaction and the carousel.
- No homepage data fetching.
- No new dependency.
- Next Image with reserved geometry for the one approved provisional image.
- CSS placeholders for missing media.
- Priority only for the hero product composition.
- CSS-first motion.
- No avoidable layout shift or page-level horizontal overflow.

## 19. Out of Scope

- product purchases, prices, carts, and checkout;
- authentication and garage functionality;
- search;
- product, Knowledge, Assistance, Built with Owners, or VF6 routes;
- compatibility engine;
- backend services or APIs;
- voting, discussions, beta applications, or roadmap detail;
- Decals routes or product claims without approval;
- final claims or photography not supplied by Product;
- a permanent logo.

## 20. Acceptance Criteria

### Navigation

- [ ] Exactly one navigation layer is visible.
- [ ] Door Visor appears in the primary header.
- [ ] Decals is absent from customer-facing navigation while it has no useful
      destination.
- [ ] Mud Guards exposes Rear Door Mud Guard and Bumper Mud Guard.
- [ ] Desktop submenu supports click, keyboard, Escape, and focus restoration.
- [ ] Mobile Mud Guards expands to show both sub-options.
- [ ] Product links precede Built with Owners and Knowledge with restrained
      visual separation.
- [ ] Assistance appears inside My Garage, not as a top-level item.
- [ ] My Garage and Assistance remain truthfully unavailable.
- [ ] Every product label resolves to its central configured destination/state.
- [ ] No fake route exists.

### Brand and first viewport

- [ ] The large live-text wordmark reads `Factor One` in title case.
- [ ] Header, hero, and footer use the same wordmark component.
- [ ] Brand hierarchy and approved origin copy are exact.
- [ ] The two discovery actions have equal visual weight.
- [ ] No redundant eyebrow appears above the proposition.
- [ ] The first viewport is calm and explains the company within five seconds.

### Imagery and visual system

- [ ] No generic or unidentified car image appears on the homepage.
- [ ] The homepage is predominantly light.
- [ ] Charcoal is limited to Built with Owners and the footer.
- [ ] Missing product photography uses neutral non-photographic placeholders.
- [ ] Hero media represents multiple product directions and supports manual,
      swipe, and keyboard navigation.
- [ ] Hero media paths, alt text, status, focal point, destination, and
      availability come from one typed configuration.
- [ ] Missing or failed hero media always shows a labelled intentional state.
- [ ] Hero and carousel do not repeat the same product photograph at launch.
- [ ] Every provisional asset is recorded in the Build Review Package.

### Preserved behaviour

- [ ] Both discovery paths remain visible.
- [ ] Product order is Screen Guard, Rear Door Mud Guard, Bumper Mud Guard,
      Parcel Tray, Door Visor.
- [ ] The manual carousel has no autoplay.
- [ ] Built with Owners remains read-only and uses approved data.
- [ ] Knowledge, Why Factor One, and PPF remain present.

### Responsive and accessibility

- [ ] The page works without horizontal overflow at 390, 768, 1440, and large
      desktop widths.
- [ ] Mobile navigation exposes all approved destinations.
- [ ] Keyboard, focus, landmarks, headings, contrast, and reduced motion meet
      the repository baseline.

### Validation

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm build`
- [ ] `pnpm format:check`
- [ ] `git diff --check`
- [ ] Browser review at mobile, tablet, desktop, and large desktop
- [ ] Draft PR #5 updated and remains Draft
