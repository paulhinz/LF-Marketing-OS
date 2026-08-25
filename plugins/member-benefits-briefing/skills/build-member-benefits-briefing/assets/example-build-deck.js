/*
 * WORKED EXAMPLE — Google Executive Briefing (August 2026)
 * "[Company] and the Linux Foundation", styled to the LF executive briefing template.
 *
 * How to use: COPY this file and rewrite the member-specific slides (title; the
 * "Overview of [Company] in the LF" section, slides 12-19; the member spotlight
 * slides) with fresh LFX data. Standing-narrative stats are dated Aug 2026 —
 * verify freshness before reuse. See ../references/ for the style guide,
 * deck outline, and LFX query recipes.
 *
 * Prereqs: pptxgenjs on NODE_PATH; /tmp/gradbar.png (run make_gradient.py first).
 * Run: node example-build-deck.js "Company and the Linux Foundation.pptx"
 */
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

const C = {
  navy: "0F2439",      // dark navy (cards, section bg)
  navyD: "0B1C2E",     // deeper navy (title bg)
  title: "17293B",     // slide-title text
  ink: "2E3B49",       // body text on light
  gray: "5A6B7F",
  cyan: "39ACD3",      // accent stripe
  skyDark: "5CB6DF",   // caps kicker on dark
  sky: "7CC8E8",       // light-blue text on navy
  card: "F4F6F7", cardLine: "DFE5EA",
  white: "FFFFFF"
};
const F = "Arial";
const W = 13.33, MX = 0.6, CW = W - 2 * MX;
const GRAD = "/tmp/gradbar.png";
let pageNo = 0;

/* ---- LF logo lockup drawn from shapes (recreation; swap for official asset externally) ---- */
function lfLogo(s, x, y, sc, dark) {
  const fg = dark ? C.white : C.title;
  const bg = dark ? C.navy : C.white;
  const m = 0.34 * sc;            // mark size
  const t = 0.075 * sc;           // frame thickness
  s.addShape("rect", { x, y, w: m, h: m, fill: { color: fg } });
  s.addShape("rect", { x: x + t, y: y + t, w: m - 2 * t, h: m - 2 * t, fill: { color: bg } });
  s.addShape("rect", { x: x + m * 0.58, y, w: m * 0.42, h: t, fill: { color: bg } });
  s.addShape("rect", { x: x + m - t, y, w: t, h: m * 0.42, fill: { color: bg } });
  s.addShape("rect", { x: x + t + 0.035 * sc, y: y + t + 0.035 * sc, w: 0.09 * sc, h: 0.09 * sc, fill: { color: fg } });
  s.addText([
    { text: "THE", options: { fontSize: 5.5 * sc, bold: true, color: fg, charSpacing: 2, breakLine: true } },
    { text: "LINUX", options: { fontSize: 9 * sc, bold: true, color: fg, charSpacing: 1, breakLine: true } },
    { text: "FOUNDATION", options: { fontSize: 4.6 * sc, color: fg, charSpacing: 2 } }
  ], { x: x + m + 0.06 * sc, y: y - 0.05 * sc, w: 1.1 * sc, h: m + 0.12 * sc, fontFace: F, margin: 0, valign: "middle", lineSpacingMultiple: 0.9 });
}

function gradBar(s) { s.addImage({ path: GRAD, x: 0, y: 0, w: W, h: 0.1 }); }

function chrome(s, opts) { // per-slide furniture on light slides
  pageNo++;
  gradBar(s);
  lfLogo(s, 0.55, 6.98, 0.95, false);
  s.addText(String(pageNo), { x: W - 1.0, y: 7.02, w: 0.5, h: 0.3, fontSize: 10, color: C.gray, align: "right", fontFace: F, margin: 0 });
  if (opts && opts.src) s.addText(opts.src, { x: 3.2, y: 7.06, w: 9.0, h: 0.3, fontSize: 8, italic: true, color: "8CA0B8", align: "right", fontFace: F, margin: 0, valign: "middle" });
}
function darkChrome(s) {
  pageNo++;
  gradBar(s);
  lfLogo(s, 0.55, 6.85, 1.05, true);
}

function slideTitle(s, t, size) {
  s.addText(t, { x: MX, y: 0.38, w: CW, h: 0.85, fontSize: size || 23, bold: true, color: C.title, fontFace: F, margin: 0, valign: "top" });
}

/* navy quote/note block with cyan left stripe */
function quoteBlock(s, main, dash, y, h) {
  s.addShape("rect", { x: MX, y, w: CW, h, fill: { color: C.navy } });
  s.addShape("rect", { x: MX, y, w: 0.09, h, fill: { color: C.cyan } });
  const items = [];
  items.push({ text: main, options: { fontSize: 13, italic: true, bold: true, color: C.white, breakLine: !!dash, paraSpaceAfter: 6 } });
  if (dash) items.push({ text: "— " + dash, options: { fontSize: 11, italic: true, color: C.sky } });
  s.addText(items, { x: MX + 0.35, y: y + 0.12, w: CW - 0.7, h: h - 0.24, fontFace: F, margin: 0, valign: "middle" });
}

/* 4-up big-stat slide */
function statSlide(t, stats, main, dash, src) {
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, t);
  const n = stats.length, gap = 0.28, w = (CW - (n - 1) * gap) / n, y = 1.35, h = 2.55;
  stats.forEach((st, i) => {
    const x = MX + i * (w + gap);
    s.addShape("rect", { x, y, w, h, fill: { color: C.card }, line: { color: C.cardLine, width: 1 } });
    s.addText(st.n, { x: x + 0.12, y: y + 0.2, w: w - 0.24, h: 1.05, fontSize: st.n.length > 7 ? 27 : 36, bold: true, color: C.title, fontFace: F, align: "center", margin: 0, valign: "middle" });
    s.addText(st.l, { x: x + 0.16, y: y + 1.32, w: w - 0.32, h: h - 1.45, fontSize: 10, color: C.ink, fontFace: F, align: "center", margin: 0, valign: "top" });
  });
  const qh = dash ? 1.5 : 1.2;
  quoteBlock(s, main, dash, 4.35, qh);
  chrome(s, { src });
  return s;
}

/* asymmetric two-card slide: left navy, right light (template style) */
function twoCards(t, cards, foot, src, titleSize) {
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, t, titleSize);
  const gap = 0.3, w = (CW - gap) / 2, y = 1.35, h = 4.95;
  cards.forEach((c, i) => {
    const x = MX + i * (w + gap);
    const dark = i === 0;
    if (dark) {
      s.addShape("rect", { x, y, w, h, fill: { color: C.navy } });
      s.addShape("rect", { x, y, w, h: 0.09, fill: { color: C.cyan } });
    } else {
      s.addShape("rect", { x, y, w, h, fill: { color: "FAFBFC" }, line: { color: C.cardLine, width: 1 } });
      s.addShape("rect", { x, y, w: 0.09, h, fill: { color: C.cyan } });
    }
    const head = dark ? C.skyDark : C.gray;
    const stmt = dark ? C.white : C.title;
    const lead = dark ? C.sky : C.title;
    const body = dark ? "E8F1F8" : C.ink;
    const items = [
      { text: c.head, options: { fontSize: 10, bold: true, color: head, charSpacing: 1, breakLine: true, paraSpaceAfter: 8 } },
      { text: c.tag, options: { fontSize: 15, bold: true, color: stmt, breakLine: true, paraSpaceAfter: 10 } }
    ];
    c.body.forEach(b => {
      items.push({ text: b.b, options: { fontSize: 10.5, bold: true, color: lead, bullet: dark ? false : { code: "2022", indent: 10 } } });
      items.push({ text: " — " + b.t, options: { fontSize: 10.5, color: body, breakLine: true, paraSpaceAfter: 8 } });
    });
    s.addText(items, { x: x + 0.32, y: y + 0.28, w: w - 0.64, h: h - 0.5, fontFace: F, margin: 0, valign: "top" });
  });
  if (foot) s.addText(foot, { x: MX, y: 6.45, w: CW, h: 0.45, fontSize: 12, italic: true, bold: true, color: C.title, fontFace: F, align: "center", margin: 0, valign: "middle" });
  chrome(s, { src });
  return s;
}

/* grid of small cards, 3 cols, template style: light card + cyan left stripe */
function gridCards(t, items, foot, src, rows) {
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, t);
  const cols = 3, gap = 0.26;
  const nR = rows || Math.ceil(items.length / cols);
  const w = (CW - (cols - 1) * gap) / cols;
  const y0 = 1.32, totH = foot ? 5.05 : 5.55, h = (totH - (nR - 1) * 0.22) / nR;
  items.forEach((c, i) => {
    const r = Math.floor(i / cols), col = i % cols;
    const x = MX + col * (w + gap), y = y0 + r * (h + 0.22);
    s.addShape("rect", { x, y, w, h, fill: { color: C.card }, line: { color: C.cardLine, width: 0.75 } });
    s.addShape("rect", { x, y, w: 0.07, h, fill: { color: C.cyan } });
    s.addText([
      { text: c.head, options: { fontSize: 12.5, bold: true, color: C.title, breakLine: true, paraSpaceAfter: 5 } },
      { text: c.body, options: { fontSize: 9.5, color: C.ink } }
    ], { x: x + 0.24, y: y + 0.15, w: w - 0.44, h: h - 0.3, fontFace: F, margin: 0, valign: "top" });
  });
  if (foot) s.addText(foot, { x: MX, y: 6.5, w: CW, h: 0.42, fontSize: 12, italic: true, bold: true, color: C.title, fontFace: F, align: "center", margin: 0, valign: "middle" });
  chrome(s, { src });
  return s;
}

function sectionSlide(kicker, t, sub) {
  const s = p.addSlide(); s.background = { color: C.navyD };
  darkChrome(s);
  s.addText(kicker, { x: MX, y: 2.0, w: CW, h: 0.45, fontSize: 14, bold: true, color: C.skyDark, charSpacing: 2, fontFace: F, margin: 0 });
  s.addText(t, { x: MX, y: 2.5, w: CW, h: 1.5, fontSize: 40, bold: true, color: C.white, fontFace: F, margin: 0, valign: "top" });
  s.addText(sub, { x: MX, y: 4.25, w: 11.2, h: 1.3, fontSize: 15, italic: true, color: C.sky, fontFace: F, margin: 0, valign: "top" });
  return s;
}

/* ---------------- 1. TITLE [MEMBER] ---------------- */
{
  const s = p.addSlide(); s.background = { color: C.navyD };
  gradBar(s); pageNo++;
  lfLogo(s, 0.62, 0.75, 2.2, true);
  s.addText("GOOGLE EXECUTIVE BRIEFING   ·   AUGUST 2026", { x: 0.62, y: 2.6, w: CW, h: 0.4, fontSize: 13, bold: true, color: C.skyDark, charSpacing: 1.5, fontFace: F, margin: 0 });
  s.addText("Google and the Linux Foundation", { x: 0.62, y: 3.05, w: CW, h: 1.2, fontSize: 44, bold: true, color: C.white, fontFace: F, margin: 0 });
  s.addText("Open source and AI: what the community built and the challenges we face.", { x: 0.62, y: 4.55, w: 11.2, h: 0.6, fontSize: 18, color: C.sky, fontFace: F, margin: 0 });
  s.addText([
    { text: "Jim Zemlin", options: { bold: true, color: C.white } },
    { text: "   ·   CEO, The Linux Foundation", options: { color: "D3DEE8" } }
  ], { x: 0.62, y: 5.55, w: CW, h: 0.5, fontSize: 15, fontFace: F, margin: 0 });
}

/* ---------------- 2. LF overview [NARRATIVE] ---------------- */
statSlide(
  "The LF is the place where the world writes the code together",
  [
    { n: "1,300+", l: "open source efforts — from kernels to AI frameworks to global standards" },
    { n: "$100B+", l: "shared R&D investment — the largest collaborative software investment in history" },
    { n: "25", l: "years as the neutral place where competitors collaborate — trusted with IP, governance, and brand" },
    { n: "1", l: "Linus Torvalds — the number of in-house developers people can name" }
  ],
  "The LF employs very few developers. What we create is rarer: neutral ecosystems, global standards, shared infrastructure — the scaffolding that lets thousands of competing companies build together.",
  "our job is to make it easy for everyone else's engineers to build together",
  "Source: The Linux Foundation, 2026."
);

/* ---------------- 3. Building blocks [NARRATIVE] ---------------- */
statSlide(
  "LF projects are the fundamental building blocks of modern tech",
  [
    { n: "$8.8T", l: "estimated cost to REPLACE the open source the world depends on (Harvard) — software produced for ~$4.15B" },
    { n: "$723B", l: "public-cloud market — orchestrated by Kubernetes and the 230+ projects of CNCF" },
    { n: "$15.7T", l: "projected GDP added by AI by 2030 (PwC) — built on PyTorch, vLLM, Ray, and MCP" },
    { n: "$500B+", l: "semiconductor industry being reshaped by RISC-V — the fastest-growing open ISA" }
  ],
  "We focus on critical open source, not the long tail. Single-company R&D is one balance sheet and one risk; LF shared R&D is whole industries, with distributed risk and decades of trusted neutrality holding it together.",
  "13 strategic domains, from the kernel to AI, energy, automotive, film, and finance — next slide",
  "Sources: The Linux Foundation · Harvard Business School · PwC, “Sizing the Prize” · public-cloud market estimates."
);

/* ---------------- 4. 13 domains [NARRATIVE] ---------------- */
{
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, "World’s largest shared R&D investment — across 13 strategic domains");
  const domains = [
    ["Cloud Native", "CNCF · Kubernetes · 230+ projects"], ["AI & Data", "PyTorch · LF AI & Data · vLLM"], ["Agentic AI", "AAIF · MCP · A2A · x402"],
    ["Linux & Kernel", "The kernel · eBPF · KernelCI"], ["Security", "OpenSSF · Akrites · Alpha-Omega"], ["Networking & Edge", "LF Networking · LF Edge · SONiC"],
    ["Semiconductors", "RISC-V · CHIPS · Caliptra"], ["Web & Mobile", "OpenJS · React · Node.js"], ["Energy", "LF Energy · standards for the grid"],
    ["Automotive", "AGL · ELISA · safety-critical"], ["Fintech", "FINOS · FinOps · Tokenomics"], ["Film & Media", "ASWF · AOMedia · OpenUSD"],
    ["Public Health & Gov", "Open Health Stack · policy · standards"]
  ];
  const cols = 4, gap = 0.24, w = (CW - (cols - 1) * gap) / cols, h = 1.1;
  domains.forEach((d, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const x = MX + c * (w + gap), y = 1.4 + r * (h + 0.18);
    s.addShape("rect", { x, y, w, h, fill: { color: C.card }, line: { color: C.cardLine, width: 0.75 } });
    s.addShape("rect", { x, y, w: 0.07, h, fill: { color: C.cyan } });
    s.addText([
      { text: d[0], options: { fontSize: 12.5, bold: true, color: C.title, breakLine: true, paraSpaceAfter: 3 } },
      { text: d[1], options: { fontSize: 9.5, color: C.gray } }
    ], { x: x + 0.22, y: y + 0.12, w: w - 0.4, h: h - 0.24, fontFace: F, margin: 0, valign: "top" });
  });
  s.addText("Every domain: one neutral home, shared IP, shared infrastructure — and a seat at the table for the companies that depend on it.", { x: MX, y: 6.6, w: CW, h: 0.4, fontSize: 11.5, italic: true, bold: true, color: C.title, fontFace: F, align: "center", margin: 0 });
  chrome(s, {});
}

/* ---------------- 5. What we do: create ecosystems [NARRATIVE] ---------------- */
{
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, "What we do: create ecosystems");
  s.addText("Successful projects depend on members, developers, standards and infrastructure to develop products that the market will adopt", { x: MX, y: 1.1, w: CW, h: 0.5, fontSize: 12.5, italic: true, color: C.gray, fontFace: F, margin: 0 });
  const steps = ["Members\nfund & govern", "Developers\nwrite the code", "Standards\nmake it interoperable", "Infrastructure\nbuilds & secures it", "Products\nthe market adopts"];
  const gap = 0.42, w = (CW - 4 * gap) / 5, y = 2.35, h = 1.85;
  steps.forEach((st, i) => {
    const x = MX + i * (w + gap);
    if (i === 4) { s.addShape("rect", { x, y, w, h, fill: { color: C.navy } }); s.addShape("rect", { x, y, w, h: 0.08, fill: { color: C.cyan } }); }
    else { s.addShape("rect", { x, y, w, h, fill: { color: C.card }, line: { color: C.cardLine, width: 1 } }); s.addShape("rect", { x, y, w, h: 0.08, fill: { color: C.cyan } }); }
    const parts = st.split("\n");
    s.addText([
      { text: parts[0], options: { fontSize: 14, bold: true, color: i === 4 ? C.white : C.title, breakLine: true, paraSpaceAfter: 4 } },
      { text: parts[1], options: { fontSize: 10.5, color: i === 4 ? C.sky : C.ink } }
    ], { x: x + 0.1, y: y + 0.28, w: w - 0.2, h: h - 0.5, align: "center", fontFace: F, margin: 0, valign: "middle" });
    if (i < 4) s.addText("→", { x: x + w - 0.05, y: y + 0.6, w: gap + 0.1, h: 0.6, fontSize: 20, bold: true, color: C.cyan, align: "center", fontFace: F, margin: 0 });
  });
  quoteBlock(s, "A successful project depends on a chain that the LF orchestrates from end to end.", null, 4.85, 1.0);
  chrome(s, {});
}

/* ---------------- 6. Moving parts [NARRATIVE] ---------------- */
gridCards(
  "Ecosystem building has a lot of moving parts",
  [
    { head: "Neutral management", body: "Home for IP assets · governance structures · business separated from technical decisions · identity beyond any one firm" },
    { head: "Developer recruitment & relations", body: "Meetups, events, hackathons, evangelism · mailing lists, Slack, GitHub, Stack Overflow" },
    { head: "Training & certification", body: "MOOCs (edX), eLearning, classroom, subscription learning · skills-based certification" },
    { head: "Content & marketing", body: "Case studies, whitepapers, blogs, webinars · PR/AR · advocate and recognition programs" },
    { head: "IT beyond GitHub", body: "CI/CD architecture · CI environment delivery · release engineering · project websites and collaboration tooling" },
    { head: "Support & resources", body: "Self-service FAQ, forums, knowledgebase, onboarding · community support · IT operations / release management" }
  ],
  "Every one of these functions would otherwise have to be hired, built, and paid for project by project."
);

/* ---------------- 7. Standards body [NARRATIVE + member spotlight] ---------------- */
twoCards(
  "More than open source: now a top global standards body",
  [
    {
      head: "THE STANDARDS BODY YOU NEVER HEARD OF", tag: "Through the JDF, we author the specs the industry depends on.",
      body: [
        { b: "25+ spec consortia", t: "under the Joint Development Foundation, with 100+ published specifications." },
        { b: "ISO/IEC/ITU PAS submitter", t: "JDF specs fast-track to international standards; SPDX (ISO/IEC 5962) and OpenChain (ISO/IEC 5230) already have." },
        { b: "Turnkey legal & IPR framework", t: "competitors collaborate on specs without legal friction; hosted operations shared with LFX." }
      ]
    },
    {
      head: "SPECS THAT SHOW WHAT “GLOBAL STANDARDS BODY” MEANS", tag: "Adopted in the products you use every day.",
      body: [
        { b: "C2PA", t: "content credentials for images, video, and audio: Pixel 10, Google Photos, Sony, Leica, Adobe, Microsoft, OpenAI — Google is a Steering member." },
        { b: "SPDX & OpenChain", t: "the SBOM and compliance standards behind US EO 14028 and the EU Cyber Resilience Act." },
        { b: "AOMedia AV1", t: "YouTube, Netflix, Meta, Twitch; a Technology & Engineering Emmy® in 2025; AV2 on the way — Google is a founding member." },
        { b: "OpenUSD · 3MF · SLSA", t: "3D interop and digital twins, additive manufacturing, and the security baseline of open source." }
      ]
    }
  ],
  "We are entering the world of IEEE and GSMA, billion-dollar organizations, with 25 years of trusted neutrality behind us."
);

/* ---------------- 8. Banner year [NARRATIVE] ---------------- */
statSlide(
  "2025 was a banner year and 2026 is running ahead of it",
  [
    { n: "$345M", l: "revenue under management in 2025 — 370 staff and growing" },
    { n: "4M+", l: "people trained or certified — the pipeline for the open source workforce" },
    { n: "119K", l: "event attendees across 229 events in 2025 — 62K in person, a record; 93%+ satisfaction" },
    { n: "+142", l: "new projects added in 2025 — 1,300+ active hosted projects in total" }
  ],
  "Strong business operations are the means but impact is the point: adoption of LF technology and standards, supply-chain security, and open-source-aligned public policy.",
  "membership growth on track for the highest ever — seven new major foundations and more to come",
  "Source: The Linux Foundation 2025 business metrics; 2026 membership as of July 2026."
);

/* ---------------- 9. New foundations [NARRATIVE + member spotlight] ---------------- */
gridCards(
  "New foundations at the LF in 2026 and why they matter",
  [
    { head: "React Foundation", body: "The world’s most-used UI library now has a neutral home. Why it matters: the most strategic front-end technology is no longer controlled by one company." },
    { head: "x402 Foundation", body: "The open standard for agentic commerce — the rail that lets AI agents pay and transact. Google is a Premier member alongside Visa, Mastercard, Coinbase, and Cloudflare." },
    { head: "Appia Foundation", body: "The global trust layer for AI: one verifiable conformity framework for the world’s AI rules — Google is a Steering member; Mitsubishi Electric and Omron among founders." },
    { head: "Tokenomics Foundation", body: "With the FinOps Foundation: an open, standard way to measure the ROI of AI usage — a common yardstick for AI value, arriving exactly when CFOs need it." },
    { head: "Open Health Stack Software Foundation", body: "A neutral home for the open building blocks of global digital health — born from Google’s Open Health Stack work; health systems build on shared standards, not silos." },
    { head: "OCUDU Foundation", body: "Open source for AI-native radio networks — the CU/DU software at the heart of 5G/6G RAN, launched at MWC with AMD, AT&T, Ericsson, Nokia, NVIDIA, SoftBank, Verizon." }
  ],
  "Eight new foundations launched or announced at the LF this year — six here, plus the ITAM Forum and Akrites, discussed later in this presentation."
);

/* ---------------- 10. Community growing [NARRATIVE] ---------------- */
statSlide(
  "The Linux Foundation community is growing faster than ever",
  [
    { n: "1M+", l: "developers across all LF projects in 2025 — up ~8× in a decade (128K → 1M+)" },
    { n: "4.5×", l: "today’s membership vs a decade ago (481 → 2,187)" },
    { n: "414", l: "new members so far in 2026" },
    { n: "+44%", l: "vs the same point in 2025 — the fastest pace ever" }
  ],
  "It isn’t just organizations. Developers contributing across every LF project grew roughly eightfold in a decade — passing one million for the first time in 2025 — while new members join at the fastest pace ever.",
  "members 481 → 2,187; developers ~128,000 (2015) → 1,000,000+ (2025)",
  "Linux Foundation membership, and distinct annual contributors across all LF projects, 2015–2026 (as of July 2026)."
);

/* ---------------- 11. Growth accelerating (charts) [NARRATIVE] ---------------- */
{
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, "Growth is not slowing — it is accelerating");
  const common = {
    showLegend: false, showTitle: true, titleFontSize: 13, titleColor: C.title,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.ink, dataLabelFontSize: 11,
    chartColors: [C.navy], catAxisLabelColor: C.gray, valAxisLabelColor: C.gray,
    valGridLine: { color: "E4EBF5", size: 0.5 }, catGridLine: { style: "none" }
  };
  s.addChart(p.ChartType.bar, [{ name: "Members", labels: ["2015", "2026"], values: [481, 2187] }],
    Object.assign({}, common, { x: MX, y: 1.45, w: 5.85, h: 4.5, title: "LF member organizations", barDir: "col" }));
  s.addChart(p.ChartType.bar, [{ name: "Developers (thousands)", labels: ["2015", "2025"], values: [128, 1000] }],
    Object.assign({}, common, { x: 6.9, y: 1.45, w: 5.85, h: 4.5, title: "Annual contributors across LF projects (thousands)", barDir: "col", chartColors: [C.cyan] }));
  chrome(s, { src: "Source: The Linux Foundation membership records; LFX Insights distinct annual contributors." });
}

/* ---------------- 12. SECTION: Working together [MEMBER] ---------------- */
sectionSlide("WORKING TOGETHER", "Overview of Google in the LF", "How Google works within the Linux Foundation, how much it costs, and what you get");

/* ---------------- 13. Google memberships [MEMBER] ---------------- */
twoCards(
  "Google at the Linux Foundation: 44 active memberships",
  [
    {
      head: "GOOGLE — TOP TIER · 20+ PLATINUM & PREMIER SEATS", tag: "Platinum or Premier wherever cloud, AI, and security get decided.",
      body: [
        { b: "In its own name", t: "The Linux Foundation Platinum ($500K) and LF Europe Gold — the anchor seats." },
        { b: "Cloud & AI", t: "CNCF (Platinum), PyTorch (Platinum, joined Dec 2025), AAIF (Platinum, founding), Jupyter (Premier), FinOps (Premier), x402 (Premier)." },
        { b: "Security", t: "OpenSSF (Premier), Alpha-Omega (Premier, $2.5M/yr), Akrites (Premier, 10-FTE, joined Jul 2026), PQCA (Premier), Confidential Computing (Premier)." },
        { b: "Silicon & systems", t: "RISC-V (Premier, $250K), RISE (Premier), KernelCI (Premier), SONiC (Premier), P4 (Premier), Zephyr / eBPF / CHIPS (Platinum)." }
      ]
    },
    {
      head: "STRATEGIC, STEERING & SPECIAL FUNDS", tag: "Breadth across every domain Google’s business touches.",
      body: [
        { b: "Strategic & Gold", t: "LF Energy (Strategic), OpenJS (Gold), FINOS (Gold), AOMedia (Founding)." },
        { b: "Steering", t: "C2PA, Green Software, UXL, App Defense Alliance, Device Automation Bus." },
        { b: "Special funds", t: "Alpha-Omega $2.5M · Caliptra $400K · Supporters of Chromium-Based Browsers $250K (Google-led) — $3.15M of directed funding." },
        { b: "Also", t: "OpenAPI, OCI, Netdev, Ultra Ethernet, DAOS, CCADB, FinOps FOCUS, and JDF spec efforts." }
      ]
    }
  ],
  "Total: 44 active memberships · $7.4M in annual dues — a seat wherever the rules of Google’s markets get written.",
  "Source: LFX membership records, as of August 25, 2026."
);

/* ---------------- 14. People in the room [MEMBER] ---------------- */
twoCards(
  "Google in the room: events and training, last 12 months",
  [
    {
      head: "EVENTS · 767 REGISTRATIONS · 218 AS SPEAKERS", tag: "By google.com corporate email — nearly 1 in 3 attends to speak.",
      body: [
        { b: "Biggest draws", t: "KubeCon + CloudNativeCon Europe 2026 (82) and North America 2025 (81); Linux Plumbers 2025/2026 (55/48); PyTorch Conference 2025 (49) and NA 2026 (43)." },
        { b: "The AI circuit", t: "Ray Summit 2026 (38), gRPConf NA 2026 (27), MCP Dev Summit NA 2026 (26), KubeCon Maintainer Summit (24)." },
        { b: "Speaker share", t: "218 speaker registrations — Google engineers are on stage, not just in seats, at the events that set the agenda." }
      ]
    },
    {
      head: "TRAINING & CERTIFICATION · 125 ENROLLMENTS", tag: "84 course enrollments and 41 certification exams.",
      body: [
        { b: "Most taken", t: "Certified Kubernetes Administrator (21), Intro to Linux (12), Intro to Kubernetes (7), Beginner’s Kernel Development (6), CKAD (4), Prometheus (4)." },
        { b: "The benefit", t: "LF Platinum and project memberships include education coupons and vouchers — most members leave them unredeemed." },
        { b: "Undercounted", t: "matched on google.com addresses only; anyone registering or enrolling with a personal email is not included." }
      ]
    }
  ],
  "LF events put Google engineers in front of the developers who build on Google Cloud — and on the stages where the roadmap gets told.",
  "Source: LFX event registration and training enrollment records, Aug 25, 2025 – Aug 25, 2026."
);

/* ---------------- 15. Where Google leads [MEMBER] ---------------- */
gridCards(
  "Where Google leads: governance seats and code",
  [
    { head: "Kubernetes & CNCF", body: "Kubernetes was born at Google and donated to found CNCF in 2015. Google holds a CNCF Platinum board seat and 143 Kubernetes maintainers — the largest bench of any company — plus 102 more across other CNCF projects." },
    { head: "gRPC, Envoy & observability", body: "gRPC (Google-originated): 73 Google maintainers. 12.6K contributions to Envoy and 15.4K to OpenTelemetry — whose roots trace to Google’s OpenCensus." },
    { head: "The kernel & systems", body: "50 Google maintainers on the Linux kernel, 54 on OpenBMC, 51 on Raspberry Pi Linux; KernelCI Premier with 48 maintainers; eBPF Foundation Platinum." },
    { head: "Agentic AI (AAIF)", body: "Platinum founding member. A2A — donated by Google — has 42 Google contributors this year; 81 more on MCP, 17 on Goose. The .mcp top-level domain application was finalized with Google and Anthropic." },
    { head: "Security", body: "Alpha-Omega co-funder ($2.5M/yr, with Microsoft and Amazon); OpenSSF Premier; Akrites Premier with the 10-FTE commitment (July 2026); Project Zero’s Big Sleep pioneered AI vulnerability-hunting." },
    { head: "PyTorch & AI infrastructure", body: "PyTorch Platinum since Dec 2025 — 13.8K contributions to PyTorch and 8.6K to vLLM this year; Ray, Kubeflow, and the GPU-scheduling layer all run through LF-hosted projects." }
  ],
  "Governance follows code: where Google maintains the most, it also chairs, votes, and sets direction.",
  "Source: LFX Insights and LFX project records, Aug 25, 2025 – Aug 25, 2026."
);

/* ---------------- 16. LFX Insights contributions [MEMBER] ---------------- */
statSlide(
  "LFX Insights: Google is a top-3 contributor to the LF",
  [
    { n: "#3", l: "232,501 code contributions across LF projects in the last 12 months — behind Red Hat (711,595) and Microsoft (295,620); ahead of IBM, Intel, Meta, Amazon" },
    { n: "#2", l: "674 active maintainers across LF projects — behind only Red Hat (929); ahead of Microsoft (551), Amazon (395), IBM (381)" },
    { n: "2,084", l: "active human contributors — #5 behind Microsoft (3,595), Red Hat (2,910), Ericsson (2,550), IBM (2,400)" },
    { n: "143", l: "Kubernetes maintainers — the largest single-project maintainer bench of any company at the LF" }
  ],
  "Google’s maintainer bench is second only to Red Hat’s — and it is concentrated exactly where Google Cloud’s business lives.",
  "where the code lands: CNCF (143K), Kubernetes (82K), gRPC (19K), OpenSSF (16K), OpenTelemetry (15K), the kernel (14K), PyTorch (14K), Zephyr (13K), Envoy (13K), sigstore (11K), vLLM (8.6K)",
  "Source: LFX Insights — code contributions and distinct (non-bot) contributors, all LF projects, Aug 25, 2025 – Aug 25, 2026."
);

/* ---------------- 17. Dues comparison [MEMBER] ---------------- */
{
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, "Google vs. Microsoft, Amazon, and IBM + Red Hat");
  s.addText("CURRENT ANNUAL MEMBERSHIP DUES ACROSS ALL LF PROJECTS — RANKED BY ACCOUNT", { x: MX, y: 1.08, w: CW, h: 0.32, fontSize: 10.5, bold: true, color: C.gray, charSpacing: 1.5, fontFace: F, margin: 0 });
  const rows = [
    ["Microsoft", "42 memberships · $11.67M · #1", "$4.17M core — after $3.0M Overture Maps, $2.5M Alpha-Omega, $2.0M Chromium Supporters"],
    ["Amazon (AWS)", "29 memberships · $9.02M · #2", "$3.52M core — after $3.0M Overture Maps and $2.5M Alpha-Omega"],
    ["Google", "44 memberships · $7.40M · #3", "$4.25M core — after $2.5M Alpha-Omega, $0.4M Caliptra, $0.25M Chromium Supporters — the LARGEST core dues of any LF member"],
    ["IBM + Red Hat", "50 memberships · $5.56M · #4 combined", "$5.56M core — separately #8 and #9; concentrated in AI and security foundations"]
  ];
  const y0 = 1.52, h = 1.0;
  rows.forEach((r, i) => {
    const y = y0 + i * (h + 0.16);
    const isG = i === 2;
    if (isG) { s.addShape("rect", { x: MX, y, w: CW, h, fill: { color: C.navy } }); }
    else s.addShape("rect", { x: MX, y, w: CW, h, fill: { color: C.card }, line: { color: C.cardLine, width: 0.75 } });
    s.addShape("rect", { x: MX, y, w: 0.09, h, fill: { color: C.cyan } });
    s.addText(r[0], { x: MX + 0.35, y: y + 0.1, w: 2.55, h: h - 0.2, fontSize: 15, bold: true, color: isG ? C.white : C.title, fontFace: F, margin: 0, valign: "middle" });
    s.addText(r[1], { x: MX + 3.0, y: y + 0.1, w: 3.6, h: h - 0.2, fontSize: 12, bold: true, color: isG ? C.sky : C.title, fontFace: F, margin: 0, valign: "middle" });
    s.addText(r[2], { x: MX + 6.8, y: y + 0.1, w: CW - 7.1, h: h - 0.2, fontSize: 10, color: isG ? "E8F1F8" : C.ink, fontFace: F, margin: 0, valign: "middle" });
  });
  s.addText("#3 by total dues — #1 in core membership dollars. Google holds the broadest committed portfolio in the LF: 44 memberships spanning every strategic domain.", { x: MX, y: 6.35, w: CW, h: 0.42, fontSize: 12, italic: true, bold: true, color: C.title, fontFace: F, align: "center", margin: 0 });
  chrome(s, { src: "Source: LFX membership records, as of August 25, 2026. Core = memberships excluding special directed funds." });
}

/* ---------------- 18. What the dues pay for [MEMBER-flavored NARRATIVE] ---------------- */
gridCards(
  "What the dues pay for — and why so many foundations",
  [
    { head: "Convening", body: "Every project meeting scheduled, hosted, recorded, minuted, and run under antitrust rules by foundation staff. The neutral room where competitors sit down together is the product. Nobody else can host it." },
    { head: "Leading", body: "Board seats, TOC and TAC seats, chairs: CNCF Platinum board seat, PyTorch, AAIF, OpenSSF, Akrites, RISC-V. Leadership turns one company’s roadmap into the ecosystem’s roadmap — and it is only available to members." },
    { head: "Speaking & reach", body: "218 Google speaker registrations in 12 months. The KubeCon and PyTorch Conference keynote stage — where a platform company tells the developers who build on it what comes next — does not exist without the foundation that runs it." },
    { head: "Software development", body: "232,000+ contributions a year from Google engineers, multiplied by everyone else’s. Members write the code; dues pay for everything that is not code: CI and release engineering, security response, LFX tooling, and the maintainer-of-last-resort backstop." },
    { head: "IP & standards", body: "Neutral ownership of trademarks and copyrights; CLAs and license compliance; specs fast-tracked to ISO through the JDF and adopted industry-wide (C2PA, AV1, SPDX). The reason a competitor builds on Kubernetes — and buys GKE on top of it — is that Google doesn’t own the project." },
    { head: "And more", body: "Training and certification (125 Google enrollments this year), research, policy and government affairs (EU CRA, the open-weight letter), marketing and PR, legal counsel, analytics — the operational scaffolding every project would otherwise hire for itself." }
  ],
  "Each foundation is where a different market’s rules get written — and a seat is the only way to write them."
);

/* ---------------- 19. ROI [MEMBER] ---------------- */
statSlide(
  "The ROI: what $7.4M a year buys",
  [
    { n: "<0.02%", l: "of annual R&D — $7.4M in dues against ~$49B of R&D spend (2024)" },
    { n: "2×", l: "productivity for firms that contribute vs. only consume (Harvard/Nagle) — 2,084 active contributors" },
    { n: "3.5×", l: "what it would cost to build the same software alone — the GKE, Vertex AI, and Android substrate included" },
    { n: "44", l: "seats where the rules for cloud, AI, security, and silicon get set — including the CNCF board" }
  ],
  "The dues don’t buy code — your engineers write the code. The dues buy the neutral place where two thousand other companies’ engineers write it with you, and the seats where the rules get set.",
  "what replacing it looks like: your own foundations, conferences, standards process, security response team, and IP lawyers — and still no neutrality, which is what makes competitors adopt what you build",
  "Sources: LFX (2026) · Nagle, “Learning by Contributing” · Hoffmann, Nagle & Zhou, HBS WP 24-038 · Alphabet 2024 R&D expense."
);

/* ---------------- 20. SECTION: Open Source AI [NARRATIVE] ---------------- */
sectionSlide("THE BIGGER PICTURE", "Open Source AI", "Open source won the AI stack at every layer — and the prize for winning is a new set of problems only openness can solve.");

/* ---------------- 21. Infrastructure buildout [NARRATIVE] ---------------- */
statSlide(
  "The infrastructure being built right now is the largest in tech history",
  [
    { n: "$900B", l: "2026 Big-Tech AI infrastructure spend" },
    { n: "$1.4T", l: "projected for 2027 alone (The Economist)" },
    { n: "$450B", l: "spent in 2025 — this year’s spend has doubled" },
    { n: "$400B+", l: "borrowed this year to fund the buildout" }
  ],
  "“The AI capex boom is fast becoming the largest investment surge in history.”",
  "The Economist, July 28, 2026 · steeper than canal, railway and dot-com booms",
  "Sources: The Economist (Jul 28, 2026) · Bank for International Settlements · US Bureau of Economic Analysis."
);

/* ---------------- 22. The stack [NARRATIVE] ---------------- */
{
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, "Open source runs every layer above the hardware, much of it at the LF");
  const layers = [
    ["AGENTS", "MCP · A2A · x402 · AGENTS.md · Goose · Agent Router · Agent Client Protocol", "20,000+", "MCP servers (2026)"],
    ["MODELS", "Llama · DeepSeek · Qwen · Gemma · GLM · Kimi · Muse Glimmer", "6–8×", "cheaper, near-parity on coding"],
    ["INFERENCE", "vLLM · SGLang · Ray · llm-d · AIBrix", "10× / yr", "cost decline, software optimization"],
    ["TRAINING", "PyTorch · DeepSpeed · Ray · Kubeflow · TorchTitan", "85%", "of Hugging Face models"],
    ["INFRASTRUCTURE", "Linux · Kubernetes · containerd · Volcano", "90%+", "of cloud"]
  ];
  const y0 = 1.35, h = 0.95;
  layers.forEach((l, i) => {
    const y = y0 + i * (h + 0.12);
    s.addShape("rect", { x: MX, y, w: CW, h, fill: { color: i % 2 ? C.card : C.navy } });
    s.addShape("rect", { x: MX, y, w: 0.09, h, fill: { color: C.cyan } });
    const dark = !(i % 2);
    s.addText(l[0], { x: MX + 0.3, y: y + 0.1, w: 2.5, h: h - 0.2, fontSize: 14, bold: true, color: dark ? C.white : C.title, charSpacing: 1.5, fontFace: F, margin: 0, valign: "middle" });
    s.addText(l[1], { x: MX + 2.95, y: y + 0.1, w: 6.35, h: h - 0.2, fontSize: 11, color: dark ? "E8F1F8" : C.ink, fontFace: F, margin: 0, valign: "middle" });
    s.addText([
      { text: l[2] + "  ", options: { fontSize: 16, bold: true, color: dark ? C.sky : C.title } },
      { text: l[3], options: { fontSize: 9.5, color: dark ? C.sky : C.gray } }
    ], { x: MX + 9.4, y: y + 0.1, w: CW - 9.7, h: h - 0.2, fontFace: F, margin: 0, valign: "middle" });
  });
  chrome(s, { src: "MCP registry (Glama) 2026 · Artificial Analysis (open- vs closed-model cost & coding parity, May 2026)." });
}

/* ---------------- 23. Infra & training won [NARRATIVE] ---------------- */
twoCards(
  "Infrastructure & training: the layers that already won",
  [
    {
      head: "INFRASTRUCTURE", tag: "The compute substrate — invisible and everywhere.",
      body: [
        { b: "Linux", t: "runs 90%+ of the cloud and every hyperscaler’s AI fleet — 35 years old and still one of the fastest-moving projects on earth." },
        { b: "Kubernetes & containerd", t: "orchestrate the world’s GPU clusters; CNCF’s 230+ projects are the operating system of the modern datacenter — and Kubernetes carries Google’s Borg DNA." },
        { b: "Volcano", t: "batch scheduling built for AI workloads — squeezing more out of scarce, expensive GPUs." }
      ]
    },
    {
      head: "TRAINING", tag: "Where every model is born.",
      body: [
        { b: "PyTorch", t: "85% of Hugging Face models — the default language of AI research, governed neutrally at the LF, with Google now a Platinum member." },
        { b: "DeepSpeed, Ray & TorchTitan", t: "distributed-training frameworks that make a thousand GPUs run as one — open, so everyone inherits the frontier labs’ tooling." }
      ]
    }
  ]
);

/* ---------------- 24. Inference & models [NARRATIVE] ---------------- */
twoCards(
  "Inference & models: where the economics get decided",
  [
    {
      head: "INFERENCE", tag: "The fastest-moving layer in software.",
      body: [
        { b: "vLLM & SGLang", t: "serving engines driving ~10× yearly cost declines on the same hardware — software optimization, not new chips." },
        { b: "llm-d & AIBrix", t: "Kubernetes-native distributed inference — datacenter-scale serving as shared open infrastructure." },
        { b: "Why it matters", t: "inference is where AI’s operating cost lives; every point of efficiency compounds across a $1.4T buildout." }
      ]
    },
    {
      head: "MODELS", tag: "Commoditizing at the frontier.",
      body: [
        { b: "Open weights", t: "Llama, DeepSeek, Qwen, Gemma — and now EXAONE, Solar, Kanana — reach ~90% of frontier performance within months, at 6–8× lower cost." },
        { b: "The pattern", t: "a closed model’s edge now lasts 3–6 months; durable value moves to what you build with the model, not the model itself." }
      ]
    }
  ],
  "The model layer is commoditizing — the durable assets are the open engines above and below it."
);

/* ---------------- 25. Local tokens [NARRATIVE + member spotlight] ---------------- */
twoCards(
  "The next flip: half your tokens may run local",
  [
    {
      head: "SMALL MODELS GOT GOOD", tag: "Flash-class models now do frontier work.",
      body: [
        { b: "Gemma & Muse Glimmer", t: "Google’s Gemma family and Meta’s 30B open-weight Muse Glimmer are designed to run locally on a personal computer." },
        { b: "DeepSeek V4-Flash", t: "this week’s update beats its own Pro tier on agent benchmarks — at $0.14 per million tokens, ~20× below frontier pricing." },
        { b: "Good enough arrived", t: "open 30B-class models now beat GPT-4o-era frontier scores on coding — and run comfortably on a laptop." }
      ]
    },
    {
      head: "COMPUTE COMES HOME", tag: "Unmetered, private, free at the margin.",
      body: [
        { b: "The hardware", t: "Apple unified memory, NVIDIA DGX Spark, AI PCs — datacenter-class inference on a desk." },
        { b: "The economics", t: "past ~2M tokens a day, local beats the API; one enterprise cut inference spend 83% by self-hosting open models." },
        { b: "The projection", t: "tokens ~100× cheaper within 24 months — and up to half of all tokens running locally, unmetered. Only open models can make that trip; closed weights can’t leave the cloud." }
      ]
    }
  ]
);

/* ---------------- 26. Year of the CFO [NARRATIVE] ---------------- */
statSlide(
  "Prediction: 2027 is the year of the CFO — “what is the return?”",
  [
    { n: "$1.4T", l: "projected AI infrastructure spend in 2027 alone — the bill CFOs will be asked to justify" },
    { n: "24×", l: "projected growth in global token usage by 2030 — to 120 quadrillion tokens every month" },
    { n: "12", l: "giants backing Tokenomics at its announcement — Microsoft, Google Cloud, IBM, JPMorganChase, SAP…" },
    { n: "1", l: "open yardstick for AI cost and value — Tokenomics, with the FinOps Foundation, extending FOCUS to tokens" }
  ],
  "“Tokens have become the new unit of technology spend.” Every vendor measures AI differently: tokens, seats, queries, agents. CFOs can’t compare, so they can’t trust — and what can’t be measured gets cut.",
  "why we created the Tokenomics Foundation: one neutral, open standard for measuring AI usage, cost, and value — Google Cloud was there at launch",
  "Sources: Tokenomics Foundation launch (Jun 3, 2026) · FinOps Foundation / FOCUS specification."
);

/* ---------------- 27. Agents born open [NARRATIVE + member spotlight] ---------------- */
twoCards(
  "Agents — the newest layer, born open this time",
  [
    {
      head: "THE PROTOCOLS", tag: "Every prior layer had to fight to become open. This one started open.",
      body: [
        { b: "MCP", t: "the Model Context Protocol, the USB-C of AI agents: 20,000+ servers already — and 81 Google contributors this year." },
        { b: "A2A & AGNTCY", t: "how agents discover, talk to, and trust each other across vendors — A2A was Google’s donation to the LF." },
        { b: "x402 & UCP", t: "the payment and commerce rails for agentic transactions — Google Premier alongside Visa, Mastercard, Coinbase, and Cloudflare." }
      ]
    },
    {
      head: "THE HARNESSES", tag: "Where the agent actually lives.",
      body: [
        { b: "Goose & AGENTS.md", t: "open agent frameworks and the conventions that tell agents how to work with your code and tools." },
        { b: "Why it matters", t: "whoever sets these standards shapes the next decade of software — and this time they are neutral, at the LF, from day one." }
      ]
    }
  ],
  "The agentic layer is being standardized right now — early enough for every company in this room to be at the table."
);

/* ---------------- 28. SECTION: Organizing the stack [NARRATIVE + member angle] ---------------- */
sectionSlide("ORGANIZING THE STACK", "One home for open source AI", "A proposal for consolidating two similar AI efforts at the LF — including the PyTorch Foundation, where Google holds a Platinum seat.");

/* ---------------- 29. PyTorch x LF AI & Data [NARRATIVE] ---------------- */
twoCards(
  "PyTorch × LF AI & Data: the stack consolidated, our structure didn’t",
  [
    {
      head: "FIVE YEARS AGO → TODAY", tag: "One stack — funded across two houses.",
      body: [
        { b: "Two houses made sense", t: "a framework community around PyTorch, and a broad ecosystem of data and ML infrastructure in LF AI & Data." },
        { b: "Today members fund one stack", t: "training, data pipeline, serving, retrieval, evaluation, governance — across two boards, two budgets, and two membership agreements." },
        { b: "The seams are showing", t: "both boards spend meeting time debating which foundation new projects belong to, and prospects tell us the fragmentation is confusing before they ever join." }
      ]
    },
    {
      head: "THE PROPOSAL", tag: "Fix it at the root: one foundation.",
      body: [
        { b: "One foundation", t: "under the PyTorch Foundation’s name, structure, and dues; LF AI & Data members join on PyTorch’s existing terms." },
        { b: "Strongest projects join", t: "LF AI & Data’s best projects join the PyTorch mission: the layers PyTorch does not host today." },
        { b: "Curated, not wholesale", t: "a joint TAC activity-and-relevance review before any transfer; dormant or duplicative projects are wound down inside LF AI & Data first." }
      ]
    }
  ],
  "This bolsters our AI mission — it does not dilute it."
);

/* ---------------- 30. What PyTorch gains (table) [NARRATIVE] ---------------- */
{
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, "What PyTorch gains: the missing layers of its own mission");
  s.addText("THE BEST OPEN ANSWER AT NEARLY EVERY LAYER — GOVERNED BY THE BOARD GOOGLE SITS ON", { x: MX, y: 1.08, w: CW, h: 0.32, fontSize: 10.5, bold: true, color: C.gray, charSpacing: 1.5, fontFace: F, margin: 0 });
  const header = [
    { text: "PRODUCTION NEED", options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 11 } },
    { text: "LF AI & DATA PROJECT(S)", options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 11 } },
    { text: "WHY IT ADVANCES THE PYTORCH MISSION", options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 11 } }
  ];
  const rows = [
    ["Retrieval for LLM apps", "Milvus", "vLLM + Milvus: the complete open RAG stack"],
    ["Training data pipelines", "Data-Prep-Kit · Docling · DocArray", "Where every training run begins"],
    ["Model interchange", "ONNX", "The export path from PyTorch to every runtime"],
    ["Feature & data infra", "Feast · Unity Catalog · LakeSoul", "The data layer PyTorch has no answer for today"],
    ["Trust, safety & lineage", "AI Fairness 360 · ART · OpenFL · OpenLineage", "What enterprise and government adoption needs"]
  ].map(r => r.map(c => ({ text: c, options: { fontSize: 11.5, color: C.ink } })));
  s.addTable([header].concat(rows), {
    x: MX, y: 1.55, w: CW, colW: [3.2, 4.2, 4.73], border: { type: "solid", color: C.cardLine, pt: 0.75 },
    fill: { color: C.white }, rowH: 0.6, valign: "middle", fontFace: F, margin: 0.08, autoPage: false
  });
  quoteBlock(s, "A united effort raises all boats — developers get one governance model, one contributor ladder, one conference circuit. LF AI projects gain the PyTorch brand and developer reach; PyTorch gains the enterprise data and trust story that closes deals.", null, 5.6, 1.15);
  chrome(s, {});
}

/* ---------------- 31. One membership, one bill [MEMBER angle] ---------------- */
statSlide(
  "One membership, one board — and a path to the 2027 renewal",
  [
    { n: "1", l: "Platinum seat — Google’s existing PyTorch membership governs the entire merged AI portfolio" },
    { n: "$0", l: "more for any member of either foundation in year one — LF AI dues held flat" },
    { n: "35+", l: "LF AI & Data projects reviewed for transfer, wind-down, or graduation into the PyTorch mission" },
    { n: "2027", l: "renewal cycle — the combination completes: one foundation, one portfolio" }
  ],
  "“Savings come out of duplicated overhead — one board cycle, one events program, one marketing engine — not out of project funding.” Google funds PyTorch but not LF AI & Data: after the merge, Google’s Platinum seat reaches the entire consolidated portfolio at no added cost.",
  "the path: Q3 2026 joint working session · Q4 intake review · H1 2027 tier mapping · 2027 renewal: complete",
  "Source: “A Unified Home for Open Source AI” — member brief to the PyTorch Foundation and LF AI & Data boards, July 2026."
);

/* ---------------- 32. SECTION: AAIF [NARRATIVE] ---------------- */
sectionSlide("AGENTIC AI FOUNDATION UPDATE", "The agentic stack is being defined at AAIF", "Project momentum, membership momentum, event momentum — with Google as a founding Platinum member.");

/* ---------------- 33. AAIF at eight months [NARRATIVE — refresh from latest GB deck] ---------------- */
statSlide(
  "AAIF at eight months: the fastest-growing foundation in LF history",
  [
    { n: "251", l: "member organizations — from zero on Dec 9, 2025; 25 new in the last 30 days" },
    { n: "$13.4M", l: "annual recurring revenue — plus a $6.2M+ pipeline of 72 deals" },
    { n: "140", l: "ambassadors from 41 countries — 160+ contributions in July alone" },
    { n: "1,500+", l: "registrations for MCP 7/28 release parties in 7 cities — 122 articles of coverage" }
  ],
  "Recent Gold members include Visa, Wells Fargo, and Alibaba, and the Gates Foundation has joined under a new Philanthropic Gold Associate class.",
  "Platinum members: AWS, Anthropic, Block, Bloomberg, Cloudflare, GOOGLE, Microsoft, OpenAI · Projects: MCP, Goose, AGENTS.md, agentgateway, A2A (Google-donated), Agent Router",
  "Source: AAIF Governing Board meeting, August 19, 2026 (membership and pipeline as of August 12, 2026)."
);

/* ---------------- 34. AAIF landing this quarter [NARRATIVE] ---------------- */
gridCards(
  "AAIF: what’s landing this quarter",
  [
    { head: "Projects: onboarding", body: "A2A (Google-donated) approved as a Growth-stage project. Agent Router (f.k.a. Envoy AI Gateway) passed the TC and GB. Agent Client Protocol (Zed, JetBrains) awaiting approval. OpenSandbox passed the TC." },
    { head: "Projects: the pipeline", body: "Dapr Agents (NVIDIA, Diagrid) in TC review. Invited to submit: Headroom (Netflix), Flue (Cloudflare), Agent Skills and Agent Plugins (Anthropic), and Open Responses. Full radar at lf.fyi/aaif-radar." },
    { head: "Working groups: now public", body: "All eight groups opened participation, notes, and monthly reports to the public. Security & Privacy shipped its Threat Modeling Gap Analysis and Best Practices Guide; the first agentic taxonomy is live." },
    { head: "Standards & governance", body: "The .mcp top-level domain application was finalized with Google and Anthropic and submitted to ICANN. A Government Affairs Committee is chartered; Applied Industries and End User committees approved." },
    { head: "Certification & community", body: "MCP Associate (MCPA) certification: beta this month, GA mid-September — advisory council spans Anthropic, Google, AWS, Microsoft, Block, GitHub, Hugging Face. Learning path launches October." },
    { head: "Events: the fall circuit", body: "AGNTCon + MCPCon: China (Sep 6–7), Japan (Sep 10–11), Amsterdam (Sep 17–18), San Jose (Oct 22–23). MCP Dev Summits: Toronto (Oct 5–6), Nairobi (Nov 19–20). 2027 Tier 1: San Francisco and London." }
  ],
  "AAIF is becoming to agents what CNCF became to cloud — the neutral home where the agentic stack is built."
);

/* ---------------- 35. ANDOR [NARRATIVE + member spotlight] ---------------- */
gridCards(
  "ANDOR: the AAIF End User Group",
  [
    { head: "Who", body: "Senior leaders and hands-on engineers from Adobe, AMEX, BNY, Cisco, Dell, Goldman Sachs, GOOGLE, JPMC, Salesforce, ServiceNow, MIT Media Lab, and startups such as Sailplane and Glean." },
    { head: "The model", body: "Modeled on CNCF’s End User community: autonomous, an elected Chair, LFX as system of record, quarterly reports to the Board, ongoing input to the TC. No Board seat or vote." },
    { head: "Why it matters", body: "A direct line from practitioners to governance — adoption signal to the Board, technical gaps to the TC. A community like this takes years to build; ANDOR already exists." },
    { head: "Status", body: "Official AAIF user group since March 2026; meets every two weeks. Approved by the Board on Aug 19 for formal acceptance, the governance model, and a Chair election." },
    { head: "Google’s seat", body: "Rao Surapaneni (Google) sits on the acting steering committee alongside Sam Ramji (Sailplane), Satish Iyer (Dell), and Vijoy Pandey (Cisco) — Google is already helping shape the group." },
    { head: "Open by default", body: "Open to every AAIF member company — and to individual practitioners approved by the Chair. Google’s teams deploying agentic AI in production already have their seat at the table." }
  ],
  null,
  "Source: Exhibit C — “Formalizing ANDOR as the AAIF End User Group,” AAIF Governing Board, August 2026."
);

/* ---------------- 36. Member project spotlight [MEMBER] (IBM: ContextForge; Google: A2A) ---------------- */
{
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, "A2A: Google’s donation is becoming the agent-interop standard");
  const gap = 0.3, w = (CW - gap) / 2, y = 1.35, h = 3.7;
  s.addShape("rect", { x: MX, y, w, h, fill: { color: C.navy } });
  s.addShape("rect", { x: MX, y, w, h: 0.09, fill: { color: C.cyan } });
  s.addText([
    { text: "WHAT IT IS", options: { fontSize: 10, bold: true, color: C.skyDark, charSpacing: 1, breakLine: true, paraSpaceAfter: 8 } },
    { text: "The open protocol for agents to discover each other, exchange tasks, and collaborate across vendors.", options: { fontSize: 14.5, bold: true, color: C.white, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Launched by Google in April 2025 with 50+ partners and donated to the Linux Foundation — now an AAIF Growth-stage project under neutral governance. Agent Cards for discovery, task lifecycle and streaming, enterprise-grade auth — Apache 2.0, SDKs across major languages. The peer-to-peer complement to MCP’s agent-to-tool connectivity.", options: { fontSize: 10.5, color: "E8F1F8" } }
  ], { x: MX + 0.32, y: y + 0.26, w: w - 0.64, h: h - 0.5, fontFace: F, margin: 0, valign: "top" });
  s.addShape("rect", { x: MX + w + gap, y, w, h, fill: { color: "FAFBFC" }, line: { color: C.cardLine, width: 1 } });
  s.addShape("rect", { x: MX + w + gap, y, w: 0.09, h, fill: { color: C.cyan } });
  s.addText([
    { text: "WHY IT MATTERS FOR GOOGLE", options: { fontSize: 10, bold: true, color: C.gray, charSpacing: 1, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Kubernetes’ playbook, applied to the agent era.", options: { fontSize: 14.5, bold: true, color: C.title, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Neutrality made it adoptable", options: { fontSize: 10.5, bold: true, color: C.title, bullet: { code: "2022", indent: 10 } } },
    { text: " — Microsoft, AWS, Salesforce, SAP, and ServiceNow build on A2A because Google doesn’t own it.", options: { fontSize: 10.5, color: C.ink, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Google engineers still lead", options: { fontSize: 10.5, bold: true, color: C.title, bullet: { code: "2022", indent: 10 } } },
    { text: " — 42 Google contributors to A2A in the last 12 months, plus 81 on MCP and 17 on Goose.", options: { fontSize: 10.5, color: C.ink, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Donate the standard, lead the implementation", options: { fontSize: 10.5, bold: true, color: C.title, bullet: { code: "2022", indent: 10 } } },
    { text: " — win the ecosystem.", options: { fontSize: 10.5, color: C.ink } }
  ], { x: MX + w + gap + 0.32, y: y + 0.26, w: w - 0.64, h: h - 0.5, fontFace: F, margin: 0, valign: "top" });
  const stats = [["Growth", "AAIF project stage"], ["150+", "ecosystem partners"], ["42", "Google contributors, 12 mo"], ["Apache 2.0", "license"]];
  const sw = (CW - 3 * 0.28) / 4;
  stats.forEach((st, i) => {
    const x = MX + i * (sw + 0.28);
    s.addShape("rect", { x, y: 5.3, w: sw, h: 1.0, fill: { color: C.card }, line: { color: C.cardLine, width: 1 } });
    s.addText([
      { text: st[0], options: { fontSize: 15, bold: true, color: C.title, breakLine: true } },
      { text: st[1], options: { fontSize: 9, color: C.gray } }
    ], { x: x + 0.1, y: 5.35, w: sw - 0.2, h: 0.9, align: "center", fontFace: F, margin: 0, valign: "middle" });
  });
  chrome(s, { src: "Source: a2aprotocol.dev · AAIF TC records · LFX Insights, Aug 25, 2025 – Aug 25, 2026." });
}

/* ---------------- 37-38. SECTIONS [NARRATIVE] ---------------- */
sectionSlide("THE ROAD AHEAD", "Five challenges in Open Source AI", "Everything so far is the success story — and success created new problems. Five challenges: open data, the changing developer, open-weight restrictions, the harness, and security.");
sectionSlide("CHALLENGE ONE", "Open data", "Every layer of compute is open. Data is the last closed layer — and the window to open it is closing fast.");

/* ---------------- 39. Data layer closed [NARRATIVE] ---------------- */
{
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, "But one layer of the stack is still NOT open — and it’s the most important one", 21);
  const layers = [["AGENTS", true], ["MODELS", true], ["INFERENCE", true], ["TRAINING", true], ["INFRASTRUCTURE", true], ["DATA", false]];
  const y0 = 1.4, h = 0.6;
  layers.forEach((l, i) => {
    const y = y0 + i * (h + 0.1);
    s.addShape("rect", { x: MX, y, w: 5.6, h, fill: { color: l[1] ? C.card : C.navy }, line: { color: C.cardLine, width: 0.75 } });
    s.addShape("rect", { x: MX, y, w: 0.07, h, fill: { color: l[1] ? C.cyan : "E05B4B" } });
    s.addText(l[0], { x: MX + 0.25, y, w: 3.6, h, fontSize: 13, bold: true, color: l[1] ? C.title : C.white, charSpacing: 1.5, fontFace: F, margin: 0, valign: "middle" });
    s.addText(l[1] ? "OPEN" : "CLOSED", { x: MX + 3.9, y, w: 1.5, h, fontSize: 13, bold: true, color: l[1] ? "2E8B57" : "F2A196", align: "right", fontFace: F, margin: 0, valign: "middle" });
  });
  s.addText([
    { text: "DATA — THE NEXT OPEN FRONTIER", options: { fontSize: 11, bold: true, color: C.gray, charSpacing: 1, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Models will be commodities. Code is open. Data is the moat.", options: { fontSize: 15, bold: true, color: C.title, breakLine: true, paraSpaceAfter: 8 } },
    { text: "The frontier labs aren’t just winning because of better code — they’re winning because of proprietary training data and exclusive licensing deals.", options: { fontSize: 11.5, color: C.ink, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Open weights without open data is half a movement. If the data layer stays closed, the value at the model layer stays closed too.", options: { fontSize: 11.5, color: C.ink } }
  ], { x: 6.7, y: 1.55, w: 6.0, h: 4.4, fontFace: F, margin: 0, valign: "top" });
  s.addText("Every layer of compute is open. The last unfought layer is data — and the window to open it is closing fast.", { x: MX, y: 6.5, w: CW, h: 0.4, fontSize: 12, italic: true, bold: true, color: C.title, fontFace: F, align: "center", margin: 0 });
  chrome(s, {});
}

/* ---------------- 40-42 [NARRATIVE] ---------------- */
statSlide(
  "The open web is closing — crawling is no longer free",
  [
    { n: "2.5M+", l: "websites have opted out of AI training — the largest coordinated blocking effort in the web’s history" },
    { n: "45%", l: "of top websites now block at least one major AI crawler — effectively zero just three years ago" },
    { n: "Sept 15", l: "Cloudflare default-blocks AI training & agent crawlers on new and ad-supported sites — search stays open" },
    { n: "~50%", l: "of AI crawler traffic ignores robots.txt — so enforcement is moving from polite requests into the network itself" }
  ],
  "“No AI crawl without compensation.” The web’s default is flipping — from open-unless-blocked to paid-unless-licensed — one infrastructure company at a time.",
  "Cloudflare declared “Content Independence Day” in July 2025; by September 2026, blocking is the default for new domains",
  "Sources: Cloudflare (Jul 2025; default-block policy, Sept 15, 2026) · Coronium closing-web analysis · top-site crawler-blocking study (Jun 2026)."
);
statSlide(
  "And data now carries a price tag only giants can pay",
  [
    { n: "$1.5B", l: "Anthropic’s settlement with authors — approved July 2026, the largest copyright recovery in history (~$3,000 per book)" },
    { n: "$250M+", l: "OpenAI’s five-year deal with News Corp — one publisher, one lab, one private contract" },
    { n: "$60M", l: "a year — Google’s price for Reddit’s data; every major lab now negotiates site by site, in secret" },
    { n: "402", l: "the once-dormant HTTP code — “Payment Required” — is now the web’s toll gate for AI" }
  ],
  "The training-data free-for-all is over. Every frontier lab now pays for data — separately, secretly, at prices only the biggest can afford. For open AI, that is the worst outcome: duplicated cost, exclusive access, and a data moat no startup or small nation can cross.",
  "the labs that signed the open-weights letter are simultaneously locking up the data layer",
  "Sources: Bartz v. Anthropic final approval (Jul 20, 2026) · News Corp / OpenAI and Reddit / Google deal disclosures · Cloudflare pay-per-crawl / HTTP 402."
);
statSlide(
  "The way through — a consortium for open data",
  [
    { n: "$1T+", l: "global data-center capex in 2026 (Dell’Oro)" },
    { n: "~$1–3B", l: "estimated cost to license the major-publisher corpus" },
    { n: "5", l: "publishers control ~80% of US trade publishing" },
    { n: "3+", l: "frontier labs already paying for data 1-on-1 — duplicating cost" }
  ],
  "“Foundation models will be infrastructure — they should be built by international consortia, not controlled by a handful of private companies.” — the Yann LeCun thesis: open AI needs a CERN-style consortium for data and models.",
  "if we spend $1T on the metal, we can spend $5B on the substance. This is a money problem, not a technology problem",
  "Sources: Dell’Oro data-center capex forecast (2026) · WordsRated Big Five publishing statistics · Yann LeCun, public remarks (Davos, paraphrased)."
);

/* ---------------- 43-45 [NARRATIVE] ---------------- */
sectionSlide("CHALLENGE TWO", "The changing nature of software development", "If code is written by AI agents, what will happen to the community of OSS developers?");
statSlide(
  "If AI writes the code, what happens to open source developers?",
  [
    { n: "2/3", l: "of AI kernel fix patches were correct — “The tools are good. We can’t ignore this stuff.” — Greg Kroah-Hartman, Mar 2026" },
    { n: "~2×", l: "the pull requests — review is the new bottleneck. PR volume +98%, review time +91% (Faros AI)" },
    { n: "Human", l: "design · review · sign-off stay human — kernel policy: AI assists; only humans certify Signed-off-by" },
    { n: "20×", l: "capability lift when a stock model gets the right tools — Google’s own Naptime result" }
  ],
  "“AI is a tool, just like other tools we use. And it’s clearly a useful one.” — Linus Torvalds, linux-kernel mailing list, July 15, 2026: “Linux is not one of those anti-AI projects.”",
  null,
  "Sources: Torvalds LKML post via Phoronix (Jul 15, 2026) · The Register, Greg K-H (Mar 2026) · kernel AI-assistant policy · Faros AI / LogRocket."
);
{
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, "Value accrues to the application layer — we will have MORE developers and OSS, not less", 21);
  s.addText("WHERE VALUE LASTED", { x: MX, y: 1.1, w: CW, h: 0.32, fontSize: 10.5, bold: true, color: C.gray, charSpacing: 1.5, fontFace: F, margin: 0 });
  const header = [
    { text: "ERA", options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 11 } },
    { text: "INFRASTRUCTURE (won early, commoditized)", options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 11 } },
    { text: "APPLICATION LAYER (where the durable value landed)", options: { bold: true, color: C.white, fill: { color: C.navy }, fontSize: 11 } }
  ];
  const rows = [
    ["INTERNET ERA", "Cisco · UUNET · Sun · Oracle", "Google · Amazon · Uber · Airbnb · Netflix"],
    ["MOBILE ERA", "Qualcomm · Apple silicon · ARM", "Instagram · WhatsApp · TikTok · Stripe"],
    ["AI ERA (2026 → ?)", "NVIDIA · frontier model labs", "the next decade — built on OSS + AI orchestration"]
  ].map(r => r.map(c => ({ text: c, options: { fontSize: 12, color: C.ink } })));
  s.addTable([header].concat(rows), { x: MX, y: 1.55, w: CW, colW: [2.7, 4.7, 4.73], border: { type: "solid", color: C.cardLine, pt: 0.75 }, rowH: 0.66, valign: "middle", fontFace: F, margin: 0.08, autoPage: false });
  quoteBlock(s, "Frontier models = economies of scale with shrinking margins. Cost per token down 280× in 2 years; open models hit parity in 3–6 months. Lasting value sits at the application layer — open-source primitives, orchestrated by AI, owned by operators closest to the workflow.", "caveat: we are not in a bubble — the hardware layer will boom for years as agents break the demand curve", 4.85, 1.7);
  chrome(s, {});
}

/* ---------------- 46-49 [NARRATIVE + member opportunity] ---------------- */
sectionSlide("CHALLENGE THREE", "Talk of regulating or even restricting open-weight models", "The pressure is real — from parts of industry and from regulators.");
twoCards(
  "American tech titans commit to open source AI",
  [
    {
      head: "“OPEN WEIGHTS AND AMERICAN AI LEADERSHIP” — JULY 24, 2026", tag: "230+ signatories as of July 30 — Google among the first 25.",
      body: [
        { b: "The four arguments", t: "1. Access: build without training from scratch · 2. Competition: across models, clouds, apps · 3. Control: your data, your infrastructure, no lock-in · 4. Security: more eyes on the weights." },
        { b: "The three asks of policymakers", t: "expand compute access · invest in shared training resources · no premature restrictions on open models." },
        { b: "The signatories", t: "NVIDIA, Microsoft, GOOGLE, Meta, OpenAI, the Linux Foundation, and 200+ more." }
      ]
    },
    {
      head: "THE STRONGEST CASE ISN’T FROM US", tag: "“The AI Future Is for Everyone” — Mark Zuckerberg, WSJ, July 28, 2026.",
      body: [
        { b: "Empowerment", t: "progress comes from power in people’s hands — “as everyone gains more powerful tools, each person becomes more capable of shaping the future.”" },
        { b: "Invention", t: "superintelligence for invention, not automation — “novel ideas rarely originate from established institutions alone.”" },
        { b: "Balance", t: "“extreme concentration of power seems dangerous” — like cybersecurity, open access is the best long-run protection." }
      ]
    }
  ],
  "“Openness may be one of the most important paths to AI safety and security.”",
  "Full signatory list: microsoft.com/corporate-responsibility/topics/open-weight · WSJ Opinion, July 28, 2026."
);
statSlide(
  "Restriction isn’t the answer — a competitive Western open-weight model is",
  [
    { n: "56%", l: "of open-model downloads go to Chinese models; the US is at 35%. China overtook the US in July 2025" },
    { n: "70%", l: "of new open-model fine-tunes are built on Chinese bases — Qwen alone 69%; Llama fell from 44% to 11%" },
    { n: "46%", l: "of enterprise API traffic on OpenRouter runs on Chinese models — 10× in a year, at ~$0.18 vs ~$4 per million tokens" },
    { n: "0", l: "American open-weight models at the frontier — in nearly every month of 2026, the best open model was Chinese" }
  ],
  "The demand is already there — most American AI startups run Chinese open weights somewhere in their stack. Every proposal to restrict those models matters far less the day the US ships a competitive open-weight model of its own.",
  null,
  "Sources: Hugging Face, “State of Open Models: Summer 2026” · Sequoia (Jul 24, 2026) · OpenRouter enterprise traffic (Jul 8, 2026) · US State Dept (Jul 8, 2026)."
);
gridCards(
  "The hopeful signs — and the Google opportunity",
  [
    { head: "NVIDIA is all in on Nemotron", body: "Nemotron 3 Ultra (June) and 3.5 Lightning (Aug 11) are the best American open models today; a trillion-parameter Nemotron 4 trains for late 2026 on 10T+ tokens of open data." },
    { head: "NVIDIA × Poolside (Aug 21)", body: "A $6B license for Poolside’s Model Factory plus a $1B investment at $12B — 109 Poolside engineers move to NVIDIA to make Nemotron “one of the world’s most powerful open-weight models.”" },
    { head: "Reflection AI", body: "DeepMind alumni building the Western open-weight counterweight to DeepSeek: $2B raised (NVIDIA $800M), ~$20B valuation, a $6.3B SpaceX compute deal. First open frontier model due in 2026." },
    { head: "Marin (Percy Liang, Stanford)", body: "Not just open weights: every experiment, data mix, loss curve, and failure is public on GitHub. Marin 535B-A23B began training this week — 18.75T tokens on 11 GB200 NVL72 racks." },
    { head: "The rest of the bench", body: "Google Gemma — the most-adopted American open-weight family — plus OpenAI gpt-oss, Ai2 OLMo, IBM Granite, Arcee Trinity-Large, Meta Muse Glimmer; and 230+ open-weight letter signatories." },
    { head: "The Google opportunity", body: "Gemma gives Google the strongest open-weight seat in the West. Pair Gemma’s reach with pooled compute, licensed data, and neutral governance at the LF — and the US open-weight answer ships with Google at the table." }
  ],
  "The only path forward for competition in open-weight models is to build a better one: the question is who is at the table when it ships."
);

/* ---------------- 50-53 [NARRATIVE + member spotlight] ---------------- */
sectionSlide("CHALLENGE FOUR", "The harness", "The frontier-model race is commoditizing. The real leverage — for builders and defenders alike — is the harness around the model. Open source needs its own.");
gridCards(
  "What is a harness? Everything around the model",
  [
    { head: "The loop", body: "Plan → act → observe → repeat. The orchestration that turns a one-shot chatbot into an agent that works a problem for hours. In one line: an LLM, a system prompt, and tools — in a loop." },
    { head: "Tools", body: "Code browsers, debuggers, fuzzers, shells — the hands. Google’s Naptime gave a stock model a debugger and a sandbox, and its vulnerability-finding score jumped 20×. Same model." },
    { head: "Context management", body: "What the model sees, and when: repo maps, prior findings, house rules. Raptor is a stock model plus rules files, sub-agents, and security tooling." },
    { head: "Verification", body: "Sandboxed reproduction of every finding before a human sees it. XBOW executes the payload; MDASH’s Prove stage triggers the bug. Hallucinations die here." },
    { head: "Ensembles", body: "Many models, one system. MDASH orchestrates 100+ agents across frontier and distilled models: heavy reasoner, cheap debater, independent counterpoint." },
    { head: "Model-agnostic by design", body: "When a better model ships, swap it in with one configuration change. Models turn over every quarter; the harness is the durable asset." }
  ],
  "Harness (n.): the software around the model — loop, tools, context, verification — that turns raw intelligence into a working system."
);
statSlide(
  "Frontier competition is old — the best harness is new",
  [
    { n: "20×", l: "same model, purpose-built harness. Google’s Naptime: GPT-4 scored 0.05 on CyberSecEval2 — 1.00 inside Project Zero’s harness. Now Big Sleep, Google’s production vuln-hunting agent" },
    { n: "96.55%", l: "of CyberGym targets crashed by MDASH — Microsoft’s multi-model harness, 100+ agents; 16 real CVEs found, including 4 critical Windows RCEs" },
    { n: "#1", l: "XBOW on HackerOne’s US leaderboard — a harness on off-the-shelf models: ~1,060 submissions in 90 days, every payload executed before filing" },
    { n: "$40K", l: "of cheap models took 2nd at DARPA’s AIxCC — Trail of Bits’ Buttercup used zero frontier models and filed every bug with a working proof and a patch" }
  ],
  "“The model is one input. The system is the product.” — Taesoo Kim, Microsoft VP of Agentic Security. Google wrote this playbook: Naptime → Big Sleep is the founding proof that the harness, not the model, is the edge.",
  null,
  "Sources: Google Project Zero “Project Naptime” (Jun 2024) · Microsoft Security blog, MDASH (May 12, 2026) · xbow.com · Trail of Bits AIxCC (Aug 2025)."
);
gridCards(
  "The call to action: open source needs its own harness",
  [
    { head: "The leverage", body: "Same model, up to 20× better inside a great harness — the edge lives in the scaffolding, not the weights." },
    { head: "Locked up", body: "Today’s best harnesses — MDASH, Big Sleep, XBOW — are proprietary or internal to a few labs, including Google’s own." },
    { head: "Adversaries", body: "Attackers won’t wait — they build their own. A defensive edge held by a few doesn’t protect the commons." },
    { head: "Build it open", body: "A model-agnostic, community harness any defender or OSS maintainer can run — a shared MDASH at the LF, with Big Sleep’s lessons inside it." },
    { head: "Google’s role", body: "Nobody has more harness experience than the team that invented the category. Contributing the pattern — not the product — would set the standard for open defense." },
    { head: "The prize", body: "State-of-the-art defense that belongs to everyone, not a few. That is how open source stays ahead." }
  ],
  "Build an open-source harness — a community MDASH — so state-of-the-art defense belongs to everyone.",
  "Harness examples: Microsoft MDASH · Google Big Sleep / Project Zero · XBOW · Trail of Bits Buttercup (DARPA AIxCC)."
);

/* ---------------- 54-61 [NARRATIVE + member spotlight] ---------------- */
sectionSlide("CHALLENGE FIVE", "Cybersecurity", "We rely on hundreds of thousands of upstream open-source projects. Safety means scanning and fixing them all — herd immunity for the software the world runs on.");
statSlide(
  "The good news first: the defender thesis still holds",
  [
    { n: "1.3%", l: "of 1,061 AI-discovered vulnerabilities were ever exploited — the same rate as human-found flaws" },
    { n: "+10%", l: "growth in exploited vulns while CVE volume grew 45% — exploitation is not scaling with disclosure" },
    { n: "1.4%", l: "of published CVEs ever see in-the-wild exploitation — down from 2.7% at the 2023 peak" },
    { n: "126 → 1", l: "of Glasswing’s 23,019 AI findings, 126 became CVEs — and exactly one was exploited in the wild" }
  ],
  "“Early exploitation activity in the first half of 2026 is holding steady rather than accelerating.” More eyes are finding more bugs — and defenders are finding them first. AI has not handed attackers the advantage.",
  "the “many eyes” bet — that openness makes software stronger — is still paying off in the AI era",
  "Source: VulnCheck, “State of Exploitation — a Peek into 1H-2026” (July 2026)."
);
statSlide(
  "But the window is collapsing — defense must move at attacker speed",
  [
    { n: "495", l: "vulnerabilities newly observed exploited in the wild in 1H 2026 alone (VulnCheck KEV)" },
    { n: "23%", l: "were exploited on or before the day the CVE was even published" },
    { n: "80 days", l: "median time from CVE publication to known exploitation — down from 120 days in 2025" },
    { n: "12 / 495", l: "only 12 of the 495 exploited vulns made CISA’s KEV list in time — official lists lag reality" }
  ],
  "“Defenders are still winning the discovery race. The risk is the clock: four months, then eleven weeks, then zero days. The thesis holds only if we respond at attacker speed — together.”",
  "~200 CVEs were exploited within their first month · most-hit: CMS, edge devices, security tools · patch-and-respond must finish in weeks, not quarters",
  "Source: VulnCheck, “State of Exploitation — a Peek into 1H-2026” (July 2026)."
);
twoCards(
  "AI can draft the fix: a human still has to say yes",
  [
    {
      head: "THE HUMAN IN THE LOOP", tag: "Review is the bottleneck AI cannot remove.",
      body: [
        { b: "Merging takes judgment", t: "every AI patch still needs maintainer review: correctness, side effects, intent. In codebases as complex as the kernel, only a human certifies Signed-off-by." },
        { b: "“Mostly right” isn’t enough", t: "one in three AI kernel fixes was wrong. At 10,000 findings, that’s thousands of bad patches a human must catch before merge." },
        { b: "The overwhelmed maintainer", t: "valid findings now arrive faster than volunteer maintainers can review them. Burnout is now a systemic security risk." }
      ]
    },
    {
      head: "TWO RACES TO WIN", tag: "Fix upstream faster — and deploy downstream faster.",
      body: [
        { b: "Help the maintainers", t: "fund, staff, and share the review load so humans can keep up with AI-scale discovery. That is exactly what Akrites is for — next slide." },
        { b: "Deploy the patches", t: "an upstream fix that sits undeployed is a gift to attackers. With an 80-day window, enterprise patch cycles must shrink from quarters to weeks." }
      ]
    }
  ],
  "Even with frontier AI, trust in code comes from a human who understands it. Scale the humans — then speed everything downstream of them."
);
{
  const s = p.addSlide(); s.background = { color: C.white };
  slideTitle(s, "Akrites — the industry now stands watch over critical open source");
  s.addShape("rect", { x: MX, y: 1.35, w: CW, h: 2.3, fill: { color: C.navy } });
  s.addShape("rect", { x: MX, y: 1.35, w: 0.09, h: 2.3, fill: { color: C.cyan } });
  s.addText([
    { text: "LAUNCHED BY THE LINUX FOUNDATION — JUNE 25, 2026", options: { fontSize: 10, bold: true, color: C.skyDark, charSpacing: 1, breakLine: true, paraSpaceAfter: 6 } },
    { text: "One trusted front door for maintainers, at the speed AI-assisted attackers now operate.", options: { fontSize: 15, bold: true, color: C.white, breakLine: true, paraSpaceAfter: 6 } },
    { text: "19 founding organizations running a shared, confidential security incident response team (SIRT) for the hundreds of thousands of upstream open-source projects critical infrastructure depends on. AI finder tools surface the vulnerabilities; Akrites validates them, coordinates the fix, and synchronizes disclosure.", options: { fontSize: 11, color: "E8F1F8" } }
  ], { x: MX + 0.35, y: 1.55, w: CW - 0.7, h: 1.95, fontFace: F, margin: 0, valign: "top" });
  s.addShape("rect", { x: MX, y: 3.9, w: CW, h: 2.0, fill: { color: "FAFBFC" }, line: { color: C.cardLine, width: 1 } });
  s.addShape("rect", { x: MX, y: 3.9, w: 0.09, h: 2.0, fill: { color: C.cyan } });
  s.addText([
    { text: "GOOGLE JOINED AT PREMIER — JULY 2026", options: { fontSize: 10, bold: true, color: C.gray, charSpacing: 1, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Premier membership with the 10-technical-FTE commitment.", options: { fontSize: 14, bold: true, color: C.title, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Alongside founders and members including Chainguard, Endor Labs, Ericsson, RapidFort, Sonatype, Vodafone, and Zscaler. Seed-funded via Alpha-Omega (which Google co-funds at $2.5M/yr); CVEs issue through the LF’s CNA — akrites.org.", options: { fontSize: 11, color: C.ink } }
  ], { x: MX + 0.35, y: 4.1, w: CW - 0.7, h: 1.65, fontFace: F, margin: 0, valign: "top" });
  chrome(s, { src: "akrites.org · LFX membership records, August 2026." });
}
twoCards(
  "How Akrites works: coordinate the fix — and the maintainer of last resort",
  [
    {
      head: "COORDINATE THE FIX", tag: "One shared SIRT across many efforts.",
      body: [
        { b: "Working groups", t: "split coverage by technology, sector, and criticality — so scanning and fixing is shared, not duplicated." },
        { b: "Downstream efforts", t: "federate what already ships: Glasswing, OpenAI’s Patch the Planet, Chainguard’s Athena (2,000+ patches / 500 projects), Lightwell." },
        { b: "Upstream", t: "dedup, validate, align disclosure — then drive every fix upstream, so the whole community inherits it." }
      ]
    },
    {
      head: "MAINTAINER OF LAST RESORT", tag: "When no one is home, Akrites steps in.",
      body: [
        { b: "Only ~49%", t: "of critical open-source projects are actively maintained (Alpha-Omega analysis of 5,874 repos)." },
        { b: "The rest", t: "are dormant, dead, or unknown — and 1,400+ depend on a single publisher." },
        { b: "Where no maintainer exists", t: "Akrites stewards the project — industry engineers volunteering to keep critical code alive. A backstop, not a replacement." }
      ]
    }
  ],
  "Akrites coordinates the industry’s scanning and fixing at scale — so the critical open source everyone depends on never goes unwatched."
);
gridCards(
  "Akrites SIRT: pilot, milestones, and schedule",
  [
    { head: "Pilot: two working groups", body: "Kernel WG: technical work ramping, Upstream engagement in coming weeks, scanning features in development. Apache WG: two discovery workstreams, exercising processes on “flaky” vs. well-structured findings." },
    { head: "Pilot goals", body: "Exercise our ability to work together · surface technical requirements from the field · partner with key Upstreams early · get a few wins for the project." },
    { head: "Milestones", body: "1st vulnerability reported upstream to the Linux kernel; numerous other disclosures moving upstream this week; 3 new SIRT employees onboarding September (Incident Commander + 2 Sr. SIRT Engineers)." },
    { head: "External engagement", body: "Biweekly Gold Eagle meetings with USG (ONCD, CISA, Treasury); monthly ENISA meetings on CRA; weekly syncs with ecosystem security peers; CNA-LR application in September; Athena and Lightwell reporting channels established." },
    { head: "Schedule", body: "M0.1 — Intake API launch Aug 27. M1 — automation working pipeline, Sept–Oct. M2 — richer automation, public intake tests, CNA-LR in place, Nov–Dec." },
    { head: "ISRG acceleration", body: "Josh Aas (Let’s Encrypt / ISRG) helps lead Akrites; ISRG engineers build the vulnerability-processing pipeline — a proven, jelled team productive on day one, bridging while permanent staff are hired." }
  ],
  "Membership continues to expand: 15 Premier and 3 General members — with Citi, OpenAI, Zscaler, and Deloitte in contracts; Apple, Walmart, Intel, and others in discussion."
);
gridCards(
  "What victory looks like — Akrites and the open commons",
  [
    { head: "Balance restored", body: "Every AI-found vulnerability meets a defense that patches and discloses faster than attackers can weaponize it." },
    { head: "A front door that holds", body: "Maintainers get one coordinated partner, not a flood of duplicates — signal replaces noise, and burnout ends." },
    { head: "The commons stays open", body: "Industry, government, and researchers share the watch, so no one retreats to closed code out of fear." },
    { head: "Trusted infrastructure", body: "Banks, hospitals, and grids know their shared dependencies are watched, stewarded, and patched." },
    { head: "Open Secure AI Alliance", body: "NVIDIA-led, launched July 27, 2026, the LF the host: 40+ partners pooling tools to secure software and AI agents — Safetensors, SPIFFE/SPIRE, MDASH, Lightwell, NOOA; the LF contributes Akrites and OpenSSF." },
    { head: "The economics flip", body: "The economics of defense finally outrun the economics of attack — openness is still what makes software strong." }
  ],
  "Victory isn’t zero vulnerabilities — it’s a world where defenders stay ahead of adversaries, and openness is still what makes software strong.",
  "The Linux Foundation — Akrites (akrites.org) · Open Secure AI Alliance launch, July 27, 2026."
);

/* ---------------- 62. Thank you ---------------- */
{
  const s = p.addSlide(); s.background = { color: C.navyD };
  gradBar(s);
  lfLogo(s, 0.62, 0.75, 2.2, true);
  s.addText("Thank you", { x: 0.62, y: 3.2, w: CW, h: 1.1, fontSize: 48, bold: true, color: C.white, fontFace: F, margin: 0 });
  s.addText([
    { text: "Jim Zemlin", options: { bold: true, color: C.white } },
    { text: "   ·   CEO, The Linux Foundation", options: { color: "D3DEE8" } }
  ], { x: 0.62, y: 4.5, w: CW, h: 0.5, fontSize: 15, fontFace: F, margin: 0 });
}

p.writeFile({ fileName: process.argv[2] || "Company_and_the_Linux_Foundation.pptx" }).then(f => console.log("WROTE", f));
