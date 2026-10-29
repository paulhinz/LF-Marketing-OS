# Agent readiness (target: 86% on isitagentready.com, content profile)

The content profile runs 7 checks; 6 of 7 is 86%, the score akrites.org has today. Check a hosted site at `https://isitagentready.com/<domain>?profile=content`, or locally with `node scripts/agent-check.js --local <staged folder>`, which serves the folder like GitHub Pages and then again behind the edge Worker.

| Check | Pass condition | Where it comes from |
|---|---|---|
| robots.txt | Valid file with `User-agent` | Engine (`robots.txt`) |
| Sitemap | `Sitemap:` in robots.txt pointing to a valid XML sitemap | Engine (`sitemap.xml`, includes post and event pages) |
| AI bot rules | AI-specific groups, or a wildcard group that covers them | Engine (wildcard group) |
| Content Signals | `Content-Signal:` in robots.txt | Engine (`ai-train=yes, search=yes, ai-input=yes`, as on akrites.org; `site.agent.content_signal` overrides) |
| Link headers | HTTP `Link` on the homepage with `alternate`, `describedby`, `service-desc`, `service-doc` or `api-catalog` | Edge: `agent-edge/worker.js`, or `_headers` on Cloudflare Pages / Netlify |
| Markdown negotiation | `text/markdown` for `Accept: text/markdown` | Edge: the Worker serves each page's `index.md`; or Cloudflare's Markdown for Agents (Pro plan and above) |
| DNS-AID | DNSSEC-signed SVCB/HTTPS records at `_index._agents.<domain>` | Not done (akrites.org doesn't have it either) |

Measured on the Akrites build: GitHub Pages alone 4/7 (57%); behind the Worker 6/7 (86%).

## What the engine ships for every site
- `index.md` next to every `index.html` (pages, posts, events): front matter with title and URL, then the page as Markdown. `llms-full.txt` is all of them joined.
- `<link rel="alternate" type="text/markdown" href="index.md">` in every page head.
- `_headers` (Link headers and `.md` content type) for hosts that read it.
- `agent-edge/worker.js` and `agent-edge/README.md`: the Cloudflare Worker and its setup steps. The export workflow leaves `agent-edge/` out of the published site.

## By hosting option
- **Maintain in Marketing OS / Publish on LF GitHub:** IT proxies the domain through Cloudflare and routes the Worker on it (see the IT/Engineering brief). Without it these sites score 57%.
- **Export:** the project's choice; the zip's `agent-edge/README.md` explains the two options.
- **WordPress:** LF's WordPress sites already sit behind Cloudflare (akrites.org scores 86%); the request asks the Web Team to keep Markdown for Agents and a Link header on.
