# Delivery Workflow

## Purpose

This is the lightweight, canonical path from an approved task to a merged
change. It complements the local command reference in
[Development Workflow](../04-engineering/DEVELOPMENT-WORKFLOW.md).

## Workflow

| Stage                                | Purpose                                         | Required output                                                                        | Performed by                              | Progress condition                                                                                                   |
| ------------------------------------ | ----------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Mission Brief                        | State why the work matters and its boundaries.  | Concise mission, success criteria, constraints, and references in the task or handoff. | Implementer                               | Intent is clear without duplicating the task.                                                                        |
| Repository Discovery                 | Establish the real baseline before changing it. | Discovery Report.                                                                      | Implementer                               | Relevant routes, components, configuration, tests, dependencies, architecture, conflicts, and assumptions are known. |
| Conflict Resolution or Clarification | Prevent unsupported assumptions.                | Recorded adaptation or clarification request.                                          | Implementer and product owner when needed | The intended outcome can be preserved safely.                                                                        |
| Implementation Plan                  | Describe the smallest complete approach.        | Task-scoped plan.                                                                      | Implementer                               | Plan follows discovery and canonical documents.                                                                      |
| Implementation                       | Deliver the approved slice.                     | Focused change set.                                                                    | Implementer                               | Scope and acceptance criteria are met.                                                                               |
| Self-Validation                      | Verify behaviour and repository health.         | Command results and any manual evidence.                                               | Implementer                               | Required checks pass or an exact external limitation is recorded.                                                    |
| Pull Request                         | Make the work reviewable.                       | Focused PR with implementation handoff.                                                | Implementer                               | Scope, validation, assumptions, and deviations are explicit.                                                         |
| Engineering Review                   | Evaluate merge readiness.                       | Review record or PR review with a stated decision.                                     | Reviewer                                  | Blocking issues are resolved or decision is changes requested.                                                       |
| Product Approval                     | Confirm the approved outcome remains correct.   | Approval in the review or PR process when required.                                    | Product owner                             | Product scope and claims are accepted.                                                                               |
| Merge                                | Preserve the accepted change.                   | Merged PR.                                                                             | Authorized maintainer                     | Required approvals and checks are satisfied.                                                                         |
| Queue and Decision Records Updated   | Preserve delivery and architectural knowledge.  | Queue status and ADR updates when applicable.                                          | Implementer or maintainer                 | The next task has an accurate dependency state.                                                                      |

## Artifact rule

Use existing canonical documents whenever they answer the question. A new
artifact is required only when it records distinct information that future
contributors need to discover.
