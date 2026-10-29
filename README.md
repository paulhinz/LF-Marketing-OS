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
- **Shared Skills** — cross-cutting skills every agent uses, such as the output formatter that puts each deliverable on the approved LF templates.

This repo is the distribution point for that agent set: a git-based marketplace that Cowork (or Claude Code) reads directly, so plugins can be installed and updated without emailing files around.

## 2. The 30 plugins in this marketplace

**Foundation** — run in this order; each one's output is the next one's input
- **NEW** `lfx-mos-brand-positioning` (v0.5.1, renamed from `lfx-position-and-brand`) — Six skills that draft and build a Linux Foundation project's brand and positioning kit, with renderers checked to WCAG 2.2 AA.  (replaces: `messaging-document` `brand-guidelines` `icp-target-markets-agent`)
- **NEW** `lfx-mos-website` (v0.5.0) — Builds a Linux Foundation project's website from its brand and positioning kit, checked for WCAG 2.2 AA and agent-ready, with blog posts and events. After the build you choose where it lives: Marketing OS, LF GitHub, a separate GitHub, or WordPress. Use it beside `lfx-mos-brand-positioning`.
1. REPLACED `messaging-document` (v1.0.0) — Builds a project's Messaging Document: vision, mission, positioning, pillars, message house, proof points, objections and copy primitives, as a concise LF slide deck. Command `build-lf-messaging-doc`.
2. REPLACED `brand-guidelines` (v1.1.0) — Builds a project's Brand Guidelines from the Messaging Document: logo rules, palette, typography, iconography, voice and tone, as an image-led LF slide deck plus `brand.json`. Command `build-lf-brand-guidelines`.
3. REPLACED `icp-target-markets-agent` (v0.4.0) — Builds a project's Target Markets and ICP document: firmographics, ICPs, 4–9 personas on one fixed template, Fit × Warmth rules, in 8–10 pages.
4. `audience-lists-agent` (v0.1.0) — Builds a project's Audience Lists document: a tiered, prioritized earned media target list with strategy and messages per outlet, the top 5–15 social media voices already talking about the project (Octolens, LFX Lens), and up to 20 existing HubSpot/Segment/LFX audiences from other foundations with overlapping ICPs.

**Foundation (supporting)**
- `lfx-marketing-os-qa` — Fact-checks and reviews foundation documents before they go out.
- `lfx-mos-plain-writing` (renamed from `plain-writing`) — Keeps all written output in a plain, simple style.
- `marketing-committee-chair-recommendation` — Reviews project's committee members and recommends marketing members.

**Planning**
- `qtrly-marketing-review-agent` — Builds a workbook reviewing last quarter's marketing results.
- `marketing-plan-workbook-agent` (v0.3.0) — Builds the pre-filled Marketing Plan Workbook an ED completes before the planning interview: a First Plan baseline when no prior plan exists, goals tied to the four business outcomes (KPI, budget share, timeline, risks), a Strategy Profile budget, and closing Goals Summary and Budget Summary slides.
- `qtrly-plan-agent` — Builds the next quarter's marketing plan deck.
- `qtrly-campaign-plan-agent` — Turns a quarterly plan into a campaign brief.
- `hot-campaign-workbook-agent` — Builds a draft hot campaign workbook when a goal is off track or news, a release, a viral post, or a competitor move creates an opening; the ED and CFT answer its questions before the campaign is planned.
- `board-status-infographic` — Builds a one-page State of the Foundation summary for a board meeting.
- `lf-zoom-hubspot-notes-logger` — Logs Zoom meeting notes into HubSpot and creates follow-up tasks.

**Creating**
- `lfx-mos-linkedin-post` (renamed from `linkedin-post-agent`) — Drafts LinkedIn posts in the user's own voice.
- `lfx-mos-member-pitch-deck` (v2.0.1, renamed from `member-pitch-deck`) — Builds the standard membership overview deck for a project in the LF membership-overview style (About the LF → Introducing the Foundation → How to join), modeled on the Member Growth x402 deck.
- `lfx-mos-case-study` (renamed from `case-study-agent`) — Turns a video, transcript, or notes into a case study or blog post.
- `lfx-mos-member-benefits-briefing` (renamed from `member-benefits-briefing`) — Builds an executive briefing deck for a specific member company.

**Monitoring**
- `lfx-mos-aeo-geo-analyzer` (renamed from `aeo-geo-analyzer`) — Scores how well a website shows up in AI search and answer engines.
- `lfx-mos-social-listening-report` (renamed from `social-listening-report`) — Reports what people are saying about a project on social media.
- `lfx-mos-social-sentiment-monitor` (renamed from `social-sentiment-monitor`) — Flags negative posts and unusually high engagement about a project on a schedule, drafts replies with a recommended voice, and sends the brief to named Slack recipients.
- `run-marketing-impact-report` — Builds a marketing performance report from live LFX and HubSpot data.
- `member-marketing-benefits-audit` — Reports how much of their marketing benefits each member has used.

**Community Engagement**
- `lfx-mos-member-360` (renamed from `member-360`) — Scores each member's engagement and recommends a next action.
- `ambassador-content-assignment` — Assigns event content to ambassadors and tracks who posts.
- `committee-health-agent` — Flags inactive committee representatives and drafts follow-up outreach.
- `community-monitor-agent` — Watches Slack and GitHub for community questions and drafts replies.

**Shared Skills**
- `lf-output-formatter` — Puts every agent's deck, document, or letter on the approved LF templates.

## 2a. Latest changes

**2026-10-29 — Nine plugins renamed to the `lfx-mos-` convention; marketing-agent-class removed.** Following the naming used for `lfx-mos-brand-positioning` and `lfx-mos-website`, these plugins drop "agent" and take the `lfx-mos-` prefix: `plain-writing` → `lfx-mos-plain-writing`, `linkedin-post-agent` → `lfx-mos-linkedin-post`, `member-pitch-deck` → `lfx-mos-member-pitch-deck`, `case-study-agent` → `lfx-mos-case-study`, `member-benefits-briefing` → `lfx-mos-member-benefits-briefing`, `aeo-geo-analyzer` → `lfx-mos-aeo-geo-analyzer`, `social-listening-report` → `lfx-mos-social-listening-report`, `social-sentiment-monitor` → `lfx-mos-social-sentiment-monitor`, `member-360` → `lfx-mos-member-360`. Each now has an "LFX Marketing OS · …" display name and a patch version bump. Skill names inside the plugins are unchanged. If you installed any of these under the old name, uninstall it and install it again under the new name. The `marketing-agent-class` plugin has been removed from the marketplace.

**2026-10-29 — lfx-mos-brand-positioning 0.5.1.** Brand kit book fixes from the AAIF run: symbol pages show the symbol alone (found automatically in the lockup when no symbol crop is supplied, instead of stretching the full logo), the stacked lockup is built from symbol and wordmark, logos never overflow their tiles, the cover subtext is the same standard line for every project, spacing under the primary lockup is fixed, and all icons use one colour.

**2026-10-29 — lfx-mos-website 0.5.0 (from 0.1.0).** After the build and WCAG audit you choose where the site lives: Maintain in Marketing OS (locked editor for copy, posts and events), Publish on LF GitHub (edited in the repo; posts and events by pull request), Export for a separate GitHub (zip with a GitHub Pages workflow), or Host on WordPress (an Asana request to the Web team). `finalize.js` packages each option; options 1 and 2 hand a launch request to the publish skill, which is specified but not built yet. Every page carries LF's required scripts (Transcend first in the head; cookie settings, LFX Segment, ZoomInfo and HubSpot at the end of the body). Sites are agent-ready: a Markdown twin of every page, Content Signals, and an edge Worker for Link headers and Markdown negotiation (86% on isitagentready.com's content profile, the same as akrites.org). Blog posts and events get their own pages, written in a rich-text editor with images (alt text required), inline code and code blocks. The editor now uses the Marketing OS look, and the new `references/ui-flow.md` specifies the five website screens in Marketing OS, from the reviewed Website Skill Prototype.

**2026-10-16 — lfx-mos-brand-positioning 0.5.0 (renamed from lfx-position-and-brand).** The plugin now uses its source name, matching what `lfx-mos-website` already references; reinstall it under the new name. 0.5.0 brings the renderers to WCAG 2.2 AA: accessible working colors, logo recoloring on dark and light grounds, a rendered contrast check that corrects and reports, tagged PDFs and logo alt text, and a fix for grey-on-grey logos when no reversed logo is supplied. 0.4.1 lets the renderers take a folder of skill outputs (`scripts/assemble.js` combines the JSON files and logo SVGs) and name the skill to run when something is missing.

**2026-10-15 — lfx-position-and-brand 0.4.0 (new) replaces messaging-document, brand-guidelines and icp-target-markets-agent.** One plugin, six skills, one per artifact: `messaging-framework`, `boilerplates`, `faq`, `brand-kit`, `presentation-template` and `one-pager`. The drafting skills return JSON (`mf`, `icp`, `mh`, `nums`, `bp`, `faq`, `kit`) with a `report` object and can check hand edits (`revision.mode: "check"`); the rendering skills produce the 16-page brand kit book, the .pptx presentation template with slide preview, and the one pager from content the drafting skills already produced. All six are stateless and hold no queue, storage, review, sign-off or live LFX data; those belong to the host app (see the plugin's `DEVELOPER.md`). The three replaced plugins stay in the marketplace for existing installs but are no longer the recommended path.

**2026-10-08 — messaging-document 1.0.0 and brand-guidelines 1.1.0 replace message-foundation-agent and brand-guidelines-agent.** The foundation agents now run Messaging Document → Brand Guidelines → ICP. `messaging-document` (`build-lf-messaging-doc`) needs no Brand Kit: it maps the foundation's own documents, reads the site, README, press release and LFX record, asks up to ten PMM questions for the gaps, and delivers a 14–18 slide deck on the LF 2025 template (Review Sheet, communications framework, positioning, alternatives, pillars, message house, proof points, objections, copy primitives, CTAs) plus Markdown and a `.fields.yaml` sidecar. `brand-guidelines` (`build-lf-brand-guidelines`) reads that sidecar, documents the existing identity from the brand page, site CSS and logo files in the form of the published LF brand pages (x402, OSAIA, ASWF), derives voice and tone in the run, draws every logo rule on the project's own mark with `brand_graphics.py`, and writes the `brand.json` every later agent uses. Both open with a Review Sheet; the Word-document output is retired.

**2026-10-06 — audience-lists-agent 0.1.0 (new).** Skill `build-audience-lists`: from the Brand Kit, Message Foundation and ICP it writes one Word document on the LF Agent DOCS template (re-skinned with the project's brand) with three sections: earned media targets by the strategy deck's five tiers, social media voices from Octolens and LFX Lens, and existing audiences in HubSpot, Segment and LFX. Read-only against every system. First run: x402 Foundation.

**2026-10-02 — marketing-plan-workbook-agent 0.3.0.** New skill `build-marketing-plan-workbook` replaces `create-marketing-plan-workbook`. After ED feedback on the x402 test: a First Plan mode opens with a "Where we stand today" LFX baseline (members and list-price revenue, new-membership trend, events, education, contributors, audience and content) when no prior plan or quarterly review exists; every goal ties to one of the four standard business outcomes (Fill the Seats, Grow the Audience, Nurture to Adoption, Secure & Retain Commitment) with a definition, KPI, budget share, timeline and risks on its own slide; Part IV is now the Budget — the ED picks a Strategy Profile (Conservative 12% / Aggressive 20% / Hyper-Growth 30% of revenue, paid pre-set at 30/40/50%), LF splits the remainder into services, third-party content and a discretionary reserve for hot and evergreen campaigns, and the total is allocated across goals; the deck closes with a consolidated Goals Summary table and a Budget Summary slide. Ships `scripts/budget_model.py` and a JSON-driven `scripts/build_workbook.js` generator plus a worked x402 example.

**2026-09-29 — foundation agents 0.4.0 / 0.5.0 / 0.4.0.** After ED feedback, the Brand Kit, Message Foundation and ICP agents now: ask for existing documents first and interview only for the gaps; open with a two-page Review Sheet (field, current wording, source, approve/edit, notes) in place of the YOUR INPUT section; hold a length budget (6–8 / 8–10 / 8–10 pages, no section over 300 words); use fixed micro-templates (three-part messaging pillars, eleven-field personas, three-column voice attributes); add "what we don't claim" and "what NOT to say" fields; keep only sourced proof points; and write structured `.fields.yaml` and `.inputs.yaml` sidecars to the project's common Drive folder. Retired from storage: audience messaging tables in the Brand Kit, talking points, sound-bite banks, the tiered CTA library, the channel quick reference and the messaging handoff table — downstream agents generate these on demand.

## 3. Add this marketplace in Cowork

1. Open **Customize** in the sidebar, then **Plugins**.
2. Click **Add marketplace** and enter this repo: `paulhinz/LF-Marketing-OS` (or the full URL, `https://github.com/paulhinz/LF-Marketing-OS`).
3. Click **Browse plugins** — the 30 plugins above will be listed.
4. Select and **Install** whichever ones you need.

This repo is public, so anyone can browse the code or add it as a marketplace without needing collaborator access or GitHub sign-in. To get updates later, come back to Customize → Plugins, find this marketplace, and click **Update**.

If you use the Claude Code CLI instead of Cowork, the equivalent is:

```
/plugin marketplace add paulhinz/LF-Marketing-OS
/plugin install messaging-document@lfx-marketing-os
```

(swap in whichever plugin name you want, from the list above).

---

### Maintaining this marketplace

Each plugin lives in `plugins/<name>/` with its own `.claude-plugin/plugin.json`. To ship a change: edit the plugin's files, bump the `version` field in its `plugin.json` (not in `marketplace.json`), commit, and push to `main`. Team members pick it up next time they click **Update** in Cowork.

**Naming.** Marketing OS plugins are named `lfx-mos-<area>` (for example `lfx-mos-brand-positioning` and `lfx-mos-website`). Keep the folder name, the `name` in `plugin.json` and the marketplace entry identical, and put the readable label in `displayName` (for example "LFX Marketing OS · Brand & Positioning").
