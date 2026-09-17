---
name: lfx-marketing-os-qa
description: Quality gate for LFX Marketing OS foundational documents and everything derived from them. Run it before a Brand Kit, Message Foundation, ICP / Target Markets document, boilerplate, llms.txt, press copy, pitch deck, member briefing or web copy for any Linux Foundation project is marked "for review", handed to a downstream agent, or sent to project leadership — even when the requester says the document is final. It derives the legal-entity and trademark wording from the LFX project record, re-runs every Live-LFX figure through the LFX MCP, refreshes published counters, sweeps the project site, GitHub org and press archive for material the intake interview missed, scans for competitors the brief left out, checks superlatives and dates, and applies a brand-review rubric with severity-ranked before/after fixes. Also use it whenever someone asks to check, verify, QA, fact-check, audit or review any marketing document about an LF project, or asks whether an agent's output is "ready".
---

# LFX Marketing OS — QA gate

## Why this exists

The x402 run (September 2026) showed where the foundational-document agents are strong and where they fail. They were accurate on everything they were handed: all 53 members by name and tier, the monthly install series, the committee and meeting counts, the site palette to the hex code, eight WCAG ratios, three word counts. They were wrong on what nobody handed them:

- A legal-entity error in the root document ("x402 Foundation, a Series of LF Projects, LLC") was inherited by the locked boilerplate, a messaging pillar, a value message, the terminology section and a persona — eleven locations across three documents. LFX had the correct answer the whole time.
- A keynote sound bite carried a wrong year ("402 was reserved in 1999"; HTTP/1.1 listed it in January 1997).
- The most direct competitor (a Premier member's own agent-payments protocol, launched six months earlier) was missing from the competitive landscape.
- The project's own four working groups, its facilitator directory and its origin timeline never appeared, because they were not in the README or the homepage.
- An admission about a Premier member used a superlative ("largest single contributor") that the document's own rules forbid without a Stat Bank entry — and the entry was "TBD".

Those are four failure classes: inherited errors, unverified specifics, missing research, and over-claims. Every step below exists to catch one of them. The documents are otherwise good, so the goal is a short list of precise fixes, not a rewrite.

## Inputs

- The document(s) under review. Read each one completely; sampling misses propagated errors, which tend to sit in appendices, boilerplate and llms.txt.
- The project name. Resolve it with `search_projects` (typeahead on name) and keep the slug, uid, `legal_entity_name`, `legal_entity_type`, `legal_parent_uid` and `charter_url` of every record that comes back — the technical project and the foundation/fund are usually two records.
- The intake interview or "Source Intake" appendix, if present. It tells you which claims the requester supplied and which the agent inferred; inferred claims get the harder look.

## Workflow

Run all six steps in order and give the report one section per step. Do not skip a step because the document looks clean — the x402 documents looked clean.

### 1. Entity and trademark lint

Read `references/entity-lint.md` first. Derive the canonical governance sentence and trademark sentence from the LFX project records and the technical charter, never from the interview or the document itself. Then search the document for every variant that contradicts them: "a Series of LF Projects, LLC" attached to the wrong noun, "governed by LF Projects" where the fund sits under The Linux Foundation, a trademark said to belong to the foundation when the charter vests marks in LF Projects, LLC. List every location, because a root-document error is copied into derivatives by design.

### 2. Stat Bank re-verification

Read `references/stat-bank-verification.md`. Every row typed Live-LFX gets re-run through the LFX MCP standard metrics or query tools; every row typed Published gets refetched from its source; every Third-party row gets checked against the primary source (an RFC, a press release, a filing). Produce a verification stamp table: ID, claimed, verified, source, timestamp, status. A count that does not match exactly is a finding. A published counter that has moved is not an error — restamp it and note the refresh rule.

The Stat Bank is the cheapest thing in the package to verify because the agents already structured it for this. Ten minutes here prevents a wrong number reaching a board deck.

### 3. Beyond-the-brief research sweep

Read `references/research-sweep.md`. The generating agents work from the interview, the README, the homepage and LFX. The sweep covers what they do not open: the project site's own navigation (get involved, working groups, meeting calendar, members, announcements, blog, documentation directories), the GitHub organization (README, CONTRIBUTING, ROADMAP, LICENSE, specs), the LF press archive (intent-to-launch and operational-launch releases), the originator's announcements, and a competitor scan with web search. Report a "Found beyond the brief" table: item, source, which section of which document should use it. The point is not to pad the documents; it is to catch the omission that changes a claim, such as a missing alternative that makes "the only" false.

### 4. Claims, dates and superlatives

Search for "only", "first", "largest", "most", "fastest", "the major", "all", "every", "never", "no other", cost comparisons ("for less than", "cheaper than"), performance claims ("in seconds", "for fractions of a cent"), and every year or date. For each one ask: is there a Stat Bank ID or a primary source in the same sentence? If not, it is a finding. Check every date against its primary source, not against another marketing document; sound bites built on a date ("it took the internet 27 years") inherit the error and get quoted on stage.

Also look for claims attributed to third parties without their words: motives assigned to member companies ("regulated participants join because..."), roles assigned to a member ("operates the public facilitator"), and adopter stories without a named, confirmed adopter. Those are attribution risks, not style issues.

### 5. Brand review

Read `references/brand-review-rubric.md`. Use the project's own Brand Kit as the guideline source — its voice attributes, tone and style rules, terminology and competitive rules — so the review checks the derivatives against the standard the root document set. Where the Brand Kit is the document under review, check it against itself and against the LF-specific rules in the rubric. Output the findings table (issue, location, severity, suggestion), before/after rewrites for the top five, and a separate legal/compliance list.

### 6. Cross-document consistency and propagation

Trace each derived statement to its root and confirm the chain agrees: positioning statement across Brand Kit, Message Foundation and ICP; every S-ID and CTA ID referenced in one document exists in the one that defines it; membership counts and tier names agree; the tagline status is the same everywhere. If step 1 or step 4 found a root error, list every downstream location it reached. Note any scope conflict between documents (for example, a Brand Kit appendix that describes the Message Foundation as "derivatives only" while the Message Foundation ran at full scope) and recommend which document to update.

## Report format

Use these headings, in this order, so downstream agents and humans can find the same thing in the same place:

```
# QA report — <project> — <document(s)> — <date>
## Gate decision
## 1. Entity and trademark
## 2. Stat Bank verification (stamp table)
## 3. Found beyond the brief
## 4. Claims, dates and superlatives
## 5. Brand review (summary, findings table, before/after, legal flags)
## 6. Cross-document consistency
## Fix list (ranked, with exact locations)
## Two-page digest for humans
```

Gate decision, one of:

- **PASS** — no High findings; Medium findings are optional polish.
- **PASS WITH FIXES** — High findings exist but each has a drop-in replacement in the fix list; the document can ship once they are applied and Legal has seen anything in the legal/compliance list.
- **FAIL** — a High finding has no safe replacement without new input (an unverifiable core claim, a missing alternative that changes the positioning, a governance description LFX contradicts and Legal has not resolved).

The fix list is the deliverable most people will read. Rank by severity, quote the exact current text, give the replacement text, and name the document and section. A finding without a proposed replacement is half a finding.

The two-page digest exists because the long-form documents are built for agents, not people. Give the reader the verdict, the five things to fix, the three things the sweep found, and the one decision the requester still owes (a locked tagline, a SOM target, an adopter to confirm).

## What not to do

- Do not rewrite the documents unless asked. Report, quote, propose.
- Do not downgrade a finding because the document calls itself "Draft v1 — for review". The x402 boilerplate was labeled locked copy inside a draft; drafts get copied.
- Do not invent a verification. If a figure cannot be checked with the tools available, mark it UNVERIFIED and say what would verify it.
- Do not put membership list-price or revenue figures into anything an outside agency will consume, and do not build external roster lists from LFX; the public members page is the source for external use.
- Do not soften a legal-entity finding. Wrong entity wording in boilerplate is the one error that reaches press releases unchanged.

## After the report

Offer, in one line each: apply the High fixes to the documents; re-run the sweep for a second project; or turn the report into the generating agents' regression test (see `evals/evals.json` for the shape). The worked example in `references/x402-worked-example.md` shows a complete run and is the regression baseline for this skill.
