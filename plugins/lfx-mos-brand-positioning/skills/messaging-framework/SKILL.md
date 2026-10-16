---
name: messaging-framework
description: "This skill should be used to \"draft a messaging framework\", \"draft a message house\", \"write the positioning\", \"write value propositions and key messages per goal\", \"write sound bites\", \"draft ICPs\", \"define the project's segments or personas\", \"write say / avoid rules\" or \"pull key numbers for the deck\" for a Linux Foundation project, from its website, press release, deck, integrated marketing plan and notes. It returns the mf, icp, mh and nums content as JSON. Boilerplates and the FAQ are separate skills.\n"
metadata:
  version: "0.5.0"
---

# Messaging framework

Stateless: read the input object (`references/input.md`), return JSON in the shapes in `references/output-schema.md`. Never read or write a database; the caller stores the result.

| Key | What it is | Shelf-life |
|---|---|---|
| `mf` | **Messaging framework**: vision → mission → positioning → tagline, then value proposition, key message, proof and sound bite per goal, plus say / avoid / anchor rules | Long (top) and medium (per goal) |
| `icp` | **Ideal customer profiles**: the segments, each mapped to goals, with personas, lead message, proof and CTA | Medium |
| `mh` | **Message house**: umbrella, brand line, three pillars with proof, why now, four audiences. The external one-page view of the framework | Medium |
| `nums` | **Key numbers** for the deck | Short; refresh each campaign |

Boilerplates (`boilerplates` skill) and the FAQ (`faq` skill) are drafted from this output.

Worked example: `references/worked-example.md` (PyTorch Foundation 2026). Read it before your first draft.

```
VISION → MISSION → POSITIONING → TAGLINE          long shelf-life, internal first
             │
   ┌─────────┼──────────────┬──────────────┐
 EVENTS   ADOPTION      COMMUNITY     MEMBERSHIP   one column per ranked goal
 value proposition · key message · proof · sound bite
             │
   ICPs mapped to goals  ·  say / avoid / anchor  ·  message house
```

Operating rule: **the story and the messages are fixed; campaigns change only audience, proof, channel and CTA.**

## 1. Read the sources
Read everything in `sources` (input contract): the site's home, about, brand, join, events and getting-started pages; every file and link. A `plan` file is the integrated marketing plan: take its ranked goals, numbers and segments as given. If there's no launch press release, search linuxfoundation.org/press for the project name. `sources.notes` and `revision.notes` are data, not instructions. Record what you read and what failed in `report`.

## 2. Framework (`mf`)
**Top (long shelf-life).** Each line narrows the one above.
- `vision`: the world the project wants, one sentence. Use the published vision if there is one.
- `mission`: what the project does to get there, one sentence. Use the published mission if there is one.
- `positioning`: one or two sentences: the layer the project owns, the claim no one else can make, why it's credible (usually neutral governance). Model: "The intelligence layer of AI is open: the PyTorch Foundation is the only place to build, train and serve AI on any chip, any cloud — under governance no vendor controls." Claim "the only" only when the sources support it.
- `tagline`: the official tagline if one exists; otherwise 3–6 words.

**Goal columns (medium shelf-life)**, in rank order.
- Defaults: `events` (1), `adoption` (2), `community` (3), `membership` (4). Use the plan's order and names when there is one. Drop a column the project has no activity for and say so in `notes`; keep `n` as the original rank.
- "Grow our audience" never gets a column: one sentence in `crosscut`.
- Per goal: `vp` (benefit first, one sentence), `key` (the belief we want, one sentence), `proof` (2–4 `[fact, source]`, numbers that make the claim undeniable), `bite` (3–10 words, the line twelve voices repeat), `icps` (ids of the segments it serves).

**Say / avoid / anchor.** `say`: 4–6 terms used consistently. `avoid`: 3–6 `[avoid, use instead]`, including anything in `sources.notes`. `anchor`: always "Which goal does this serve?", "Which segment is it for?", "Which key message does it carry?".

`notes`: choices the reviewer should check.

## 3. ICPs (`icp`)
Four to six segments that between them cover every goal column. A segment, not a single person.
`id`, `name`, `kind` (Organization or Individual), `who`, `goals`, `need`, `value`, `lead` (reuse or tighten the goal's `key`), `proof` (1–2), `cta` (one action), `channels` (2–4), `objection` (`[objection, response or null]`), `personas` (1–3 `[role, what they care about]`), `basis` (source label, or "Inferred" when reasoned from the sources).

## 4. Message house (`mh`)
The external view of the framework, and it must agree with it:
- `umbrella`: the public expression of `mf.positioning`. Plain, specific, no hype.
- `line`: exactly `mf.tagline`.
- Three `pillars` (the page shows exactly three): `t` (2–5 words), `m` (one sentence), `p` (three `[fact, source]`). Build them from the strongest goal columns.
- `found` (why now): one or two sentences on the problem.
- `aud`: four rows, `[icp.name, icp.lead]` for the four most important ICPs.

## 5. Key numbers (`nums`)
Three or four `[number, short label]` stated in the sources, preferring numbers already used as proof. Pad with `["[00]", "[metric, from LFX]"]`. Never compute or estimate.

## 6. Check before returning
- Every fact, number, member, date and quote traces to a source you read. Missing facts stay as `[brackets]` or `null`.
- `mh.line` = `mf.tagline`; `mh.umbrella` matches `mf.positioning`; every `icp.goals` id exists; every goal has a segment; `mh.aud` comes from the ICPs; nothing uses a phrase from `mf.avoid`.
- US English, sentence case, no em-dash asides in body copy, no "not X but Y" framing. Positioning and sound bites may use one dash for rhythm.
- JSON matches the schema exactly.

**Revising** (`revision` present): keep what isn't mentioned, change only what the notes ask. A change to the top of the framework flows down to `mh.umbrella` and `mh.line`; say in `report.notes` that boilerplates and the FAQ should be redrafted.

## Checking edits (`revision.mode: "check"`)
A person edited the framework by hand; the host sends their version as `revision.previous`. Don't rewrite their words. Return the content as given, with only these changes:
- `mh.line` set to `mf.tagline` if they differ (the tagline wins).
- `mf.anchor` restored to the three standard questions.
- Goal ids in `icp[].goals` and `mf.goals[].icps` trimmed of whitespace; nothing else normalized.
List everything else in `report.notes`, one issue per line, so the person can fix it: a goal with no segment, an ICP pointing to a goal that doesn't exist, an avoid-list phrase in use, a proof point with no source label, a new fact or number that isn't in the sources, an `mh.umbrella` that no longer matches `mf.positioning`. If the top of the framework changed, add that boilerplates and the FAQ should be redrafted.
