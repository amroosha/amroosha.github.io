---
name: Portfolio Sections
description: Add, restructure, or restyle a portfolio section in this repo - covers the data-file-first content model, section composition in App.tsx, and the Reveal/motion conventions.
---

# Adding or changing a portfolio section

This repo renders a single page from typed data. Follow the order below; skipping step 1 is the
most common cause of duplicated copy.

## 1. Content goes in the data file first

`src/data/portfolio.ts` is the single source of truth. Before writing JSX, decide the shape:

- New project content → extend the `Project` interface (see `metrics`, `architecture`, `stack`)
  and add an entry to `projects`.
- New skill/capability content → extend `skillGroups`.
- A genuinely new content type → add a new interface **and** a new exported const next to the
  existing ones. Keep the naming pattern: `export interface X` + `export const xs: X[]`.

Rules:

- Every user-visible string is either in the data file or is chrome (nav labels, button text).
- Keep fields optional (`?`) when a section should render without them, and guard in the
  component — never emit empty headings or stray separators for missing data.
- Don't put JSX, class names, or colors in the data file. Content only.

## 2. Component shape

Section components in `src/components/` follow this skeleton:

```tsx
import { Reveal } from './Reveal'
import { projects } from '@/data/portfolio'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="...">
      <Reveal>
        <h2 id="projects-heading" className="font-display ...">Projects</h2>
      </Reveal>
      {/* content */}
    </section>
  )
}
```

- Named export, not default (matches existing sections).
- The `<section>` carries the `id` used by `Header` anchor links; update the nav in `Header.tsx`
  in the same change if you add or rename one.
- `aria-labelledby` pointing at the section heading.
- One `Reveal` per content block, not one wrapping the entire section — per-block reveals are the
  existing pattern and keep long sections from popping in as a single slab.

## 3. Register it

Add the component to `src/App.tsx` in reading order, inside `<main id="main-content">`. Add the
matching nav entry in `src/components/Header.tsx`.

## 4. Verify

- `npm run build` (catches the type errors a new interface field will create elsewhere).
- `npm run lint`.
- Then run `design-review` at 375 / 768 / 1440 and check the anchor lands correctly with
  `scroll-padding-top` (5rem in `index.css`).

## Extending an existing section instead

Prefer extending over adding a near-duplicate section. If two sections would render the same
shape from different data, generalize the component (prop for the data array + heading) rather
than copying the file.
