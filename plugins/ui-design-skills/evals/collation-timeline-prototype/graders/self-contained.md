---
type: regex
weight: 1
pattern: '<script[^>]+src=|<link[^>]+rel=.?stylesheet'
match: not_contains
target:
  source: file
  path: prototypes/timeline.html
---
