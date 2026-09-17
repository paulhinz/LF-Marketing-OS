# Brand review rubric (LF edition)

Adapted from the Marketing plugin's brand-review skill, with the rules that matter for Linux Foundation project documents added. The guideline source is the project's own Brand Kit: its voice attributes ("We are / We are not / Sounds like / Doesn't sound like"), tone and style rules, terminology, and competitive rules. Derivatives are checked against that standard; the Brand Kit is checked against itself and against the LF rules below.

## Dimensions

**Voice and tone.** Does each passage match the named attributes? Flag sentences that drift (a hedge in a "Definitive" brand, an exclamation in a "Direct" one, fear-selling in a "Secure" one). Tone may shift by channel; voice may not.

**Terminology.** Casing rules (for example lowercase "x402" at sentence start), protocol terms used exactly as the spec defines them, crypto plumbing abstracted where the Brand Kit says so, product and tier names exact, US spelling (LFX returns "programme"; LF copy says "program").

**Messaging pillars and positioning.** Every claim traces to a pillar; the positioning statement is the same claim in every document; no derivative introduces a new promise the root did not make.

**Style-guide compliance.** Oxford comma, sentence case, numerals, dated live metrics, contractions by channel, superlatives only with a proof point in the same sentence, one idea per paragraph, reading level for the channel.

**Clarity.** The main message in the first paragraph; sentences a reader can hold (a 90-word positioning sentence fails this even if every clause is true).

## Severity

- **High** — contradicts the brand voice, carries legal or compliance risk, states something false, or undermines the positioning (a wrong entity, a wrong date in a sound bite, "the only" with a known alternative, a superlative about a member).
- **Medium** — inconsistent with the guidelines or with another document, attribution risk, or a claim without its proof point; not damaging on its own.
- **Low** — style, formatting, labels, artifacts of generation ("This Word document uses Georgia and Calibri as stand-ins").

## Always-on legal and compliance flags

Regardless of the Brand Kit, flag every instance of:

- **Unsubstantiated superlatives** — "only", "first", "largest", "most", "fastest", "the major" (implies all), "no other" — unless the proof is in the sentence.
- **Comparative claims** — cost or performance versus alternatives ("for less than most integrations cost", "clears in seconds for fractions of a cent") without a cited basis.
- **Attribution risk** — motives assigned to named organizations, roles assigned to a named member ("operates the public facilitator", "largest contributor") without their own words or a verified record; adopter stories with no confirmed adopter.
- **Regulated-industry language** — anything about compliance, regulatory exposure, custody, KYC or stablecoin treatment must be routed to Legal before use with regulated members; the document should say the protocol's scope, never the participants' obligations.
- **Testimonials** — quotes must be verbatim from a published release with name and title.
- **Copyright** — passages closely paraphrased from a third-party site or blog.

## LF-specific rules

- **Members are never competitors in copy.** Differentiate by category (open standard vs. proprietary platform), never by naming a member's product to criticize it. When a member ships a like-for-like alternative, the internal landscape names it with peer framing, and external copy drops any claim that alternative makes false.
- **Rosters for external use come from the public members page**, never from LFX exports. Internal documents may cite LFX; anything an agency or the press will see cites the site or the press release.
- **Membership list-price and revenue figures stay internal.** Strip them from any document an outside agency consumes; they are list price, not dues billed, and they are not proof points.
- **Governance language is derived, not written** (see entity-lint.md). The foundation stewards; the Series LLC holds the code and marks; The Linux Foundation hosts the fund. Board seats and votes come from the participation agreement and the published benefits, not the technical charter.
- **No transactional framing of governance.** "General buys a vote", "pay for a seat" reads as vote-buying if it leaks. Say what the published benefit says: "General members elect a representative to the Governing Board"; "Premier membership includes an appointed Governing Board seat".
- **Nonprofits are organizations, not companies.** A roster that includes foundations, associations and academic members is "organizations" in every sound bite.
- **Dates come from primary sources.** RFCs, releases, filings. A sound bite built on a date is checked twice.
- **Undated live metrics are a finding**, including inside examples of channel copy ("open with '75M transactions in 30 days'" needs the date rule applied to itself).

## Output format

```
### Summary
Overall alignment, the two biggest strengths, the two most important improvements.

### Findings
| Issue | Location (document §) | Severity | Suggestion |

### Before / after (top five by severity)
**Before:** exact current text
**After:** drop-in replacement

### Legal and compliance flags
Numbered list, each with the recommended action and who decides (Legal, Foundation ED, LF membership development).
```

## Reference: the tone spectrum, for calibrating "voice drift"

| Spectrum | One end | Other end |
|---|---|---|
| Formality | Formal, institutional | Casual, conversational |
| Authority | Expert, authoritative | Peer-level, collaborative |
| Emotion | Warm, empathetic | Direct, matter-of-fact |
| Complexity | Technical, precise | Simple, accessible |
| Energy | Bold, energetic | Calm, measured |
| Humor | Playful, witty | Serious, earnest |

The Brand Kit fixes a position on each; tone dials it by channel; a finding is a passage that moved off the fixed position without a channel reason.
