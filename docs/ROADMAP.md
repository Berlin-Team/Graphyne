# Roadmap

The orchestrator picks work from **Now**, top to bottom. One item per branch and PR; the PR that starts or
finishes an item updates this file. Decisions go to `adr/`.

Goal: a lightweight engine for learning and experimenting with low-level engine design (ECS, rendering,
multithreading). The stack (Vulkan + SDL2, 2024) is being reviewed before new features build on it.

## Now

1. **Refresh the toolchain.** Add a `builtin-baseline` to `vcpkg.json` (there is none) and use the same
   vcpkg commit in the Windows CI job instead of `2024.01.12`; decide whether Linux CI keeps apt packages
   or moves to vcpkg; drop the unused `tests` feature; `find_package(GTest CONFIG REQUIRED)`; Linux CI off
   `ubuntu-22.04`; Windows CI Vulkan SDK off 1.3.243; README says CMake ≥ 3.21 (presets v3) and that
   presets need `VCPKG_ROOT`; fix the stale "tests don't run" comment in `ci.yml`. Done when local and
   Windows CI builds resolve the same port versions and all CI jobs are green.
2. **Stack review → ADR 0003** (owner decides). Windowing: SDL2 (deprecated upstream) → SDL3, or other.
   Graphics: raw Vulkan, SDL3 GPU API, or another layer, judged against "lightweight and experimental".
   Research with `docs-researcher`, present options with costs, record the owner's choice, then plan the
   migration as its own item.

## Next

3. **Textures and sprites** on the chosen stack (`origin/feat/texture-rendering` holds earlier work;
   reassess it after item 2).
4. **ECS and scenes**: the main experiment. Pure C++, fully unit-tested, independent of rendering.

## Backlog

- Remove the tombstone files (`core/memory.h`, `graphics/vulkan_renderer.h`, their comment-only,
  uncompiled `.cpp`); the headers are still installed.
- Delete or use `cmake/GraphyneUtils.cmake` and `cmake/GraphyneDependencies.cmake` (unused).
- Project homepage in `CMakeLists.txt` and `vcpkg.json` points to `Multyp/graphyne`; origin is
  `Berlin-Team/Graphyne` (owner to confirm which is right).
- `core/app.h` doc comments name `gn::Frame`; the real type is `graphics::Frame`.
- Test presets for `asan`, `lint`, `msvc`; consider clang-tidy and ASan in CI.
- README layout section is out of date.
- Add the squash commit of the style-config PR to `.git-blame-ignore-revs` (the hash exists only after
  the merge).
- Names that break the naming rules: `Ok()` in `core/result.h`, the colour constants in
  `graphics/color.h` (no `k` prefix), the `r_`/`g_`/`b_`/`a_` parameters there. Rename, or record them
  as exceptions in ADR 0002.

## Done

- 2026-10-28: agent setup specific to Graphyne (`AGENTS.md`, agents, skills, this roadmap).
- 2026-10-28: style configs follow the code (ADR 0002); one-off clang-format pass; CI pins
  clang-format 19.1.5. Also fixed the GCC/Clang build (nested `Config` default arguments replaced by
  overloads) and the Windows CI job (`setup-vulkan-sdk` v1.2.1, off the disabled `actions/cache@v2`).
