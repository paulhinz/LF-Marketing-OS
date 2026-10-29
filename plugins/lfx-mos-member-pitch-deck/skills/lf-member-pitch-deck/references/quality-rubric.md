# Quality rubric (per-pass self-review)

Score every draft pass against all criteria before presenting to the human reviewer. Each criterion is pass/fail. A draft ships to the human gate only when every criterion passes. Maximum 3 revision cycles — after 3, stop and present the best draft with the failing criteria listed.

## Structure

- [ ] Slide count is 22 or fewer; the standard 21 slides are present in order unless a deliberate, noted omission (e.g. no named ED yet → no `person` slide)
- [ ] The three parts are in order: About the LF (1–5) → Introducing the Foundation (6–16) → How to join (17–21), and the Agenda slide lists exactly those three
- [ ] Slides 3–5 use the fixed LF copy and the approved project mosaic (or the documented fallback)

## Style compliance (membership overview style)

- [ ] The .pptx was produced by `scripts/build_deck.py`; the spec sets only `project`, `theme` tokens and slide content — no per-slide fonts, sizes or colors
- [ ] Builder ran with zero `!` warnings (no LONG text, no missing images, no logo-wall overflow)
- [ ] Rendered slides: no text leaving a card or colliding with a title; cards on the same slide are parallel (same heading length class, same body length class); step arrows centered; no empty boxes
- [ ] Project wordmark bottom-left on every content slide; LF | project lockup on the title and thank-you slides; the ask slide is dark with the light wordmark
- [ ] Title slide carries only the foundation name, tagline and month/year — no presenter, no "briefing", no agent attribution; no slide carries a "Source:" line or legal-entity footer

## Brand compliance (vs. Brand Kit)

- [ ] `theme.accent`, `display_font`, `body_font`, wordmarks and mark come from the Brand Kit; terminology and prohibited terms respected; the legal name ("[Project] a Series of LF Projects, LLC" or as the LFX record states) appears once, on slide 6

## Message compliance (vs. Message Foundation)

- [ ] Vision, mission and strategy on slide 7 are verbatim and fit one screen
- [ ] Slide 6 uses the locked summary language; slide 9's title is the one-sentence promise
- [ ] Each card, row and step carries one idea; no slide exceeds the word budgets in `lf-template-guide.md`

## Evidence

- [ ] Every stat tile is a defensible rounded figure, with the exact value, source URL and read date in that slide's notes
- [ ] Member logos match the project's public members page or LFX, grouped by the correct tier; no unlisted logos
- [ ] Tier names, fees and benefits match the published tier matrix; the enrollment URL and contact address are correct
- [ ] Any member quote or case study is pre-approved; nothing fabricated

## Audience fit (vs. ICP doc)

- [ ] Slide 8 states the segment's pain points in the prospect's vocabulary, per the ICP doc
- [ ] Slide 18 maps a benefit to each ICP persona's pain (max 4 personas)
- [ ] Technical depth stays at 1,000 feet throughout; slide 9 is four steps

## Action

- [ ] Slide 16 ends with the "your priority here" callout; slide 19 starts with the enrollment URL; slide 20 makes exactly one ask with a working hyperlink and one contact
- [ ] Speaker notes contain the prep brief: per-slide talking points, every figure's source, prospect pain-point mapping (if a prospect was named), and the recommended tier and next step
