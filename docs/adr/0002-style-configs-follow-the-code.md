# 0002. Style configs follow the existing code

- Status: Accepted
- Date: 2026-10-28

## Context

`.clang-format` asks for Allman braces; the code uses attached (K&R) braces, and 46 of 50 files fail the
CI format check. `.clang-tidy` asks for `camelBack` functions and variables and `UPPER_CASE` constants;
the code uses `snake_case` (`on_update`, `request_exit`) and `kName` constants. `.clang-tidy` also has
comments inside its `Checks:` string, which turn two intended exclusions into bogus check names.

## Decision

The code is the reference. The configs change to match it: attached braces, 4 spaces, 120 columns;
types `CamelCase`; functions, methods, variables and parameters `snake_case`; private members `m_name`;
constants `kName`; macros `GN_NAME`; namespaces lower case. `.clang-format` targets C++20.

## Consequences

No renames: the public API keeps its names. The code was formatted by hand and not consistently, so no
config reproduces it exactly; item 1 also ran clang-format once over 39 files (whitespace and line
wrapping, plus three `// namespace x` closing comments; no code token changed). That commit belongs in `.git-blame-ignore-revs` so `git blame` stays
useful. clang-format output differs between versions, so CI pins clang-format 19.1.5, the version bundled
with Visual Studio 2022 here. A few names don't fit the naming rules (`Ok()` in `core/result.h`, the
colour constants in `graphics/color.h`); they are on the roadmap backlog.
