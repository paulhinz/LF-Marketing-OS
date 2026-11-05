---
name: "create-content"
description: "Router for creating new marketing content for a Linux Foundation project. Use when the person wants to make content (blog, one-pager, infographic, pitch deck, ad, doc) and has not named the type; it hands off to the matching create-content skill."
---

# Create content (router)

Use this when someone wants to make new marketing content for a Linux Foundation project and has not said which kind. It picks the right asset skill and hands the request to it. It does no writing itself.

Pick by what the person asked for:

| They want | Run |
|---|---|
| Blog post, article, announcement post | create-content-blog |
| One-pager, one-sheet, leave-behind page | create-content-one-pager |
| Infographic, process or numbers graphic | create-content-infographic |
| Pitch deck, sales deck, slides | create-content-pitch-deck |
| Ad, banner, display or feed creative | create-content-ad |
| Doc, FAQ page, datasheet, press release draft, any other asset | create-content-doc |

Rules:
- If the request names a type, go straight to that skill. If it could be two (for example "something to hand out at the booth"), ask one short question with the options above.
- Social media posts are a separate skill. Say so and offer the nearest non-social asset.
- Every asset skill follows the shared rules in content-core. Do not copy them here.
- To review a file someone already made, use content-review instead.
- To revise, edit or delete something already made, run the asset's own skill: it applies content-core step 7a.
