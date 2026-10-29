---
name: analyze-aeo-geo
description: Runs a full AEO/GEO (Answer Engine Optimization / Generative Engine Optimization) audit of a website and produces a scored report with prioritized recommendations. Use when the user says "run an AEO analysis", "GEO audit", "analyze [site] for AEO/GEO", "how does my site perform in AI search", "will ChatGPT/Claude/Perplexity cite my site", "check my llms.txt", or asks how visible a site or brand is to AI answer engines.
---

# AEO/GEO Website Analysis

Audit a website's readiness for AI answer engines (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews) and produce a scored markdown report.

## Inputs

Require a target URL. If the user names a brand without a URL, confirm the domain before starting. Do not ask other clarifying questions up front — run the standard audit and note any scope the user should refine next time.

## Constraints

- Fetch web content ONLY with the web fetch tool and web search. NEVER use bash (curl/wget) or code to fetch URLs.
- The fetch tool returns rendered text, not raw HTML. JSON-LD structured data therefore cannot be confirmed from a fetch alone — report it as "not detected (unverified)" unless a browser-based source inspection was performed.
- If a fetch returns an empty shell or "enable JavaScript", the site is client-rendered — note this as a major AEO finding in itself (AI crawlers mostly do not execute JS) and switch to browser tools if available.

## Workflow

### Phase 1 — Site fundamentals (parallel fetches)

Fetch all of these in one batch:

1. `https://<domain>/` (homepage)
2. `https://<domain>/robots.txt`
3. `https://<domain>/llms.txt`
4. `https://<domain>/sitemap.xml`

Evaluate:

- **robots.txt**: Are AI crawlers allowed? Look for rules targeting GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, CCBot, Bytespider, Applebot-Extended. A bare `User-agent: *` with minimal disallows is the best case. Is a sitemap declared?
- **llms.txt**: Present? Valid format (H1 site name, H2 sections, linked pages with descriptions)? Complete and untruncated descriptions? Its mere presence is a strong positive — most sites lack one.
- **sitemap**: Reachable (follow redirects, e.g. WordPress `wp-sitemap.xml`)?

### Phase 2 — Key page analysis

From the homepage nav, llms.txt, and sitemap, identify and fetch 2–5 key pages: about/definitional pages, FAQ, most recent news/blog posts, press releases. For each page and the homepage, assess:

- **Metadata**: title tag, meta description (present on EVERY page — flag omissions per page), og:title/description/image, correct og:type (`website` for homepage, `article` for posts), canonical URL, meta robots (flag `noindex` or restrictive rules).
- **Answerability**: Is there a one-sentence quotable definition of the entity/product near the top? Question-formatted headings? Clear entity vocabulary an LLM can ground on? Self-contained answer paragraphs (40–80 words) under descriptive headings?
- **FAQ depth**: Count actual Q&A pairs. Fewer than 5 is thin.
- **Freshness/depth**: Publish dates, author attribution, content cadence (one launch post vs. ongoing publishing).

### Phase 3 — External GEO visibility (parallel searches)

Run at least two web searches:

1. `<brand> <category keywords>` — e.g. "Akrites Linux Foundation vulnerability remediation"
2. A question a target user would ask — e.g. "what is <brand>"

Evaluate:

- How many independent third-party outlets cover the brand? (Trade press, Wikipedia, industry sites — this is the corpus generative engines cite.)
- Is the search-generated summary of the brand accurate and consistent with the site's own messaging? Quote discrepancies.
- Does the brand's own site rank for its definitional query?

### Phase 4 — Optional deep checks (attempt, degrade gracefully)

- **Structured data**: If browser tools (Claude in Chrome) are available, load the homepage and inspect page source for `application/ld+json` blocks; identify schema types (Organization, FAQPage, Article). If unavailable, mark unverified.
- **Live AI-engine answers**: If browser tools are available and the user wants it, test "what is <brand>" in AI engines and record how the brand is described and whether the site is cited.
- **SEO tooling**: If Ahrefs or Similarweb connectors are authorized, pull backlink and traffic data. If installed but unauthorized, note that in the report's capability section rather than failing.

### Phase 5 — Score and report

Score six categories per `references/scoring-rubric.md`. Write the report following `references/report-template.md`. Save it as `<domain> AEO-GEO Report.md` in the user's working folder and present the file. Keep the chat summary to headline score, top strengths, top gaps — the report carries the detail.

Cite every third-party source used (search results, coverage articles) in the report's Sources section.
