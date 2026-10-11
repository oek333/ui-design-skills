# Collation Desk

A reading desk for a text preserved in many manuscript witnesses. The ledger aligns the text
row by row (one row per segment) with one column per witness. The right-hand panel lists the
witnesses; selecting one highlights its column in the ledger. Plain HTML/JS, no build step.

- `styles/tokens.css` — design tokens (colours, type, spacing). All UI must use these.
- `styles/desk.css` — component styles (panel, section, chip, badge, ledger).
- `src/state.js` — the single shared state object and `setState()`.
- `src/ledger.js` — renders the ledger table from state.
- `src/panel.js` — renders the right-hand witness panel from state.
- `data/witnesses.js` — witnesses and aligned rows.
