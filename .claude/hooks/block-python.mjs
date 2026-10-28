// PreToolUse hook for Bash and PowerShell: block running Python on this machine.
// On Windows, `python`, `python3` and `py` can trigger a Microsoft Store / Python Install Manager install (AGENTS.md).
// Only blocks Python when it is the program being run (start of a command, after a separator or a launcher such as
// `&`, `Start-Process`, `cmd /c`, `env`); mentions in arguments, strings, file names or docs are allowed.
// Exit 2 blocks the tool call; stderr is shown to the agent.

const PYTHON_RUN = new RegExp(
  String.raw`(?:^|[;&|(\x60\n]|\$\()` + // start of a command
    String.raw`\s*(?:sudo\s+|env\s+(?:\S+=\S*\s+)*|start-process\s+(?:-filepath\s+)?|cmd(?:\.exe)?\s+\/c\s+)?` +
    String.raw`["']?(?:[\w:.~\\\/-]*[\\\/])?` + // optional path to the executable
    String.raw`(?:python3?|py)(?:\d+(?:\.\d+)*)?(?:\.exe)?["']?` +
    String.raw`(?=\s|$|[;&|)])`,
  "i"
);

export function runsPython(command) {
  return PYTHON_RUN.test(command);
}

async function main() {
  let raw = "";
  for await (const chunk of process.stdin) raw += chunk;
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0); // not our business if the payload is unreadable
  }
  const command = input?.tool_input?.command;
  if (typeof command !== "string" || !runsPython(command)) process.exit(0);
  process.stderr.write(
    "Blocked: running python/python3/py is not allowed in this repo (it can trigger a system install on this " +
      "machine, see AGENTS.md). Use bash tools (grep, sed, awk), CMake scripts or node instead.\n"
  );
  process.exit(2);
}

// Run only as the hook entry point, so tests can import runsPython().
if (process.argv[1]?.endsWith("block-python.mjs")) {
  main();
}
