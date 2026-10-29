import type { ReactNode } from 'react'
import { brandIcons, type BrandSkill } from '../lib/brand-icons'

/**
 * 24 x 24 concept marks for the skills that have no upstream brand glyph.
 * They share one stroke weight and cap style so the wall stays optically even
 * next to the solid simple-icons marks.
 */
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

const customGlyphs = {
  /** Nested U — the architecture the name describes. */
  'U2-Net': (
    <>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="1" {...stroke} strokeWidth={1.2} opacity={0.4} />
      <path d="M7.6 7.4v5.4a4.4 4.4 0 0 0 8.8 0V7.4" {...stroke} />
      <path d="M10 9.2v3.4a2 2 0 0 0 4 0V9.2" {...stroke} opacity={0.55} />
    </>
  ),

  /** Viewfinder around a detected region. */
  'Faster R-CNN': (
    <>
      <path
        d="M3.4 8.2V5.2a1.8 1.8 0 0 1 1.8-1.8h3M16 3.4h2.8a1.8 1.8 0 0 1 1.8 1.8v3M20.6 15.8v3a1.8 1.8 0 0 1-1.8 1.8H16M8 20.6H5.2a1.8 1.8 0 0 1-1.8-1.8v-3"
        {...stroke}
      />
      <rect x="8.1" y="8.1" width="7.8" height="7.8" rx="0.6" {...stroke} opacity={0.7} />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </>
  ),

  /** Waveform collapsing into an embedding. */
  Wav2Vec2: (
    <>
      <path d="M3.4 10.2v3.6M6.6 7.4v9.2M9.8 4.8v14.4M13 9.2v5.6" {...stroke} />
      <circle cx="17.4" cy="7.6" r="1.2" fill="currentColor" />
      <circle cx="20.4" cy="12" r="1.2" fill="currentColor" />
      <circle cx="17.4" cy="16.4" r="1.2" fill="currentColor" />
    </>
  ),

  /** Trace spans — observability, not a logo. */
  LangSmith: (
    <>
      <g {...stroke} opacity={0.5} strokeWidth={1.5}>
        <path d="M6.6 6.6h13.8M11 12h9.4M13.8 17.4h6.6" />
      </g>
      <circle cx="4" cy="6.6" r="1.5" fill="currentColor" />
      <circle cx="8.4" cy="12" r="1.5" fill="currentColor" />
      <circle cx="11.2" cy="17.4" r="1.5" fill="currentColor" />
    </>
  ),

  /** Point cloud in a vector space. */
  ChromaDB: (
    <>
      <g stroke="currentColor" strokeWidth={0.9} opacity={0.32} fill="none">
        <path d="M6.5 6.5 12 12l5.5 5.5M17.5 6.5 12 12l-5.5 5.5" />
      </g>
      <g fill="currentColor">
        <circle cx="6.5" cy="6.5" r="1.35" />
        <circle cx="12" cy="6.5" r="1.35" />
        <circle cx="17.5" cy="6.5" r="1.35" />
        <circle cx="6.5" cy="12" r="1.35" />
        <circle cx="12" cy="12" r="1.35" />
        <circle cx="17.5" cy="12" r="1.35" />
        <circle cx="6.5" cy="17.5" r="1.35" />
        <circle cx="12" cy="17.5" r="1.35" />
        <circle cx="17.5" cy="17.5" r="1.35" />
      </g>
    </>
  ),

  /** Sentences reduced to a single vector. */
  'Sentence Transformers': (
    <>
      <g {...stroke} opacity={0.55}>
        <path d="M3.4 7h9.2M3.4 12h7M3.4 17h9.2" />
      </g>
      <path d="M15 12h3.4" {...stroke} />
      <path d="M16.6 10.4 18.2 12l-1.6 1.6" {...stroke} />
      <circle cx="20.6" cy="12" r="1.4" fill="currentColor" />
    </>
  ),

  /** Ranked results, descending. */
  BM25: (
    <g fill="currentColor">
      <rect x="3.4" y="5.4" width="2.8" height="13.2" rx="0.6" />
      <rect x="8" y="8.4" width="2.8" height="10.2" rx="0.6" opacity={0.78} />
      <rect x="12.6" y="11.6" width="2.8" height="7" rx="0.6" opacity={0.56} />
      <rect x="17.2" y="14.6" width="2.8" height="4" rx="0.6" opacity={0.38} />
    </g>
  ),

  /** Llama head — local inference in C++. */
  'llama.cpp': (
    <>
      <g fill="currentColor">
        <rect x="14.4" y="2.6" width="1.7" height="4.4" rx="0.85" />
        <rect x="17.1" y="2.6" width="1.7" height="4.4" rx="0.85" />
        <rect x="12.8" y="6.2" width="7.4" height="6.4" rx="2.2" />
        <rect x="5.6" y="8.2" width="7.6" height="4.6" rx="2" />
        <rect x="14.6" y="12.2" width="4.2" height="8.8" rx="1.6" />
      </g>
      <circle cx="18" cy="9.1" r="1.05" fill="var(--glyph-eye, oklch(var(--page)))" />
    </>
  ),

  /** Cloud + smile — AWS had to be drawn, it is no longer in simple-icons. */
  AWS: (
    <>
      <path
        d="M7.3 16.6a3.9 3.9 0 0 1-.4-7.8 5.3 5.3 0 0 1 10.2.9 3.4 3.4 0 0 1 .6 6.7"
        {...stroke}
      />
      <path d="M5.2 19.4c3.9 2 9.7 2 13.6 0" {...stroke} strokeWidth={1.4} />
      <path d="M17 18.1l1.9 1.3-1.5 1.6" {...stroke} strokeWidth={1.4} />
    </>
  ),

  /** Axes and a series — matplotlib's job in one mark. */
  Matplotlib: (
    <>
      <path d="M4.2 3.6v16.6h16.4" {...stroke} opacity={0.45} strokeWidth={1.4} />
      <path d="M7 15.4 10.8 10.6 14.2 13.2 19 6.8" {...stroke} />
      <g fill="currentColor">
        <circle cx="7" cy="15.4" r="1.2" />
        <circle cx="10.8" cy="10.6" r="1.2" />
        <circle cx="14.2" cy="13.2" r="1.2" />
        <circle cx="19" cy="6.8" r="1.2" />
      </g>
    </>
  ),

  /** Distribution plus a rug — seaborn's visual signature. */
  Seaborn: (
    <>
      <path d="M3.2 17.4h3.2c1.1 0 1.2-9.6 5.6-9.6s4.5 9.6 5.6 9.6h3.2" {...stroke} />
      <g {...stroke} strokeWidth={1.2} opacity={0.5}>
        <path d="M4.8 19.6v1.8M6.4 19.6v1.8M8.2 19.6v1.8M10.1 19.6v1.8M12 19.6v1.8M13.9 19.6v1.8M15.8 19.6v1.8M17.6 19.6v1.8M19.2 19.6v1.8" />
      </g>
    </>
  ),

  /** Stacked architecture layers. */
  'System Design': (
    <>
      <rect x="3.4" y="3.4" width="17.2" height="4.6" rx="0.8" {...stroke} />
      <rect x="3.4" y="9.7" width="17.2" height="4.6" rx="0.8" {...stroke} opacity={0.68} />
      <rect x="3.4" y="16" width="17.2" height="4.6" rx="0.8" {...stroke} opacity={0.42} />
      <path d="M12 8v1.7M12 14.3V16" {...stroke} strokeWidth={1.1} opacity={0.5} />
    </>
  ),

  /** Request out, response back. */
  'REST APIs': (
    <>
      <path d="M4.4 8.6h9.8" {...stroke} />
      <path d="M11.8 6.2 14.2 8.6l-2.4 2.4" {...stroke} />
      <path d="M19.6 15.4H9.8" {...stroke} opacity={0.7} />
      <path d="M12.2 13l-2.4 2.4 2.4 2.4" {...stroke} opacity={0.7} />
    </>
  ),

  /** Inheritance: one class, two subclasses. */
  OOP: (
    <>
      <rect x="8.2" y="3.2" width="7.6" height="5" rx="0.8" {...stroke} />
      <rect x="2.6" y="15.8" width="7.6" height="5" rx="0.8" {...stroke} opacity={0.65} />
      <rect x="13.8" y="15.8" width="7.6" height="5" rx="0.8" {...stroke} opacity={0.65} />
      <path d="M12 8.2v3.5M6.4 15.4v-3.7h11.2v3.7" {...stroke} strokeWidth={1.2} opacity={0.6} />
    </>
  ),

  /** A binary tree — the same language as the projects section. */
  'Data Structures & Algorithms': (
    <>
      <path d="M12 8.2v3.4M12 11.6 6.8 15.2M12 11.6l5.2 3.6" {...stroke} strokeWidth={1.4} opacity={0.6} />
      <circle cx="12" cy="5.4" r="2.4" fill="currentColor" />
      <circle cx="6.4" cy="17.4" r="2.2" fill="currentColor" opacity={0.75} />
      <circle cx="17.6" cy="17.4" r="2.2" fill="currentColor" opacity={0.75} />
    </>
  ),

  /** A coffee cup — Java, without borrowing a vendor's mark. */
  Java: (
    <>
      <path d="M4.6 9h10.6v4.6a4.2 4.2 0 0 1-4.2 4.2H8.8a4.2 4.2 0 0 1-4.2-4.2V9Z" {...stroke} />
      <path d="M15.2 10.4h1.6a2.8 2.8 0 0 1 0 5.6h-1.6" {...stroke} />
      <path d="M8.2 6.2c0-1.1 1-1.5 1-2.6M12 6.2c0-1.1 1-1.5 1-2.6" {...stroke} strokeWidth={1.3} opacity={0.5} />
      <path d="M3.6 20.4h13" {...stroke} strokeWidth={1.3} opacity={0.6} />
    </>
  ),

  /** The database cylinder, for the language rather than a brand. */
  SQL: (
    <>
      <ellipse cx="12" cy="6.2" rx="7.4" ry="2.8" {...stroke} />
      <path d="M4.6 6.2v11.6c0 1.55 3.3 2.8 7.4 2.8s7.4-1.25 7.4-2.8V6.2" {...stroke} />
      <path d="M4.6 11.6c0 1.55 3.3 2.8 7.4 2.8s7.4-1.25 7.4-2.8" {...stroke} strokeWidth={1.2} opacity={0.5} />
    </>
  ),
} satisfies Record<string, ReactNode>

export type SkillName = BrandSkill | keyof typeof customGlyphs

interface SkillIconProps {
  name: SkillName
  className?: string
}

export function SkillIcon({ name, className }: SkillIconProps) {
  const brand = (brandIcons as Record<string, string | undefined>)[name]

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      {brand ? <path d={brand} fill="currentColor" /> : customGlyphs[name as keyof typeof customGlyphs]}
    </svg>
  )
}
