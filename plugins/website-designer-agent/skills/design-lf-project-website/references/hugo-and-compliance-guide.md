# Hugo scaffold, visual direction, and compliance/AEO guide

## Scaffold conventions

Build a standard Hugo tree in a `site/` subfolder of the project workspace:

```
site/
├── hugo.toml            # baseURL = approved domain (or placeholder if TBD), title, params
├── content/
│   ├── _index.md        # Home — front matter drives section blocks
│   └── <page>/_index.md # one per sitemap page, weight = nav order
├── layouts/
│   ├── _default/{baseof,single,list}.html
│   ├── partials/{header,footer,hero,section,seo}.html
│   └── index.html
├── assets/{css,js}/     # single main.scss driven by Brand Kit tokens
├── static/{img,}        # logos, favicons, llms.txt
└── data/                # members.yaml, case-studies.yaml etc. — structured content as data, not prose
```

Principles: content in Markdown front matter + body (EDs will edit it later); repeatable structures (members, case studies, events) as data files; one `seo.html` partial owns all meta/structured-data output; no theme dependency — self-contained layouts so the repo has no submodules.

If Hugo is not installed in the sandbox, install the extended edition binary from the official GitHub release before building.

## Visual directions (Gate 2)

Derive 2–3 directions from the Brand Kit only — never invent a palette. Vary along: color deployment (primary-dominant vs neutral-with-accent), typography scale/weight contrast, hero treatment (full-bleed color, illustration/pattern, product-shot). For each direction render the Home page (hugo server + screenshot, or export static HTML preview) so the ED compares real pages, not descriptions. Name each direction descriptively ("Confident primary", "Editorial neutral").

## Population rules (Step 4)

- Locked summaries from the Message Foundation are verbatim: hero subtext (25-word), meta descriptions (per locked lengths), boilerplate in footer/about.
- All other copy: written fresh per page purpose, in Brand Kit voice, grounded in messaging pillars and talking points — never lorem ipsum, never invented facts, no unverifiable claims (member counts, benchmarks) unless sourced from the docs or gap answers.
- Member/adopter logos only with confirmed permission (gap answer 2); otherwise use text lists.

## Compliance & AEO checklist (run all; report pass/fail per item at Gate 3)

1. **LF footer**: Linux Foundation trademark notice ("The Linux Foundation has registered trademarks and uses trademarks. For a list of trademarks..."), link to LF privacy policy, link to project code of conduct, copyright line with current year and correct legal entity (from Brand Kit / charter).
2. **llms.txt** at site root — copied from the Message Foundation doc, not regenerated.
3. **Meta**: unique title + meta description per page (locked summaries where applicable), Open Graph + Twitter card tags, canonical URLs.
4. **Structured data**: JSON-LD `Organization` on Home (name, logo, sameAs → GitHub/social), `WebSite`; `Article` on any news content.
5. **sitemap.xml + robots.txt** (Hugo built-ins; verify emitted).
6. **Analytics**: GA4 or Plausible snippet if a property ID was provided; loaded behind consent where required.
7. **Consent banner**: config stub compatible with OneTrust/Consent Hub; do not invent cookie policy text.
8. **Accessibility basics**: alt text on all images, single h1 per page, color-contrast check of chosen direction against WCAG AA.
9. **Redirects** (redesigns): every preserved old URL has an alias/redirect entry.

## Build verification (ground truth)

`hugo --minify` must exit 0 with zero errors and zero warnings. Run a link check over the rendered output (no broken internal links). Then brand-review the rendered copy against the Brand Kit (terminology, voice, locked-copy verbatim check) before presenting the Gate 3 preview.
