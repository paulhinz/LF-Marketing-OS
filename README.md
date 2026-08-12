# LFX Marketing OS Plugin Marketplace

Private Claude plugin marketplace for The Linux Foundation's LFX Marketing OS. It holds all of the marketing agents in one git repository so the team can install and update them from a single source in Cowork.

## 1. What is LFX Marketing OS

LFX Marketing OS is The Linux Foundation's system of Claude-based marketing agents. Instead of one general assistant, each agent is scoped to a specific marketing job — building an LF project's foundational identity documents, planning a quarter, creating outbound content, or monitoring how a project is landing — and is packaged as a Claude plugin so it can be installed, updated, and shared like any other piece of software.

The agents are organized by where they sit in a marketing workflow:

- **Foundation Agents** — establish a project's brand, messaging, and target market before anything else gets built.
- **Planning Agents** — turn foundation work and past results into a quarter's goals.
- **Creating Agents** — produce outbound content (decks, posts) grounded in the foundation docs.
- **Monitoring Agents** — check how content and campaigns are performing after they ship.
- **Community Engagement Agents** — track how members and the community are engaging with a project, and turn that into next actions.

This repo is the distribution point for that agent set: a git-based marketplace that Cowork (or Claude Code) reads directly, so plugins can be installed and updated without emailing files around.

## 2. The 12 plugins in this marketplace

**Foundation**
- `brand-guidelines-agent` — Short intake with an LF project leader, then generates a Brand Kit: positioning, voice, audience messaging, competitive guardrails, and a five-part visual identity direction.
- `message-foundation-agent` — Interviews a project lead and produces a Message Foundation doc: word-count-locked summaries, boilerplate, `llms.txt`, elevator pitch, positioning, voice, audiences, and messaging pillars.
- `icp-target-markets-agent` — Reads the Brand Kit, Message Foundation, and GitHub README (and optionally live LFX membership data) to produce a Target Markets & ICP document with personas and fit/warmth scoring.
- `plain-writing` — Writes and revises prose in a plain style (simple words, complete sentences, no jargon or filler). Applies automatically whenever Claude drafts or edits prose.
- `website-designer-agent` — Turns the three foundation docs into an approved sitemap, a complete Hugo site, and a GitHub-deployed, DNS-ready launch package.

**Planning**
- `qtrly-plan-agent` — Walks an ED/Project Leader through the quarterly review cycle (results vs. goals, direction, ranked goals with KPIs/budget/timeline/risk) and produces a Google Slides-ready quarterly plan deck.

**Creating**
- `linkedin-post-agent` — Drafts LinkedIn posts about LF and open source work in the user's own voice, from any source content.
- `pitch-deck-agent` — Generates the standard first-meeting membership pitch deck ("Golden Deck"), grounded in a project's Brand Kit, Message Foundation, and ICP docs.

**Monitoring**
- `aeo-geo-analyzer` — Scores a website's AEO/GEO performance (AI crawler access, `llms.txt`, answerability, structured data, citation authority) and returns prioritized recommendations.
- `social-listening-report` — Builds Voices That Matter, Campaign Echo, and Ask-Anything reports from LFX Lens/Octolens social listening data.

**Community Engagement**
- `member-360` — Scores each project member's engagement across events, speaking, ambassadors, committees, content, and marketing activity; flags gaps; and recommends a next best action for Marketing, Member Success, or Sales in a ranked spreadsheet built for QBRs.

**Additional (not part of the core Marketing OS)**
- `marketing-agent-class` — Delivers The Linux Foundation's Claude Agent Workshop training as personalized slide decks, with live student Q&A captured in a companion deck.
- `run-lf-top-projects` — Ranks LF foundations and projects by sub-projects, active members, and annual membership revenue, exported to a Google Sheet.

## 3. Add this marketplace in Cowork

1. Open **Customize** in the sidebar, then **Plugins**.
2. Click **Add marketplace** and enter this repo: `paulhinz/LF_Marketing_OS` (or the full URL, `https://github.com/paulhinz/LF_Marketing_OS`).
3. Click **Browse plugins** — the 12 plugins above will be listed.
4. Select and **Install** whichever ones you need.

This is a private repo, so you need read access to it (ask Paul Hinz, phinz@linuxfoundation.org to add you as a collaborator) and to be signed in to GitHub on your machine. To get updates later, come back to Customize → Plugins, find this marketplace, and click **Update**.

If you use the Claude Code CLI instead of Cowork, the equivalent is:

```
/plugin marketplace add paulhinz/LF_Marketing_OS
/plugin install brand-guidelines-agent@lfx-marketing-os
```

(swap in whichever plugin name you want, from the list above).

---

### Maintaining this marketplace

Each plugin lives in `plugins/<name>/` with its own `.claude-plugin/plugin.json`. To ship a change: edit the plugin's files, bump the `version` field in its `plugin.json` (not in `marketplace.json`), commit, and push to `main`. Team members pick it up next time they click **Update** in Cowork.
