# LFX Marketing OS Plugin Marketplace

Public Claude plugin marketplace for The Linux Foundation's LFX Marketing OS. It holds all of the marketing agents in one git repository so the team can install and update them from a single source in Cowork.

## 1. What is LFX Marketing OS

LFX Marketing OS is The Linux Foundation's system of Claude-based marketing agents. Instead of one general assistant, each agent is scoped to a specific marketing job — building an LF project's foundational identity documents, planning a quarter, creating outbound content, or monitoring how a project is landing — and is packaged as a Claude plugin so it can be installed, updated, and shared like any other piece of software.

The agents are organized by where they sit in a marketing workflow:

- **Foundation** — establish a project's brand, messaging, and target market before anything else gets built.
- **Planning** — turn foundation work and past results into a quarter's goals.
- **Pipeline Development** — sales/CRM and member-pipeline work: meeting notes, member engagement, committee health.
- **Outbound Marketing** — produce content you push out (decks, posts, case studies, ambassador campaigns).
- **Inbound / Monitoring** — track how the project is being found and discussed, and turn that into next actions.

This repo is the distribution point for that agent set: a git-based marketplace that Cowork (or Claude Code) reads directly, so plugins can be installed and updated without emailing files around.

<!-- plugins:start -->
## 2. The 17 plugins in this marketplace

**Foundation**
- `brand-guidelines-agent` — Interviews an LF project leader and generates a Brand Kit: positioning, voice, messaging, and visual identity direction.
- `message-foundation-agent` — Interviews a project lead and produces a Message Foundation doc for web, content, social, and campaigns.
- `icp-target-markets-agent` — Builds a Target Markets & ICP document with personas and fit/warmth scoring from the foundation docs.
- `plain-writing` — Writes and revises prose in a plain style: simple words, complete sentences, no jargon or filler.
- `website-designer-agent` — Turns the foundation docs into an approved sitemap, complete Hugo site, and DNS-ready launch package.

**Planning**
- `qtrly-plan-agent` — Guides the quarterly review cycle and produces a Google Slides-ready quarterly marketing plan deck.

**Pipeline Development**
- `lf-zoom-hubspot-notes-logger` — Syncs Zoom meeting notes into HubSpot meeting records, opens follow-up tasks, and flags ambiguous matches for review.
- `member-360` — Scores each member's engagement across LF activities and recommends next best actions in a QBR-ready spreadsheet.
- `committee-health-agent` — Monitors committee participation, flags inactive or missing member representatives, and drafts outreach for review.

**Outbound Marketing**
- `linkedin-post-agent` — Drafts LinkedIn posts about LF and open source work in the user's authentic voice, from any source content.
- `pitch-deck-agent` — Generates the standard first-meeting membership pitch deck, grounded in the project's foundation docs.
- `case-study-agent` — Converts any source content into an on-brand case study, blog post, article, summary, or Q&A Word doc.
- `ambassador-content-assignment` — Matches ambassadors to LF event schedules, generates personalized content assignments, and tracks who posts.

**Inbound / Monitoring**
- `aeo-geo-analyzer` — Scores a website's AEO/GEO performance and returns prioritized recommendations.
- `social-listening-report` — Builds Voices That Matter, Campaign Echo, and Ask-Anything reports from LFX Lens social listening data.
- `community-monitor-agent` — Watches Slack channels and GitHub repos, ranks community questions, and delivers a live report with drafted replies.

**Additional**
- `marketing-agent-class` — Delivers the LF Claude Agent Workshop training as personalized slide decks with live student Q&A capture.
<!-- plugins:end -->

## 3. Add this marketplace in Cowork

1. Open **Customize** in the sidebar, then **Plugins**.
2. Click **Add marketplace** and enter this repo: `paulhinz/LF-Marketing-OS` (or the full URL, `https://github.com/paulhinz/LF-Marketing-OS`).
3. Click **Browse plugins** — the plugins above will be listed.
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

`.claude-plugin/marketplace.json` is the single source of truth for the plugin listing above. To add, remove, or recategorize a plugin:

1. Edit `.claude-plugin/marketplace.json`.
2. Run `python3 scripts/generate-readme.py` to regenerate the plugin section of this README (the block between the `plugins:start`/`plugins:end` markers).
3. Commit both files together.

CI runs `python3 scripts/generate-readme.py --check` on every push and pull request, and fails if the README block is stale, a plugin directory is missing from `marketplace.json`, or an entry points to a directory that doesn't exist.
