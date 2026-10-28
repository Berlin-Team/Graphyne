# 0001. Branches off develop, PRs, owner squash-merges

- Status: Accepted
- Date: 2026-10-28

## Context

Agents now do much of the work on Graphyne. The history already uses `develop` as the integration
branch, squash-merged PRs (`(#1)`, `(#3)`) and conventional commit types with optional gitmoji.

## Decision

Work happens on short-lived branches off `develop` (`feat/`, `fix/`, `chore/`, `docs/`, `build/`, `ci/`),
one roadmap item or fix per branch. Agents may commit on their branch, push it and open a PR into
`develop`. The owner reviews and squash-merges; only the owner updates `main`. Commit subjects and PR
titles follow plain Conventional Commits, `type(optional scope): subject`, with no emoji or gitmoji
(amended 2026-10-28; earlier commits used optional gitmoji). No commit, PR or comment carries any trace of an
assistant (no `Co-Authored-By` trailer, no "Generated with" line).

## Consequences

The owner stays the gate for everything that lands. Agents never merge, never push to `develop` or
`main`, and never force-push a shared branch.
