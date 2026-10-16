#!/usr/bin/env node
/* Assemble one renderer input from a folder of skill outputs.
   usage: node assemble.js <folder> [--name "Project name"] [--domain project.org] [-o input.json]
   Reads every .json file in the folder (messaging framework, boilerplates, faq, brand kit, or an
   existing input/project file) and every .svg logo, and prints or writes the combined input object. */
const fs = require("fs"), path = require("path");

const KEYS = ["mf", "icp", "mh", "nums", "bp", "faq", "kit"];
const isBp = v => Array.isArray(v) && v.length && v.every(x => x && typeof x === "object" && "l" in x && "max" in x && "t" in x);
const isFaq = v => Array.isArray(v) && v.length && v.every(g => Array.isArray(g) && typeof g[0] === "string" && Array.isArray(g[1]));
const isKit = v => v && typeof v === "object" && !Array.isArray(v) && Array.isArray(v.colors) && "font" in v;
const isMh = v => v && typeof v === "object" && !Array.isArray(v) && "umbrella" in v && Array.isArray(v.pillars);
const isMf = v => v && typeof v === "object" && !Array.isArray(v) && "positioning" in v && Array.isArray(v.goals);

/* Sort out one parsed file into content keys. Accepts a skill's full output ({mf, icp, mh, nums, report}),
   a bare value (just the bp array, just the kit object), or a renderer input ({project, content, logos}). */
function classify(obj, file, found) {
  const put = (k, v) => { if (found.content[k] !== undefined) found.warnings.push(`${k} found in more than one file; using ${file}`); found.content[k] = v; found.from[k] = file; };
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    if (obj.project && typeof obj.project === "object") found.project = { ...found.project, ...obj.project };
    if (obj.logos && typeof obj.logos === "object") found.logos = obj.logos;
    const src = obj.content && typeof obj.content === "object" ? obj.content : obj;
    let any = false;
    for (const k of KEYS) if (src[k] !== undefined) { put(k, src[k]); any = true; }
    if (any) return;
    if (isKit(obj)) return put("kit", obj);
    if (isMh(obj)) return put("mh", obj);
    if (isMf(obj)) return put("mf", obj);
    if (obj.project) return;
  }
  if (isBp(obj)) return put("bp", obj);
  if (isFaq(obj)) return put("faq", obj);
  found.warnings.push(`${file}: not recognized as a skill output, skipped`);
}

/* Logo files: the light (full-color) lockup and the white/reversed one, picked by file name, as in the Kit prototype. */
function pickLogos(svgs) {
  const score = n => (/horizontal|primary|lockup|full/i.test(n) ? 3 : 0) + (/stack|icon|symbol|mark/i.test(n) ? -3 : 0);
  const dark = svgs.filter(f => /white|reverse|dark|knockout|inverse|neg/i.test(f.name)).sort((a, b) => score(b.name) - score(a.name))[0];
  const light = svgs.filter(f => f !== dark && !/white|reverse|knockout|inverse|neg|black|mono/i.test(f.name)).sort((a, b) => score(b.name) - score(a.name))[0] || svgs.find(f => f !== dark);
  return { light, dark };
}

function assemble(dir, opts = {}) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) throw new Error(`${dir} is not a folder`);
  const found = { project: {}, content: {}, logos: null, from: {}, warnings: [] };
  const names = fs.readdirSync(dir).sort();
  for (const n of names.filter(n => /\.json$/i.test(n))) {
    let obj; try { obj = JSON.parse(fs.readFileSync(path.join(dir, n), "utf8")); } catch (e) { found.warnings.push(`${n}: not valid JSON, skipped`); continue; }
    classify(obj, n, found);
  }
  if (!found.logos) {
    const svgs = names.filter(n => /\.svg$/i.test(n)).map(n => ({ name: n, text: fs.readFileSync(path.join(dir, n), "utf8") }));
    if (svgs.length) { const pk = pickLogos(svgs); if (pk.light) found.logos = { light: pk.light.text, dark: pk.dark?.text || "", symbol: null, file: pk.light.name }; found.from.logos = [pk.light?.name, pk.dark?.name].filter(Boolean).join(", "); }
  }
  const project = { ...found.project };
  if (opts.name) project.name = opts.name;
  if (opts.domain) project.domain = String(opts.domain).replace(/^https?:\/\//, "").replace(/\/+$/, "");
  if (!project.name) throw new Error("No project name. Pass --name \"Project name\" (and --domain), or put a project.json with {\"project\": {\"name\": …, \"domain\": …}} in the folder.");
  if (!project.domain) found.warnings.push("No project domain; pass --domain so the one pager and closing slide show it");
  return { input: { project, content: found.content, logos: found.logos }, from: found.from, warnings: found.warnings };
}

/* What each renderer needs, so the caller can say exactly what's missing. */
const NEEDS = { "presentation-template": ["mh", "bp", "faq", "kit"], "one-pager": ["mh", "bp", "kit"], "brand-kit": ["kit", "mh", "bp"] };
const SKILL_FOR = { mh: "messaging-framework", mf: "messaging-framework", icp: "messaging-framework", nums: "messaging-framework", bp: "boilerplates", faq: "faq", kit: "brand-kit" };
function missingFor(renderer, input) { return (NEEDS[renderer] || []).filter(k => !input.content[k]).map(k => `${k} (run the ${SKILL_FOR[k]} skill)`); }

/* Used by the build scripts: a path that is a folder gets assembled, a file is read as-is. */
function loadInput(p, opts = {}) {
  if (fs.statSync(p).isDirectory()) { const r = assemble(p, opts); r.warnings.forEach(w => console.error("note: " + w)); return r.input; }
  return JSON.parse(fs.readFileSync(p, "utf8"));
}
function parseFlags(argv) {
  const o = {}, rest = [];
  for (let i = 0; i < argv.length; i++) { const a = argv[i];
    if (a === "--name") o.name = argv[++i]; else if (a === "--domain") o.domain = argv[++i]; else if (a === "-o" || a === "--out") o.out = argv[++i]; else rest.push(a); }
  return { opts: o, rest };
}
module.exports = { assemble, loadInput, parseFlags, missingFor };

if (require.main === module) {
  try {
    const { opts, rest } = parseFlags(process.argv.slice(2));
    if (!rest[0]) throw new Error('usage: node assemble.js <folder> [--name "Project name"] [--domain project.org] [-o input.json]');
    const r = assemble(rest[0], opts), json = JSON.stringify(r.input, null, 1);
    if (opts.out) fs.writeFileSync(opts.out, json); else process.stdout.write(json + "\n");
    console.error(JSON.stringify({ found: r.from, missing: Object.fromEntries(Object.keys(NEEDS).map(k => [k, missingFor(k, r.input)])), warnings: r.warnings, written: opts.out || null }, null, 1));
  } catch (e) { console.error("ERROR: " + e.message); process.exit(1); }
}
