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

## 2. The 26 plugins in this marketplace

**Foundation**
- `brand-guidelines-agent` — Builds a project's Brand Kit.
- `message-foundation-agent` — Builds a project's Message Foundation document.
- `icp-target-markets-agent` — Builds a project's Target Markets and ICP document.
- `website-designer-agent` — Builds and deploys a project website from the foundation documents.
- `lfx-marketing-os-qa` — Fact-checks and reviews foundation documents before they go out.
- `plain-writing` — Keeps all written output in a plain, simple style.

**Planning**
- `qtrly-marketing-review-agent` — Builds a workbook reviewing last quarter's marketing results.
- `marketing-plan-workbook-agent` — Builds a pre-filled marketing plan workbook for a foundation leader to review.
- `qtrly-plan-agent` — Builds the next quarter's marketing plan deck.
- `qtrly-campaign-plan-agent` — Turns a quarterly plan into a campaign brief.
- `board-status-infographic` — Builds a one-page State of the Foundation summary for a board meeting.
- `lf-zoom-hubspot-notes-logger` — Logs Zoom meeting notes into HubSpot and creates follow-up tasks.

**Creating**
- `linkedin-post-agent` — Drafts LinkedIn posts in the user's own voice.
- `member-pitch-deck` — Builds the standard membership pitch deck for a project.
- `case-study-agent` — Turns a video, transcript, or notes into a case study or blog post.
- `member-benefits-briefing` — Builds an executive briefing deck for a specific member company.

**Monitoring**
- `aeo-geo-analyzer` — Scores how well a website shows up in AI search and answer engines.
- `social-listening-report` — Reports what people are saying about a project on social media.
- `run-marketing-impact-report` — Builds a marketing performance report from live LFX and HubSpot data.
- `member-marketing-benefits-audit` — Reports how much of their marketing benefits each member has used.

**Community Engagement**
- `member-360` — Scores each member's engagement and recommends a next action.
- `ambassador-content-assignment` — Assigns event content to ambassadors and tracks who posts.
- `committee-health-agent` — Flags inactive committee representatives and drafts follow-up outreach.
- `community-monitor-agent` — Watches Slack and GitHub for community questions and drafts replies.

**Shared Skills**
- `lf-output-formatter` — Puts every agent's deck, document, or letter on the approved LF templates.

**Additional (not part of the core Marketing OS)**
- `marketing-agent-class` — Delivers the Claude Agent Workshop training course as slide decks.

## 3. Add this marketplace in Cowork

1. Open **Customize** in the sidebar, then **Plugins**.
2. Click **Add marketplace** and enter this repo: `paulhinz/LF-Marketing-OS` (or the full URL, `https://github.com/paulhinz/LF-Marketing-OS`).
3. Click **Browse plugins** — the 26 plugins above will be listed.
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
