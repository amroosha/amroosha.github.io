import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../data/portfolio'

interface ProjectSheetProps {
  project: Project
  onClose: () => void
}

const zoomSpring = { type: 'spring', stiffness: 66, damping: 18, mass: 1.1 } as const

export function ProjectSheet({ project, onClose }: ProjectSheetProps) {
  const plateRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    plateRef.current?.scrollTo({ top: 0 })
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), reduceMotion ? 0 : 260)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !plateRef.current) return

      const focusable = Array.from(
        plateRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus()
    }
  }, [onClose, reduceMotion])

  return createPortal(
    <motion.div
      ref={plateRef}
      id="project-sheet"
      layoutId={`leaf-plate-${project.id}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-sheet-title"
      className="sheet-plate z-50"
      style={{ opacity: 1 }}
      onClick={onClose}
      transition={reduceMotion ? { duration: 0 } : zoomSpring}
      exit={{ opacity: 1, transition: { duration: reduceMotion ? 0 : 0.72 } }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.55, delay: reduceMotion ? 0 : 0.36 } }}
        exit={{ opacity: 0, transition: { duration: 0.16 } }}
      >
        <div className="technical-grid pointer-events-none fixed inset-0 opacity-30" aria-hidden="true" />

        <div className="sheet-close flex items-center gap-3">
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint sm:block">
            Esc or click outside
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onClose()
            }}
            className="flex min-h-12 items-center gap-3 border border-line/25 bg-page/80 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink backdrop-blur-md transition-colors hover:border-brand hover:text-brand"
            aria-label="Close case study and zoom back to the tree"
          >
            Close <X size={15} aria-hidden="true" />
          </button>
        </div>

        <article
          className="sheet-inner relative mx-auto max-w-[1120px] px-5 pb-24 pt-24 sm:px-8 sm:pt-28 lg:px-12"
          onClick={(event) => event.stopPropagation()}
        >
          <svg
            className="pointer-events-none absolute -right-6 top-16 hidden h-64 w-64 text-brand/10 lg:block"
            viewBox="0 0 120 160"
            aria-hidden="true"
          >
            <path
              d="M60 2C104 34 122 82 112 146C58 138 16 104 2 44C22 18 40 6 60 2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path d="M60 4C64 52 62 100 58 144" fill="none" stroke="currentColor" strokeWidth=".6" />
          </svg>

          <header className="border-b border-line/15 pb-12 sm:pb-16">
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint sm:pr-40">
              <span>{project.discipline}</span>
              <span>{project.year}</span>
            </div>
            <h2
              id="project-sheet-title"
              className="mt-10 max-w-[1000px] font-display text-[clamp(3rem,6.6vw,6.6rem)] font-light leading-[.92] tracking-[-0.04em] text-ink"
            >
              {project.title}
            </h2>
            <p className="mt-8 max-w-[68ch] text-lg leading-8 text-ink-muted">{project.overview}</p>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="ghost-link group mt-8 inline-flex min-h-12 items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink transition-colors hover:text-brand"
              >
                {project.repoLabel ?? 'View GitHub repository'}
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            )}
          </header>

          <section aria-label="Project metrics" className="grid border-b border-line/15 md:grid-cols-3">
            {project.metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`py-8 md:py-10 ${index > 0 ? 'border-t border-line/15 md:border-l md:border-t-0 md:pl-8' : ''}`}
              >
                <p className="font-display text-5xl font-light tracking-[-0.03em] text-brand sm:text-6xl">{metric.value}</p>
                <p className="mt-3 max-w-[26ch] font-mono text-[10px] uppercase leading-5 tracking-[0.1em] text-ink-faint">
                  {metric.label}
                </p>
              </div>
            ))}
          </section>

          <div className="grid gap-16 pt-16 lg:grid-cols-[1.25fr_.75fr] lg:gap-20">
            <section aria-labelledby="architecture-title">
              <h3 id="architecture-title" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                Architecture &amp; engineering decisions
              </h3>
              <div className="mt-6 border-t border-line/15">
                {project.architecture.map((item, index) => (
                  <div key={item.title} className="grid gap-3 border-b border-line/15 py-7 sm:grid-cols-[.65fr_1.35fr] sm:gap-7">
                    <h4 className="font-display text-2xl font-light text-ink">
                      <span className="mr-3 font-mono text-[9px] tracking-normal text-brand">0{index + 1}</span>
                      {item.title}
                    </h4>
                    <p className="text-[15px] leading-7 text-ink-muted">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <aside className="lg:pt-1" aria-labelledby="stack-title">
              <h3 id="stack-title" className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                Technology stack
              </h3>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-4 border-t border-line/15 pt-6">
                {project.stack.map((technology) => (
                  <span key={technology} className="border-b border-line/20 pb-1 font-mono text-[11px] text-ink-muted">
                    {technology}
                  </span>
                ))}
              </div>
              <p className="mt-10 max-w-[38ch] font-display text-2xl font-light leading-8 text-ink-faint">
                Built with a focus on measurable outcomes, resilient systems, and clear technical reasoning.
              </p>
            </aside>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onClose()
            }}
            className="group mt-16 inline-flex min-h-12 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:text-brand"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            Back to the tree
          </button>
        </article>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
