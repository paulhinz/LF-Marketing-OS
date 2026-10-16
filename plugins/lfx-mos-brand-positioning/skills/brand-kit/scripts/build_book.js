#!/usr/bin/env node
/* Build the 16-page brand kit book.
   usage: node build_book.js <input.json | outputs folder> [out_dir] [--name "Project" --domain project.org]
   writes <Name>_Brand_Kit.html (letter landscape, print-ready) and, when puppeteer is installed, <Name>_Brand_Kit.pdf. */
const fs = require("fs"), path = require("path");
const { loadInput, parseFlags, missingFor } = require("./assemble");
const { toProject } = require("./shim");
const { kitHtmlDoc, KIT_SECTIONS } = require("./book");
const { renderChecked } = require("./render");

(async () => {
  const { opts, rest } = parseFlags(process.argv.slice(2)), [inp, out = "."] = rest;
  if (!inp) throw new Error("usage: node build_book.js <input.json | outputs folder> [out_dir] [--name \"Project\" --domain project.org]");
  const input = loadInput(inp, opts), gaps = missingFor("brand-kit", input);
  if (gaps.length) throw new Error("Missing content: " + gaps.join(", "));
  const p = toProject(input);
  const missing = ["kit", "mh", "bp"].filter(k => !p.content[k]);
  if (missing.length) throw new Error("Input is missing content: " + missing.join(", "));
  const name = p.name.replace(/\s*\(.*\)/, "").replace(/[^A-Za-z0-9]+/g, "_") + "_Brand_Kit";
  const html = kitHtmlDoc(p);
  fs.mkdirSync(out, { recursive: true });
  const htmlFile = path.join(out, name + ".html"), pdfPath = path.join(out, name + ".pdf");
  const r = await renderChecked(html, { path: pdfPath, width: "11in", height: "8.5in", viewport: [1200, 900] });
  fs.writeFileSync(htmlFile, r.html);
  const pdfFile = r.pdf, note = r.a11y.note || "";
  console.log(JSON.stringify({ html: htmlFile, pdf: pdfFile, pages: KIT_SECTIONS.length, logos: !!p.logos, colours: p.content.kit.a11yNotes, a11y: r.a11y, note }, null, 1));
})().catch(e => { console.error("ERROR: " + e.message); process.exit(1); });
