# Project instructions

Personal development baseline for Bryan. Fill the project context before implementation.

## Context to confirm

- Goal, users, scope, exclusions and acceptance criteria: TBD.
- Existing stack, package manager and commands: TBD.
- Data sensitivity, authorization model, tenancy and environments: TBD.
- Baseline Git ref and spec source for review: TBD.
- Tracker: choose per project with setup-matt-pocock-skills before using tracker-dependent workflows. Do not inherit a tracker from the skill collection or another application.
- Triage vocabulary: `ready-for-agent` means the task is approved for implementation. For a hosted tracker, confirm labels and access before use.
- Standards: copy the relevant Skills Bryan guides into `docs/standards/`, or provide accessible paths to the collection. Read only the relevant guides.

## Workflow

- Ask focused questions before implementing. Reuse answers already given; resolve decisions that affect behavior, security, architecture or testing.
- For UI work, read the existing DESIGN.md and design system before asking questions. Follow the frontend guide provided under Standards. Record the visual direction in the project's DESIGN.md using the collection template when useful; point to canonical tokens in code and integrate existing decisions. Treat aesthetic defaults as adaptable guidance and report actual verification results.
- Propose a short plan and agree the public interfaces to test before using tdd.
- Prefer Clean Architecture for business applications, with dependencies pointing inward. Keep static pages and simple work proportional to their needs.
- Use the selected skills relevant to the task, not the whole collection on every request. Preserve source invocation rules.
- Install grill-with-docs together with grilling and domain-modeling; all are bundled. Invocation through a Skill tool still requires host support.
- Before first use of Matt's engineering skills, invoke setup-matt-pocock-skills in this project. It confirms the tracker and domain layout, shows drafts and writes docs/agents/issue-tracker.md and docs/agents/domain.md plus an Agent skills block in the existing instructions file. Do not duplicate AGENTS.md/CLAUDE.md.
- `to-spec`, `to-tickets` and `code-review` read that project configuration. Draft locally when authorized; publishing externally requires specific approval. Installing the skills alone does not execute their setup.
- Use security-best-practices and security-threat-model when their explicit security triggers apply, supabase-postgres-best-practices for Postgres work, playwright-cli for browser verification, and web-design-guidelines for UI audits. Verify runtime prerequisites first.
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
