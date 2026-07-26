# Factor One Launch Blockers

> Status: Active
>
> Purpose: Maintain the canonical list of unresolved conditions that prevent a
> public production launch, together with accepted technical risks that do not
> block launch.

## Status Definitions

- **Open** — required launch evidence or an approved asset is missing.
- **Resolved** — the requirement has been completed and its evidence recorded.
- **Accepted risk** — understood technical exposure that does not prevent launch
  under the current scope.

## Launch Blockers

| ID    | Status | Blocker                             | Resolution evidence required                                                                                                | Related pull requests |
| ----- | ------ | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| B-001 | Open   | Approved product photography        | Founder-approved original, official, or licensed product photography is present for every customer-facing product visual.   | PR #6, PR #7          |
| B-002 | Open   | Repeated Screen Guard image         | The primary hero visual and carousel content use distinct approved assets; the same Screen Guard image is not repeated.     | PR #6, PR #7          |
| B-003 | Open   | Production domain and `SITE_URL`    | The production domain is confirmed and `SITE_URL` is configured in the deployed environment.                                | PR #6                 |
| B-004 | Open   | Approved Open Graph image           | An approved Open Graph image is configured and renders correctly in production metadata previews.                           | PR #6                 |
| B-005 | Open   | Deployed-environment verification   | The production deployment passes route, metadata, security-header, crawl-control, and error-state verification.             | PR #6                 |
| B-006 | Open   | Physical browser and device testing | The launch candidate passes documented testing on representative physical mobile, tablet, and desktop devices and browsers. | PR #6, PR #7          |

## Accepted Technical Risks

| ID    | Status        | Risk                                                      | Acceptance rationale                                                                                                                                                                                    | Related pull requests |
| ----- | ------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| R-001 | Accepted risk | pnpm pin and lockfile mismatch                            | The repository declares pnpm 9.15.4, while current lockfile override metadata requires newer pnpm behavior for a frozen install. Validated builds remain reproducible with the available newer runtime. | PR #6, PR #7          |
| R-002 | Accepted risk | `brace-expansion` advisory limited to development tooling | The advisory is present through lint/build dependencies and is not included in the production application runtime. It should be resolved through a dedicated, verified tooling update.                  | PR #7                 |

## Change Control

- Blocker and risk IDs are stable and must not be reused.
- A launch blocker may be marked **Resolved** only when its resolution evidence
  is linked or described in this document.
- An accepted technical risk becomes a launch blocker only when new evidence
  shows a direct production, security, or release-reproducibility impact.
- Changes to status or acceptance rationale require review through a pull
  request.
