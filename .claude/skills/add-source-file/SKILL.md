---
name: add-source-file
description: Add a new header/source pair (or a new area) to the Graphyne library with its CMake listing and a GoogleTest file. Use whenever a change creates a new .h/.cpp under project/ or a new test file under tests/.
---

# Add a source file to Graphyne

Graphyne lists every source by hand; a file that is not listed is silently not built.

1. **Header**: `project/include/<area>/<name>.h`, starting with `#pragma once`, code inside
   `namespace gn::<area>` (`gn` for `core`). A short doc comment on each public class.
2. **Source** (skip for header-only code): `project/src/<area>/<name>.cpp`, including its header first as
   `#include "<area>/<name>.h"`. Add it to `GRAPHYNE_SOURCES` in the top-level `CMakeLists.txt`, in its
   area's block (a new area gets a new block, blank line between blocks).
3. **Test**: `tests/<area>/test_<name>.cpp`:

   ```cpp
   #include <gtest/gtest.h>

   #include "<area>/<name>.h"

   using gn::<area>::<Type>;   // gn::<Type> for core

   TEST(<Type>, DoesTheThing) {
       ...
   }
   ```

   Suite name = the type under test, test name = the behaviour in CamelCase. Add the file to
   `GRAPHYNE_TEST_SOURCES` in `tests/CMakeLists.txt`, in its area's block. Tests are discovered by
   `gtest_discover_tests`; nothing else to register.
4. Engine areas (`core`, `memory`, `utils`, `ecs`, `scene`...) must not include SDL or Vulkan headers.
5. Names follow `AGENTS.md` → Conventions. Run clang-format on the new files.
6. Reconfigure (`cmake --preset msvc`), build (`cmake --build --preset msvc -- /nodeReuse:false`), run
   tests (`ctest --test-dir build/msvc -C Debug --output-on-failure`) and check the new tests appear in
   the count.
7. If you added an area, add it to the Layout table in `AGENTS.md` and to the README layout section.
