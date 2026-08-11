# Website Designer Agent

LFX Marketing OS — Creative Services · Agent No. 9 · 9-Agent category 1: Foundation Setup

Turns a Linux Foundation project's three foundation documents (Brand Kit, Message Foundation, ICP & Target Markets) into a complete, deployable project website: an ED-approved sitemap, a fully populated Hugo site with an LF compliance and AEO pass, a GitHub repository with a build-and-deploy workflow, and a DNS handoff note for go-live.

## Components

| Component | Count | Purpose |
|-----------|-------|---------|
| Skills | 1 | `design-lf-project-website` — the full gated build workflow |
| Agents | 0 | Not needed |
| Hooks | 0 | Not needed |
| MCP | 0 | Uses Cowork's built-in file, shell, and web tools |

## Usage

Say **"Build website for [project]"** (or "run the Website Designer Agent", "create a website for my LF project"). The agent then:

1. **Step 0** — collects domain, GitHub org, assets, new-vs-redesign
2. **Step 1** — reads the three foundation docs (routes you to the Brand Kit / Message Foundation / ICP agents if any are missing — it never writes positioning from scratch)
3. **Step 2** — drafts a sitemap from the docs, asks at most 5 gap questions → **Gate 1: you approve the sitemap**
4. **Step 3** — scaffolds the Hugo site, presents 2–3 Brand Kit–driven visual directions → **Gate 2: you pick one**
5. **Step 4** — populates all content, runs the compliance/AEO checklist, verifies a clean Hugo build → **Gate 3: you approve the full preview**
6. **Step 5** — pushes to GitHub with a staged deploy workflow and writes the DNS handoff note → **Gate 4: you and LF IT point DNS to go live**

Safety: max 3 revision cycles per gate before escalating to the Foundation Marketing Lead; nothing goes live autonomously; everything is git-revertible.

## Setup

- Works best with the project's foundation docs in the connected project folder.
- Hugo builds run in the Cowork sandbox (the skill installs Hugo if needed).
- GitHub push uses your git credentials or a GitHub connector; without either, the agent prepares the repo locally and gives you the exact push commands.

## Related

Upstream: Brand Kit Agent, Message Foundation Agent, ICP & Target Markets Agent. Post-launch: AEO/GEO Analyzer.
