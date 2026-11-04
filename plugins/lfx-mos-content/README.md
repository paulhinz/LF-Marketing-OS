# Marketing OS content plugin (lfx-mos-content)

Create and review marketing content for a Linux Foundation project. It is the content half of the Marketing OS, and it reads the outputs of the brand and positioning plugin (lfx-mos-brand-positioning): brand kit, messaging framework and message house, boilerplates, FAQ and key numbers.

## What is in it

| Skill | What it does |
| --- | --- |
| content-creation | Makes a new pitch or sales deck, blog post, one-pager, infographic, ad, doc or other asset (not social). Guided brief or your own prompt, optional references, plan first, then the asset. Images get a locked or open color choice, a size, a format and a destination (download, Canva or both). After hand-off it supports revising, direct edits, versions and delete. |
| content-review | Reviews an uploaded file or a Google Drive document against the brand and positioning outputs plus plain accessibility checks, returns a tabbed report, and offers an updated copy. |

Both skills return two separate things: the clean asset, and a metadata record (status, sources, references, colors, brand exceptions, things to confirm, versions). Storage, review assignment, the dashboard and sign-off belong to the host app.

## Install these first

Required companion plugins (the skills use them and fall back to built-in checks, recording what was skipped under `companions_missing`, if one is missing):

1. **Design** (Anthropic): accessibility-review, design-critique, ux-writing.
2. **Codesign** (IMG.LY): editable design files, print PDF, many sizes, brand application.
3. **SEO Writers** (Flexim): the scoped audits for blog posts and long documents. Its drafting, library, CMS and publishing workflows are not used.

Also needed: **lfx-mos-brand-positioning**, which produces the sources of truth. If a source is missing the skill says which brand skill to run.

Optional:
- **Marketing** (Anthropic): seo-audit, brand-review, and its Ahrefs connector for choosing blog topics.
- **Canva connector** (a connected app, not a plugin): only for the Canva destination of an infographic or ad. Canva imports from a web address, so the host must give the exported file one.

## Rules the skills follow

- The brand kit and message house win over any companion's suggestion.
- Unpublished material, and the contents of a person's references, are never sent to a companion or to Canva without agreement.
- Colors are locked to the kit by default. Unlocking is allowed, and any color outside the kit is recorded as a brand exception, marks the asset draft and asks the brand owners to approve it.
- The asset stays clean: no status, byline, sources, confirm lists or change log inside it.
- Every saved change re-runs the checks. Deleting never touches downloaded files, a Canva design or a published copy.

## Version

0.1.0. Built from the content-creation and content-review skills. No demo or sample data ships in the plugin: every fact, number, color and name is read from the project's own sources at run time.
