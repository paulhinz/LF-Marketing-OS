# Source intake: turning documents into blocks

## A. The Quarterly Marketing Plan deck (primary source when it exists)

Output of the LFX Marketing OS Quarterly Plan Agent (`qtrly-plan-agent`), a 10 to 14 slide
.pptx named `[Project] Q[N] [Year] Marketing Plan.pptx`, often also in Google Slides. Read
it with the `pptx` skill (`python -m markitdown file.pptx` or python-pptx, including
speaker notes) or with the Drive connector (`read_file_content` on the file ID).

| Plan slide | Feeds |
|---|---|
| Title | `header.organization`, quarter and year in `header.title` |
| Review / Baseline (last quarter's goals vs outcomes, what we learned) | `goals` block: goal, KPI, target, actual, status. "What we learned" lines become `note` fields on off-track rows |
| Project health & marketing snapshot | `scorecard` block: members, contributors, projects, followers, subscribers, registrations. Use the previous snapshot as `from` when the plan has it |
| Direction: business-outcome emphasis | Context for the `headline`; rarely printed directly |
| The Q[N] goals, ranked | `bullets` "plan highlights" or a forward-looking `goals` block with `target` filled and `actual` blank, `status: not-started` |
| One slide per goal (KPI, budget, milestones, risks) | Milestones with dates → `timeline`; goal risks that need board help → `risks` |
| Budget summary | `numbered` (allocation by goal or area) or the `ask` when approval is sought |
| Decisions & next steps | `decisions` block, one item per pending leadership decision; next review date → last `timeline` item |
| Speaker notes | Sources for the footer; "(manual)" markers mean confirm with the ED |

Status mapping for the `goals` block: use the plan's own language if it has one
(achieved / on track / behind). Otherwise: actual ≥ target → `done`; ≥ 80% of target
with time left → `on-track`; 50 to 80% → `at-risk`; below 50% or a missed deadline →
`off-track`. Tell the ED the rule you applied.

## B. The ED board pre-read (best source for framing)

A Google Doc or Word document like the AAIF "2027 strategy and the state of the
foundation" pre-read. Read it with `read_file_content` (Drive) or the `docx` skill. Map:

| Pre-read section | Feeds |
|---|---|
| Bold or quoted thesis sentence ("Our problem is not membership…") | `headline`, verbatim |
| "We ask the board to…" sentence | `ask` |
| "Where we stand" table (measure, at inception, today) | `scorecard` with `from`/`to`; the table's "what it tells the board" column can become `note` or be dropped |
| Survey or member-feedback section | `stats`: the three headline percentages, the by-tier or by-segment split as `table`, the clearest request as `callout` |
| "Risks that need board action" bullets | `risks`: pull the number or date at the start of each into `value` |
| Investment areas table | `numbered`, area names only; the "what we would buy" column goes into `detail` if space allows |
| "Discussion topics" or agenda, with "items N and M carry votes" | `decisions`: one per topic, action from the wording ("for review and discussion only" → REVIEW; "we ask the board to approve" → VOTE; "we want the board's read" → DISCUSS); exhibit letters into `reference` |
| Source line under tables | `footer` |

The pre-read is usually too long by a factor of ten. Keep the ED's nouns and numbers,
drop the connective prose, and keep the order the ED chose; it reflects how they will
present.

## C. Other documents

- **Board agenda** → `decisions` order and action types; meeting date for `header`.
- **Quarterly Marketing Review workbook** (from `create-quarterly-marketing-review-workbook`) → `goals` actuals and "what we learned" notes.
- **Member 360 spreadsheet** → renewal-risk counts for `risks`.
- **Budget spreadsheet** → `scorecard` financial items (revenue, surplus, reserve) and `numbered` allocations.
- **Survey deck** → `stats`.

## D. Refreshing numbers from LFX (optional)

When the LFX MCP tools are connected, load `lfx-mcp-playbooks:lfx-data-querying` and pull
current reads for the scorecard: member organizations by tier, active contributors,
hosted projects, event registrations, training enrollments. Then load
`lfx-mcp-playbooks:lfx-figure-checking` before printing anything that differs from the
ED's document. Present differences side by side ("pre-read says 270; LFX shows 274 as of
18 Sept") and let the ED choose. Put the LFX read date in the footer.

## E. Provenance

Keep a short private list while working: each printed number, its source, its date. The
footer summarizes it ("Source: foundation operating data as of September 2026; 2026
Member Pulse Survey"). If the ED asks where a figure came from during the meeting, that
list is the answer.
