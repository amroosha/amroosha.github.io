import { useCallback, useState } from 'react'
import type { CSSProperties } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '../data/portfolio'
import { ProjectSheet } from './ProjectSheet'
import { Reveal } from './Reveal'

/**
 * Tree geometry lives in a 1000 x 1320 viewBox. Leaf cards use the same
 * coordinates as percentages, so the SVG and the HTML stay locked together at
 * every viewport width.
 */
interface TreeSlot {
  /** branch tip, in viewBox units */
  tip: { x: number; y: number }
  side: 'left' | 'right'
  /** where the branch leaves the trunk */
  attach: { x: number; y: number }
  sway: { duration: string; delay: string }
}

const slots: Record<string, TreeSlot> = {
  'local-research': {
    tip: { x: 688, y: 150 },
    attach: { x: 505, y: 260 },
    side: 'right',
    sway: { duration: '13s', delay: '-1s' },
  },
  'voice-classification': {
    tip: { x: 300, y: 370 },
    attach: { x: 498, y: 480 },
    side: 'left',
    sway: { duration: '15s', delay: '-4s' },
  },
  'advanced-rag': {
    tip: { x: 688, y: 590 },
    attach: { x: 503, y: 700 },
    side: 'right',
    sway: { duration: '14s', delay: '-7s' },
  },
  'rock-loyalty': {
    tip: { x: 300, y: 810 },
    attach: { x: 497, y: 920 },
    side: 'left',
    sway: { duration: '16s', delay: '-2s' },
  },
  'seed-bank': {
    tip: { x: 688, y: 1030 },
    attach: { x: 504, y: 1140 },
    side: 'right',
    sway: { duration: '17s', delay: '-9s' },
  },
}

const VIEWBOX = { width: 1000, height: 1200 }
const TRUNK_X = 500

type Point = { x: number; y: number }

function cubic(a: Point, b: Point, c: Point, d: Point) {
  return (t: number): Point => {
    const u = 1 - t
    return {
      x: u ** 3 * a.x + 3 * u ** 2 * t * b.x + 3 * u * t ** 2 * c.x + t ** 3 * d.x,
      y: u ** 3 * a.y + 3 * u ** 2 * t * b.y + 3 * u * t ** 2 * c.y + t ** 3 * d.y,
    }
  }
}

/**
 * Sweeps a width along a curve and closes it into a tapered outline. The
 * result reads as wood; a constant-width stroke reads as wire. Width eases
 * toward the tip so the branch thins the way a real one does.
 */
function taper(curve: (t: number) => Point, start: number, end: number, steps = 36, falloff = 1.35) {
  const left: Point[] = []
  const right: Point[] = []

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const p = curve(t)
    const behind = t > 0.004
    const q = curve(behind ? t - 0.004 : t + 0.004)
    const dx = behind ? p.x - q.x : q.x - p.x
    const dy = behind ? p.y - q.y : q.y - p.y
    const length = Math.hypot(dx, dy) || 1
    const half = (end + (start - end) * (1 - t) ** falloff) / 2
    const nx = (-dy / length) * half
    const ny = (dx / length) * half
    left.push({ x: p.x + nx, y: p.y + ny })
    right.push({ x: p.x - nx, y: p.y - ny })
  }

  const format = (point: Point) => `${point.x.toFixed(1)} ${point.y.toFixed(1)}`
  return `M${left.map(format).join('L')}L${right.reverse().map(format).join('L')}Z`
}

/** An offset hairline inside the wood — growth rings, not a second branch. */
function vein(curve: (t: number) => Point, offset: number, from = 0.04, to = 0.96, steps = 40) {
  const points: Point[] = []
  for (let i = 0; i <= steps; i += 1) {
    const t = from + ((to - from) * i) / steps
    const p = curve(t)
    const q = curve(Math.min(1, t + 0.004))
    const dx = q.x - p.x
    const dy = q.y - p.y
    const length = Math.hypot(dx, dy) || 1
    points.push({ x: p.x + (-dy / length) * offset, y: p.y + (dx / length) * offset })
  }
  return `M${points.map((point) => `${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join('L')}`
}

function branchCurve(slot: TreeSlot) {
  const dir = slot.side === 'right' ? 1 : -1
  const { attach, tip } = slot
  return cubic(
    { x: TRUNK_X, y: attach.y },
    { x: TRUNK_X + dir * 18, y: attach.y - 76 },
    { x: tip.x - dir * 96, y: tip.y + 8 },
    tip,
  )
}

/** Two short shoots per branch, grown off the branch itself. */
function twigShapes(slot: TreeSlot) {
  const curve = branchCurve(slot)
  const dir = slot.side === 'right' ? 1 : -1
  return [0.34, 0.58].map((t, index) => {
    const p = curve(t)
    const lift = 26 + index * 10
    const twig = cubic(
      p,
      { x: p.x + dir * 9, y: p.y - lift * 0.5 },
      { x: p.x + dir * 22, y: p.y - lift },
      { x: p.x + dir * 30, y: p.y - lift * 1.55 },
    )
    return taper(twig, 3.2, 0.4, 20, 1.1)
  })
}

/** Trunk: wide at the roots, narrow at the apex, with a slight lean. */
const trunkCurve = cubic(
  { x: TRUNK_X + 1, y: 1200 },
  { x: TRUNK_X - 5, y: 1010 },
  { x: TRUNK_X + 6, y: 700 },
  { x: TRUNK_X + 1, y: 62 },
)
const trunkMass = taper(trunkCurve, 34, 3.4, 48, 1.15)
const trunkLine = vein(trunkCurve, 0.2, 0.02, 0.98, 56)

const barkLines = [vein(trunkCurve, 7, 0.06, 0.9), vein(trunkCurve, -6, 0.1, 0.78)]

const crownTwigs = [
  cubic({ x: TRUNK_X + 1, y: 84 }, { x: 496, y: 58 }, { x: 480, y: 42 }, { x: 458, y: 24 }),
  cubic({ x: TRUNK_X + 1, y: 84 }, { x: 508, y: 58 }, { x: 526, y: 44 }, { x: 548, y: 30 }),
  cubic({ x: TRUNK_X + 1, y: 112 }, { x: 480, y: 98 }, { x: 456, y: 84 }, { x: 432, y: 76 }),
  cubic({ x: TRUNK_X + 1, y: 112 }, { x: 520, y: 100 }, { x: 546, y: 88 }, { x: 570, y: 82 }),
].map((twig) => taper(twig, 5, 0.5, 20, 1.1))

/**
 * The apex terminates in small nodes rather than decorative leaves — the
 * crown should speak the same language as the project branch tips.
 */
const crownNodes = [
  { x: 458, y: 24 },
  { x: 548, y: 30 },
  { x: 432, y: 76 },
  { x: 570, y: 82 },
]

const roots = [
  cubic({ x: 500, y: 1172 }, { x: 470, y: 1194 }, { x: 428, y: 1202 }, { x: 388, y: 1200 }),
  cubic({ x: 502, y: 1172 }, { x: 534, y: 1194 }, { x: 576, y: 1202 }, { x: 616, y: 1200 }),
  cubic({ x: 500, y: 1160 }, { x: 482, y: 1184 }, { x: 458, y: 1192 }, { x: 436, y: 1196 }),
  cubic({ x: 502, y: 1160 }, { x: 522, y: 1184 }, { x: 546, y: 1192 }, { x: 568, y: 1196 }),
].map((root) => taper(root, 9, 0.5, 24, 1.2))

interface LeafProps {
  project: Project
  index: number
  active: boolean
  onSelect: (project: Project) => void
  onActivate: (id: string) => void
  onDeactivate: () => void
}

function Leaf({ project, index, active, onSelect, onActivate, onDeactivate }: LeafProps) {
  const slot = slots[project.id]
  const style = {
    '--x': `${(slot.tip.x / VIEWBOX.width) * 100}%`,
    '--y': `${(slot.tip.y / VIEWBOX.height) * 100}%`,
    '--sway-duration': slot.sway.duration,
    '--sway-delay': slot.sway.delay,
  } as CSSProperties

  return (
    <button
      type="button"
      data-side={slot.side}
      data-open={active}
      className="leaf-node group"
      style={style}
      onClick={() => onSelect(project)}
      onMouseEnter={() => onActivate(project.id)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(project.id)}
      onBlur={onDeactivate}
      aria-haspopup="dialog"
      aria-controls="project-sheet"
      aria-label={`Open case study: ${project.title}`}
    >
      <motion.span
        layoutId={`leaf-plate-${project.id}`}
        className="leaf-plate"
        aria-hidden="true"
      />
      <span className="leaf-vein" aria-hidden="true" />

      <span className="relative block px-6 py-6 sm:px-7 sm:py-7">
        <span className="flex items-start justify-between gap-4">
          <span className="flex min-w-0 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
            <span className="text-brand/70">{String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-4 shrink-0 bg-line/40" aria-hidden="true" />
            <span className="truncate">{project.discipline.split(' · ')[0]}</span>
          </span>
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">{project.year}</span>
        </span>

        <span className="leaf-body mt-4">
          <span className="flex items-start justify-between gap-3">
            <span className="font-display text-[1.6rem] font-light leading-[1.05] tracking-[-0.025em] text-ink transition-colors duration-500 group-hover:text-brand sm:text-[1.75rem]">
              {project.shortTitle}
            </span>
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="mt-2 shrink-0 text-brand/60 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>

          <span className="leaf-summary mt-2.5 block max-w-[32ch] text-[13px] leading-[1.65] text-ink-muted">
            {project.summary}
          </span>
        </span>
      </span>
    </button>
  )
}

export function ProjectTree() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  const closeProject = useCallback(() => setSelected(null), [])

  return (
    <section id="projects" className="section-shell overflow-hidden">
      <Reveal>
        <div className="grid gap-8 border-b border-line/15 pb-10 lg:grid-cols-[1fr_.42fr] lg:items-end">
          <h2 className="max-w-[900px] font-display text-[clamp(3.2rem,7vw,7.2rem)] font-light leading-[.9] tracking-[-0.045em] text-ink">
            Work that grew<br /><em className="font-light text-brand">from one root.</em>
          </h2>
          <div className="lg:pb-2">
            <p className="max-w-[38ch] text-base leading-7 text-ink-muted">
              Five systems, newest at the canopy and oldest at the roots — one engineering thread through retrieval,
              perception, and inference.
            </p>
            <p className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-brand">
              <span className="h-1 w-1 rounded-full bg-brand" aria-hidden="true" />
              Select a leaf to open the case study
            </p>
          </div>
        </div>
      </Reveal>

      <LayoutGroup>
        <div className="tree-stage mt-16 xl:mt-4">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block"
            viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="tree-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="trunk-shade" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" style={{ stopColor: 'oklch(var(--bark))', stopOpacity: 'var(--trunk-strength)' }} />
                <stop offset=".55" style={{ stopColor: 'oklch(var(--bark))', stopOpacity: 'calc(var(--trunk-strength) * 0.72)' }} />
                <stop offset="1" style={{ stopColor: 'oklch(var(--bark))', stopOpacity: 'calc(var(--trunk-strength) * 0.44)' }} />
              </linearGradient>
            </defs>

            <path className="trunk-mass" d={trunkMass} />
            {barkLines.map((line) => (
              <path key={line} className="bark-line" d={line} />
            ))}
            <path className="trunk-line" d={trunkLine} />
            {!reduceMotion && <path className="trunk-sap" d={trunkLine} />}
            {crownTwigs.map((twig) => (
              <path key={twig} className="twig-shape" d={twig} />
            ))}

            <g className="crown">
              {crownNodes.map((node) => (
                <circle key={`${node.x}-${node.y}`} className="crown-orb" cx={node.x} cy={node.y} r="2.4" />
              ))}
            </g>

            {roots.map((root) => (
              <path key={root} className="root-shape" d={root} />
            ))}

            {projects.map((project) => {
              const slot = slots[project.id]
              const curve = branchCurve(slot)
              const path = vein(curve, 0.15, 0, 1, 48)
              const active = activeId === project.id
              return (
                <g
                  key={project.id}
                  className="branch-group"
                  data-side={slot.side}
                  style={{ '--sway-duration': slot.sway.duration, '--sway-delay': slot.sway.delay } as CSSProperties}
                >
                  <path className="branch-mass" d={taper(curve, 9.5, 1.5, 40, 1.15)} />
                  <path className="branch-glow" d={path} data-active={active} filter="url(#tree-glow)" />
                  <path className="branch-path" d={path} data-active={active} />
                  {twigShapes(slot).map((twig) => (
                    <path key={twig} className="twig-shape" d={twig} />
                  ))}
                  <circle className="node-orb" cx={slot.tip.x} cy={slot.tip.y} r="4.2" data-active={active} />
                </g>
              )
            })}
          </svg>

          {projects.map((project, index) => (
            <Leaf
              key={project.id}
              project={project}
              index={index}
              active={activeId === project.id}
              onSelect={setSelected}
              onActivate={setActiveId}
              onDeactivate={() => setActiveId(null)}
            />
          ))}
        </div>

        <AnimatePresence>
          {selected && <ProjectSheet key={selected.id} project={selected} onClose={closeProject} />}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  )
}
