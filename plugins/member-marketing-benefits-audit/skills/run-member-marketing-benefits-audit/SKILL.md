---
name: run-member-marketing-benefits-audit
description: This skill should be used when a Linux Foundation or CNCF Executive Director, Project Leader, or LF marketing team member says "run the member marketing benefits audit", "marketing benefits utilisation audit for [year]", "which members used their blog/online program allowance", "how much of their marketing benefits do members have left", "audit member content against membership benefits", or otherwise asks to measure how member organisations used their tier's measurable marketing benefits (blog submissions, online programs, announcements) in a calendar year. This is the LFX Marketing OS "Member Marketing Benefits Audit Agent". It complements Member 360 — Member 360 scores overall engagement; this agent audits marketing-benefit consumption against each tier's annual allowance from the foundation's own website content.
---

# Member Marketing Benefits Audit Agent

Research and produce a **Member Marketing Benefits Utilisation Audit for a requested calendar year**. Identify member organisations that published content on the foundation's website during the year, count their content by type, identify their membership tier, and determine which measurable marketing benefits they used and how much of their annual allowance remains.

Default foundation: **CNCF** (cncf.io). The skill is parameterised — for another foundation, substitute its website sections and its published membership-benefit rules (never reuse CNCF's quotas for a different foundation).

Origin: requested by the CNCF team after a hackathon run of Member 360 showed marketing-benefit usage had to be assembled by hand from cncf.io.

## Reference files

- `references/benefit-rules.md` — the CNCF membership-benefit rules used as the audit's rules engine (tiers, annual allowances, what counts and what does not). Read before Step 3. For a non-CNCF foundation, gather that foundation's equivalent published benefits and confirm them with the user before applying any quota.

## Workflow

### Step 1 — Scope the run

Ask the user (one question, unless already stated):

1. Which calendar year is being audited?
2. Which foundation? (Default CNCF if the request context makes that clear.)

### Step 2 — Research the content

Use the foundation website and its archive/pagination to find **every individual content item published during the full calendar year being analysed**. For CNCF, review:

- https://www.cncf.io/blog/
- https://www.cncf.io/announcements/
- https://www.cncf.io/case-studies/
- https://www.cncf.io/online-programs/
- https://www.cncf.io/reports/
- Relevant year filters and pagination on these pages.

Count separately: **Blog Posts, Online Programs, Announcements, Case Studies, Whitepapers, Reports.**

Rules:

- Count individual published items, not category pages, search results, series, tags or episode numbers. Do not estimate or extrapolate.
- For every counted item, record: Title, Publication date, URL, Category, Organisation/member associated with the content, Author(s).
- Use the item's original publication date. Count each item once and remove duplicates.
- For Online Programs, count the actual individual programme/episode entries published during the year. **Never use episode numbering as a proxy for the number published.**
- Research the complete available dataset for the year: page through every archive to its end. Do not rely on category-page totals without checking the underlying content, and do not stop after finding examples.
- For large years, parallelize collection with sub-agents batched by content category and/or month, each returning the same structured record set; deduplicate on URL after merging.

### Step 3 — Identify the member

For every organisation associated with qualifying content, verify whether it is a current member of the foundation and identify its membership tier using authoritative sources — the LFX connector (`search_members`, `get_member_membership`) first, cross-checked against the foundation's public members page.

Possible tiers (CNCF): Academic / Nonprofit, Silver, Gold, Platinum, End User.

Rules:

- Do not assume that an individual author is the member. Attribute content to an organisation only when the organisation's involvement can be established from the source (author affiliation stated on the item, the organisation named as contributor/sponsor, or a case study subject).
- If membership status or tier cannot be verified, mark it **Unverified** — never guess a tier.

### Step 4 — Apply the membership benefits

Read `references/benefit-rules.md` and apply it as the rules engine.

- Do not treat Case Studies, Reports or Whitepapers as consumed membership benefits unless the benefit description explicitly identifies them as such.
- Track Announcements separately: the benefit permits submission to KubeCon + CloudNativeCon news packages but specifies no annual numerical allowance.
- Academic / Nonprofit: no stated annual quota — do not invent an allowance.

### Step 5 — Determine benefit utilisation

For each member, compare verified activity against the benefits that have a defined annual allowance (e.g., "Blog: 2/4 used, 2 remaining"; "Online Programs: 3/4 used, 1 remaining").

- Do not assume that every piece of content produced by a member consumed a membership benefit. Only count content where the connection to the relevant benefit can reasonably be established (e.g., a vendor-neutral post on the foundation blog attributed to the member counts against the blog allowance; a post merely mentioning the member does not).
- For benefits without a stated numerical allowance, report: **"Activity identified — no annual quota specified."** Do not create a "fully used" or "underused" judgement for benefits with no numerical allowance.

### Step 6 — Produce the report

Deliver an .xlsx workbook (use the xlsx skill; format with lf-output-formatter conventions where applicable) with three tabs, plus a short written summary in the response:

1. **Summary** — one row per member: Member | Tier | Blog | Online Programs | Announcements | Case Studies | Whitepapers | Reports
2. **Benefit Utilisation** — Member | Tier | Benefit | Annual Allowance | Used | Remaining | Evidence
3. **Content Audit** (complete) — Member | Tier | Category | Date | Title | URL | Benefit Counted? (Yes/No + reason)

Every number in the Summary and Benefit Utilisation tabs must reconcile with the individual content items in the Content Audit tab. Run this reconciliation before delivering, and state in the summary that it passed.

## Accuracy requirements

- Do not estimate missing data.
- Do not invent URLs, dates, organisations, membership tiers or benefit usage.
- Check duplicates and publication dates; verify membership tiers.
- Distinguish *content associated with a member* from *content that demonstrably consumed a membership benefit*.
- If something cannot be verified, clearly mark it as unverified. If the evidence does not support a conclusion, do not infer one.

The purpose of this audit is to give the foundation team a factual view of **which members used which measurable marketing benefits, how much of each allowance they used, and which available benefits have no identified usage**.
