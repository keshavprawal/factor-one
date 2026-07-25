# Launch Readiness Report

> Review ID: LAUNCH-READINESS-001
>
> Date: 2026-07-26
>
> Scope: Homepage, VF7 route, shared application shell, production foundation

## Overall Score

**91/100 — technically production-ready, but not ready for public launch until
the critical content and deployment configuration issues below are resolved.**

The application builds reproducibly, has no known production dependency
vulnerabilities, passes its automated checks, and performs strongly in
Chromium. The remaining launch blockers require approved business inputs rather
than additional product functionality.

## Visual Evidence

- [Homepage — mobile, 390×844](assets/launch-readiness-001/homepage-mobile-390x844.png)
- [Homepage — tablet, 768×1024](assets/launch-readiness-001/homepage-tablet-768x1024.png)
- [Homepage — desktop, 1440×900](assets/launch-readiness-001/homepage-desktop-1440x900.png)
- [VF7 — mobile, 390×844](assets/launch-readiness-001/vf7-mobile-390x844.png)
- [VF7 — desktop, 1440×900](assets/launch-readiness-001/vf7-desktop-1440x900.png)

## Critical Issues

1. **Final product photography is incomplete.** The current screen-guard image
   is used in both the primary homepage visual and the featured-products
   carousel. Four other product directions intentionally show photography
   pending. The duplicated screen-guard image is a founder-identified
   launch-blocking limitation.
2. **The verified production origin is not available in the repository.**
   `SITE_URL` must be configured with the final HTTPS origin before deployment.
   Until it is present, the application intentionally emits `noindex`,
   disallows crawlers, and omits public canonical and sitemap URLs to prevent
   accidental indexing of preview environments.

## High Priority

1. Supply an approved Open Graph image and final social-sharing treatment.
   Metadata is implemented, but no unapproved brand or product image has been
   presented as a final social asset.
2. Validate the deployed host, CDN image optimisation, cache headers, redirects,
   canonical URLs, sitemap, robots policy, and security headers against the real
   production origin before opening indexing.

## Medium Priority

1. Complete manual assistive-technology checks with VoiceOver or NVDA. Automated
   accessibility checks and keyboard review pass, but they do not replace a
   real screen-reader session.
2. Complete manual Safari and Firefox checks on physical desktop and mobile
   devices. Chromium responsive testing covers the current automated and visual
   evidence.
3. Select an error-monitoring destination before launch if operational alerting
   is required. The application now provides safe user-facing error boundaries,
   but no external monitoring service was introduced without approval.

## Low Priority

1. Expand production smoke coverage as real product destinations and
   interactions are approved. The current test deliberately covers only the two
   real routes and production infrastructure.

## Performance

### Lighthouse 12.8.2

| Route and viewport | Performance | Accessibility | Best Practices | SEO |
| ------------------ | ----------: | ------------: | -------------: | --: |
| Homepage mobile    |          99 |           100 |            100 |  66 |
| Homepage desktop   |         100 |           100 |            100 |  66 |
| VF7 mobile         |          99 |           100 |            100 |  66 |

The SEO score is reduced only because local builds without `SITE_URL` are
intentionally non-crawlable.

- Homepage mobile: FCP 0.8s, LCP 2.0s, TBT 20ms, CLS 0, Speed Index 0.8s.
- Homepage desktop: FCP 0.2s, LCP 0.5s, TBT 0ms, CLS 0, Speed Index 0.3s.
- VF7 mobile: FCP 0.8s, LCP 2.0s, TBT 20ms, CLS 0, Speed Index 0.8s.
- Framework images use responsive Next.js optimisation.
- Below-the-fold product photography no longer receives priority loading.
- Product media is visible immediately when available; client load state no
  longer delays rendering.
- Nine proven-unused image files were removed from the repository.
- Production first-load JavaScript is 123kB for the homepage and 119kB for VF7.

## Accessibility

- Lighthouse accessibility score: 100 on both routes.
- Muted text and the Built with Owners section now meet contrast requirements.
- Carousel state no longer reduces text contrast through parent opacity.
- Shared buttons have a minimum 44px target in every size.
- Product cards use their complete visible text as the accessible link name.
- Carousel regions, live counters, disabled navigation, image alternatives,
  landmarks, and heading hierarchy were reviewed.
- Mobile navigation uses a native modal dialog, restores focus on close, locks
  background scrolling, and truthfully labels unavailable destinations.
- Keyboard review covered desktop menus, mobile navigation, carousel controls,
  in-page actions, skip navigation, and focus visibility.
- Reduced-motion behavior remains supported.
- Manual VoiceOver or NVDA verification remains outstanding.

## SEO

- Central metadata, title template, descriptions, Open Graph, and Twitter
  metadata are present.
- Canonical URLs, `robots.txt`, and `sitemap.xml` are derived from one validated
  `SITE_URL`.
- A safe WebSite structured-data record is emitted only when the verified
  origin exists.
- Builds without a verified origin remain deliberately excluded from indexing.
- A favicon endpoint is present and no longer produces a console 404.
- An approved Open Graph image and production `SITE_URL` remain required.

## Engineering

- Next.js was upgraded from 15.1.6 to the patched 15.5.21 maintenance release.
- Patched Sharp and PostCSS releases are enforced through workspace overrides.
- Production dependency audit: zero known vulnerabilities, down from 35
  advisories including two critical findings.
- Content Security Policy, frame protection, MIME sniffing protection,
  referrer policy, and browser permission restrictions are applied globally.
- Branded error and not-found states provide recoverable, truthful paths.
- Production smoke tests cover both real routes, 404 behavior, crawl controls,
  sitemap safety, and security headers.
- Lint ignores the framework-generated `next-env.d.ts` rather than weakening
  TypeScript rules for authored code.
- Formatting, lint, type checking, production build, smoke tests, and diff
  checks pass.

## Mobile

- Verified at 390×844 with no horizontal overflow.
- A clipped hero-copy defect caused by the carousel's intrinsic grid width was
  found during visual review and fixed with explicit minimum-width behavior.
- Primary actions stack into full-width, 44px controls.
- Navigation opens as a modal, background scrolling is locked, focus returns to
  the trigger, and unavailable destinations remain non-navigating.
- Images preserve their aspect ratios and do not introduce layout shift.

## Cross-browser

- Chromium: automated Lighthouse, responsive visual review, keyboard review,
  console review, and image-loading review completed.
- Safari/WebKit: not manually verified.
- Firefox/Gecko: not manually verified.
- The implementation uses standards-based links, buttons, native dialog,
  responsive images, and CSS; no browser-specific launch defect is currently
  known.

## Remaining Risks

- Final photography may change composition, crop, image weight, LCP, and visual
  hierarchy.
- The production domain, hosting platform, CDN, caching behavior, redirects,
  and error monitoring are not represented by the local environment.
- No final Open Graph image is approved.
- The VF7 hero and overview currently reuse the same approved visual.
- Physical-device and real assistive-technology testing remain necessary.

## Recommendations

1. Approve and install distinct final product photography, including a unique
   hero visual.
2. Configure `SITE_URL`, add the approved Open Graph image, deploy to the final
   host, and rerun Lighthouse plus canonical/robots/sitemap verification.
3. Complete a focused Safari, Firefox, physical-mobile, and screen-reader smoke
   pass before enabling public indexing.

## Go / No-Go recommendation

**NO-GO for public launch today.**

**GO for a production-candidate deployment with indexing disabled.** The code
meets the technical launch bar; public launch should wait only for the two
critical inputs above and the final deployed-environment verification.
