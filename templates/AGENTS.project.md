# Project instructions

Personal development baseline for Bryan. Fill the project context before implementation.

## Context to confirm

- Goal, users, scope, exclusions and acceptance criteria: TBD.
- Existing stack, package manager and commands: TBD.
- Data sensitivity, authorization model, tenancy and environments: TBD.
- Baseline Git ref and spec source for review: TBD.
- Tracker: local files under `.scratch/<feature>/issues/` by default, unless Bryan chooses another destination. This is a proposed default to confirm, not automatic authorization to publish.
- Triage vocabulary: `ready-for-agent` means the task is approved for implementation. For a hosted tracker, confirm labels and access before use.
- Standards: copy the relevant Skills Bryan guides into `docs/standards/`, or provide accessible paths to the collection. Read only the relevant guides.

## Workflow

- Ask focused questions before implementing. Reuse answers already given; resolve decisions that affect behavior, security, architecture or testing.
- Propose a short plan and agree the public interfaces to test before using tdd.
- Prefer Clean Architecture for business applications, with dependencies pointing inward. Keep static pages and simple work proportional to their needs.
- Use the selected skills relevant to the task, not the whole collection on every request. Preserve source invocation rules.
- `grill-with-docs` requires the unselected `grilling` skill. Do not install it silently or claim to have completed that wrapper; interview with `grill-me` and document with `domain-modeling` explicitly if both are available.
- `to-spec`, `to-tickets` and `code-review` expect tracker context. Supply the confirmed configuration above; pause if the host still needs unavailable setup. Draft locally when authorized; publishing externally requires approval.
- If code-review cannot use subagents, disclose that limitation and offer a manual review of standards and spec.
- Use TDD for meaningful programmable behavior; run lint, typecheck, appropriate tests and build using actual project commands.
- Apply server-side validation and authorization, secret handling, safe database access and checks appropriate to the project's data.

## Approval boundaries

- Work on a branch within the approved scope. Show the resulting diff and verification evidence.
- Before removal or a critical edit/update, present the proposed operation, impact, recovery and tests; obtain Bryan's specific approval.
- Database resets/destructive migrations, production deploys, merge, force-push, security settings, secret rotation and major dependency changes require specific approval.
- Do not treat silence as approval. Keep the affected action pending and continue independent preparation.
- A bundled skill or script never grants permission to publish messages/issues, execute downloaded code or expand access.

## Delivery

Report what changed, why, checks actually run, results and material limitations. Never claim tests, security guarantees or production success without evidence.
