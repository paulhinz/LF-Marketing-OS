# Agent Definition File — required structure

Every Agent Definition File this skill produces must contain all of the fields below, in this order. Field names in **bold** are mandatory per the project brief; the notes under each explain what a complete answer looks like and draw on published agent-scoping best practice, so use the notes to judge whether an interview answer is actually complete (not just present).

This structure also mirrors the three-pillar template Paul Hinz's own "Documenting Workflows, Skills & Agents" slide already requires internally (Profile & Context / Operational Mechanics / Required Deliverables) — keep the section grouping below so outputs from this skill slot directly into that existing process.

## 1. Profile & context

- **Agent Name** — a short, verb-first or role-first name (e.g. "Speaker Promotion Kit Agent"), not a vague capability ("marketing helper").
- **Agent No. / 9-Agent Alignment** — which of the 9 core categories this maps to (see `nine-agent-taxonomy.md`). If it doesn't fit cleanly, say so and propose the closest fit plus a one-line justification.
- **Marketing Department Supported** — one of the 10 departments in the taxonomy reference.
- **One-paragraph plain-English description** — jargon-free, describes what the agent does and, just as importantly, what it explicitly does NOT do. If the requester can't produce this paragraph, the scope isn't clear enough yet — go back a round.

## 2. Human context

- **Human who performs this today** — a named role/title (e.g. "Product Marketing Manager for a technical B2B software enterprise"), not "someone on the team." Naming the human baseline also gives you a ready-made success bar: how long they take, how often they get it wrong, what "good" looks like.
- **User who runs the agent** — the specific persona who initiates/reviews it (e.g. Project Leader/"Riya", Foundation Marketing Lead/"Marcus", Creator-Host/"Demi", or a named role outside those three archetypes).

## 3. Inputs and outputs

- **Inputs required** — every input the agent needs, tagged as required vs. optional, with format (e.g. "Brand Kit (JSON, from Foundation Setup Agent)", "event date, attendance goal, budget — entered by PL"). If an input is "it depends," that dependency must be resolved before the definition is complete.
- **Output produced** — exactly what ships, in what format, and where it lands (e.g. "5–10 platform-formatted draft posts queued in Sprout Social").

## 4. Triggers

- **Trigger(s)** — what starts a run: a user action ("PL clicks 'Create new event'"), a schedule (weekly/daily cadence), an external event (GitHub release tag, new member record, recording upload), or another agent's output. Name the actual mechanism, not just "when needed."

## 5. Looping conditions

- **Metric of success (per-pass)** — the deterministic check, rubric, or human grader that tells the system whether one pass came out better or worse than the last (e.g. "A/B test reaches statistical significance," "plan accepted as-is by PL," "brand-safety pre-check passes"). Vague answers like "good quality" are not acceptable — push for something measurable or explicitly graded.
- **Boundary condition** — the hard stop that forces a check-in with a human regardless of confidence: a max number of iterations, a max time budget, a specific blocker type (e.g. "after 3 failed plan revisions, escalate to Marcus"; "any paid spend over $[threshold] requires approval before execution"). Every agent needs one; "runs until done" is not a boundary condition.

## 6. Reference resources

- **Repository / sample resources** — existing examples of a good output (a real newsletter issue, a past campaign brief, a case study) that will ground the agent's quality. Note where these live (Content Hub, a GitHub repo, a shared drive) and flag if none exist yet (a gap to close before build).

## 7. Systems (tools)

- **Systems this agent integrates with** — pick from the taxonomy's Anchor SaaS / Supporting SaaS / LF-built lists. For each, note the access level needed (read-only vs. write) and the blast radius if it acts wrongly with that access — write actions should default to draft/queued state until a human approves, not live-publish.

## 8. Human gates and external actors

- **Human Gate(s)** — at least one mandatory review/approval checkpoint, naming who approves, what they see (output only, or output + reasoning/sources), and what they can do (approve / edit / reject / escalate).
- **External actors** — anyone outside the immediate user who is affected or must be looped in (Legal/trademark review, Creative Services, a Governing Board, a member org receiving co-marketing approval, etc.).
- **Reversibility** — how the agent's action gets undone if it's wrong (e.g. "post pulled from Sprout Social queue," "campaign paused, spend refunded").

## Alignment & duplication check (append after the 8 fields above)

State clearly: (a) which existing agent(s) this overlaps with, if any (match by name + department, not by number — see the "Known ID collisions" note in the taxonomy reference), and (b) the recommended disposition — **Add** / **Define** / **Rename** / **Absorbed** / **Skip** — and why, using the taxonomy reference. Most requests that name an agent already visible on the roadmap should land on **Define** (it exists as an idea but has never been fully specced), not **Add**.
