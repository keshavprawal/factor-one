# Factor One — AI Engineering Instructions

This file governs all work performed by Codex and other AI engineering agents in this repository.

## 1. Authority order

Before changing code, read and obey the following sources in order:

1. `docs/os/foundation/README.md`
2. `docs/os/foundation/CONSTITUTION.md`
3. `docs/os/foundation/REPOSITORY-INDEX.md`
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
writing code, inspect and record the current:

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

## 5. Required workflow

For every task:

1. Read the governing documents and the complete task file.
2. Complete Repository Discovery before planning or editing.
3. State assumptions in the task handoff; do not encode uncertain assumptions as permanent architecture.
4. Implement the smallest complete vertical slice satisfying the acceptance criteria.
5. Add or update tests for behaviour that can regress.
6. Run all required checks.
7. Update the task file's implementation record when requested.
8. Submit a focused pull request with no unrelated refactors.

Do not begin a second task while the active task remains incomplete.

## 6. Required checks

Run from the repository root:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build
pnpm format:check
```

A task is not complete while any required command fails. If an environment limitation prevents a command from running, document the exact command, output, and limitation.

## 7. Code standards

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

## 8. Design implementation rules

- Reuse existing tokens and components before creating new ones.
- Do not hard-code arbitrary colours, spacing, radii, or shadows when a repository token exists.
- Every interactive element must have hover, focus-visible, active, disabled, loading, and error behaviour where applicable.
- Minimum touch target: 44 × 44 CSS pixels.
- Layouts must work at 320 px width and scale cleanly through desktop widths.
- Motion must communicate state or hierarchy; decorative motion is prohibited.
- Prevent avoidable layout shift.

## 9. Accessibility baseline

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

## 10. Performance baseline

- Do not ship unnecessary client JavaScript.
- Use Next.js image and font optimisation where applicable.
- Avoid blocking third-party scripts.
- Lazy-load non-critical content.
- Keep route transitions and primary interactions responsive.
- Do not add large media assets without explicit approval and optimisation.

## 11. Scope control

The active task's `In scope`, `Out of scope`, and acceptance criteria are binding.

Do not:

- redesign unrelated pages,
- rename broad parts of the repository,
- introduce future services or integrations,
- replace the approved stack,
- invent product requirements absent from governing documents.

When a missing decision blocks implementation, stop at the smallest safe boundary and report the decision needed.

## 12. Pull-request handoff

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

## 13. Definition of complete

Work is complete only when:

- all task acceptance criteria are met,
- loading, empty, success, and error states required by the task exist,
- responsive and accessibility requirements are satisfied,
- tests and required checks pass,
- documentation reflects material decisions,
- the pull request is reviewable without additional explanation.
