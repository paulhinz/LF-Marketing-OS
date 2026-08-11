# GitHub push & deploy handoff guide

## Repo setup

Target the project's own GitHub org (from Step 0). Repo name: `<project>-website` (or the ED's stated preference). If the agent has GitHub write access (connector or authenticated git), create the repo and push; if not, initialize the local repo, commit, and give the ED the exact commands:

```bash
cd site
git init && git add -A && git commit -m "Initial website from Website Designer Agent"
git remote add origin git@github.com:<org>/<project>-website.git
git push -u origin main
```

Include a `.gitignore` (`public/`, `resources/`, `.hugo_build.lock`) and a repo README stating the site's source-of-truth relationship to the foundation docs and how to edit content (front matter + data files).

Never force-push, never push to an existing repo's default branch — if the repo already has content, push to a `website-builder` branch and open a PR.

## GitHub Actions workflow (GitHub Pages default)

Write `.github/workflows/hugo.yml`: on push to `main`, checkout → install Hugo extended (pin the version used to build locally) → `hugo --minify` → upload artifact → deploy to GitHub Pages (`actions/deploy-pages`). Set Pages source to "GitHub Actions" in the note to the ED (repo Settings → Pages), since the agent may not have admin to set it.

The staged result is `https://<org>.github.io/<project>-website/` — reachable for review, but NOT the approved domain. That separation is what makes Gate 4 safe.

Netlify / Cloudflare Pages variants on request: same build (`hugo --minify`, pinned version, `HUGO_ENV=production`), publish dir `public/`.

## DNS handoff note (Gate 4 artifact)

Produce a short note addressed to the ED + LF IT containing exactly:

1. The approved domain (or "domain still TBD — blocked on Step 0 answer").
2. Records to set — GitHub Pages apex: A records `185.199.108.153 / .109. / .110. / .111.153`, plus `www` CNAME to `<org>.github.io`; or single CNAME for subdomain sites. (Adjust per chosen host.)
3. The `CNAME` file to commit (GitHub Pages custom domain) — include it in the repo already.
4. HTTPS: enable "Enforce HTTPS" after the cert issues.
5. Rollback: un-point DNS to fully reverse the launch; previous deploys are restorable from the Actions history; content rollback is `git revert`.

## Redirect map (redesigns only)

Deliver `redirects.md` mapping every preserved old URL to its new URL, implemented as Hugo aliases in front matter (same-domain) or as host-level redirects (domain change). Flag any old URLs intentionally dropped.

## Final report contents

Staged URL, repo URL, PR link (if branch flow), DNS note location, sitemap.md location, redirect map (if any), flagged gaps (domain TBD, missing proof, unstaffed sections), and a recommendation to run the AEO/GEO audit ~2 weeks after go-live.
