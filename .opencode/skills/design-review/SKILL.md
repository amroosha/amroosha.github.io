---
name: Design Review
description: Pre-flight check before claiming a UI change is done - responsive screenshots, console errors, contrast, keyboard path, reduced motion, and a clean build.
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
- `browser_take_screenshot` at each width, full page
- `browser_console_messages` — zero errors expected; React key/hydration warnings count as bugs
- Scroll the page before the final screenshot, or `Reveal` blocks will still be at `opacity: 0`
  and you will "verify" an invisible page

Check at each width:

- No horizontal scrollbar at 375 (`document.documentElement.scrollWidth > clientWidth` is a fail)
- Headings stay on the Cormorant display face and don't wrap to one word per line
- The project grid/list collapses sanely — nothing narrower than ~280px
- Tap targets ≥ 44px on mobile
- `ProjectDialog` fits the viewport and scrolls internally instead of clipping

## 3. Contrast and palette

- Body copy is `text-lilac` on `bg-midnight` — check any new tinted text (`text-periwinkle`,
  muted variants, `lilac/60`) at 4.5:1 for body and 3:1 for large text. Muted-on-dark is the
  easiest thing to get wrong on this palette.
- Use the OKLCH tokens, not hex literals. A hardcoded `#7a6cff` will not respond to a palette
  change later.

## 4. Keyboard and screen reader path

1. Press `Tab` from the top: first stop must be the `skip-link`, which should become visible on
   focus and jump to `#main-content`.
2. Every nav item, project row, and dialog trigger must be reachable and show the focus ring.
3. Open a project dialog: focus moves inside, `Escape` closes it, focus returns to the trigger.
4. Arrow through the anchor nav — the active section indicator should track the scroll position.

## 5. Motion

Toggle reduced motion (`browser_evaluate` with an emulated media query, or the OS setting) and
reload. `Reveal` should render content immediately with no transform. Nothing should animate that
the user did not ask for.

## 6. Cross-check the real build

`npm run preview` and re-check at 375px width once. The dev server hides asset-path and
font-loading problems that `gh-pages-deploy` will expose.

Report what you actually observed — widths checked, console state, and any contrast value you
measured. "Looks good" without evidence is not a review.
