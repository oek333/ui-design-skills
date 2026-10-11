---
name: ux-prototype-handoff
description: >-
  Build a single self-contained HTML prototype that doubles as a behavior-verified
  spec and an agent-ready handoff. Use this whenever the user wants to prototype,
  mock up, explore, sketch, or design a new UI/UX — a screen, panel, view, layout,
  rail, drawer, interaction, or flow — in HTML before it is built for real:
  "prototype this view", "mock up a ... panel", "design a new ... ", "let me see how
  ... would feel", "sketch an interface for ...", "try a layout where ...". Also use
  when turning a prototype into a design handoff or implementation brief for another
  agent or engineer. The workflow: lift the product's real visual tokens, fill it with
  realistic mock data dense enough to exercise the UX, verify the prototype's own JS in
  a stubbed DOM, name the UX style and its principles, and embed the philosophy plus a
  code-located build brief as a header comment in the file itself. Prefer this over an
  ad-hoc HTML mockup even when the user just says "quick mockup" — the grounding,
  verification, and embedded handoff are exactly what make a prototype trustworthy and
  reusable rather than throwaway. Do NOT use for implementing a feature in the real
  codebase, for auditing an already-shipped UI (that is friction-audit), for generating
  a static HTML report / dashboard / data-visualization deliverable, or for merely
  listing or writing about a design (e.g. announcing a prototype) — this skill is for
  building an interactive UI/UX sketch that is meant to be built for real.
---

# UX Prototype + Handoff

A way of prototyping a UI idea so the result is worth more than a pretty picture:
it speaks the product's real visual language, runs on realistic data, **proves its
own behavior**, and carries — in the same file — the design rationale and a located
build brief, so the prototype *is* the handoff.

## The one idea everything else serves

**A prototype is a hypothesis about an interaction; it is only worth building if it
can be clicked, tested, and handed off without translation.** So the artifact is a
single self-contained HTML file: the user can open it and *feel* the UX, you can run
its own logic and *verify* it, and an implementing agent can read one file and learn
both the vision and where it plugs into the real code. One artifact, four jobs —
exploration, decision, verification, handoff. Everything below keeps those four jobs
in one file.

This is why the prototype is **grounded, not invented**. A mockup drawn from
imagination teaches the wrong look and has to be re-derived at build time. A prototype
built from the product's *actual* tokens and wired to *plausible* data is something the
user recognizes and an agent can port almost verbatim. The grounding is the value.

## Phase 1 — Ground in the real design system (before any HTML)

Never invent a visual language when one exists. Find it and lift it verbatim.

- Search the codebase for the design tokens and component grammar: CSS custom
  properties (`grep` for `--` color/spacing vars), the font stack, border/rule
  conventions, an existing component's class names. Read the closest existing
  surface to what you're prototyping.
- Copy the tokens **verbatim** into the prototype (same variable names, same hex,
  same fonts). Reuse real class names where you can — a component that shares class
  names with the shipped code can later be relocated with zero restyle, which is a
  property the implementing agent will thank you for.
- Note the register (editorial/console? soft SaaS? dense/airy? RTL?) and match it.
  If the project keeps memory or design notes about its visual direction, honor them.

If there is genuinely no design system yet, say so and propose a direction *before*
building — that is itself a fork (see Phase 2).

## Phase 2 — Consult on the genuine forks (and only those)

Decide the conventional defaults yourself and state them; escalate only the choices
that are truly the user's to make and that change what you build. Over-asking on a
"prototype this" request is friction; deciding someone's product vision for them is
overreach. The line: *if a reasonable default exists, take it and mention it; if the
answer changes the structure and there's no default, ask.*

When you ask, use the question tool with **ASCII-mockup previews** for layout/visual
forks — a side-by-side of two concrete layouts decides faster than prose. Put your
recommendation first and label it "(Recommended)". Good forks to surface: where a new
surface sits relative to existing ones; whether filtered/removed items disappear vs.
gray out; how much navigation to preserve in a focused mode; trigger semantics
(click vs. shift-click). These are decisions a screenshot can't make for you.

## Phase 3 — Build the prototype

- **One file, vanilla, no build step.** Plain HTML/CSS/JS, no imports, no bundler.
  It must open by double-click. Put it in the repo's `prototypes/` dir (or wherever
  such sketches live).
- **Realistic, dense mock data.** Fill it with enough variety to actually exercise
  the UX the user described — including the edge cases (empty, partial, overflow,
  the "unique"/"lacuna" outliers, the long label, the RTL string). Thin data hides
  the friction you're prototyping to find. Use real-domain content, not "lorem".
- **State as coordinates; UI as a pure projection.** Keep a single flat state object
  and one `renderAll()` that projects state → DOM; interactions only *move
  coordinates*. This is what makes the behavior testable in isolation (Phase 4) and
  is the exact shape the implementing agent should mirror as a reducer — so build it
  that way from the start.
- **Smooth, reversible interaction.** Animate with CSS transitions
  (`max-height`/`opacity`/`flex-basis`), never `display:none` on something that
  should animate; collapse-to-spine instead of vanish where context matters; make
  every drill walk-back-able (Esc, breadcrumb). Honor `prefers-reduced-motion`.
- **Reuse primitives across modes; don't build new chrome per mode.** A "mode" should
  be a re-arrangement of the same panels over the same state, not a second UI.

## Phase 4 — Verify the prototype's own behavior

A prototype that merely *looks* right is a claim, not a result. For anything with
logic — filtering, navigation, state transitions, derived data — **prove it by
running the prototype's own JavaScript**, not by eyeballing the browser.

Extract the `<script>` from the file, run it in Node under a small stubbed DOM, expose
the state + pure functions, and assert on the **actual logic** (membership, not just
counts; that transitions land in the right state; that invariants hold). Re-run the
whole suite after every change as a regression. The full copy-pasteable harness — the
fake-DOM `el()` stub, the `vm` runner, and the assertion helper — is in
**`references/verify-in-stubbed-dom.md`**; read it when you reach this phase.

Test the things that would embarrass the handoff if wrong: the filter predicate over
its edge cases, that a stale/empty filter is *inert* rather than destructive, that
entering/leaving a mode restores the right state. This is also where you catch real
bugs (an unresolved lookup that empties a list, an off-by-one in derived ranges)
before they reach the brief.

## Phase 5 — Iterate precisely on corrections

The user will be particular — that is the point of a prototype. For each correction:
restate it in your own words to confirm you understood the *intent* (not just the
words), make the **minimal faithful change**, then re-run the Phase 4 suite so the
correction can't silently break the cascade. Surface any interpretive choice the
correction forced, and offer the one-line alternative.

## Phase 6 — Name the style and articulate its principles

Once the interaction settles, give it a name and a short philosophy — grounded in the
prototype's own mechanisms, not generic UX platitudes. A named philosophy is a *spine*
the implementing agent checks decisions against; a feature list is not.

Produce: a memorable **name** + one-line definition; the **lineage** it draws on (e.g.
faceted browsing, Miller columns, master-detail) and any inversion that makes it
distinctive; and **principles**, each phrased as a rule *and* tied to the concrete
function/element in the file that embodies it. Flag the 2-3 principles an
implementer is most likely to violate by reflex.

## Phase 7 — Embed the philosophy + build brief in the file

The handoff is the file. Put it at the very top as an HTML comment, in two parts, so an
agent reads one thing and knows both the vision and where it lands:

- **PART A — Design philosophy:** the name, definition, lineage, and principles from
  Phase 6.
- **PART B — Implementation brief:** GOAL · SOURCE OF TRUTH (name the prototype's own
  functions as the behavioral contract) · WHERE IT LIVES (the real files, found by
  searching the repo — components, stores, token files) · DATA WIRING (map each
  feature onto *existing* stores/models; tell the agent to filter/derive from what
  exists, not invent a parallel model) · INVARIANTS (the ones earned in Phase 4) ·
  ACCEPTANCE (reproduce the verified cases; type-check/lint; RTL if relevant) ·
  OPEN CHOICES (decisions still pending, with the default).

Two craft notes: (1) point the agent at *real* repo anchors you actually located —
file paths, type names, store names — so it extends the codebase instead of
re-deriving it; that grounding is the difference between a brief and a wish. (2) HTML
comment hygiene: a comment **cannot contain a doubled hyphen**, so write CSS tokens
without their leading `--`, use `=` rules and `→` arrows, and verify there is exactly
one closing delimiter before the markup. (Check with a quick script that counts
internal double-hyphens — see the reference file.)

## What good looks like

The user can open the file and immediately drive the real interaction on real-looking
data; you can show a passing assertion run over the prototype's own logic; and you can
hand the file path to an implementing agent and say "read the header top to bottom"
with nothing else attached. If any of those three isn't true yet, you're not done.

## Pitfalls

- Inventing a look instead of lifting the product's tokens (Phase 1).
- Data too thin to expose the friction you're prototyping (Phase 3).
- "It looks right" standing in for verification (Phase 4).
- A brief full of generic advice and invented file paths instead of located anchors
  (Phase 7).
- Building a second UI for a "mode" instead of re-arranging the existing primitives.
