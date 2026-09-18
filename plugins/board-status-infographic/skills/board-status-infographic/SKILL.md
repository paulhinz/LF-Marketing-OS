---
name: board-status-infographic
description: Produces the one-page "State of the Foundation" board infographic for a Linux Foundation project or foundation as a print-ready PDF (plus HTML) ahead of each board meeting. It condenses the Quarterly Marketing Plan deck, the ED's board pre-read, and a short interview into one page of key metrics, goal status, risks, investments, and the decisions the board must take (tagged DISCUSS, REVIEW, or VOTE). Use whenever an ED, Project Leader, or LF marketer says "build the board infographic", "state of the foundation one-pager", "board update for [foundation]", "summarize the board pre-read on one page", "board meeting one-pager", "board dashboard for the [month] meeting", or asks for any single-page summary of foundation status and board decisions. Also use when someone shares a board pre-read or quarterly plan and asks to make it board-ready or "at a glance". This is the LFX Marketing OS "State of Foundation Board Update" agent.
---

# Board Status Infographic

One page. Numbers first. Decisions last and loudest. That is the whole design.

Board members read this in the two minutes before the meeting starts. The page has to
tell them where the foundation stands, what changed since last time, what is at risk,
and exactly what they are being asked to decide. Everything else lives in the pre-read
and exhibits; this page points to them.

The reference design is the Agentic AI Foundation Governing Board pre-read of September
2026 (`references/example-aaif.json`): a headline quote from the ED, "the ask" in one
sentence, a before-and-after scorecard, the member survey in three big numbers, four risk
callouts, six numbered investment areas, and five board questions each tagged with the
action expected. The quarterly variant (`references/example-quarterly.json`) leads with a
goals-versus-outcomes table from the marketing plan instead.

## Workflow

### 1. Find the sources, in this order

1. **Quarterly Marketing Plan deck** from the Quarterly Plan Agent (`[Project] Q[N] [Year]
   Marketing Plan.pptx`, or its Google Slides link). Look in the working folder, uploads,
   and Google Drive (`search_files` on "[Project] Q" + "Marketing Plan"). If it exists it
   is the primary source for goals, KPIs, budget, and pending decisions. Read it with the
   `pptx` skill or the Drive connector, including speaker notes. `references/source-intake.md`
   says which slides feed which blocks.
2. **A document with goals and board issues.** If there is no plan deck, or it is more than
   a quarter old, ask the ED first: *"Do you have a link to a document with this meeting's
   goals and board issues, such as the board pre-read, an agenda, or the prior plan?"*
   Read whatever they give (Google Doc, Word, Slides, PDF). The ED pre-read, when it
   exists, is the best source for the headline, the ask, the risks, and the decision list,
   because the ED has already chosen the framing they want the board to see.
3. **Interview.** Fill the remaining gaps with the questions in
   `references/interview-guide.md`. Ask them in two or three batches, not one at a time
   and not all twenty at once. Accept "skip" for anything the ED does not want on the page.
4. **Live data, optional.** When the LFX MCP tools are connected, refresh scorecard
   numbers (members, contributors, projects, event registrations) with the
   `lfx-mcp-playbooks:lfx-data-querying` skill and note the read date in the footer. Do
   not silently overwrite a number the ED gave you; show both and ask which to print.

Record where every number came from. The footer names the sources; the board will ask.

### 2. Choose the blocks (adaptive layout)

The page is built from blocks. Pick the ones this meeting needs; do not pad to fill.
`references/block-library.md` describes each block, its JSON fields, and when it earns
a place. The usual shapes:

| Meeting is mostly about | Lead with | Then | Always end with |
|---|---|---|---|
| Strategy or annual plan (like AAIF Sept 2026) | `scorecard` (inception → today) | `stats` (survey or adoption), `risks`, `numbered` (investment areas) | `decisions` |
| Quarterly review with a marketing plan | `goals` (Q goals vs outcomes) | `scorecard` (health), `timeline` (next quarter), `risks`, `bullets` (plan highlights) | `decisions` |
| Budget meeting | `scorecard` (financials: revenue, surplus, reserve) | `numbered` (where the money goes), `goals` or `stats`, `risks` | `decisions` |
| Governance or membership | `stats` (member mix, tiers, geography) | `risks`, `bullets` (proposal summary), `timeline` (process) | `decisions` |

Rules of thumb that keep the page readable:

- Five to seven blocks. Fewer than four looks thin; more than seven will not fit.
- `decisions` is always present and always last. If the ED says there are no decisions,
  push back once ("Not even a direction to confirm?"), then use `INFORM` tags.
- Every number that appears should have a comparison (from → to, target vs now, or a
  segment split). A lone number is trivia; a change is information.
- Risks are things the *board* can act on, not operational worries. Each risk item names
  the consequence and, where possible, the date it bites.
- The headline is the ED's sentence, in their words, ideally lifted from the pre-read.
  The ask is one sentence naming the money, the votes, or the direction being sought.

### 3. Write the content spec

Draft the JSON spec (schema in `references/block-library.md`, worked examples in
`references/example-*.json`). Writing standards for a board audience:

- Plain words, complete sentences, no jargon or internal acronyms without expansion.
  No em dashes. The ED will read this aloud.
- Labels under about 40 characters; detail lines under about 140. The build script will
  shrink the page to fit, but shrinking below about 90% means the content is too long,
  not the page too small.
- Decision items are questions the board can answer yes or no to, or discuss in ten
  minutes. Tag each: `VOTE` (or `APPROVE`) when a formal vote is taken, `REVIEW` when the
  board is reading a proposal for a later vote, `DISCUSS` when direction is sought,
  `INFORM` when no response is needed. Put the exhibit or slide reference on each.
- Order decisions as the agenda will run them, and say in the block subtitle which
  items carry votes.

Show the ED the draft spec as a short table (block, headline content) before rendering,
unless they asked you to just produce it. One round of corrections here is far cheaper
than three rounds on the PDF.

### 4. Build and check

```bash
pip install weasyprint --break-system-packages   # once per environment
python scripts/build_infographic.py spec.json "[Project] Board Update [Month Year].pdf" \
    --html "[Project] Board Update [Month Year].html" --page letter   # or --page a4
```

The script renders HTML, converts to PDF, and adjusts a global scale so the result is
exactly one page (shrinking if it overflows, growing slightly if the page is light). It
prints the final scale. Then:

1. Rasterize and look at it (`pdftoppm -png -r 70 out.pdf preview`). Check that no label
   wraps awkwardly, big numbers line up, and the decisions block is fully visible.
2. If the scale came out below 0.90, cut content rather than accept small type: drop the
   weakest block, trim risk text, or move detail to the exhibit references.
3. Cross-check every number against its source one more time. A wrong number on a board
   page is the one thing the ED will remember.
4. If a Brand Kit exists for the project, pass its primary and accent colors via the
   spec's `brand` object; otherwise the default LF-neutral navy and teal are fine.

Deliver the PDF (and the HTML for anyone who wants to paste it into a doc). Name files
`[Project] Board Update [Month Year].pdf`. Offer, in one line, to update it after the
meeting with the decisions taken, since the same spec becomes next meeting's baseline.

## Files

- `scripts/build_infographic.py` — JSON spec → HTML → one-page PDF; auto-fit.
- `references/block-library.md` — block types, JSON fields, when to use each, writing rules.
- `references/interview-guide.md` — the ED questions, in the order to ask them.
- `references/source-intake.md` — reading the quarterly plan deck and the ED pre-read into blocks; LFX refresh.
- `references/example-aaif.json` — the AAIF September 2026 governing board page (strategy shape).
- `references/example-quarterly.json` — a quarterly review page (plan shape).
