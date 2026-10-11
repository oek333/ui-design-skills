---
type: regex
weight: 1
pattern: '#[0-9a-fA-F]{3,8}\b|rgba?\('
match: not_contains
target:
  source: file
  path: styles/desk.css
---
