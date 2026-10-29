#!/usr/bin/env node
/* Agent-readiness check, modelled on isitagentready.com's "content" profile (7 checks; 6 of 7 = 86%).
   usage: node agent-check.js https://example.org          check a live site
          node agent-check.js --local <site folder>        serve the folder like GitHub Pages, then again behind agent-edge/worker.js
   The live scanner is the reference: https://isitagentready.com/<domain>?profile=content */
const http = require("http"), fs = require("fs"), path = require("path");
const AGENT_RELS = ["alternate", "describedby", "service-desc", "service-doc", "api-catalog"];
async function check(base) {
  const r = {}, get = (p, h = {}) => fetch(new URL(p, base), { headers: h, redirect: "follow" });
  const rb = await get("/robots.txt"), robots = rb.ok ? await rb.text() : "";
  r.robots = rb.ok && /text\/plain/i.test(rb.headers.get("content-type") || "") && /^\s*user-agent\s*:/im.test(robots);
  const sm = (robots.match(/^\s*sitemap\s*:\s*(\S+)/im) || [])[1];
  if (sm) { const u = new URL(sm); const sres = await get(u.pathname); const x = sres.ok ? await sres.text() : ""; r.sitemap = sres.ok && /<(urlset|sitemapindex)\b/.test(x); } else r.sitemap = false;
  const home = await get("/"), link = home.headers.get("link") || "";
  const rels = [...link.matchAll(/rel="?([^";,]+)"?/gi)].map(m => m[1].toLowerCase());
  r.linkHeaders = home.ok && rels.some(x => AGENT_RELS.includes(x));
  const mdr = await get("/", { Accept: "text/markdown", "Cache-Control": "no-cache" });
  r.markdownNegotiation = mdr.ok && /text\/markdown/i.test(mdr.headers.get("content-type") || "");
  r.aiBotRules = r.robots && (/^\s*user-agent\s*:\s*\*/im.test(robots) || /user-agent\s*:\s*(gptbot|claudebot|google-extended|ccbot|perplexitybot)/i.test(robots));
  r.contentSignals = /^\s*content-signal\s*:/im.test(robots);
  r.dnsAid = false;   // needs DNSSEC-signed SVCB records (_index._agents.<domain>); not required for 86%
  const n = Object.values(r).filter(Boolean).length;
  return { checks: r, passed: n, of: 7, score: Math.round(n / 7 * 100), linkRels: rels };
}
const TYPES = { ".html": "text/html; charset=utf-8", ".md": "text/markdown; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".json": "application/json", ".png": "image/png" };
function pagesOrigin(root) {   // static files, no custom headers, no negotiation: what GitHub Pages does
  return http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname); if (p.endsWith("/")) p += "index.html";
    const f = path.join(root, p); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); res.end(fs.readFileSync(f));
  });
}
function edge(worker, origin) {   // Cloudflare-style: the Worker's fetch() reaches the origin
  return http.createServer(async (req, res) => {
    const target = new URL(req.url, origin), request = new Request(target, { method: req.method, headers: req.headers });
    const out = await worker.fetch(request);
    const h = {}; out.headers.forEach((v, k) => { h[k] = h[k] ? h[k] + ", " + v : v; });
    res.writeHead(out.status, h); res.end(Buffer.from(await out.arrayBuffer()));
  });
}
const listen = srv => new Promise(ok => srv.listen(0, "127.0.0.1", () => ok(`http://127.0.0.1:${srv.address().port}`)));
(async () => {
  const args = process.argv.slice(2);
  if (args[0] !== "--local") { if (!args[0]) throw new Error("usage: node agent-check.js https://example.org | --local <site folder>"); console.log(JSON.stringify(await check(args[0]), null, 1)); return; }
  const root = path.resolve(args[1]), o = pagesOrigin(root), originUrl = await listen(o);
  const plain = await check(originUrl);
  const worker = (await import("file://" + path.join(root, "agent-edge", "worker.js"))).default;
  const e = edge(worker, originUrl), edgeUrl = await listen(e), withEdge = await check(edgeUrl);
  o.close(); e.close();
  console.log(JSON.stringify({ githubPagesOnly: plain, behindAgentEdgeWorker: withEdge }, null, 1));
})().catch(err => { console.error("ERROR: " + err.message); process.exit(1); });
