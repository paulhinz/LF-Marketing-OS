# lfx-mos-brand-positioning (plugin) · v0.5.0

Six skills, one per brand & positioning artifact.

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
- "Draft the messaging framework for Valkey."
- "Write boilerplates for OpenSSF from its approved framework."
- "Build the presentation template and one pager for Akrites."

## Changes
- **0.5.0** WCAG 2.2 AA: accessible working colours, logo recolouring on dark and light grounds, a rendered contrast check that corrects and reports, tagged PDFs and logo alt text. Fixes grey-on-grey logos when no reversed logo is supplied.
- **0.4.1** Renderers accept a folder of skill outputs (`scripts/assemble.js` combines the JSON files and logo SVGs) and name the skill to run when something is missing.
- **0.4.0** Text skills check hand edits (`revision.mode: "check"`); the one pager always renders from the authored message house and boilerplate.
- **0.3.0** Six standalone skills. Boilerplates and FAQ split out of the framework skill; the brand kit book, presentation template and one pager moved out of the artifact page into skill scripts (same output). Shared input contract and a `report` object on every drafting skill. Prototype-only skills (`kit-worker`, `kit-guide`) and approval wording in the rendered files removed.
- **0.2.0** `message-foundation` became `messaging-framework`, adding the framework (`mf`) and ICPs (`icp`).
