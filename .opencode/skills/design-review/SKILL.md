---
name: Design Review
description: Pre-flight check before claiming a UI change is done - dual-theme responsive screenshots, console errors, contrast, keyboard path, reduced motion, and a clean build.
---

# Design review before "done"

Run this on every change that a visitor can see. It is the difference between "the code compiles"
and "the page actually looks right".

## 1. Build and lint first

```sh
npm run build
npm run lint
```

A type error in `src/data/portfolio.ts` will cascade through every section that renders it — fix
the root cause in the data model, not with `as any` at each call site.

## 2. Start the server and drive a real browser

`npm run dev` (port 3000). Then use the Playwright MCP tools — do not reason about layout from
class names:

- `browser_navigate` to `http://localhost:3000`
- `browser_resize` to **375×812**, then **768×1024**, then **1440×900**
- `browser_take_screenshot` at each width
- `browser_console_messages` — zero errors expected; React key/hydration warnings count as bugs
- Scroll the page before the final screenshot, or `Reveal` blocks will still be at `opacity: 0`
  and you will "verify" an invisible page

Check at each width:

- No horizontal scrollbar at 375 (`document.documentElement.scrollWidth > clientWidth` is a fail)
- Headings stay on the Cormorant display face and don't wrap to one word per line
- At ≥1280px the tree renders with leaf cards beside their branch tips; below that the SVG is
  hidden and the leaves become the vertical vine. Check both — they are separate layouts.
- At 768–1024 the vine card body is a two-column split; the summary shouldn't leave a dead half.
- Tap targets ≥ 44px on mobile
- `ProjectSheet` fills the viewport, scrolls internally, and the close control clears the
  content on a 375px screen

## 3. Both themes, every time

Toggle with `button[aria-label="Switch to dark theme"]` / `"Switch to light theme"` (or set
`localStorage.setItem('oea-theme', 'light')` and reload). Screenshot the tree and the sheet in
**both**. A palette change that looks right in dark routinely fails in light.

Check:

- The trunk and branches are visible in both themes. They're `oklch(var(--bark) / var(--wood))`;
  if the wood disappears, the token or the alpha is wrong, not the geometry.
- Inline SVG gradients use `oklch(var(--token))`. A raw `var(--token)` in `stopColor` resolves to
  black and looks like a rendering bug.
- No element keeps a light-theme surface after switching.

## 4. Contrast

Measure, don't eyeball. In the browser, rasterise the computed colour over `--page` on a canvas
and compute the WCAG ratio; do it once per theme.

- Body and summaries use `text-ink-muted` → ≥ 4.5:1 in both themes.
- Labels, metadata, timestamps use `text-ink-faint` → ≥ 4.5:1 in both themes.
- `text-ink/40` and friends are **not allowed** for text: 2.9:1 in dark, 2.3:1 in light.
- Kickers on `--brand` sit around 4.9:1 in light — acceptable, but re-measure if the brand
  lightness changes.

## 5. Keyboard and screen reader path

1. Press `Tab` from the top: first stop must be the `skip-link`, which becomes visible on focus.
   `Enter` moves focus to `MAIN#main-content`.
2. Every nav item, theme toggle, leaf, and CV link must be reachable and show the focus ring
   (`2px solid oklch(0.545 0.152 286)`, offset 4px).
3. Open a leaf with `Enter`: focus moves to the close button inside `role="dialog"`, tab wraps
   inside the sheet, `Escape` closes it, focus returns to the leaf that opened it, and
   `document.body` overflow is restored.
4. Clicking the sheet backdrop also closes it.

## 6. Motion

1. With motion enabled: a leaf expands into the sheet (not a hard cut) and shrinks back on close.
   The wind sway should be slow enough to read as drift, not vibration.
2. Emulate reduced motion (`page.emulateMedia({ reducedMotion: 'reduce' })`) and reload.
   `Reveal` renders at `opacity: 1`, and **every** continuous animation reports
   `animationName: none` — check `.page-aura`, `.hero-orbit`, `.branch-group`, `.leaf-node`,
   `.crown`. Note that `.trunk-sap` is not rendered at all in this mode.
3. The sheet should open instantly (no spring) with `border-radius: 0`.

## 7. Cross-check the real build

`npm run preview` and re-check at 375px width once. The dev server hides asset-path and
font-loading problems that `gh-pages-deploy` will expose. Relative `base: './'` also matters for
the CV link — confirm `/Omar-Ez-Eldin-Abdullah-CV.pdf` opens from the preview.

## 8. Clean up

Playwright writes screenshots to the repo root. Delete them before staging; they are not tracked
and they will clutter `git status` into something you can't review.

Report what you actually observed — widths checked, themes checked, console state, and any
contrast value you measured. "Looks good" without evidence is not a review.
