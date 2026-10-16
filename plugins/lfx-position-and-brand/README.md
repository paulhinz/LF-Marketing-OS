# lfx-positioning-and-brand (plugin) · v0.4.0

Six skills, one per artifact.

| # | Skill | Kind | Reads | Returns |
|---|---|---|---|---|
| 1 | `messaging-framework` | Drafts | sources | `mf`, `icp`, `mh`, `nums` (JSON) |
| 2 | `boilerplates` | Drafts | sources + framework | `bp` (JSON) |
| 3 | `faq` | Drafts | sources + framework | `faq` (JSON) |
| 4 | `brand-kit` | Drafts + renders | logos, site, framework | `kit` (JSON) + 16-page book (HTML, PDF) |
| 5 | `presentation-template` | Renders | mh, mf, icp, nums, bp, faq, kit, logos | .pptx + slide preview (HTML) |
| 6 | `one-pager` | Renders | mh, bp, kit, logos | letter page (HTML, PDF) |

All six are stateless: an input object in, JSON or files out. They hold no workflow: no queue, storage, review, sign-off, version history, activity trail, feeds, visibility or live LFX data. Those belong to the host app. See `DEVELOPER.md`.

## Ask Claude
Option 1. Build the full brand and positioning kit for [Project name] ([domain]), using all six skills in the `lfx-position-and-brand` plugin, in this order: messaging-framework, boilerplates, faq, brand-kit, one-pager, presentation-template. Sources: [website], [press release link or attached file], [deck or integrated marketing plan, if any]. Logo files: [attached SVGs or zip]. Notes: [audience, words to avoid]. Save each skill's JSON output and every file it produces to one folder, then list what was created, which sources couldn't be read and which gaps need an answer from the team.

Option 2. One skill at a time, in this order
1. Messaging framework - Draft the messaging framework for [Project] ([domain]) from [sources]. Save the output as messaging-framework.json.
2. Boilerplates - Write the boilerplates for [Project] from the messaging framework and sources. Save as boilerplates.json.
3. FAQ - Write the FAQ for [Project] from the sources and the messaging framework. Save as faq.json.
4. Brand kit - Draft the brand kit for [Project] from the attached logo files and [domain]/brand, save as brand-kit.json, then build the brand kit book (HTML and PDF).
5. One pager - Build the one pager for [Project] from the outputs folder.
6. Presentation template - Build the presentation template for [Project] from the outputs folder.

## Changes
- **0.4.0** Text skills check hand edits (`revision.mode: "check"`); the one pager always renders from the authored message house and boilerplate.
- **0.3.0** Six standalone skills. Boilerplates and FAQ split out of the framework skill; the brand kit book, presentation template and one pager moved out of the artifact page into skill scripts (same output). Shared input contract and a `report` object on every drafting skill. Prototype-only skills (`kit-worker`, `kit-guide`) and approval wording in the rendered files removed.
- **0.2.0** `message-foundation` became `messaging-framework`, adding the framework (`mf`) and ICPs (`icp`).
