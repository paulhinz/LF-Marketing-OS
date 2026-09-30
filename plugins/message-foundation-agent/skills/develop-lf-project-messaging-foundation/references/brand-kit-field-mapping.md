# Brand Kit → Message Foundation field mapping

The Message Foundation takes the `[Project Name] Brand Kit` (produced by the LFX Marketing OS Brand Kit Agent, skill `develop-lf-project-brand-kit`) as its primary input when one exists. This file says exactly which Brand Kit section populates which Message Foundation section, so the two documents never contradict each other and so the interview skips every question the Brand Kit already answers.

Brand Kit section numbers below follow the Brand Kit template (`brand-kit-template.md` in that plugin): Cover · Review Sheet · How to Use This Document · 1 Project Definition · 2 Positioning · 3 Voice & Language · 4 Primary Audiences (names and lead-with cue only) · 5 Key Brand Strengths · 6 Competitive Differentiation & Guardrails · 7 Visual Identity · 8 Tagline Options · (9 Channel Quick Reference — retired in v0.4) · Appendix A Document Architecture · Appendix B Source Intake · Appendix C LFX Project Record & Research Sweep.

## How to read the Brand Kit

Read it section by section, not as one blob. For each row below: open the named Brand Kit section, extract the field, and record it in Appendix C of the Message Foundation with the Brand Kit section number so the trace is explicit. Where the mapping says **copy**, reproduce the Brand Kit text verbatim (edit only for grammar in context). Where it says **derive**, the Brand Kit is the source but the Message Foundation adds structure or length. Where it says **not in Brand Kit**, the field must come from the interview, README, or Stat Bank.

## Mapping table

Message Foundation section numbers follow `references/message-foundation-template.md` v0.3; Brand Kit section numbers follow `brand-kit-template.md` v0.4. A field the requester's own document supplies takes precedence over the Brand Kit for wording (`input-doc-mapping.md` §2) and is labeled `From your doc`; the Brand Kit still supplies governance, trademark and colors.

| Message Foundation section | Brand Kit source | Action | Notes |
|---|---|---|---|
| Review Sheet, Source column | Brand Kit Review Sheet and Appendix B labels | derive | Carry the Brand Kit's own provenance labels through; a field the Brand Kit took `From your doc` stays `From your doc` here. |
| How to Use (cover details, status) | Cover details table; "How to Use This Document" | derive | State that the MF is derived from the Brand Kit dated X and the supplied documents named in Appendix A. |
| §1 Vision, §1 Mission | — | not in Brand Kit | Supplied document / interview / charter / README. TBD if none. |
| §1 Positioning Platform | §2 Positioning Statement | derive | Must not contradict §2 or a supplied positioning statement. ≤40 words unless it is the requester's own wording (flag). |
| §1 Tagline (locked) | §8 Tagline Options (recommendation per surface) | derive | The locked choice, or "TBD — none locked (alternates in Brand Kit §8)". |
| §2, §3, §9 governance and trademark sentences | Appendix C LFX Project Record (Brand Kit 0.2.0+) | copy verbatim | The one place these are derived from the LFX record and the charter. If the Brand Kit has no Appendix C or disagrees with LFX, derive from LFX yourself (SKILL.md Step 0b) and log the conflict for Legal. Never "[Project] Foundation, a Series of LF Projects, LLC". |
| §2 What it is | §1 "About [Project]" + At a Glance table | copy | Description, license, repository from At a Glance; governance from Appendix C. |
| §3 Copy primitives (25 / 50 / boilerplate / elevator / llms.txt) | §1, §2, §5 | derive | The Brand Kit defers these to the MF. A supplied document's graded boilerplates are quoted verbatim in the slots they fit. |
| §4 Voice | §3 Voice Attributes table, Prefer / Avoid table, What we don't claim | reference, do not copy | Name the attributes and point to Brand Kit §3; the MF adds only the deck writing rules. |
| §5 Messaging Pillars | §5 Key Brand Strengths (each with a proof point); §4 Primary Audiences ("lead with" cues) | derive | Strengths usually seed pillars one-for-one on the three-part scaffold; a supplied document's narratives are quoted verbatim instead. Tag names are new. |
| §6 Message Matrix | §5 pillars only | derive | A view of §5; no new content. |
| §7 Proof Points, Appendix B Stat Bank | §5 proof points; §1 At a Glance facts; Appendix C timeline | derive + extend | Brand Kit proof points enter as `Interview` or `Published` with the Brand Kit cited as intermediate source; verify and add Live-LFX rows; only sourced rows. |
| §8 Objections | §6 Competitive Differentiation & Guardrails (tone rule: confident but fair; members are peers) | derive tone; content from interview or supplied document | The Brand Kit's competitive-tone rule governs every rebuttal. |
| §8 What we don't claim | §3 What we don't claim | copy verbatim, then extend | Add messaging-specific limits only. |
| §9 Origin story, one case | Appendix C timeline and "Found beyond the brief" | derive | Dates come from the timeline, not LFX formation dates. |
| §9 CTA anchors | §6 (working groups from Appendix C) | derive | Four lines; named tiers, groups or events only when confirmed. |
| §9 Terminology & constraints | §1 At a Glance; §3 Prefer / Avoid; §6 Hard Constraints | reference | One line each pointing to the Brand Kit; repeat only the governance and trademark sentences. |
| §9 Next steps | Appendix A Document Architecture | derive | Name the downstream agents. |

Retired in v0.3 and no longer mapped: target-audience tables and audience angles (now the ICP document's personas), the UVP alternates, talking points and sound bites, the tiered CTA library, and the channel quick reference (removed from the Brand Kit in v0.4).

## Conflict handling

- If the Brand Kit's Appendix A (Document Architecture) or "How to Use This Document" defines the Message Foundation's scope more narrowly than this skill's template (for example, "derivatives only"), stop and ask the user which scope to produce for this run. Record the answer in Appendix A.
- If the Brand Kit's Positioning Statement and the user's interview answers diverge, show both and ask which governs; the Message Foundation must not silently pick one.
- If a Brand Kit proof point names an organization, treat it as confirmed only if the Brand Kit's Appendix B shows the user supplied it; otherwise re-confirm in the interview before citing it.
- Voice: the Brand Kit owns voice. If the user asks for a voice change during the Message Foundation interview, make the change in the Message Foundation, flag it in Appendix C as a deviation, and recommend updating the Brand Kit.
- Governance: LFX owns governance. If the Brand Kit, the interview and the LFX project record disagree about the legal entity, the foundation, or who holds the marks, the LFX record and the charter govern; record the other versions as conflicts for LF Legal and do not lock the boilerplate until Legal has answered.

## When there is no Brand Kit

Run the five brand-discovery questions in SKILL.md Step 1c (only those the supplied documents, if any, do not answer). They map onto the same Brand Kit sections (one-liner → §1/§2; primary audience → §4; three adjectives → §3; constraints → §6 Hard Constraints; reference brands → §6 differentiation set), so a later Brand Kit run can start from the Message Foundation's Appendix A and the shared `[project-slug].inputs.yaml`. State in the How to Use block that no Brand Kit existed and recommend producing one.
