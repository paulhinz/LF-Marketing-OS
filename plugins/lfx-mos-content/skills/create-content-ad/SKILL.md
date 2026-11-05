---
name: "create-content-ad"
description: "Create ad copy variants and a graphic for a Linux Foundation project at a common ad size or a custom size in pixels, PNG or SVG, with colors locked to the kit or open. Use for \"make an ad\", \"display or feed ad\", \"banner\"."
---

# Create content: ad

Read the shared rules first: the content-core skill. Follow its step 1 (brief, guided or your own prompt, and cancel), step 2 (sources of truth, including references and, when it exists, curated content), 2a (companions), 3 (plan), 4 (voice and the clean asset), 5 (build and accessibility), 6 (self-review), 7 (the asset and its separate metadata record), 7a (revise, edit and delete) and 9 (hygiene). This skill adds only what is specific to an ad.

## What is specific to an ad

- Several copy variants against one message and one call to action, written to the channel's character limits; no unsupported claims, because ads travel without context.
- Size: the person picks from a list of the most common ad sizes or enters a custom width and height in pixels. Do not ask them to type a channel name or a format. Common sizes to offer: 1200 x 628 (link or feed), 1080 x 1080 (square), 1080 x 1350 (vertical feed), 1080 x 1920 (story), 300 x 250, 728 x 90, 160 x 600 and 300 x 600 (display). For a custom size, re-lay out for the shape; never stretch or letterbox. A shape too narrow or too tall for a legible layout is flagged and moved to the nearest workable shape.
- Layout by shape: a band (about 3:1 or wider) is one row, with the wordmark, a one-line headline and a button; a tall narrow shape stacks the wordmark, the headline, one or two hero numbers and a button; a wide shape puts the headline left and the numbers right; a square or portrait stacks headline, numbers and a full-width button. Tiny sizes drop the numbers rather than shrink text below a readable size, and shorten the button to the URL when the full label does not fit.
- Colors: same Background, Accent #1 and Accent #2 choices, and the same locked or open rule, as an infographic (content-core, step 4a). The background motif is left out on bands and tiny sizes, and never runs behind text.
- Format and destination: same as an infographic (PNG, SVG or both; download, Canva or both). Canva follows the rules in content-core step 4a, including the reachable-address caveat and the rule not to send unpublished material without agreement.
- The infographic's design recipe (create-content-infographic) applies to the visual layer: kit fonts, one call to action, the wordmark, nothing smaller than the channel can show.

## Copy-ready brief

```
Create ad creative with the Marketing OS create-content-ad skill.

Project: [project name]
Message: [the one thing the ad says]
Audience: [who sees it]
Call to action and link: [e.g. join as a member]
Size: [pick a common ad size, or give a custom width x height in pixels]
File format: [PNG, SVG or both; or leave blank for both]
Destination: [download, Canva, or both; or leave blank for download]
Colors: [locked to the brand kit (default), or not locked; then name Background, Accent #1 and Accent #2]
Variants: [how many copy variants, e.g. 3]
Anything to avoid: [topics, partner names, claims]
Sources and references (optional): [links, uploaded files, pasted text]

Use the project's brand and positioning outputs and its website content.
No claim without a sourced number and time frame.
Return the creative clean; return status, references, colors, anything to confirm and the final size and files as a separate metadata record.
```
