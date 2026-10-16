#!/usr/bin/env node
/* Build the one pager.
   usage: node build.js <input.json | outputs folder> [out_dir] [--name "Project" --domain project.org]
   writes <Name>_One_Pager.html (letter, print-ready) and, when puppeteer is installed, <Name>_One_Pager.pdf. */
const fs = require("fs"), path = require("path");
const { loadInput, parseFlags, missingFor } = require("./assemble");
const { toProject, contentFor } = require("./shim");
const { opHtml } = require("./sheet");
const { renderChecked } = require("./render");

(async () => {
  const { opts, rest } = parseFlags(process.argv.slice(2)), [inp, out = "."] = rest;
  if (!inp) throw new Error("usage: node build.js <input.json | outputs folder> [out_dir] [--name \"Project\" --domain project.org]");
  const input = loadInput(inp, opts), gaps = missingFor("one-pager", input);
  if (gaps.length) throw new Error("Missing content: " + gaps.join(", "));
  const p = toProject(input);
  const missing = ["mh", "bp", "kit"].filter(k => !p.content[k]);
  if (missing.length) throw new Error("Input is missing content: " + missing.join(", "));
  const k = contentFor(p, "kit"), body = opHtml(p);
  const sheet = body.slice(body.indexOf('<div class="sheet"'), body.lastIndexOf("</div></div>"));
  const name = p.name.replace(/\s*\(.*\)/, "").replace(/[^A-Za-z0-9]+/g, "_") + "_One_Pager";
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${p.name} one pager</title><meta name="viewport" content="width=816">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(k.font).replace(/%20/g, "+")}:wght@300;400;500;600;700&display=swap">
<style>@page{size:8.5in 11in;margin:0}html,body{margin:0}body{background:#E9EDF2}.sheet{position:relative!important;width:816px;height:1056px;overflow:hidden;margin:24px auto;background:#fff;color:#1F2937;font-size:14px;line-height:1.5;transform:none!important}
@media print{body{background:none}.sheet{margin:0}}</style></head><body>${sheet.replace(' id="sheet"', "")}</body></html>`;
  fs.mkdirSync(out, { recursive: true });
  const htmlFile = path.join(out, name + ".html"), pdfPath = path.join(out, name + ".pdf");
  const r = await renderChecked(html, { path: pdfPath, width: "8.5in", height: "11in", viewport: [900, 1150] });
  fs.writeFileSync(htmlFile, r.html);
  const pdfFile = r.pdf, note = r.a11y.note || "";
  console.log(JSON.stringify({ html: htmlFile, pdf: pdfFile, logos: !!p.logos, colours: p.content.kit.a11yNotes, a11y: r.a11y, note }, null, 1));
})().catch(e => { console.error("ERROR: " + e.message); process.exit(1); });
