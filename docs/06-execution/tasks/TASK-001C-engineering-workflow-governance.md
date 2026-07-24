# TASK-001C — Engineering Workflow Governance

**Status:** IN REVIEW

**Owner:** Engineering

**Depends on:** TASK-001B merged via PR #3

**Canonical specification:** `docs/05-specifications/spec-000.md`

## Mission Brief

### Mission

Make the repository self-guiding for Codex and future contributors by recording
intent, discovery, decisions, review evidence, and delivery state.

### Success Criteria

The repository contains one clear workflow for mission briefs, discovery,
ADRs, reviews, tasks, and delivery, without competing governance systems.

### Constraints

Documentation and governance only. No product feature, UI, route, or
application-code changes. Reuse the constitution's ADR terminology and
location.

### Canonical References

- `AGENTS.md`
- `docs/04-engineering/CONSTITUTION.md`
- `docs/05-specifications/spec-000.md`
- `docs/06-execution/IMPLEMENTATION-QUEUE.md`

### Decision Rule

Follow `AGENTS.md`: prefer existing architecture and canonical documents, do
not invent functionality, and request clarification if safe preservation of the
outcome is not possible.

## Repository Discovery Requirements

Inspect governance documents, execution records, ADR and review references,
and existing templates before editing. Record conflicts and adaptations in the
implementation handoff.

## Scope

- Mission Brief and Repository Discovery Report standards
- ADR, review, delivery workflow, and task-template documentation
- Execution queue and AGENTS.md updates

## Out of Scope

- Product, UI, route, or application-code changes
- New dependencies
- Invented architectural decisions

## Validation

Run documentation formatting, configured repository checks, and `git diff
--check`.

## Acceptance Criteria

The attached TASK-001C requirements are reflected in the canonical governance
documents and the resulting pull request contains only this scope.

## Decision Records Required

ADR-0001 records established TASK-001 shell and navigation decisions.

## Review Record Required

`docs/07-reviews/REVIEW-001-task-001-app-shell.md` records the accepted PR #2
outcome. This task itself requires its pull-request review before merge.

## Implementation Handoff

Include the required TASK-001C implementation handoff in the pull request.
