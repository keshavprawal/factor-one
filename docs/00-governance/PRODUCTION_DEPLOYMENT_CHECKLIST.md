# Production Deployment Checklist

> Status: Foundation prepared; production-candidate deployment not yet verified
>
> Owner: Founder and Launch Engineering
>
> Rule: Keep indexing disabled until every required item has evidence and final
> go/no-go approval.

## 1. Domain and DNS

- [ ] Founder approves the hosting provider.
- [ ] Founder approves the production domain.
- [ ] Founder chooses the canonical apex or `www` host.
- [ ] DNS records are configured and documented.
- [ ] The non-canonical host redirects permanently to the canonical host.
- [ ] No preview deployment is attached to the final production domain.

## 2. Environment

- [ ] `SITE_URL` exactly matches the verified HTTPS canonical origin.
- [ ] `SITE_INDEXING_ENABLED=false` for every preview and production-candidate
      deployment.
- [ ] No secret or founder-supplied production value is committed.
- [ ] The production environment has no unreviewed variables.

## 3. SSL and Transport Security

- [ ] SSL certificate is valid, renewed automatically, and covers approved
      hosts.
- [ ] HTTP redirects to HTTPS.
- [ ] HTTPS behavior is verified before enabling HSTS.
- [ ] HSTS scope, duration, subdomain policy, and preload policy receive
      explicit approval.

## 4. Content and Social Metadata

- [ ] `pnpm content:check:launch` passes.
- [ ] Founder-approved product photography replaces all temporary or repeated
      launch media.
- [ ] Founder-approved Open Graph image is configured.
- [ ] Open Graph and Twitter previews render with approved title, description,
      image, and canonical URL.

## 5. Indexing and Origins

- [ ] Canonical tags resolve to `SITE_URL` for `/` and `/vehicles/vf7`.
- [ ] `sitemap.xml` contains only approved public canonical routes.
- [ ] `robots.txt` remains disallow-all until the launch switch is approved.
- [ ] WebSite structured data uses the canonical HTTPS origin and validates.
- [ ] Trailing-slash requests redirect to the slashless canonical path.
- [ ] No unapproved legacy redirect or rewrite exists.
- [ ] Founder authorises `SITE_INDEXING_ENABLED=true`.
- [ ] Robots, sitemap, canonical, Open Graph, and structured data are retested
      after the indexing switch.

## 6. Security and Privacy

- [ ] CSP, frame denial, MIME sniffing protection, referrer policy, and
      permissions policy are present on deployed responses.
- [ ] Any third-party origin has an approved purpose and minimum CSP access.
- [ ] External new-tab links use `rel="noopener noreferrer"`.
- [ ] No source map, log, HTML, or response exposes a secret or personal data.
- [ ] Dependency advisories are reviewed against production runtime exposure.

## 7. Analytics and Observability

- [ ] Founder decides whether analytics is required for launch.
- [ ] Consent requirements are documented before analytics is enabled.
- [ ] Hosting logs capture structured server error events.
- [ ] Error log retention, access, alert owner, and escalation route are
      documented.
- [ ] A controlled application error is diagnosable without exposing sensitive
      data.

## 8. Deployment Smoke Test

- [ ] Deployment is tied to the approved commit SHA.
- [ ] `/` returns 200 with no broken images or console errors.
- [ ] `/vehicles/vf7` returns 200 with no broken images or console errors.
- [ ] An unknown route returns the branded 404 with status 404.
- [ ] Application error fallback is exercised where feasible.
- [ ] Mobile navigation, dropdowns, carousels, anchors, and focus restoration
      work.
- [ ] No horizontal overflow at 390×844, 768×1024, or 1440×900.
- [ ] Reduced-motion behavior works.
- [ ] CDN image optimisation, immutable assets, and cache headers are verified.

## 9. Browser, Device, Accessibility, and Performance

- [ ] Physical iOS Safari test passes.
- [ ] Physical Android Chrome test passes.
- [ ] Desktop Safari, Firefox, and Chromium tests pass.
- [ ] Keyboard-only navigation and visible focus pass.
- [ ] VoiceOver or NVDA smoke test passes.
- [ ] Lighthouse Accessibility and Best Practices score 100 on public routes.
- [ ] LCP, CLS, and first-load JavaScript remain within the approved baseline.

## 10. Rollback and Monitoring

- [ ] Previous known-good deployment and commit SHA are recorded.
- [ ] Hosting rollback procedure is tested.
- [ ] DNS rollback owner and expected propagation behavior are documented.
- [ ] Post-deployment owner monitors errors, availability, crawl behavior, and
      key page performance.
- [ ] Monitoring window and escalation contacts are agreed.

## 11. Final Go / No-Go

- [ ] Launch blockers B-001 through B-006 are resolved with evidence.
- [ ] Accepted technical risks are reviewed and remain acceptable.
- [ ] Founder reviews the production candidate.
- [ ] Launch Engineer records a go recommendation.
- [ ] Founder records final go approval.
- [ ] Public indexing is enabled only after all preceding approvals.
