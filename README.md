# UI design skills

Three skills I use with Claude when designing and reviewing interfaces. Each was written by Claude to distill a working session that went well; the `PROVENANCE.md` beside each skill says which session and quotes the prompts behind it, following `provenance-conventions.md`.

| Skill | Use it when | Origin |
|---|---|---|
| `coherent-ui` | Adding or changing anything on an existing screen, so the result reads as one design rather than a patch | 30 May 2026 |
| `friction-audit` | Reviewing something already built for the places it makes its user work harder than necessary | 5 June 2026 |
| `ux-prototype-handoff` | Designing a new view as a single HTML prototype that an implementing agent can build from without drifting | 17 June 2026 |

I tested them on five Claude models, with and without the skills; see [EVALS.md](EVALS.md).

`coherent-ui` was written for my own app, Variorum, and names its regions (ledger spine, witness columns, apparatus cards). Map those onto your own app's layout when you use it.

## Install in Claude Code

```
/plugin marketplace add oek333/ui-design-skills
/plugin install ui-design-skills@oualid-skills
```

Claude picks a skill up automatically when a request matches its description. You can also ask for one by name, for example "use the friction-audit skill on this page".

To install by hand instead, copy any folder from `plugins/ui-design-skills/skills/` into `~/.claude/skills/`.

## Use on claude.ai

Zip a skill folder and upload it under Settings → Capabilities → Skills.

## Layout

```
.claude-plugin/marketplace.json        marketplace catalogue
provenance-conventions.md              how the provenance notes are written
EVALS.md                               how the skills were tested, and results
plugins/ui-design-skills/
  .claude-plugin/plugin.json           plugin manifest
  skills/
    coherent-ui/                       SKILL.md, PROVENANCE.md
    friction-audit/                    SKILL.md, PROVENANCE.md
    ux-prototype-handoff/              SKILL.md, PROVENANCE.md, references/
  evals/                               test cases, test apps (fixtures/), results-summary.csv
```
