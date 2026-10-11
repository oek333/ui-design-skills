---
type: llm
weight: 2
focus:
  source: file
  path: src/panel.js
---
PASS if the century filter is built into the existing right-hand witness panel (for example as another `panel-section` with an `h3` label) and its controls reuse the existing component classes (such as `chip`/`chip on`, `badge`, `witness-row`) rather than introducing a modal, a floating button, or new one-off markup with inline styles.
FAIL if the filter lives in a new modal/popup/floating element, uses inline style attributes or new ad-hoc classes for its controls, or if this file does not contain the filter UI at all.
