/* Extracted from the Marketing OS Kit prototype: the 12 slide masters, the brand-reference appendix and the example slides. */
const { esc, words, svgUri, lum, SiteGen, contentFor, lst, lines, markHtml, cropSvg, hasLogo, logoImg, toProject } = require("./shim");
const hx = c => String(c).replace("#", "").toUpperCase();
function ptExtras(p) {
  const { mh, short } = ptModel(p);
  const nums = (p.content?.nums || []).map(([n, l]) => ({ n, l }));
  while (nums.length < 3) nums.push({ n: "[00]", l: "[Metric from LFX: contributors, members or registrations]" });
  return { agenda: ["Why now"].concat(mh.pillars.map(x => x.t), ["Get involved"]), nums,
    problem: mh.found, solution: mh.umbrella, quote: "[A quote from a member or maintainer about why they take part]", who: "[Name] · [Title], [Company]",
    tl: ["[Month YYYY] · [Milestone]", "[Month YYYY] · [Milestone]", "[Month YYYY] · [Milestone]", "[Month YYYY] · [Milestone]", "[Month YYYY] · [Milestone]"], short };
}
const LAYOUTS = ["Title slide", "Agenda", "Section header", "Content slide", "Two columns", "Big statement", "Key numbers", "Quote", "Full-bleed image", "Member logos", "Timeline", "Closing"];
function ptModel(p) {
  const mh = contentFor(p, "mh"), bp = contentFor(p, "bp"), faq = contentFor(p, "faq"), k = contentFor(p, "kit");
  const answered = faq.flatMap(g => g[1]).filter(q => q[1]);
  return { AD: k.accentOnDark || k.accent, AL: k.accentOnLight || k.accent, SOFT: k.softOnDark || "#D1D5DB", mh, bp, k, answered, gaps: faq.flatMap(g => g[1]).filter(q => !q[1]).length, short: p.name.replace(/\s*\(.*\)/, ""), D: k.dark, A: k.accent, SP: k.spark, F: k.font };
}
/* HTML previews of each slide, 960×540 (72 px per inch, so the PPTX coordinates are px/72) */
function ptSlides(p) {
  const { mh, bp, k, answered, short, D, A, SP, F, AD, AL, SOFT } = ptModel(p), FF = `'${F}', 'Inter', system-ui, sans-serif`;
  const t = (x, y, w, h, html, st = "") => `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;${h ? `height:${h}px;` : ""}${st}">${html}</div>`;
  const mark = (s, bg, fg) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:${s}px;height:${s}px;background:${bg};color:${fg};font:700 ${Math.round(s * .55)}px/1 ${FF}">${esc(k.word[0])}</span>`;
  const lock = (s, onDark) => hasLogo(p) ? logoImg(p, onDark ? "dark" : "light", Math.round(s * 1.2)) : lock0(s, onDark);
  const lock0 = (s, onDark) => `<span style="display:inline-flex;align-items:center;gap:${Math.round(s * .3)}px">${mark(s, onDark ? "#FFFFFF" : D, onDark ? D : "#FFFFFF")}<span style="font:700 ${Math.round(s * .5)}px ${FF};letter-spacing:.12em;color:${onDark ? "#FFFFFF" : D}">${esc(k.word)}</span></span>`;
  const slide = (bg, inner) => `<div style="position:relative;width:960px;height:540px;overflow:hidden;background:${bg};font-family:${FF};color:#1F2937">${inner}</div>`;
  const appx = (title, inner, n) => slide("#FFFFFF", t(43, 22, 700, 0, `<div style="font:600 9px ${FF};letter-spacing:.14em;color:${D}">APPENDIX · BRAND REFERENCE · DELETE BEFORE PRESENTING</div>`)
    + t(43, 44, 874, 0, `<div style="font:600 26px ${FF};color:${D}">${title}</div>`) + inner
    + t(830, 506, 90, 0, `<div style="text-align:right;font:400 9px ${FF};color:#6B7280">${n}</div>`) + `<div style="position:absolute;left:0;top:0;width:6px;height:540px;background:${A}"></div>`);
  const S = []; let an = 1;
  S.push({ group: "Appendix", name: "Appendix divider", html: slide(D, t(60, 190, 760, 0, `<div style="font:600 11px ${FF};letter-spacing:.16em;color:${AD}">APPENDIX</div><div style="font:500 44px/1.1 ${FF};color:#fff;margin-top:12px">Brand reference</div><div style="font:400 15px/1.5 ${FF};color:${SOFT};margin-top:14px;max-width:620px">Start here. These slides hold the message house, boilerplates, FAQ and brand kit for writing this deck. Hide or delete them before presenting.</div>`) + t(60, 470, 400, 0, lock(26, true))) });
  S.push({ group: "Appendix", name: "Message house", html: appx("Message house", t(43, 92, 874, 70, `<div style="height:70px;background:${D};color:#fff;display:flex;align-items:center;padding:0 22px;font:500 16px/1.35 ${FF}">${esc(mh.umbrella)}</div>`)
    + t(43, 168, 874, 0, `<div style="font:600 12px ${FF};color:${D}">Brand line · ${esc(mh.line)}</div>`)
    + t(43, 196, 874, 0, `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">${mh.pillars.map((x, i) => `<div style="border-top:3px solid ${i ? A : SP};padding-top:10px"><div style="font:600 15px ${FF};color:${D}">${esc(x.t)}</div><div style="font:400 11px/1.45 ${FF};margin-top:6px">${esc(x.m)}</div><ul style="margin:8px 0 0;padding-left:14px;font:400 9.5px/1.45 ${FF};color:#4B5563">${x.p.map(q => `<li>${esc(q[0])}</li>`).join("")}</ul></div>`).join("")}</div>`), ++an) });
  S.push({ group: "Appendix", name: "Why now & audiences", html: appx("Why now &amp; audiences", t(43, 96, 300, 0, `<div style="font:600 10px ${FF};letter-spacing:.12em;color:#6B7280">WHY NOW</div><div style="font:400 15px/1.5 ${FF};color:${D};margin-top:8px">${esc(mh.found)}</div>`)
    + t(380, 96, 537, 0, mh.aud.map(([a, m]) => `<div style="border-top:1px solid #E5E7EB;padding:9px 0"><div style="font:600 12.5px ${FF};color:${D}">${esc(a)}</div><div style="font:400 11px/1.45 ${FF};margin-top:2px">${esc(m)}</div></div>`).join("")), ++an) });
  const MF = p.content?.mf, IC = p.content?.icp || [];
  if (MF?.goals?.length) { const GL = MF.goals.slice(0, 5), cw = Math.floor((874 - (GL.length - 1) * 12) / GL.length);
    S.push({ group: "Appendix", name: "Messaging framework", html: appx("Messaging framework", t(43, 88, 874, 56, `<div style="height:56px;background:${D};color:#fff;display:flex;align-items:center;gap:18px;padding:0 18px"><span style="font:600 9px ${FF};letter-spacing:.14em;color:${AD};flex:none">POSITIONING</span><span style="font:500 13px/1.35 ${FF}">${esc(MF.positioning)}</span></div>`)
      + t(43, 160, 874, 0, `<div style="display:flex;gap:12px">${GL.map((g, i) => `<div style="width:${cw}px;border-top:3px solid ${i ? A : SP};padding-top:8px"><div style="font:600 9px ${FF};letter-spacing:.12em;color:#6B7280">${esc(String(g.t).toUpperCase())} · GOAL ${esc(g.n)}</div><div style="font:500 12px/1.4 ${FF};color:${D};margin-top:6px">${esc(g.key)}</div><div style="font:400 9.5px/1.45 ${FF};color:#4B5563;margin-top:8px">${(g.proof || []).map(q => esc(q[0])).join(" · ")}</div><div style="font:italic 600 11px/1.35 ${FF};color:${D};margin-top:10px">${g.bite ? "“" + esc(g.bite) + "”" : ""}</div></div>`).join("")}</div>`)
      + (MF.crosscut ? t(43, 474, 760, 0, `<div style="font:400 9px/1.4 ${FF};color:#6B7280">${esc(MF.crosscut)}</div>`) : ""), ++an) }); }
  if (IC.length) S.push({ group: "Appendix", name: "ICPs", html: appx("Ideal customer profiles", t(43, 92, 874, 0, `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">${IC.slice(0, 6).map(c => `<div style="border:1px solid #E5E7EB;padding:10px 12px;height:178px;overflow:hidden"><div style="font:600 12.5px ${FF};color:${D}">${esc(c.name)}</div><div style="font:400 9px ${FF};color:#6B7280;margin-top:2px">${esc(c.kind || "")} · ${esc(lst(c.goals).join(", "))}</div><div style="font:400 10px/1.4 ${FF};margin-top:6px">${esc(c.who)}</div><div style="font:600 10px/1.4 ${FF};color:${D};margin-top:6px">${esc(c.lead)}</div><div style="font:400 9.5px ${FF};color:#4B5563;margin-top:6px">CTA · ${esc(c.cta)}</div></div>`).join("")}</div>`), ++an) });
  S.push({ group: "Appendix", name: "Boilerplates", html: appx("Boilerplates", t(43, 92, 874, 0, `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">${bp.map(b => `<div style="border:1px solid #E5E7EB;padding:10px 12px;min-height:${b.max > 50 ? 200 : 96}px"><div style="font:600 10px ${FF};letter-spacing:.1em;color:#6B7280">${esc(b.l.toUpperCase())} · ${words(b.t)} WORDS</div><div style="font:400 ${b.max > 50 ? 10 : 11.5}px/1.45 ${FF};margin-top:6px">${esc(b.t)}</div></div>`).join("")}</div>`), ++an) });
  const fq = answered.slice(0, 6);
  S.push({ group: "Appendix", name: "FAQ", html: appx("FAQ", t(43, 92, 874, 0, `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 22px">${fq.map(([q, a]) => `<div><div style="font:600 12px ${FF};color:${D}">${esc(q)}</div><div style="font:400 10.5px/1.45 ${FF};margin-top:3px">${esc(a)}</div></div>`).join("")}</div>`), ++an) });
  S.push({ group: "Appendix", name: "Brand kit", html: appx("Brand kit", t(43, 92, 420, 0, `<div style="display:flex;gap:10px"><div style="flex:1;height:96px;border:1px solid #E5E7EB;display:flex;align-items:center;justify-content:center">${lock(22)}</div><div style="flex:1;height:96px;background:${D};display:flex;align-items:center;justify-content:center">${lock(22, true)}</div></div>
      <div style="display:flex;gap:8px;margin-top:14px">${k.colors.map(([n, h]) => `<div style="flex:1"><div style="height:56px;background:${h};border:1px solid #E5E7EB"></div><div style="font:600 9.5px ${FF};margin-top:4px">${esc(n)}</div><div style="font:400 9px ${FF};color:#6B7280">${h}</div></div>`).join("")}</div>
      <div style="margin-top:14px;font:500 26px ${FF};color:${D}">${esc(F)}</div><div style="font:400 10px/1.4 ${FF};color:#6B7280">${esc(k.fontNote)}</div>`)
    + t(500, 92, 417, 0, `<div style="font:600 10px ${FF};letter-spacing:.12em;color:#6B7280">VOICE</div>${k.attrs.map(([a, x]) => `<div style="border-top:1px solid #E5E7EB;padding:8px 0"><div style="font:600 12.5px ${FF};color:${D}">${esc(a)}</div><div style="font:400 10.5px/1.4 ${FF}">${esc(x)}</div></div>`).join("")}`), ++an) });
  S.push({ group: "Template", name: "Title slide", html: slide(D, t(60, 42, 400, 0, lock(28, true)) + t(60, 196, 800, 0, `<div style="font:500 46px/1.1 ${FF};color:#fff">Presentation title</div><div style="font:400 20px ${FF};color:${SOFT};margin-top:14px">Subtitle or event name</div>`)
    + t(60, 452, 600, 0, `<div style="font:400 12px ${FF};color:${SOFT}">Presenter name · Date</div>`) + `<div style="position:absolute;left:0;bottom:0;width:960px;height:20px;background:${A}"></div>`) });
  S.push({ group: "Template", name: "Section header", html: slide("#FFFFFF", `<div style="position:absolute;left:0;top:0;width:330px;height:540px;background:${D}"></div>` + t(60, 200, 240, 0, `<div style="font:500 96px/1 ${FF};color:${AD}">01</div>`)
    + t(390, 210, 520, 0, `<div style="font:500 40px/1.1 ${FF};color:${D}">Section title</div><div style="font:400 16px ${FF};color:#6B7280;margin-top:12px">One line on what this section covers</div>`) + t(60, 480, 240, 0, lock(18, true))) });
  S.push({ group: "Template", name: "Content slide", html: slide("#FFFFFF", t(60, 46, 840, 0, `<div style="font:500 30px ${FF};color:${D}">Slide title in sentence case</div>`) + `<div style="position:absolute;left:60px;top:96px;width:60px;height:4px;background:${A}"></div>`
    + t(60, 130, 430, 0, `<ul style="margin:0;padding-left:20px;font:400 17px/1.7 ${FF};color:#1F2937">${mh.pillars.map(x => `<li>${esc(x.t)}</li>`).join("")}<li>One idea per bullet, no more than five</li></ul>`)
    + t(540, 130, 360, 300, `<div style="height:300px;background:#F3F4F6;border:1px dashed #6B7280;display:flex;align-items:center;justify-content:center;font:400 12px ${FF};color:#4B5563">Image, chart or diagram</div>`)
    + t(60, 498, 300, 0, lock(14)) + t(820, 502, 80, 0, `<div style="text-align:right;font:400 10px ${FF};color:#6B7280">04</div>`)) });
  const X = ptExtras(p), foot = (n) => t(60, 498, 300, 0, lock(14)) + t(820, 502, 80, 0, `<div style="text-align:right;font:400 10px ${FF};color:#6B7280">${n}</div>`);
  const titleBar = txt => t(60, 46, 840, 0, `<div style="font:500 30px ${FF};color:${D}">${txt}</div>`) + `<div style="position:absolute;left:60px;top:96px;width:60px;height:4px;background:${A}"></div>`;
  const grid = `<div style="position:absolute;inset:0;background-image:linear-gradient(${A}26 1px,transparent 1px),linear-gradient(90deg,${A}26 1px,transparent 1px);background-size:36px 36px"></div>`;
  S.splice(S.findIndex(x => x.name === "Section header"), 0, { group: "Template", name: "Agenda", html: slide("#FFFFFF", titleBar("Agenda") + t(60, 130, 840, 0, X.agenda.map((a, i) => `<div style="display:flex;gap:22px;align-items:baseline;border-top:1px solid #E5E7EB;padding:9px 0"><span style="font:500 22px ${FF};color:${AL};width:44px">${String(i + 1).padStart(2, "0")}</span><span style="font:400 19px ${FF};color:#1F2937">${esc(a)}</span></div>`).join("")) + foot("02")) });
  S.push({ group: "Template", name: "Two columns", html: slide("#FFFFFF", titleBar("Two ideas side by side") + [["The problem", X.problem], [`What ${esc(X.short)} does`, X.solution]].map(([h, b], i) => t(60 + i * 430, 130, 400, 0, `<div style="border-top:4px solid ${i ? A : "#D1D5DB"};padding-top:12px"><div style="font:600 18px ${FF};color:${D}">${h}</div><div style="font:400 15px/1.55 ${FF};color:#1F2937;margin-top:10px">${esc(b)}</div></div>`)).join("") + foot("05")) });
  S.push({ group: "Template", name: "Big statement", html: slide(D, grid + t(80, 150, 800, 0, `<div style="font:600 12px ${FF};letter-spacing:.16em;color:${AD}">${esc(mh.line.toUpperCase())}</div><div style="font:500 36px/1.25 ${FF};color:#fff;margin-top:16px">${esc(mh.umbrella)}</div>`) + t(80, 470, 300, 0, lock(16, true))) });
  S.push({ group: "Template", name: "Key numbers", html: slide("#FFFFFF", titleBar("By the numbers") + t(60, 150, 840, 0, `<div style="display:grid;grid-template-columns:repeat(${X.nums.length},1fr);gap:24px">${X.nums.map(n => `<div style="border-top:4px solid ${A};padding-top:14px"><div style="font:600 ${X.nums.length > 3 ? 34 : 44}px/1.05 ${FF};color:${D};white-space:nowrap">${esc(n.n)}</div><div style="font:400 13px/1.45 ${FF};color:#4B5563;margin-top:10px">${esc(n.l)}</div></div>`).join("")}</div>`) + t(60, 440, 840, 0, `<div style="font:400 10px ${FF};color:#6B7280">Source: the project\'s key numbers.</div>`) + foot("07")) });
  S.push({ group: "Template", name: "Quote", html: slide("#FFFFFF", `<div style="position:absolute;left:0;top:0;width:18px;height:540px;background:${A}"></div>` + t(100, 110, 760, 0, `<div style="font:500 90px/0.6 ${FF};color:${AL}">“</div><div style="font:500 30px/1.35 ${FF};color:${D};margin-top:10px">${esc(X.quote)}</div><div style="font:400 15px ${FF};color:#6B7280;margin-top:22px">${esc(X.who)}</div>`) + foot("08")) });
  S.push({ group: "Template", name: "Full-bleed image", html: slide("#111827", `<div style="position:absolute;inset:0;background:linear-gradient(135deg,#374151,#111827)"></div><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:400 14px ${FF};color:${SOFT}">Photo: real people at a real event</div>` + `<div style="position:absolute;left:0;right:0;bottom:0;height:120px;background:linear-gradient(transparent,rgba(0,0,0,.7))"></div>` + t(60, 450, 700, 0, `<div style="font:500 24px ${FF};color:#fff">A short caption about the moment</div>`) + t(780, 466, 140, 0, `<div style="display:flex;justify-content:flex-end">${lock(14, true)}</div>`)) });
  S.push({ group: "Template", name: "Member logos", html: slide("#FFFFFF", titleBar("Our members") + [["Premier", 4, 150], ["General", 6, 300]].map(([tier, n, y]) => t(60, y, 840, 0, `<div style="font:600 11px ${FF};letter-spacing:.14em;color:#6B7280">${tier.toUpperCase()} MEMBERS</div><div style="display:grid;grid-template-columns:repeat(${n},1fr);gap:12px;margin-top:10px">${Array.from({ length: n }, () => `<div style="height:${tier === "Premier" ? 84 : 62}px;border:1px dashed #6B7280;border-radius:6px;display:flex;align-items:center;justify-content:center;font:400 11px ${FF};color:#6B7280">[Logo]</div>`).join("")}</div>`)).join("") + foot("10")) });
  S.push({ group: "Template", name: "Timeline", html: slide("#FFFFFF", titleBar("Roadmap") + `<div style="position:absolute;left:80px;right:80px;top:268px;height:3px;background:#E5E7EB"></div>` + X.tl.map((m, i) => { const [dte, ms] = m.split(" · "); return t(70 + i * 168, 254, 150, 0, `<div style="width:30px;height:30px;background:${i === 1 ? A : "#fff"};border:3px solid ${i === 1 ? A : D}"></div><div style="font:600 13px ${FF};color:${D};margin-top:16px">${esc(dte)}</div><div style="font:400 13px/1.4 ${FF};color:#4B5563;margin-top:4px">${esc(ms)}</div>`); }).join("") + foot("11")) });
  S.push({ group: "Template", name: "Closing", html: slide(D, grid + t(80, 120, 800, 0, lock(30, true)) + t(80, 230, 800, 0, `<div style="font:500 44px/1.1 ${FF};color:#fff">${esc(mh.line)}</div><div style="font:400 18px ${FF};color:${SOFT};margin-top:18px">Get involved at <b style="color:#fff">${esc(p.url)}</b></div>`) + t(780, 360, 120, 120, `<div style="width:120px;height:120px;border:1.5px dashed ${SOFT};display:flex;align-items:center;justify-content:center;font:400 11px ${FF};color:${SOFT}">QR code</div>`) + `<div style="position:absolute;left:0;bottom:0;width:960px;height:20px;background:${A}"></div>`) });
  return S;
}
function pptxDeck(pptx, p) {
  const { mh, bp, k, answered, D, A, SP, F, AD, AL, SOFT } = ptModel(p), d = hx(D), a = hx(A), sp = hx(SP), aD = hx(AD), aL = hx(AL), soft = hx(SOFT), W = "FFFFFF", G = "6B7280", INK = "1F2937";
  pptx.layout = "LAYOUT_WIDE"; pptx.title = p.name + " presentation template"; pptx.company = p.name; pptx.author = "MarketingOS";
  const PNG = p._png, logo = (x, y, s, onDark) => PNG ? [{ image: { x, y, h: s * 1.2, w: s * 1.2 * PNG.ratio, data: (onDark ? PNG.dark : PNG.light), altText: p.name + " logo" } }] : logo0(x, y, s, onDark);
  const logo0 = (x, y, s, onDark) => [{ rect: { x, y, w: s, h: s, fill: { color: onDark ? W : d } } }, { text: { text: k.word[0], options: { x, y, w: s, h: s, align: "center", valign: "middle", fontFace: F, fontSize: Math.round(s * 40), bold: true, color: onDark ? d : W, margin: 0 } } },
    { text: { text: k.word, options: { x: x + s * 1.3, y, w: 4, h: s, valign: "middle", fontFace: F, fontSize: Math.round(s * 36), bold: true, color: onDark ? W : d, charSpacing: 3, margin: 0 } } }];
  const num = { x: 12.3, y: 7.0, w: 0.6, h: 0.3, fontFace: F, fontSize: 9, color: "6B7280", align: "right" };
  pptx.defineSlideMaster({ title: "TITLE", background: { color: d }, objects: [...logo(0.83, 0.6, 0.4, true), { rect: { x: 0, y: 7.22, w: 13.333, h: 0.28, fill: { color: a } } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.83, y: 2.4, w: 11, h: 1.5, fontFace: F, fontSize: 44, color: W, valign: "bottom", margin: 0 }, text: "Presentation title" } },
    { placeholder: { options: { name: "subtitle", type: "body", align: "left", x: 0.83, y: 4.0, w: 11, h: 0.7, fontFace: F, fontSize: 20, color: soft, margin: 0 }, text: "Subtitle or event name" } },
    { placeholder: { options: { name: "presenter", type: "body", x: 0.83, y: 6.1, w: 8, h: 0.4, fontFace: F, fontSize: 12, color: soft, margin: 0 }, text: "Presenter name · Date" } }] });
  pptx.defineSlideMaster({ title: "SECTION", background: { color: W }, objects: [{ rect: { x: 0, y: 0, w: 4.58, h: 7.5, fill: { color: d } } }, ...logo(0.83, 6.6, 0.28, true),
    { placeholder: { options: { name: "number", type: "body", x: 0.83, y: 2.6, w: 3.4, h: 1.4, fontFace: F, fontSize: 80, color: aD, margin: 0 }, text: "01" } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 5.4, y: 2.7, w: 7.2, h: 1.0, fontFace: F, fontSize: 38, color: d, margin: 0 }, text: "Section title" } },
    { placeholder: { options: { name: "body", type: "body", x: 5.4, y: 3.8, w: 7.2, h: 0.6, fontFace: F, fontSize: 16, color: G, margin: 0 }, text: "One line on what this section covers" } }] });
  pptx.defineSlideMaster({ title: "CONTENT", background: { color: W }, slideNumber: num, objects: [...logo(0.83, 6.95, 0.2, false), { rect: { x: 0.83, y: 1.33, w: 0.83, h: 0.06, fill: { color: a } } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.83, y: 0.5, w: 11.6, h: 0.7, fontFace: F, fontSize: 28, color: d, margin: 0 }, text: "Slide title in sentence case" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.83, y: 1.8, w: 6.0, h: 4.6, fontFace: F, fontSize: 17, color: INK, margin: 0 }, text: "Bullet text" } },
    { placeholder: { options: { name: "visual", type: "pic", x: 7.5, y: 1.8, w: 5.0, h: 4.17 }, text: "Image, chart or diagram" } }] });
  pptx.defineSlideMaster({ title: "APPENDIX", background: { color: W }, slideNumber: num, objects: [{ rect: { x: 0, y: 0, w: 0.08, h: 7.5, fill: { color: a } } },
    { text: { text: "APPENDIX · BRAND REFERENCE · DELETE BEFORE PRESENTING", options: { x: 0.6, y: 0.25, w: 9, h: 0.3, fontFace: F, fontSize: 8, bold: true, color: d, charSpacing: 2, margin: 0 } } }] });
  const T = (s, text, o) => s.addText(text, { fontFace: F, color: INK, margin: 0, valign: "top", ...o });
  const head = (s, txt) => T(s, txt, { x: 0.6, y: 0.6, w: 12, h: 0.55, fontSize: 26, bold: true, color: d });
  // appendix first
  let s = pptx.addSlide({ masterName: "TITLE" });
  s.addText("Brand reference", { placeholder: "title" }); s.addText("Start here. These slides hold the message house, boilerplates, FAQ and brand kit for writing this deck. Hide or delete them before presenting.", { placeholder: "subtitle", fontSize: 14 });
  s.addText("Appendix", { placeholder: "presenter" });
  s = pptx.addSlide({ masterName: "APPENDIX" }); head(s, "Message house");
  s.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.3, w: 12.1, h: 0.95, fill: { color: d } }); T(s, mh.umbrella, { x: 0.85, y: 1.3, w: 11.6, h: 0.95, valign: "middle", fontSize: 16, color: W });
  T(s, "Brand line · " + mh.line, { x: 0.6, y: 2.35, w: 12, h: 0.3, fontSize: 12, bold: true, color: d });
  mh.pillars.forEach((x, i) => { const X = 0.6 + i * 4.1;
    s.addShape(pptx.ShapeType.rect, { x: X, y: 2.8, w: 3.85, h: 0.05, fill: { color: i ? a : sp } });
    T(s, x.t, { x: X, y: 2.95, w: 3.85, h: 0.6, fontSize: 15, bold: true, color: d });
    T(s, x.m, { x: X, y: 3.6, w: 3.85, h: 1.0, fontSize: 11 });
    T(s, x.p.map(q => ({ text: q[0], options: { bullet: true, breakLine: true } })), { x: X, y: 4.65, w: 3.85, h: 2.2, fontSize: 9.5, color: "4B5563" }); });
  s = pptx.addSlide({ masterName: "APPENDIX" }); head(s, "Why now & audiences");
  T(s, "WHY NOW", { x: 0.6, y: 1.35, w: 4, h: 0.3, fontSize: 9, bold: true, color: G, charSpacing: 2 }); T(s, mh.found, { x: 0.6, y: 1.7, w: 4.3, h: 3.5, fontSize: 15, color: d });
  mh.aud.forEach(([au, m], i) => { T(s, au, { x: 5.3, y: 1.35 + i * 1.25, w: 7.4, h: 0.35, fontSize: 13, bold: true, color: d }); T(s, m, { x: 5.3, y: 1.72 + i * 1.25, w: 7.4, h: 0.8, fontSize: 11 }); });
  const MF = p.content?.mf, IC = p.content?.icp || [];
  if (MF?.goals?.length) { s = pptx.addSlide({ masterName: "APPENDIX" }); head(s, "Messaging framework");
    s.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.3, w: 12.1, h: 0.8, fill: { color: d } });
    T(s, "POSITIONING", { x: 0.8, y: 1.3, w: 1.5, h: 0.8, valign: "middle", fontSize: 8, bold: true, color: aD, charSpacing: 2 });
    T(s, MF.positioning || "", { x: 2.4, y: 1.3, w: 10.1, h: 0.8, valign: "middle", fontSize: 13, color: W });
    const GL = MF.goals.slice(0, 5), cw = 12.1 / GL.length;
    GL.forEach((g, i) => { const X = 0.6 + i * cw, w = cw - 0.2;
      s.addShape(pptx.ShapeType.rect, { x: X, y: 2.35, w, h: 0.05, fill: { color: i ? a : sp } });
      T(s, `${String(g.t).toUpperCase()} · GOAL ${g.n}`, { x: X, y: 2.48, w, h: 0.3, fontSize: 8.5, bold: true, color: G, charSpacing: 1 });
      T(s, g.key || "", { x: X, y: 2.85, w, h: 1.2, fontSize: 11.5, color: d });
      T(s, (g.proof || []).map(q => q[0]).join(" · "), { x: X, y: 4.1, w, h: 1.5, fontSize: 9, color: "4B5563" });
      T(s, g.bite ? `“${g.bite}”` : "", { x: X, y: 5.7, w, h: 0.8, fontSize: 11, bold: true, italic: true, color: d }); });
    if (MF.crosscut) T(s, MF.crosscut, { x: 0.6, y: 6.65, w: 11, h: 0.4, fontSize: 8.5, color: G }); }
  if (IC.length) { s = pptx.addSlide({ masterName: "APPENDIX" }); head(s, "Ideal customer profiles");
    IC.slice(0, 6).forEach((c, i) => { const X = 0.6 + (i % 3) * 4.1, Y = 1.35 + Math.floor(i / 3) * 2.75;
      s.addShape(pptx.ShapeType.rect, { x: X, y: Y, w: 3.9, h: 2.55, line: { color: "E5E7EB", width: 1 }, fill: { color: W } });
      T(s, c.name || "", { x: X + 0.15, y: Y + 0.12, w: 3.6, h: 0.35, fontSize: 12.5, bold: true, color: d });
      T(s, `${c.kind || ""} · ${lst(c.goals).join(", ")}`, { x: X + 0.15, y: Y + 0.47, w: 3.6, h: 0.25, fontSize: 8.5, color: G });
      T(s, c.who || "", { x: X + 0.15, y: Y + 0.75, w: 3.6, h: 0.75, fontSize: 9.5 });
      T(s, c.lead || "", { x: X + 0.15, y: Y + 1.5, w: 3.6, h: 0.65, fontSize: 9.5, bold: true, color: d });
      T(s, "CTA · " + (c.cta || ""), { x: X + 0.15, y: Y + 2.15, w: 3.6, h: 0.3, fontSize: 9, color: G }); }); }
  s = pptx.addSlide({ masterName: "APPENDIX" }); head(s, "Boilerplates");
  bp.forEach((b, i) => { const X = 0.6 + (i % 2) * 6.15, Y = i < 2 ? 1.3 : 2.85, H = i < 2 ? 1.4 : 3.9;
    s.addShape(pptx.ShapeType.rect, { x: X, y: Y, w: 5.95, h: H, line: { color: "E5E7EB", width: 1 }, fill: { color: W } });
    T(s, `${b.l.toUpperCase()} · ${words(b.t)} WORDS`, { x: X + 0.15, y: Y + 0.12, w: 5.6, h: 0.25, fontSize: 8.5, bold: true, color: G, charSpacing: 1 });
    T(s, b.t, { x: X + 0.15, y: Y + 0.42, w: 5.65, h: H - 0.5, fontSize: b.max > 50 ? 10.5 : 12 }); });
  for (let c = 0; c < Math.ceil(answered.length / 6); c++) {
    s = pptx.addSlide({ masterName: "APPENDIX" }); head(s, c ? "FAQ (continued)" : "FAQ");
    answered.slice(c * 6, c * 6 + 6).forEach(([q, an], i) => { const X = 0.6 + (i % 2) * 6.15, Y = 1.35 + Math.floor(i / 2) * 1.85;
      T(s, q, { x: X, y: Y, w: 5.9, h: 0.45, fontSize: 12.5, bold: true, color: d }); T(s, an, { x: X, y: Y + 0.48, w: 5.9, h: 1.3, fontSize: 10.5 }); });
  }
  s = pptx.addSlide({ masterName: "APPENDIX" }); head(s, "Brand kit");
  s.addShape(pptx.ShapeType.rect, { x: 0.6, y: 1.3, w: 2.85, h: 1.3, line: { color: "E5E7EB", width: 1 }, fill: { color: W } });
  s.addShape(pptx.ShapeType.rect, { x: 3.6, y: 1.3, w: 2.85, h: 1.3, fill: { color: d } });
  if (PNG) [[0.85, false], [3.85, true]].forEach(([x, dk]) => s.addImage({ data: dk ? PNG.dark : PNG.light, x, y: 1.7, h: 0.5, w: Math.min(2.4, 0.5 * PNG.ratio), altText: p.name + " logo" }));
  else [[0.85, false], [3.85, true]].forEach(([x, dk]) => { s.addShape(pptx.ShapeType.rect, { x, y: 1.75, w: 0.4, h: 0.4, fill: { color: dk ? W : d } }); T(s, k.word[0], { x, y: 1.75, w: 0.4, h: 0.4, align: "center", valign: "middle", fontSize: 16, bold: true, color: dk ? d : W });
    T(s, k.word, { x: x + 0.52, y: 1.75, w: 2.2, h: 0.4, valign: "middle", fontSize: 14, bold: true, color: dk ? W : d, charSpacing: 3 }); });
  const cw = 5.85 / k.colors.length;
  k.colors.forEach(([n, h], i) => { s.addShape(pptx.ShapeType.rect, { x: 0.6 + i * cw, y: 2.85, w: cw - 0.1, h: 0.75, fill: { color: hx(h) }, line: { color: "E5E7EB", width: 0.75 } });
    T(s, n, { x: 0.6 + i * cw, y: 3.65, w: cw - 0.1, h: 0.25, fontSize: 9, bold: true }); T(s, h, { x: 0.6 + i * cw, y: 3.88, w: cw - 0.1, h: 0.25, fontSize: 8.5, color: G }); });
  T(s, F, { x: 0.6, y: 4.35, w: 5.85, h: 0.6, fontSize: 28, color: d }); T(s, k.fontNote, { x: 0.6, y: 5.0, w: 5.85, h: 1.0, fontSize: 9.5, color: G });
  T(s, "VOICE", { x: 6.95, y: 1.3, w: 5, h: 0.3, fontSize: 9, bold: true, color: G, charSpacing: 2 });
  k.attrs.forEach(([at, x], i) => { T(s, at, { x: 6.95, y: 1.7 + i * 1.15, w: 5.8, h: 0.35, fontSize: 13, bold: true, color: d }); T(s, x, { x: 6.95, y: 2.05 + i * 1.15, w: 5.8, h: 0.7, fontSize: 10.5 }); });
  // nine more layouts: masters with placeholders, so they show in the layout menu
  const X = ptExtras(p), bar = { rect: { x: 0.83, y: 1.33, w: 0.83, h: 0.06, fill: { color: a } } }, ttl = txt => ({ placeholder: { options: { name: "title", type: "title", align: "left", x: 0.83, y: 0.5, w: 11.6, h: 0.7, fontFace: F, fontSize: 28, color: d, margin: 0 }, text: txt } });
  const ftr = [...logo(0.83, 6.95, 0.2, false)], gridLines = [];
  for (let i = 1; i < 26; i++) gridLines.push({ line: { x: i * 0.5, y: 0, w: 0, h: 7.5, line: { color: a, width: 0.5, transparency: 85 } } });
  for (let i = 1; i < 15; i++) gridLines.push({ line: { x: 0, y: i * 0.5, w: 13.333, h: 0, line: { color: a, width: 0.5, transparency: 85 } } });
  pptx.defineSlideMaster({ title: "AGENDA", background: { color: W }, slideNumber: num, objects: [...ftr, bar, ttl("Agenda"), { placeholder: { options: { name: "body", type: "body", x: 0.83, y: 1.8, w: 11.6, h: 4.8, fontFace: F, fontSize: 20, color: INK, margin: 0 }, text: "Agenda item" } }] });
  pptx.defineSlideMaster({ title: "TWO_COLUMNS", background: { color: W }, slideNumber: num, objects: [...ftr, bar, ttl("Two ideas side by side"), { rect: { x: 0.83, y: 1.8, w: 5.55, h: 0.06, fill: { color: "D1D5DB" } } }, { rect: { x: 6.8, y: 1.8, w: 5.55, h: 0.06, fill: { color: a } } },
    { placeholder: { options: { name: "left", type: "body", x: 0.83, y: 2.0, w: 5.55, h: 4.4, fontFace: F, fontSize: 15, color: INK, margin: 0 }, text: "Left column" } }, { placeholder: { options: { name: "right", type: "body", x: 6.8, y: 2.0, w: 5.55, h: 4.4, fontFace: F, fontSize: 15, color: INK, margin: 0 }, text: "Right column" } }] });
  pptx.defineSlideMaster({ title: "STATEMENT", background: { color: d }, objects: [...gridLines, ...logo(1.1, 6.5, 0.26, true), { placeholder: { options: { name: "eyebrow", type: "body", x: 1.1, y: 1.9, w: 11, h: 0.4, fontFace: F, fontSize: 12, bold: true, color: aD, charSpacing: 3, margin: 0 }, text: "EYEBROW" } },
    { placeholder: { options: { name: "statement", type: "title", align: "left", x: 1.1, y: 2.4, w: 11, h: 3.2, fontFace: F, fontSize: 36, color: W, valign: "top", margin: 0 }, text: "One big statement" } }] });
  pptx.defineSlideMaster({ title: "NUMBERS", background: { color: W }, slideNumber: num, objects: [...ftr, bar, ttl("By the numbers"), ...X.nums.map((_, i) => { const w = 11.6 / X.nums.length; return { rect: { x: 0.83 + i * w, y: 2.05, w: w - 0.3, h: 0.06, fill: { color: a } } }; }),
    ...X.nums.flatMap((_, i) => { const w = 11.6 / X.nums.length, x = 0.83 + i * w; return [{ placeholder: { options: { name: "n" + i, type: "body", x, y: 2.25, w: w - 0.3, h: 0.9, fontFace: F, fontSize: X.nums.length > 3 ? 32 : 40, bold: true, color: d, margin: 0, fit: "shrink" }, text: "00" } }, { placeholder: { options: { name: "l" + i, type: "body", x, y: 3.25, w: w - 0.3, h: 1.4, fontFace: F, fontSize: 13, color: "4B5563", margin: 0 }, text: "Label" } }]; })] });
  pptx.defineSlideMaster({ title: "QUOTE", background: { color: W }, slideNumber: num, objects: [...ftr, { rect: { x: 0, y: 0, w: 0.25, h: 7.5, fill: { color: a } } }, { text: { text: "“", options: { x: 1.3, y: 1.1, w: 1, h: 1, fontFace: F, fontSize: 96, color: aL, margin: 0 } } },
    { placeholder: { options: { name: "quote", type: "body", x: 1.4, y: 2.0, w: 10.4, h: 2.8, fontFace: F, fontSize: 30, color: d, margin: 0 }, text: "Quote" } }, { placeholder: { options: { name: "who", type: "body", x: 1.4, y: 5.0, w: 10.4, h: 0.5, fontFace: F, fontSize: 15, color: G, margin: 0 }, text: "Name · Title, Company" } }] });
  pptx.defineSlideMaster({ title: "IMAGE", background: { color: "111827" }, objects: [{ placeholder: { options: { name: "photo", type: "pic", x: 0, y: 0, w: 13.333, h: 7.5 }, text: "Photo" } }, { rect: { x: 0, y: 5.8, w: 13.333, h: 1.7, fill: { color: "000000", transparency: 40 } } },
    { placeholder: { options: { name: "caption", type: "body", x: 0.83, y: 6.15, w: 9.5, h: 0.6, fontFace: F, fontSize: 24, color: W, margin: 0 }, text: "Caption" } }, ...logo(11.0, 6.3, 0.2, true)] });
  pptx.defineSlideMaster({ title: "LOGOS", background: { color: W }, slideNumber: num, objects: [...ftr, bar, ttl("Our members"), { text: { text: "PREMIER MEMBERS", options: { x: 0.83, y: 2.0, w: 6, h: 0.3, fontFace: F, fontSize: 10, bold: true, color: G, charSpacing: 2, margin: 0 } } },
    ...Array.from({ length: 4 }, (_, i) => ({ rect: { x: 0.83 + i * 2.95, y: 2.4, w: 2.75, h: 1.15, line: { color: "6B7280", width: 1, dashType: "dash" }, fill: { color: W } } })),
    { text: { text: "GENERAL MEMBERS", options: { x: 0.83, y: 4.05, w: 6, h: 0.3, fontFace: F, fontSize: 10, bold: true, color: G, charSpacing: 2, margin: 0 } } },
    ...Array.from({ length: 6 }, (_, i) => ({ rect: { x: 0.83 + i * 1.96, y: 4.45, w: 1.8, h: 0.86, line: { color: "6B7280", width: 1, dashType: "dash" }, fill: { color: W } } }))] });
  pptx.defineSlideMaster({ title: "TIMELINE", background: { color: W }, slideNumber: num, objects: [...ftr, bar, ttl("Roadmap"), { rect: { x: 1.1, y: 3.72, w: 11.1, h: 0.04, fill: { color: "E5E7EB" } } },
    ...X.tl.flatMap((_, i) => [{ rect: { x: 0.98 + i * 2.33, y: 3.53, w: 0.42, h: 0.42, fill: { color: i === 1 ? a : W }, line: { color: i === 1 ? a : d, width: 2.5 }, rectRadius: 0.21 } },
      { placeholder: { options: { name: "d" + i, type: "body", x: 0.98 + i * 2.33, y: 4.15, w: 2.1, h: 0.35, fontFace: F, fontSize: 13, bold: true, color: d, margin: 0 }, text: "Month YYYY" } },
      { placeholder: { options: { name: "m" + i, type: "body", x: 0.98 + i * 2.33, y: 4.5, w: 2.1, h: 1.0, fontFace: F, fontSize: 13, color: "4B5563", margin: 0 }, text: "Milestone" } }])] });
  pptx.defineSlideMaster({ title: "CLOSING", background: { color: d }, objects: [...gridLines, ...logo(1.1, 1.65, 0.42, true), { rect: { x: 0, y: 7.22, w: 13.333, h: 0.28, fill: { color: a } } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 1.1, y: 2.5, w: 9.3, h: 1.9, fontFace: F, fontSize: 40, color: W, valign: "bottom", margin: 0 }, text: "Brand line" } },
    { placeholder: { options: { name: "ask", type: "body", x: 1.1, y: 4.6, w: 9.5, h: 0.6, fontFace: F, fontSize: 18, color: soft, margin: 0 }, text: "Get involved at …" } },
    { rect: { x: 10.85, y: 5.0, w: 1.65, h: 1.65, line: { color: "FFFFFF", width: 1, dashType: "dash", transparency: 50 }, fill: { type: "none" } } }, { text: { text: "QR code", options: { x: 10.85, y: 5.0, w: 1.65, h: 1.65, align: "center", valign: "middle", fontFace: F, fontSize: 10, color: soft } } }] });
  // example slides, in the order people build a deck
  s = pptx.addSlide({ masterName: "TITLE" }); s.addText("Presentation title", { placeholder: "title" }); s.addText("Subtitle or event name", { placeholder: "subtitle" }); s.addText("Presenter name · Date", { placeholder: "presenter" });
  s = pptx.addSlide({ masterName: "AGENDA" }); s.addText("Agenda", { placeholder: "title" }); s.addText(X.agenda.map((t, i) => ({ text: `${String(i + 1).padStart(2, "0")}   ${t}`, options: { breakLine: true } })), { placeholder: "body", paraSpaceAfter: 10 });
  s = pptx.addSlide({ masterName: "SECTION" }); s.addText("01", { placeholder: "number" }); s.addText("Section title", { placeholder: "title" }); s.addText("One line on what this section covers", { placeholder: "body" });
  s = pptx.addSlide({ masterName: "CONTENT" }); s.addText("Slide title in sentence case", { placeholder: "title" });
  s.addText(mh.pillars.map(x => x.t).concat(["One idea per bullet, no more than five"]).map(t => ({ text: t, options: { bullet: true, breakLine: true } })), { placeholder: "body" });
  s = pptx.addSlide({ masterName: "TWO_COLUMNS" }); s.addText("Two ideas side by side", { placeholder: "title" });
  s.addText([{ text: "The problem", options: { bold: true, fontSize: 18, color: d, breakLine: true } }, { text: X.problem }], { placeholder: "left" });
  s.addText([{ text: `What ${X.short} does`, options: { bold: true, fontSize: 18, color: d, breakLine: true } }, { text: X.solution }], { placeholder: "right" });
  s = pptx.addSlide({ masterName: "STATEMENT" }); s.addText(mh.line.toUpperCase(), { placeholder: "eyebrow" }); s.addText(mh.umbrella, { placeholder: "statement" });
  s = pptx.addSlide({ masterName: "NUMBERS" }); s.addText("By the numbers", { placeholder: "title" }); X.nums.forEach((n, i) => { s.addText(n.n, { placeholder: "n" + i }); s.addText(n.l, { placeholder: "l" + i }); });
  s = pptx.addSlide({ masterName: "QUOTE" }); s.addText(X.quote, { placeholder: "quote" }); s.addText(X.who, { placeholder: "who" });
  s = pptx.addSlide({ masterName: "IMAGE" }); s.addText("A short caption about the moment", { placeholder: "caption" });
  s = pptx.addSlide({ masterName: "LOGOS" }); s.addText("Our members", { placeholder: "title" });
  s = pptx.addSlide({ masterName: "TIMELINE" }); s.addText("Roadmap", { placeholder: "title" }); X.tl.forEach((m, i) => { const [dt, ms] = m.split(" · "); s.addText(dt, { placeholder: "d" + i }); s.addText(ms, { placeholder: "m" + i }); });
  s = pptx.addSlide({ masterName: "CLOSING" }); s.addText(mh.line, { placeholder: "title" }); s.addText("Get involved at " + p.url, { placeholder: "ask" });
  return pptx;
}
const deckName = p => p.name.replace(/\s*\(.*\)/, "").replace(/[^A-Za-z0-9]+/g, "_") + "_Presentation_Template";
module.exports = { ptModel, ptExtras, ptSlides, pptxDeck, deckName, hx, LAYOUTS };
