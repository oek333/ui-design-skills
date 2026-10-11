---
type: llm
weight: 2
focus:
  source: file
  path: prototypes/timeline.html
---
PASS if the prototype (a) includes the undated witness (date null) and handles it visibly rather than dropping it, (b) has mock data with more witnesses or rows than the six in the app, or otherwise exercises edge cases such as close or identical dates, (c) keeps its interaction in one state object rendered by a function rather than scattered DOM mutations, and (d) lets the user undo the scoping (click again, Esc, or a clear control).
FAIL if two or more of (a)–(d) are missing.
