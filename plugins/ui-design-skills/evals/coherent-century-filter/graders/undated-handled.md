---
type: llm
weight: 1
focus:
  source: file
  path: src/panel.js
---
PASS if the code deliberately handles the undated witness (`date: null`), for example as its own "undated" option or an explicit, visible rule about where undated witnesses go.
FAIL if undated witnesses are silently dropped, mislabeled as a century, or would crash the century calculation.
