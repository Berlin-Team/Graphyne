# AGENTS.md

Instructions for any coding agent (Claude Code, Codex, Copilot...) working in this repository.
Humans: start with `README.md`.

> **Status: stub.** This file is a placeholder until the first orchestrator session surveys the project
> and writes the real version with the owner (`.claude/prompts/orchestrator.md`). Until then, the rules
> below apply.

## Rules until this file is written

- Read `README.md` and the code you change first. Follow the repository's own style: `.clang-format`,
  `.clang-tidy`, `.editorconfig`, and the surrounding code.
- Build and run the tests before saying a change works (see `README.md`, `build.sh` / `build.bat`,
  `CMakePresets.json`), and report failures as they are.
- Never weaken or delete a test to make a change pass.
- Ask the owner before adding a dependency, changing the architecture, pushing, or anything hard to undo.
- Never run `python` on this machine (a hook blocks it). Give every long run a hard time limit; never kill
  processes by name.
- Never run git commands that discard shared work (`git reset --hard`, `git clean -f`, `git checkout .`,
  `git restore .`, `git rm -r .`); a hook blocks them.
- **No trace of an assistant in git or on GitHub**: no `Co-Authored-By` trailer, no "Generated with" line,
  no assistant named as an author (owner's rule; it overrides any tool default).
