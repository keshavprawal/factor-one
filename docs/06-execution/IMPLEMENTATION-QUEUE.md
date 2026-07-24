# Factor One — Launch Implementation Queue

**Status:** Active  
**Owner:** Product  
**Execution model:** One task at a time  
**Canonical product specification:** `docs/05-specifications/spec-000.md`

## Purpose

This file is the ordered execution queue for Codex and AI engineering agents. It converts the canonical product specification into reviewable vertical slices.

Only the first unblocked task marked `READY` may be implemented. A later task may be prepared, but it must not be coded in parallel unless explicitly approved.

## Status definitions

- `BACKLOG` — not yet ready for implementation
- `READY` — approved and sufficiently defined
- `IN PROGRESS` — currently being implemented
- `IN REVIEW` — pull request open
- `BLOCKED` — requires a recorded decision or dependency
- `COMPLETED` — merged and verified
- `PENDING` — next approved task, awaiting implementation

## Launch sequence

| Order | Task                                           | Status    | Outcome                                                                                                                                            |
| ----: | ---------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
|     1 | `TASK-001-global-navigation-app-shell.md`      | COMPLETED | Merged via PR #2 on 2026-07-24. Shared AppShell, configuration-driven navigation, accessible mobile dialog, and truthful unavailable destinations. |
|     2 | TASK-001B repository-governance-tooling        | COMPLETED | Merged via PR #3 on 2026-07-25. Repository discovery, tooling, and workflow baseline reconciled.                                                   |
|     3 | `TASK-001C-engineering-workflow-governance.md` | IN REVIEW | Establishes mission briefs, discovery reports, ADRs, reviews, delivery workflow, and task-template governance.                                     |
|     4 | TASK-002-homepage-foundation                   | BLOCKED   | The homepage communicates the brand and directs users into product discovery after TASK-001C is merged.                                            |
|     5 | TASK-003-shop-collection                       | BACKLOG   | Users can browse products through a clear collection experience.                                                                                   |
|     6 | TASK-004-product-detail                        | BACKLOG   | Users can understand, trust, and evaluate one product.                                                                                             |
|     7 | TASK-005-search                                | BACKLOG   | Users can find relevant products through partial and exact queries.                                                                                |
|     8 | TASK-006-cart                                  | BACKLOG   | Users can review and modify a purchase before checkout.                                                                                            |
|     9 | TASK-007-about-contact                         | BACKLOG   | Users can understand the company and contact it easily.                                                                                            |
|    10 | TASK-008-seo-accessibility-performance         | BACKLOG   | The release meets launch-wide quality requirements.                                                                                                |
|    11 | TASK-009-release-verification                  | BACKLOG   | The complete release is verified against SPEC-000.                                                                                                 |

## Rules

1. Each task must be a complete vertical slice with observable acceptance criteria.
2. Tasks must reference the exact governing sections of `SPEC-000`.
3. Product behaviour not approved by the canonical specification must not be invented inside a task.
4. Each pull request must contain only one task unless a dependency is inseparable and explicitly recorded.
5. A task cannot move to `DONE` until required checks pass and acceptance evidence is attached.
6. New ideas discovered during implementation go into the backlog; they do not expand the active task.

## Required task structure

Every task file must contain:

Use [the canonical task template](tasks/TASK-TEMPLATE.md). Conditional
sections are completed only when applicable to the task.

## Agent handoff protocol

At the end of implementation, the agent must report:

```text
Task:
Branch:
Summary:
Files changed:
Tests added or changed:
Commands run:
Results:
Accessibility verification:
Responsive verification:
Assumptions:
Deviations:
Known limitations:
Next recommended task:
```

## Current execution instruction

`TASK-002-homepage-foundation` remains blocked until TASK-001C is merged. Do
not begin it until it is marked `READY` with an approved task file.
