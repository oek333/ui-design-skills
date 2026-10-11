---
type: llm
weight: 2
---
PASS if the review (a) ties its findings to specific files with line numbers or quoted code locations, (b) distinguishes fixes that only need front-end/presentation changes from ones that need new data or backend work, and (c) ranks the fixes or proposes a concrete first set of changes to start with.
FAIL if any of (a), (b) or (c) is missing, or if it is a flat unranked list.
