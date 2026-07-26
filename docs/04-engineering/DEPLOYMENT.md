# Deployment Foundation

## Purpose

Define the provider-neutral requirements for preview and production-candidate
deployments. This document does not approve a hosting provider or a production
domain.

## Environment Variables

| Variable                | Preview                                        | Public production launch                                       | Secret |
| ----------------------- | ---------------------------------------------- | -------------------------------------------------------------- | ------ |
| `SITE_URL`              | Leave unset unless testing a verified origin.  | Required. Exact approved HTTPS canonical origin, with no path. | No     |
| `SITE_INDEXING_ENABLED` | Unset or `false`.                              | Set to `true` only after the final go/no-go decision.          | No     |
| `NODE_ENV`              | Set to `production` by the build/runtime host. | Set to `production` by the build/runtime host.                 | No     |

No application secrets are currently required. `.env.example` lists every
application-owned variable without credentials or production values.

`SITE_URL` is the candidate canonical public origin. It is not the URL of the
server currently handling a request. The deployment origin, canonical origin,
and indexing state remain separate:

- `getConfiguredSiteUrl()` parses the configured canonical candidate.
- `isIndexingEnabled()` reads the independent launch switch.
- `getCanonicalSiteUrl()` returns an origin only when indexing is enabled and
  the candidate is safe for public canonical output.

No current route needs an absolute runtime deployment origin. Internal links are
relative, host redirects belong at the hosting layer, and the application does
not yet create share or transactional links. A future runtime feature should
derive and validate its request origin for that specific use case rather than
reusing `SITE_URL` implicitly.

Invalid values fail clearly during the Next.js build:

- `SITE_INDEXING_ENABLED` accepts only `true` or `false`.
- `SITE_URL`, when present, must be an HTTP(S) origin without credentials,
  query, fragment, or path.
- An indexable build requires an HTTPS `SITE_URL`.
- Localhost and loopback origins cannot be made publicly indexable.

## Crawl and Origin Policy

- Preview, branch, local-production, and production-candidate deployments remain
  `noindex` unless `SITE_INDEXING_ENABLED=true`.
- Non-indexable builds omit canonical URLs and WebSite structured data, emit no
  public sitemap entries, and disallow all crawlers in `robots.txt`.
- An approved indexable build derives canonical, Open Graph, sitemap, robots,
  and structured-data origins from the single `SITE_URL` source.
- The application uses no trailing slash. Next.js normalises trailing-slash
  requests to the canonical path.
- No legacy redirects are currently required or approved.
- The founder must choose apex or `www` as the canonical host. `SITE_URL` must
  contain that host, and the eventual hosting layer must redirect the other host
  before indexing is enabled.
- An Open Graph image remains intentionally absent until an approved asset is
  supplied.
- Preview metadata behavior is verified through configuration tests and local
  example-origin builds. Preview deployments never expose canonical output
  merely because `SITE_URL` is present.

## Supported Hosting Requirements

The current application can run on any host that supports:

- Node.js 20.18 or later and pnpm 9.15.4;
- `pnpm install --frozen-lockfile`, `pnpm build`, and the Next.js standalone
  server output;
- build-time and runtime environment variables;
- HTTPS, custom-domain redirects, immutable asset caching, and Next.js image
  optimisation;
- separate preview and production environments;
- deployment logs, atomic releases, and rollback to a known commit.

Static export is not the deployment target because it would reduce Next.js
feature support without providing a current product benefit.

## Hosting Recommendation — Founder Decision Required

**Lowest-risk recommendation: Vercel, pending founder approval.**

Vercel is the framework-native option for Next.js and supplies Git-connected
preview deployments without repository-specific adapters. Next.js also
supports a standard Node.js server or standalone container, so the repository
remains portable. No `vercel.json`, project identifier, domain binding, or
provider SDK is committed by this decision.

References:

- [Next.js deployment options](https://nextjs.org/docs/app/getting-started/deploying)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)

Founder approval is required before connecting a provider, enabling automatic
production deployments, or adding provider-specific architecture.

## Security Headers

The application currently sends:

- Content Security Policy with first-party-only defaults and frame denial;
- `X-Frame-Options: DENY`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- a restrictive Permissions Policy;
- no framework-identifying powered-by header.

The current CSP is suitable for the first-party application and contains no
third-party destinations. It retains inline script/style allowances required by
the current Next.js rendering approach. Any analytics or monitoring provider
must receive an explicit CSP review before integration.

HSTS is deliberately not enabled in application code. Add it at the verified
HTTPS edge only after the production host and all affected subdomains have been
tested. Do not preload or include subdomains without a separate founder-approved
domain review.

No current customer-facing link opens an external origin in a new tab. Future
external links must use safe `rel` attributes when `target="_blank"` is
necessary.

## Observability

Next.js server errors enter through `apps/web/src/instrumentation.ts`. The
provider-neutral handler writes one structured JSON event to standard error
containing only:

- timestamp;
- error digest;
- request method;
- router kind;
- route type;
- route template.

It intentionally excludes headers, cookies, query strings, stack traces, raw
URLs, request bodies, and user-provided values. The selected hosting platform
must retain and make standard-error logs searchable for the launch candidate.

A future monitoring service may replace or forward this integration point only
after provider, privacy, retention, alert-routing, and CSP decisions are
approved. No paid service or client-side tracking dependency is introduced.

## CI and Launch Gate

`.github/workflows/ci.yml` validates pull requests and pushes to `main` with the
declared Node and pnpm versions, a frozen lockfile, content validation, lint,
type checking, formatting, production build, tests, and repository-cleanliness
checks.

`.github/workflows/launch-gate.yml` is manual and runs
`pnpm content:check:launch`. It is expected to remain red while approved launch
content and photography are incomplete; ordinary pull requests use the
non-strict content check.
