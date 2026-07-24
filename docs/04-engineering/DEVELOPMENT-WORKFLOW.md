# Local Development Workflow

## Requirements

- Node.js 20.18 or later
- pnpm 9.15.4, enabled with Corepack

## Install and run

```bash
corepack enable
pnpm install
pnpm dev
```

The Next.js application runs from `apps/web` through the root workspace
commands.

## Verify a change

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm format:check
```

## Branch and pull-request workflow

Create one focused branch per approved task. Make only task-scoped changes,
run the verification commands above, and open a pull request against `main`.
The pull request must state the task, affected files, validation results,
accessibility or responsive checks where relevant, assumptions, deviations, and
known limitations. Do not merge unrelated work into the same pull request.
