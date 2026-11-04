---
name: "content-review"
description: "Review an uploaded file or Google Drive document against a project's brand and positioning outputs, plus plain accessibility checks, and return a concise tabbed report that ends by offering an updated version."
---

# Content review (Marketing OS content)

Use this when someone made a piece of content outside the Marketing OS (pitch deck, sales deck, blog post, one-pager, infographic, doc) and wants to know whether it is on brand and on message. It is the review half of the Marketing OS content plugin, and the counterpart of content-creation. Keep step 2 identical between the two.

Like the other Marketing OS skills it is stateless: it takes the content and the project's brand and positioning outputs in, and returns a review out. Storing the review, assigning it and sign-off belong to the host app.

## 1. Inputs

Supported for now:
- An uploaded file: .pptx, .docx, .pdf, .md, .html, .txt, and images or SVG for graphics such as infographics.
- A Google Drive link to a Doc, a Slide deck, or an uploaded .pptx/.docx in Drive. Read it with the Google Drive connector; for a Google Slides or Docs file, export it to .pptx or .docx and review the export.

Not supported yet: a bare web URL. If given one, say that uploads and Drive links are what the skill supports today and ask for the file. Do not scrape the page.

Always work on a copy. Never edit or overwrite the user's original or the Drive file.

Identify the project from the request, the host app's project context, or the file itself. Ask one short question only if it cannot be told.

## 2. Sources of truth: the brand and positioning outputs

The review is measured against the output of the brand and positioning plugin (lfx-mos-brand-positioning), read the same way the website plugin reads it. Do not re-derive the brand from the content under review or from memory. Do this before opening the file under review.

Use, in this order, whatever the host app or project already has:
1. Brand kit (tokens: colors, type, voice, logo rules) and the brand guidelines page or book. Read the actual guidelines, not a summary.
2. Messaging framework and message house (vision, mission, positioning, value propositions, proof points, say / avoid / anchor rules, ICPs).
3. Boilerplates (one-liner, 25, 50, 100 words), FAQ, and key numbers with their time frames.
4. Any extra project guidelines the user adds in the conversation or the project.

Rules:
- Record the approval status of each source (approved, draft, awaiting sign-off). A draft or unsigned message house is a yardstick, not law: say so in the report and word findings as "differs from the draft house".
- If a source is missing, name the brand-positioning skill that produces it (messaging-framework, boilerplates, faq, brand-kit) and review against what exists. Do not invent rules.
- Install the brand fonts locally (extract them from the guidelines if needed) before rendering. Fallback fonts cause false overflow and false "wrong font" findings.

## 2a. Companion plugins

The Marketing OS content plugin depends on three public plugins (required) and can use a fourth (optional). They sharpen the review; they never replace the sources in step 2, and a companion finding is only reported after you have checked it against the real file and the kit.

Required:
1. Design (Anthropic): accessibility-review for the accessibility tab, design-critique for visual and layout findings on decks, one-pagers and graphics, ux-writing for calls to action and short copy.
2. SEO Writers (Flexim): for blog posts and long documents, its scoped audits: audit-tone-honesty (invented voice, false confidence, production language leaking into copy), audit-paragraph-structure, audit-eeat (claims without support, invented experience or credentials; feed these into "please confirm"), audit-useful-action (does the title, opening and ending lead to the promised action and call to action), and cold-reader-review (a fresh read with no production context). Use only these audits; do not run its drafting, library-audit, CMS handoff or publishing workflow.
3. Codesign (IMG.LY): its judge skill for graphics and designs, and its layerize skill when an updated version of a flat image such as an infographic PNG has to be rebuilt as an editable design (step 8).

Optional:
4. Marketing (Anthropic): seo-audit for a search check on blog posts and web pages, and brand-review as a second read against the brand voice. Never let it override the kit or the message house.

Rules for companions:
- Check at the start which are installed. If a required one is missing, name it in the findings output under "companions_missing", say what was skipped, and review with this skill's built-in checks. Do not stop. If an optional one is missing, say nothing.
- A companion's finding that conflicts with the kit or the message house is dropped or reworded to follow them.
- Do not send unpublished material to a companion that sends data off the machine unless the person has agreed.
- Record which companion skills were used.

## 3. Read the content properly

- Decks (.pptx): extract text, notes, tables and picture alt text; render every slide to an image at about 110 dpi; unzip and inspect fonts, colors, text sizes, layouts and masters, hidden slides and speaker notes. Many wordmark and footer problems live in layouts, not on slides.
- Docs and posts: read the full text; check headings, structure and links.
- Graphics (infographics, one-pagers, ads): view at full size and at the smallest size it will be shown; read all text, including any source line; check proportions of any chart against its numbers.
- Read the whole thing before judging any part of it.

## 4. What to check

Brand and visual:
- Palette (flag off-palette colors; flag an accent used decoratively when the kit reserves it for specific states, or used beyond the share the kit allows)
- Fonts (count the families actually used; theme fonts and theme colors)
- Logo and wordmark: allowed colors for the background, no cropping or recoloring, one footer position
- Photography and imagery rules
- Headline rules (length, case), text size (10 pt minimum for anything projected)
- Consistency across slides or sections (some borrowed slides come from another deck)
- Graphics: one message, short labels, a visible source and date under every number, true proportions, nothing touching edges or other labels

Messaging:
- Vision, mission, one-liner and boilerplate wording versus the message house
- Claims have a number with a time frame beside them; numbers match the key numbers; flag stale ones
- Who pays and who benefits is clear; proof points are present
- Neutrality: do not name members, partners or competitors as the problem (members may be in the room)
- Contradictions inside the piece (one slide says one thing, another says the opposite)
- Typos, grammar, drafting notes left in, internal coaching notes that would travel with the file, production metadata (status lines, byline placeholders, source lists) left inside the asset
- For blog posts: the title and opening promise something and the piece delivers it; one clear call to action

Accessibility (keep it plain, not a compliance audit). Split into:
- In the room or on screen: contrast, text size, motion that loops forever.
- If you send the file: alt text, slide or page titles, table headers, link wording, reading order.
- Say plainly when contrast passes. Do not report automated contrast failures without checking them by eye against the real background; the known false positives are text on dark layouts and text over images.
- Call WCAG 2.2 AA the yardstick in a footnote, never a compliance claim. State what was not tested (reading order, screen reader pass).

## 5. Verify before reporting

- Every finding must be reproducible from the render or the file. If a first pass produced a wrong claim, retract it and fix the report rather than hedging.
- Re-count anything you quote (how many slides, images, fonts).
- Mark facts you cannot verify (integration claims, voting rights, partner names) as "please confirm" for the content owner, instead of asserting them.

## 6. Output

Return two things.

A structured findings list for the host app: id (M1, S1, N1), severity (must, should, minor), location, title, detail, proposed replacement text when wording changes, fix, and the sources each finding was measured against with their approval status. Add "companions_used" and "companions_missing".

A single shareable artifact page, kept short because readers are busy and many read on a phone:
- White background, black text, one restrained accent color from the brand. No dot or half-circle legends.
- Header: who it is for, who it is from, what it was reviewed against (with source status), and a one-line verdict (for example "Approve with changes") with two or three sentences.
- Tabs, not a long scroll or accordions: Must fix, Should fix, Minor, Messaging, Accessibility, Next steps. Sticky tab bar, 44 px touch targets, a Next button at the end of each panel, hash links so a tab can be linked directly, no horizontal scroll at phone width.
- Each finding: an ID, the slide or section, a plain-language title, one short paragraph, the exact proposed replacement text in a box where wording changes, a one-line Fix, and small thumbnails of the affected slides.
- Messaging tab: a compact table of what the piece says, what the message house says, and a proposed line.
- Next steps: three items at most, the last being the call to action below.
- Tell the user the page is shared with their organization and to check Share before sending it to the content owner. Do not paste the URL if the app shows a card.

## 7. Call to action: offer the updated version

End both the report (last item under Next steps) and the chat reply with one clear question:

"Would you like us to provide an updated version?"

Do not build the corrected copy until the user says yes. If they ask for something narrower (only the Must fix items, or only the accessibility fixes), do that.

## 8. When they say yes: produce the updated version

Keep the original template.

1. Edit a copy of the original file in its own format; do not rebuild from scratch. For a Google file, deliver the corrected export (.pptx or .docx) and say the Drive original is untouched; create a new Drive file only if the user asks for that. For a flat graphic (PNG or JPEG), rebuild it as an editable design with Codesign's layerize skill when installed, otherwise redraw it as an SVG from the same content, keeping the layout.
2. Apply the Must fix and Should fix items. Where something cannot be fixed without a missing asset or answer (real logos, a brand-approved photo, a number to confirm), leave it and list it as still needing the owner.
3. Move internal speaker notes and any production metadata into a separate internal notes file and strip them from the shared file; delete hidden blank slides.
4. Set theme fonts and theme colors to the brand's, then clear stray overrides.
5. Fix accessibility basics: a real title on every slide or page (off-slide title for image-only slides), alt text, header row on tables, https links, a static image instead of a looping animation.
6. Render every slide or page again and look at them. Check overlaps, text that no longer fits, footer collisions, and that nothing is under the minimum size. Run the format validator.
7. Deliver the updated file plus the internal notes file, and end with a short list of what still needs the owner.

## 9. Output hygiene

- Match the user's level of detail; lead with the verdict.
- Never present a draft message house as signed off.
- Never include real names, numbers or quotes that are not in the sources or the reviewed file.