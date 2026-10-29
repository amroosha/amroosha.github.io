import { useCallback, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '../data/portfolio'
import { ProjectDialog } from './ProjectDialog'
import { Reveal } from './Reveal'

const positions = [
  { className: 'lg:left-[2%] lg:top-[40px]', side: 'left' },
  { className: 'lg:left-[62%] lg:top-[250px]', side: 'right' },
  { className: 'lg:left-[6%] lg:top-[470px]', side: 'left' },
  { className: 'lg:left-[60%] lg:top-[690px]', side: 'right' },
  { className: 'lg:left-[2%] lg:top-[910px]', side: 'left' },
]

const branchPaths: Record<string, string> = {
  'seed-bank': 'M600 100C550 100 520 100 456 100',
  'local-research': 'M600 310C655 310 690 310 744 310',
  'advanced-rag': 'M600 530C565 530 545 530 504 530',
  'voice-classification': 'M600 750C655 750 680 750 720 750',
  'rock-loyalty': 'M600 970C550 970 510 970 456 970',
}

const trunkPath = 'M600 0C560 40 640 70 600 100C550 180 650 240 600 310C550 390 650 460 600 530C550 610 650 680 600 750C550 830 650 900 600 970C570 1030 620 1080 600 1120'

interface NodeProps {
  project: Project
  index: number
  active: boolean
  onSelect: (project: Project) => void
  onActivate: (id: string) => void
  onDeactivate: () => void
}

function ProjectNode({ project, index, active, onSelect, onActivate, onDeactivate }: NodeProps) {
  const position = positions[index]
  const orbPosition = position.side === 'left'
    ? 'lg:left-auto lg:right-0 lg:translate-x-1/2'
    : 'lg:left-0 lg:right-auto lg:-translate-x-1/2'

  return (
    <motion.button
      type="button"
      layoutId={`project-${project.id}`}
      onClick={() => onSelect(project)}
      onMouseEnter={() => onActivate(project.id)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(project.id)}
      onBlur={onDeactivate}
      onPointerDown={() => onActivate(project.id)}
      aria-haspopup="dialog"
      aria-controls="project-dialog"
      className={`project-node group relative mb-14 ml-10 block min-h-44 w-[calc(100%_-_2.5rem)] border-t border-lilac/20 pb-4 pt-6 text-left transition-colors hover:border-periwinkle focus-visible:border-periwinkle lg:absolute lg:m-0 lg:w-[36%] ${position.className}`}
    >
      <svg className="pointer-events-none absolute -left-10 top-0 h-12 w-10 overflow-visible lg:hidden" viewBox="0 0 40 48" aria-hidden="true">
        <path d="M6 0C6 14 18 22 40 22" fill="none" stroke={active ? '#7a6cff' : '#4633b9'} strokeOpacity={active ? '1' : '.55'} strokeWidth="1.2" />
      </svg>
      <span className={`node-orb ${active ? 'is-active' : ''} absolute -left-[34px] top-2 h-3 w-3 -translate-x-1/2 rounded-full border border-periwinkle/70 bg-midnight lg:top-[52px] ${orbPosition}`} aria-hidden="true" />
      <span className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.15em] text-lilac/55 sm:text-[10px]">
        <span>{project.discipline}</span><span className="shrink-0">{project.year}</span>
      </span>
      <span className="mt-5 flex items-start justify-between gap-5">
        <span className="font-display text-[2rem] font-light leading-[1.02] tracking-[-0.025em] text-lilac transition-colors group-hover:text-periwinkle sm:text-4xl">{project.shortTitle}</span>
        <ArrowUpRight size={20} className="mt-1 shrink-0 text-periwinkle transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
      </span>
      <span className="mt-4 block max-w-[46ch] text-[14px] leading-6 text-lilac/55">{project.summary}</span>
      <span className="mt-5 block font-mono text-[9px] uppercase tracking-[0.13em] text-periwinkle/75">Open case study</span>
    </motion.button>
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
        <div className="grid gap-8 border-b border-lilac/15 pb-10 lg:grid-cols-[1fr_.42fr] lg:items-end">
          <h2 className="max-w-[900px] font-display text-[clamp(3.2rem,7vw,7.2rem)] font-light leading-[.9] tracking-[-0.045em] text-lilac">Selected work,<br /><em className="text-periwinkle">connected.</em></h2>
          <div className="lg:pb-2">
            <p className="max-w-[38ch] text-base leading-7 text-lilac/55">Five systems, one engineering thread: turning complex models into useful, measurable products.</p>
            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-periwinkle">Select a node to expand the case study</p>
          </div>
        </div>
      </Reveal>

      <LayoutGroup>
        <div className="relative mt-16 lg:mt-10 lg:h-[1120px]">
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1200 1120" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="tree-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="1120">
                <stop offset="0" stopColor="#4633b9" stopOpacity=".18" />
                <stop offset=".45" stopColor="#7a6cff" stopOpacity=".75" />
                <stop offset="1" stopColor="#4633b9" stopOpacity=".18" />
                {!reduceMotion && <animate attributeName="x1" values="-1200;0" dur="9s" repeatCount="indefinite" />}
                {!reduceMotion && <animate attributeName="x2" values="0;1200" dur="9s" repeatCount="indefinite" />}
              </linearGradient>
              <filter id="tree-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <path d={trunkPath} fill="none" stroke="#4633b9" strokeOpacity=".28" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d={trunkPath} fill="none" stroke="url(#tree-gradient)" strokeWidth="1.4" className="beam-current" vectorEffect="non-scaling-stroke" />
            {projects.map((project) => {
              const path = branchPaths[project.id]
              const active = activeId === project.id
              return (
                <g key={project.id}>
                  <path d={path} fill="none" stroke={active ? '#7a6cff' : '#4633b9'} strokeOpacity={active ? '.95' : '.4'} strokeWidth={active ? '2' : '1.2'} filter={active ? 'url(#tree-glow)' : undefined} className="tree-beam" vectorEffect="non-scaling-stroke" />
                  <path d={path} fill="none" stroke="url(#tree-gradient)" strokeWidth="1.2" className="beam-current" vectorEffect="non-scaling-stroke" />
                </g>
              )
            })}
          </svg>
          <svg className="pointer-events-none absolute bottom-0 left-0 top-0 h-full w-3 lg:hidden" viewBox="0 0 12 1000" preserveAspectRatio="none" aria-hidden="true">
            <path d="M6 0C2 180 10 340 6 500S2 820 6 1000" fill="none" stroke="#4633b9" strokeOpacity=".55" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            <path d="M6 0C2 180 10 340 6 500S2 820 6 1000" fill="none" stroke="#7a6cff" strokeOpacity=".55" strokeWidth="1" className="beam-current" vectorEffect="non-scaling-stroke" />
          </svg>

          {projects.map((project, index) => (
            <ProjectNode key={project.id} project={project} index={index} active={activeId === project.id} onSelect={setSelected} onActivate={setActiveId} onDeactivate={() => setActiveId(null)} />
          ))}
        </div>
        <AnimatePresence mode="popLayout">
          {selected && <ProjectDialog key={selected.id} project={selected} onClose={closeProject} />}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  )
}
