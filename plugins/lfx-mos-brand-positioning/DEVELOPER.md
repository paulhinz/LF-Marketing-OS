# Developer handoff

The skills generate content and files only. Everything you see in the prototype artifact around them (sign-offs, run status, version numbers, the activity trail, the Feeds and Live proof points panels, visibility, the knowledge-base sender, the committee and approver views) is prototype UI and is **not** in the skills. The list under "Host responsibilities" is what the prototype did, for reference if you want to rebuild it.

## The contract
- **Drafting skills** (`messaging-framework`, `boilerplates`, `faq`, `brand-kit` Part 1) take the input object in `skills/messaging-framework/references/input.md` and return JSON in each skill's `references/output-schema.md`, plus a `report` (sources read, sources that failed, gaps, notes). Show `sources_failed` and `gaps` to the reviewer; don't store `report` as content.
- **Renderers** (`presentation-template`, `one-pager`, `brand-kit` Part 2) take the object in `references/render-input.md` and write files with `node scripts/<build>.js <input.json> <out_dir>`, printing a JSON summary. Node 18+. `npm install` in each `scripts/` folder. PDFs need headless Chrome (puppeteer); without it the HTML is still produced and prints to the same PDF.

## Skills run only when asked
The skills don't call each other. Claude picks skills from the request, and it will run a skill whose output another one needs: asking for the brand kit runs the messaging framework and boilerplates first, because the brand kit book needs `mh` and `bp`; the FAQ, one pager and presentation template don't run unless asked. To get all six, ask for the full kit ("Build the full brand and positioning kit for <project>"), or have the host call all six in the order below.

## Combining outputs for the renderers
Each renderer accepts either one input file or a folder of the drafting skills' JSON outputs and logo SVGs:
```
node scripts/build.js ./outputs <out_dir> --name "Project" --domain project.org
node scripts/assemble.js ./outputs --name "Project" --domain project.org -o input.json   # just combine, and list what's missing
```

## Order and dependencies
```
messaging-framework ──► boilerplates ─┐
        │            └► faq ──────────┤
        └──────────────► brand-kit ───┴─► presentation-template
                                       └─► one-pager
```
Gate (default on): brand kit, template and one pager wait until the messaging framework is **approved**. With the gate off, a draft is enough.

## The intake form maps to `sources`
| Form field | Input field |
|---|---|
| Project name, website, one-line description | `project.name`, `project.domain`, `project.description` |
| Uploaded files, each tagged press release / deck / document / integrated marketing plan / logo package | `sources.files[]` with `kind` `press` / `deck` / `doc` / `plan` / `logo` and `url`, `text` or `asset` |
| Other links (Drive, PDFs) | `sources.links[]` |
| Audience, goals, words to avoid | `sources.notes` |
| Logo package (ZIP or SVG) | renderer `logos.light` / `logos.dark` as SVG text; the prototype picks them by file name (`pickLogos` in the artifact) |
| "What should change?" on regenerate | `revision.notes`, with `revision.previous` = current content |

Minimum to start: a press release, website or link. Logo files are needed for the brand kit.

## Host responsibilities (not in the skills; reference from the prototype)
- **Run states** per artifact: `none → queued → drafting → review → pending → approved`; `v` increments on each new draft, `av` records the last approved version.
- **Sign-off**: the marketing lead sends for sign-off; the executive director and TOC chair both approve; either can request changes (sends it back to `review` with a note). `mf`, `icp` and `mh` share one sign-off.
- **Checks to show before sign-off**: brand line = tagline; every goal has a segment; every ICP goal exists; no avoid-list phrase in the message house, boilerplates or FAQ; each boilerplate within its word limit; unanswered FAQ questions flagged.
- **Editing**: the editor is host UI: it edits the stored JSON directly and saves it. No skill is called to type the edit. After saving, call the same skill with `revision.mode: "check"` and the edited version in `revision.previous`; it returns the content with only mechanical fixes (for the framework, the brand line follows the tagline) and lists anything to fix in `report.notes`. To have the AI make a change instead, call it with `revision.mode: "redraft"` and the request in `revision.notes`. In the prototype, editing a draft that was out for sign-off pulled it back to review and cleared sign-offs.
- **Data from a frozen store**: if your data layer returns frozen or read-only objects, deep-copy them before editing. The prototype hit this: edits and status changes silently failed until it copied the data on load.
- **One pager**: not editable on its own. It always renders from the message house and the 50-word boilerplate, so people edit those and the one pager is rebuilt.
- **Staleness**: when the framework changes, mark boilerplates, FAQ, template, one pager and website as needing a rebuild.
- **Markdown export** for the knowledge base, with front matter: project, project_id, collection, output, skill, skill_version, status, generated_at, reviewer, sources.

## Accessibility (WCAG 2.2 AA)
All rendered output (brand kit book, one pager, presentation template and its preview) is built to pass WCAG 2.2 AA text contrast and logo contrast. `scripts/a11y.js` derives accessible working colours from the brand kit (brand colours kept where they pass), recolours logo parts that would disappear on their ground, and `scripts/render.js` checks every rendered page with headless Chrome, corrects any remaining failure and reports it under `a11y` in each script's JSON output. Install puppeteer (the scripts' optional dependency) on the host so the check and the PDFs run; without it the colour fixes still apply. Show `a11y.stillFailing` (expected empty) and the `colours` substitutions to the reviewer.

## What not to port from the prototype
The page's own UI (layout, colors, tabs, editors) is a reference for the experience, not a spec. The deliverables' formatting is fully in the renderer scripts.
