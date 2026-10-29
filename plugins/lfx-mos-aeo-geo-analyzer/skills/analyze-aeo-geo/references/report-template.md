# Report Template

Save as `<domain> AEO-GEO Report.md`. Follow this structure exactly; write findings in prose, not bullet fragments, except where the template shows lists.

```markdown
# AEO/GEO Analysis: <domain>

**<Audit type> — <date>**

Overall score: **X.X / 10** — <one-line verdict>.

## Scorecard

| Category | Score | Summary |
|---|---|---|
| AI crawler access | X/10 | <one line> |
| llms.txt | X/10 | <one line> |
| Content answerability | X/10 | <one line> |
| Technical metadata | X/10 | <one line> |
| External authority (GEO) | X/10 | <one line> |
| Content depth & freshness | X/10 | <one line> |

## What's working

<3–5 findings. Bold the finding, then evidence — quote the actual copy, robots.txt lines, or coverage found.>

## Recommendations (priority order)

<Numbered, most impactful first. Each must be concrete and actionable — name the page, the tag, the schema type, the missing FAQ questions. Include effort hints where obvious (quick fix vs. content program).>

## Caveats & unverified items

<Anything scored on incomplete evidence: schema unverified without browser check, connectors unauthorized, pages not fetched. Be explicit so readers know confidence levels.>

## Sources

<Site pages audited, then third-party coverage as markdown links.>
```

Conventions:

- Never inflate scores to be polite; never zero a category for a single fixable gap.
- Quote real evidence. "The hero line '<actual text>' is a quotable definition" beats "good messaging."
- Recommendations must be executable by a web team without further research.
