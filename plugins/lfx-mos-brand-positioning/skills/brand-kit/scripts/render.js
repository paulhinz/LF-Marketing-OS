/* Render an HTML page in headless Chrome, check every piece of text against WCAG 2.2 AA contrast
   (4.5:1, or 3:1 for large text: 24px+, or 18.66px+ bold), correct any that fail, and optionally print a tagged PDF.
   Without puppeteer it returns the HTML unchanged and says the check was skipped. */
const AUDIT = () => {
  const parse = s => { const m = String(s).match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number); return [v[0], v[1], v[2], v.length > 3 ? v[3] : 1]; };
  const lum = c => c.slice(0, 3).map(v => v / 255).map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((s, v, i) => s + v * [.2126, .7152, .0722][i], 0);
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const over = (top, bot) => [0, 1, 2].map(i => top[i] * top[3] + bot[i] * (1 - top[3])).concat(1);
  const hex = c => "#" + c.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();
  /* what is painted under the centre of the text: walk the paint stack top-down until an opaque background */
  function bgAt(el) {
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) return null;
    const x = Math.min(innerWidth - 1, Math.max(0, r.left + r.width / 2)), y = Math.min(innerHeight - 1, Math.max(0, r.top + Math.min(r.height / 2, 12)));
    const layers = [];
    for (const e of document.elementsFromPoint(x, y)) {
      if (e === el || el.contains(e)) { const c = parse(getComputedStyle(e).backgroundColor); if (e !== el && c && c[3] > 0) layers.push(c); if (e === el && c && c[3] > 0) layers.push(c); continue; }
      if (e.tagName === "IMG" || e.tagName === "svg") continue;
      const cs = getComputedStyle(e), c = parse(cs.backgroundColor);
      if (c && c[3] > 0) { layers.push(c); if (c[3] >= 1) break; }
      else if (cs.backgroundImage && cs.backgroundImage !== "none" && /url\(/.test(cs.backgroundImage)) return null;   // over a photo: can't judge
    }
    let bg = [255, 255, 255, 1]; for (let i = layers.length - 1; i >= 0; i--) bg = over(layers[i], bg); return bg;
  }
  const fix = (fg, bg, min) => { const toWhite = ratio([255, 255, 255], bg) >= ratio([0, 0, 0], bg); const t = toWhite ? 255 : 0;
    for (let k = .02; k <= 1.0001; k += .02) { const c = fg.slice(0, 3).map(v => v + (t - v) * k); if (ratio(c, bg) >= min) return c; } return [t, t, t]; };
  const els = [...document.querySelectorAll("body *")].filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
  // page-sized canvases (1056x816 pages) scroll; check each element in view
  const out = { checked: 0, fixed: [], remaining: [], skipped: 0 };
  for (const el of els) {
    el.scrollIntoView({ block: "center" });
    const cs = getComputedStyle(el); if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) continue;
    const bg = bgAt(el); if (!bg) { out.skipped++; continue; }
    let fg = parse(cs.color); if (!fg) continue; fg = over(fg, bg);
    const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700, large = size >= 24 || (size >= 18.66 && bold), min = large ? 3 : 4.5;
    out.checked++;
    const r = ratio(fg, bg); if (r >= min - 0.005) continue;
    const nc = fix(fg, bg, min); el.style.setProperty("color", hex(nc), "important");
    out.fixed.push({ text: el.textContent.trim().slice(0, 50), was: hex(fg), on: hex(bg), ratio: +r.toFixed(2), now: hex(nc), size: Math.round(size) });
  }
  scrollTo(0, 0);
  return out;
};
async function renderChecked(html, pdf) {
  let puppeteer; try { puppeteer = require("puppeteer"); } catch (e) { return { html, pdf: null, a11y: { checked: false, note: "puppeteer isn't installed, so the contrast check and PDF were skipped; the HTML still uses accessible colours" } }; }
  let b; try { b = await puppeteer.launch({ headless: "shell", args: ["--no-sandbox"] }); }
  catch (e) { return { html, pdf: null, a11y: { checked: false, note: "headless Chrome didn't start (" + e.message.split("\n")[0] + "); contrast check and PDF skipped" } }; }
  try {
    const pg = await b.newPage(); await pg.setViewport({ width: pdf?.viewport?.[0] || 1200, height: pdf?.viewport?.[1] || 900 });
    await pg.setContent(html, { waitUntil: "networkidle0", timeout: 30000 }).catch(() => {}); await pg.evaluateHandle("document.fonts.ready");
    const r = await pg.evaluate(AUDIT);
    const after = r.fixed.length ? await pg.evaluate(AUDIT) : { fixed: [] };
    const outHtml = r.fixed.length ? "<!doctype html>\n" + await pg.evaluate(() => document.documentElement.outerHTML) : html;
    let pdfFile = null;
    if (pdf?.path) { await pg.pdf({ path: pdf.path, width: pdf.width, height: pdf.height, printBackground: true, tagged: true }); pdfFile = pdf.path; }
    return { html: outHtml, pdf: pdfFile, a11y: { checked: true, standard: "WCAG 2.2 AA text contrast", textElements: r.checked, skippedOverImages: r.skipped, corrected: r.fixed, stillFailing: after.fixed } };
  } finally { await b.close(); }
}
module.exports = { renderChecked };
