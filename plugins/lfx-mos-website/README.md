# lfx-mos-website (plugin) · v0.5.0

Author: Craig Ross <ccr@linuxfoundation.org>

One skill that turns a project's brand and positioning work into a website, used beside `lfx-mos-brand-positioning`.

| Skill | Kind | Reads | Returns |
|---|---|---|---|
| `website` | Renders | `mh`, `bp`, `kit` (required); `mf`, `nums`, `faq`, `icp`; logo SVGs | A staged, audited site, then the package for the chosen hosting option |

**Where it lives.** After the build and audit, the person chooses: (1) Maintain in Marketing OS, (2) Publish on LF GitHub, (3) Export for a separate GitHub, or (4) Host on WordPress. 1 and 2 hand a launch request to the publish skill; 3 is a zip with a GitHub Pages workflow; 4 files an Asana request in the Web Team's Web Requests project. See `skills/website/references/hosting.md`.

**The site package** holds 11 pages (Home, About, Governing Board, Technical Committee, Members, Contact, Events, News, Get involved, Join, Campaign), `assets/site.css` and `site.js`, the real logos, `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, JSON-LD in every page, `site.json`, `ACCESSIBILITY.md`, a README, and **`edit.html`**: an offline copy editor with a live preview that downloads a new zip.

**Agent-ready.** Every page ships a Markdown twin, robots.txt carries Content Signals, and `agent-edge/worker.js` adds Link headers and Markdown negotiation in front of GitHub Pages: 6 of 7 (86%) on isitagentready.com's content profile, the same as akrites.org. See `skills/website/references/agent-ready.md`.

**Posts and events.** Blog posts and events with a rich-text body (headings, lists, links, quotes, images with alt text, inline code and code blocks) get their own pages. In Marketing OS hosting they're added in the editor; for LF GitHub, a posts and events editor sends them to the repo as a pull request.

**Required LF scripts.** Every page carries LF's fixed, pre-approved scripts, never editable: the Transcend consent manager as the first element in `<head>`, then at the end of `<body>` the cookie-settings handler (a footer "Cookie settings" link reopens Transcend), LFX Segment, ZoomInfo and HubSpot. Transcend's banner replaces the site's own cookie bar.

**Marketing OS screens.** `skills/website/references/ui-flow.md` describes the five steps as they appear in Marketing OS, matching the Website Skill Prototype.

**Accessibility.** Built to WCAG 2.2 AA. Colours come from the brand kit through accessible working tokens (brand colours kept where they pass); each build is audited in headless Chrome with axe-core and a rendered contrast check at 1280 and 320 px, menus open and closed. See `DEVELOPER.md`.

**Publishing.** Options 1 and 2 need the `publish` skill (domain, LF GitHub repo, Pages, DNS through the LF infrastructure API), which is specified but not yet built; until then they produce a launch request that waits for it. `site.json` is also the hand-off format for the WordPress build.

## Ask Claude
- "Build the website for Akrites from its messaging framework and brand kit."
- "Make the OpenGrid website from the outputs in this folder, then export it for their GitHub."
- "Build the x402 site and request a WordPress build from the web team."
- "Here's the edited site.json for x402: rebuild it, re-check WCAG and export it again."

## Changes
- **0.5.0** Marketing OS look and flow. The editor uses the Marketing OS (LFX Insights) tokens: Roboto Slab headings, Inter body, Roboto Mono labels, LFX blue, pill buttons, light panels with shadows, 3:1 field borders. New `skills/website/references/ui-flow.md` specifies the five-step screens (step bar with live statuses, fixed action bar, gates and confirmations, hand-off per option) from the reviewed prototype. Author: Craig Ross.
- **0.4.0** Agent-ready: Markdown twin of every page, Content-Signal in robots.txt, `alternate` link in every head, `_headers`, and the `agent-edge` Cloudflare Worker; `scripts/agent-check.js` (57% on GitHub Pages alone, 86% behind the Worker). Blog posts and events with their own pages and a rich-text editor (images with required alt text, inline code, code blocks). Managed mode allows adding posts and events; LF GitHub mode is edited in the repo, with a posts and events editor that saves a content update. Author: Craig Ross.
- **0.3.0** Hosting choice after the build: `build.js` now stages the audited site (no zip; `--zip` keeps the old one-step export) and `finalize.js --hosting managed|lf-github|export|wordpress` packages it. Managed mode locks the editor to existing fields. Export adds `.nojekyll` and a GitHub Pages workflow. WordPress writes the Asana request for Web Requests. ZoomInfo and HubSpot added to the required scripts.
- **0.2.0** LF's required scripts on every page: Transcend first in the head; cookie-settings handler and LFX Segment at the end of the body; "Cookie settings" link in the footer. The built-in cookie bar is removed in favour of Transcend's. The editor preview leaves the scripts out so it stays offline; every exported page has them. Audit fix: text on its own opaque background (the skip link) is measured against that background.
- **0.1.0** First release. Engine ported from the Marketing OS Kit website mockup (same pages, LF consent sign-up, cookie choice, JSON-LD, llms.txt) and reworked for WCAG 2.2 AA: accessible tokens, disclosure menus, in-flow cookie bar, visible labels, 24 px targets, 320 px reflow. Adds the offline editor, the axe-core audit and folder/site.json inputs. GitHub Pages and WordPress packages from the mockup are not included.
