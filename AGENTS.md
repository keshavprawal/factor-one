# Factor One — AI Engineering Instructions

This file governs all work performed by Codex and other AI engineering agents in this repository.

## 1. Authority order

Before changing code, read and obey the following sources in order:

1. `docs/os/foundation/00-Governance/0001-README.md`
2. `docs/os/foundation/00-Governance/0002-Constitution.md`
3. `docs/os/foundation/02-Repository/0017-Repository-Index.md`
4. `docs/os/foundation/ai/reading-order.md`
5. `docs/05-specifications/spec-000.md`
6. The active task file in `docs/06-execution/tasks/`
7. Existing code and tests

When two instructions conflict, the higher item in this list wins. Do not silently reinterpret a requirement. Record unresolved conflicts in the task handoff.

## 2. Product rule

Factor One must reduce uncertainty for car owners.

Implementation decisions must favour:

- clarity over novelty,
- trust over short-term conversion,
- compatibility confidence over product volume,
- accessibility over visual tricks,
- maintainability over cleverness,
- shipping the approved scope over speculative expansion.

Do not introduce flash-sale patterns, fake scarcity, dark patterns, aggressive pop-ups, margin-only recommendations, or unrelated future-platform features.

## 3. Repository and stack

- Monorepo package manager: pnpm 9+
- Runtime: Node.js 20.18+
- Web app: `apps/web`
- Framework: Next.js 15 App Router
- Language: TypeScript
- UI: React 19, Tailwind CSS, Radix primitives, Lucide icons
- Shared code belongs in `packages/*` only when it is genuinely reusable across applications.

Do not add a new dependency when the requirement can be met cleanly with the existing stack. Any necessary dependency must be justified in the pull request.

## 4. Repository Discovery

Repository discovery is mandatory before every implementation task. Before
planning or writing code, publish a concise Repository Discovery Report that
records the current:

- routes and public destinations,
- components and shared layout primitives,
- navigation and shared configuration,
- tests and test tooling,
- lint configuration and formatting rules,
- package manager, lockfile, and dependencies,
- architecture and existing implementation patterns.

Base the implementation plan on this observed repository state, not on
assumptions from a task description or prior conversation. If the task assumes
an unavailable route, component, or service, use the smallest truthful
behaviour permitted by the task and record the deviation in the handoff.

The report must identify the branch and baseline, relevant routes, components,
configuration, tests, dependency state, reusable code, conflicts, assumptions,
proposed adaptations, and any clarification required.

## 5. Mission Brief and planning

Before implementation, add a concise Mission Brief to the task or pull-request
handoff. It answers intent and boundaries without repeating the full task:

- **Mission** — why the work matters and the user or product outcome.
- **Success Criteria** — observable conditions that prove success.
- **Constraints** — out-of-scope work and architectural boundaries.
- **Canonical References** — governing repository documents.

Then write an implementation plan based on the Repository Discovery Report.
When requirements are ambiguous, prefer the current architecture and canonical
documents, avoid inventing functionality, and stop for clarification when the
intended outcome cannot be preserved safely. An adaptation may proceed only
when it remains in scope, preserves the intended outcome, avoids product
decisions, and does not alter unrelated behaviour.

## 6. Governance artifacts

Use one artifact for each distinct question; do not duplicate canonical
knowledge or create process for its own sake.

- **Mission Brief** — Why are we building this?
- **Repository Discovery** — What already exists?
- **Specification or Task** — What exactly must be built?
- **Architecture Decision Record (ADR)** — Why did we choose this approach?
- **Review** — Is it good enough to merge?
- **Implementation Handoff** — What changed and how was it validated?

Create or update an ADR only for a durable architectural decision. Create or
update an artifact only when it answers a distinct question not already
answered canonically elsewhere.

## 7. Required workflow

For every task:

1. Read the governing documents and the complete task file.
2. Publish a Mission Brief.
3. Complete and record Repository Discovery before planning or editing.
4. Resolve conflicts or request clarification before proceeding.
5. Publish an implementation plan.
6. Implement the smallest complete vertical slice satisfying the acceptance criteria.
7. Add or update tests for behaviour that can regress.
8. Run all required checks before opening a pull request.
9. Update the task file, queue, and ADRs when a durable decision is introduced.
10. Submit a focused pull request with a structured implementation handoff.
11. Ensure the change is ready for engineering review before merge.

Do not begin a second task while the active task remains incomplete.

## 8. Required checks

Run from the repository root:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build
pnpm format:check
```

A task is not complete while any required command fails. If an environment limitation prevents a command from running, document the exact command, output, and limitation.

## 9. Code standards

- Use TypeScript strictness; do not use `any` unless an external boundary makes it unavoidable and the reason is documented.
- Prefer Server Components. Add `"use client"` only where browser state, effects, or event handlers are required.
- Keep business rules outside page components.
- Keep components small, explicit, and composable.
- Use semantic HTML before ARIA.
- Preserve visible keyboard focus.
- Respect reduced-motion preferences.
- Use stable keys and deterministic rendering.
- Avoid duplicated constants, navigation definitions, and route metadata.
- Do not leave dead code, commented-out implementations, placeholder lorem ipsum, or untracked TODOs.
- Do not expose secrets or commit environment files containing credentials.

## 10. Design implementation rules

- Reuse existing tokens and components before creating new ones.
- Do not hard-code arbitrary colours, spacing, radii, or shadows when a repository token exists.
- Every interactive element must have hover, focus-visible, active, disabled, loading, and error behaviour where applicable.
- Minimum touch target: 44 × 44 CSS pixels.
- Layouts must work at 320 px width and scale cleanly through desktop widths.
- Motion must communicate state or hierarchy; decorative motion is prohibited.
- Prevent avoidable layout shift.

## 11. Accessibility baseline

Every completed task must satisfy:

- keyboard-only operation,
- logical focus order,
- visible focus indication,
- meaningful accessible names,
- appropriate landmarks and heading hierarchy,
- sufficient colour contrast,
- no information conveyed by colour alone,
- reduced-motion support,
- screen-reader-compatible status and error feedback.

## 12. Performance baseline

- Do not ship unnecessary client JavaScript.
- Use Next.js image and font optimisation where applicable.
- Avoid blocking third-party scripts.
- Lazy-load non-critical content.
- Keep route transitions and primary interactions responsive.
- Do not add large media assets without explicit approval and optimisation.

## 13. Scope control

The active task's `In scope`, `Out of scope`, and acceptance criteria are binding.

Do not:

- redesign unrelated pages,
- rename broad parts of the repository,
- introduce future services or integrations,
- replace the approved stack,
- invent product requirements absent from governing documents.
- invent routes, APIs, entities, dependencies, or product decisions.

When a missing decision blocks implementation, stop at the smallest safe boundary and report the decision needed.

## 14. Pull-request handoff

Every pull request must include:

- task ID and specification references,
- concise summary of user-visible changes,
- files or systems changed,
- verification commands and results,
- screenshots for visible desktop and mobile changes,
- accessibility checks performed,
- assumptions and deviations,
- known limitations,
- explicit confirmation that no unrelated scope was added.

The handoff must also include the Mission Brief, Repository Discovery Report,
implementation plan, and any ADR or review record required by the task.

## 15. Definition of complete

Work is complete only when:

- all task acceptance criteria are met,
- loading, empty, success, and error states required by the task exist,
- responsive and accessibility requirements are satisfied,
- tests and required checks pass,
- documentation reflects material decisions,
- the pull request is reviewable without additional explanation.
