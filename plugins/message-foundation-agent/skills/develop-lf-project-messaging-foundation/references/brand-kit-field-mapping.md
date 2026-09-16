# Brand Kit → Message Foundation field mapping

The Message Foundation takes the `[Project Name] Brand Kit` (produced by the LFX Marketing OS Brand Kit Agent, skill `develop-lf-project-brand-kit`) as its primary input when one exists. This file says exactly which Brand Kit section populates which Message Foundation section, so the two documents never contradict each other and so the interview skips every question the Brand Kit already answers.

Brand Kit section numbers below follow the Brand Kit template (`brand-kit-template.md` in that plugin): Cover · How to Use This Document · 1 Project Definition · 2 Positioning · 3 Brand Personality & Voice · 4 Primary Audiences & Messaging · 5 Key Brand Strengths · 6 Competitive Differentiation & Guardrails · 7 Visual Identity · 8 Tagline Options · 9 Channel Quick Reference · Appendix A Document Architecture · Appendix B Source Intake.

## How to read the Brand Kit

Read it section by section, not as one blob. For each row below: open the named Brand Kit section, extract the field, and record it in Appendix C of the Message Foundation with the Brand Kit section number so the trace is explicit. Where the mapping says **copy**, reproduce the Brand Kit text verbatim (edit only for grammar in context). Where it says **derive**, the Brand Kit is the source but the Message Foundation adds structure or length. Where it says **not in Brand Kit**, the field must come from the interview, README, or Stat Bank.

## Mapping table

| Message Foundation section | Brand Kit source | Action | Notes |
|---|---|---|---|
| §0 Overview | Cover details table (Project, Repository, Prepared for, Date); "How to Use This Document" | derive | State that the MF is derived from the Brand Kit dated X. |
| §1 Vision | — | not in Brand Kit | Interview / charter / README. TBD if none. |
| §1 Mission | — | not in Brand Kit | Interview / charter / README. TBD if none. |
| §1 Positioning Platform | §2 Positioning Statement | derive | The Brand Kit statement is usually close to the user's one-liner; the Positioning Platform restates it as the industry role + relevance to key audiences. Must not contradict §2. |
| §1 Tagline (locked) | §8 Tagline Options (Starter Set) | derive | Ask the user which option is locked, or mark TBD and list the options as alternates. |
| §2 What it is | §1 "About [Project]" paragraph + "At a Glance" table | copy | Governance, license, repository come from the At a Glance table. |
| §2 Elevator pitch (long) | §1 About + §2 Positioning + §5 Key Brand Strengths | derive | |
| §2a Word-count derivatives | §1, §2, §5 | derive | The Brand Kit explicitly defers these to the MF ("Do not produce those derivatives here"). Boilerplate governance/license lines come from the At a Glance table. |
| §3 Voice adjectives + meaning | §3 Voice Attributes tables (We are / We are not / Sounds like / Doesn't sound like) | copy | Reference the tables; do not rewrite them. |
| §3 Compact voice summary | §3 Voice & Tone Summary (Component 5) — 4 adjectives + 2 example sentences | copy verbatim | This is the compact block downstream content agents load. |
| §3 Do / Don't, reading level, formality, superlatives, jargon | §3 Tone & Style Rules table | copy | Add the deck writing rules from the MF template §3 unless the Brand Kit's rules override them. |
| §4 Positioning Statement (For… who… unlike…) | §2 Positioning Statement + §6 differentiation set | derive | The "unlike" clause comes from §6's reference brands, phrased per §6's "differentiate without naming names" rule. |
| §5 UVP + alternates | §2, §5, §8 | derive | Tagline-style alternates may reuse §8 options not chosen as the locked tagline. |
| §6 Target Audiences | §4 Primary Audiences & Messaging table (Audience · Top Pain Points · Core Message · Sample CTA) | derive | One MF entry per Brand Kit row; add Titles/roles and Concerns/objections from the interview. |
| §6a Audience Angles & ROI | §4 + §5 | derive | Framing lines start from §4 Core Message; proof points must be Stat Bank IDs. |
| §7 Messaging Pillars | §5 Key Brand Strengths (3 bullets, each with a proof point) | derive | Strengths usually become pillars one-for-one; add a 4th/5th only if the interview supports it. Pillar tag names are new. |
| §8 Message Matrix | §2, §4, §5 | derive | New arrangement of existing content. |
| §9 Value → Support → Proof | §5 proof points | derive | Each §5 proof point becomes a Stat Bank row. |
| §10 Stat Bank | §5 proof points; §1 At a Glance facts | derive + extend | Brand Kit proof points enter as `Interview` or `Published` type with the Brand Kit cited as intermediate source; verify and add Live-LFX rows. |
| §11 Origin Story & Cases | — | not in Brand Kit | Interview + README. |
| §12 Objections & Stance | §6 Competitive Differentiation & Guardrails (tone rule: confident but fair, fact-based, not disparaging) | derive tone; content from interview | The Brand Kit's competitive-tone rule governs every rebuttal. |
| §13 Talking Points & Soundbites | §3 example sentences; §8 tagline options | derive | |
| §14 CTA Library | §4 Sample CTA column; §9 Channel Quick Reference | derive | Channel-specific CTAs come from §9. |
| §15 Naming conventions | §1 At a Glance; Cover | derive | |
| §15 Constraints / avoid | §6 Hard Constraints | copy | Every rule verbatim. |
| §15 Reference brands (borrow vs avoid) | §6 reference brand(s) + "How to Differentiate Without Naming Names" | copy | |
| §16 Next Steps | Appendix A Document Architecture | derive | Name the downstream agents. |
| Appendix A Interview Record | Appendix B Source Intake | mirror | Same table shape; the MF appendix records only the MF interview. |
| Appendix C Source Trace | (this file) | fill | One row per MF section actually derived from the Brand Kit. |

## Conflict handling

- If the Brand Kit's Appendix A (Document Architecture) or "How to Use This Document" defines the Message Foundation's scope more narrowly than this skill's template (for example, "derivatives only"), stop and ask the user which scope to produce for this run. Record the answer in Appendix A.
- If the Brand Kit's Positioning Statement and the user's interview answers diverge, show both and ask which governs; the Message Foundation must not silently pick one.
- If a Brand Kit proof point names an organization, treat it as confirmed only if the Brand Kit's Appendix B shows the user supplied it; otherwise re-confirm in the interview before citing it.
- Voice: the Brand Kit owns voice. If the user asks for a voice change during the Message Foundation interview, make the change in the Message Foundation, flag it in Appendix C as a deviation, and recommend updating the Brand Kit.

## When there is no Brand Kit

Run the five brand-discovery questions in SKILL.md Step 1c. They map onto the same Brand Kit sections (one-liner → §1/§2; primary audience → §4; three adjectives → §3; constraints → §6 Hard Constraints; reference brands → §6 differentiation set), so a later Brand Kit run can start from the Message Foundation's Appendix A. State in §0 that no Brand Kit existed and recommend producing one.
