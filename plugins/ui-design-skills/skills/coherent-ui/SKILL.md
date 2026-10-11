---
name: coherent-ui
description: >-
  Add, change, or extend UI as a single coherent visual whole rather than a stack
  of patches. Written for Variorum / Ledger Safe; when using it elsewhere, map its
  named regions (ledger spine, witness columns, apparatus cards) onto your own
  app's. Use this skill whenever you touch the frontend in any way — adding a new
  panel, control, view, badge, modal, filter, or feature surface; restyling
  something; or wiring up shared selection/filter state. Trigger it even when the
  change feels small ("just add a button," "just show the cast list"), because
  small additions are exactly where the interface drifts into a bolted-on,
  incoherent state. If the task produces or changes anything a user will see on
  screen, consult this first.
---

# Coherent UI

Every screen in Variorum is one composition, not a pile of features. When you add something, you are not appending an element — you are producing the **next coherent state of the whole screen**, in which every element still relates to every other and the new one looks like it was always meant to be there.

The user’s word for this is “stateful.” It is **not** the technical sense (React state, stores, reducers). It means the rendered interface reads as a unified visual whole — the sum of all elements is coherent — instead of a base UI with patches stapled on. Hold that meaning the entire time you work.

The failure this prevents is a Frankenstein interface: a new panel that doesn’t match the existing panels, a control that duplicates one already on screen, a modal in a product that doesn’t use modals, a selection that lights up in only one place, mismatched spacing and color because the new piece brought its own. Each patch is locally reasonable; the whole degrades.

## You are patching (stop and reconsider) if:

- You added a control without first checking whether an existing control should absorb it instead.
- You introduced a color, spacing value, radius, border, shadow, or font size that isn’t already in the established token set.
- You dropped a new panel / toolbar / modal next to existing chrome without re-checking whether the layout still balances.
- The feature touches a shared selection or filter (selected character, active witness, pivot) but only one region reflects it — the rest of the screen ignores the state.
- You left an old affordance in place after the new one supersedes it, so now there are two ways to do one thing.
- The new feature renders only its happy path; its empty / loading / partial / selected / conflicting states don’t match how the rest of the app shows those states.
- You can’t name the existing component the new piece is a sibling of.

## Procedure for any UI change

**1. Inventory before you build.** Name what is already on the screen: the layout regions (ledger spine, witness columns, the right-side map/propagation/log panel, apparatus cards), the component vocabulary (cards, list rows, badges, panel sections), the tokens (spacing scale, type scale, color roles, density), and the interaction patterns already in use (how selection looks, how candidate-vs-accepted device annotations look, how filtering reads). You are extending this, not starting fresh.

**2. Place, don’t append.** Decide whether the feature extends an existing region/component or genuinely needs a new one. Default to extending. A new region is earned only when it carries a distinct, persistent job — the Cast panel earns a panel; a one-off action does not earn a floating button.

**3. Reuse the vocabulary.** Same tokens, same primitives, same patterns. A coverage badge reuses the existing presence/gap styling. Suggested-vs-accepted character records reuse the device-annotation candidate/accepted treatment. A new panel is built like the panel that already exists. Introduce new visual language only with an explicit reason you could defend out loud.

**4. Propagate shared state once, everywhere.** If the feature introduces or touches state that several regions share, every region that should respond must respond — consistently and at the same time. Selecting a character is one selection expressed coherently across the whole composition: the ledger filters to its rows, the reader spine scopes to it, the apparatus cards follow. State reflected in one place and not the others is the most common source of an incoherent screen.

**5. Cover every state in the house style.** Empty, loading, partial, selected, filtered, conflicting — render each in the same vocabulary as the rest of the app, never with an ad-hoc treatment invented for this feature.

**6. Subtract on supersede.** If the new thing replaces an old thing, remove or fold the old thing. Do not accumulate parallel affordances.

**7. Re-read the whole screen.** When done, look at the entire screen as if seeing it for the first time. Does every element relate to every other? Does the new piece look native? If any part looks bolted on, it is — revise the composition, don’t ship the patch.

## Restraint (this is a dense scholarly tool)

Variorum is information-dense by design. Coherence here means calm, consistent density — not more chrome. Adding a feature should usually reuse or reduce surface, not multiply toolbars, badges, and buttons. Prefer adding a section to an existing panel over opening a new panel; prefer extending the reader over inventing a second reader. Match the density already set by the ledger and the reader rather than introducing a louder or sparser zone beside them.

## Worked example: the Cast panel + Close Reading

**Patched (wrong).** A floating “Characters” button opens a modal listing names. The modal has its own card style, its own blues, its own spacing. Clicking a name highlights it inside the modal only; the ledger behind it is unchanged. Locally it “works,” but it is a second app glued onto the first.

**Coherent (right).** A left collapsible panel constructed exactly like the existing right-side panel — same width behavior, header, section rhythm, tokens. Each character row shows name, witness-coverage count, and “all witnesses / partial” using the same presence/gap badges the collation already uses; suggested characters wear the same candidate styling as suggested device annotations. Selecting a character sets one shared selection that the ledger filter, the reader spine, and the apparatus cards all reflect together — so the whole screen enters “reading character X” coherently, at once. Nothing on screen looks new; the capability is new.

## Before you finish

- Every new visual value traces to an existing token — no orphan colors, spacings, or radii.
- The new piece is a sibling of a named existing component, not a one-off.
- Shared selection/filter state is reflected in every region that should show it, at the same time.
- Empty, loading, partial, selected, and conflict states match the app’s existing treatments.
- Anything the new feature supersedes has been removed or folded in — no parallel affordances.
- Read cold, the whole screen looks like one design; the new feature looks native, not added.
