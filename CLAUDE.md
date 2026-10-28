@AGENTS.md

## Claude Code

### Orchestrator

A main session can run as orchestrator: start Claude Code on Opus 5.5 and send
`Follow the instructions in @.claude/prompts/orchestrator.md`. Its first session turns this generic
starter kit into a setup specific to Graphyne, with the owner.

### Agents (`.claude/agents/`, generic starters)

| Work                                                         | Agent             | Model      |
| ------------------------------------------------------------ | ----------------- | ---------- |
| Reading code, CMake and tests and explaining how a part works | `code-reader`     | Haiku 5.5  |
| Looking up docs, standards, libraries and vcpkg ports        | `docs-researcher` | Haiku 5.5  |
| Configuring, building, testing, format and lint checks       | `build-runner`    | Haiku 5.5  |
| Implementing a scoped C++ change with tests                  | `cpp-implementer` | Sonnet 5.5 |
| Reviewing a diff                                             | `code-reviewer`   | Sonnet 5.5 |

`code-reader`, `docs-researcher` and `build-runner` have no write tools; `code-reviewer` is read-only.
Never run two writing agents on the same files at once.

### Guards and skills

- `.claude/settings.json` runs `block-destructive-git.mjs` (no git commands that discard uncommitted work)
  and `block-python.mjs` (no `python` in shells on this machine) before shell commands. Both need Node.
- `.claude/skills/ponytail*` (copied from <https://github.com/DietrichGebert/ponytail>, MIT; source and
  licence in `ponytail/SOURCE.md` and `ponytail/LICENSE`): `ponytail` for the smallest complete change,
  `ponytail-review` and `ponytail-audit` for plain-English reviews, `ponytail-debt` to list `shortcut:`
  comments.
