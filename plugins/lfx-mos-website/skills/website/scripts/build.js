#!/usr/bin/env node
/* Build and audit the project website, staged for review (no zip yet: the hosting choice comes next, see finalize.js).
   usage: node build.js <input.json | outputs folder | site.json> [out_dir] [--name "Project" --domain project.org] [--pretty] [--no-audit] [--zip]
   - input.json: the renderer input (project, content {mh, mf, icp, nums, bp, faq, kit}, logos), as in references/input.md
   - outputs folder: the brand-positioning skills' JSON outputs and logo SVGs (assembled like the other renderers)
   - site.json: a site.json from an earlier zip (after copy edits in edit.html), to rebuild and re-audit it
   Writes the staged site to out_dir/<slug>-website/ (open index.html to preview, edit.html to edit), <slug>-a11y-report.json,
   and with --zip also <slug>-website.zip (the old one-step export). Prints a JSON summary. */
const fs = require("fs"), path = require("path"), os = require("os");
const S = require("./sitegen");
const { loadInput, parseFlags, missingFor } = require("./assemble");
const { audit } = require("./audit");

const ENGINE = fs.readFileSync(path.join(__dirname, "sitegen.js"), "utf8"), EDITOR = fs.readFileSync(path.join(__dirname, "editor.js"), "utf8");
for (const [n, src] of [["sitegen.js", ENGINE], ["editor.js", EDITOR]]) if (/<\/script|<!--/i.test(src)) throw new Error(`${n} contains a sequence that would break its embedding in edit.html`);

function writeTree(root, files) {
  for (const [rel, body] of Object.entries(files)) { const p = path.join(root, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, body); }
}

(async () => {
  const argv = process.argv.slice(2), pretty = argv.includes("--pretty"), noAudit = argv.includes("--no-audit"), wantZip = argv.includes("--zip");
  const { opts, rest } = parseFlags(argv.filter(a => !["--pretty", "--no-audit", "--unzipped", "--zip"].includes(a))), [inp, out = "."] = rest;
  if (!inp) throw new Error('usage: node build.js <input.json | outputs folder | site.json> [out_dir] [--name "Project" --domain project.org] [--pretty] [--no-audit]');

  /* 1. site.json: generated from the skill outputs, or an edited one passed back in */
  let site, rebuilt = false;
  const asFile = fs.statSync(inp).isFile() ? JSON.parse(fs.readFileSync(inp, "utf8")) : null;
  if (asFile && S.isSite(asFile)) { site = asFile; rebuilt = true; if (pretty) site.meta.pretty = true; }
  else {
    const input = asFile || loadInput(inp, opts);
    if (asFile && (opts.name || opts.domain)) input.project = { ...input.project, ...(opts.name ? { name: opts.name } : {}), ...(opts.domain ? { domain: opts.domain } : {}) };
    const gaps = missingFor("website", input);
    if (gaps.length) throw new Error("Missing content: " + gaps.join(", "));
    site = S.fromContent(input, { pretty });
  }
  const slug = S.slug(site.project.short || site.project.name) + "-website";

  /* 2. render once and audit the real files in headless Chrome */
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "lfx-site-")), root = path.join(tmp, slug);
  let files = S.files(site, { engine: ENGINE, editor: EDITOR });
  writeTree(root, files);
  let a = { ran: false, note: "audit skipped (--no-audit)" };
  if (!noAudit) a = await audit(root, Object.keys(files).filter(f => /(^|\/)index\.html$/.test(f)).concat(["edit.html"]));   // every page, including post and event pages

  /* 3. record the audit in site.json / ACCESSIBILITY.md and package */
  site.meta.audit = a.ran ? { at: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC", tool: a.tool, viewports: a.viewports, pages: S.PAGES.length, states: a.states,
    violations: a.violations.reduce((s, v) => s + v.where.reduce((t, w) => t + w.count, 0), 0), incomplete: a.incomplete.length, textChecked: a.textChecked, contrastFails: a.contrastFails.length, reflow: a.reflow.length, passed: a.passed, edited: false } : null;
  if (site.meta.audit) site.meta.audit.pages = Object.keys(files).filter(f => /(^|\/)index\.html$/.test(f)).length;
  if (rebuilt) site.meta.edited_at = site.meta.edited_at || null;
  files = S.files(site, { engine: ENGINE, editor: EDITOR });
  fs.mkdirSync(out, { recursive: true });
  const zipPath = path.join(out, slug + ".zip"), reportPath = path.join(out, slug.replace(/-website$/, "") + "-a11y-report.json");
  if (wantZip) fs.writeFileSync(zipPath, S.zip(files, slug + "/"));
  fs.writeFileSync(reportPath, JSON.stringify(a, null, 1));
  const staged = path.join(out, slug); fs.rmSync(staged, { recursive: true, force: true }); writeTree(staged, files);
  fs.rmSync(tmp, { recursive: true, force: true });

  const T = S.tokens(site.brand), ck = S.check(site);
  console.log(JSON.stringify({
    staged, preview: path.join(staged, "index.html"), editor: path.join(staged, "edit.html"), zip: wantZip ? zipPath : null, report: reportPath,
    next: "Ask where the site should live, then run: node finalize.js " + staged + " <out_dir> --hosting managed|lf-github|export|wordpress", files: Object.keys(files).length, source: rebuilt ? "site.json (rebuilt)" : "skill outputs", from: site.meta.from,
    logos: !!site.brand.logo_light, colours: T.notes, colourPairsFailing: T.pairs.filter(p => !p.pass).map(p => p.what),
    a11y: a.ran ? { passed: a.passed, violations: a.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, where: v.where.map(w => `${w.page} @${w.viewport} (${w.state}) ×${w.count}`) })),
      contrastFails: a.contrastFails.slice(0, 20), reflow: a.reflow, textChecked: a.textChecked, incomplete: a.incomplete.map(v => v.id) } : { ran: false, note: a.note },
    beforeLaunch: { placeholders: ck.placeholders.length, avoidList: ck.avoid, seo: ck.seo, links: ck.links },
  }, null, 1));
})().catch(e => { console.error("ERROR: " + e.message); process.exit(1); });
