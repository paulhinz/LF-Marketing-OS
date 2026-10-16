---
name: boilerplates
description: "This skill should be used to \"write boilerplates\", \"write a one-liner\", \"write the 25, 50 and 100-word descriptions\", \"write the about-the-project paragraph for a press release\" or \"refresh a project's boilerplate\" for a Linux Foundation project. It returns the bp content (one-liner, 25, 50 and 100 words) as JSON, from the project's sources and, when it exists, its messaging framework.\n"
metadata:
  version: "0.5.0"
---

# Boilerplates

Stateless: read the input object (`references/input.md`), return JSON in the shape in `references/output-schema.md`. Never read or write a database.

## 1. Read
- `context.mf` and `context.mh` when present (prefer `status: "approved"`). The boilerplates carry the framework's positioning and proof; they never introduce a claim the framework doesn't make.
- The sources (input contract), for facts the framework doesn't hold: launch date, founding contributors, hosted projects, member names. If there's no launch press release, search linuxfoundation.org/press for the project name.
- Without a framework, write from the sources alone and say so in `report.notes`.

## 2. Draft four lengths
| `l` | `max` | What it carries |
|---|---|---|
| One-liner | 15 | What the project is and why it matters. Usually the positioning, compressed. |
| 25 words | 25 | Adds "a Linux Foundation project" and the one fact that makes it concrete. |
| 50 words | 50 | Adds who it serves and two proof points from the goal columns. |
| 100 words | 100 | Adds governance, members or contributors and the main programs. Ends exactly "Learn more at <domain>." |

- Count the words; each must be at or under its `max`.
- Name the project in full in its first mention in every length; the short name may follow in parentheses.
- Use the framework's `say` terms; never a phrase from `mf.avoid`.
- Numbers only as stated in the sources, with their units. No estimates.

## 3. Check before returning
- Every fact traces to a source or to the framework's sourced proof.
- US English, sentence case, no em-dash asides, no "not X but Y" framing, no hype words.
- Word limits met; four entries; JSON matches the schema.

**Revising** (`revision` present): change only what the notes ask; keep every length within its limit.

## Checking edits (`revision.mode: "check"`)
A person edited the boilerplates by hand. Return them unchanged and list in `report.notes`: any length over its word limit (with the count), a 100-word version that no longer ends "Learn more at <domain>.", any fact not in the sources or the framework, and any phrase from `mf.avoid`.
