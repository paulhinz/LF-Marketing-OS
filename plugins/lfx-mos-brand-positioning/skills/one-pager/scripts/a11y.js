/* WCAG 2.2 AA helpers shared by the renderers.
   Text: 4.5:1 (normal) and 3:1 (large: 24px+, or 18.66px+ bold). Logos and other graphics: 3:1 against their ground (1.4.11). */
const hex6 = h => { h = String(h || "").trim().replace("#", ""); if (h.length === 3) h = h.split("").map(c => c + c).join(""); return /^[0-9a-f]{6}$/i.test(h) ? "#" + h.toUpperCase() : null; };
const rgbOf = h => { h = hex6(h).slice(1); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
const toHex = rgb => "#" + rgb.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("").toUpperCase();
function lumOf(h) { return rgbOf(h).map(v => v / 255).map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((s, v, i) => s + v * [.2126, .7152, .0722][i], 0); }
const ratio = (a, b) => { const [x, y] = [lumOf(a), lumOf(b)].sort((m, n) => n - m); return (x + .05) / (y + .05); };
const mix = (a, b, t) => { const A = rgbOf(a), B = rgbOf(b); return toHex(A.map((v, i) => v + (B[i] - v) * t)); };
/* The colour closest to `fg` (same hue, shifted toward black or white) that reaches `min` against `bg`. */
function ink(fg, bg, min = 4.5) {
  fg = hex6(fg) || "#000000"; bg = hex6(bg) || "#FFFFFF";
  if (ratio(fg, bg) >= min) return fg;
  const target = ratio("#FFFFFF", bg) >= ratio("#000000", bg) ? "#FFFFFF" : "#000000";
  for (let t = .02; t <= 1.0001; t += .02) { const c = mix(fg, target, t); if (ratio(c, bg) >= min) return c; }
  return target;
}
/* White or near-black, whichever reads better on `bg`. */
const onColor = bg => ratio("#FFFFFF", bg) >= ratio("#111827", bg) ? "#FFFFFF" : "#111827";

/* Accessible working tokens for a brand kit. Brand colours are kept wherever they already pass. */
function safeKit(kit) {
  const k = { ...kit }, notes = [];
  const dark0 = hex6(kit.dark) || "#111827";
  k.dark = ink(dark0, "#FFFFFF", 4.5);                       // white text sits on it, and it is used as text on white
  if (k.dark !== dark0) notes.push(`dark ${dark0} darkened to ${k.dark} so white text on it and it as text on white reach 4.5:1`);
  const acc = hex6(kit.accent) || k.dark, spk = hex6(kit.spark) || acc;
  k.accentOnDark = ink(acc, k.dark, 4.5); k.accentOnLight = ink(acc, "#FFFFFF", 4.5);
  if (k.accentOnDark !== acc) notes.push(`accent ${acc} as text on ${k.dark} shown as ${k.accentOnDark}`);
  if (k.accentOnLight !== acc) notes.push(`accent ${acc} as text on white shown as ${k.accentOnLight}`);
  k.onAccent = onColor(acc); k.onSpark = onColor(spk);
  k.softOnDark = ink(mix("#FFFFFF", k.dark, .25), k.dark, 4.5);  // secondary text on dark grounds
  k.mutedOnLight = "#4B5563";                                    // secondary text on white and light tints
  k.a11yNotes = notes;
  return k;
}

/* Recolour the parts of a logo that would disappear on `ground` (under 3:1) to white or near-black.
   Colours that already stand out (an orange symbol on charcoal, say) are kept. */
function fixLogo(svg, ground, min = 3) {
  if (!svg || !hex6(ground)) return svg;
  const g = hex6(ground), swap = onColor(g); let changed = false;
  const norm = c => { c = c.trim(); if (/^rgba?\(/i.test(c)) { const n = c.match(/[\d.]+/g).map(Number); return toHex(n.slice(0, 3)); } return hex6(c); };
  let out = String(svg).replace(/((?:fill|stroke|stop-color|color)\s*[:=]\s*["']?\s*)(#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|rgba?\([^)]*\))/gi, (m, pre, c) => {
    const h = norm(c); if (!h || ratio(h, g) >= min) return m; changed = true; return pre + swap; });
  /* shapes with no fill default to black: give the root a readable fill on dark grounds */
  if (ratio("#000000", g) < min && !/<svg\b[^>]*\sfill=/i.test(out)) { out = out.replace(/<svg\b/i, `<svg fill="${swap}"`); changed = true; }
  return out;
}
module.exports = { hex6, ratio, mix, ink, onColor, safeKit, fixLogo };
