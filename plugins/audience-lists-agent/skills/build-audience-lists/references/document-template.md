# Audience Lists document template

Built with `lf-output-formatter` (`build_doc.py` on the LF Agent DOCS template, `--brand brand.json`). Section numbers are written into the heading text. Portrait only: keep tables to four or five columns.

## Front matter

```
---
project_name: [Project]
document_type: Audience Lists
document_status: DRAFT v1 — for marketing committee review
other_details: Agency-safe            # or Internal
platform: LFX Marketing OS
agent_source: Audience Lists Agent
date: [Month D, YYYY]
subtitle: Earned media targets, social media voices, and existing LF audiences for [project]
details:
  - Repository=[repo URL]
  - Source Brand Kit=[file, version, date]
  - Source Message Foundation=[file, version, date]
  - Source ICP=[file, version, date]
  - Social listening=[Octolens workspaces and LFX Lens, read on date]
  - Audiences=[LFX, HubSpot portal id, Segment, read on date]
  - Prepared for=[ED name, Executive Director, and the marketing committee]
cover: true
---
```

`brand.json`: project_name; logo.light (PNG converted from the Brand Kit logo); palette primary, secondary, accent, neutral_dark, neutral_light from Component 2; fonts heading and body from Component 3; iconography note from Component 4.

## Body structure

```
# How to use this document            (what each section is, Stat Bank ID convention, "(manual)" convention, nothing has been sent)
# Executive summary                   (conversation scale with dates; priority logic; closest audiences; the 3-4 actions before use)

# 1. Earned Media Target List
## 1.1 How the list was built         (tiers source, persona trusted sources, prior coverage, priority logic, Brand Kit rules applied)
## 1.2 News hooks available in the next two quarters      | Hook | Timing | Tiers it serves | Stat Bank |
## 1.3 Priority 1: [group] (slide 12 Tier N)   why-first paragraph, then | Outlet | Fit | Strategy | Lead message and proof |
## 1.4 Priority 2 ...
## 1.5 Priority 3 ...
## 1.6 Priority 4 ...
## 1.7 Priority 5 ...
## 1.8 Earned media list: open items  (bullets; named reporters manual; missing hooks; legal approvals; analyst list)

<<<PAGEBREAK>>>
# 2. Social Media Voices
## 2.1 How the list was built         (sources, keyword status, ranking factors, exclusions, scale metrics with dates)
## 2.2 Relationship tiers             (A, B, C definitions; support and incentives; boundaries)
## 2.3 Top [5-15] voices              | # | Voice | Reach and activity | Why they matter | Tier and next action |
                                      then "Also notable" paragraph
## 2.4 Official and ecosystem accounts (reference, not relationship targets)   (prose; handle decisions to make)
## 2.5 Social voices: open items

<<<PAGEBREAK>>>
# 3. Existing Audiences in LF Systems
## 3.1 How the list was built         (foundations chosen, systems read, dates, portal caveat, project's own audiences baseline)
## 3.2 Recommended existing audiences ([n] lists, n < 20)   | # | Audience and owner | Size and system | Overlap and persona | Overlapping message and CTA |
## 3.3 Audiences considered and held back
## 3.4 How to use these lists         (governance of Groups.io lists; event pools; member lists)
## 3.5 Existing audiences: data gaps and open items

<<<PAGEBREAK>>>
# Appendix A. Methodology and provenance   | Source | What was read | Date read | Notes |
# Appendix B. Accounts excluded from the social ranking
# Appendix C. Trademark and governance lines   (governance sentence and trademark sentence as blockquotes; LF trademark line)
```

## Writing rules

- Plain style: simple words, complete sentences, no dashes as punctuation, no filler.
- Every number has a date and a source (Stat Bank ID, connector read date, or listening window).
- Messages are quoted from the Message Foundation (pillar key messages, value messages, sound bites, objection stances, CTA IDs); do not write new taglines.
- Brand Kit rules apply to every sentence: casing of the project name, member counting noun, no competitor criticism, no superlatives without proof, no member name beside a comparative claim.
- "(manual)" marks every decision a human must make; collect them in the open items subsections.
- Nothing in the document claims an action was taken; it is a plan.

## File names

`[Project] Audience Lists [Mon YYYY].docx` and `[Project] Audience Lists [Mon YYYY] (Drive upload).docx` (`--strip-fonts`). Keep `brand.json`, the logo PNG, the Markdown source, and the research extracts in a `work/` folder next to the output.
