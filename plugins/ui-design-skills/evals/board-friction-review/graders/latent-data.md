---
type: llm
weight: 2
---
PASS if the review notices BOTH of these: (1) the current file name on a card is shown as plain, unclickable text even though a download URL for that exact file is already in the data the page receives (`links.currentDraft.url` in data/payload.js), so it can become a link without backend work; and (2) the file history list has no dates or meaningful order even though each file already carries `uploadedAt` (and `stage`) in the payload.
FAIL if it misses either, or proposes new backend/API work to supply data that the payload already contains.
