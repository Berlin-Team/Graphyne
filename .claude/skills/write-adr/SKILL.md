---
name: write-adr
description: Record a Graphyne decision (dependency, architecture, workflow, style, stack choice) as a numbered ADR in docs/adr/. Use when the owner has made or is asked to make a decision that is hard to reverse.
---

# Write an ADR

1. Next number: the highest `docs/adr/NNNN-*.md` plus one, four digits. File name
   `NNNN-short-kebab-title.md`.
2. Use the template in `docs/adr/README.md`. Keep it under a page:
   - **Context**: the facts that force the decision, with sources (`path:line`, URLs from
     `docs-researcher`). For a choice between options, a short table of the options with their costs.
   - **Decision**: what Graphyne does, stated plainly.
   - **Consequences**: what gets easier, what gets harder, the follow-up work (and its roadmap item).
3. Status `Proposed` until the owner approves it in chat; then `Accepted` with today's date. Never mark a
   decision accepted on an agent's word.
4. Add the row to the index table in `docs/adr/README.md`. If it replaces an older ADR, set the old one to
   `Superseded by NNNN` and leave its text alone.
5. Update `AGENTS.md` and `docs/ROADMAP.md` where the decision changes rules or plans, in the same PR.
