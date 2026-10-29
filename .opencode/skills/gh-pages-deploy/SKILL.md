---
name: Deploy to GitHub Pages
description: Build and publish this Vite site to GitHub Pages - covers the base path, .nojekyll, the Actions workflow, and the failure modes that produce a blank page.
---

# Deploying to GitHub Pages

Target: `https://amroosha.github.io` (a **user site**, served from the domain root, repo
`amroosha.github.io`, branch `master` or `main` — check with `git branch --show-current`).

Because it is a user site, no `basePath`/subdirectory is involved. If this repo were ever renamed
to something else, the site would become a *project* site at `/repo-name/` and the base path below
would have to change.

## The three settings that decide success or failure

1. **`base` in `vite.config.ts`.** Currently `'./'` (relative asset URLs). That works for a
   single-page app and also survives a move to a project site. Do **not** switch to `'/'` unless
   the site is definitely at the root forever; do not add a `base` that duplicates the repo name.
   Verify after building: `dist/index.html` should reference `./assets/index-*.js`, not an
   absolute `/assets/...` that would 404.
2. **`.nojekyll`.** GitHub's Jekyll step silently drops directories and files starting with `_`.
   Add an empty `.nojekyll` in `public/` so Vite copies it into `dist/`. Cheap insurance, and
   required if any asset path ever gains an underscore.
3. **Pages source = "GitHub Actions".** Repo → Settings → Pages → Build and deployment → Source.
   If this stays on "Deploy from a branch", the Actions workflow will upload an artifact that
   Pages never serves.

## Build

```sh
npm run build      # tsc -b && vite build  ->  dist/
npm run preview    # check the real output before pushing
```

`dist/` is currently **not** in `.gitignore`. Add it before committing, or a stray
`git add .` will commit a megabyte of build output.

## Workflow

Save as `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]        # change to [master] if that is the default branch
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Debugging a bad deploy

| Symptom | Cause |
|---|---|
| Blank page, console shows 404 on `/assets/index-*.js` | `base` mismatch — check `dist/index.html` |
| Page loads but unstyled | `index.css` failed to load, usually the same 404 |
| 404 on the custom domain / CNAME reset | CNAME file lives in `public/`, and Pages source must be Actions |
| `npm ci` fails in CI | `package-lock.json` out of sync with `package.json` — run `npm install` locally and commit the lockfile |

Always confirm against the deployed URL, not just `npm run preview` — `preview` serves from root
and will hide a `base` problem.
