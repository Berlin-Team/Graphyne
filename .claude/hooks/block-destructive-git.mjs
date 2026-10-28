// PreToolUse hook for Bash and PowerShell: block git commands that throw away uncommitted work or the index.
// Several agents share one working tree; these commands silently destroy other agents' in-progress changes.
// Blocked: `git rm -r ... .` (whole tree, e.g. `git rm --cached -r .`), `git reset --hard`, `git clean -f...`,
// `git checkout .` / `git checkout -- .`, `git restore .`. Normal use (status, diff, add, commit, log, reverting a
// named file with `git checkout -- <file>`) is unaffected. Only real commands are checked, not text in arguments.
// Exit 2 blocks the tool call; stderr is shown to the agent.

const RULES = [
  { pattern: /^git\s+rm\b(?=.*\s-[a-z]*r)(?=.*\s(?:\.|\*|:\/)(?:\s|$))/i, why: "`git rm -r .` empties the index" },
  { pattern: /^git\s+reset\b.*\s--hard\b/i, why: "`git reset --hard` discards uncommitted work" },
  { pattern: /^git\s+clean\b.*\s-[a-z]*f/i, why: "`git clean -f` deletes untracked files" },
  { pattern: /^git\s+(?:checkout|restore)\b(?:\s+\S+)*\s+(?:--\s+)?(?:\.|\*|:\/)(?:\s|$)/i,
    why: "checking out or restoring the whole tree discards uncommitted work" },
];

// Splits a shell line into commands (on ; & | newlines and `$(`), and strips common launchers.
function commands(line) {
  return line
    .split(/[;&|\n]|\$\(/)
    .map((part) => part.trim().replace(/^(?:\(|`|sudo\s+|env\s+(?:\S+=\S*\s+)*)+/i, "").trim())
    .filter((part) => part.length > 0);
}

export function destructiveGitReason(command) {
  for (const part of commands(command)) {
    for (const rule of RULES) {
      if (rule.pattern.test(part)) return rule.why;
    }
  }
  return null;
}

async function main() {
  let raw = "";
  for await (const chunk of process.stdin) raw += chunk;
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0);
  }
  const command = input?.tool_input?.command;
  if (typeof command !== "string") process.exit(0);
  const why = destructiveGitReason(command);
  if (why === null) process.exit(0);
  process.stderr.write(
    `Blocked: ${why}. Other agents share this working tree (AGENTS.md). Revert only your own files by name, ` +
      "e.g. `git checkout -- path/to/file`, or ask the orchestrator.\n"
  );
  process.exit(2);
}

if (process.argv[1]?.endsWith("block-destructive-git.mjs")) {
  main();
}
