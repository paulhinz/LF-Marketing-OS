# Spreadsheet Specification

Build with the xlsx skill (openpyxl). File name: `LF Marketing Data Sources Map - YYYY-MM-DD.xlsx` (run date). Save to the user's working folder.

## Sheets (in order)

### 1. README
Purpose statement, run date/time, scope (LF-wide or project name), who ran it, status legend with the color key, and a short "How agents should use this map" section:

> Marketing agents: look up the data you need by Category or System on the Registry sheet. The Location/Link column is the canonical source — always prefer it over guessing. Check Verification Status and Last Verified before trusting a link. If your source is a Gap row, consult the Gaps & Actions sheet for the follow-up owner.

### 2. Data Source Registry (master sheet)
One row per data source/question. Columns:

| Col | Field | Notes |
|-----|-------|-------|
| A | ID | e.g. 1.1, 5.3b — category-prefixed |
| B | Category | 1 Systems of record … 8 Budget & tooling |
| C | Data / Question | What an agent would be looking for |
| D | Project Scope | "All LF", "PyTorch Foundation", or specific project |
| E | System | Platform holding the data |
| F | Location / Link | Canonical URL or navigation path (use =HYPERLINK where valid) |
| G | Owner | Named person/team |
| H | Update Frequency | |
| I | Access Notes | How to get access; connector to use |
| J | Verification Status | Rubric value |
| K | Last Verified | Date, this run for live-verified rows |
| L | Verified Via | Connector/tool used, or "seed docs" |

### 3. Systems & Tools
One row per platform: System, What it holds, Access route, Cowork connector (Yes/name or No), Admin/owner, Registry row IDs that live there.

### 4. Connector Status
One row per connector checked this run: Connector, Status (Connected / Needs authorization / Not available), What it unlocks (row IDs), How to connect.

### 5. Gaps & Actions
Filtered view of every Gap/Partially-confirmed row: ID, Data needed, Why blocked, Recommended action, Suggested owner.

## Formatting

- Header row: bold white text on dark blue fill (#003764 — LF blue), frozen (freeze_panes A2), autofilter on.
- Wrap text on Data/Question, Location, Notes columns; sensible column widths (Location up to 60).
- Status color coding (fill on the Verification Status cell): Confirmed = green (#C6EFCE), Partially confirmed / Confirmed (per doc) = yellow (#FFEB9C), Gap = red (#FFC7CE).
- Category bands: alternate light fill per category group on the Registry sheet.
- All fonts Arial 10; no merged cells in data areas (merged cells only in README).
- After writing, re-open the workbook programmatically to verify sheet count, row counts, and that no formula/hyperlink errors exist. Report row totals to the user.
