# Member Marketing Benefits Audit Agent

LFX Marketing OS agent that researches and produces a **Member Marketing Benefits Utilisation Audit** for a requested calendar year: which member organisations published content on the foundation's website, their content counted by type, their membership tier, and how much of each measurable marketing benefit's annual allowance they used and have remaining.

Built for CNCF (cncf.io) by default; parameterised for other foundations with their own published benefit rules.

**Command:** "Run the member marketing benefits audit for CNCF for 2025"

**Output:** an .xlsx workbook with three reconciling tabs — Summary (content counts per member), Benefit Utilisation (allowance / used / remaining with evidence), and the complete Content Audit (every item with URL, date, and whether it consumed a benefit).

Complements `member-360`: Member 360 scores overall engagement; this agent audits marketing-benefit consumption in depth. Requested by the CNCF team (Federica Nocerino) after a hackathon run of Member 360 showed marketing-benefit usage had to be assembled by hand.
