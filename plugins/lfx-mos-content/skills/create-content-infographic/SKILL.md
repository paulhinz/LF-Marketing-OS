---
name: "create-content-infographic"
description: "Create an infographic (process, key numbers, comparison or structure) for a Linux Foundation project from its brand kit and key numbers: your size in pixels, PNG or SVG, download or Canva, colors locked to the kit or open."
---

# Create content: infographic

Read the shared rules first: the content-core skill. Follow its step 1 (brief, guided or your own prompt, and cancel), step 2 (sources of truth, including references and, when it exists, curated content), 2a (companions), 3 (plan), 4 (voice and the clean asset), 5 (build and accessibility), 6 (self-review), 7 (the asset and its separate metadata record), 7a (revise, edit and delete) and 9 (hygiene). This skill adds only what is specific to an infographic.

## What is specific to an infographic

Colors (locked to the kit or open), output size, format and destination are shared with the ad and live in content-core, step 4a. The rest is below.

An infographic explains one thing at a glance. It must not look like a slide: no title bar over a row of equal cards, and no grid of filled boxes. Pick the type from the content, not the other way round:
- Process or flow (how something works): a sequence or flow diagram that shows the real mechanism, such as a client and server exchange, with numbered steps and arrows that run one way.
- Numbers or proof (where it stands): three to five key numbers at very large size, each with a label, a time frame and a source.
- Comparison (before and after, option A and B): two columns on the same rows.
- Structure (how the parts fit, who does what): a simple diagram with labelled boxes.

## The design recipe

Polish comes from a few decisions made together, not from decoration. Use this recipe as the default for every infographic, and take every value (colors, fonts, wordmark, corner radius) from the project's kit, never from memory or from another project.

1. Canvas. Dark by default: the kit's darkest color, full bleed. A light version on the kit's lightest color is supported by the Background choice. Draw on a fixed design canvas (for example 1080 x 1350 vertical, 1200 x 630 wide) with a viewBox, and re-lay out for other shapes.
2. Scale contrast. One huge display headline in the kit's headline typeface (about 100 px on a 1080 px wide canvas, three lines at most, sentence case, under ten words), set tight. Everything else is small and quiet by comparison. The headline is the message house sound bite or the one-line point.
3. Hero numbers. For a numbers graphic, each number is set very large in the headline typeface (about 120 px on a 1080 px canvas) in Accent #1, with a short bold label (about 32 px) and one caption line with its time frame (about 22 px) in the lightest neutral. Numbers on the left, label and caption in a second column at a fixed x, so the numbers form a clean column.
4. Rules, not boxes. Separate rows and sections with 1 px hairlines in Accent #1 at low opacity (about 35%) or, when Accent #1 is neutral, in a neutral from the kit. Do not wrap content in filled rounded panels; flat grey boxes on black are what make a graphic look flat. A filled shape is reserved for the one call to action and for any state the kit names.
5. A custom digital background element. Add one subtle, purpose-built background motif that comes from the story, not from stock imagery. For a payment or request-and-response protocol, for example, draw circuit-like traces (orthogonal lines with 45 degree bends) that run in from an edge and end in small ring nodes, with a few small filled "packet" blocks sitting on the lines. Build it from three layers, all faded out toward the text and the bottom of the canvas: a soft radial glow (up to about 20% opacity), a barely visible dot grid (about 16% opacity, 36 px pitch), and the traces (about 38% opacity, 2 px stroke). With a colored Accent #1 the motif uses it, and the packets use Accent #2 when set. With a neutral Accent #1 (white, grey, black) the motif is neutral, the glow is dropped, the dot grid is fainter (about 8%), the traces are about 18 to 20%, and the one small Accent #2 mark replaces the packets. Keep it in one corner or band, never behind text, and mark it aria-hidden. It should be felt rather than read: if a viewer notices it before the headline, it is too strong. Other stories get their own motif (a network of nodes for a community, stacked layers for an architecture); do not reuse a motif that does not fit.
6. One call to action as a full-width, button-shaped bar in Accent #1, with black or white text chosen for contrast and the kit's corner radius, and the project's wordmark top left in the color the kit allows for the background.
7. Spacing. Margins of about 6% of the width; evenly spaced rows (about 160 px pitch on a 1080 x 1350 canvas); the headline block, the rows, the call to action and the source line each clearly separated. Leave breathing room; do not fill every gap.
8. Source line. A short visible line of sources and date at the foot, in the lightest neutral (the darkest on a light background), about 16 to 17 px on a 1080 px canvas, never smaller.

Process type (same recipe, different middle):
- Headline: the sound bite broken into very large short lines (for example three one-word lines), set in the headline typeface. Two lifelines (for example CLIENT and SERVER) as dashed hairlines in Accent #1 at low opacity, labelled in small spaced capitals.
- Four steps at most, each a numbered ring, a one-way arrow between the lifelines, a short bold label above the arrow and one caption line below it. Spread the steps evenly so each label and caption sit closer to their own arrow than to the next.
- The final step, the success moment, uses a pill in Accent #2 (or Accent #1 when there is no Accent #2) with black or white text for contrast.
- Portrait canvases stack headline above diagram; wide canvases put the headline left and the diagram right. Below about 1.1 aspect (height over width) use the wide layout. Clamp aspect ratios to roughly 0.45 to 2, and say so when a requested shape is moved.

## Rules

- One message. A headline of under ten words in sentence case that states the point, then at most five blocks. If it needs more, make two graphics.
- Words are short: a label of a few words and one line of explanation at most per block. Do not paste paragraphs into the graphic.
- Every number comes from the key numbers or a dated source, shows its time frame, and has a visible source and date line. Do not round up, estimate or invent. Do not draw a chart from numbers you cannot source; if a value is missing, leave a bracketed placeholder and list it in the metadata.
- Draw charts and diagrams from the real values (hand-built SVG from the data), so bar lengths and proportions are true. Start bars at zero. Label values directly rather than relying on a legend.
- Use the kit's fonts, logo and wordmark rules. Do not recolor or stretch the logo. Do not use stock illustration or a recognisable character or brand figure. Icons and shapes are simple and from one set.
- If the wordmark file has an opaque background, make a transparent version first (for a white-on-dark version, derive the alpha from the inverted luminance) rather than placing a white rectangle.
- Keep text clear of the edges and of each other: check that nothing touches a line, a panel edge or another label, that large numerals do not touch the rules above or below them, and that each label sits closer to its own arrow or block than to the next one.
- Accessibility: text at a size readable at the smallest place it will be shown (nothing under about 14 px equivalent on a 1200 px wide graphic); contrast that passes against the real background; never carry meaning by color alone (add labels or shapes); reading order top to bottom, left to right. Write alt text (one or two sentences giving the point) and a long description (the full content as text, or a small data table) and put both in the metadata, so the host can place them on the page. In the SVG, also include a title and a description, and mark the background motif aria-hidden.

## Building it

- Default: hand-build one SVG master from the data and kit tokens, and render the PNG from it (for example with a headless browser). This keeps the numbers true and needs no extra plugin. Write the layout as a script with the content as data, the three colors, the headline and the button label as parameters and the recipe values as constants, so another size, type, color set, headline or a light version is a parameter change and a live preview can be drawn from the same master.
- Use Codesign instead when the person wants an editable design file, a print PDF, or the same graphic in several sizes. Load the kit into it first, build with its create skill, use formats and resize for sizes, and finish with its judge skill. For a flat image that has to become editable, use its layerize skill.
- Run Design's design-critique on the result as the fresh-eyes review.
- Look at the render before judging it. Typical faults to fix: text colliding with the background motif, numerals touching rules, an unexplained gap, a caption closer to the next block than to its own.

## Copy-ready brief

```
Create an infographic with the Marketing OS create-content-infographic skill.

Project: [project name]
What it should explain: [one message, e.g. how it works, where it stands, A vs B]
Type (optional): [process, key numbers, comparison, structure; or leave blank to choose]
Audience: [who sees it, e.g. developers, members, press]
Goal: [what the viewer should understand or do afterwards]
Where it will be used: [blog header, social share, print, slide]
Output size in pixels: [pick a common size or give width x height; or leave blank for 1200 x 630]
File format: [PNG, SVG or both; or leave blank for both]
Destination: [download, Canva, or both; or leave blank for download]
Colors: [locked to the brand kit (default), or not locked; then name Background, Accent #1 and Accent #2. Colors outside the kit go beyond it and need brand-owner approval]
Call to action and link: [e.g. join as a member, read the docs]
Numbers or facts to include: [with a source and date for each; or leave blank to use the key numbers]
Anything to avoid: [topics, partner names, claims]
Sources and references (optional): [links, uploaded files, pasted text]

Use the project's brand and positioning outputs (colors, fonts, logo rules) and its website content.
Give me a one-screen plan first (headline, blocks, type, colors), then the graphic.
Show a source and date under every number on the graphic.
Return alt text, a long description, the data table, the colors, anything to confirm, any brand exception and the final size and files as a separate metadata record, not on the graphic.
```
