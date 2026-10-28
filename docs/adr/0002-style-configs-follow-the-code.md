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

A small config diff instead of reformatting and renaming every file; `git blame` stays useful and the
public API keeps its names. The CI format check can go green. Roadmap item 1 does the change.
