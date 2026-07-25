# SPEC-001 — Homepage Blueprint

**Document ID:** SPEC-001
**Version:** 1.0.0
**Status:** Implementation-ready, subject to approved content and media
**Owner:** Product
**Route:** `/`
**Parent specification:** `docs/05-specifications/spec-000.md`

## 1. Authority and Scope

This specification defines the implementation blueprint for the Factor One
homepage. It refines the homepage requirements in SPEC-000 without expanding
the product scope.

The homepage must use the shared application shell and centralized navigation
established by ADR-0001. It must not create placeholder routes or imply that
unavailable products, services, compatibility information, policies, or support
programs exist.

Where documents conflict, authority follows:

1. Engineering Constitution
2. Accepted Architecture Decision Records
3. SPEC-000
4. This specification
5. Implementation

## 2. Business Objective

The homepage must establish Factor One as an engineering-led automotive company
that helps owners make confident decisions about their vehicles.

Its primary business purpose is to build trust before asking for a transaction.
It must communicate that Factor One:

- improves vehicle ownership through purposeful products;
- prioritizes vehicle fit, usability, quality, and long-term value;
- selects quality before catalogue size;
- explains what matters so owners can make informed decisions.

The homepage is successful when a first-time visitor understands the brand,
recognizes its relevance to vehicle ownership, and can identify one truthful
next action without encountering unsupported claims or unavailable
destinations.

## 3. Ten-Second Comprehension Requirement

Within ten seconds, the first viewport and immediately adjacent content must
answer:

| Question                    | Required answer                                                                                                   |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| What is Factor One?         | An engineering-led automotive company focused on improving vehicle ownership.                                     |
| What problem does it solve? | It reduces uncertainty around choosing useful, compatible, high-quality vehicle products.                         |
| Why should I trust it?      | Factor One prioritizes purposeful selection, clear compatibility, engineering judgment, and honest communication. |
| What can I do here?         | Understand the Factor One standard and begin exploring supported vehicles or approved product discovery.          |
| What is the next action?    | Use the single primary homepage action that points to an approved route or valid in-page destination.             |

The first viewport must not depend on animation, scrolling, hover, or
unavailable navigation to communicate these answers.

## 4. User Journey

### 4.1 Entry

The visitor arrives at `/` and immediately sees:

- the Factor One identity;
- a concise ownership-focused value proposition;
- one primary action;
- one secondary action only when it serves a distinct purpose.

### 4.2 Understanding

The visitor learns:

- why Factor One exists;
- how Factor One evaluates what belongs on a vehicle;
- why fit, purpose, and ownership value matter;
- that catalogue volume is not the measure of quality.

### 4.3 Orientation

The visitor identifies the most relevant approved discovery path:

- supported vehicle;
- approved product category;
- approved featured product;
- approved ownership information.

Unavailable paths must be omitted or rendered according to ADR-0001's truthful
disabled-state rules.

### 4.4 Confidence

The visitor receives evidence through approved product information, real
photography, transparent criteria, and approved customer-support information.
Unsupported statistics, guarantees, reviews, certifications, testing claims,
and commercial promises are prohibited.

### 4.5 Continuation

The visitor reaches one clear closing action that continues to a real route or
valid in-page anchor. The homepage must never end with a dead link or invented
destination.

## 5. Information Hierarchy

The homepage hierarchy is:

1. Brand identity and ownership value
2. Primary next action
3. Vehicle or product relevance
4. Factor One's selection and engineering standard
5. Approved product evidence
6. Ownership confidence
7. Closing action

Visual hierarchy must be established primarily through:

- semantic structure;
- typography;
- spacing;
- composition;
- image scale and crop;
- contrast.

Decorative colour, shadows, gradients, badges, or animation must not carry
essential meaning.

## 6. Homepage Sections

Sections must appear in the following order. Conditional sections remain part
of the blueprint but must be omitted from production until their required
content is approved.

### 6.1 Announcement Bar — Conditional

**Purpose:** Communicate one timely, material update without competing with the
brand.

**Render only when:** Product has approved a legitimate announcement with a
defined start and end condition.

**Permitted content:** Delivery updates, an approved launch, or another
time-bound operational message.

**Prohibited content:** Fake scarcity, generic promotions, unsupported free
shipping claims, countdowns, rotating messages, or permanent filler.

**Desktop layout:** Single restrained line above the global header.

**Mobile layout:** One short line; truncate only when the full message remains
available accessibly. Do not create a carousel.

**Copy placeholder:**

- Message: `[Approved time-bound announcement]`
- Destination: `[Approved real route, when required]`

### 6.2 Global Navigation

**Purpose:** Identify Factor One and expose only truthful, supported
destinations.

**Implementation:** Reuse the existing AppShell, Navbar, Footer, and centralized
navigation configuration. Do not define navigation inside the homepage.

**Desktop layout:** Wordmark, approved primary destinations, and approved
utility controls.

**Mobile layout:** Wordmark, available utility controls, and the existing
accessible menu pattern.

**Availability rule:** Destinations without approved routes follow ADR-0001:
disabled and non-navigating when their presence is required, otherwise omitted.

### 6.3 Hero

**Purpose:** Answer what Factor One is, what ownership problem it addresses, and
what the visitor should do next.

**Required content:**

- optional restrained eyebrow;
- one `h1`;
- one supporting paragraph;
- one primary action;
- optional secondary action with a distinct informational purpose;
- one approved visual area.

**Desktop layout:**

- Occupy most, but not necessarily all, of the first viewport.
- Use the global container.
- Keep copy within a readable width.
- Position content and media so neither obscures the other.
- Keep the primary action visually dominant.

**Mobile layout:**

- Preserve the same message without forcing a full-screen empty composition.
- Keep the headline readable without orphaned words or horizontal overflow.
- Stack actions when needed.
- Ensure media supports rather than displaces the primary message.

**Copy placeholders:**

- Eyebrow: `[Approved Factor One descriptor]`
- Headline: `[Ownership-focused value proposition]`
- Supporting copy: `[One sentence explaining how Factor One reduces ownership uncertainty]`
- Primary action: `[Approved exploration action]`
- Secondary action: `[Approved explanation action, when required]`

**Media placeholder:** `[Approved original vehicle or product photography]`

Random stock imagery and third-party copyrighted vehicle imagery are
prohibited.

### 6.4 Featured Vehicle Collection

**Purpose:** Let visitors begin with a vehicle because compatibility is central
to confident product selection.

**Required content for each vehicle:**

- approved vehicle name;
- approved image;
- explicit support or compatibility status;
- real destination;
- clear exploration label.

**Desktop layout:** A restrained grid with consistent image ratios, aligned
content, and no more cards than approved vehicle data supports.

**Mobile layout:** Single-column cards with readable status information and
44 × 44 pixel minimum targets.

**Empty-state rule:** If no approved vehicle collection is available, omit this
section. Do not fabricate vehicle support or create placeholder vehicle routes.

**Copy placeholders:**

- Heading: `[Vehicle-first discovery heading]`
- Supporting copy: `[Explanation that correct product choice begins with the correct vehicle]`
- Card status: `[Approved compatibility or support status]`
- Action: `[Explore approved vehicle]`

### 6.5 Why Factor One

**Purpose:** Explain why Factor One's judgment is different without relying on
advertising claims.

**Required themes:**

- genuine ownership problems;
- vehicle-specific fit and usability;
- thoughtful engineering;
- long-term ownership value;
- honest limitations and communication.

**Desktop layout:** Introductory copy paired with three to five concise
principles or an editorial two-column composition.

**Mobile layout:** One continuous reading order: heading, explanation, then
principles. Avoid dense multi-column cards.

**Copy placeholders:**

- Heading: `[Factor One difference stated in plain language]`
- Introduction: `[Short explanation of the engineering-first selection standard]`
- Principle title: `[Approved principle]`
- Principle description: `[Evidence-based explanation without unsupported claims]`

### 6.6 Featured Products — Conditional

**Purpose:** Demonstrate what Factor One offers using approved product data.

**Required content for each product:**

- approved product name;
- approved image;
- approved vehicle compatibility;
- approved price or an explicit non-purchasable state;
- real product destination;
- concise purpose statement.

**Desktop layout:** Small, focused grid. Product photography remains the visual
priority.

**Mobile layout:** Single-column or compact two-column layout only when names,
compatibility, pricing, and touch targets remain readable.

**Data rule:** Render only from approved product data. Do not fabricate
products, pricing, discounts, ratings, reviews, stock status, or
compatibility.

**Copy placeholders:**

- Heading: `[Approved featured-products heading]`
- Purpose statement: `[Why this product matters to ownership]`
- Compatibility: `[Approved vehicle compatibility]`
- Price state: `[Approved price or availability language]`
- Action: `[Approved product-view action]`

### 6.7 Engineering Philosophy

**Purpose:** Build trust by explaining how Factor One thinks, selects, and
improves products.

**Required themes:**

- engineering before marketing;
- quality before quantity;
- invisible integration with the vehicle;
- continuous improvement;
- long-term thinking.

**Desktop layout:** Editorial composition with a controlled reading width and
one approved supporting image when available.

**Mobile layout:** Image first only when it adds evidence; otherwise prioritize
text. Preserve short paragraphs and generous spacing.

**Copy placeholders:**

- Heading: `[Engineering philosophy statement]`
- Body: `[Approved explanation derived from PRODUCT.md]`
- Supporting caption: `[Factual description of approved media]`

### 6.8 Product Experience — Conditional

**Purpose:** Show product quality, installation, material, and fit through
approved visual evidence.

**Permitted media:**

- installed product view;
- material detail;
- fitment detail;
- accurate scale or use context;
- approved installation sequence.

**Desktop layout:** Large editorial media with a concise caption or a restrained
two-part media composition.

**Mobile layout:** Full-width media within the content container. Avoid
horizontal carousels unless a future approved specification requires them.

**Evidence rule:** Omit the section until accurate, approved photography exists.
Do not use laboratory, manufacturing, or testing imagery to imply unsupported
capabilities.

**Copy placeholders:**

- Heading: `[Product-experience heading]`
- Caption: `[Factual explanation of what the image demonstrates]`

### 6.9 Customer Confidence — Conditional

**Purpose:** Reduce purchase uncertainty using approved operational facts.

**Permitted topics when documented:**

- compatibility guidance;
- installation guidance;
- approved warranty terms;
- approved support channels;
- approved shipping information;
- approved returns or policy information.

**Desktop layout:** Concise confidence statements in a balanced grid or
editorial list.

**Mobile layout:** Single-column reading order with clear labels and links to
real policy or support routes.

**Truth rule:** Do not mention guarantees, warranties, secure checkout,
shipping, returns, or support commitments until their terms and destinations
are approved.

**Copy placeholders:**

- Heading: `[Approved confidence heading]`
- Item title: `[Approved operational commitment]`
- Item detail: `[Accurate scope or limitation]`
- Destination: `[Approved real policy or support route]`

### 6.10 Final Call to Action

**Purpose:** End the homepage with one calm, clear continuation.

**Required content:**

- one concise heading;
- optional single supporting sentence;
- one primary action.

**Desktop layout:** Centered or editorially aligned within a narrow content
width and generous vertical spacing.

**Mobile layout:** Full-width primary action where appropriate, with a minimum
44-pixel target and no competing secondary action.

**Destination rule:** The action must point to an existing approved route or a
valid in-page anchor.

**Copy placeholders:**

- Heading: `[Clear ownership-oriented closing statement]`
- Supporting copy: `[One sentence clarifying the next step]`
- Action: `[Approved next action]`

### 6.11 Footer

**Purpose:** Conclude the experience with stable navigation and approved legal
or support information.

**Implementation:** Reuse the existing shared Footer and centralized
configuration.

**Desktop layout:** Restrained grouped links aligned to the global container.

**Mobile layout:** Stacked, readable groups with clear focus order.

**Content rule:** Include only legitimate current routes. Do not invent
policies, addresses, phone numbers, social profiles, certifications, payment
methods, or legal entities.

## 7. Component Mapping

| Homepage responsibility       | Existing component or pattern         | Implementation rule                                                       |
| ----------------------------- | ------------------------------------- | ------------------------------------------------------------------------- |
| Global landmarks              | `AppShell`                            | Must wrap the route through the root layout.                              |
| Header and navigation         | `Navbar` and navigation configuration | Must not be duplicated in the homepage.                                   |
| Footer                        | `Footer` and navigation configuration | Must not be duplicated in the homepage.                                   |
| Content alignment             | `Container`                           | Use for every principal section.                                          |
| Responsive grids              | `Grid`                                | Reuse when its existing variants satisfy the layout.                      |
| Primary and secondary actions | `Button`                              | Reuse variants; do not create a second button system.                     |
| Static information groups     | `Card`                                | Use only when card grouping improves comprehension.                       |
| Category presentation         | `CategoryCard`                        | Use only with approved content; static cards must not imply navigation.   |
| Product presentation          | `ProductCard`                         | Use only with approved product data and real destinations.                |
| In-page actions               | `ScrollLink` or semantic anchor       | Target an existing section and respect reduced motion.                    |
| Optimized media               | Next.js `Image`                       | Provide dimensions or fill geometry, sizes, and meaningful alt treatment. |

New components are permitted only for repeated, homepage-specific patterns that
cannot be expressed clearly with existing primitives. Page-specific copy and
approved content should remain replaceable without restructuring the route.

## 8. Responsive Behaviour

### 8.1 Breakpoint-independent requirements

- Start with the mobile layout and enhance progressively.
- Preserve one content hierarchy across all viewports.
- Prevent horizontal overflow at 320 pixels and wider.
- Maintain readable line lengths.
- Preserve image aspect ratios and prevent layout shift.
- Keep touch targets at least 44 × 44 CSS pixels.
- Do not hide essential content solely to make a layout fit.

### 8.2 Small mobile

- Single-column section flow.
- Compact but calm section spacing.
- Stacked actions where horizontal placement reduces target size or clarity.
- Images must not consume the experience before the visitor understands the
  page.
- Headings must wrap naturally without clipping.

### 8.3 Large mobile and tablet

- Introduce two-column grids only when content remains balanced.
- Preserve logical DOM order when visual columns are introduced.
- Maintain comfortable gutters using existing container rules.
- Avoid controls positioned outside normal document flow.

### 8.4 Laptop and desktop

- Use the global maximum width and shared alignment grid.
- Increase whitespace and type scale without increasing content density.
- Use two- to four-column grids only as defined by the relevant section.
- Keep the primary journey visually dominant on wide screens.

### 8.5 Wide desktop

- Content must remain bounded by the global container.
- Text line lengths must not expand indefinitely.
- Media may scale within approved aspect ratios but must not create empty,
  decorative expanses without purpose.

## 9. Copywriting Requirements

All placeholder copy must be visibly identified in implementation data or
content review until approved.

Final copy must:

- explain usefulness before promotion;
- use plain, direct language;
- avoid unnecessary superlatives;
- distinguish intention from verified fact;
- explain limitations when relevant;
- avoid fake urgency, scarcity, or social proof;
- avoid unsupported engineering, testing, manufacturing, compatibility,
  warranty, shipping, or safety claims.

Placeholder syntax in this specification uses square brackets. Square-bracketed
copy must never ship to production.

## 10. Accessibility Requirements

The homepage must meet WCAG AA expectations and the repository accessibility
baseline.

Required:

- one `main` landmark supplied by the AppShell;
- one page-level `h1`;
- logical `h2` and `h3` hierarchy;
- a working skip link;
- semantic `section`, `article`, `nav`, list, button, and link elements;
- accessible names that describe action and destination;
- keyboard access to every interactive element;
- visible `:focus-visible` indication;
- minimum 44 × 44 CSS-pixel touch targets;
- sufficient text and interactive-state contrast;
- no information conveyed by colour alone;
- meaningful image alternative text;
- empty alternative text for decorative images;
- reduced-motion support;
- no automatic movement that interferes with reading;
- no focus traps outside an intentionally modal interaction;
- stable focus order across responsive layouts.

Static cards must not receive link or button semantics. Disabled destinations
must follow the existing accessible pattern in ADR-0001.

## 11. Performance Requirements

- Render the homepage as a Server Component by default.
- Add client components only for necessary browser interaction.
- Reuse existing dependencies.
- Use optimized local media through the framework image solution.
- Prioritize only genuinely above-the-fold media.
- Lazy-load below-the-fold media.
- Reserve media geometry to prevent layout shift.
- Avoid autoplay video.
- Avoid new animation libraries.
- Keep content understandable with motion disabled.
- Do not fetch placeholder data or call unavailable APIs.

## 12. Acceptance Criteria

### 12.1 Business and comprehension

- [ ] A first-time visitor can answer all five ten-second comprehension
      questions without interacting with the page.
- [ ] The homepage communicates an engineering-led ownership proposition rather
      than a discount marketplace.
- [ ] One primary next action is visually clear.
- [ ] Every section contributes to trust, relevance, product understanding, or
      continuation.

### 12.2 Content integrity

- [ ] No unsupported product, compatibility, engineering, testing, warranty,
      shipping, support, review, rating, pricing, or certification claim is
      present.
- [ ] No fake products, prices, discounts, availability, or social proof are
      present.
- [ ] Conditional sections are omitted until their required data and media are
      approved.
- [ ] No square-bracketed placeholder copy appears in production.

### 12.3 Architecture and components

- [ ] The homepage inherits the existing AppShell, Navbar, and Footer.
- [ ] Navigation comes only from the centralized configuration.
- [ ] No placeholder route is created.
- [ ] Every link targets a real approved route or valid in-page anchor.
- [ ] Existing Container, Grid, Button, Card, and applicable content components
      are reused.
- [ ] No speculative dependency, API, data model, or global state is added.

### 12.4 Responsive quality

- [ ] The layout works without horizontal overflow at 320, 390, 768, 1024, and
      1440 pixel viewport widths.
- [ ] Mobile is intentionally composed rather than merely stacked from desktop.
- [ ] Text remains readable and media remains proportionate at every required
      width.
- [ ] Interactive targets remain at least 44 × 44 CSS pixels.

### 12.5 Accessibility

- [ ] Landmark and heading structure is valid.
- [ ] The page is fully operable using a keyboard.
- [ ] Focus indicators are visible.
- [ ] Images have appropriate alternative text.
- [ ] Contrast meets WCAG AA.
- [ ] Reduced-motion preferences are respected.
- [ ] Automated and manual accessibility checks report no blocking issue.

### 12.6 Performance and stability

- [ ] Above-the-fold content renders without waiting for client-side data.
- [ ] Media is optimized and does not cause avoidable layout shift.
- [ ] Below-the-fold media is lazy-loaded.
- [ ] The page remains functional with animation disabled.
- [ ] No unnecessary homepage client state or JavaScript is introduced.

### 12.7 Repository validation

- [ ] Existing routes remain functional.
- [ ] Lint passes.
- [ ] Type checking passes.
- [ ] Production build passes.
- [ ] Formatting check passes.
- [ ] Repository diff check passes.

## 13. Out of Scope

This specification does not authorize:

- authentication or accounts;
- garage functionality;
- checkout or payment;
- cart business logic;
- search functionality;
- recommendation engines;
- vehicle compatibility engines;
- backend services;
- CMS integration;
- analytics vendors;
- new product, category, policy, or support routes;
- invented products or commercial data;
- promotional carousels, pop-ups, countdowns, or dark patterns.

Any of these requires an approved specification or task before implementation.
