# Developer handoff

Author: Craig Ross <ccr@linuxfoundation.org>

The `website` skill is stateless like the brand-positioning skills: an input object in, a zip and a JSON report out. It holds no workflow (queue, review, sign-off, storage, publishing). Those belong to the host app.

## The contract
- **Input:** `skills/website/references/input.md`, the same renderer input as `lfx-mos-brand-positioning` (or a folder of those skills' outputs, or a `site.json` from an earlier zip).
- **Run:** `node scripts/build.js <input> <out_dir> [--name --domain] [--pretty] [--no-audit] [--zip]` stages and audits the site; then `node scripts/finalize.js <staged folder> <out_dir> --hosting managed|lf-github|export|wordpress [--requester]` packages it for the chosen option (`references/hosting.md`). Node 18+. `npm install` in `scripts/` installs the optional `puppeteer` and `axe-core` for the audit.
- **Output:** the staged folder `<slug>-website/`, `<slug>-a11y-report.json`, and a JSON summary on stdout (`a11y.passed`, `violations`, `contrastFails`, `reflow`, `colours`, `beforeLaunch`).

## Files
| File | Role |
|---|---|
| `scripts/sitegen.js` | The engine. Runs in Node and the browser. `fromContent` (input → site.json), `tokens` (WCAG colour tokens), `page`, `files`, `check`, `zip` (stored zip, no dependencies), `FIELDS` (editor form), `editorHtml`. |
| `scripts/editor.js` | Browser-only editor logic, styled by `EDITOR_CSS` in `sitegen.js` with the Marketing OS tokens. `edit.html` embeds `site.json`, `sitegen.js` and `editor.js` as script blocks, so it can rebuild and re-zip itself offline. |
| `scripts/audit.js` | Headless Chrome audit: axe-core (wcag2a … wcag22aa) per page and `edit.html` at 1280×900 and 320×800, again with the menus open; rendered text contrast; 320 px reflow. Report-only. |
| `scripts/assemble.js` | Folder of skill outputs → one input (copied from brand-positioning; `NEEDS.website`). |
| `scripts/build.js` | Orchestrates: load → site.json → files → audit → record audit in `site.json`/`ACCESSIBILITY.md` → staged folder. |
| `scripts/agent-check.js` | Agent-readiness check modelled on isitagentready.com's content profile: a live URL, or `--local <folder>` (GitHub Pages emulation, then behind `agent-edge/worker.js`). |
| `scripts/finalize.js` | Records `launch.hosting` and writes the package for the option: site.json + locked editor + launch request (managed, lf-github), zip with GitHub Pages workflow (export), zip + Asana request JSON for Web Requests (wordpress). Refuses an unaudited site. |

`sitegen.js` and `editor.js` must never contain `</script` or `<!--`: they are embedded in a script tag. `build.js` refuses to run if they do.

## Marketing OS screens
Build the host UI from `skills/website/references/ui-flow.md`: the Marketing OS shell, a sticky five-step bar with live statuses (all steps clickable), one step at a time at full width, and a fixed action bar (Back, next-step message, primary button). The gates are the skill's: no hosting option until `a11y.passed`, no packaging until an option is chosen, and a confirmation before the publish request, zip or Asana task. Map the step-bar statuses from the build JSON (`a11y.passed`, `beforeLaunch.placeholders`) and `site.json` (`launch.hosting`). The prototype artifact is the reference for the experience; its layout and copy are a spec, its simulated publish steps are not.

## Accessibility (WCAG 2.2 AA)
- **Colour** (1.4.3, 1.4.11): `tokens()` derives every colour the stylesheet uses from `kit.dark`, `kit.accent`, `kit.spark`, keeping a brand colour wherever it passes and otherwise shifting it toward black or white until it does. 17 pairs are checked and listed in `ACCESSIBILITY.md`. Because colours aren't editable in `edit.html`, copy edits can't break contrast. Logo parts under 3:1 against their ground are recoloured.
- **Structure:** skip link, landmarks, breadcrumb nav, one h1 and ordered headings, lists for grids, `lang`, unique titles.
- **Keyboard** (2.1.1, 2.4.7, 1.4.13): disclosure-button menus (`aria-expanded`), Escape closes and returns focus, 3 px focus ring, no hover-only content; without JS the menus are fully shown.
- **2.2 additions:** targets ≥ 24 px (2.5.8); no drag or cognitive tests.
- **Forms:** visible labels, 3:1 field borders, native required errors, a `role=status` message.
- **Reflow** (1.4.10): no horizontal scroll at 320 px; long words wrap in cards.
- Tested against five Kit projects (AAIF, Akrites, OpenGrid, OSAIA, x402) and synthetic worst-case palettes; all pass with zero violations.

Automated checks don't cover everything. The zip's `ACCESSIBILITY.md` lists what stays with people: alt text for added images, captions, plain-language review, a manual screen-reader pass on the hosted site.

## Host responsibilities (not in the skill)
- **Staleness:** when the messaging framework, boilerplates, FAQ or brand kit change, mark the website as needing a rebuild. A rebuild from the skill outputs drops copy edits made in an old zip; a rebuild from that zip's `site.json` keeps them but won't pick up new framework copy.
- **Sign-off and versions**, as for the other artifacts.
- **Form endpoint:** the sign-up posts `email`, `consent`, `interest` (project slug) and `source`; set `signup.endpoint`.
- **Required LF scripts (fixed, in `sitegen.js` as `LF_TRANSCEND`, `LF_COOKIE_SETTINGS`, `LF_SEGMENT`):** Transcend `airgap.js` is the first element in every page's `<head>`; the cookie-settings click handler, LFX Segment, ZoomInfo (`LF_ZOOMINFO`, loads `js.zi-scripts.com/zi-tag.js`) and HubSpot (`LF_HUBSPOT`, portal 8112310) close every `<body>`. A footer "Cookie settings" link reopens Transcend's consent manager. Change them only in the engine, never per site. The editor preview omits them so it stays offline. Transcend's banner is LF's shared component: the audit covers it only when its CDN loads during the build.

## WordPress on Pantheon (next)
Out of scope for 0.1 pending LF IT, Pantheon and the product team. `site.json` keeps every field per page, so the path is a mapping from `site.json` to blocks or a WXR import. The Kit mockup's earlier `wordpressFiles()` (GeneratePress child theme, block patterns, `import.xml`) is a starting reference, not a spec; it wasn't ported because hosting, theme and SEO plugin choices are still open.
