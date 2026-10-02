#!/usr/bin/env node
/* Marketing Plan Workbook generator (LFX Marketing OS).
   Usage: node build_workbook.js workbook.json out.pptx
   Renders a workbook.json (see references/deck-outline.md) to a 16:9 .pptx with pptxgenjs. */
const fs = require("fs");
const pptxgen = require("pptxgenjs");

const [specPath, outPath] = process.argv.slice(2);
if (!specPath || !outPath) { console.error("usage: node build_workbook.js workbook.json out.pptx"); process.exit(1); }
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const B = Object.assign({ ink: "222222", slate: "676767", accent: "0A7739", neutral: "F1F1F1", white: "FFFFFF", hair: "D5D5D5", headFont: "Cambria", bodyFont: "Arial", danger: "B00020" }, spec.brand || {});
const M = spec.meta;
const HF = B.headFont, BF = B.bodyFont;
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625
pres.title = `${M.foundation} ${M.period} Marketing Plan Workbook — DRAFT`;
const fmt$ = n => "$" + Math.round(n).toLocaleString("en-US");
const pct = d => Math.round(d * 100) + "%";
let n = 0;

function base(dark) {
  const s = pres.addSlide(); n++;
  s.background = { color: dark ? B.ink : B.white };
  const c = dark ? "BBBBBB" : B.slate;
  s.addText(M.footer, { x: 0.5, y: 5.28, w: 7.5, h: 0.25, fontFace: BF, fontSize: 8, color: c, isTextBox: true, margin: 0 });
  s.addText(String(n), { x: 9.0, y: 5.28, w: 0.5, h: 0.25, fontFace: BF, fontSize: 8, color: c, align: "right", isTextBox: true, margin: 0 });
  return s;
}
function eyebrow(s, t, dark) { if (t) s.addText(t.toUpperCase(), { x: 0.5, y: 0.12, w: 6.5, h: 0.22, fontFace: BF, fontSize: 9, color: dark ? "BBBBBB" : B.slate, charSpacing: 2, isTextBox: true, margin: 0 }); }
function title(s, t, dark, size) { if (t) s.addText(t, { x: 0.5, y: 0.35, w: 6.75, h: 0.75, fontFace: HF, fontSize: size || 20, color: dark ? B.white : B.ink, isTextBox: true, margin: 0, valign: "top" }); }
function badge(s, kind) {
  if (!kind) return;
  const input = kind === "input";
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.45, y: 0.38, w: 2.05, h: 0.32, fill: { color: input ? B.accent : B.white }, line: { color: B.accent, width: 1 }, rectRadius: 0.05 });
  s.addText(input ? "YOUR INPUT" : "DRAFT — CONFIRM OR CORRECT", { x: 7.45, y: 0.38, w: 2.05, h: 0.32, fontFace: BF, fontSize: input ? 9 : 7.5, bold: true, color: input ? B.white : B.accent, align: "center", valign: "middle", isTextBox: true, margin: 0 });
}
function source(s, t) { if (t) s.addText("Source: " + t, { x: 0.5, y: 5.02, w: 9, h: 0.25, fontFace: BF, fontSize: 7.5, italic: true, color: B.slate, isTextBox: true, margin: 0 }); }
function notes(s, t) { if (t) s.addNotes(t); }
function bullets(s, items, x, y, w, h, size, color) {
  const arr = items.map((t, i) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: i < items.length - 1, paraSpaceAfter: 5 } }));
  s.addText(arr, { x, y, w, h, fontFace: BF, fontSize: size || 10, color: color || B.ink, valign: "top", isTextBox: true, margin: 0 });
}
function card(s, x, y, w, h, head, text, o = {}) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: o.fill || B.neutral }, line: { color: o.fill || B.neutral } });
  s.addText(head, { x: x + 0.15, y: y + 0.1, w: w - 0.3, h: 0.3, fontFace: BF, fontSize: o.hsize || 10.5, bold: true, color: o.hcolor || B.ink, isTextBox: true, margin: 0 });
  s.addText(text, { x: x + 0.15, y: y + 0.42, w: w - 0.3, h: h - 0.5, fontFace: BF, fontSize: o.size || 9.5, color: o.color || B.ink, valign: "top", isTextBox: true, margin: 0 });
}
function tbl(s, header, rows, x, y, w, colW, size, opts = {}) {
  const fs_ = size || 8.5;
  const data = [header, ...rows].map((r, ri) => r.map((c, ci) => ({
    text: String(c ?? ""),
    options: ri === 0 ? { bold: true, color: B.white, fill: { color: B.ink }, fontFace: BF, fontSize: fs_, valign: "middle" }
      : { color: B.ink, fill: { color: (opts.highlightRow === ri) ? "E3F1E8" : (ri % 2 === 0 ? B.neutral : B.white) }, fontFace: BF, fontSize: fs_, valign: "top", bold: ci === 0 && opts.boldFirst !== false }
  })));
  s.addTable(data, { x, y, w, colW, border: { type: "solid", pt: 0.5, color: B.hair }, margin: 0.05, autoPage: false });
}
function tile(s, x, y, w, num, label, sub, numSize) {
  s.addText(num, { x, y, w, h: 0.62, fontFace: HF, fontSize: numSize || 26, color: B.ink, isTextBox: true, margin: 0, valign: "bottom" });
  s.addText(label, { x, y: y + 0.64, w, h: 0.26, fontFace: BF, fontSize: 9.5, bold: true, color: B.ink, isTextBox: true, margin: 0 });
  if (sub) s.addText(sub, { x, y: y + 0.9, w, h: 0.55, fontFace: BF, fontSize: 8, color: B.slate, isTextBox: true, margin: 0, valign: "top" });
}
function std(sl, dark) { const s = base(dark); eyebrow(s, sl.eyebrow, dark); title(s, sl.title, dark, sl.titleSize); badge(s, sl.badge); source(s, sl.source); notes(s, sl.notes); return s; }

const R = {
  cover(sl) {
    const s = base(true);
    const parts = M.foundation.split(" ");
    s.addText(parts[0], { x: 0.7, y: 0.8, w: 6, h: 0.9, fontFace: HF, fontSize: 54, color: B.white, isTextBox: true, margin: 0 });
    s.addText(parts.slice(1).join(" "), { x: 0.7, y: 1.55, w: 6, h: 0.6, fontFace: BF, fontSize: 16, color: "BBBBBB", charSpacing: 3, isTextBox: true, margin: 0 });
    s.addText(sl.title || `${M.period} Marketing Plan Workbook`, { x: 0.7, y: 2.45, w: 8.6, h: 0.8, fontFace: HF, fontSize: 32, color: B.white, isTextBox: true, margin: 0 });
    s.addText(sl.blurb || "", { x: 0.7, y: 3.25, w: 7.5, h: 0.6, fontFace: BF, fontSize: 12, color: "DDDDDD", isTextBox: true, margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 4.2, w: 1.5, h: 0.36, fill: { color: B.accent }, line: { color: B.accent }, rectRadius: 0.05 });
    s.addText("STATUS: DRAFT v1", { x: 0.7, y: 4.2, w: 1.5, h: 0.36, fontFace: BF, fontSize: 9, bold: true, color: B.white, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(`${M.date}  ·  Prepared for ${M.preparedFor}  ·  Prepared by ${M.preparedBy}`, { x: 2.4, y: 4.2, w: 7, h: 0.36, fontFace: BF, fontSize: 9.5, color: "DDDDDD", valign: "middle", isTextBox: true, margin: 0 });
    notes(s, sl.notes);
  },
  howto(sl) {
    const s = std(sl);
    sl.steps.forEach((st, i) => {
      const y = 1.2 + i * 1.12;
      s.addShape(pres.shapes.OVAL, { x: 0.5, y: y + 0.05, w: 0.5, h: 0.5, fill: { color: B.accent }, line: { color: B.accent } });
      s.addText(String(st[0]), { x: 0.5, y: y + 0.05, w: 0.5, h: 0.5, fontFace: HF, fontSize: 18, color: B.white, align: "center", valign: "middle", isTextBox: true, margin: 0 });
      s.addText(st[1], { x: 1.2, y, w: 5.2, h: 0.3, fontFace: BF, fontSize: 12.5, bold: true, color: B.ink, isTextBox: true, margin: 0 });
      s.addText(st[2], { x: 1.2, y: y + 0.32, w: 5.3, h: 0.78, fontFace: BF, fontSize: 10, color: B.ink, isTextBox: true, margin: 0, valign: "top" });
    });
    card(s, 6.9, 1.2, 2.6, 3.6, "At a glance", sl.glance, { size: 8.5 });
  },
  divider(sl) {
    const s = base(true);
    s.addText(sl.part, { x: 0.7, y: 1.4, w: 8, h: 0.4, fontFace: BF, fontSize: 12, color: "BBBBBB", charSpacing: 3, isTextBox: true, margin: 0 });
    s.addText(sl.name, { x: 0.7, y: 1.85, w: 8.6, h: 1.0, fontFace: HF, fontSize: 40, color: B.white, isTextBox: true, margin: 0 });
    s.addText(sl.blurb || "", { x: 0.7, y: 3.0, w: 8, h: 1.3, fontFace: BF, fontSize: 13, color: "DDDDDD", isTextBox: true, margin: 0, valign: "top" });
    s.addShape(pres.shapes.OVAL, { x: 8.6, y: 1.5, w: 0.7, h: 0.7, fill: { color: B.accent }, line: { color: B.accent } });
    notes(s, sl.notes);
  },
  stats(sl) {
    const s = std(sl);
    const t = sl.tiles;
    if (t.length <= 3) {
      t.forEach((x, i) => tile(s, 0.5 + i * 3.05, 1.25, 2.9, x.num, x.label, x.sub, 34));
      if (sl.era) {
        s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.05, w: 9, h: 1.85, fill: { color: B.neutral }, line: { color: B.neutral } });
        s.addText(sl.era.head, { x: 0.7, y: 3.15, w: 8.6, h: 0.3, fontFace: BF, fontSize: 10, bold: true, color: B.accent, isTextBox: true, margin: 0 });
        s.addText(sl.era.text, { x: 0.7, y: 3.45, w: 8.6, h: 1.4, fontFace: BF, fontSize: 10.5, color: B.ink, isTextBox: true, margin: 0, valign: "top" });
      }
    } else {
      t.forEach((x, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const X = 0.5 + col * 3.05, Y = 1.2 + row * 1.9;
        s.addShape(pres.shapes.RECTANGLE, { x: X, y: Y, w: 2.9, h: 1.75, fill: { color: B.neutral }, line: { color: B.neutral } });
        tile(s, X + 0.15, Y + 0.08, 2.6, x.num, x.label, x.sub, 24);
      });
    }
  },
  table(sl) {
    const s = std(sl);
    tbl(s, sl.header, sl.rows, 0.5, sl.y || 1.15, 9, sl.colW, sl.size, sl);
    if (sl.caption) s.addText(sl.caption, { x: 0.5, y: 4.45, w: 9, h: 0.5, fontFace: BF, fontSize: 8.5, italic: true, color: B.slate, isTextBox: true, margin: 0, valign: "bottom" });
  },
  cards(sl) {
    const s = std(sl);
    let x0 = 0.5, avail = 9;
    if (sl.dark) {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.2, w: 5.6, h: 3.6, fill: { color: B.ink }, line: { color: B.ink } });
      s.addText(sl.dark.head, { x: 0.7, y: 1.35, w: 5.2, h: 0.3, fontFace: BF, fontSize: 9, color: "BBBBBB", charSpacing: 2, isTextBox: true, margin: 0 });
      s.addText(sl.dark.text, { x: 0.7, y: 1.7, w: 5.2, h: 2.2, fontFace: HF, fontSize: 16, color: B.white, isTextBox: true, margin: 0, valign: "top" });
      if (sl.dark.proof) s.addText(sl.dark.proof, { x: 0.7, y: 4.0, w: 5.2, h: 0.7, fontFace: BF, fontSize: 9, color: "DDDDDD", isTextBox: true, margin: 0, valign: "top" });
      x0 = 6.35; avail = 3.15;
      const hh = (3.6 - 0.15 * (sl.cards.length - 1)) / sl.cards.length;
      sl.cards.forEach((c, i) => card(s, x0, 1.2 + i * (hh + 0.15), avail, hh, c.head, c.text, { size: c.size || 8.5, hcolor: c.hcolor }));
      return;
    }
    const k = sl.cards.length, gap = 0.15, w = (avail - gap * (k - 1)) / k;
    sl.cards.forEach((c, i) => card(s, x0 + i * (w + gap), 1.15, w, 3.65, c.head, c.text, { size: c.size || 9, hcolor: c.hcolor }));
  },
  chart(sl) {
    const s = std(sl);
    const c = sl.chart;
    const common = { x: 0.5, y: 1.15, w: 5.2, h: 3.4, chartColors: [c.kind === "line" ? B.ink : B.accent], showValue: true, dataLabelFontSize: 8.5, dataLabelColor: B.ink, showTitle: true, title: c.title, titleFontSize: 10, titleColor: B.ink, titleFontFace: BF, catAxisLabelColor: B.slate, valAxisLabelColor: B.slate, catAxisLabelFontSize: 8.5, valAxisLabelFontSize: 8, valGridLine: { color: "E5E5E5", size: 0.5 }, catGridLine: { style: "none" }, showLegend: false, valAxisMinVal: 0, valAxisMaxVal: c.max };
    if (c.kind === "line") Object.assign(common, { lineSize: 2, lineDataSymbol: "circle", lineDataSymbolSize: 6, dataLabelPosition: "t" });
    else Object.assign(common, { barDir: "col", dataLabelPosition: "outEnd" });
    s.addChart(c.kind === "line" ? pres.charts.LINE : pres.charts.BAR, [{ name: c.title, labels: c.labels, values: c.values }], common);
    if (sl.footnote) s.addText(sl.footnote, { x: 0.5, y: 4.55, w: 5.2, h: 0.3, fontFace: BF, fontSize: 8, italic: true, color: B.slate, isTextBox: true, margin: 0 });
    const hh = (3.65 - 0.15 * (sl.cards.length - 1)) / sl.cards.length;
    sl.cards.forEach((cd, i) => card(s, 5.95, 1.15 + i * (hh + 0.15), 3.55, hh, cd.head, cd.text, { size: 8.5 }));
  },
  goal(sl) {
    const s = std(sl);
    // rank circle + goal statement
    s.addShape(pres.shapes.OVAL, { x: 0.5, y: 1.15, w: 0.6, h: 0.6, fill: { color: B.ink }, line: { color: B.ink } });
    s.addText(String(sl.rank), { x: 0.5, y: 1.15, w: 0.6, h: 0.6, fontFace: HF, fontSize: 22, color: B.white, align: "center", valign: "middle", isTextBox: true, margin: 0 });
    s.addText(sl.outcome.toUpperCase(), { x: 1.25, y: 1.12, w: 5.0, h: 0.22, fontFace: BF, fontSize: 8.5, color: B.accent, bold: true, charSpacing: 1.5, isTextBox: true, margin: 0 });
    s.addText(sl.goal, { x: 1.25, y: 1.34, w: 5.0, h: 0.5, fontFace: HF, fontSize: 15, color: B.ink, isTextBox: true, margin: 0, valign: "top" });
    // five fields
    const fields = [["Definition", sl.definition], ["KPI (one number, dated)", sl.kpi], ["Budget share", sl.budgetShare], ["Timeline", sl.timeline], ["Risks", sl.risks.map(r => "• " + r).join("\n")]];
    const ys = [1.95, 1.95, 3.05, 3.05, 1.95];
    const xs = [0.5, 3.3, 0.5, 3.3, 6.1];
    const ws = [2.65, 2.65, 2.65, 2.65, 3.4];
    const hs = [1.0, 1.0, 0.9, 0.9, 2.0];
    fields.forEach((f, i) => {
      s.addShape(pres.shapes.RECTANGLE, { x: xs[i], y: ys[i], w: ws[i], h: hs[i], fill: { color: B.neutral }, line: { color: B.neutral } });
      s.addText(f[0], { x: xs[i] + 0.12, y: ys[i] + 0.07, w: ws[i] - 0.24, h: 0.22, fontFace: BF, fontSize: 8.5, bold: true, color: B.slate, isTextBox: true, margin: 0 });
      s.addText(f[1], { x: xs[i] + 0.12, y: ys[i] + 0.3, w: ws[i] - 0.24, h: hs[i] - 0.35, fontFace: BF, fontSize: i === 2 ? 11 : 9, bold: i === 2, color: B.ink, valign: "top", isTextBox: true, margin: 0 });
    });
    // baseline strip
    s.addText("Baseline: " + sl.baseline, { x: 0.5, y: 4.05, w: 5.5, h: 0.95, fontFace: BF, fontSize: 8, color: B.ink, isTextBox: true, margin: 0, valign: "top" });
    // confirm box
    s.addShape(pres.shapes.RECTANGLE, { x: 6.1, y: 4.05, w: 3.4, h: 0.9, fill: { color: B.white }, line: { color: B.accent, width: 1 } });
    s.addText("ED: confirm, edit, or strike this goal. Change the KPI number or budget share here:", { x: 6.2, y: 4.1, w: 3.2, h: 0.8, fontFace: BF, fontSize: 8, italic: true, color: B.slate, isTextBox: true, margin: 0, valign: "top" });
  },
  profile(sl) {
    const s = std(sl);
    const m = sl.model;
    s.addText(`Revenue base: ${fmt$(m.revenue)} ${sl.revenueLabel || ""}`, { x: 0.5, y: 1.12, w: 9, h: 0.28, fontFace: BF, fontSize: 10, bold: true, color: B.ink, isTextBox: true, margin: 0 });
    const header = ["", ...m.profiles.map(p => p.profile)];
    const rs = m.remainder_split;
    const rows = [
      ["Total marketing budget (% of revenue)", ...m.profiles.map(p => `${fmt$(p.total)}  (${pct(p.pct_of_revenue)})`)],
      ["Paid spend — pre-set by the profile", ...m.profiles.map(p => `${fmt$(p.paid)}  (${pct(p.paid_share)} of total)`)],
      ["Remainder, split by LF", ...m.profiles.map(p => fmt$(p.remainder))],
      [`   LF marketing services / headcount (${pct(rs.lf_services)})`, ...m.profiles.map(p => fmt$(p.lf_services))],
      [`   Third-party content development (${pct(rs.third_party_content)})`, ...m.profiles.map(p => fmt$(p.third_party_content))],
      [`   Discretionary reserve — hot + evergreen (${pct(rs.discretionary)})`, ...m.profiles.map(p => fmt$(p.discretionary))],
      ["Planned campaign spend (paid + third-party content)", ...m.profiles.map(p => fmt$(p.planned_campaign_spend))],
    ];
    tbl(s, header, rows, 0.5, 1.45, 9, [3.3, 1.9, 1.9, 1.9], 9, { boldFirst: false });
    s.addText(`Cross-check: the flat-pricing fee for LF marketing services at this revenue would be ${fmt$(m.flat_fee)} (${m.flat_fee_rule}). ${m.profiles.some(p => p.fee_exceeds_services) ? "That exceeds the services bucket at the profiles flagged in the notes — the interview must reconcile scope, profile, or split." : "It fits inside the services bucket at every profile."}`, { x: 0.5, y: 4.3, w: 9, h: 0.65, fontFace: BF, fontSize: 8.5, italic: true, color: B.slate, isTextBox: true, margin: 0, valign: "top" });
  },
  allocation(sl) {
    const s = std(sl);
    const m = sl.model;
    const header = ["#", "Goal", "Business outcome", "Share of total", ...m.profiles.map(p => p.profile.split(" ")[0])];
    const rows = sl.rows.map((r, i) => [String(i + 1), r.goal, r.outcome, pct(r.share), ...m.profiles.map(p => fmt$(p.total * r.share))]);
    const sum = sl.rows.reduce((a, r) => a + r.share, 0);
    rows.push(["", "Total", "", pct(sum), ...m.profiles.map(p => fmt$(p.total * sum))]);
    tbl(s, header, rows, 0.5, 1.15, 9, [0.3, 2.9, 1.7, 0.95, 1.05, 1.05, 1.05], 8.5, { boldFirst: false, highlightRow: rows.length });
    if (sl.caption) s.addText(sl.caption, { x: 0.5, y: 4.4, w: 9, h: 0.55, fontFace: BF, fontSize: 8.5, italic: true, color: B.slate, isTextBox: true, margin: 0, valign: "bottom" });
  },
  calendar(sl) {
    const s = std(sl);
    const k = sl.columns.length, gap = 0.1, w = (9 - gap * (k - 1)) / k;
    sl.columns.forEach((c, i) => {
      const x = 0.5 + i * (w + gap);
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.15, w, h: 0.4, fill: { color: c.highlight ? B.accent : B.ink }, line: { color: c.highlight ? B.accent : B.ink } });
      s.addText(c.head, { x: x + 0.1, y: 1.15, w: w - 0.2, h: 0.4, fontFace: BF, fontSize: 9.5, bold: true, color: B.white, valign: "middle", isTextBox: true, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.55, w, h: 3.25, fill: { color: B.neutral }, line: { color: B.neutral } });
      bullets(s, c.items, x + 0.1, 1.65, w - 0.2, 3.1, 8.5);
    });
  },
  input(sl) {
    const s = base();
    eyebrow(s, sl.eyebrow); badge(s, "input"); title(s, sl.title || "Your input");
    const q = sl.questions, top = 1.15, avail = 3.8, gap = 0.1, rowH = (avail - gap * (q.length - 1)) / q.length;
    q.forEach((t, i) => {
      const y = top + i * (rowH + gap);
      s.addShape(pres.shapes.OVAL, { x: 0.5, y: y + 0.02, w: 0.32, h: 0.32, fill: { color: B.ink }, line: { color: B.ink } });
      s.addText(String.fromCharCode(65 + i), { x: 0.5, y: y + 0.02, w: 0.32, h: 0.32, fontFace: BF, fontSize: 10, bold: true, color: B.white, align: "center", valign: "middle", isTextBox: true, margin: 0 });
      s.addText(t, { x: 0.95, y, w: 3.85, h: rowH, fontFace: BF, fontSize: q.length > 4 ? 9.5 : 10.5, color: B.ink, valign: "top", isTextBox: true, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 4.95, y, w: 4.55, h: rowH, fill: { color: B.white }, line: { color: B.hair, width: 0.75 } });
      s.addText("Type your answer here…", { x: 5.05, y: y + 0.03, w: 4.3, h: 0.25, fontFace: BF, fontSize: 8.5, italic: true, color: "AAAAAA", isTextBox: true, margin: 0 });
    });
    notes(s, sl.notes || "YOUR INPUT slide. Answers feed the final marketing plan.");
  },
  summary(sl) {
    const s = std(sl);
    const m = sl.model, ci = sl.chosenProfile;
    const dollars = g => ci == null ? m.profiles.map(p => fmt$(p.total * g.share)).join(" / ") : fmt$(m.profiles[ci].total * g.share);
    const header = ["#", "Goal", "Outcome", "Definition", "KPI", ci == null ? "Budget % · $ (Cons / Aggr / Hyper)" : "Budget % · $", "Timeline", "Risks"];
    const rows = sl.goals.map(g => [String(g.rank), g.goal, g.outcome, g.definition, g.kpi, `${pct(g.share)}\n${dollars(g)}`, g.timeline, g.risks.join("; ")]);
    tbl(s, header, rows, 0.5, 1.15, 9, [0.25, 1.35, 0.95, 1.75, 1.45, 1.25, 0.75, 1.25], 7.5, { boldFirst: false });
    if (sl.caption) s.addText(sl.caption, { x: 0.5, y: 4.78, w: 9, h: 0.24, fontFace: BF, fontSize: 7.5, italic: true, color: B.slate, isTextBox: true, margin: 0, valign: "bottom" });
  },
  budgetsummary(sl) {
    const s = std(sl);
    const m = sl.model, ci = sl.chosenProfile;
    const P = ci == null ? m.profiles : [m.profiles[ci]];
    // left: stacked buckets table
    const header = ["Budget line", ...P.map(p => p.profile)];
    const rows = [
      ["TOTAL MARKETING BUDGET", ...P.map(p => fmt$(p.total))],
      ["LF marketing services / headcount", ...P.map(p => fmt$(p.lf_services))],
      ["Paid spend (defined by medium in the plan)", ...P.map(p => fmt$(p.paid))],
      ["Third-party content development", ...P.map(p => fmt$(p.third_party_content))],
      ["= Planned campaign spend (paid + content)", ...P.map(p => fmt$(p.planned_campaign_spend))],
      ["Discretionary reserve (hot + evergreen)", ...P.map(p => fmt$(p.discretionary))],
      ["Flat-pricing fee cross-check (LF services)", ...P.map(() => fmt$(m.flat_fee))],
    ];
    const cw = ci == null ? [2.6, 1.2, 1.2, 1.2] : [3.6, 2.6];
    tbl(s, header, rows, 0.5, 1.15, ci == null ? 6.2 : 6.2, cw, 8.5, { boldFirst: false, highlightRow: 1 });
    // right: allocation by outcome
    const byOutcome = {};
    sl.allocation.forEach(a => { byOutcome[a.outcome] = (byOutcome[a.outcome] || 0) + a.share; });
    const ys = 1.15;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.9, y: ys, w: 2.6, h: 3.65, fill: { color: B.neutral }, line: { color: B.neutral } });
    s.addText("Allocation by business outcome", { x: 7.05, y: ys + 0.1, w: 2.3, h: 0.3, fontFace: BF, fontSize: 10, bold: true, color: B.ink, isTextBox: true, margin: 0 });
    let yy = ys + 0.5;
    Object.entries(byOutcome).forEach(([k, v]) => {
      s.addText(k, { x: 7.05, y: yy, w: 1.7, h: 0.3, fontFace: BF, fontSize: 9, color: B.ink, isTextBox: true, margin: 0, valign: "middle" });
      s.addText(pct(v), { x: 8.75, y: yy, w: 0.6, h: 0.3, fontFace: HF, fontSize: 14, color: B.accent, align: "right", isTextBox: true, margin: 0, valign: "middle" });
      s.addShape(pres.shapes.RECTANGLE, { x: 7.05, y: yy + 0.32, w: 2.3 * Math.min(1, v), h: 0.08, fill: { color: B.accent }, line: { color: B.accent } });
      yy += 0.62;
    });
    s.addText(sl.caption || (ci == null ? "The ED selects one Strategy Profile on the Part IV YOUR INPUT slide; the final plan carries only that column." : "Profile selected by the ED."), { x: 7.05, y: 4.3, w: 2.3, h: 0.5, fontFace: BF, fontSize: 8, italic: true, color: B.slate, isTextBox: true, margin: 0, valign: "top" });
  },
  next(sl) {
    const s = base(true);
    eyebrow(s, sl.eyebrow || "Closing", true); title(s, sl.title || "Next steps", true, 30);
    sl.steps.forEach((st, i) => {
      const x = 0.5 + i * 3.05;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.4, w: 2.9, h: 3.0, fill: { color: "2E2E2E" }, line: { color: "2E2E2E" } });
      s.addShape(pres.shapes.OVAL, { x: x + 0.2, y: 1.6, w: 0.5, h: 0.5, fill: { color: B.accent }, line: { color: B.accent } });
      s.addText(String(st[0]), { x: x + 0.2, y: 1.6, w: 0.5, h: 0.5, fontFace: HF, fontSize: 18, color: B.white, align: "center", valign: "middle", isTextBox: true, margin: 0 });
      s.addText(st[1], { x: x + 0.2, y: 2.25, w: 2.5, h: 0.4, fontFace: BF, fontSize: 12, bold: true, color: B.white, isTextBox: true, margin: 0 });
      s.addText(st[2], { x: x + 0.2, y: 2.7, w: 2.5, h: 1.6, fontFace: BF, fontSize: 9.5, color: "DDDDDD", isTextBox: true, margin: 0, valign: "top" });
    });
    if (sl.footer) s.addText(sl.footer, { x: 0.5, y: 4.6, w: 9, h: 0.4, fontFace: BF, fontSize: 9.5, italic: true, color: "BBBBBB", isTextBox: true, margin: 0 });
    notes(s, sl.notes);
  },
};

const path = require("path");
const modelCache = {};
for (const sl of spec.slides) {
  if (!R[sl.type]) throw new Error("unknown slide type " + sl.type);
  if (typeof sl.model === "string") { // path to budget_model.py --json output, relative to the spec
    const p = path.resolve(path.dirname(specPath), sl.model);
    sl.model = modelCache[p] || (modelCache[p] = JSON.parse(fs.readFileSync(p, "utf8")));
  }
  R[sl.type](sl);
}
pres.writeFile({ fileName: outPath }).then(f => console.log("wrote", f, "slides:", n));
