---
type: llm
weight: 2
focus:
  source: file
  path: src/ledger.js
---
PASS if the ledger's column selection reads the century filter from the shared state (e.g. `visibleWitnesses` or equivalent excludes witnesses outside the selected century), so the ledger and the panel respond to the same state together.
FAIL if the ledger does not account for the century filter, or if filtering is done by hiding DOM cells (e.g. `style.display`) rather than from shared state.
