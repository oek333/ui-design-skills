# Evaluation

*These three skills grew out of my own work and have served me well for a few months now, especially with older or smaller models. I have had little friction in the prototyping sessions where I used them. For the sake of quantifying things, I had Claude evaluate models with and without the skills. I gave minimal input beyond a few directions: Claude constructed the tests from my own work, ran them across the models, and wrote the report below at my direction. I read it once and made very few emendations. Take the results with a grain of salt, if you will; they are not exhaustive, but they do match my own experience. What they don’t measure is the time one saves reviewing the output, or the back-and-forth needed to reach the desired results. Those aspects you can judge for yourself, since they are largely subjective or depend on your context.*

*— Oualid*

The three skills were tested on five Claude models by giving each model the same task with and without the plugin. With the skills, scores rose on every model, by 31 to 47 points on average. The gains were largest on Opus 4.8 and Haiku 5.5, the models that did worst without them.

Run on 11 October 2026 with Claude Code 2.1.296.

## Method

- **Tool:** Claude Code's built-in `claude plugin eval`. Each test runs twice with the plugin loaded and twice without it.
- **Isolation:** every run starts in an empty workspace with a temporary home directory. The runs without the plugin therefore have no access to these skills.
- **Workspace:** a setup script unpacks a small test app into the workspace. The readable apps are in [`plugins/ui-design-skills/evals/fixtures/`](plugins/ui-design-skills/evals/fixtures/).
- **Same prompt for both sides:** the prompt never names a skill, so each run also tests whether the skill switches on by itself.
- **Scoring:** each test has several checks.
  - Pattern checks read the files the agent wrote.
  - Judged checks are graded by Claude Haiku, with three votes per check and a majority to pass.
  - A run's score is the weighted share of checks passed.
  - A separate indicator records whether the skill was invoked; it doesn't count toward the score.

## The tests

**friction-audit: reviewing an editorial board.** A small app where editors move dictionary terms through an eight-stage pipeline. Prompt: "Our editors keep saying the term board feels clunky… review it from their point of view." The app has planted problems. The checks ask whether the review:
- notices that a download link and upload dates are already in the data the page receives but aren't shown;
- flags internal codes, a server path and a routine action styled as dangerous;
- cites file and line locations;
- separates front-end fixes from back-end work, and ranks what to do first.

**coherent-ui: adding a filter to a collation desk.** A manuscript-collation app with a design system, a shared state object, and an earlier patch: a "Dated only" checkbox in the header that hides table cells directly. Prompt: "add a way to filter the witnesses by century." The checks ask whether the filter:
- sits in the existing witness panel, built from existing component classes;
- runs through the shared state, so the ledger and panel stay in sync;
- handles the undated witness;
- adds no new colours;
- replaces the old checkbox, so there is one place to filter by date.

**ux-prototype-handoff: prototyping a timeline view.** The same collation app, without the earlier patch. Prompt: mock up a timeline of witnesses by copy date, to be implemented by another agent afterwards. The checks ask whether the prototype:
- is one self-contained file with the app's design tokens copied in;
- carries a build brief naming the real source files;
- covers edge cases such as the undated witness and dense data, in one state object, with an undo;
- has its JavaScript tested by running it.

## Results

Average score, with the skills / without, out of 100:

| Skill | Opus 5.5 | Opus 5 | Opus 4.8 | Sonnet 5.5 | Haiku 5.5 |
|---|---|---|---|---|---|
| friction-audit | 100 / 83 | 100 / 67 | 100 / 33 | 83 / 67 | 83 / 17 |
| coherent-ui | 100 / 75 | 100 / 75 | 94 / 44 | 69 / 50 | 75 / 38 |
| ux-prototype-handoff | 100 / 50 | 100 / 50 | 88 / 63 | 100 / 44 | 88 / 50 |
| **Average gain** | **+31** | **+36** | **+47** | **+31** | **+47** |

The skill switched on by itself in all 30 runs with the plugin loaded. Every run, with every check result, is in [`results-summary.csv`](plugins/ui-design-skills/evals/results-summary.csv).

## What the results show

**friction-audit**
- The skill's main point is that the fix is often already in the data. Without the skill, Opus 4.8 and Haiku 5.5 missed it in both runs, and Opus 5 in one.
- The skill also made runs separate front-end from back-end work and rank their fixes. Without it, this was the check runs failed most often.
- With the skill, all Opus runs passed every check.

**coherent-ui**
- Without the skill, no model removed the old "Dated only" checkbox; every run left two date controls side by side.
- With the skill, every Opus run folded the checkbox into the new filter.
- Sonnet 5.5 and Haiku 5.5 did not fold it, even with the skill. They did place the filter in the existing panel and handle the undated witness more often with the skill. The rule to remove what a new feature replaces appears to need a larger model, or more prominence in the skill.

**ux-prototype-handoff**
- No model wrote a build brief into the prototype without the skill.
- With it, every run did.
- Without the skill, runs usually linked to the app's own stylesheets and scripts, so the prototype only worked inside the repo.
- Sonnet 5.5 followed the skill fully.
- Both Opus 4.8 runs and one Haiku run still produced a prototype that depends on other files.

**Cost:** runs with the skills took longer and used more tokens, about 1.1 to 1.5 times as much in total per test, the most on the prototype test.

## Limits

- **Small sample:** two runs per side per model. Read the gaps as directions, not precise measurements.
- **Purpose-built apps:** the test apps are small and were written for this evaluation. The problems planted in them match what the skills look for. Identifiers were renamed so they don't repeat the skills' own examples.
- **Automated grading:** judged checks are graded by Claude Haiku, not by people.
- **Mixed run dates for Opus 5.5:** its friction-audit and prototype scores come from an earlier run the same day, using the same test files.
- **Revised test:** the first coherent-ui test was replaced because its app's README did part of the skill's work and one check couldn't occur in practice.

## Running it again

From `plugins/ui-design-skills/`:

```
claude plugin eval . --scaffold --trust-plugin --allow-tools Bash Write Edit --runs 2 --model <model-id>
```

- **Cost:** runs count against your Claude plan's usage, or your API account if you use a key.
- **Changing a test app:** edit it in `evals/fixtures/`, then run `evals/build-scaffolds.sh` to regenerate the setup scripts.

— Claude Opus 5.5, in Claude Code 2.1.296
