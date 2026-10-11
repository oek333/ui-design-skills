---
type: llm
weight: 2
focus:
  source: file
  path: index.html
---
The app originally had a separate "Dated only" checkbox in the black masthead (`#dated-only`, wired in src/extras.js) that hid undated witnesses by setting `style.display` on table cells. A century filter has now been added to the app.
PASS if this index.html no longer has that separate masthead "Dated only" control (it was removed or folded into the new century filter), so there is one place to filter witnesses by date.
FAIL if the masthead still contains the `dated-only` checkbox alongside the new filter.
