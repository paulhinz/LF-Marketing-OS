# Marketing OS content plugin (lfx-mos-content)

Create and review marketing content for a Linux Foundation project. It is the content half of the Marketing OS, and it reads the outputs of the brand and positioning plugin (lfx-mos-brand-positioning): brand kit, messaging framework and message house, boilerplates, FAQ and key numbers.

## What is in it

| Skill | What it does |
| --- | --- |
| create-content | Router. Asks which kind of asset and hands off to the matching skill below. |
| create-content-blog | Blog post. SEO Writers audits, two alternative titles and a meta description kept in the record. |
| create-content-one-pager | One page: message house, 50-word boilerplate, proof, call to action. |
| create-content-infographic | Process, key numbers, comparison or structure graphic. Your size in pixels, PNG or SVG, download or Canva, colors locked to the kit or open. |
| create-content-pitch-deck | Pitch or sales deck on the project's presentation template. Speaker notes kept out of the shared file. |
| create-content-ad | Copy variants and a graphic at a common ad size or your own. |
| create-content-doc | Doc or any other asset that is not one of the above. |
| content-core | Shared rules, loaded by every create-content skill (not run on its own): brief, sources of truth, companions, voice, clean asset, image colors, metadata record, revise, edit, versions and delete. |
| content-review | Reviews an uploaded file or a Google Drive document against the brand and positioning outputs plus plain accessibility checks, returns a tabbed report, and offers an updated copy. |

The creation skills and content-review each return two separate things: the clean asset, and a metadata record (status, sources, references, colors, brand exceptions, things to confirm, versions). Storage, review assignment, the dashboard and sign-off belong to the host app.

## Install these first

Required companion plugins (the skills use them and fall back to built-in checks, recording what was skipped under `companions_missing`, if one is missing):

1. **Design** (Anthropic): accessibility-review, design-critique, ux-writing.
2. **Codesign** (IMG.LY): editable design files, print PDF, many sizes, brand application.
3. **SEO Writers** (Flexim): the scoped audits for blog posts and long documents. Its drafting, library, CMS and publishing workflows are not used.

Also needed: **lfx-mos-brand-positioning**, which produces the sources of truth. If a source is missing the skill says which brand skill to run.

Optional:
- **Marketing** (Anthropic): seo-audit, brand-review, and its Ahrefs connector for choosing blog topics.
- **Canva connector** (a connected app, not a plugin): only for the Canva destination of an infographic or ad. Canva imports from a web address, so the host must give the exported file one.

## Coming later

A separate content-curation plugin (not built yet) will let people pick pre-curated articles and posts from the web as sources. The create-content skills already treat selected curated items as references and do nothing if the plugin is not installed.

## Rules the skills follow

- The brand kit and message house win over any companion's suggestion.
- Unpublished material, and the contents of a person's references, are never sent to a companion or to Canva without agreement.
- Colors are locked to the kit by default. Unlocking is allowed, and any color outside the kit is recorded as a brand exception, marks the asset draft and asks the brand owners to approve it.
- The asset stays clean: no status, byline, sources, confirm lists or change log inside it.
- Every saved change re-runs the checks. Deleting never touches downloaded files, a Canva design or a published copy.

## Version

0.2.0. The content-creation skill is split into one skill per asset plus a shared core; content-review is unchanged. No demo or sample data ships in the plugin: every fact, number, color and name is read from the project's own sources at run time.
