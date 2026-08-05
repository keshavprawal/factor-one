# Local Development Workflow

## Requirements

- Node.js 20.18 or later
- pnpm 9.15.4, enabled with Corepack

## Install and run

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

The Next.js application runs from `apps/web` through the root workspace
commands.

## Verify a change

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm format:check
```

`pnpm test` builds the application and exercises the production routes, crawl
controls, error response, and security headers.

## Production configuration

Preview and local builds remain non-indexable by default. Leave
`SITE_INDEXING_ENABLED` unset or set it to `false`.

For public launch, set `SITE_URL` to the verified HTTPS canonical origin and set
`SITE_INDEXING_ENABLED=true`. Enabling indexing without a valid HTTPS
`SITE_URL` fails the build. See
[`DEPLOYMENT.md`](DEPLOYMENT.md) and the
[production deployment checklist](../00-governance/PRODUCTION_DEPLOYMENT_CHECKLIST.md).

## Branch and pull-request workflow

Create one focused branch per approved task. Make only task-scoped changes,
run the verification commands above, and open a pull request against `main`.
The pull request must state the task, affected files, validation results,
accessibility or responsive checks where relevant, assumptions, deviations, and
known limitations. Do not merge unrelated work into the same pull request.
