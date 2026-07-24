# Factor One

Factor One Product Engineering Specification Repository.

## Development

Requires Node.js 20.18+ and pnpm 9+.

```bash
corepack enable
pnpm install
pnpm dev
```

The web application is in `apps/web`. Shared, reusable code belongs in `packages/*` as the workspace grows.

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm format:check
```
