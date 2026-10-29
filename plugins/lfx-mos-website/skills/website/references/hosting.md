# Hosting options

Chosen after the site is built, audited and previewed. `finalize.js --hosting <key>` records the choice in `site.json` (`launch.hosting`, `launch.chosen_at`) and writes the files below.

| # | Option | Key | Who hosts and maintains | Editing afterwards | `finalize.js` writes | Next step |
|---|---|---|---|---|---|---|
| 1 | Maintain in Marketing OS | `managed` | LF (published by the publish skill) | Marketing OS editor only: existing fields, plus new blog posts and events (text, images, code); no other structural changes; domain and form endpoint locked | `<slug>-site.json`, `<slug>-edit.html`, `<slug>-launch-request.json` | Publish skill, after Web team or Project Formation approval |
| 2 | Publish on LF GitHub | `lf-github` | LF GitHub org repo | In the repo only (pull requests). Posts and events can also come from the Marketing OS posts and events editor | `<slug>-site.json`, `<slug>-posts-events-editor.html`, `<slug>-launch-request.json` | Publish skill, after approval |
| 3 | Export for a separate GitHub | `export` | The project, in its own GitHub org | Editor (full) in the zip, then push | `<slug>-website.zip` with `.nojekyll` and `.github/workflows/pages.yml` | The project follows the README's GitHub steps |
| 4 | Host on WordPress | `wordpress` | Web Engineering team (WordPress) | In WordPress, after their build | `<slug>-website.zip`, `<slug>-wordpress-request.json` | Asana task in Web Requests; attach the zip |

## The editor in each option
- **managed:** a notice explains the limits. Add, Remove, Up and Down are hidden everywhere except blog posts and events. Domain and sign-up endpoint are read-only. The main button is "Save changes for publishing", which downloads `<slug>-site.json`; there is no zip download.
- **lf-github:** a posts and events editor only (News and Events). "Save changes for publishing" downloads `<slug>-posts-events.json`: `{ kind: "lfx-mos-website/content-update", version, project, saved_at, posts, events, media }`. The publish skill replaces `pages.blog.posts`, `pages.events.items` and `media` in the repo's `site.json` with these and opens a pull request.
- **export** and **wordpress:** the editor works as before and downloads a new zip.

## Posts and events
A post or event with a body gets its own page (`/news/<slug>/`, `/events/<slug>/`) with BlogPosting or Event structured data, a Markdown twin and a sitemap entry. Bodies are Markdown, written with the editor's toolbar: headings, bold, italic, links, lists, quotes, inline code, code blocks and images. Images are PNG, JPEG, GIF or WebP up to 1.5 MB, stored in `site.media` and written to `assets/media/`; each needs alt text before it's inserted.

## Launch request (managed, lf-github)
`<slug>-launch-request.json`: `kind`, `version`, `hosting`, `hostingLabel`, `requested_at`, `requester`, `project`, `domain`, `pages`, `placeholders`, `audit` (`passed`, `at`, `violations`, `textChecked`), `repo`, `editing`, `site_json`, `next`. The publish skill reads it with the `site.json` next to it.

## WordPress request (Asana)
Filed in the Web Team's **Web Requests** project, **Incoming Requests** section:

| Field | Value | ID |
|---|---|---|
| Project | Web Requests | `1201187889631310` |
| Section | Incoming Requests | `1201189954257700` |
| Web Request | Brand New Website | field `1201723942461930`, option `1201723942474526` |
| Priority | Medium | field `515793781831855`, option `515793781831857` |

Task name: `New website: <Project> (WordPress build from Marketing OS)`. The notes list the domain, requester, audit date, pages, the required LF scripts and the placeholders left, and ask for the attached zip. Create it with the Asana connector (`create_tasks` with the project, section, name, notes and custom fields from the JSON), then ask the person to attach the zip to the task.

## Required on every page, whatever the option
Transcend first in `<head>`; at the end of `<body>`, the cookie-settings handler, LFX Segment, ZoomInfo and HubSpot. A WordPress build must carry the same scripts; the request says so.
