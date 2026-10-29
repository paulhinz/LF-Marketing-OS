#!/usr/bin/env node
/* Package a staged, audited site for the hosting option the person chose.
   usage: node finalize.js <staged folder | site.json> <out_dir> --hosting managed|lf-github|export|wordpress [--requester "Name <email>"]
   - managed:   Maintain in Marketing OS. Writes <slug>-site.json, <slug>-edit.html (locked to existing fields) and <slug>-launch-request.json for the publish skill.
   - lf-github: Publish on LF GitHub. Writes <slug>-site.json, <slug>-posts-events-editor.html (posts and events only; the site is edited in the repo) and <slug>-launch-request.json.
   - export:    Export for a separate GitHub. Writes <slug>-website.zip with .nojekyll and a GitHub Pages workflow.
   - wordpress: Host on WordPress. Writes <slug>-website.zip + <slug>-wordpress-request.json (the Asana task to file in Web Requests).
   Pages are rendered from the same site.json the audit checked; only edit.html, README, site.json and export extras differ by option. */
const fs = require("fs"), path = require("path");
const S = require("./sitegen");
const ENGINE = fs.readFileSync(path.join(__dirname, "sitegen.js"), "utf8"), EDITOR = fs.readFileSync(path.join(__dirname, "editor.js"), "utf8");
/* Web Team · Web Requests (Asana): where WordPress builds are requested */
const ASANA = { project: "1201187889631310", section: "1201189954257700", fields: { webRequest: { field: "1201723942461930", brandNewWebsite: "1201723942474526" }, priority: { field: "515793781831855", medium: "515793781831857" } } };

function arg(name) { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : null; }
(async () => {
  const [inp, out = "."] = process.argv.slice(2).filter((a, i, all) => !a.startsWith("--") && !(all[i - 1] || "").startsWith("--"));
  const hosting = arg("--hosting"), requester = arg("--requester") || "Craig Ross <ccr@linuxfoundation.org>";
  if (!inp || !S.HOSTING[hosting]) throw new Error("usage: node finalize.js <staged folder | site.json> <out_dir> --hosting " + Object.keys(S.HOSTING).join("|"));
  const sitePath = fs.statSync(inp).isDirectory() ? path.join(inp, "site.json") : inp;
  const site = JSON.parse(fs.readFileSync(sitePath, "utf8"));
  if (!S.isSite(site)) throw new Error(sitePath + " is not a site.json from the website skill");
  const A = site.meta && site.meta.audit;
  if (!A || !A.passed) throw new Error("The site hasn't passed its WCAG audit (meta.audit). Rebuild with build.js and fix any failures before choosing where it lives.");
  site.launch = Object.assign({}, site.launch || {}, { hosting, chosen_at: new Date().toISOString() });
  const slug = S.slug(site.project.short || site.project.name), name = slug + "-website";
  const files = S.files(site, { engine: ENGINE, editor: EDITOR });
  fs.mkdirSync(out, { recursive: true });
  const outFiles = [], wr = (f, body) => { const p = path.join(out, f); fs.writeFileSync(p, body); outFiles.push(p); return p; };
  const ck = S.check(site), audit = { passed: A.passed, at: A.at, violations: A.violations, textChecked: A.textChecked };
  const summary = { project: site.project.name, domain: site.project.domain, pages: S.PAGES.length, placeholders: ck.placeholders.length, audit };

  if (hosting === "export" || hosting === "wordpress") wr(name + ".zip", S.zip(files, name + "/"));
  if (hosting === "managed" || hosting === "lf-github") {
    wr(slug + "-site.json", files["site.json"]);
    wr(slug + (hosting === "lf-github" ? "-posts-events-editor.html" : "-edit.html"), files["edit.html"]);   // managed: fields + posts/events; lf-github: posts and events only
    wr(slug + "-launch-request.json", JSON.stringify({ kind: "lfx-mos-website/launch-request", version: S.VERSION, hosting, hostingLabel: S.HOSTING[hosting].label,
      requested_at: site.launch.chosen_at, requester, ...summary, repo: name, editing: hosting === "managed" ? "Marketing OS editor: existing fields, plus new posts and events" : "in the repo only; posts and events can also come from the Marketing OS editor as a content update (<slug>-posts-events.json) merged by pull request",
      site_json: slug + "-site.json", next: "Run the publish skill with this request and site.json (approval by the Web team or Project Formation team first)." }, null, 2));
  }
  if (hosting === "wordpress") {
    const list = S.PAGES.map(p => "- " + p.title + " (" + p.path + ")").join("\n");
    const notes = `Brand New Website request from the Marketing OS website skill.

Project: ${site.project.name}
Domain: ${site.project.domain || "to be decided"}
Requested by: ${requester || "(requester)"}

The site is built and passes WCAG 2.2 AA (audited ${A.at}). Please build it in WordPress from the attached package:
- ${name}.zip: the static site (11 pages), its stylesheet, logos and edit.html
- site.json inside the zip: every field per page, the brand tokens and the launch details

Pages:
${list}

Required on every page: Transcend first in the head; cookie-settings handler, LFX Segment, ZoomInfo and HubSpot at the end of the body (see README.md and ACCESSIBILITY.md in the package).
Agent readiness (isitagentready.com, content profile, target 86%): keep Cloudflare's Markdown for Agents on and send a Link header with rel="alternate" on the homepage, as akrites.org does; the package's index.md files and agent-edge/README.md show what's expected.
Placeholders still to fill: ${ck.placeholders.length}.`;
    wr(slug + "-wordpress-request.json", JSON.stringify({ kind: "lfx-mos-website/asana-request", asana: { project: ASANA.project, section: ASANA.section,
      name: `New website: ${site.project.name} (WordPress build from Marketing OS)`, notes,
      custom_fields: { [ASANA.fields.webRequest.field]: ASANA.fields.webRequest.brandNewWebsite, [ASANA.fields.priority.field]: ASANA.fields.priority.medium } },
      attach: name + ".zip", ...summary }, null, 2));
  }
  console.log(JSON.stringify({ hosting, label: S.HOSTING[hosting].label, files: outFiles, ...summary }, null, 1));
})().catch(e => { console.error("ERROR: " + e.message); process.exit(1); });
