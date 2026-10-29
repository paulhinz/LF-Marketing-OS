# AEO/GEO Analyzer

Audits any website's readiness for AI answer engines (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews) and produces a scored report with prioritized recommendations.

## What it checks

- **AI crawler access** — robots.txt rules for GPTBot, ClaudeBot, PerplexityBot, and other AI crawlers; sitemap declaration
- **llms.txt** — presence, format validity, completeness
- **Content answerability** — quotable definitions, question-formatted headings, FAQ depth, answer-ready structure
- **Technical metadata** — titles, meta descriptions, Open Graph tags, canonical URLs, structured data
- **External authority (GEO)** — third-party press coverage and citations that generative engines ground their answers on
- **Content depth & freshness** — publishing cadence, dates, authorship

## How to use

Say things like:

- "Run an AEO/GEO analysis of https://example.org"
- "How does my site perform in AI search?"
- "Will ChatGPT cite akrites.org?"

Output is a scored markdown report (`<domain> AEO-GEO Report.md`) saved to your working folder.

## Optional enhancements

- **Claude in Chrome** — enables raw-HTML structured data (JSON-LD) verification and live AI-engine answer testing
- **Ahrefs / Similarweb connectors** — add backlink, keyword, and traffic data when authorized

Neither is required; the audit degrades gracefully without them.

## Version

0.1.0 — initial release. Workflow validated against akrites.org, July 2026.
