import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../data/portfolio'

interface ProjectDialogProps {
  project: Project
  onClose: () => void
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), reduceMotion ? 0 : 120)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((element) => !element.hasAttribute('hidden'))
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

  return (
    <motion.div
      ref={dialogRef}
      id="project-dialog"
      layoutId={`project-${project.id}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-midnight"
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 32 }}
    >
      <div className="technical-grid pointer-events-none fixed inset-0 opacity-25" aria-hidden="true" />
      <div className="project-close fixed z-10">
        <button ref={closeRef} type="button" onClick={onClose} className="flex min-h-12 items-center gap-3 border border-lilac/25 bg-midnight/90 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-lilac backdrop-blur-md transition-colors hover:border-periwinkle hover:text-periwinkle" aria-label="Close project case study">
          Close <X size={16} aria-hidden="true" />
        </button>
      </div>

      <article className="relative mx-auto max-w-[1240px] px-5 pb-24 pt-24 sm:px-8 sm:pt-28 lg:px-12">
        <header className="border-b border-lilac/15 pb-12 sm:pb-16">
          <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-lilac/55 sm:flex-row sm:items-center sm:justify-between sm:pr-32">
            <span>{project.discipline}</span><span>{project.year}</span>
          </div>
          <h2 id="project-dialog-title" className="mt-10 max-w-[1000px] font-display text-[clamp(3.1rem,7vw,7rem)] font-light leading-[.92] tracking-[-0.04em] text-lilac">
            {project.title}
          </h2>
          <p className="mt-8 max-w-[68ch] text-lg leading-8 text-lilac/65">{project.overview}</p>
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="group mt-8 inline-flex min-h-12 items-center gap-3 border-b border-periwinkle/50 pb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-lilac transition-colors hover:border-periwinkle hover:text-periwinkle">
              {project.repoLabel ?? 'View GitHub repository'}<ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          )}
        </header>

        <section aria-label="Project metrics" className="grid border-b border-lilac/15 md:grid-cols-3">
          {project.metrics.map((metric, index) => (
            <div key={metric.label} className={`py-8 md:py-10 ${index > 0 ? 'border-t border-lilac/15 md:border-l md:border-t-0 md:pl-8' : ''}`}>
              <p className="font-display text-5xl font-light tracking-[-0.03em] text-periwinkle sm:text-6xl">{metric.value}</p>
              <p className="mt-3 max-w-[26ch] font-mono text-[10px] uppercase leading-5 tracking-[0.1em] text-lilac/55">{metric.label}</p>
            </div>
          ))}
        </section>

        <div className="grid gap-16 pt-16 lg:grid-cols-[1.25fr_.75fr] lg:gap-20">
          <section aria-labelledby="architecture-title">
            <h3 id="architecture-title" className="font-mono text-[11px] uppercase tracking-[0.16em] text-lilac/60">Architecture & engineering decisions</h3>
            <div className="mt-6 border-t border-lilac/15">
              {project.architecture.map((item, index) => (
                <div key={item.title} className="grid gap-3 border-b border-lilac/15 py-7 sm:grid-cols-[.65fr_1.35fr] sm:gap-7">
                  <h4 className="font-display text-2xl font-light text-lilac"><span className="mr-3 font-mono text-[9px] tracking-normal text-periwinkle">0{index + 1}</span>{item.title}</h4>
                  <p className="text-[15px] leading-7 text-lilac/60">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
          <aside className="lg:pt-1" aria-labelledby="stack-title">
            <h3 id="stack-title" className="font-mono text-[11px] uppercase tracking-[0.16em] text-lilac/60">Technology stack</h3>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-4 border-t border-lilac/15 pt-6">
              {project.stack.map((technology) => (
                <span key={technology} className="border-b border-lilac/20 pb-1 font-mono text-[11px] text-lilac/70">{technology}</span>
              ))}
            </div>
            <p className="mt-10 max-w-[38ch] font-display text-2xl font-light leading-8 text-lilac/55">Built with a focus on measurable outcomes, resilient systems, and clear technical reasoning.</p>
          </aside>
        </div>

        <button type="button" onClick={onClose} className="group mt-16 inline-flex min-h-12 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-lilac transition-colors hover:text-periwinkle">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" /> Back to the project tree
        </button>
      </article>
    </motion.div>
  )
}
