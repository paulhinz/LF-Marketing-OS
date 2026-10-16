/* Extracted from the Marketing OS Kit prototype: the letter-size one pager. */
const { esc, words, svgUri, lum, SiteGen, contentFor, lst, lines, markHtml, cropSvg, hasLogo, logoImg, toProject } = require("./shim");
function opHtml(p) {
  const k = contentFor(p, "kit"), mh = contentFor(p, "mh"), bp = contentFor(p, "bp"), F = `'${k.font}',sans-serif`;
  return `<h3>One pager</h3><p class="muted" style="margin:0 0 14px">Letter size. Copy from the message house and 50-word boilerplate; styling from the brand kit.</p>
  <div class="sheet-wrap"><div class="sheet-frame" id="sheetframe"><div class="sheet" id="sheet" style="font-family:${F}">
    <div style="background:${k.dark};color:#FFFFFF;padding:44px 56px 40px;height:360px;display:flex;flex-direction:column;gap:18px">
      <div style="display:flex;align-items:center;gap:12px">${hasLogo(p) ? logoImg(p, "dark", 44) : markHtml(k, "#FFFFFF", k.dark, k.word, "#FFFFFF")}</div>
      <div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:${k.accentOnDark};margin-top:auto">${esc(mh.line)}</div>
      <div style="font-size:32px;line-height:1.18;font-weight:500;max-width:640px">${esc(mh.umbrella)}</div></div>
    <div style="padding:34px 56px 0">
      <div style="font-size:15px;line-height:1.6;color:#374151;max-width:660px">${esc(bp[2].t)}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:30px">${mh.pillars.map((x, i) => `<div style="border-top:3px solid ${i === 0 ? k.spark : k.accent};padding-top:12px">
        <div style="font-size:17px;font-weight:600;color:${k.dark};line-height:1.25">${esc(x.t)}</div><div style="font-size:12.5px;line-height:1.5;color:#374151;margin-top:8px">${esc(x.m)}</div>
        <ul style="margin:10px 0 0;padding-left:16px;font-size:11.5px;line-height:1.45;color:#4B5563">${x.p.slice(0, 2).map(([t]) => `<li style="margin-bottom:4px">${esc(t)}</li>`).join("")}</ul></div>`).join("")}</div>
      <div style="margin-top:28px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#4B5563">Who it's for</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 22px;margin-top:10px">${mh.aud.slice(0, 4).map(([a, m]) => `<div style="font-size:12.5px;line-height:1.45"><b style="color:${k.dark}">${esc(a)}.</b> <span style="color:#374151">${esc(m)}</span></div>`).join("")}</div></div>
    <div style="position:absolute;left:0;right:0;bottom:0;padding:22px 56px;border-top:1px solid #E5E7EB;display:flex;align-items:center;gap:16px">
      <span style="background:${k.dark};color:#FFFFFF;border-radius:200px;padding:9px 18px;font-weight:600;font-size:13px">Get involved</span>
      <span style="font-size:14px;color:${k.dark};font-weight:600">${esc(p.url)}</span><span style="flex:1"></span><span style="font-size:11px;color:#4B5563">${esc(p.name)} · ${esc(p.fdn)}</span></div>
  </div></div></div>`;
}
module.exports = { opHtml };
