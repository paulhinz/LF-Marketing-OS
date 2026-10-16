/* Shared helpers, extracted from the Marketing OS Kit prototype, plus the WCAG fixes in a11y.js. */
const { safeKit, fixLogo } = require("./a11y");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const words = s => String(s).trim().split(/\s+/).filter(Boolean).length;
const svgUri = svg => "data:image/svg+xml;base64," + Buffer.from(String(svg), "utf8").toString("base64");
function lum(h) {
  h = String(h).replace("#", ""); if (h.length === 3) h = h.split("").map(c => c + c).join("");
  const c = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
}
const SiteGen = { lum, contrast: (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + .05) / (y + .05); } };
function contentFor(p, k) { const c = p.content?.[k]; if (!c) throw new Error(`Input is missing content.${k}`); return c; }
const lst = v => Array.isArray(v) ? v : String(v || "").split(/\s*[,\n]\s*/).map(x => x.trim()).filter(Boolean);
const lines = v => Array.isArray(v) ? v : String(v || "").split("\n").map(x => x.trim()).filter(Boolean);
const markHtml = (k, bg, fg, word, wfg) => `<span class="mark" style="background:${bg};color:${fg};font-family:'${esc(k.font)}',sans-serif">${esc(word[0])}</span>${wfg ? `<span class="word" style="color:${wfg};font-family:'${esc(k.font)}',sans-serif">${esc(word)}</span>` : ""}`;
function cropSvg(svg, vb) { return svg.replace(/viewBox="[^"]+"/, `viewBox="${vb}"`).replace(/<svg\b([^>]*)>/, (m, a) => `<svg${a.replace(/\s(width|height)="[^"]*"/g, "")}>`); }
const hasLogo = p => !!p.logos?.light;
/* an <img> of the real logo: kind = light (for light grounds) | dark (for dark grounds) | mono | symbol | symbolDark */
function logoImg(p, kind, h, extra = "", ground) {
  const L = p.logos; if (!L?.light) return "";
  const dk = kind === "dark" || kind === "symbolDark";
  let svg = dk ? (L.dark || L.light) : L.light;
  if ((kind === "symbol" || kind === "symbolDark") && L.symbol) svg = cropSvg(svg, L.symbol);
  /* WCAG 1.4.11: parts of the logo that fall under 3:1 against the ground are recoloured (white on dark, near-black on light) */
  if (kind !== "mono") svg = fixLogo(svg, ground || (dk ? (p.content?.kit?.dark || "#111827") : "#FFFFFF"));
  const f = kind === "mono" ? "filter:brightness(0);" : "";
  return `<img src="${svgUri(svg)}" alt="${esc(p.name)} logo" style="height:${h}px;width:auto;display:block;${f}${extra}">`;
}

/* Input object -> the project shape the renderers expect. */
function toProject(input) {
  const pr = input.project || {}, lg = input.logos || null;
  if (!pr.name) throw new Error("Input is missing project.name");
  const content = { ...(input.content || {}) };
  if (content.kit) content.kit = safeKit(content.kit);     // accessible working colours; brand colours kept where they pass
  return { id: String(pr.id || pr.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), name: pr.name, url: pr.domain || "", fdn: "Linux Foundation",
    content, logos: lg && lg.light ? { light: lg.light, dark: lg.dark || "", symbol: lg.symbol || null, file: lg.file || "logo files" } : null,
    sources: { files: lg && lg.light ? [{ kind: "logo", name: lg.file || "logo files" }] : [] } };
}
module.exports = { fixLogo, safeKit, esc, words, svgUri, lum, SiteGen, contentFor, lst, lines, markHtml, cropSvg, hasLogo, logoImg, toProject };
