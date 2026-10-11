---
type: llm
weight: 1
---
PASS if the review flags at least two of: raw internal codes shown to editors (`status_code` values like `editorial_response_to_author`, role tokens like `ROLE_EDITOR_2`); the server folder path shown in the upload dialog; the routine "Send to copyedit" action styled as a red/danger button; the status stated twice on the card in different forms.
FAIL if it flags fewer than two of these.
