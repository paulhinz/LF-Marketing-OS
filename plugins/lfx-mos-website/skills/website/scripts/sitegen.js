/* sitegen.js — the lfx-mos-website engine.
   Runs in Node (build.js) and in the browser (edit.html embeds this file's source, so an edited site can be re-zipped offline).
   Ported from the Marketing OS Kit website mockup (SiteGen: same 11 pages, LF consent sign-up, JSON-LD, llms.txt) plus LF's required Transcend and Segment scripts,
   with WCAG 2.2 AA built in: every colour pair is derived from the brand kit and checked here, so copy edits can't break contrast.
   Keep this file free of the literal sequences "</scr" + "ipt" and "<!" + "--": it is embedded inside a script tag. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.SiteGen = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const VERSION = "0.5.0";

  /* ---------------------------------------------------------------- pages */
  const PAGES = [
    { key: "home", path: "/", title: "Home", type: "WebPage" },
    { key: "about", path: "/about/", title: "About", type: "AboutPage" },
    { key: "governing_board", path: "/about/governing-board/", title: "Governing Board", type: "WebPage", parent: "about" },
    { key: "technical_committee", path: "/about/technical-committee/", title: "Technical Committee", type: "WebPage", parent: "about" },
    { key: "members", path: "/about/members/", title: "Members", type: "CollectionPage", parent: "about" },
    { key: "contact", path: "/about/contact/", title: "Contact", type: "ContactPage", parent: "about" },
    { key: "events", path: "/events/", title: "Events", type: "CollectionPage" },
    { key: "blog", path: "/news/", title: "News", type: "CollectionPage" },
    { key: "get_involved", path: "/get-involved/", title: "Get involved", type: "WebPage" },
    { key: "join", path: "/join/", title: "Join", type: "WebPage" },
    { key: "campaign", path: "/campaign/", title: "Campaign", type: "WebPage" },
  ];
  const ABOUT_KIDS = ["governing_board", "technical_committee", "members", "contact"];
  const NAV = [{ key: "about", children: ABOUT_KIDS }, { key: "get_involved" }, { key: "events" }, { key: "blog" }];
  const byKey = k => PAGES.find(p => p.key === k);

  /* ---------------------------------------------------------------- text helpers */
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const text = s => String(s ?? "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  const slug = s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "project";
  const clip = (s, n) => { s = text(s); if (s.length <= n) return s; const c = s.slice(0, n - 1); return c.slice(0, c.lastIndexOf(" ") > n * .6 ? c.lastIndexOf(" ") : c.length).replace(/[,;:.\s]+$/, "") + "…"; };
  const cleanDomain = d => String(d || "").replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const isPlaceholder = s => /\[[^\]"]{1,80}\]/.test(String(s || ""));
  const has = s => text(s).length > 0;
  /* only http(s), mailto, in-page anchors and site paths become links; anything else (a [placeholder], javascript:) becomes "#" */
  const safeUrl = u => { u = String(u || "").trim(); return /^(https?:\/\/|mailto:|#|\/)/i.test(u) && !/^\/\//.test(u) ? u : "#"; };

  /* ---------------------------------------------------------------- colour + WCAG */
  const hex6 = h => { h = String(h || "").trim().replace("#", ""); if (h.length === 3) h = h.split("").map(c => c + c).join(""); return /^[0-9a-f]{6}$/i.test(h) ? "#" + h.toUpperCase() : null; };
  const rgbOf = h => { h = hex6(h).slice(1); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
  const toHex = rgb => "#" + rgb.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("").toUpperCase();
  const lum = h => rgbOf(h).map(v => v / 255).map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((s, v, i) => s + v * [.2126, .7152, .0722][i], 0);
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + .05) / (y + .05); };
  const mix = (a, b, t) => { const A = rgbOf(a), B = rgbOf(b); return toHex(A.map((v, i) => v + (B[i] - v) * t)); };
  /* the colour nearest `fg` (same hue, toward black or white) that reaches `min` against `bg` */
  function ink(fg, bg, min = 4.5) {
    fg = hex6(fg) || "#000000"; bg = hex6(bg) || "#FFFFFF";
    if (ratio(fg, bg) >= min) return fg;
    const target = ratio("#FFFFFF", bg) >= ratio("#000000", bg) ? "#FFFFFF" : "#000000";
    for (let t = .02; t <= 1.0001; t += .02) { const c = mix(fg, target, t); if (ratio(c, bg) >= min) return c; }
    return target;
  }
  const onColor = bg => ratio("#FFFFFF", bg) >= ratio("#111827", bg) ? "#FFFFFF" : "#111827";

  /* Accessible working tokens. Brand colours are kept wherever they already pass; each substitution is noted. */
  function tokens(b) {
    b = b || {};
    const T = { notes: [] }, note = (w, a, c) => { if (a !== c) T.notes.push(`${w}: ${a} shown as ${c}`); };
    const dark0 = hex6(b.dark) || "#111827", acc0 = hex6(b.accent) || dark0, spk0 = hex6(b.spark) || acc0;
    T.dark = ink(dark0, "#FFFFFF", 4.5); note("dark ground (white text on it)", dark0, T.dark);
    T.surface = "#FFFFFF";
    T.mist = mix(T.dark, "#FFFFFF", .955);
    T.hair = mix(T.dark, "#FFFFFF", .86);
    T.heading = ink(T.dark, T.mist, 4.5);
    T.text = ink(mix(T.dark, "#334155", .7), T.mist, 7);
    T.muted = ink(mix(T.dark, "#5B6576", .8), T.mist, 4.5);
    T.link = ink(acc0, T.mist, 4.5); note("accent as text on light grounds", acc0, T.link);
    const lab = onColor(acc0);
    if (ratio(acc0, lab) >= 4.5) { T.btn = acc0; T.onBtn = lab; } else { T.btn = ink(acc0, "#FFFFFF", 4.5); T.onBtn = "#FFFFFF"; note("button fill (label reaches 4.5:1)", acc0, T.btn); }
    T.btnEdge = ratio(T.btn, "#FFFFFF") >= 3 ? T.btn : ink(T.btn, "#FFFFFF", 3);
    if (ratio(T.btn, T.dark) >= 3) { T.btnD = T.btn; T.onBtnD = T.onBtn; }
    else {
      const s = ratio(spk0, T.dark) >= 3 && ratio(spk0, onColor(spk0)) >= 4.5 ? spk0 : "#FFFFFF";
      T.btnD = s; T.onBtnD = s === "#FFFFFF" ? T.dark : onColor(s);
      note("button fill on dark grounds (3:1 against the ground)", T.btn, T.btnD);
    }
    T.hl = ink(spk0, T.dark, 4.5); note("highlight as text on dark grounds", spk0, T.hl);
    T.softOnDark = ink(mix("#FFFFFF", T.dark, .2), T.dark, 4.5);
    T.field = ink(mix(T.dark, "#8A94A6", .6), "#FFFFFF", 3);
    /* hero glow: the highlight blended into the dark ground, only as strong as white, highlight and soft text allow */
    T.glow = T.dark;
    for (let t = .34; t > 0; t -= .02) { const c = mix(T.dark, T.hl, t); if (ratio("#FFFFFF", c) >= 4.5 && ratio(T.hl, c) >= 4.5 && ratio(T.softOnDark, c) >= 4.5 && ratio(T.btnD, c) >= 3) { T.glow = c; break; } }
    T.spark = spk0;
    /* the pairs the stylesheet actually uses, for the report */
    T.pairs = [
      ["Body text on white", T.text, "#FFFFFF", 4.5], ["Body text on light band", T.text, T.mist, 4.5], ["Headings on light band", T.heading, T.mist, 4.5],
      ["Secondary text on light band", T.muted, T.mist, 4.5], ["Links and eyebrows on white", T.link, "#FFFFFF", 4.5], ["Links and eyebrows on light band", T.link, T.mist, 4.5],
      ["Button label on button", T.onBtn, T.btn, 4.5], ["Button edge on white", T.btnEdge, "#FFFFFF", 3], ["Button label on dark-ground button", T.onBtnD, T.btnD, 4.5],
      ["Dark-ground button on dark ground", T.btnD, T.dark, 3], ["White text on dark ground", "#FFFFFF", T.dark, 4.5], ["Highlight text on dark ground", T.hl, T.dark, 4.5],
      ["Soft text on dark ground", T.softOnDark, T.dark, 4.5], ["White text on hero glow", "#FFFFFF", T.glow, 4.5], ["Form field border on white", T.field, "#FFFFFF", 3],
      ["Focus ring on light grounds", T.link, T.mist, 3], ["Focus ring on dark grounds", "#FFFFFF", T.dark, 3],
    ].map(([what, fg, bg, min]) => ({ what, fg, bg, min, ratio: +ratio(fg, bg).toFixed(2), pass: ratio(fg, bg) >= min - .005 }));
    return T;
  }

  /* ---------------------------------------------------------------- logos (real files only; never drawn) */
  let svgCount = 0;
  function sanitizeSvg(svg) {
    if (!svg || !/<svg[\s>]/i.test(svg)) return "";
    const rules = {};
    String(svg).replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (m, css) => {
      css.replace(/([^{}]+)\{([^}]*)\}/g, (mm, sels, body) => {
        const decl = {}; body.split(";").forEach(d => { const i = d.indexOf(":"); if (i > 0) decl[d.slice(0, i).trim()] = d.slice(i + 1).trim(); });
        sels.split(",").map(x => x.trim().replace(/^\./, "")).filter(Boolean).forEach(c => { rules[c] = Object.assign(rules[c] || {}, decl); });
        return "";
      }); return "";
    });
    const pre = "lg" + (++svgCount) + "-";
    svg = String(svg).replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/\sclass="([^"]+)"/g, (m, cls) => { const d = {}; cls.split(/\s+/).forEach(c => Object.assign(d, rules[c] || {}));
        return Object.entries(d).filter(([k]) => /^(fill|opacity|fill-opacity|stroke|stroke-width|fill-rule|clip-rule)$/.test(k)).map(([k, v]) => ` ${k}="${v}"`).join(""); })
      .replace(/\sid="([^"]+)"/g, ' id="' + pre + '$1"').replace(/url\(#([^)]+)\)/g, "url(#" + pre + "$1)").replace(/href="#([^"]+)"/g, 'href="#' + pre + '$1"');
    return svg.replace(/<\?xml[\s\S]*?\?>/g, "").replace(/<\!--[\s\S]*?--\>/g, "").replace(/<[s]cript[\s\S]*?<\/[s]cript\s*>/gi, "").replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "")
      .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "").replace(/(href|xlink:href)\s*=\s*"javascript:[^"]*"/gi, "").trim();
  }
  /* WCAG 1.4.11: parts of a logo under 3:1 against their ground are recoloured white (dark grounds) or near-black (light) */
  function fixLogo(svg, ground, min = 3) {
    if (!svg || !hex6(ground)) return svg;
    const g = hex6(ground), swap = onColor(g);
    const norm = c => { c = c.trim(); if (/^rgba?\(/i.test(c)) { const n = c.match(/[\d.]+/g).map(Number); return toHex(n.slice(0, 3)); } return hex6(c); };
    let out = String(svg).replace(/((?:fill|stroke|stop-color|color)\s*[:=]\s*["']?\s*)(#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|rgba?\([^)]*\))/gi, (m, pre, c) => {
      const h = norm(c); if (!h || ratio(h, g) >= min) return m; return pre + swap; });
    if (ratio("#000000", g) < min && !/<svg\b[^>]*\sfill=/i.test(out)) out = out.replace(/<svg\b/i, `<svg fill="${swap}"`);
    return out;
  }
  function sizeSvg(svg, h) {
    const vb = svg.match(/viewBox="([^"]+)"/); if (!vb) return svg;
    const [, , w, hh] = vb[1].trim().split(/[\s,]+/).map(Number); if (!w || !hh) return svg;
    const width = Math.round(h * w / hh);
    return svg.replace(/<svg\b([^>]*)>/, (m, attrs) => `<svg${attrs.replace(/\s(width|height)="[^"]*"/g, "")} width="${width}" height="${h}">`);
  }
  const cropSvg = (svg, vb) => svg.replace(/viewBox="[^"]+"/, `viewBox="${vb}"`);
  function logoFiles(site) {
    const b = site.brand || {}, T = tokens(b), out = {};
    const light = sanitizeSvg(b.logo_light), dark = sanitizeSvg(b.logo_dark) || light;
    if (light) out["logo.svg"] = sizeSvg(fixLogo(light, "#FFFFFF"), 40);
    if (dark) out["logo-reversed.svg"] = sizeSvg(fixLogo(dark, T.dark), 40);
    if (light && b.symbol) out["favicon.svg"] = cropSvg(fixLogo(light, "#FFFFFF"), b.symbol).replace(/\s(width|height)="[^"]*"/g, "");
    return out;
  }
  const dataUri = svg => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

  /* ---------------------------------------------------------------- content -> site.json */
  function defaults(project) {
    const n = project.name || "Project", s = project.short || n, dom = cleanDomain(project.domain) || "example.org";
    return {
      version: 1,
      project: { name: n, short: s, domain: cleanDomain(project.domain), tagline: `${n}, a Linux Foundation project`, description: `${n} brings organizations together to build open source that matters.`,
        legal: `Copyright © The Linux Foundation and its contributors. ${n} is a Linux Foundation project. For trademark usage, see linuxfoundation.org/legal/trademark-usage.` },
      brand: {},
      social: { github: "", linkedin: "", x: "", slack: "" },
      signup: { headline: `Get ${s} news in your inbox`, text: "Releases, events and community news. No more than twice a month.", button: "Subscribe",
        consent: "I agree to receive email from the Linux Foundation and this project. I can unsubscribe at any time.", endpoint: "" },
      announcement: { text: "", link: "" },
      pages: {
        home: {
          seo_title: `${n}: a Linux Foundation project`, seo_description: "",
          hero: { eyebrow: "A Linux Foundation project", headline: n, sub: "", cta_primary: "Join " + s, cta_secondary: "Learn more" },
          pillars_eyebrow: "What we do", pillars_title: "Why " + s,
          pillars: [{ title: "[Pillar one]", text: "[What the project does, in one or two sentences.]", points: [] }],
          stats: [], members_title: "Supported by",
          cta: { headline: "Help shape what comes next.", text: `Join the organizations building ${s} in the open.`, button: "Become a member" },
          faq: [],
        },
        about: { seo_description: `About ${n}: mission, governance and how to take part.`, eyebrow: "About", headline: `About ${s}`, intro: "",
          sections: [{ title: "Open governance", text: `${n} is hosted by the Linux Foundation under a vendor-neutral governance model. A Governing Board oversees budget and strategy; a Technical Committee guides the technical direction.` }],
          audiences_title: "Who it's for", audiences: [] },
        governing_board: { seo_description: `The ${n} Governing Board.`, eyebrow: "About", headline: "Governing Board", intro: `The Governing Board sets ${s}'s strategy, budget and policies.`,
          people: [{ name: "[Name]", role: "Chair", title: "[Title]", org: "[Organization]" }, { name: "[Name]", role: "", title: "[Title]", org: "[Organization]" }, { name: "[Name]", role: "", title: "[Title]", org: "[Organization]" }] },
        technical_committee: { seo_description: `The ${n} Technical Committee.`, eyebrow: "About", headline: "Technical Committee", intro: "The Technical Committee oversees technical direction, project lifecycle and contribution standards.",
          people: [{ name: "[Name]", role: "Chair", title: "[Title]", org: "[Organization]" }, { name: "[Name]", role: "", title: "[Title]", org: "[Organization]" }], charter_url: "" },
        members: { seo_description: `Organizations supporting ${n}.`, eyebrow: "About", headline: "Members", intro: `${s} is supported by organizations across the industry.`,
          tiers: [{ name: "Premier", members: ["[Member]", "[Member]", "[Member]"] }, { name: "General", members: ["[Member]", "[Member]", "[Member]", "[Member]"] }] },
        contact: { seo_description: `Contact ${n}.`, eyebrow: "About", headline: "Contact", intro: "Questions about membership, events or press? Reach the right team below.",
          channels: [{ label: "Membership", value: `[membership@${dom}]` }, { label: "Press", value: "pr@linuxfoundation.org" }, { label: "General", value: `[info@${dom}]` }] },
        events: { seo_description: `${n} events.`, eyebrow: "Community", headline: "Events", intro: "Meet the community in person and online.",
          items: [{ name: "[Event name]", date: "[Date]", location: "[City or Virtual]", url: "" }] },
        blog: { seo_description: `News and announcements from ${n}.`, eyebrow: "Resources", headline: "News", intro: "Announcements, releases and updates from the community.",
          posts: [{ title: "[Launch announcement]", date: "[Date]", author: "[Author]", excerpt: "[One-sentence summary of the post.]", url: "" }] },
        get_involved: { seo_description: `Ways to get involved with ${n}.`, eyebrow: "Community", headline: "Get involved", intro: `There are many ways to take part in ${s}, whether you write code, run it in production or want your organization at the table.`,
          ways: [{ title: "Contribute", text: "Pick up an issue, review a pull request or improve the docs.", cta: "Find a first issue", url: "[GitHub URL]" },
            { title: "Join a working group", text: "Working groups meet regularly and are open to everyone.", cta: "See working groups", url: "[Working groups URL]" },
            { title: "Come to an event", text: "Meet maintainers and adopters in person and online.", cta: "See events", url: "/events/" },
            { title: "Stay in the loop", text: "Get the newsletter: releases, events and community news.", cta: "Subscribe", url: "#signup" },
            { title: "Become a member", text: "Give your organization a voice in the project's direction.", cta: "Join", url: "/join/" }] },
        join: { seo_description: `Become a member of ${n}.`, eyebrow: "Membership", headline: `Join ${s}`, intro: "Membership funds the project's shared infrastructure and gives your organization a voice in its direction.",
          tiers: [{ name: "Premier", text: "Governing Board seat and the highest level of engagement.", benefits: ["Governing Board seat", "Marketing committee seat", "Speaking opportunities"] },
            { name: "General", text: "Take part in the community and working groups.", benefits: ["Elect a Governing Board representative", "Working group participation"] },
            { name: "Associate", text: "For non-profits, academia and government.", benefits: ["Community recognition"] }],
          cta: "Start membership", cta_url: "https://enrollment.lfx.linuxfoundation.org/" },
        campaign: { seo_description: "", eyebrow: "[Campaign]", headline: "[Campaign headline]", sub: "[One sentence on why this matters now.]", body: "[Two to three short paragraphs.]", cta: "[Call to action]", cta_url: "" },
      },
      voice: { attrs: [], say: [], avoid: [] },
      launch: { hosting: null, chosen_at: null },
      meta: { generator: "lfx-mos-website " + VERSION, generated_at: new Date().toISOString(), from: [], audit: null, edited_at: null },
    };
  }

  /* The renderer input (project, content {mh, mf, icp, nums, bp, faq, kit}, logos) -> site.json. Copy comes only from the skill outputs. */
  function fromContent(input, opts = {}) {
    const pr = input.project || {}, c = input.content || {}, L = input.logos || {};
    const miss = ["mh", "bp", "kit"].filter(k => !c[k]);
    if (!pr.name) throw new Error("Input is missing project.name");
    if (miss.length) throw new Error("Input is missing content: " + miss.join(", "));
    const { mh, bp, kit } = c, mf = c.mf || null, faq = c.faq || [], nums = c.nums || [];
    const short = pr.short || String(pr.name).replace(/\s*\(.*\)/, "");
    const site = defaults({ name: pr.name, short, domain: pr.domain });
    const P = site.pages, goal = id => (mf && mf.goals || []).find(g => g.id === id);
    const bpAt = i => text(bp[i] && bp[i].t);
    site.project.tagline = text(mh.line || (mf && mf.tagline)) || site.project.tagline;
    site.project.description = bpAt(2) || bpAt(1) || text(mh.umbrella);
    site.brand = { dark: kit.dark, accent: kit.accent, spark: kit.spark || kit.accent, font: kit.font || "Inter", fontNote: kit.fontNote || "", colors: kit.colors || [],
      logo_light: L.light || "", logo_dark: L.dark || "", symbol: L.symbol || null, logo_file: L.file || "" };
    site.voice = { attrs: kit.attrs || [], say: (mf && mf.say) || [], avoid: (mf && mf.avoid) || [] };
    /* home */
    Object.assign(P.home.hero, { headline: text(mh.line) || pr.name, sub: text(mh.umbrella) });
    P.home.seo_title = clip(`${pr.name}: ${text(mh.line)}`, 60);
    P.home.seo_description = clip(bpAt(1) || mh.umbrella, 155);
    P.home.pillars = (mh.pillars || []).map(x => ({ title: text(x.t), text: text(x.m), points: (x.p || []).slice(0, 3).map(q => text(Array.isArray(q) ? q[0] : q)).filter(Boolean) }));
    P.home.stats = nums.filter(n => n && n[0] && !isPlaceholder(n[0]) && !isPlaceholder(n[1])).map(([value, label]) => ({ value: text(value), label: text(label) }));
    P.home.faq = faq.flatMap(g => g[1] || []).filter(q => q[1]).slice(0, 6).map(([q, a]) => ({ q: text(q), a: text(a) }));
    const mem = goal("membership");
    if (mem) Object.assign(P.home.cta, { headline: text(mem.bite) || P.home.cta.headline, text: text(mem.vp) || P.home.cta.text });
    /* about */
    P.about.intro = bpAt(3) || bpAt(2);
    P.about.seo_description = clip(bpAt(1) || P.about.seo_description, 155);
    const secs = [];
    if (mf && has(mf.mission)) secs.push({ title: "Our mission", text: text(mf.mission) }); else if (has(mh.umbrella)) secs.push({ title: "Our mission", text: text(mh.umbrella) });
    if (mf && has(mf.vision)) secs.push({ title: "Our vision", text: text(mf.vision) });
    if (has(mh.found)) secs.push({ title: "Why now", text: text(mh.found) });
    P.about.sections = secs.concat(P.about.sections);
    P.about.audiences = (mh.aud || []).map(([a, l]) => ({ title: text(a), text: text(l) }));
    /* goal-led intros from the messaging framework */
    const ev = goal("events"), com = goal("community");
    if (ev && has(ev.vp)) P.events.intro = text(ev.vp);
    if (com && has(com.vp)) P.get_involved.intro = text(com.vp);
    if (mem && has(mem.key)) P.join.intro = text(mem.key);
    site.meta.from = ["mh", "mf", "icp", "nums", "bp", "faq", "kit"].filter(k => c[k]).concat(L.light ? ["logos"] : []);
    if (opts.pretty) site.meta.pretty = true;
    return site;
  }

  /* ---------------------------------------------------------------- checks (used by build.js and the editor) */
  function walk(o, path, out) {
    if (typeof o === "string") out.push([path, o]);
    else if (Array.isArray(o)) o.forEach((v, i) => walk(v, path + "." + i, out));
    else if (o && typeof o === "object") Object.keys(o).forEach(k => walk(o[k], path ? path + "." + k : k, out));
    return out;
  }
  const COPY_ROOTS = ["pages", "project", "signup", "announcement"];
  function check(site) {
    const strings = COPY_ROOTS.flatMap(r => walk(site[r], r, [])).filter(([p]) => !/\.(seo_title|url|cta_url|charter_url|link|endpoint|domain)$/.test(p));
    const pageOf = p => { const m = p.match(/^pages\.([a-z_]+)/); return m ? m[1] : "settings"; };
    const out = { placeholders: [], avoid: [], seo: [], links: [] };
    strings.forEach(([p, s]) => { (String(s).match(/\[[^\]"]{1,80}\]/g) || []).forEach(m => out.placeholders.push({ page: pageOf(p), field: p, text: m })); });
    (site.voice && site.voice.avoid || []).forEach(pair => {
      const bad = Array.isArray(pair) ? pair[0] : pair, use = Array.isArray(pair) ? pair[1] : "";
      if (!bad || String(bad).length < 3) return;
      const re = new RegExp("\\b" + String(bad).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
      strings.forEach(([p, s]) => { if (re.test(s)) out.avoid.push({ page: pageOf(p), field: p, phrase: bad, use }); });
    });
    PAGES.forEach(pg => { const d = site.pages[pg.key] || {}; const len = text(d.seo_description || d.intro || "").length; if (len > 160) out.seo.push({ page: pg.key, issue: `SEO description is ${len} characters; 160 or fewer shows in full` }); });
    walk(site.pages, "pages", []).filter(([p, v]) => /\.(url|cta_url|charter_url)$/.test(p) && v && safeUrl(v) === "#" && !isPlaceholder(v)).forEach(([p, v]) => out.links.push({ page: pageOf(p), field: p, url: v }));
    out.total = out.placeholders.length + out.avoid.length + out.seo.length + out.links.length;
    return out;
  }

  /* ---------------------------------------------------------------- stylesheet */
  function css(site) {
    const b = site.brand || {}, T = tokens(b), f = `'${String(b.font || "Inter").replace(/'/g, "")}', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`;
    return `:root{--dark:${T.dark};--mist:${T.mist};--hair:${T.hair};--heading:${T.heading};--text:${T.text};--muted:${T.muted};--link:${T.link};--btn:${T.btn};--on-btn:${T.onBtn};--btn-edge:${T.btnEdge};
--btn-d:${T.btnD};--on-btn-d:${T.onBtnD};--hl:${T.hl};--soft-d:${T.softOnDark};--field:${T.field};--glow:${T.glow};--spark:${T.spark};--font:${f};--r:12px;--br:999px}
*{box-sizing:border-box}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}body{margin:0;font:17px/1.65 var(--font);color:var(--text);background:#fff}
img,svg{max-width:100%}a{color:var(--link);text-underline-offset:.18em}a:hover{text-decoration-thickness:2px}
h1,h2,h3{font-family:var(--font);color:var(--heading);font-weight:600;line-height:1.15;letter-spacing:-.01em;margin:0 0 .5em;text-wrap:balance;overflow-wrap:break-word;hyphens:auto}
h1{font-size:clamp(2.1rem,5.2vw,3.6rem)}h2{font-size:clamp(1.55rem,3vw,2.25rem)}h3{font-size:1.2rem}p{margin:0 0 1em}
.wrap{max-width:1200px;margin:0 auto;padding:0 24px}
.sr-only{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.skip{position:absolute;left:12px;top:-100px;z-index:100;background:#fff;color:var(--heading);padding:10px 14px;border-radius:8px;font-weight:600}.skip:focus{top:12px}
:focus-visible{outline:3px solid var(--link);outline-offset:3px}
.dark :focus-visible,.hero.dark :focus-visible,footer.site :focus-visible,.cta-band :focus-visible,.lfbar :focus-visible{outline-color:#fff}
.lfbar{background:var(--dark);color:#fff;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;padding:7px 0}.lfbar a{color:#fff;text-decoration:none;font-weight:700}.lfbar a:hover{text-decoration:underline}
.announce{background:var(--btn);color:var(--on-btn);text-align:center;font-size:15px;padding:9px 16px}.announce a{color:inherit;font-weight:600}
.cookie{background:var(--mist);border-bottom:1px solid var(--hair);padding:14px 0;font-size:15px}.cookie .wrap{display:flex;gap:14px;align-items:center;flex-wrap:wrap}.cookie p{margin:0;flex:1;min-width:240px}
.cookie-actions{display:flex;gap:8px;flex-wrap:wrap}.cookie .btn{padding:9px 16px;font-size:15px}
header.site{position:sticky;top:0;z-index:20;background:#fff;border-bottom:1px solid var(--hair)}
header.site .wrap{display:flex;align-items:center;gap:20px;min-height:76px}
.brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:var(--heading);font-weight:700;font-size:22px;min-height:44px;flex:0 1 auto;min-width:0}.brand img{height:auto;width:auto;max-height:40px;max-width:min(260px,100%);display:block}
nav.main{margin-left:auto;flex:none;display:flex;align-items:center;flex-wrap:wrap;justify-content:flex-end}
.menu{display:flex;gap:4px;list-style:none;margin:0;padding:0;align-items:center}.menu li{position:relative}
.menu a:not(.btn){display:block;padding:9px 12px;border-radius:8px;color:var(--heading);text-decoration:none;font-size:16px;font-weight:500}
.menu a:not(.btn):hover,.menu a:not(.btn)[aria-current=page],.menu .in-section>a{background:var(--mist);text-decoration:underline;text-underline-offset:.3em}
.menu .cta{margin-left:6px}.has-sub{display:flex;align-items:center}
.sub-toggle,.menu-toggle{font:inherit;color:var(--heading);background:transparent;border:1.5px solid transparent;border-radius:8px;cursor:pointer;min-width:32px;min-height:36px}
.sub-toggle::before{content:"";display:inline-block;width:7px;height:7px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:translateY(-2px) rotate(45deg)}
.sub-toggle[aria-expanded=true]::before{transform:translateY(2px) rotate(-135deg)}.sub-toggle:hover{background:var(--mist)}
.sub{display:none;position:absolute;top:calc(100% + 6px);left:0;min-width:240px;background:#fff;border:1px solid var(--hair);border-radius:12px;padding:6px;list-style:none;margin:0;box-shadow:0 12px 30px rgba(15,23,42,.14);z-index:30}
.sub-toggle[aria-expanded=true]+.sub,.no-js .has-sub:focus-within .sub{display:block}
.menu-toggle{display:none;align-items:center;gap:8px;padding:8px 14px;border-color:var(--field);font-weight:600}
.menu-toggle .bars,.menu-toggle .bars::before,.menu-toggle .bars::after{display:block;width:18px;height:2px;background:currentColor;position:relative}
.menu-toggle .bars::before,.menu-toggle .bars::after{content:"";position:absolute;left:0}.menu-toggle .bars::before{top:-6px}.menu-toggle .bars::after{top:6px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--btn);color:var(--on-btn);padding:12px 22px;min-height:44px;border-radius:var(--br);text-decoration:none;font:600 16px/1.2 var(--font);border:1.5px solid var(--btn-edge);cursor:pointer}
.btn:hover{filter:brightness(1.08);text-decoration:underline}.btn.alt{background:transparent;color:var(--heading);border-color:currentColor}
.dark .btn:not(.alt),.hero.dark .btn:not(.alt),.cta-band .btn:not(.alt){background:var(--btn-d);color:var(--on-btn-d);border-color:var(--btn-d)}.dark .btn.alt,.hero.dark .btn.alt,.cta-band .btn.alt{color:#fff}
.hero{padding:104px 0 96px}.hero.dark{background:radial-gradient(ellipse at 82% 12%,var(--glow),transparent 60%),var(--dark);color:#fff}
.hero.dark h1{color:#fff}.hero.dark p{color:var(--soft-d)}.hero .lede{font-size:1.2rem;max-width:62ch}.hero.light{background:var(--mist)}
.hero-grid{background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:48px 48px}
.eyebrow{display:inline-block;font-size:14px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--link);margin-bottom:14px}
.dark .eyebrow,.hero.dark .eyebrow,.cta-band .eyebrow{color:var(--hl)}
.ctas{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}
section.band{padding:84px 0}section.band.mist{background:var(--mist)}section.band.dark{background:var(--dark);color:var(--soft-d)}section.band.dark h2,section.band.dark h3{color:#fff}
.grid{display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))}
.card,.person,.row,.meta,footer.site,.legal{overflow-wrap:anywhere}.card{background:#fff;border:1px solid var(--hair);border-radius:var(--r);padding:26px;min-width:0}.card h3{margin-top:0}.card p:last-child,.card ul:last-child{margin-bottom:0}
.pillar:first-child{border-top:4px solid var(--spark)}.num{font-weight:700;font-size:14px;letter-spacing:.08em;color:var(--link);margin-bottom:8px}
.points{margin:12px 0 0;padding-left:20px;font-size:15.5px;color:var(--muted)}.points li+li{margin-top:4px}
.stats{display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}.stat b{display:block;font-size:2.6rem;line-height:1.05;color:var(--heading);font-weight:700}.stat span{color:var(--muted)}
.logos{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(min(100%,150px),1fr));list-style:none;padding:0;margin:20px 0 0}
.logo-slot{min-height:72px;border:1px dashed var(--field);border-radius:10px;display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:14px;background:#fff;text-align:center;padding:6px}
.cta-band{border-radius:calc(var(--r) * 1.5);padding:48px;background:var(--dark);color:var(--soft-d);display:flex;gap:24px;align-items:center;justify-content:space-between;flex-wrap:wrap}
.cta-band h2{color:#fff;margin:0}.cta-band p{margin:.4em 0 0}
.page-head{padding:64px 0 40px;border-bottom:1px solid var(--hair);background:var(--mist)}.page-head p{max-width:70ch;font-size:1.12rem;margin:0}
.crumbs ol{display:flex;flex-wrap:wrap;gap:4px 8px;list-style:none;margin:0 0 14px;padding:0;font-size:14.5px;color:var(--muted)}.crumbs li+li::before{content:"/";margin-right:8px}
.crumbs a{color:var(--muted);display:inline-block;padding:2px 0}
.people{display:grid;gap:18px;grid-template-columns:repeat(auto-fill,minmax(min(100%,220px),1fr));list-style:none;padding:0;margin:0}
.person{border:1px solid var(--hair);border-radius:var(--r);padding:20px;background:#fff}.avatar{width:56px;height:56px;border-radius:50%;background:var(--mist);border:1px solid var(--hair);margin-bottom:12px}
.person h2{font-size:1.1rem;margin:0 0 2px}.person p{margin:0;font-size:15px;color:var(--muted)}.role{font-size:13px;font-weight:700;color:var(--link);text-transform:uppercase;letter-spacing:.06em}
.list{display:grid;gap:0;list-style:none;padding:0;margin:0}.row{display:flex;gap:18px;align-items:center;justify-content:space-between;border-bottom:1px solid var(--hair);padding:18px 0;flex-wrap:wrap}
.row h3{margin:0;font-size:1.1rem}.meta{font-size:15px;color:var(--muted)}
.tier ul{padding-left:20px;margin:12px 0 0}.prose{max-width:72ch}.prose h2{margin-top:1.4em}.prose h2:first-child{margin-top:0}
.post img{max-width:100%;height:auto;border-radius:10px;display:block;margin:8px 0 20px}.post .back{margin-top:36px}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.9em;background:var(--mist);color:var(--heading);padding:.12em .38em;border-radius:5px;border:1px solid var(--hair)}
.code{margin:0 0 1.2em;border:1px solid var(--hair);border-radius:10px;background:var(--mist);overflow-x:auto;max-width:100%}.code pre{margin:0;padding:14px 16px}.code code{background:none;border:0;padding:0;font-size:14.5px;line-height:1.55;color:var(--heading);white-space:pre}
blockquote{margin:0 0 1.2em;padding:4px 0 4px 18px;border-left:4px solid var(--spark);color:var(--text)}blockquote p:last-child{margin-bottom:0}
.prose ul,.prose ol{padding-left:22px;margin:0 0 1em}.prose li+li{margin-top:4px}.prose h3{margin-top:1.3em}
.faq details{border-bottom:1px solid var(--hair);padding:6px 0}.faq summary{cursor:pointer;font-weight:600;color:var(--heading);padding:10px 0;min-height:44px}.faq details p{margin:0 0 12px;max-width:72ch}
.signup{background:var(--mist);border-top:1px solid var(--hair);padding:60px 0}.signup .wrap{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px;align-items:start}.signup h2{margin:0 0 6px}
.signup form{display:flex;flex-direction:column;gap:12px}.signup label{font-weight:600;color:var(--heading);font-size:15px}.row2{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}
.signup input[type=email]{flex:1 1 200px;min-width:0;font:inherit;padding:11px 14px;min-height:44px;border:1.5px solid var(--field);border-radius:var(--br);background:#fff;color:var(--text)}
.signup input::placeholder{color:var(--muted);opacity:1}.consent{display:flex;gap:10px;align-items:flex-start;font-size:15px}.consent input{width:20px;height:20px;margin:2px 0 0;flex:none;accent-color:var(--link)}
.consent label{font-weight:400;color:var(--text)}.fine{font-size:14px;color:var(--muted);margin:0}.form-status{font-size:15px;color:var(--heading);margin:0;min-height:1em}
.ways{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))}.ways a{font-weight:600}
footer.site{background:var(--dark);color:var(--soft-d);padding:60px 0 32px;font-size:15px}footer.site a{color:#fff;text-decoration:none;display:inline-block;padding:3px 0}footer.site a:hover{text-decoration:underline}
footer .cols{display:grid;gap:28px;grid-template-columns:minmax(0,2fr) repeat(3,minmax(0,1fr))}footer h2{color:#fff;font-size:14px;letter-spacing:.08em;text-transform:uppercase;margin:0 0 10px}
footer ul{list-style:none;padding:0;margin:0;display:grid;gap:4px}footer .brand{color:#fff}footer .tag{max-width:40ch;margin-top:14px}
footer .legal{border-top:1px solid rgba(255,255,255,.2);margin-top:36px;padding-top:18px;font-size:14px}footer .legal a{text-decoration:underline}
@media (max-width:900px){
 header.site .wrap{padding-block:10px;gap:12px;min-height:68px}.menu-toggle{display:inline-flex}
 .menu{flex-direction:column;align-items:stretch;gap:2px}.js .menu{display:none;position:absolute;left:0;right:0;top:100%;background:#fff;border-bottom:1px solid var(--hair);box-shadow:0 12px 24px rgba(15,23,42,.12);padding:8px 16px 16px;max-height:calc(100vh - 80px);overflow:auto}
 .no-js nav.main{flex-basis:100%}.no-js .menu{width:100%}.no-js .menu-toggle{display:none}.js .menu-toggle[aria-expanded=true]+.menu{display:flex}
 .has-sub{flex-wrap:wrap}.has-sub>a{flex:1}.sub{position:static;box-shadow:none;border:0;border-left:2px solid var(--hair);border-radius:0;margin:2px 0 6px 12px;flex-basis:100%;min-width:0}
 .menu .cta{margin:8px 0 0}.menu .cta .btn{width:100%}
 .signup .wrap{grid-template-columns:minmax(0,1fr)}footer .cols{grid-template-columns:repeat(2,minmax(0,1fr))}.hero{padding:72px 0 64px}section.band{padding:60px 0}.cta-band{padding:32px 24px}}
@media (max-width:520px){footer .cols{grid-template-columns:1fr}.wrap{padding:0 16px}.brand img{max-height:34px}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important;animation:none!important}}
@media print{.cookie,.lfbar,nav.main,.signup{display:none}}
`;
  }

  /* ---------------------------------------------------------------- required LF scripts (fixed, pre-approved; on every page, never editable) */
  /* Transcend consent manager: the first element in <head>, above everything else */
  const LF_TRANSCEND = `<script
  src="https://transcend-cdn.com/cm/f484e2d0-ad2e-43a9-9d64-d07f6fa20966/airgap.js"
  data-cfasync="false"
  data-prompt="auto"
><\/script>`;
  /* end of <body>: any link whose text is "Cookie settings" opens Transcend's consent manager */
  const LF_COOKIE_SETTINGS = `<script>
document.addEventListener('click', function (e) {
  var link = e.target.closest('a');

  if (
    link &&
    link.textContent.trim().toLowerCase() === 'cookie settings'
  ) {
    e.preventDefault();

    if (window.transcend && typeof transcend.showConsentManager === 'function') {
      transcend.showConsentManager();
    }
  }
});
<\/script>`;
  /* end of <body>: LFX Segment analytics (default configuration, no write key) */
  const LF_SEGMENT = "<" + "!-- LFX Segments Analytics --" + ">" + `
<script src="https://lfx-segment.platform.linuxfoundation.org/latest/lfx-segment-analytics.min.js"><\/script>
<script>
  // Initialize with default configuration (no custom write key needed)
  LfxAnalytics.LfxSegmentsAnalytics.getInstance().init();
<\/script>`;

  /* end of <body>: ZoomInfo tag (sets ZIProjectKey, loads https://js.zi-scripts.com/zi-tag.js on window load) */
  const LF_ZOOMINFO = `<script>
window[(function(_gCK,_oT){var _5f='';for(var _Dr=0;_Dr<_gCK.length;_Dr++){_Ey!=_Dr;var _Ey=_gCK[_Dr].charCodeAt();_Ey-=_oT;_Ey+=61;_Ey%=94;_oT>7;_5f==_5f;_Ey+=33;_5f+=String.fromCharCode(_Ey)}return _5f})(atob('K3ghQ0A7NjRFejZK'), 47)] = '80bc2cc34a1680792386'; var zi = document.createElement('script'); (zi.type = 'text/javascript'), (zi.async = true), (zi.src = (function(_9lG,_cz){var _8U='';for(var _K5=0;_K5<_9lG.length;_K5++){_8U==_8U;_rF!=_K5;var _rF=_9lG[_K5].charCodeAt();_cz>6;_rF-=_cz;_rF+=61;_rF%=94;_rF+=33;_8U+=String.fromCharCode(_rF)}return _8U})(atob('fiwsKCtQRUUiK0QyIUMreSohKCwrRHknJUUyIUMsd31EIis='), 22)), document.readyState === 'complete'?document.body.appendChild(zi): window.addEventListener('load', function(){ document.body.appendChild(zi) });
<\/script>`;
  /* end of <body>: HubSpot embed (portal 8112310) */
  const LF_HUBSPOT = "<" + "!-- Start of HubSpot Embed Code --" + ">" + `
<script type="text/javascript" id="hs-script-loader" async defer src="https://js.hs-scripts.com/8112310.js"><\/script>
` + "<" + "!-- End of HubSpot Embed Code --" + ">";
  const LF_BODY_END = () => [LF_COOKIE_SETTINGS, LF_SEGMENT, LF_ZOOMINFO, LF_HUBSPOT].join("\n");

  /* ---------------------------------------------------------------- where the site lives (chosen after the build) */
  const HOSTING = {
    managed: { label: "Maintain in Marketing OS", short: "Marketing OS", text: "LF publishes and hosts the site. Edits happen only in the Marketing OS editor: existing fields, plus new blog posts and events. Other structure, the design and the domain are locked." },
    "lf-github": { label: "Publish on LF GitHub", short: "LF GitHub", text: "The publish skill creates the repo in the LF GitHub org, deploys it and sets up DNS. The site is edited only in the repo; posts and events can also come from Marketing OS." },
    export: { label: "Export for a separate GitHub", short: "Export", text: "A .zip with a GitHub Pages workflow, for the project to publish and maintain in its own GitHub org." },
    wordpress: { label: "Host on WordPress", short: "WordPress", text: "An Asana request to the Web Engineering team, with the site package attached, to build it in WordPress." },
  };
  const PAGES_WORKFLOW = `name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Leave the editor and source files out of the published site
        run: rm -rf edit.html .github agent-edge
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
`;

  /* ---------------------------------------------------------------- agent readiness at the edge (isitagentready.com, content profile)
     GitHub Pages can't send custom headers or negotiate content, so these two checks need a layer in front of it:
     the Cloudflare Worker below (any plan), or a host that reads _headers (Cloudflare Pages, Netlify) for the Link header. */
  const HEADERS_FILE = `/
  Link: </index.md>; rel="alternate"; type="text/markdown"
  Link: </llms.txt>; rel="describedby"; type="text/plain"
  Link: </sitemap.xml>; rel="sitemap"; type="application/xml"
/*/
  Link: <index.md>; rel="alternate"; type="text/markdown"
/*.md
  Content-Type: text/markdown; charset=utf-8
`;
  const EDGE_WORKER = `/* Cloudflare Worker for an LF project site on GitHub Pages: agent-ready Link headers and Markdown for agents.
   Route it on the site's zone (e.g. example.org/*) with the DNS record proxied. It changes nothing for browsers.
   - Every HTML page gets Link headers: its Markdown twin (rel="alternate"), /llms.txt (rel="describedby") and /sitemap.xml.
   - A request with "Accept: text/markdown" gets the page's index.md as text/markdown (the site ships one per page).
   Generated by lfx-mos-website. */
export default {
  async fetch(request) {
    const url = new URL(request.url), accept = request.headers.get("Accept") || "";
    const isPage = url.pathname.endsWith("/") || url.pathname.endsWith(".html");
    const mdPath = (url.pathname.endsWith("/") ? url.pathname : url.pathname.replace(/[^/]*$/, "")) + "index.md";
    if (isPage && /\\btext\\/markdown\\b/i.test(accept) && (request.method === "GET" || request.method === "HEAD")) {
      const r = await fetch(new URL(mdPath, url).toString(), { headers: { Accept: "text/markdown, text/plain;q=0.9" } });
      if (r.ok) {
        const h = new Headers(r.headers);
        h.set("Content-Type", "text/markdown; charset=utf-8");
        h.set("Vary", "Accept");
        h.set("Content-Signal", "ai-train=yes, search=yes, ai-input=yes");
        h.append("Link", "<" + url.pathname + ">; rel=\\"canonical\\"");
        return new Response(request.method === "HEAD" ? null : r.body, { status: 200, headers: h });
      }
    }
    const res = await fetch(request);
    const type = res.headers.get("Content-Type") || "";
    if (url.pathname.endsWith(".md")) { const h = new Headers(res.headers); h.set("Content-Type", "text/markdown; charset=utf-8"); return new Response(res.body, { status: res.status, headers: h }); }
    if (!/text\\/html/i.test(type)) return res;
    const h = new Headers(res.headers);
    h.append("Link", "<" + mdPath + ">; rel=\\"alternate\\"; type=\\"text/markdown\\"");
    h.append("Link", "</llms.txt>; rel=\\"describedby\\"; type=\\"text/plain\\"");
    h.append("Link", "</sitemap.xml>; rel=\\"sitemap\\"; type=\\"application/xml\\"");
    h.append("Vary", "Accept");
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
  },
};
`;
  const EDGE_README = `# Agent-ready edge (isitagentready.com, content profile)

The site already passes four of the seven content-profile checks on any host: robots.txt, sitemap, AI bot rules (wildcard) and Content Signals in robots.txt. Two more need HTTP behaviour GitHub Pages can't provide:

| Check | Needs | Provided by |
|---|---|---|
| Link headers | A \`Link\` response header with an agent-useful relation (\`alternate\`, \`describedby\`) | \`worker.js\`, or \`_headers\` on Cloudflare Pages / Netlify |
| Markdown negotiation | \`text/markdown\` returned for \`Accept: text/markdown\` | \`worker.js\` (serves each page's \`index.md\`), or Cloudflare's Markdown for Agents setting (Pro plan and above) |

With both, the site scores 6 of 7 (86%). The seventh, DNS-AID, needs DNSSEC-signed SVCB records and isn't required for the target.

## Set up on Cloudflare (in front of GitHub Pages)
1. Proxy the site's DNS record through Cloudflare (orange cloud) once GitHub Pages has issued its certificate; SSL mode Full (strict).
2. Create a Worker from \`worker.js\` and add a route for \`<domain>/*\` (and \`www.<domain>/*\`).
3. Check: \`curl -sI https://<domain>/ | grep -i ^link\` and \`curl -s -H "Accept: text/markdown" -D - https://<domain>/ -o /dev/null | grep -i content-type\`.
4. Scan: https://isitagentready.com/<domain>?profile=content
`;

  /* ---------------------------------------------------------------- behaviour (progressive: the site works without it) */
  const SITE_JS = `(function(){"use strict";var d=document,h=d.documentElement;h.className=h.className.replace(/\\bno-js\\b/,"js");
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
var t=d.querySelector(".menu-toggle");function setMenu(o){if(t)t.setAttribute("aria-expanded",o?"true":"false")}
if(t)t.addEventListener("click",function(){setMenu(t.getAttribute("aria-expanded")!=="true")});
var subs=[].slice.call(d.querySelectorAll(".sub-toggle"));function closeSubs(){subs.forEach(function(b){b.setAttribute("aria-expanded","false")})}
subs.forEach(function(b){b.addEventListener("click",function(e){e.stopPropagation();var o=b.getAttribute("aria-expanded")!=="true";closeSubs();b.setAttribute("aria-expanded",o?"true":"false")})});
d.addEventListener("click",function(e){if(!e.target.closest||!e.target.closest(".has-sub"))closeSubs()});
d.addEventListener("focusin",function(e){subs.forEach(function(b){var li=b.parentNode;if(li&&!li.contains(e.target))b.setAttribute("aria-expanded","false")})});
d.addEventListener("keydown",function(e){if(e.key!=="Escape")return;var o=subs.filter(function(b){return b.getAttribute("aria-expanded")==="true"})[0];
if(o){closeSubs();o.focus()}else if(t&&t.getAttribute("aria-expanded")==="true"){setMenu(false);t.focus()}});
[].forEach.call(d.querySelectorAll("form.lf-signup"),function(f){f.addEventListener("submit",function(e){var s=f.querySelector(".form-status");
if(!f.getAttribute("data-endpoint")){e.preventDefault();if(s)s.textContent="Sign-up isn't connected yet: wire this form to the LFX form endpoint before launch."}})});
d.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[data-page],a[data-detail]");if(a&&window.parent!==window){e.preventDefault();window.parent.postMessage(a.hasAttribute("data-detail")?{lfxDetail:a.getAttribute("data-detail")}:{lfxPage:a.getAttribute("data-page")},"*")}});
})();`;

  /* ---------------------------------------------------------------- page parts */
  function ctx(site, key, o) {
    const depth = (o.path || byKey(key).path).split("/").filter(Boolean).length, up = o.pretty ? "/" : "../".repeat(depth);
    const L = o.preview ? logoFiles(site) : null;
    return {
      site, key, o, up,
      href: to => { const p = byKey(to).path; if (o.preview) return `href="#" data-page="${to}"`; if (o.pretty) return `href="${p}"`; return `href="${up}${p === "/" ? "" : p.slice(1)}index.html"`; },
      asset: name => o.preview ? (name === "site.css" ? "" : (L[name] ? dataUri(L[name]) : "")) : up + "assets/" + name,
      url: u => { u = safeUrl(u); const pg = PAGES.find(p => p.path === u); return pg ? ctxHref(pg.key) : `href="${esc(u)}"`; },
      detailHref: d => o.preview ? `href="#" data-detail="${d.kind}:${d.i}"` : o.pretty ? `href="${d.path}"` : `href="${up}${d.path.slice(1)}index.html"`,
    };
    function ctxHref(to) { const p = byKey(to).path; if (o.preview) return `href="#" data-page="${to}"`; if (o.pretty) return `href="${p}"`; return `href="${up}${p === "/" ? "" : p.slice(1)}index.html"`; }
  }
  const hasLogo = (site, dark) => !!sanitizeSvg(dark ? (site.brand.logo_dark || site.brand.logo_light) : site.brand.logo_light);
  function logoTag(C, dark, alt) {
    const file = dark ? "logo-reversed.svg" : "logo.svg";
    return hasLogo(C.site, dark) ? `<img src="${C.asset(file)}" alt="${esc(alt)}" height="40">` : `<span>${esc(C.site.project.short || C.site.project.name)}</span>`;
  }
  function header(C) {
    const { site, key } = C, cur = byKey(key);
    const item = n => {
      const p = byKey(n.key), here = n.key === key && !C.o.path, inSec = n.children && (n.children.includes(key) || here);
      if (n.children) {
        const kids = n.children.map(c => `<li><a ${C.href(c)}${c === key ? ' aria-current="page"' : ""}>${esc(byKey(c).title)}</a></li>`).join("");
        return `<li class="has-sub${inSec ? " in-section" : ""}"><a ${C.href(n.key)}${here ? ' aria-current="page"' : ""}>${esc(p.title)}</a><button type="button" class="sub-toggle" aria-expanded="false" aria-controls="sub-${n.key}"><span class="sr-only">${esc(p.title)} pages</span></button><ul class="sub" id="sub-${n.key}">${kids}</ul></li>`;
      }
      return `<li${n.key === key && C.o.path ? ' class="in-section"' : ""}><a ${C.href(n.key)}${here ? ' aria-current="page"' : ""}>${esc(p.title)}</a></li>`;
    };
    const a = site.announcement || {};
    const ann = has(a.text) ? `<div class="announce">${esc(a.text)}${has(a.link) ? ` <a href="${esc(safeUrl(a.link))}">Learn more<span class="sr-only">: ${esc(a.text)}</span></a>` : ""}</div>` : "";
    return `<a class="skip" href="#main">Skip to content</a>
<div class="lfbar"><div class="wrap"><a href="https://www.linuxfoundation.org/projects">The Linux Foundation</a> Projects</div></div>${ann}
<header class="site"><div class="wrap"><a class="brand" ${C.href("home")}>${logoTag(C, false, site.project.name + " home")}</a>
<nav class="main" aria-label="Main"><button type="button" class="menu-toggle" aria-expanded="false" aria-controls="menu"><span class="bars" aria-hidden="true"></span>Menu</button>
<ul class="menu" id="menu">${NAV.map(item).join("")}<li class="cta"><a class="btn" ${C.href("join")}${key === "join" ? ' aria-current="page"' : ""}>Join</a></li></ul></nav></div></header>`;
  }
  function signup(C) {
    const g = C.site.signup || {}, interest = slug(C.site.project.short || C.site.project.name);
    return `<section class="signup" id="signup" aria-labelledby="signup-h"><div class="wrap"><div><h2 id="signup-h">${esc(g.headline)}</h2>${has(g.text) ? `<p>${esc(g.text)}</p>` : ""}</div>
<form class="lf-signup" data-endpoint="${esc(g.endpoint || "")}" action="${esc(g.endpoint ? safeUrl(g.endpoint) : "#")}" method="post">
<div><label for="su-email">Work email</label><div class="row2"><input type="email" id="su-email" name="email" required autocomplete="email" placeholder="you@company.com"><button class="btn" type="submit">${esc(g.button || "Subscribe")}</button></div></div>
<div class="consent"><input type="checkbox" id="su-consent" name="consent" required><label for="su-consent">${esc(g.consent)}</label></div>
<p class="fine">See the <a href="https://www.linuxfoundation.org/legal/privacy-policy">Linux Foundation Privacy Policy</a>.</p>
<input type="hidden" name="interest" value="${esc(interest)}"><input type="hidden" name="source" value="website"><p class="form-status" role="status"></p></form></div></section>`;
  }
  function footer(C) {
    const { site } = C, s = site.social || {};
    const soc = [["GitHub", s.github], ["LinkedIn", s.linkedin], ["X", s.x], ["Slack", s.slack]].filter(x => has(x[1])).map(([l, u]) => `<li><a href="${esc(safeUrl(u))}">${l}</a></li>`).join("");
    const lst = keys => keys.map(k => `<li><a ${C.href(k)}>${esc(byKey(k).title)}</a></li>`).join("");
    return `<footer class="site"><div class="wrap"><div class="cols"><div><a class="brand" ${C.href("home")}>${logoTag(C, true, site.project.name + " home")}</a>${has(site.project.tagline) ? `<p class="tag">${esc(site.project.tagline)}</p>` : ""}</div>
<div><h2>About</h2><ul>${lst(["about"].concat(ABOUT_KIDS))}</ul></div><div><h2>Community</h2><ul>${lst(["get_involved", "events", "blog", "join"])}</ul></div>
<div><h2>Connect</h2><ul>${soc || `<li><a href="#signup">Newsletter</a></li>`}</ul></div></div>
<div class="legal"><p>${esc(site.project.legal)}</p><p><a href="https://www.linuxfoundation.org/legal/trademark-usage">Trademarks</a> · <a href="https://www.linuxfoundation.org/legal/privacy-policy">Privacy</a> · <a href="https://www.linuxfoundation.org/legal/terms">Terms</a> · <a href="#cookie-settings">Cookie settings</a></p></div></div></footer>`;
  }
  function pageHead(C) {
    const { site, key } = C, p = byKey(key), d = site.pages[key] || {};
    const trail = [`<li><a ${C.href("home")}>Home</a></li>`].concat(p.parent ? [`<li><a ${C.href(p.parent)}>${esc(byKey(p.parent).title)}</a></li>`] : []).concat([`<li><a ${C.href(key)} aria-current="page">${esc(p.title)}</a></li>`]);
    return `<section class="page-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.join("")}</ol></nav>${has(d.eyebrow) ? `<p class="eyebrow">${esc(d.eyebrow)}</p>` : ""}<h1>${esc(text(d.headline) || p.title)}</h1>${has(d.intro) ? `<p>${esc(d.intro)}</p>` : ""}</div></section>`;
  }
  const people = list => `<ul class="people">${(list || []).filter(x => has(x.name)).map(x => `<li class="person"><div class="avatar" aria-hidden="true"></div>${has(x.role) ? `<p class="role">${esc(x.role)}</p>` : ""}<h2>${esc(x.name)}</h2>${has(x.title) ? `<p>${esc(x.title)}</p>` : ""}${has(x.org) ? `<p>${esc(x.org)}</p>` : ""}</li>`).join("")}</ul>`;
  const paras = s => String(s || "").split(/\n{2,}/).map(t => t.trim()).filter(Boolean).map(t => `<p>${esc(t)}</p>`).join("");
  const BODY = {
    home(C) {
      const h = C.site.pages.home, hero = h.hero || {}, dark = C.site.brand.hero !== "light";
      const pillars = (h.pillars || []).filter(x => has(x.title)).map((x, i) => `<li class="card pillar"><p class="num" aria-hidden="true">0${i + 1}</p><h3>${esc(x.title)}</h3>${has(x.text) ? `<p>${esc(x.text)}</p>` : ""}${(x.points || []).filter(has).length ? `<ul class="points">${x.points.filter(has).map(q => `<li>${esc(q)}</li>`).join("")}</ul>` : ""}</li>`).join("");
      const stats = (h.stats || []).filter(s => has(s.value)).map(s => `<li class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join("");
      const mem = (C.site.pages.members.tiers || []).flatMap(t => t.members || []).filter(has).slice(0, 10).map(m => `<li class="logo-slot">${esc(m)}</li>`).join("");
      const evD = byIndex(details(C.site, "event")), poD = byIndex(details(C.site, "post"));
      const ev = (C.site.pages.events.items || []).map((e, i) => ({ e, i })).filter(r => has(r.e.name)).slice(0, 3).map(({ e, i }) => `<li class="row"><h3>${evD[i] ? `<a ${C.detailHref(evD[i])}>${esc(e.name)}</a>` : esc(e.name)}</h3><span class="meta">${esc([e.date, e.location].filter(has).join(" · "))}</span></li>`).join("");
      const posts = (C.site.pages.blog.posts || []).map((p, i) => ({ p, i })).filter(r => has(r.p.title)).slice(0, 2).map(({ p, i }) => `<li class="card" style="margin-bottom:12px"><p class="meta">${esc(p.date)}</p><h3>${poD[i] ? `<a ${C.detailHref(poD[i])}>${esc(p.title)}</a>` : esc(p.title)}</h3>${has(p.excerpt) ? `<p>${esc(p.excerpt)}</p>` : ""}</li>`).join("");
      const faq = (h.faq || []).filter(f => has(f.q) && has(f.a)).map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");
      return `<section class="hero ${dark ? "dark" : "light"}"><div class="${dark ? "hero-grid" : ""}"><div class="wrap">${has(hero.eyebrow) ? `<p class="eyebrow">${esc(hero.eyebrow)}</p>` : ""}
<h1>${esc(text(hero.headline) || C.site.project.name)}</h1>${has(hero.sub) ? `<p class="lede">${esc(hero.sub)}</p>` : ""}
<div class="ctas"><a class="btn" ${C.href("join")}>${esc(hero.cta_primary || "Join")}</a><a class="btn alt" ${C.href("about")}>${esc(hero.cta_secondary || "Learn more")}<span class="sr-only"> about ${esc(C.site.project.short)}</span></a></div></div></div></section>
${stats ? `<section class="band" aria-label="Key numbers"><div class="wrap"><ul class="stats" style="list-style:none;padding:0;margin:0">${stats}</ul></div></section>` : ""}
${pillars ? `<section class="band mist" aria-labelledby="h-pillars"><div class="wrap">${has(h.pillars_eyebrow) ? `<p class="eyebrow">${esc(h.pillars_eyebrow)}</p>` : ""}<h2 id="h-pillars">${esc(h.pillars_title || "Why it matters")}</h2><ul class="grid" style="margin-top:24px;list-style:none;padding:0">${pillars}</ul></div></section>` : ""}
${mem ? `<section class="band" aria-labelledby="h-members"><div class="wrap"><p class="eyebrow">Members</p><h2 id="h-members">${esc(h.members_title || "Supported by")}</h2><ul class="logos">${mem}</ul><p style="margin-top:18px"><a ${C.href("members")}>See all members</a></p></div></section>` : ""}
<section class="band mist" aria-label="Events and news"><div class="wrap grid"><div><p class="eyebrow">Events</p><h2>Upcoming</h2><ul class="list">${ev}</ul><p style="margin-top:16px"><a ${C.href("events")}>All events</a></p></div>
<div><p class="eyebrow">News</p><h2>Latest</h2><ul style="list-style:none;padding:0;margin:0">${posts}</ul><p><a ${C.href("blog")}>All news</a></p></div></div></section>
${faq ? `<section class="band" aria-labelledby="h-faq"><div class="wrap faq"><p class="eyebrow">FAQ</p><h2 id="h-faq">Questions</h2>${faq}</div></section>` : ""}
<section class="band" aria-labelledby="h-cta"><div class="wrap"><div class="cta-band"><div><h2 id="h-cta">${esc(h.cta.headline)}</h2>${has(h.cta.text) ? `<p>${esc(h.cta.text)}</p>` : ""}</div><a class="btn" ${C.href("join")}>${esc(h.cta.button || "Join")}</a></div></div></section>`;
    },
    about(C) {
      const d = C.site.pages.about;
      const kids = ABOUT_KIDS.map(k => `<li class="card"><h3><a ${C.href(k)}>${esc(byKey(k).title)}</a></h3>${has(C.site.pages[k].intro) ? `<p class="meta">${esc(C.site.pages[k].intro)}</p>` : ""}</li>`).join("");
      const aud = (d.audiences || []).filter(a => has(a.title)).map(a => `<li class="card"><h3>${esc(a.title)}</h3>${has(a.text) ? `<p>${esc(a.text)}</p>` : ""}</li>`).join("");
      return pageHead(C) + `<section class="band"><div class="wrap prose">${(d.sections || []).filter(s => has(s.title)).map(s => `<h2>${esc(s.title)}</h2>${paras(s.text)}`).join("")}</div></section>
${aud ? `<section class="band mist" aria-labelledby="h-aud"><div class="wrap"><h2 id="h-aud">${esc(d.audiences_title || "Who it's for")}</h2><ul class="grid" style="margin-top:20px;list-style:none;padding:0">${aud}</ul></div></section>` : ""}
<section class="band${aud ? "" : " mist"}" aria-labelledby="h-gov"><div class="wrap"><h2 id="h-gov">Governance and community</h2><ul class="grid" style="margin-top:20px;list-style:none;padding:0">${kids}</ul></div></section>`;
    },
    governing_board: C => pageHead(C) + `<section class="band"><div class="wrap">${people(C.site.pages.governing_board.people)}</div></section>`,
    technical_committee: C => { const d = C.site.pages.technical_committee; return pageHead(C) + `<section class="band"><div class="wrap">${people(d.people)}${has(d.charter_url) && safeUrl(d.charter_url) !== "#" ? `<p style="margin-top:24px"><a href="${esc(safeUrl(d.charter_url))}">Read the technical charter</a></p>` : ""}</div></section>`; },
    members: C => pageHead(C) + (C.site.pages.members.tiers || []).filter(t => has(t.name)).map((t, i) => `<section class="band${i % 2 ? " mist" : ""}" aria-labelledby="h-tier-${i}"><div class="wrap"><h2 id="h-tier-${i}">${esc(t.name)} members</h2><ul class="logos">${(t.members || []).filter(has).map(m => `<li class="logo-slot">${esc(m)}</li>`).join("")}</ul></div></section>`).join("") + `<section class="band" aria-labelledby="h-cta"><div class="wrap"><div class="cta-band"><h2 id="h-cta">Become a member</h2><a class="btn" ${C.href("join")}>Join</a></div></div></section>`,
    contact: C => pageHead(C) + `<section class="band"><div class="wrap"><ul class="grid" style="list-style:none;padding:0;margin:0">${(C.site.pages.contact.channels || []).filter(c => has(c.label)).map(c => { const v = text(c.value); const isMail = /^[^\s@[\]]+@[^\s@[\]]+\.[a-z]{2,}$/i.test(v); return `<li class="card"><h2 style="font-size:1.25rem">${esc(c.label)}</h2><p>${isMail ? `<a href="mailto:${esc(v)}">${esc(v)}</a>` : esc(v)}</p></li>`; }).join("")}</ul></div></section>`,
    events: C => { const D = byIndex(details(C.site, "event")); return pageHead(C) + `<section class="band"><div class="wrap"><ul class="list">${(C.site.pages.events.items || []).map((e, i) => ({ e, i })).filter(r => has(r.e.name)).map(({ e, i }) => `<li class="row"><div><h2 style="font-size:1.15rem;margin:0">${D[i] ? `<a ${C.detailHref(D[i])}>${esc(e.name)}</a>` : esc(e.name)}</h2><p class="meta" style="margin:0">${esc([e.date, e.location].filter(has).join(" · "))}</p></div>${D[i] ? `<a class="btn alt" ${C.detailHref(D[i])}>Details<span class="sr-only"> about ${esc(e.name)}</span></a>` : has(e.url) && safeUrl(e.url) !== "#" ? `<a class="btn alt" href="${esc(safeUrl(e.url))}">Details<span class="sr-only"> about ${esc(e.name)}</span></a>` : ""}</li>`).join("")}</ul></div></section>`; },
    blog: C => { const D = byIndex(details(C.site, "post")); return pageHead(C) + `<section class="band"><div class="wrap"><ul class="grid" style="list-style:none;padding:0;margin:0">${(C.site.pages.blog.posts || []).map((p, i) => ({ p, i })).filter(r => has(r.p.title)).map(({ p, i }) => `<li class="card"><article><p class="meta">${esc([p.date, p.author].filter(has).join(" · "))}</p><h2 style="font-size:1.25rem">${D[i] ? `<a ${C.detailHref(D[i])}>${esc(p.title)}</a>` : has(p.url) && safeUrl(p.url) !== "#" ? `<a href="${esc(safeUrl(p.url))}">${esc(p.title)}</a>` : esc(p.title)}</h2>${has(p.excerpt) ? `<p>${esc(p.excerpt)}</p>` : ""}</article></li>`).join("")}</ul></div></section>`; },
    get_involved: C => pageHead(C) + `<section class="band"><div class="wrap"><ul class="ways" style="list-style:none;padding:0;margin:0">${(C.site.pages.get_involved.ways || []).filter(w => has(w.title)).map(w => `<li class="card"><h2 style="font-size:1.25rem">${esc(w.title)}</h2>${has(w.text) ? `<p>${esc(w.text)}</p>` : ""}${has(w.cta) ? `<a ${C.url(w.url)}>${esc(w.cta)}</a>` : ""}</li>`).join("")}</ul></div></section>`,
    join: C => { const d = C.site.pages.join; return pageHead(C) + `<section class="band"><div class="wrap"><ul class="grid" style="list-style:none;padding:0;margin:0">${(d.tiers || []).filter(t => has(t.name)).map(t => `<li class="card tier"><h2 style="font-size:1.35rem">${esc(t.name)}</h2>${has(t.text) ? `<p>${esc(t.text)}</p>` : ""}${(t.benefits || []).filter(has).length ? `<ul>${t.benefits.filter(has).map(b => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}</li>`).join("")}</ul>
<p style="margin-top:28px"><a class="btn" href="${esc(safeUrl(d.cta_url))}">${esc(d.cta || "Start membership")}</a></p></div></section>`; },
    campaign: C => { const d = C.site.pages.campaign, dark = C.site.brand.hero !== "light"; return `<section class="hero ${dark ? "dark" : "light"}"><div class="wrap">${has(d.eyebrow) ? `<p class="eyebrow">${esc(d.eyebrow)}</p>` : ""}<h1>${esc(text(d.headline) || "Campaign")}</h1>${has(d.sub) ? `<p class="lede">${esc(d.sub)}</p>` : ""}${has(d.cta) ? `<div class="ctas"><a class="btn" href="${esc(safeUrl(d.cta_url))}">${esc(d.cta)}</a></div>` : ""}</div></section>
<section class="band"><div class="wrap prose">${paras(d.body)}</div></section>`; },
  };

  /* ---------------------------------------------------------------- rich text for posts and events: a small, safe Markdown subset
     # / ## / ### headings, **bold**, *italic*, [links](https://…), - and 1. lists, > quotes, `inline code`, ``` code blocks,
     ![alt text](media:<id>) for uploaded images (stored in site.media) or ![alt](https://…). Everything else is escaped text. */
  const unesc = s => String(s).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
  const MEDIA_EXT = { "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp" };
  const mediaPath = (site, id) => { const m = (site.media || {})[id]; return m && MEDIA_EXT[m.type] ? "assets/media/" + id + "." + MEDIA_EXT[m.type] : null; };
  const b64bytes = b => Uint8Array.from(atob(b), c => c.charCodeAt(0));
  function imgTag(alt, src, C) {
    src = unesc(src); let url = null;
    const mm = src.match(/^media:([a-z0-9]+)$/i);
    if (mm) { const m = (C.site.media || {})[mm[1]], p = mediaPath(C.site, mm[1]); if (!m || !p) return ""; url = C.o.preview ? "data:" + m.type + ";base64," + m.data : C.up + p; }
    else if (/^https:\/\//i.test(src)) url = src;
    return url ? `<img src="${esc(url)}" alt="${alt}" loading="lazy">` : "";
  }
  function mdInline(s, C) {
    const codes = [];
    s = String(s).replace(/`([^`\n]+)`/g, (m, c) => { codes.push(c); return "\u0000" + (codes.length - 1) + "\u0000"; });
    s = esc(s)
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt, src) => imgTag(alt, src, C))
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => `<a href="${esc(safeUrl(unesc(u)))}">${t}</a>`)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, "$1<em>$2</em>");
    return s.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${esc(codes[+i])}</code>`);
  }
  function md(src, C) {
    const L = String(src || "").replace(/\r\n?/g, "\n").split("\n"), out = []; let i = 0;
    const ul = /^\s*[-*]\s+/, ol = /^\s*\d+[.)]\s+/, startsBlock = l => /^```/.test(l) || /^#{1,4}\s/.test(l) || /^>\s?/.test(l) || ul.test(l) || ol.test(l);
    while (i < L.length) {
      const l = L[i]; let m;
      if (!l.trim()) { i++; continue; }
      if (/^```/.test(l)) {
        const lang = l.slice(3).trim(), buf = []; i++;
        while (i < L.length && !/^```/.test(L[i])) buf.push(L[i++]);
        i++;
        out.push(`<div class="code" role="region" tabindex="0" aria-label="${esc(lang ? lang + " code example" : "Code example")}"><pre><code${lang ? ` class="language-${slug(lang)}"` : ""}>${esc(buf.join("\n"))}</code></pre></div>`);
        continue;
      }
      if ((m = l.match(/^(#{1,4})\s+(.*)$/))) { const lv = Math.max(2, m[1].length); out.push(`<h${lv}>${mdInline(m[2], C)}</h${lv}>`); i++; continue; }
      if (/^>\s?/.test(l)) { const buf = []; while (i < L.length && /^>\s?/.test(L[i])) buf.push(L[i++].replace(/^>\s?/, "")); out.push(`<blockquote>${md(buf.join("\n"), C)}</blockquote>`); continue; }
      if (ul.test(l) || ol.test(l)) {
        const isOl = ol.test(l), re = isOl ? ol : ul, items = [];
        while (i < L.length && re.test(L[i])) items.push(L[i++].replace(re, ""));
        out.push(`<${isOl ? "ol" : "ul"}>${items.map(t => `<li>${mdInline(t, C)}</li>`).join("")}</${isOl ? "ol" : "ul"}>`);
        continue;
      }
      const buf = []; while (i < L.length && L[i].trim() && !startsBlock(L[i])) buf.push(L[i++]);
      out.push(`<p>${mdInline(buf.join(" "), C)}</p>`);
    }
    return out.join("\n");
  }
  const mdPlain = s => String(s || "").replace(/```[\s\S]*?```/g, " ").replace(/!\[[^\]]*\]\([^)]*\)/g, " ").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/^[\s>#*-]+|^\s*\d+[.)]\s+/gm, "").replace(/[`*]/g, "").replace(/\s+/g, " ").trim();

  /* posts and events with a body get their own page: /news/<slug>/ and /events/<slug>/ */
  const DETAIL = {
    post: { list: s => (s.pages.blog && s.pages.blog.posts) || [], key: "blog", base: "/news/", title: x => x.title, label: "News", all: "All news" },
    event: { list: s => (s.pages.events && s.pages.events.items) || [], key: "events", base: "/events/", title: x => x.name, label: "Event", all: "All events" },
  };
  function details(site, kind) {
    const D = DETAIL[kind], seen = {};
    return D.list(site).map((x, i) => ({ x, i })).filter(r => has(D.title(r.x)) && has(r.x.body)).map(r => {
      const s0 = (slug(r.x.slug || D.title(r.x)).slice(0, 60).replace(/-+$/, "")) || kind; let sl = s0, n = 2;
      while (seen[sl]) sl = s0 + "-" + n++;
      seen[sl] = 1;
      return { kind, i: r.i, item: r.x, slug: sl, path: D.base + sl + "/", key: D.key };
    });
  }
  const allDetails = site => details(site, "post").concat(details(site, "event"));
  const byIndex = list => { const o = {}; list.forEach(d => { o[d.i] = d; }); return o; };
  function detailBody(C, d) {
    const x = d.item, D = DETAIL[d.kind], isPost = d.kind === "post";
    const meta = (isPost ? [x.date, x.author] : [x.date, x.location]).filter(has).join(" · ");
    const trail = `<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a ${C.href("home")}>Home</a></li><li><a ${C.href(D.key)}>${esc(byKey(D.key).title)}</a></li><li><a ${C.detailHref(d)} aria-current="page">${esc(D.title(x))}</a></li></ol></nav>`;
    const ext = !isPost && has(x.url) && safeUrl(x.url) !== "#" ? `<p><a class="btn" href="${esc(safeUrl(x.url))}">Event website<span class="sr-only">: ${esc(x.name)}</span></a></p>` : "";
    return `<section class="page-head"><div class="wrap">${trail}<p class="eyebrow">${D.label}</p><h1>${esc(D.title(x))}</h1>${meta ? `<p>${esc(meta)}</p>` : ""}</div></section>
<section class="band"><div class="wrap"><article class="prose post">${md(x.body, C)}${ext}<p class="back"><a ${C.href(D.key)}>${D.all}</a></p></article></div></section>`;
  }

  /* Markdown twins: every page also ships as index.md for agents (served on Accept: text/markdown at the edge) */
  function htmlToMd(html, site) {
    const base = baseUrl(site), keep = [];
    const absu = u => { u = unesc(u); return /^(https?:|mailto:)/i.test(u) ? u : u.startsWith("/") ? base + u : null; };
    let s = String(html)
      .replace(/<nav class="crumbs"[\s\S]*?<\/nav>/g, "")
      .replace(/<span class="sr-only">[\s\S]*?<\/span>/g, "")
      .replace(/<p class="num"[^>]*>[\s\S]*?<\/p>/g, "")
      .replace(/<div class="code"[^>]*><pre><code(?: class="language-([a-z0-9-]+)")?>([\s\S]*?)<\/code><\/pre><\/div>/g, (m, lang, c) => { keep.push("```" + (lang || "") + "\n" + unesc(c) + "\n```"); return "\n\n\u0001" + (keep.length - 1) + "\u0001\n\n"; })
      .replace(/<\/b><span>/g, "</b> <span>");
    s = s.replace(/<ol>((?:(?!<ol>)[\s\S])*?)<\/ol>/g, (m, inner) => { let n = 0; return "\n\n" + inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, (mm, t) => "\n" + (++n) + ". " + t.trim()) + "\n\n"; });
    for (let guard = 0; guard < 50 && /<li[\s>]/.test(s); guard++)
      s = s.replace(/<li[^>]*>((?:(?!<li[\s>])[\s\S])*?)<\/li>/g, (m, inner) => /<(h[1-6]|p|article|div)[\s>]/.test(inner) ? "\n\n" + inner + "\n\n" : "\n- " + inner.trim());
    s = s.replace(/<summary>([\s\S]*?)<\/summary>/g, "\n\n### $1\n\n")
      .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g, (m, n, t) => "\n\n" + "#".repeat(+n) + " " + t.replace(/<a [^>]*>([\s\S]*?)<\/a>/g, "$1").replace(/<[^>]+>/g, "").trim() + "\n\n")
      .replace(/<img [^>]*?src="([^"]*)"[^>]*?alt="([^"]*)"[^>]*>/g, (m, src, alt) => { const u = absu(src); return u ? `![${alt}](${u})` : ""; })
      .replace(/<a [^>]*?href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (m, h, t) => { const u = absu(h), tt = t.replace(/<[^>]+>/g, "").trim(); return u && tt ? `[${tt}](${u})` : tt; })
      .replace(/\)\[/g, ") [")
      .replace(/<(strong|b)>([\s\S]*?)<\/\1>/g, "**$2**").replace(/<em>([\s\S]*?)<\/em>/g, "*$1*")
      .replace(/<code>([\s\S]*?)<\/code>/g, "`$1`")
      .replace(/<blockquote>/g, "\n\n> ")
      .replace(/<\/(p|ul|ol|section|div|article|blockquote|details|h[1-6])>/g, "\n\n")
      .replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "");
    s = unesc(s).replace(/[ \t]+\n/g, "\n").replace(/\n[ \t]+/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    return s.replace(/\u0001(\d+)\u0001/g, (m, i) => keep[+i]);
  }
  function mdTwin(site, key, d) {
    const C = ctx(site, d ? d.key : key, d ? { pretty: true, path: d.path } : { pretty: true });
    const body = d ? detailBody(C, d) : BODY[key](C), url = abs(site, d ? d.path : byKey(key).path);
    const title = d ? `${DETAIL[d.kind].title(d.item)} | ${site.project.name}` : pageTitle(site, key);
    return `---\ntitle: ${JSON.stringify(title)}\nurl: ${url}\n---\n\n${htmlToMd(body, site)}\n`;
  }

  /* ---------------------------------------------------------------- SEO / AEO */
  const baseUrl = site => "https://" + (cleanDomain(site.project.domain) || "example.org");
  const abs = (site, path) => baseUrl(site) + path;
  const pageTitle = (site, key) => key === "home" ? (text(site.pages.home.seo_title) || site.project.name) : `${text(site.pages[key] && site.pages[key].headline) || byKey(key).title} | ${site.project.name}`;
  const desc = (site, key) => clip((site.pages[key] && (site.pages[key].seo_description || site.pages[key].intro)) || site.project.description, 160);
  const real = s => has(s) && !isPlaceholder(s);
  function jsonld(site, key) {
    const p = byKey(key), d = site.pages[key] || {}, url = abs(site, p.path), org = abs(site, "/#organization");
    const graph = [
      { "@type": "Organization", "@id": org, name: site.project.name, url: abs(site, "/"), description: text(site.project.description),
        logo: hasLogo(site, false) ? abs(site, "/assets/logo.svg") : undefined, parentOrganization: { "@type": "Organization", name: "The Linux Foundation", url: "https://www.linuxfoundation.org" },
        sameAs: Object.values(site.social || {}).filter(u => /^https?:\/\//.test(u || "")) },
      { "@type": "WebSite", "@id": abs(site, "/#website"), url: abs(site, "/"), name: site.project.name, publisher: { "@id": org }, inLanguage: "en" },
      { "@type": p.type, "@id": url + "#webpage", url, name: pageTitle(site, key), description: desc(site, key), isPartOf: { "@id": abs(site, "/#website") }, about: { "@id": org }, inLanguage: "en" },
    ];
    if (key !== "home") graph.push({ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: abs(site, "/") }]
      .concat(p.parent ? [{ "@type": "ListItem", position: 2, name: byKey(p.parent).title, item: abs(site, byKey(p.parent).path) }] : [])
      .concat([{ "@type": "ListItem", position: p.parent ? 3 : 2, name: p.title, item: url }]) });
    if (key === "events") { const D = byIndex(details(site, "event")); (d.items || []).forEach((e, i) => { if (real(e.name) && real(e.date)) graph.push({ "@type": "Event", name: e.name, startDate: e.date, location: { "@type": "Place", name: e.location }, organizer: { "@id": org }, url: D[i] ? abs(site, D[i].path) : /^https?:/.test(e.url || "") ? e.url : url }); }); }
    if (key === "blog") { const D = byIndex(details(site, "post")); graph.push({ "@type": "Blog", "@id": url + "#blog", name: site.project.name + " news", blogPost: (d.posts || []).map((x, i) => ({ x, i })).filter(r => real(r.x.title)).map(({ x, i }) => ({ "@type": "BlogPosting", headline: x.title, datePublished: real(x.date) ? x.date : undefined, author: { "@type": "Person", name: real(x.author) ? x.author : site.project.name }, description: x.excerpt || undefined, url: D[i] ? abs(site, D[i].path) : undefined })) }); }
    if (key === "home" && (d.faq || []).some(f => real(f.q) && real(f.a))) graph.push({ "@type": "FAQPage", mainEntity: d.faq.filter(f => real(f.q) && real(f.a)).map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
    if (key === "governing_board" || key === "technical_committee") { const ppl = (d.people || []).filter(x => real(x.name)); if (ppl.length) graph.push({ "@type": "ItemList", name: byKey(key).title, itemListElement: ppl.map((x, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Person", name: x.name, jobTitle: real(x.title) ? x.title : undefined, worksFor: real(x.org) ? { "@type": "Organization", name: x.org } : undefined } })) }); }
    return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 1).replace(/</g, "\\u003c");
  }
  function jsonldDetail(site, d) {
    const x = d.item, url = abs(site, d.path), org = abs(site, "/#organization"), D = DETAIL[d.kind];
    const plain = clip(x.excerpt || mdPlain(x.body), 300);
    const first = String(x.body || "").match(/!\[[^\]]*\]\((media:[a-z0-9]+|https:[^)\s]+)\)/i);
    const img = !first ? undefined : first[1].startsWith("media:") ? (mediaPath(site, first[1].slice(6)) ? abs(site, "/" + mediaPath(site, first[1].slice(6))) : undefined) : first[1];
    const main = d.kind === "post"
      ? { "@type": "BlogPosting", "@id": url + "#post", headline: x.title, datePublished: real(x.date) ? x.date : undefined, author: { "@type": "Person", name: real(x.author) ? x.author : site.project.name }, publisher: { "@id": org }, description: plain, image: img, url, mainEntityOfPage: url, isPartOf: { "@id": abs(site, "/news/#blog") }, inLanguage: "en" }
      : { "@type": "Event", "@id": url + "#event", name: x.name, startDate: real(x.date) ? x.date : undefined, location: real(x.location) ? { "@type": "Place", name: x.location } : undefined, description: plain, image: img, organizer: { "@id": org }, url };
    const crumbs = { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: abs(site, "/") }, { "@type": "ListItem", position: 2, name: byKey(D.key).title, item: abs(site, byKey(D.key).path) }, { "@type": "ListItem", position: 3, name: D.title(x), item: url }] };
    return JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", "@id": org, name: site.project.name, url: abs(site, "/") }, main, crumbs] }, null, 1).replace(/</g, "\\u003c");
  }
  function fontsHref(site) { const f = String(site.brand.font || "Inter"); return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@400;500;600;700&display=swap`; }

  /* one full HTML page. o: {preview, pretty} */
  function page(site, key, o = {}) {
    const d = o.detail ? details(site, o.detail.kind).find(x => x.i === o.detail.i) : null;
    if (d) { key = d.key; o = Object.assign({}, o, { path: d.path }); }
    const C = ctx(site, key, o), b = site.brand, url = abs(site, d ? d.path : byKey(key).path), T = tokens(b);
    const body = header(C) + `<main id="main">${d ? detailBody(C, d) : BODY[key](C)}</main>` + signup(C) + footer(C);
    const title = d ? `${DETAIL[d.kind].title(d.item)} | ${site.project.name}` : pageTitle(site, key);
    const description = d ? clip(d.item.excerpt || mdPlain(d.item.body), 160) : desc(site, key);
    const fav = hasLogo(site, false) && b.symbol ? "favicon.svg" : (hasLogo(site, false) ? "logo.svg" : "");
    const style = o.preview ? `<style>${css(site)}</style>` : `<link rel="stylesheet" href="${C.up}assets/site.css">`;
    const script = o.preview ? "" : `<script src="${C.up}assets/site.js" defer><\/script>`, tail = o.preview ? `<script>${SITE_JS}<\/script>` : "";
    return `<!doctype html>
<html lang="en" class="no-js"><head>${o.preview ? "" : LF_TRANSCEND + "\n"}<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}"><meta name="theme-color" content="${T.dark}">
<meta property="og:type" content="${d && d.kind === "post" ? "article" : "website"}"><meta property="og:site_name" content="${esc(site.project.name)}"><meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta name="twitter:card" content="summary">
${fav && !o.preview ? `<link rel="icon" href="${C.up}assets/${fav}" type="image/svg+xml">` : ""}${o.preview ? "" : `<link rel="manifest" href="${C.up}site.webmanifest"><link rel="alternate" type="text/markdown" href="index.md" title="Markdown version"><link rel="alternate" type="text/plain" href="${C.up}llms.txt" title="llms.txt">`}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="${fontsHref(site)}">
${style}<script type="application/ld+json">${d ? jsonldDetail(site, d) : jsonld(site, key)}<\/script>${script}</head>
<body>${body}${tail}${o.preview ? "" : "\n" + LF_BODY_END() + "\n"}</body></html>
`;
  }
  function llms(site, full) {
    const lines = [`# ${site.project.name}`, "", `> ${text(site.project.description)}`, "", `${site.project.name} is a project hosted by the Linux Foundation.`, "", "## Pages", ""];
    PAGES.filter(p => p.key !== "campaign").forEach(p => lines.push(`- [${p.title}](${abs(site, p.path)}): ${desc(site, p.key)}`));
    const po = details(site, "post"), ev = details(site, "event");
    if (po.length) { lines.push("", "## News", ""); po.forEach(d => lines.push(`- [${d.item.title}](${abs(site, d.path)}): ${clip(d.item.excerpt || mdPlain(d.item.body), 160)}`)); }
    if (ev.length) { lines.push("", "## Events", ""); ev.forEach(d => lines.push(`- [${d.item.name}](${abs(site, d.path)}): ${[d.item.date, d.item.location].filter(has).join(", ")}`)); }
    lines.push("", "## Optional", "", `- [Full text](${abs(site, "/llms-full.txt")}): every page as Markdown`, "", "Every page is also available as Markdown at <page>/index.md, or by requesting it with Accept: text/markdown.");
    if (!full) return lines.join("\n") + "\n";
    const out = [`# ${site.project.name}: full site text`, ""];
    PAGES.forEach(p => out.push(mdTwin(site, p.key).replace(/^---[\s\S]*?---\n\n/, ""), ""));
    allDetails(site).forEach(d => out.push(mdTwin(site, null, d).replace(/^---[\s\S]*?---\n\n/, ""), ""));
    return out.join("\n");
  }

  /* ---------------------------------------------------------------- the files in the zip */
  function a11yDoc(site) {
    const T = tokens(site.brand), A = site.meta && site.meta.audit;
    const rows = T.pairs.map(p => `| ${p.what} | \`${p.fg}\` on \`${p.bg}\` | ${p.ratio}:1 | ${p.min}:1 | ${p.pass ? "Pass" : "**Fail**"} |`).join("\n");
    const audited = A ? `Audited ${A.at} with ${A.tool} at ${A.viewports.join(" and ")}: ${A.pages} pages plus the editor, ${A.states.join(", ")}.\n\n- WCAG 2.2 A and AA rule violations: **${A.violations}**\n- Contrast measured on every rendered text element: ${A.textChecked} checked, **${A.contrastFails}** under the minimum\n- Items for a person to review (axe "incomplete"): ${A.incomplete}\n${A.edited ? `\n**Copy was edited in edit.html after this audit (${site.meta.edited_at}).** Colours and structure can't change in the editor, but re-run the website skill on the edited site.json before launch for a fresh report.\n` : ""}`
      : "Automated audit not run (headless Chrome was unavailable when this zip was built). The colour pairs below are still enforced by the engine. Re-run the website skill with puppeteer installed for the full report.";
    return `# Accessibility: ${site.project.name} website

Target: **WCAG 2.2 Level AA**.

## Automated audit
${audited}

## Colour pairs used by the stylesheet
Brand colours are kept wherever they pass; where one doesn't, the nearest passing tint of the same hue is used for that use only.

| Use | Colours | Ratio | Minimum | Result |
|---|---|---|---|---|
${rows}
${T.notes.length ? `\nSubstitutions: ${T.notes.join("; ")}.\n` : ""}
## Built in
- Skip link, landmarks (banner, main navigation, breadcrumb, main, footer), one h1 per page and ordered headings
- Keyboard-operable menus (disclosure buttons with aria-expanded, Escape closes and returns focus); everything reachable without JavaScript
- Visible 3px focus ring on every interactive element, white on dark grounds
- Consent is LF's Transcend consent manager, loaded first in every page head; "Cookie settings" in the footer reopens it. Its banner is LF's shared component and is audited as rendered
- Form fields have visible labels, a 3:1 border, native required-field errors and a status message region
- Targets at least 24 × 24 px (2.5.8); reflows to 320 px wide with no horizontal scroll (1.4.10)
- Respects reduced-motion; links in text are underlined, not colour-only (1.4.1)
- Logo parts under 3:1 against their ground are recoloured (1.4.11); logos have alt text

## Still on people before launch
- Alt text for any images you add (member logos, speaker photos, og image)
- Captions and transcripts for any video or audio
- Plain-language review of edited copy, and link text that makes sense out of context
- A manual screen-reader and keyboard pass on the final hosted site
`;
  }
  function hostingNote(site) {
    const h = (site.launch || {}).hosting;
    if (h === "export") return `## Publish on your own GitHub
1. Create a repository in your GitHub org and push this folder's contents to \`main\`.
2. Settings → Pages → Source: **GitHub Actions**. The included \`.github/workflows/pages.yml\` deploys on every push (it leaves \`edit.html\` out of the published site).
3. Custom domain: add it under Settings → Pages and point DNS at \`<your-org>.github.io\`.
The project hosts and maintains this site; keep LF's required scripts in every page.

`;
    if (h === "managed") return `## Maintained in Marketing OS
LF hosts this site. Change text in the Marketing OS editor (existing fields), and add blog posts and events there with text, images and code. Save your changes and ask Claude to publish them. Other structure, the design and the domain are locked.

`;
    if (h === "lf-github") return `## Published on LF GitHub
The site is edited only in its repository in the LF GitHub org: change \`site.json\` (or the templates) and open a pull request; the workflow rebuilds and re-audits on merge. Blog posts and events can also be written in the Marketing OS posts and events editor; Claude merges them into \`site.json\` as a pull request.

`;
    if (h === "wordpress") return `## Requested for WordPress
This package was sent to the Web Engineering team with an Asana request to build the site in WordPress. \`site.json\` holds every field per page.

`;
    return "";
  }
  function readme(site, o) {
    const n = site.project.name, ck = check(site);
    return `# ${n} website

Static HTML/CSS/JS, generated by the LFX Marketing OS (lfx-mos-website ${VERSION}) from the project's messaging framework, message house, boilerplates, FAQ and brand kit.

## Preview
Open \`index.html\` in a browser. Links work straight from the folder${o.pretty ? " when served from the site root" : ""}.

## Edit copy
Open \`edit.html\`: pick a page, edit the fields, watch the preview, then **Download .zip**. The new zip contains the updated site and an updated editor, so you can keep editing. Brand colours, fonts and layout aren't editable there: change them in the brand kit and rebuild with the website skill.

## Before launch
- Replace every placeholder in [brackets] (${ck.placeholders.length} left when this zip was made; edit.html lists them).
- Connect the newsletter form (\`form.lf-signup\`) to the LFX form endpoint: set it under Site settings in edit.html. Until then the form shows a "not connected yet" message.
- Add \`assets/og.png\` (1200 × 630) for social previews and a link to it in each page head, if wanted.
- Consent and analytics: every page carries LF's required scripts: Transcend first in the head, the cookie-settings handler and LFX Segment at the end of the body. They are fixed; don't edit or remove them.
- Hosting: any static host. ${o.pretty ? "Links are root-relative (/about/)." : "Links point at \`…/index.html\` so the folder previews locally; rebuild with pretty URLs for hosting if preferred."}

## What's here
| Path | What |
|---|---|
| \`index.html\`, \`about/…\`, \`events/\`, \`news/\`, \`get-involved/\`, \`join/\`, \`campaign/\` | the 11 pages |
| \`assets/site.css\`, \`assets/site.js\` | styles (brand tokens) and progressive behaviour (menu, form status) |
| \`assets/logo*.svg\` | the project's real logo files, recoloured only where WCAG needs it |
| \`404.html\`, \`robots.txt\`, \`sitemap.xml\`, \`llms.txt\`, \`llms-full.txt\`, \`site.webmanifest\` | SEO / answer-engine files; JSON-LD is in each page head |
| \`site.json\` | all copy and settings; the source for edit.html and for a future WordPress import |
| \`ACCESSIBILITY.md\` | WCAG 2.2 AA audit summary and colour pairs |

${hostingNote(site)}## WordPress (later)
This package is static on purpose. Moving to WordPress on Pantheon is being worked out with LF IT and the product team; \`site.json\` holds every field per page so it can be mapped to blocks or an import file then.
`;
  }
  function files(site, o = {}) {
    const pretty = o.pretty != null ? o.pretty : !!(site.meta && site.meta.pretty);
    const f = {}, oo = { pretty };
    PAGES.forEach(p => { const dir = p.path === "/" ? "" : p.path.slice(1); f[dir + "index.html"] = page(site, p.key, oo); f[dir + "index.md"] = mdTwin(site, p.key); });
    allDetails(site).forEach(d => { f[d.path.slice(1) + "index.html"] = page(site, d.key, Object.assign({}, oo, { detail: { kind: d.kind, i: d.i } })); f[d.path.slice(1) + "index.md"] = mdTwin(site, null, d); });
    Object.keys(site.media || {}).forEach(id => { const p = mediaPath(site, id); if (p) f[p] = b64bytes(site.media[id].data); });
    f["assets/site.css"] = css(site);
    f["assets/site.js"] = SITE_JS + "\n";
    const L = logoFiles(site); Object.keys(L).forEach(k => { f["assets/" + k] = L[k]; });
    f["404.html"] = page(site, "home", { pretty: true }).replace(/<main id="main">[\s\S]*<\/main>/, `<main id="main"><section class="page-head"><div class="wrap"><h1>Page not found</h1><p>Try the <a href="/">home page</a>.</p></div></section></main>`)
      .replace(/<title>[^<]*<\/title>/, `<title>Page not found | ${esc(site.project.name)}</title><meta name="robots" content="noindex">`);
    const signal = (site.agent && site.agent.content_signal) || "ai-train=yes, search=yes, ai-input=yes";
    f["robots.txt"] = `# Agents and crawlers: every page is also served as Markdown (see /llms.txt)\nUser-agent: *\nContent-Signal: ${signal}\nAllow: /\n\nSitemap: ${abs(site, "/sitemap.xml")}\n`;
    const today = new Date().toISOString().slice(0, 10);
    f["sitemap.xml"] = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PAGES.map(p => p.path).concat(allDetails(site).map(d => d.path)).map(pth => `  <url><loc>${abs(site, pth)}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`;
    f["llms.txt"] = llms(site, false);
    f["llms-full.txt"] = llms(site, true);
    const icon = L["favicon.svg"] ? "favicon.svg" : (L["logo.svg"] ? "logo.svg" : null);
    f["site.webmanifest"] = JSON.stringify({ name: site.project.name, short_name: site.project.short || site.project.name, icons: icon ? [{ src: "assets/" + icon, type: "image/svg+xml", sizes: "any" }] : [], theme_color: tokens(site.brand).dark, background_color: "#ffffff", display: "standalone" }, null, 2);
    f["README.md"] = readme(site, { pretty });
    f["ACCESSIBILITY.md"] = a11yDoc(site);
    f["site.json"] = JSON.stringify(site, null, 2);
    f["_headers"] = HEADERS_FILE;
    f["agent-edge/worker.js"] = EDGE_WORKER;
    f["agent-edge/README.md"] = EDGE_README;
    if (o.engine && o.editor) f["edit.html"] = editorHtml(site, o);
    if ((site.launch || {}).hosting === "export") { f[".nojekyll"] = ""; f[".github/workflows/pages.yml"] = PAGES_WORKFLOW; }
    return f;
  }

  /* ---------------------------------------------------------------- the offline editor's shell (its logic is editor.js) */
  const EDITOR_CSS = `:root{color-scheme:light;--bg:#F9FAFB;--surface:#fff;--sunk:#F1F5F9;--ink:#0F172A;--text:#334155;--muted:#5A6A7E;--rule:#8796A9;--line:#E2E8F0;--accent:#006DBE;--accent-hover:#005A9E;--accent-bright:#0094FF;--accent-soft:#EBF5FF;--warn:#B45309;--warn-soft:#FFFBEB;--ok:#047857;--ok-soft:#ECFDF5;--bad:#B91C1C;--shadow:0 1px 3px 0 #0000001a,0 1px 2px -1px #0000001a;--slab:"Roboto Slab",Georgia,serif;--mono:"Roboto Mono",ui-monospace,Menlo,Consolas,monospace}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:14.5px/1.5 Inter,system-ui,-apple-system,"Segoe UI",sans-serif}button,input,textarea,select{font:inherit;color:inherit}
:focus-visible{outline:2px solid var(--accent-bright);outline-offset:2px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
.bar{position:sticky;top:0;z-index:5;background:var(--surface);border-bottom:1px solid var(--line);box-shadow:var(--shadow);display:flex;gap:10px;align-items:center;padding:10px 16px;flex-wrap:wrap}
.bar h1{font:700 17px var(--slab);margin:0;color:var(--ink)}.bar .sp{flex:1}.btn{border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:999px;padding:7px 14px;cursor:pointer;font-weight:500;font-size:13.5px;min-height:36px;white-space:nowrap}
.btn:hover{border-color:var(--accent-bright);color:var(--accent)}.btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}.btn.primary:hover{background:var(--accent-hover);color:#fff}.btn.sm{padding:3px 10px;font-size:13px;min-height:28px}
.btn[aria-pressed=true]{background:var(--accent-soft);border-color:var(--accent-bright);color:var(--accent)}
.layout{display:grid;grid-template-columns:200px minmax(320px,420px) minmax(0,1fr);gap:16px;padding:16px;align-items:start}
.pages{position:sticky;top:70px;display:flex;flex-direction:column;gap:2px}.pages button{text-align:left;border:0;background:transparent;padding:8px 10px;border-radius:8px;cursor:pointer;color:var(--ink);display:flex;justify-content:space-between;gap:8px}
.pages button:hover{background:var(--sunk)}.pages button[aria-current=true]{background:var(--accent-soft);color:var(--accent);font-weight:600}
.cnt{font-size:12px;background:var(--warn-soft);color:var(--warn);border-radius:999px;padding:0 7px;align-self:center}
.fields{display:flex;flex-direction:column;gap:12px;min-width:0}.f{display:flex;flex-direction:column;gap:4px}.f label,.f legend{font-size:12.5px;font-weight:600;color:var(--ink)}
.f input,.f textarea{width:100%;border:1px solid var(--rule);border-radius:6px;padding:8px 10px;background:var(--surface);color:var(--ink)}.f textarea{min-height:76px;resize:vertical}
.f .hint{font-size:12.5px;color:var(--muted)}.f .warnline{font-size:12.5px;color:var(--warn)}
fieldset{border:1px solid var(--line);border-radius:10px;padding:10px 12px 12px;margin:0;background:var(--surface);box-shadow:var(--shadow);display:flex;flex-direction:column;gap:10px}
.obj{border-top:1px solid var(--line);padding-top:10px;display:flex;flex-direction:column;gap:8px}.obj:first-of-type{border-top:0;padding-top:0}.objbar{display:flex;gap:6px;align-items:center}.objbar b{flex:1;font-size:13px;color:var(--ink)}
.preview{position:sticky;top:70px;min-width:0}.frame{border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff;box-shadow:var(--shadow);margin:0 auto;transition:width .2s}.frame iframe{display:block;width:100%;height:calc(100vh - 130px);border:0}
.ptools{display:flex;gap:6px;align-items:center;margin-bottom:8px;flex-wrap:wrap}.ptools .addr{flex:1;font:12px var(--mono);color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.checks{border:1px solid var(--line);border-radius:10px;background:var(--surface);padding:10px 12px;box-shadow:var(--shadow)}.checks h2{font:700 14px var(--slab);margin:0 0 6px;color:var(--ink)}.checks ul{margin:0;padding-left:18px;font-size:13px}
.checks .ok{color:var(--ok)}.notice{border:1px solid var(--accent-bright);background:var(--accent-soft);color:var(--ink);border-radius:10px;padding:10px 12px;font-size:13.5px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.status{font-size:13px;color:var(--muted)}
@media (max-width:1100px){.layout{grid-template-columns:1fr}.pages{position:static;flex-direction:row;flex-wrap:wrap}.preview{position:static}.frame iframe{height:70vh}}
.rich .rtools{display:flex;flex-wrap:wrap;gap:4px}.richtext{font-family:var(--mono);font-size:13.5px;min-height:240px}
.imgform{border:1px solid var(--rule);border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:6px;background:var(--sunk)}.imgform[hidden]{display:none}.imgform .row{display:flex;gap:6px;flex-wrap:wrap}.err{color:var(--bad);font-size:13px}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}`;
  function editorHtml(site, o) {
    const json = JSON.stringify(site).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Edit the ${esc(site.project.name)} website</title>
<style>${EDITOR_CSS}</style></head><body><div id="app"><p style="padding:16px">Loading the editor…</p></div>
<noscript><p style="padding:16px">The editor needs JavaScript. The site itself works without it: open index.html.</p></noscript>
<script id="site-data" type="application/json">${json}<\/script>
<script id="sitegen">${o.engine}<\/script>
<script id="site-editor">${o.editor}<\/script>
</body></html>
`;
  }

  /* ---------------------------------------------------------------- editable fields per page (the editor's form) */
  const ST = (k, l, h) => ({ k, l, t: "text", h }), SA = (k, l, h) => ({ k, l, t: "area", h }), SO = (k, l, keys, h) => ({ k, l, t: "objs", keys, h });
  const FIELDS = {
    home: [ST("pages.home.hero.eyebrow", "Eyebrow"), SA("pages.home.hero.headline", "Headline (the page's h1)"), SA("pages.home.hero.sub", "Subhead"),
      ST("pages.home.hero.cta_primary", "Primary button (goes to Join)"), ST("pages.home.hero.cta_secondary", "Secondary button (goes to About)"),
      ST("pages.home.pillars_eyebrow", "Pillars eyebrow"), ST("pages.home.pillars_title", "Pillars title"),
      SO("pages.home.pillars", "Pillars", [["title", "Title"], ["text", "Text", "area"], ["points", "Proof points (one per line)", "lines"]]),
      SO("pages.home.stats", "Key numbers", [["value", "Number"], ["label", "Label"]], "Only numbers stated in the sources."),
      ST("pages.home.members_title", "Members band title"),
      ST("pages.home.cta.headline", "Closing call-to-action headline"), SA("pages.home.cta.text", "Closing call-to-action text"), ST("pages.home.cta.button", "Closing button"),
      SO("pages.home.faq", "FAQ (also published as FAQ structured data)", [["q", "Question"], ["a", "Answer", "area"]]),
      ST("pages.home.seo_title", "SEO title", "60 characters or fewer."), SA("pages.home.seo_description", "SEO description", "160 characters or fewer.")],
    about: [ST("pages.about.eyebrow", "Eyebrow"), ST("pages.about.headline", "Headline"), SA("pages.about.intro", "Intro"), SO("pages.about.sections", "Sections", [["title", "Title"], ["text", "Text (blank line between paragraphs)", "area"]]),
      ST("pages.about.audiences_title", "Audiences title"), SO("pages.about.audiences", "Audiences", [["title", "Audience"], ["text", "What we lead with", "area"]]), SA("pages.about.seo_description", "SEO description")],
    governing_board: [ST("pages.governing_board.headline", "Headline"), SA("pages.governing_board.intro", "Intro"), SO("pages.governing_board.people", "Board members", [["name", "Name"], ["role", "Role"], ["title", "Title"], ["org", "Organization"]])],
    technical_committee: [ST("pages.technical_committee.headline", "Headline"), SA("pages.technical_committee.intro", "Intro"), SO("pages.technical_committee.people", "Committee members", [["name", "Name"], ["role", "Role"], ["title", "Title"], ["org", "Organization"]]), ST("pages.technical_committee.charter_url", "Technical charter link")],
    members: [ST("pages.members.headline", "Headline"), SA("pages.members.intro", "Intro"), SO("pages.members.tiers", "Tiers", [["name", "Tier"], ["members", "Members (one per line)", "lines"]])],
    contact: [ST("pages.contact.headline", "Headline"), SA("pages.contact.intro", "Intro"), SO("pages.contact.channels", "Contact channels", [["label", "Label"], ["value", "Email or text"]])],
    events: [ST("pages.events.headline", "Headline"), SA("pages.events.intro", "Intro"), SO("pages.events.items", "Events", [["name", "Name"], ["date", "Date (YYYY-MM-DD for structured data)"], ["location", "Location"], ["url", "Event website link"], ["body", "Event details (gives the event its own page)", "rich"]])],
    blog: [ST("pages.blog.headline", "Headline"), SA("pages.blog.intro", "Intro"), SO("pages.blog.posts", "Posts", [["title", "Title"], ["date", "Date (YYYY-MM-DD)"], ["author", "Author"], ["excerpt", "Summary (lists, search results)", "area"], ["body", "Post (gives the post its own page)", "rich"], ["url", "Link elsewhere (used only without a post body)"]])],
    get_involved: [ST("pages.get_involved.headline", "Headline"), SA("pages.get_involved.intro", "Intro"), SO("pages.get_involved.ways", "Ways to get involved", [["title", "Title"], ["text", "Text", "area"], ["cta", "Link text"], ["url", "Link (https://…, /events/, /join/ or #signup)"]])],
    join: [ST("pages.join.headline", "Headline"), SA("pages.join.intro", "Intro"), SO("pages.join.tiers", "Membership tiers", [["name", "Tier"], ["text", "Description", "area"], ["benefits", "Benefits (one per line)", "lines"]]), ST("pages.join.cta", "Button"), ST("pages.join.cta_url", "Button link")],
    campaign: [ST("pages.campaign.eyebrow", "Eyebrow"), SA("pages.campaign.headline", "Headline"), SA("pages.campaign.sub", "Subhead"), SA("pages.campaign.body", "Body (blank line between paragraphs)"), ST("pages.campaign.cta", "Button"), ST("pages.campaign.cta_url", "Button link"), SA("pages.campaign.seo_description", "SEO description")],
    settings: [ST("project.name", "Project name"), ST("project.short", "Short name"), SA("project.tagline", "Tagline (footer)"), SA("project.description", "Description (structured data, llms.txt)"), ST("project.domain", "Domain (no https://)"),
      ST("announcement.text", "Announcement bar text (blank hides it)"), ST("announcement.link", "Announcement link"),
      ST("social.github", "GitHub URL"), ST("social.linkedin", "LinkedIn URL"), ST("social.x", "X URL"), ST("social.slack", "Slack URL"), SA("project.legal", "Footer legal line"),
      ST("signup.headline", "Sign-up headline (every page)"), SA("signup.text", "Sign-up text"), ST("signup.button", "Sign-up button"), SA("signup.consent", "Consent text (LF universal consent)"), ST("signup.endpoint", "LFX form endpoint URL")],
  };

  /* ---------------------------------------------------------------- zip (stored, no compression; no dependencies) */
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = u8 => { let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  function zip(fileMap, prefix = "", date = new Date()) {
    const enc = new TextEncoder(), parts = [], central = []; let off = 0, n = 0;
    const dt = ((date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1)) & 0xFFFF, dd = (((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()) & 0xFFFF;
    for (const name of Object.keys(fileMap)) {
      const content = fileMap[name], nm = enc.encode(prefix + name), data = typeof content === "string" ? enc.encode(content) : content, crc = crc32(data);
      const h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true); h.setUint16(10, dt, true); h.setUint16(12, dd, true);
      h.setUint32(14, crc, true); h.setUint32(18, data.length, true); h.setUint32(22, data.length, true); h.setUint16(26, nm.length, true); h.setUint16(28, 0, true);
      parts.push(new Uint8Array(h.buffer), nm, data);
      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(10, 0, true); c.setUint16(12, dt, true); c.setUint16(14, dd, true);
      c.setUint32(16, crc, true); c.setUint32(20, data.length, true); c.setUint32(24, data.length, true); c.setUint16(28, nm.length, true); c.setUint32(42, off, true);
      central.push(new Uint8Array(c.buffer), nm); off += 30 + nm.length + data.length; n++;
    }
    const cs = central.reduce((s, a) => s + a.length, 0), e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(8, n, true); e.setUint16(10, n, true); e.setUint32(12, cs, true); e.setUint32(16, off, true);
    const all = parts.concat(central, [new Uint8Array(e.buffer)]), out = new Uint8Array(all.reduce((s, a) => s + a.length, 0)); let p = 0;
    for (const a of all) { out.set(a, p); p += a.length; }
    return out;
  }

  const isSite = o => !!(o && typeof o === "object" && o.version && o.pages && o.pages.home && o.project);
  return { VERSION, HOSTING, details, md, mdTwin, htmlToMd, MEDIA_EXT, HEADERS_FILE, EDGE_WORKER, LF_TRANSCEND, LF_COOKIE_SETTINGS, LF_SEGMENT, LF_ZOOMINFO, LF_HUBSPOT, PAGES, FIELDS, fromContent, defaults, tokens, check, css, page, jsonld, files, editorHtml, zip, slug, text, ratio, isSite, SITE_JS };
});
