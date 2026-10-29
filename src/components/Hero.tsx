import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { cv } from '../data/portfolio'

function HeroDiagram({ backdrop = false }: { backdrop?: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-full" aria-hidden="true">
      <svg viewBox="0 0 520 520" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="iris-core">
            <stop offset="0" style={{ stopColor: 'oklch(var(--brand))', stopOpacity: 0.22 }} />
            <stop offset=".55" style={{ stopColor: 'oklch(var(--brand-deep))', stopOpacity: 0.08 }} />
            <stop offset="1" style={{ stopColor: 'oklch(var(--page))', stopOpacity: 0 }} />
          </radialGradient>
          <linearGradient id="iris-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: 'oklch(var(--brand))', stopOpacity: 0.06 }} />
            <stop offset=".5" style={{ stopColor: 'oklch(var(--brand))', stopOpacity: 0.45 }} />
            <stop offset="1" style={{ stopColor: 'oklch(var(--brand))', stopOpacity: 0.06 }} />
          </linearGradient>
          <filter id="node-glow" x="-200%" y="-200%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <circle cx="260" cy="260" r="232" fill="url(#iris-core)" />

        <g className="hero-orbit">
          <circle cx="260" cy="260" r="186" fill="none" style={{ stroke: 'oklch(var(--brand))', strokeOpacity: 0.13 }} strokeDasharray="1 12" />
          <ellipse cx="260" cy="260" rx="186" ry="82" fill="none" style={{ stroke: 'url(#iris-line)', strokeWidth: 0.7 }} transform="rotate(-24 260 260)" />
          <ellipse cx="260" cy="260" rx="186" ry="82" fill="none" style={{ stroke: 'url(#iris-line)', strokeWidth: 0.7 }} transform="rotate(52 260 260)" />
        </g>

        {!backdrop && (
          <g fill="none" style={{ stroke: 'url(#iris-line)', strokeWidth: 0.9 }}>
            <path d="M104 321C159 305 165 215 260 260S365 180 418 191" />
            <path d="M145 145C193 175 193 247 260 260S326 352 380 374" />
            <path d="M260 260C237 211 256 140 260 83" />
            <path d="M260 260C292 281 279 384 260 438" />
          </g>
        )}

        <g style={{ fill: 'oklch(var(--brand))', fillOpacity: 0.85 }} filter="url(#node-glow)">
          <circle cx="104" cy="321" r="2.6" /><circle cx="145" cy="145" r="2.6" />
          <circle cx="418" cy="191" r="2.6" /><circle cx="380" cy="374" r="2.6" />
          {!backdrop && (
            <>
              <circle cx="260" cy="83" r="2.2" /><circle cx="260" cy="438" r="2.2" />
            </>
          )}
        </g>

        <circle
          cx="260"
          cy="260"
          r="52"
          fill="url(#iris-core)"
          style={backdrop ? undefined : { stroke: 'oklch(var(--brand))', strokeOpacity: 0.28 }}
        />
        {!backdrop && (
          <circle cx="260" cy="260" r="7" style={{ fill: 'oklch(var(--brand))' }} filter="url(#node-glow)" />
        )}

        {!backdrop && (
          <>
            <g style={{ fill: 'oklch(var(--ink))', fillOpacity: 0.42 }} fontFamily="IBM Plex Mono, monospace" fontSize="8.5" letterSpacing="1.6">
              <text x="64" y="346">VISION</text><text x="102" y="127">AGENTS</text>
              <text x="386" y="173">RAG</text><text x="350" y="399">INFERENCE</text>
            </g>

            <g style={{ stroke: 'oklch(var(--ink))', strokeOpacity: 0.16 }}>
              <path d="M260 12v16M260 492v16M12 260h16M492 260h16" />
            </g>
          </>
        )}
      </svg>
    </div>
  )
}

export function Hero() {
  const reduceMotion = useReducedMotion()
  const entrance = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22, scale: 0.985 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="top" className="relative flex min-h-[100dvh] flex-col overflow-hidden pt-20">
      <div className="technical-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* The iris sits behind the masthead rather than beside it, so the name
          still owns the optical centre. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <motion.div
          {...entrance(0.05)}
          className="w-[min(170vw,1120px)] opacity-[.42] sm:w-[min(130vw,980px)] lg:opacity-60"
        >
          <HeroDiagram backdrop />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col items-center justify-center px-5 pb-14 pt-10 text-center sm:px-8">
        <motion.p
          {...entrance(0)}
          className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink-faint sm:text-[10px]"
        >
          Cairo, Egypt <span className="mx-2 text-brand/60" aria-hidden="true">/</span> Portfolio 2026
        </motion.p>

        <motion.h1
          {...entrance(0.08)}
          className="mt-7 font-display text-[clamp(3.1rem,10vw,9rem)] font-light leading-[0.84] tracking-[-0.045em] text-ink"
        >
          Omar Ez-Eldin
          <br />
          Abdullah
        </motion.h1>

        <motion.div {...entrance(0.18)} className="mt-9 flex w-full max-w-[30rem] items-center gap-4 sm:gap-6">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brand/50" aria-hidden="true" />
          <p className="pl-[0.4em] font-mono text-[10px] uppercase tracking-[0.4em] text-brand sm:pl-[0.5em] sm:text-[12px] sm:tracking-[0.5em]">
            AI Engineer
          </p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brand/50" aria-hidden="true" />
        </motion.div>

        <motion.p
          {...entrance(0.26)}
          className="mt-8 max-w-[26ch] font-display text-[clamp(1.45rem,2.5vw,2.2rem)] font-light italic leading-[1.2] tracking-[-0.02em] text-ink-muted"
        >
          Machine intelligence, engineered end to end.
        </motion.p>

        <motion.p {...entrance(0.34)} className="mt-6 max-w-[54ch] text-[15px] leading-7 text-ink-muted">
          CS graduate specializing in Agentic AI and Applied Deep Learning — from local-first LLM
          agents and RAG architectures to optimized computer vision and inference systems.
        </motion.p>

        <motion.div
          {...entrance(0.42)}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-7"
        >
          <a href="#projects" className="primary-cta group inline-flex min-h-12 w-full items-center justify-center gap-4 px-5 font-mono text-[11px] uppercase tracking-[0.14em] sm:w-auto">
            Explore work <ArrowDown size={15} className="transition-transform group-hover:translate-y-1" aria-hidden="true" />
          </a>

          <div className="flex items-center gap-7">
            <a
              href={cv.href}
              target="_blank"
              rel="noreferrer"
              className="ghost-link inline-flex min-h-12 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
            >
              View CV <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a
              href={cv.href}
              download
              className="inline-flex min-h-12 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint transition-colors hover:text-brand"
            >
              <Download size={13} aria-hidden="true" /> Download PDF
            </a>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 border-t border-line/10 px-5 py-5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint sm:px-8 sm:text-[10px] lg:px-12">
        <span className="hidden sm:block">PyTorch · LangGraph · Local inference</span>
        <a href="#about" className="ml-auto flex min-h-11 items-center gap-2 transition-colors hover:text-ink">
          Scroll to profile <ArrowDown size={13} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
