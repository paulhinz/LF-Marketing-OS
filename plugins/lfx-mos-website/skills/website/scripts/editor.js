/* editor.js — the offline copy editor inside edit.html.
   Reads site.json from the page, edits copy only (colours, fonts and layout come from the brand kit), previews with SiteGen,
   and downloads a new .zip that contains the updated site and this editor again. No network, no dependencies.
   Keep this file free of the literal sequences "</scr" + "ipt" and "<!" + "--": it is embedded inside a script tag. */
(function () {
  "use strict";
  var S = window.SiteGen;
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  var original = JSON.parse(document.getElementById("site-data").textContent);
  var SRC = { engine: document.getElementById("sitegen").textContent, editor: document.getElementById("site-editor").textContent };
  var KEY = "lfx-mos-website:" + S.slug(original.project.name) + ":" + ((original.meta && original.meta.generated_at) || "");
  var site = clone(original), cur = "home", mobile = false, timer = null, uid = 0;
  var PAGE_KEYS = S.PAGES.map(function (p) { return p.key; }).concat(["settings"]);
  /* hosting mode: "managed" = Maintain in Marketing OS (existing fields only, no structural changes);
     "managed" and "lf-github" save site.json for publishing instead of downloading a zip */
  var MODE = (original.launch && original.launch.hosting) || "";
  var LOCKED_STRUCTURE = MODE === "managed", SAVE_JSON = MODE === "managed" || MODE === "lf-github";
  var POSTS_ONLY = MODE === "lf-github";                       /* LF GitHub: the site is edited in its repo; this editor writes posts and events only */
  var OPEN_LISTS = ["pages.blog.posts", "pages.events.items"]; /* posts and events can always be added, even when the structure is locked */
  if (POSTS_ONLY) PAGE_KEYS = ["blog", "events"];
  var FIELDS_FOR = function (k) { var fs = S.FIELDS[k] || []; return POSTS_ONLY ? fs.filter(function (f) { return OPEN_LISTS.indexOf(f.k) >= 0; }) : fs; };
  var LOCKED_FIELDS = LOCKED_STRUCTURE ? ["project.domain", "signup.endpoint"] : [];
  var detail = null, pendingImg = null, today = function () { return new Date().toISOString().slice(0, 10); };
  var label = function (k) { return k === "settings" ? "Site settings" : S.PAGES.filter(function (p) { return p.key === k; })[0].title; };

  function store(v) { try { if (v === undefined) return localStorage.getItem(KEY); if (v === null) localStorage.removeItem(KEY); else localStorage.setItem(KEY, v); } catch (e) { return null; } }
  function get(o, path) { return path.split(".").reduce(function (a, k) { return a == null ? undefined : a[k]; }, o); }
  function set(o, path, v) { var ks = path.split("."), a = o; ks.slice(0, -1).forEach(function (k, i) { if (a[k] == null) a[k] = /^\d+$/.test(ks[i + 1]) ? [] : {}; a = a[k]; }); a[ks[ks.length - 1]] = v; }
  function say(msg) { var s = document.getElementById("status"); if (s) { s.textContent = ""; setTimeout(function () { s.textContent = msg; }, 30); } }
  var dirty = function () { return JSON.stringify(site) !== JSON.stringify(original); };

  /* ------------------------------------------------------------ shell */
  var app = document.getElementById("app");
  var draft = null; try { draft = JSON.parse(store() || "null"); } catch (e) { draft = null; }
  if (draft && !S.isSite(draft)) draft = null;
  app.innerHTML =
    '<header class="bar"><h1>' + (POSTS_ONLY ? "Posts and events: " + esc(site.project.name) : "Edit the " + esc(site.project.name) + " website") + '</h1><span class="status" id="status" role="status" aria-live="polite"></span><span class="sp"></span>' +
    '<button type="button" class="btn" id="open">Open site.json</button><input type="file" id="file" accept=".json,application/json" hidden aria-label="Choose a site.json file">' +
    (SAVE_JSON ? '' : '<button type="button" class="btn" id="dljson">Download site.json</button>') + '<button type="button" class="btn" id="reset">Reset to generated copy</button>' +
    (SAVE_JSON ? '<button type="button" class="btn primary" id="dljson">Save changes for publishing</button>' : '<button type="button" class="btn primary" id="dlzip">Download .zip</button>') + '</header>' +
    (MODE && S.HOSTING[MODE] ? '<div style="padding:12px 16px 0"><div class="notice"><span><b>' + esc(S.HOSTING[MODE].label) + '.</b> ' + esc(LOCKED_STRUCTURE ? "Edit the text of existing fields, and add blog posts and events. Other sections, the design and the domain are locked. Save your changes and ask Claude to publish them." : POSTS_ONLY ? "The site itself is edited in its LF GitHub repository. Here you write blog posts and events: save them and ask Claude to publish them as a pull request." : S.HOSTING[MODE].text) + '</span></div></div>' : '') +
    (draft && JSON.stringify(draft) !== JSON.stringify(original) ? '<div style="padding:12px 16px 0"><div class="notice" id="draftbox"><span>You have unsaved edits from an earlier session in this browser.</span><button type="button" class="btn sm" id="restore">Restore my edits</button><button type="button" class="btn sm" id="discard">Discard them</button></div></div>' : "") +
    '<div class="layout"><nav class="pages" aria-label="Pages" id="pages"></nav>' +
    '<section class="fields" aria-labelledby="fh"><h2 id="fh" tabindex="-1" style="margin:0;font-size:18px;color:var(--ink)"></h2><div class="checks" id="checks"></div><div id="form" class="fields"></div></section>' +
    '<section class="preview" aria-label="Preview"><div class="ptools"><span class="addr" id="addr"></span>' +
    '<button type="button" class="btn sm" id="wd" aria-pressed="true">Desktop</button><button type="button" class="btn sm" id="wm" aria-pressed="false">Mobile</button></div>' +
    '<div class="frame" id="frame"><iframe id="pv" title="Preview of the page"></iframe></div>' +
    '<p class="status" style="margin-top:8px">The preview uses the same engine as the zip. Colours, fonts and layout come from the brand kit and are checked for WCAG 2.2 AA; copy edits here can\'t change them.</p></section></div>';

  /* ------------------------------------------------------------ page list + checks */
  function counts() {
    var c = S.check(site), by = {};
    c.placeholders.concat(c.avoid, c.seo, c.links).forEach(function (x) { by[x.page] = (by[x.page] || 0) + 1; });
    return { c: c, by: by };
  }
  function renderNav() {
    var k = counts().by;
    document.getElementById("pages").innerHTML = PAGE_KEYS.map(function (p) {
      var n = k[p] || 0;
      return '<button type="button" data-p="' + p + '"' + (p === cur ? ' aria-current="true"' : "") + '><span>' + esc(label(p)) + '</span>' + (n ? '<span class="cnt"><span class="sr-only">, </span>' + n + '<span class="sr-only"> to fix</span></span>' : "") + "</button>";
    }).join("");
  }
  function fieldLabel(path) {
    var best = null;
    FIELDS_FOR(cur).forEach(function (f) { if (path === f.k || path.indexOf(f.k + ".") === 0) best = f; });
    if (!best) return path;
    if (best.t !== "objs") return best.l;
    var rest = path.slice(best.k.length + 1).split("."), i = +rest[0], key = rest[1], sub = (best.keys.filter(function (x) { return x[0] === key; })[0] || [key, key])[1];
    return best.l + " " + (i + 1) + ": " + sub;
  }
  function renderChecks() {
    var c = counts().c, page = cur, items = [];
    c.placeholders.filter(function (x) { return x.page === page; }).forEach(function (x) { items.push([x.field, "Replace placeholder " + x.text + " in " + fieldLabel(x.field)]); });
    c.avoid.filter(function (x) { return x.page === page; }).forEach(function (x) { items.push([x.field, '"' + x.phrase + '" is on the avoid list' + (x.use ? ': use "' + x.use + '"' : "") + " (" + fieldLabel(x.field) + ")"]); });
    c.seo.filter(function (x) { return x.page === page; }).forEach(function (x) { items.push(["pages." + page + ".seo_description", x.issue]); });
    c.links.filter(function (x) { return x.page === page; }).forEach(function (x) { items.push([x.field, "Link isn't a web address, site path or #anchor: " + x.url]); });
    var total = c.total;
    document.getElementById("checks").innerHTML = '<h2>Before launch</h2>' + (items.length
      ? '<ul>' + items.map(function (it) { return '<li>' + esc(it[1]) + ' <button type="button" class="btn sm" data-go="' + esc(it[0]) + '">Go to field</button></li>'; }).join("") + "</ul>"
      : '<p class="ok" style="margin:0;font-size:13px">Nothing to fix on this page.</p>') +
      '<p class="status" style="margin:6px 0 0">' + total + " item" + (total === 1 ? "" : "s") + " across the site.</p>";
  }

  /* ------------------------------------------------------------ form */
  function input(path, lab, type, hint) {
    var id = "f" + (++uid), v = get(site, path);
    if (type === "lines") v = (v || []).join("\n");
    if (type === "rich") {
      var tools = [["h2", "Heading"], ["h3", "Subheading"], ["bold", "Bold"], ["italic", "Italic"], ["link", "Link"], ["ul", "Bulleted list"], ["ol", "Numbered list"], ["quote", "Quote"], ["code", "Inline code"], ["codeblock", "Code block"], ["image", "Image"]];
      return '<div class="f rich"><label for="' + id + '">' + esc(lab) + '</label><div class="rtools" role="group" aria-label="Formatting for ' + esc(lab) + '">' +
        tools.map(function (t) { return '<button type="button" class="btn sm" data-md="' + t[0] + '" data-for="' + id + '">' + t[1] + "</button>"; }).join("") + "</div>" +
        '<textarea id="' + id + '" class="richtext" data-path="' + esc(path) + '" aria-describedby="' + id + 'h" rows="12" spellcheck="true">' + esc(v) + "</textarea>" +
        '<span class="hint" id="' + id + 'h">Formatting is Markdown: ## heading, **bold**, *italic*, [link](https://…), - or 1. lists, &gt; quote, `inline code`, ``` for a code block. Every image needs a description.</span>' +
        '<div class="imgform" id="' + id + 'i" hidden></div><input type="file" accept="image/png,image/jpeg,image/gif,image/webp" data-imgfor="' + id + '" hidden aria-label="Choose an image for ' + esc(lab) + '"></div>';
    }
    var lock = LOCKED_FIELDS.indexOf(path) >= 0; if (lock) hint = "Managed by LF; can't be changed here.";
    var ctl = type === "text" ? '<input type="text" id="' + id + '" data-path="' + esc(path) + '" value="' + esc(v) + '"' + (lock ? ' readonly aria-readonly="true"' : '') + '>'
      : '<textarea id="' + id + '" data-path="' + esc(path) + '"' + (type === "lines" ? ' data-lines="1"' : "") + (hint ? ' aria-describedby="' + id + 'h"' : "") + ">" + esc(v) + "</textarea>";
    if (type === "text" && hint) ctl = ctl.replace("<input ", '<input aria-describedby="' + id + 'h" ');
    return '<div class="f"><label for="' + id + '">' + esc(lab) + "</label>" + ctl + (hint ? '<span class="hint" id="' + id + 'h">' + esc(hint) + "</span>" : "") + "</div>";
  }
  var single = function (l) { return l.replace(/\s*\(.*\)$/, "").replace(/ies$/, "y").replace(/s$/, ""); };
  function objs(f) {
    var list = get(site, f.k) || [], name = single(f.l), locked = LOCKED_STRUCTURE && OPEN_LISTS.indexOf(f.k) < 0;
    return '<fieldset><legend>' + esc(f.l) + "</legend>" + (f.h ? '<span class="hint" style="font-size:12.5px;color:var(--muted)">' + esc(f.h) + "</span>" : "") +
      list.map(function (o, i) {
        if (locked) return '<div class="obj"><div class="objbar"><b>' + esc(name) + " " + (i + 1) + "</b></div>" + f.keys.map(function (k) { return input(f.k + "." + i + "." + k[0], k[1], k[2] || "text"); }).join("") + "</div>";
        return '<div class="obj"><div class="objbar"><b>' + esc(name) + " " + (i + 1) + "</b>" +
          '<button type="button" class="btn sm" data-move="' + esc(f.k) + '" data-i="' + i + '" data-d="-1"' + (i === 0 ? " disabled" : "") + ' aria-label="Move ' + esc(name) + " " + (i + 1) + ' up">Up</button>' +
          '<button type="button" class="btn sm" data-move="' + esc(f.k) + '" data-i="' + i + '" data-d="1"' + (i === list.length - 1 ? " disabled" : "") + ' aria-label="Move ' + esc(name) + " " + (i + 1) + ' down">Down</button>' +
          '<button type="button" class="btn sm" data-del="' + esc(f.k) + '" data-i="' + i + '" aria-label="Remove ' + esc(name) + " " + (i + 1) + '">Remove</button></div>' +
          f.keys.map(function (k) { return input(f.k + "." + i + "." + k[0], k[1], k[2] || "text"); }).join("") + "</div>";
      }).join("") + (locked ? "" : '<div><button type="button" class="btn sm" data-add="' + esc(f.k) + '">Add ' + esc(name.toLowerCase()) + "</button></div>") + "</fieldset>";
  }
  function renderForm(focusPath) {
    document.getElementById("fh").textContent = label(cur);
    document.getElementById("form").innerHTML = FIELDS_FOR(cur).map(function (f) { return f.t === "objs" ? objs(f) : input(f.k, f.l, f.t, f.h); }).join("");
    if (focusPath) { var el = document.querySelector('[data-path="' + focusPath + '"]') || document.querySelector('[data-add="' + focusPath + '"]'); if (el) el.focus(); }
  }

  /* ------------------------------------------------------------ preview */
  function renderPreview() {
    var key = cur === "settings" ? "home" : cur, pv = document.getElementById("pv"), y = 0;
    try { y = pv.contentWindow ? pv.contentWindow.scrollY : 0; } catch (e) { y = 0; }
    pv.onload = function () { try { pv.contentWindow.scrollTo(0, y); } catch (e) { /* cross-origin in some browsers: ignore */ } };
    var d = detail && ((detail.kind === "post" && key === "blog") || (detail.kind === "event" && key === "events")) ? S.details(site, detail.kind).filter(function (x) { return x.i === detail.i; })[0] : null;
    pv.srcdoc = S.page(site, key, d ? { preview: true, detail: { kind: d.kind, i: d.i } } : { preview: true });
    pv.title = d ? "Preview of " + (d.kind === "post" ? "the post " : "the event ") + (d.item.title || d.item.name) : "Preview of the " + label(key) + " page";
    var path = d ? d.path : S.PAGES.filter(function (p) { return p.key === key; })[0].path;
    document.getElementById("addr").textContent = (site.project.domain || "example.org") + path;
    fit();
  }
  /* render the preview at real width (1280 desktop, 390 mobile) and scale it to the space available */
  function fit() {
    var fr = document.getElementById("frame"), pv = document.getElementById("pv"); if (!fr) return;
    var W = mobile ? 390 : 1280, avail = fr.parentNode.clientWidth || W, s = Math.min(1, avail / W), H = Math.max(480, window.innerHeight - 150);
    fr.style.width = Math.round(W * s) + "px"; fr.style.height = H + "px";
    pv.style.width = W + "px"; pv.style.height = Math.round(H / s) + "px"; pv.style.transform = "scale(" + s + ")"; pv.style.transformOrigin = "0 0";
  }
  window.addEventListener("resize", fit);
  function refresh(now) {
    clearTimeout(timer);
    var go = function () { renderPreview(); renderChecks(); renderNav(); if (dirty()) store(JSON.stringify(site)); };
    if (now) go(); else timer = setTimeout(go, 250);
  }
  function show(key, focusHeading, keepDetail) {
    cur = key; if (!keepDetail) detail = null; renderNav(); renderForm(); refresh(true);
    if (focusHeading) document.getElementById("fh").focus();
  }

  /* ------------------------------------------------------------ events */
  app.addEventListener("input", function (e) {
    var el = e.target, path = el.getAttribute && el.getAttribute("data-path"); if (!path || LOCKED_FIELDS.indexOf(path) >= 0) return;
    set(site, path, el.hasAttribute("data-lines") ? el.value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean) : el.value);
    refresh(false);
  });
  /* ------------------------------------------------------------ rich text: toolbar, images, preview follows the item being edited */
  function applyMd(ta, kind) {
    var v = ta.value, s = ta.selectionStart, e = ta.selectionEnd, sel = v.slice(s, e), out, cs, ce;
    var ls = v.lastIndexOf("\n", s - 1) + 1, le = v.indexOf("\n", e); if (le < 0) le = v.length;
    function wrap(a, b, ph) { var t = sel || ph; out = v.slice(0, s) + a + t + b + v.slice(e); cs = s + a.length; ce = cs + t.length; }
    function lines(p, num) { var t = v.slice(ls, le).split("\n").map(function (l, i) { return (num ? (i + 1) + ". " : p) + l.replace(/^(#{1,4}\s|[-*]\s|\d+[.)]\s|>\s?)/, ""); }).join("\n"); out = v.slice(0, ls) + t + v.slice(le); cs = ls; ce = ls + t.length; }
    if (kind === "h2") lines("## "); else if (kind === "h3") lines("### "); else if (kind === "ul") lines("- "); else if (kind === "ol") lines("", true); else if (kind === "quote") lines("> ");
    else if (kind === "bold") wrap("**", "**", "bold text"); else if (kind === "italic") wrap("*", "*", "italic text"); else if (kind === "code") wrap("`", "`", "code");
    else if (kind === "link") wrap("[", "](https://)", "link text");
    else if (kind === "codeblock") { var t = sel || "code", pre = s === 0 ? "" : /\n\n$/.test(v.slice(0, s)) ? "" : /\n$/.test(v.slice(0, s)) ? "\n" : "\n\n"; out = v.slice(0, s) + pre + "```\n" + t + "\n```\n" + v.slice(e); cs = s + pre.length + 4; ce = cs + t.length; }
    else return;
    ta.value = out; ta.focus(); ta.setSelectionRange(cs, ce); ta.dispatchEvent(new Event("input", { bubbles: true }));
  }
  function imgForm(ta, html) { var box = document.getElementById(ta.id + "i"); box.innerHTML = html || ""; box.hidden = !html; return box; }
  app.addEventListener("change", function (e) {
    var fi = e.target; if (!fi.hasAttribute || !fi.hasAttribute("data-imgfor")) return;
    var ta = document.getElementById(fi.getAttribute("data-imgfor")), file = fi.files && fi.files[0]; fi.value = ""; if (!file || !ta) return;
    if (!S.MEDIA_EXT[file.type]) return say("Use a PNG, JPEG, GIF or WebP image.");
    if (file.size > 1.5 * 1024 * 1024) return say("That image is over 1.5 MB. Resize it and try again.");
    var r = new FileReader();
    r.onload = function () {
      pendingImg = { ta: ta.id, name: file.name, type: file.type, data: String(r.result).split(",")[1] };
      var box = imgForm(ta, '<label for="' + ta.id + 'alt">Describe this image for people who can\'t see it (alt text)</label><input type="text" id="' + ta.id + 'alt" aria-describedby="' + ta.id + 'alterr"><span class="err" id="' + ta.id + 'alterr"></span>' +
        '<div class="row"><button type="button" class="btn sm primary" data-imgins="' + ta.id + '">Insert ' + esc(file.name) + '</button><button type="button" class="btn sm" data-imgcancel="' + ta.id + '">Cancel</button></div>');
      box.querySelector("input").focus();
    };
    r.readAsDataURL(file);
  });
  app.addEventListener("focusin", function (e) {
    var p = e.target.getAttribute && e.target.getAttribute("data-path"), m = p && p.match(/^pages\.(blog\.posts|events\.items)\.(\d+)\./);
    var nd = m ? { kind: m[1] === "blog.posts" ? "post" : "event", i: +m[2] } : null;
    if (p && JSON.stringify(nd) !== JSON.stringify(detail)) { detail = nd; renderPreview(); }
  });
  app.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("button") : null; if (!b) return;
    if (b.hasAttribute("data-md")) { var ta0 = document.getElementById(b.getAttribute("data-for")); if (!ta0) return; if (b.getAttribute("data-md") === "image") { var fi0 = app.querySelector('[data-imgfor="' + ta0.id + '"]'); if (fi0) fi0.click(); return; } return applyMd(ta0, b.getAttribute("data-md")); }
    if (b.hasAttribute("data-imgcancel")) { var tc = document.getElementById(b.getAttribute("data-imgcancel")); pendingImg = null; imgForm(tc, ""); tc.focus(); return say("Image not added"); }
    if (b.hasAttribute("data-imgins")) {
      var ti = document.getElementById(b.getAttribute("data-imgins")), alt = (document.getElementById(ti.id + "alt").value || "").trim().replace(/[\[\]]/g, "");
      if (!alt) { document.getElementById(ti.id + "alterr").textContent = "Add a description before inserting the image."; document.getElementById(ti.id + "alt").focus(); return; }
      var mid = (Date.now().toString(16) + Math.random().toString(16).slice(2)).slice(-10); site.media = site.media || {}; site.media[mid] = { name: pendingImg.name, type: pendingImg.type, data: pendingImg.data };
      var pos = ti.selectionEnd || ti.value.length, v0 = ti.value, ins = (pos && v0[pos - 1] !== "\n" ? "\n\n" : "") + "![" + alt + "](media:" + mid + ")\n";
      ti.value = v0.slice(0, pos) + ins + v0.slice(pos); pendingImg = null; imgForm(ti, ""); ti.focus(); ti.setSelectionRange(pos + ins.length, pos + ins.length);
      ti.dispatchEvent(new Event("input", { bubbles: true })); return say("Image added");
    }
    if (b.hasAttribute("data-p")) return show(b.getAttribute("data-p"));
    if (b.hasAttribute("data-go")) { var t = document.querySelector('[data-path="' + b.getAttribute("data-go") + '"]'); if (t) t.focus(); return; }
    var k, list, i;
    if (b.hasAttribute("data-add")) {
      k = b.getAttribute("data-add"); list = get(site, k) || []; var f = FIELDS_FOR(cur).filter(function (x) { return x.k === k; })[0], o = {};
      f.keys.forEach(function (kk) { o[kk[0]] = kk[2] === "lines" ? [] : ""; }); if (OPEN_LISTS.indexOf(k) >= 0) o.date = today(); list.push(o); set(site, k, list);
      renderForm(k + "." + (list.length - 1) + "." + f.keys[0][0]); say(single(f.l) + " " + list.length + " added"); return refresh(true);
    }
    if (b.hasAttribute("data-del")) {
      k = b.getAttribute("data-del"); i = +b.getAttribute("data-i"); list = get(site, k) || []; list.splice(i, 1); set(site, k, list);
      renderForm(list.length ? k + "." + Math.max(0, i - 1) + "." + Object.keys(list[Math.max(0, i - 1)])[0] : k); say("Removed"); return refresh(true);
    }
    if (b.hasAttribute("data-move")) {
      k = b.getAttribute("data-move"); i = +b.getAttribute("data-i"); var d = +b.getAttribute("data-d"); list = get(site, k) || [];
      var x = list[i]; list[i] = list[i + d]; list[i + d] = x; set(site, k, list);
      renderForm(); var nb = document.querySelector('[data-move="' + k + '"][data-i="' + (i + d) + '"][data-d="' + d + '"]') || document.querySelector('[data-move="' + k + '"][data-i="' + (i + d) + '"]');
      if (nb) nb.focus(); say("Moved to position " + (i + d + 1)); return refresh(true);
    }
    if (b.id === "wd" || b.id === "wm") { mobile = b.id === "wm"; document.getElementById("wd").setAttribute("aria-pressed", String(!mobile)); document.getElementById("wm").setAttribute("aria-pressed", String(mobile)); return fit(); }
    if (b.id === "restore") { site = clone(draft); document.getElementById("draftbox").parentNode.remove(); show(cur); return say("Earlier edits restored"); }
    if (b.id === "discard") { store(null); document.getElementById("draftbox").parentNode.remove(); return say("Earlier edits discarded"); }
    if (b.id === "reset") { if (window.confirm("Reset every page to the copy generated from the messaging framework? Your edits in this browser will be lost.")) { site = clone(original); store(null); show(cur); say("Reset to the generated copy"); } return; }
    if (b.id === "open") return document.getElementById("file").click();
    if (b.id === "dljson" && POSTS_ONLY) {
      var cu = { kind: "lfx-mos-website/content-update", version: S.VERSION, project: { name: site.project.name, domain: site.project.domain }, saved_at: new Date().toISOString(),
        posts: site.pages.blog.posts || [], events: site.pages.events.items || [], media: site.media || {} };
      download(JSON.stringify(cu, null, 2), S.slug(site.project.short || site.project.name) + "-posts-events.json", "application/json"); return say("Saved. Ask Claude to publish these posts and events.");
    }
    if (b.id === "dljson") { var sj = stamp(clone(site)); download(JSON.stringify(sj, null, 2), SAVE_JSON ? S.slug(sj.project.short || sj.project.name) + "-site.json" : "site.json", "application/json"); return say(SAVE_JSON ? "Saved. Ask Claude to publish these changes." : "Downloaded site.json"); }
    if (b.id === "dlzip") {
      var s2 = stamp(clone(site)), slug = S.slug(s2.project.short || s2.project.name) + "-website";
      var bytes = S.zip(S.files(s2, { engine: SRC.engine, editor: SRC.editor }), slug + "/");
      download(bytes, slug + ".zip", "application/zip"); return say("Downloaded " + slug + ".zip");
    }
  });
  function stamp(s) { if (JSON.stringify(s) !== JSON.stringify(original)) { s.meta = s.meta || {}; s.meta.edited_at = new Date().toISOString(); if (s.meta.audit) s.meta.audit.edited = true; } return s; }
  function download(data, name, type) {
    var url = URL.createObjectURL(new Blob([data], { type: type })), a = document.createElement("a");
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }
  document.getElementById("file").addEventListener("change", function (e) {
    var f = e.target.files && e.target.files[0]; if (!f) return; var r = new FileReader();
    r.onload = function () { try { var s = JSON.parse(r.result); if (!S.isSite(s)) throw new Error("not a site.json"); if (LOCKED_STRUCTURE) { s.launch = original.launch; s.project.domain = original.project.domain; s.signup.endpoint = original.signup.endpoint; } site = s; show("home"); say("Opened " + f.name); } catch (err) { say("That file isn't a site.json from this tool."); } };
    r.readAsText(f); e.target.value = "";
  });
  window.addEventListener("message", function (e) {
    var k = e.data && e.data.lfxPage; if (k && PAGE_KEYS.indexOf(k) >= 0) return show(k, true);
    var dd = e.data && e.data.lfxDetail; if (dd) { var pr = dd.split(":"); detail = { kind: pr[0], i: +pr[1] }; show(pr[0] === "post" ? "blog" : "events", true, true); }
  });
  window.addEventListener("beforeunload", function (e) { if (dirty()) { store(JSON.stringify(site)); } });

  show(PAGE_KEYS[0]);
})();
