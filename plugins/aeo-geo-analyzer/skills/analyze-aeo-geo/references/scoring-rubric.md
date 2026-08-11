# AEO/GEO Scoring Rubric

Score each category 0–10. Overall score = simple average, one decimal place. When evidence is incomplete (e.g., schema unverified), score conservatively and say so.

## 1. AI crawler access

- **9–10**: All AI crawlers allowed (`User-agent: *`, minimal disallows), sitemap declared and reachable, no `noindex` on key pages.
- **6–8**: Crawlable but with friction — missing sitemap declaration, some sections disallowed, or redirect issues.
- **3–5**: Some AI crawlers blocked (e.g., GPTBot or ClaudeBot disallowed) or key pages noindexed.
- **0–2**: Most/all AI crawlers blocked, or robots.txt missing/broken.

## 2. llms.txt

- **9–10**: Present, valid format, all key pages listed with complete descriptions, kept current.
- **7–8**: Present and valid, but descriptions truncated/thin or pages missing.
- **4–6**: Present but malformed or badly outdated.
- **0–3**: Absent. (Score 3 if the rest of the site is exceptionally crawlable; 0–2 otherwise.)

## 3. Content answerability

- **9–10**: Quotable one-sentence entity definition up top; question-formatted headings; 5+ FAQ pairs; self-contained answer paragraphs; consistent entity vocabulary.
- **6–8**: Clear definitional copy and some answer-ready structure, but thin FAQ or few question headings.
- **3–5**: Marketing copy without extractable definitions; vague headings; no FAQ.
- **0–2**: Content is uncrawlable, minimal, or incoherent to an LLM.

## 4. Technical metadata & structured data

- **9–10**: Complete title/description/OG/Twitter on every page, correct og:type per page type, canonical URLs, verified JSON-LD (Organization + FAQPage/Article as applicable).
- **6–8**: Good basic metadata with gaps — a page missing its description, wrong og:type, or structured data not detected/unverified.
- **3–5**: Metadata inconsistent across pages; no structured data.
- **0–2**: Missing or duplicate titles/descriptions site-wide.

## 5. External authority & citations (GEO)

- **9–10**: 6+ independent reputable outlets cover the brand; search-generated summaries are accurate; the site ranks #1 for its definitional query.
- **6–8**: A few third-party citations; summaries mostly accurate.
- **3–5**: Coverage limited to the brand's own properties and syndicated PR.
- **0–2**: No independent corpus for AI engines to ground on.

## 6. Content depth & freshness

- **9–10**: Regular publishing cadence, dated and authored content, evergreen explainers covering adjacent queries, transparency/depth pages.
- **6–8**: Solid core pages, some recent content, but no sustained cadence.
- **3–5**: Launch-era content only; single post; no dates or authors.
- **0–2**: Stale or near-empty site.
