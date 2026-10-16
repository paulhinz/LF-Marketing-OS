#!/usr/bin/env node
/* Build the presentation template.
   usage: node build.js <input.json | outputs folder> [out_dir] [--name "Project" --domain project.org]
   writes <Name>_Presentation_Template.pptx and <Name>_slides_preview.html, prints a JSON summary. */
const fs = require("fs"), path = require("path");
const PptxGenJS = require("pptxgenjs");
const { Resvg } = require("@resvg/resvg-js");
const { loadInput, parseFlags, missingFor } = require("./assemble");
const { toProject, fixLogo } = require("./shim");
const { renderChecked } = require("./render");
const { pptxDeck, deckName, ptSlides } = require("./deck");

function svgToPng(svg, h) {
  const r = new Resvg(svg, { fitTo: { mode: "height", value: h } }).render();
  return { data: "data:image/png;base64," + Buffer.from(r.asPng()).toString("base64"), ratio: r.width / r.height };
}
(async () => {
  const { opts, rest } = parseFlags(process.argv.slice(2)), [inp, out = "."] = rest;
  if (!inp) throw new Error("usage: node build.js <input.json | outputs folder> [out_dir] [--name \"Project\" --domain project.org]");
  const input = loadInput(inp, opts), gaps = missingFor("presentation-template", input);
  if (gaps.length) throw new Error("Missing content: " + gaps.join(", "));
  const p = toProject(input);
  const missing = ["mh", "bp", "faq", "kit"].filter(k => !p.content[k]);
  if (missing.length) throw new Error("Input is missing content: " + missing.join(", "));
  if (p.logos) { const a = svgToPng(fixLogo(p.logos.light, "#FFFFFF"), 240), b = svgToPng(fixLogo(p.logos.dark || p.logos.light, p.content.kit.dark), 240); p._png = { light: a.data, dark: b.data, ratio: a.ratio }; } else p._png = null;
  fs.mkdirSync(out, { recursive: true });
  const file = path.join(out, deckName(p) + ".pptx");
  await pptxDeck(new PptxGenJS(), p).writeFile({ fileName: file });
  const slides = ptSlides(p), k = p.content.kit;
  const preview = path.join(out, deckName(p) + "_slides_preview.html");
  const previewHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${p.name} presentation template</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(k.font).replace(/%20/g, "+")}:wght@300;400;500;600;700&family=Inter:wght@400;600&display=swap">
<style>body{margin:0;padding:24px;background:#E9EDF2;font:13px Inter,sans-serif}figure{margin:0 0 24px}figcaption{margin:6px 0 0;color:#334155}.s{box-shadow:0 2px 12px rgba(0,0,0,.15)}</style></head><body>
${slides.map((s, i) => `<figure><div class="s">${s.html}</div><figcaption>${i + 1}. ${s.group}: ${s.name}</figcaption></figure>`).join("\n")}</body></html>`;
  const r = await renderChecked(previewHtml, null); fs.writeFileSync(preview, r.html);
  console.log(JSON.stringify({ pptx: file, preview, slides: slides.map(s => `${s.group}: ${s.name}`), logos: !!p.logos, colours: p.content.kit.a11yNotes, a11y: r.a11y }, null, 1));
})().catch(e => { console.error("ERROR: " + e.message); process.exit(1); });
