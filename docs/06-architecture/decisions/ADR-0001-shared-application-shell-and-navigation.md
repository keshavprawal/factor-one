# ADR-0001 — Shared application shell and truthful navigation

**Status:** Accepted

**Date:** 2026-07-24

**Steward:** Engineering

## Context

Before TASK-001, the existing public routes duplicated global layout concerns
and referenced destinations that did not exist. The repository contained only
`/` and `/vehicles/vf7`; the Version 1 information architecture anticipated
additional destinations without authorizing placeholder pages.

## Decision

Use a shared `AppShell` in the root layout for public-page landmarks, header,
main content, skip link, and footer. Define navigation in one typed
configuration source shared by desktop and mobile controls. Keep unavailable
canonical destinations visible as disabled, non-navigating controls with
truthful accessible labels until approved routes exist. Do not create
placeholder routes.

## Alternatives Considered

- Duplicate header and footer markup in each route.
- Add placeholder routes for unimplemented destinations.
- Hide every future destination until its route is built.

## Consequences

### Positive

- Existing and future routes receive consistent landmarks and navigation.
- Navigation labels and availability have one source of truth.
- Visitors are not sent to unapproved or misleading pages.
- Mobile navigation can reuse the same destination model.

### Trade-offs and risks

- Disabled destinations communicate the planned information architecture but
  are not interactive until their routes are approved.
- New routes must update the centralized configuration when they become
  available.

## Revisit Conditions

Revisit when approved routes or a different information architecture changes
the set of available destinations, or when the public shell requires a
materially different composition.

## Related Tasks, PRs and Documents

- TASK-001 — Global Navigation and App Shell
- [PR #2](https://github.com/keshavprawal/factor-one/pull/2)
- `AGENTS.md`
- `docs/05-specifications/spec-000.md`
- `docs/06-execution/tasks/TASK-001-global-navigation-app-shell.md`
