# UI design skills

> *This repo is my way of sharing skill files that were written at one remove, in collaboration with LLMs, with their provenance clearly marked. These skills have been very useful to me, and I have tried to document exactly how each one came about. In short, they distill the idiosyncratic process that results from my prompting along specific lines. The workflows they encode are therefore as much mine as they are Claude’s, or any other LLM’s. They are one way of capturing ideas that took shape in dialogue with the models during coding sessions. I have made very few changes to the prose of the skill files themselves, because I was judging outcome, not presentation.*
>
> — Oualid

Three skills I use with Claude when designing and reviewing interfaces. The `PROVENANCE.md` beside each skill says which session it came from and quotes the prompts behind it, following `provenance-conventions.md`.

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

## Use with Codex

Codex reads skills in the same `SKILL.md` format from `~/.codex/skills/` (or `$CODEX_HOME/skills/`). Install all three with Codex's built-in installer:

```
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo oek333/ui-design-skills --method git \
  --path plugins/ui-design-skills/skills/coherent-ui \
         plugins/ui-design-skills/skills/friction-audit \
         plugins/ui-design-skills/skills/ux-prototype-handoff
```

`--method git` fetches with your own git credentials, which this private repo needs. You can also ask Codex to do it: "Use skill-installer to install the three skills under plugins/ui-design-skills/skills/ from oek333/ui-design-skills." Or clone the repo and copy the three folders into `~/.codex/skills/` by hand.

Start a new Codex session afterwards. The installer won't overwrite a skill folder that already exists, so remove an older copy first.

The skills were written and evaluated with Claude; the evaluation does not cover Codex models. Where `ux-prototype-handoff` mentions a question tool with layout previews, Codex will ask in the chat instead.

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
