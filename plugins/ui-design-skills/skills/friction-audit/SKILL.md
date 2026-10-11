---
name: friction-audit
description: >-
  Audit an already-built feature for user friction and produce prioritized,
  code-located fixes — grounding every finding in the real source and the
  data/contract flow rather than mockups, specs, or assumptions. Use this
  whenever the user wants a design or usability critique of something that
  already exists: "review the UX of this screen/flow", "where's the friction",
  "why does this feel clunky/confusing", "audit this API/CLI/feature from the
  user's perspective", "suggest UX improvements", "is this hard to use". Applies
  to any user-facing surface — UI, HTTP/SDK API, CLI, config files, error
  messages — not only visual UIs. Trigger even when the request is framed as
  "clean up the visuals", "make this less cluttered", or "make it consistent",
  because the durable wins almost always come from removing friction, not
  restyling. Do NOT use for pure bug fixes, net-new feature implementation, or
  reviewing a mockup/spec when there is no shipped code to read.
---

# Friction Audit

A friction audit critiques something that **already works** and finds where it
makes its user's life harder than it needs to be — then hands back fixes that
are located in the code and ranked by payoff.

## The one idea everything else serves

**Friction is the gap between what the user is trying to do and what the
implementation forces them to do.** Most of that gap is fixable in
*presentation*, because the data needed to close it is usually already flowing
— just unlabeled, unlinked, unordered, or buried. So the audit is not "imagine a
nicer design." It is: walk the real user's real task over the real code, find
each place the implementation taxes them, and check whether the cure is already
sitting in the payload.

This is why the audit is **code-grounded**. A critique written from a screenshot
or a memory of how the feature "probably works" invents problems and misses real
ones. A critique written from the source and the data contract can tell the
difference between "this needs new backend work" and "this is one wire away from
fixed" — and that distinction is the whole value.

## When it applies

Any user-facing surface where a human or a calling developer is the user: a UI
screen or flow, an HTTP/SDK API, a CLI, a config format, error/log messages, a
generated artifact. The "user" might be an end user, an operator, or another
engineer integrating against your API — name which one before you start.

Skip it for pure bug hunts, building something new, or "design reviews" of a
mockup with no implementation to read against (there's nothing to ground in).

## The method

Work the phases in order. Phases 1–2 are *grounding*; phase 3 plus the pattern
library are the *scan*; phase 4 is the *output*.

### 1. Ground in what ships, not what describes it

Read the actual implementation of the surface under review and the components it
composes. Ignore mockups, redesign sketches, design docs, and your own
assumptions about how it works — they encode intent, and friction only exists in
reality. If the user points you at a design artifact, note it, then go find the
code it was supposed to become and audit that.

### 2. Trace the data/contract end-to-end, then split findings into *latent* vs *missing*

Follow the data from where it originates (the API/DB serializer, the function
that builds the response, the model layer) to where it's consumed (the
component, the client, the caller). Write down what is actually *available* at
the point of use.

Now every finding sorts into one of two buckets — and you must label which:

- **Latent** — the data is already present but isn't surfaced, linked, labeled,
  or ordered usefully. These are the gold: cheap, usually presentation-only, no
  new backend work.
- **Missing** — the information genuinely isn't there and something upstream has
  to produce it.

Most high-value findings are latent. Looking for them is the habit that
separates this audit from generic design advice. (Example from a real audit: a
card showed a filename as inert text while the *download URL for that exact file
was already in the payload* — a three-click chore that was one `href` away from
a one-click action.)

### 3. Replay the user's real loop and count the cost

Name the operator concretely (not "a user" — *the editor who moves 120 terms
through an 8-stage pipeline*, *the engineer integrating the billing API*). Then
enumerate their actual recurring loop and walk it step by step over the code.

Measure friction in concrete units, because countable friction is defensible
friction:

- **Steps to a routine outcome** — clicks, screens, dialog round-trips for a UI;
  API calls / round-trips for an integration; commands or flags for a CLI. "Three
  clicks to open the file you're already looking at" and "an N+1 call to render
  one row" are the same finding in different surfaces.
- **Context you're forced to abandon** — an action that closes the thing you
  needed to keep (a modal that dismisses another, a command that drops you out of
  a session, an endpoint that makes you re-fetch state you just had).
- **Things the user must carry in their head** — required call ordering, manual
  cleanup, a value from screen A you must retype on screen B, magic strings.

The most-repeated action deserves the most scrutiny: shaving one step off the
thing done 200×/day beats fixing a corner nobody visits.

### Scan with the friction pattern library

With the user's loop in mind, sweep the surface for these recurring smells. They
generalize across UI, API, and CLI — the noun changes, the smell doesn't.

- **Vocabulary leaks.** The system's internal model showing through in the
  user's language: migration jargon, raw enum/role tokens, DB column names in API
  fields, stack-trace phrasing in error messages, flags named after internal
  variables. The surface should speak the user's domain ("the author's
  response"), not the codebase's (`editorial_response_to_author`). Treat each
  leak as a bug.
- **Redundancy & inconsistency = comprehension tax.** The same fact stated in
  two places (so they can drift), structure that varies without reason (some
  cards have a footer, some don't — broken rhythm), divergent names/defaults for
  one concept across endpoints or screens, and — a subtle one — two code paths
  independently deciding the *same* fact and free to disagree. Push toward one
  fact, one source of truth, one expression.
- **Missing primary axis.** For any list, log, history, feed, or paginated
  response: ask what question the consumer opens it to answer, then check the
  dominant organizing axis matches. A file history with no timestamps and no
  pipeline order can't answer "what happened, and when?" — which is the only
  reason to open it.
- **Inert information.** Data shown as dead text when the user's obvious next
  move is to act on it — a filename you can't open, an ID you can't follow, an
  error with no remedy. (Frequently a *latent* finding from phase 2.)
- **Jargon/over-disclosure in the wrong place.** Internal counters, folder paths,
  role tokens, debug fields surfaced to a user who can't use them; meanwhile the
  number they *do* want (how many versions exist, what changed) is computed and
  thrown away.
- **Mislabeled affordances.** Styling or naming that misrepresents what an action
  does — a normal, safe path dressed as dangerous, a destructive one that looks
  routine, a primary action that isn't the common one.

### 4. Anchor, price, and prioritize — the output contract

Turn observations into fixes:

- **Anchor every finding to code.** A finding without a `file:line` is a
  complaint; with a location it's a fix. Cite where it lives.
- **Price each one.** State the implementation cost and especially whether it's
  *latent* ("no backend change — the field already ships") or *missing* ("needs a
  new value from the serializer"). This is what lets the user choose.
- **Prioritize — don't dump a flat list.** Rank by friction-value (how much it
  hurts × how often it's hit) against risk/cost, and end by proposing a concrete
  **first slice**: the one or two highest-payoff, lowest-risk fixes to start with.

## Output format

Lead with the thesis the whole critique rests on (one or two sentences: what's
the core friction here). Then group findings by the user-facing concern they
touch (e.g. "displaying the current file", "the history view", "labels"), not by
file. Within each group, write each finding as **annoyance → fix**:

```
## <The concern, in the user's terms>

**The annoyance:** <what the user hits, in their words, with the cost counted —
clicks / round-trips / lost context>. <Grounded reference: `file.ext:line`, and
what the code actually does.>

**Fix:** <the concrete change>. <Latent or missing? Implementation cost.>
```

Close with **"Where I'd start"** — the prioritized first slice and a one-line
offer to implement it. Keep the user's vocabulary throughout; if you catch
yourself writing the system's term for something, that's often a finding.

## Worked example (compressed)

> **Displaying the current file on a card**
>
> **The annoyance:** I can see the filename but can't open it — three clicks
> (card → "View files" → scan → Download) to open the file I'm already looking
> at. `TermCard.jsx:149` renders `latestFileName` as an inert `<span>`.
>
> **Fix:** make it a real download link. **Latent** — `board-data.js:118` already
> ships `cardFields.downloadDraft.url` for every term; no backend change.

One finding, in the user's terms, cost counted, located in code, classified
latent, fix obvious. Reproduce that shape for each.

## Anti-patterns — how these audits go wrong

- **Critiquing the mockup.** If you find yourself referencing a design file
  instead of the running code, stop and re-ground (phase 1).
- **Inventing missing data that's actually latent.** Proposing a backend change
  for something already in the payload — the failure phase 2 exists to prevent.
- **Aesthetic drift.** "Make the radius consistent" is fine, but it's polish,
  not friction. Lead with what *costs the user effort*; treat pure styling as a
  secondary note.
- **A flat list of 20 equal-weight items.** Without ranking and a first slice,
  the user can't act. Prioritize.
- **Vague locations.** "The cards are cluttered" helps no one; "`workflow.css:719`
  draws a dashed divider under every card" is a fix waiting to happen.
