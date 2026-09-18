# LFX Marketing OS Plugin Marketplace

Public Claude plugin marketplace for The Linux Foundation's LFX Marketing OS. It holds all of the marketing agents in one git repository so the team can install and update them from a single source in Cowork.

## 1. What is LFX Marketing OS

LFX Marketing OS is The Linux Foundation's system of Claude-based marketing agents. Instead of one general assistant, each agent is scoped to a specific marketing job — building an LF project's foundational identity documents, planning a quarter, creating outbound content, or monitoring how a project is landing — and is packaged as a Claude plugin so it can be installed, updated, and shared like any other piece of software.

The agents are organized by where they sit in a marketing workflow:

- **Foundation Agents** — establish a project's brand, messaging, and target market before anything else gets built.
- **Planning Agents** — turn foundation work and past results into a quarter's goals, and turn those goals into the campaigns that deliver them.
- **Creating Agents** — produce outbound content (decks, posts) grounded in the foundation docs.
- **Monitoring Agents** — check how content and campaigns are performing after they ship.
- **Community Engagement Agents** — track how members and the community are engaging with a project, and turn that into next actions.

This repo is the distribution point for that agent set: a git-based marketplace that Cowork (or Claude Code) reads directly, so plugins can be installed and updated without emailing files around.

## 2. The 23 plugins in this marketplace

**Foundation**
- `brand-guidelines-agent` — Pulls the project's LFX record and runs a research sweep, then a short intake with an LF project leader (or pre-fill mode for ED review), and generates a Brand Kit: positioning, voice, audience messaging, competitive guardrails, LFX-derived governance and trademark wording, and a five-part visual identity direction. (v0.3.0 — **new:** output is a Google Docs-ready document on the LF Agent DOCS Template, with the project's name and logo on the cover and its palette applied to headings and tables)
- `message-foundation-agent` — Interviews a project lead (reading the Brand Kit section by section) and produces a Message Foundation doc built on the LF communications framework: Vision → Mission → Positioning Platform → Tagline, a one-page Message Matrix, word-count-locked summaries, boilerplate, `llms.txt`, elevator pitch, voice, audiences with persona ROI angles, tagged messaging pillars, a verified and audience-marked Stat Bank, origin story and cases, objections and stance, and a tiered CTA library — with LFX-derived governance wording, a claims lint, pre-fill mode, a QA gate and a one-page digest. (v0.4.0 — **new:** delivered on the LF Agent DOCS Template with the project's logo and name on the cover and its Brand Kit colors applied)
- `icp-target-markets-agent` — Reads the Brand Kit, Message Foundation, and GitHub README, pulls live LFX membership data, runs a competitor scan that includes members' like-for-like products, and produces a Target Markets & ICP document with personas, fit/warmth scoring and a run-rate SOM proposal (pre-fill mode for ED review). (v0.3.0 — **new:** delivered on the LF Agent DOCS Template with the project's logo and name on the cover and its Brand Kit colors applied)

  The three foundation documents share one output standard as of this release: the Linux Foundation's **LF Agent DOCS Template** (Google Docs master: `docs.google.com/document/d/1RinjSuKojc9bqLLeviJfGE6yzSIfj8kSrTwIiWlH-HM`) — Open Sans body, Roboto Slab headings, LF logo header, agent/date/page footer — with a cover page carrying the project's logo and name and the project's brand colors on headings, cover accent and table headers. Each of the three plugins bundles the template (`assets/lf-agent-docs-template.docx`), the renderer (`scripts/build_lf_doc.py`, Markdown → .docx) and the spec (`references/lf-docs-template.md`); the three copies are identical and are changed together.

- `lfx-marketing-os-qa` — The QA gate for the three foundation documents and their derivatives: LFX-derived entity and trademark lint, Stat Bank re-verification through the LFX MCP, a beyond-the-brief research sweep, a claims/dates/superlatives check, a brand review against the project's own Brand Kit, and cross-document consistency — returning PASS / PASS WITH FIXES / FAIL, a ranked fix list and a two-page digest. (v0.1.0)
- `plain-writing` — Writes and revises prose in a plain style (simple words, complete sentences, no jargon or filler). Applies automatically whenever Claude drafts or edits prose.
- `website-designer-agent` — Turns the three foundation docs into an approved sitemap, a complete Hugo site, and a GitHub-deployed, DNS-ready launch package.

**Planning**
- `qtrly-plan-agent` — Walks an ED/Project Leader through the quarterly review cycle (results vs. goals, direction, ranked goals with KPIs/budget/timeline/risk) and produces a Google Slides-ready quarterly plan deck.
- `qtrly-campaign-plan-agent` — Takes the quarterly plan deck from `qtrly-plan-agent` (plus the Brand Kit, Message Foundation, ICP & Target Markets, and Pitch Deck) and produces the Quarterly Campaign Brief (.docx): the set of campaigns supporting each goal, each with a leader, mediums and sources, and per source the target markets, ICP/personas, key messages, assets to be created, CTAs, and message sequences — plus the ordered list of content creation and source execution agents to run. The CFT's campaign-definition step; strategy only, no content or execution.
- `qtrly-marketing-review-agent` — Generates a pre-filled Quarterly Marketing Review workbook (.pptx) for a foundation's marketing team at quarter end: goals-vs-actuals scorecard, business outcomes, the two engine-health conversions, channel indicators, vehicle scorecards, market signals, and a structured insights retrospective — pre-filled from LFX and marketing platform data, with unknowns as labeled blanks, never invented. The completed review is the retrospective input to `marketing-plan-workbook-agent`.
- `marketing-plan-workbook-agent` — Generates a pre-filled marketing plan workbook (.pptx) for a foundation, modeled on the Linux Foundation template for an integrated plan: pulls the LF master tracker, past marketing plans, LFX metrics, and — when available — the foundation's completed Quarterly Marketing Review workbook (from `qtrly-marketing-review-agent`), surfacing that review's Executive Summary at the top of the plan workbook so the marketing team can present last quarter's outcomes to the ED during the quarterly plan review. Drafts all five plan parts with DRAFT badges and YOUR INPUT question slides for the foundation leader to complete before a planning interview. The completed workbook feeds the final plan generation step.
- `board-status-infographic` — **New in v0.1.0.** Produces the one-page "State of the Foundation" board infographic (print-ready PDF plus HTML) before each board meeting: an inception-to-today scorecard, goals vs outcomes from the quarterly plan, member survey figures, risks that need board action, investment areas, and the decisions the board must take, each tagged DISCUSS / REVIEW / VOTE. Reads the Quarterly Marketing Plan deck from `qtrly-plan-agent` and the ED's board pre-read first, then interviews the ED for gaps. Adaptive block layout that always lands on exactly one page. Command: "Build the board infographic for [foundation]". (v0.1.0)
- `lf-zoom-hubspot-notes-logger` — Pulls a team member's Zoom meeting notes for today and yesterday, writes them into the matching HubSpot meeting records, opens follow-up tasks on opportunities, and flags ambiguous matches over Slack for manual review.

**Creating**
- `linkedin-post-agent` — Drafts LinkedIn posts about LF and open source work in the user's own voice, from any source content.
- `member-pitch-deck` — **New in v1.0.0 (replaces `pitch-deck-agent`).** Generates the standard first-meeting membership pitch deck ("Golden Deck"), grounded in a project's Brand Kit, Message Foundation, and ICP docs, and always formatted on the bundled LF 2025 Google Slides template. Command: `lf-member-pitch-deck`. If you installed `pitch-deck-agent`, uninstall it and install this one. (v1.0.0)
- `case-study-agent` — Converts any source content (YouTube video, interview transcript, meeting notes, recording, or raw text) into an on-brand Word doc — a case study by default, or a blog post, article, summary, or Q&A — grounded in the project's Brand Kit and Message Foundation docs.

- `member-benefits-briefing` — Builds the LF CEO-style member executive briefing deck (“[Company] and the Linux Foundation”) for any member company: live LFX footprint (memberships, dues, contribution/maintainer rankings, events, training) merged with the standing LF and open-source-AI narrative, output as a PowerPoint always formatted to the canonical LF 2025 Template (Google Slides), with the approved LF brand palette and official LF logo assets. (v0.3.0 — **new:** output slides now always follow the LF 2025 Template's exact design: template gradients, blue-header zebra tables, Open Sans)

**Monitoring**
- `aeo-geo-analyzer` — Scores a website's AEO/GEO performance (AI crawler access, `llms.txt`, answerability, structured data, citation authority) and returns prioritized recommendations.
- `social-listening-report` — Builds Voices That Matter, Campaign Echo, and Ask-Anything reports from LFX Lens/Octolens social listening data.

**Community Engagement**
- `member-360` — Scores each project member's engagement across events, speaking, ambassadors, committees, content, and marketing activity; flags gaps; and recommends a next best action for Marketing, Member Success, or Sales in a ranked spreadsheet built for QBRs.
- `ambassador-content-assignment` — Matches ambassadors against the KubeCon (or any LF event) schedule, generates personalized content assignments (video prompts, social copy, hashtags, tags, posting times) as a tracker spreadsheet, per-ambassador briefs, and outreach drafts, then tracks who actually posts via LFX Lens and drafts nudges.
- `committee-health-agent` — Monitors committee participation, flags inactive or outdated representatives, identifies member companies without an active contact, and drafts follow-up or replacement outreach for review — a committee-health workbook plus an approval-ready outreach queue.
- `community-monitor-agent` — Watches chosen Slack channels and GitHub repos on a user-set schedule, ranks new community questions by sentiment and asker value (community activity, member-company standing), and delivers a live report with drafted replies that can be sent to Slack with one click.

**Additional (not part of the core Marketing OS)**
- `marketing-agent-class` — Delivers The Linux Foundation's Claude Agent Workshop training as personalized slide decks, with live student Q&A captured in a companion deck.

## 3. Add this marketplace in Cowork

1. Open **Customize** in the sidebar, then **Plugins**.
2. Click **Add marketplace** and enter this repo: `paulhinz/LF-Marketing-OS` (or the full URL, `https://github.com/paulhinz/LF-Marketing-OS`).
3. Click **Browse plugins** — the 23 plugins above will be listed.
4. Select and **Install** whichever ones you need.

This repo is public, so anyone can browse the code or add it as a marketplace without needing collaborator access or GitHub sign-in. To get updates later, come back to Customize → Plugins, find this marketplace, and click **Update**.

If you use the Claude Code CLI instead of Cowork, the equivalent is:

```
/plugin marketplace add paulhinz/LF-Marketing-OS
/plugin install brand-guidelines-agent@lfx-marketing-os
```

(swap in whichever plugin name you want, from the list above).

---

### Maintaining this marketplace

Each plugin lives in `plugins/<name>/` with its own `.claude-plugin/plugin.json`. To ship a change: edit the plugin's files, bump the `version` field in its `plugin.json` (not in `marketplace.json`), commit, and push to `main`. Team members pick it up next time they click **Update** in Cowork.
