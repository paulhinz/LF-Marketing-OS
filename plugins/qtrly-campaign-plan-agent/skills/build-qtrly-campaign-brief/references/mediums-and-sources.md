# Mediums and Sources — the LFX Marketing OS channel map

Source: "Campaign Channels & Lead Sources" and "Common Tools" slides, LFX Marketing OS definitions deck.

The campaign flow is **Goals → Campaigns → Channels**. A channel has two levels:

- **Medium** (also called "channel type"): the broad category a campaign executes within. There are five: Social, Direct Message, Email, Web, Paid.
- **Source** (also called "channel" or "lead source"): the specific property or placement inside a medium that a contact actually touches and that feeds contacts into the customer journey. A source is where an ICP contact's first visit is captured and enriched.

Every campaign in the brief names its mediums, and under each medium the specific sources. The per-source entry is the unit that content creators and source-execution leads work from, so keep the source names exactly as below — they are the names the channel registry, dashboards ("Channel Type" and "Channel" filters), and downstream agents use.

## The catalog

| Medium | Source | What it is | Typical tactics | Typical assets | Typical CTAs | Execution tool | Measured by |
|---|---|---|---|---|---|---|---|
| **Social** | LinkedIn | Project/foundation page + leader/ambassador personal posts | post series, carousel, event countdown, speaker cards, ambassador amplification | post copy, social cards, short video/clips, carousel PDF | Register, Read, Follow, Join Slack, Watch | Sprout Social (publish), LFX Social Listening / Octolens (listen) | engagement rate, link clicks, follower growth, mentions |
| Social | X / Bluesky / Mastodon | Short-form, developer-heavy conversation | threads, live-event posting, reply engagement | post copy, cards, clips | Read, Register, Star repo | Sprout Social | engagement, link clicks |
| Social | Meta (Facebook / Instagram) / WeChat | Consumer-leaning reach; WeChat for China-region audiences | event promotion, community stories | image posts, short video | Register, Learn more | Sprout Social / regional partner | reach, clicks |
| Social | Reddit | Subreddit participation (organic) | AMA, release announcements, answer threads | long-form post copy, AMA prep | Read, Try it, Join | manual / community team | upvotes, comments, referrals |
| Social | YouTube / Medium / Overstack (name as it appears on the channel-map slide) | Long-form owned publishing | talk recordings, tutorials, explainer articles | video, article | Subscribe, Watch, Enroll | YouTube Studio, Medium | views, watch time, referrals |
| Social | Slack / Discord (community channels) | Project community workspaces | announcements in #general/#events, pinned posts, channel takeovers | announcement copy, pinned resource | Register, Vote, Join WG | Slack / Discord (manual or bot) | reactions, clicks, joins |
| **Direct Message** | Social DM | 1:1 outreach on LinkedIn/X to named contacts | ABM outreach to target-list contacts, speaker/sponsor invites | DM templates by persona, follow-up sequence | Book a call, Reply, Apply | LinkedIn Sales Navigator / manual | reply rate, meetings booked |
| Direct Message | Slack / Discord DM | 1:1 in community workspaces | maintainer/ambassador asks, hand-raiser follow-up | DM templates | Reply, Sign up | manual | reply rate |
| **Email** | Newsletter | Recurring owned send to subscribers | feature slot, banner, editorial mention across N issues | newsletter blurb, banner image, link | Read, Register, Enroll | HubSpot (or Beehiiv for LF Media newsletters) | open rate, CTR, conversions |
| Email | Email: Invite | Dedicated send announcing an event, course, program, or membership offer | segmented invite by persona/tier, sponsor prospectus send | email copy + subject lines, header image, landing page | Register, Apply, Download prospectus | HubSpot marketing email + segments | open, CTR, conversion, unsubscribes |
| Email | Email: Reminder | Follow-up sends to non-converters and converters | deadline reminders, early-bird expiry, "you registered — share it", post-event survey | reminder copy variants, calendar file | Register now, Complete checkout, Take survey | HubSpot workflows / tasks | conversion lift, list health |
| **Web** | Pages | Standing website pages (project site, foundation site) | update homepage hero, add event/edu module, members page | page copy, hero image | Learn more, Join, Register | WordPress / Hugo / Netlify (project site), HubSpot CMS | sessions, time on page, clicks |
| Web | Blogs | Blog posts on project/foundation/LF blog | announcement post, case study, contributor spotlight, "state of X" | blog post, images, pull quotes | Read more, Try it, Register | HubSpot blog / project site | traffic by narrative tag, referrals |
| Web | Landing Page | Purpose-built conversion page for one campaign | one page per offer/persona, UTM-tagged | LP copy, hero, form or button, proof points | the campaign's primary CTA | HubSpot landing pages | conversion rate, form fills |
| Web | CTAs | Site-wide or embedded call-to-action buttons/blocks | CTA blocks in blog posts and pages pointing to the LP | CTA copy + button design | primary CTA | HubSpot CTAs | click-through, attributed conversions |
| Web | Banners | Site banners (top bar, sidebar, hero takeover) on LF and project properties | time-boxed banner on high-traffic pages | banner creative in required sizes | Register, Enroll | web team / HubSpot | impressions, clicks |
| **Paid** | Paid Social | Sponsored posts / lead-gen ads on LinkedIn, X, Reddit, Meta | persona-targeted ads, retargeting audiences from Segment | ad copy variants, creative sizes, LP | Register, Download, Learn more | LinkedIn Campaign Manager, Reddit Ads, X Ads | CTR, CPC, cost per registration/lead, ROAS |
| Paid | Adwords / Google Ads | Search and display | branded + category keywords, event name terms | ad copy, keyword list, LP | Register, Enroll | Google Ads | CTR, CPC, conversions, ROAS |
| Paid | Retargeting | Re-reach site visitors / list matches | pixel-based and list-based audiences | display/social creative | Come back and register | Segment audiences → Google/LinkedIn/Reddit/Meta | conversions, frequency |
| Paid | 3rd-party ads | Placements on partner/industry media sites | sponsored placements around the event/topic | banner/native creative | Register, Learn more | partner media | clicks, conversions |
| Paid | 3rd-party newsletters | Sponsored slots in industry newsletters | sponsored blurb near event/launch | blurb copy, image | Register, Read | partner newsletter | clicks, conversions |
| Paid | Affiliate | Partner/affiliate promotion with tracked links | affiliate codes for training, partner cross-promo | affiliate kit (copy, links, creative) | Enroll with code | affiliate platform / partner | attributed conversions |

## Rules for using the catalog

1. **Pick sources the project actually has.** Before proposing a source, confirm the project (or LF) owns or can access it: a newsletter with subscribers, a LinkedIn page, a Slack workspace, a HubSpot list, a paid budget line. A source with no property behind it is a setup task, not a channel — list it under execution setup with an owner, and do not count on it for this quarter's KPI unless the setup date is early in the quarter.
2. **Match sources to the campaign's journey stage.** General awareness (contacts we do not have) leans on Paid, Social, Web pages and blogs, 3rd-party placements. Targeted awareness and Nurture (contacts we have) lean on Email, Newsletter, Direct Message, Slack/Discord, Retargeting. Accepted/closed-won (registrants, members, students) uses Email: Reminder, Newsletter, community channels. See `campaign-design-guide.md`.
3. **Every source entry needs the full field set** — the 13 rows specified in `brief-template.md` §4.n.4 (target market, ICP/persona, journey stage, key messages, assets to create, CTAs, tactics and cadence, owner and tool, tracking, creation agent, execution agent, paid budget, notes). A source row missing any of these cannot be handed to a creation or execution agent.
4. **Tracking is part of the source definition.** Each source gets a UTM convention (`utm_campaign=<campaign ID>`, `utm_medium=<medium>`, `utm_source=<source>`) and, where HubSpot is used, the HubSpot campaign the assets attach to. Without this, the Campaign Performance dashboard cannot attribute results by Campaign Type × Channel Type.
5. **Shared resources conflict across projects.** Email/contact lists, web banners on LF properties, the event calendar, advertising and content budgets, and headcount are full-conflict resources per the LFX Marketing OS resource-conflict note. Flag every use of a shared LF property (LF newsletter slot, linuxfoundation.org banner, LF social accounts) in the brief's conflicts section so the CFT can coordinate with other projects.
6. **Assets are project-branded.** All assets inherit the Brand Kit (logo, palette, type, imagery, voice) and use Message Foundation boilerplate and pillars. The brief points to these documents rather than restating them, but the per-source key messages must be specific enough that a creation agent can draft without re-deriving positioning.
