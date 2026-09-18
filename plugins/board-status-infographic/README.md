# Board Status Infographic

LFX Marketing OS **State of Foundation Board Update** agent. Produces the one-page infographic an Executive Director hands the board before each meeting: where the foundation stands, what changed, what is at risk, and exactly what the board is being asked to decide.

The reference design is the Agentic AI Foundation Governing Board pre-read of September 2026: a headline in the ED's words, "the ask" in one sentence, an inception-to-today scorecard, member survey figures, risk callouts, numbered investment areas, and the board questions each tagged DISCUSS, REVIEW, or VOTE.

## What it does

1. **Finds the sources, in order.** The Quarterly Marketing Plan deck (from `qtrly-plan-agent`) if one exists; otherwise it first asks the ED for a link to a document with the meeting's goals and board issues (pre-read, agenda, memo); then a short batched interview for gaps; optionally a refresh of scorecard numbers from LFX.
2. **Chooses the layout for this meeting.** The page is assembled from blocks (scorecard, stats, goals vs outcomes, risks, numbered areas, timeline, bullets, decisions). Strategy, quarterly review, budget, and governance meetings each get a different shape. The decisions block is always present and always last.
3. **Writes a content spec and renders it.** JSON spec → HTML → PDF with a bundled script that scales the page to land on exactly one page, then rasterizes it for a visual check.

## How to run

Say: **"Build the board infographic for [foundation]"**, **"state of the foundation one-pager"**, or **"summarize the board pre-read on one page"**.

## Requirements

- Python with `weasyprint` (`pip install weasyprint --break-system-packages`) and poppler or `pypdf` for page counting.
- **Google Drive connector** (recommended) to read the pre-read and plan deck.
- **LFX connector** (optional) to refresh scorecard figures.

## Output

`[Project] Board Update [Month Year].pdf` and `.html` in the working folder, Letter or A4. The JSON spec is kept so the same page can be updated after the meeting with the decisions taken and reused as next meeting's baseline.

## Files

- `skills/board-status-infographic/SKILL.md` — workflow, block selection, writing standards
- `skills/board-status-infographic/scripts/build_infographic.py` — spec → one-page PDF
- `skills/board-status-infographic/references/` — block library and spec schema, interview guide, source intake guide, two worked example specs (AAIF strategy page, quarterly review page)
