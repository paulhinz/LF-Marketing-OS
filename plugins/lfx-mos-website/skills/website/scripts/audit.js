/* WCAG 2.2 AA audit of a built site folder, in headless Chrome.
   For every page (and edit.html) at 1280×900 and 320×800 it runs axe-core with the WCAG 2.0/2.1/2.2 A and AA rules,
   measures the contrast of every rendered text element against what is actually painted under it, checks reflow (no
   horizontal scroll at 320px), and re-runs axe with the menus open. Report-only: fixes belong in sitegen.js or the brand kit.
   Needs the optional dependencies puppeteer and axe-core; without them it says so and returns { ran: false }. */
const path = require("path");
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"];
const VIEWPORTS = [[1280, 900], [320, 800]];

/* contrast of rendered text, from the brand-positioning renderers' check (render.js), without the auto-fix */
const CONTRAST = () => {
  const parse = s => { const m = String(s).match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number); return [v[0], v[1], v[2], v.length > 3 ? v[3] : 1]; };
  const lum = c => c.slice(0, 3).map(v => v / 255).map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((s, v, i) => s + v * [.2126, .7152, .0722][i], 0);
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const over = (top, bot) => [0, 1, 2].map(i => top[i] * top[3] + bot[i] * (1 - top[3])).concat(1);
  const hex = c => "#" + c.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();
  function bgAt(el) {
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) return null;
    const own = parse(getComputedStyle(el).backgroundColor); if (own && own[3] >= 1) return own;   // text on its own opaque ground (e.g. a skip link shown on focus)
    const x = Math.min(innerWidth - 1, Math.max(0, r.left + Math.min(r.width / 2, 8))), y = Math.min(innerHeight - 1, Math.max(0, r.top + Math.min(r.height / 2, 12)));
    const layers = [];
    for (const e of document.elementsFromPoint(x, y)) {
      if (e.tagName === "IMG" || e.tagName === "svg") continue;
      const cs = getComputedStyle(e), c = parse(cs.backgroundColor);
      if (c && c[3] > 0) { layers.push(c); if (c[3] >= 1) break; }
      else if (cs.backgroundImage && /url\(/.test(cs.backgroundImage)) return null;
    }
    let bg = [255, 255, 255, 1]; for (let i = layers.length - 1; i >= 0; i--) bg = over(layers[i], bg); return bg;
  }
  const els = [...document.querySelectorAll("body *")].filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
  const out = { checked: 0, fails: [], skipped: 0 };
  document.documentElement.style.scrollBehavior = "auto";   // smooth scrolling would move text after it is measured
  for (const el of els) {
    if (el.closest(".sr-only") || el.closest("[hidden]") || el.closest("noscript")) continue;
    const cs = getComputedStyle(el); if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) continue;
    if (!el.getClientRects().length) continue;
    el.scrollIntoView({ block: "center" });
    const bg = bgAt(el); if (!bg) { out.skipped++; continue; }
    let fg = parse(cs.color); if (!fg) continue; fg = over(fg, bg);
    const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700, large = size >= 24 || (size >= 18.66 && bold), min = large ? 3 : 4.5;
    out.checked++;
    const r = ratio(fg, bg); if (r >= min - 0.005) continue;
    out.fails.push({ text: el.textContent.trim().slice(0, 60), fg: hex(fg), bg: hex(bg), ratio: +r.toFixed(2), min, size: Math.round(size) });
  }
  scrollTo(0, 0);
  return out;
};

async function audit(dir, files) {
  let puppeteer, axePath;
  try { puppeteer = require("puppeteer"); axePath = require.resolve("axe-core/axe.min.js"); }
  catch (e) { return { ran: false, note: "puppeteer and axe-core aren't installed (npm install in scripts/), so the browser audit was skipped. The engine's colour pairs are still enforced." }; }
  let browser;
  try { browser = await puppeteer.launch({ headless: "shell", args: ["--no-sandbox", "--allow-file-access-from-files"] }); }
  catch (e) { return { ran: false, note: "headless Chrome didn't start (" + String(e.message).split("\n")[0] + "); browser audit skipped." }; }
  const axeVersion = require(path.join(path.dirname(axePath), "package.json")).version;
  const result = { ran: true, tool: `axe-core ${axeVersion} (${TAGS.join(", ")}) + rendered text-contrast check`, viewports: VIEWPORTS.map(v => v.join("×")), pages: [], violations: {}, incomplete: {}, textChecked: 0, contrastFails: [], reflow: [], states: ["default", "mobile menu open", "About submenu open", "Transcend consent banner (when its CDN loads)"] };
  const runAxe = pg => pg.evaluate(async tags => { const r = await window.axe.run(document, { runOnly: { type: "tag", values: tags }, resultTypes: ["violations", "incomplete"] });
    const slim = list => list.map(v => ({ id: v.id, impact: v.impact, help: v.help, url: v.helpUrl, nodes: v.nodes.slice(0, 5).map(n => ({ target: n.target.join(" "), summary: (n.failureSummary || "").split("\n").slice(0, 3).join(" ") })), count: v.nodes.length }));
    return { violations: slim(r.violations), incomplete: slim(r.incomplete) }; }, TAGS);
  const add = (bucket, page, vp, state, list) => list.forEach(v => { const b = bucket[v.id] = bucket[v.id] || { id: v.id, impact: v.impact, help: v.help, url: v.url, where: [] }; b.where.push({ page, viewport: vp, state, count: v.count, nodes: v.nodes }); });
  try {
    for (const f of files) {
      const rec = { page: f, viewports: {} };
      for (const [w, h] of VIEWPORTS) {
        const vp = `${w}×${h}`, pg = await browser.newPage();
        await pg.setViewport({ width: w, height: h });
        await pg.goto("file://" + path.join(dir, f), { waitUntil: "networkidle0", timeout: 20000 }).catch(() => {});
        await pg.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
        await pg.addScriptTag({ path: axePath });
        const a = await runAxe(pg); add(result.violations, f, vp, "default", a.violations); add(result.incomplete, f, vp, "default", a.incomplete);
        const c = await pg.evaluate(CONTRAST); result.textChecked += c.checked; c.fails.forEach(x => result.contrastFails.push({ page: f, viewport: vp, ...x }));
        const sw = await pg.evaluate(() => document.documentElement.scrollWidth);
        if (w <= 320 && sw > w + 1) result.reflow.push({ page: f, viewport: vp, scrollWidth: sw });
        /* menus open */
        const opened = await pg.evaluate(w => { const t = document.querySelector(".menu-toggle"); if (w < 900 && t) t.click(); const s = document.querySelector(".sub-toggle"); if (s) s.click(); return !!s; }, w);
        if (opened) { const b = await runAxe(pg); add(result.violations, f, vp, w < 900 ? "mobile menu open" : "About submenu open", b.violations); }
        rec.viewports[vp] = { violations: a.violations.length, textChecked: c.checked, contrastFails: c.fails.length };
        await pg.close();
      }
      result.pages.push(rec);
    }
  } finally { await browser.close(); }
  result.violations = Object.values(result.violations); result.incomplete = Object.values(result.incomplete);
  result.passed = !result.violations.length && !result.contrastFails.length && !result.reflow.length;
  return result;
}
module.exports = { audit, TAGS, VIEWPORTS };
