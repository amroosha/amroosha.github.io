import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

function HeroDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      <svg viewBox="0 0 520 520" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="iris-core">
            <stop offset="0" stopColor="#7a6cff" stopOpacity=".42" />
            <stop offset=".5" stopColor="#4633b9" stopOpacity=".12" />
            <stop offset="1" stopColor="#1b1533" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="iris-line" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#4633b9" stopOpacity=".12" />
            <stop offset=".5" stopColor="#7a6cff" stopOpacity=".75" />
            <stop offset="1" stopColor="#4633b9" stopOpacity=".12" />
          </linearGradient>
          <filter id="node-glow" x="-200%" y="-200%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="260" cy="260" r="230" fill="url(#iris-core)" />
        <g className="hero-orbit origin-center">
          <circle cx="260" cy="260" r="186" fill="none" stroke="#7a6cff" strokeOpacity=".16" strokeDasharray="1 10" />
          <ellipse cx="260" cy="260" rx="186" ry="82" fill="none" stroke="url(#iris-line)" strokeWidth=".8" transform="rotate(-24 260 260)" />
          <ellipse cx="260" cy="260" rx="186" ry="82" fill="none" stroke="url(#iris-line)" strokeWidth=".8" transform="rotate(52 260 260)" />
        </g>
        <g fill="none" stroke="url(#iris-line)" strokeWidth="1">
          <path d="M104 321C159 305 165 215 260 260S365 180 418 191" />
          <path d="M145 145C193 175 193 247 260 260S326 352 380 374" />
          <path d="M260 260C237 211 256 140 260 83" />
          <path d="M260 260C292 281 279 384 260 438" />
        </g>
        <g fill="#7a6cff" filter="url(#node-glow)">
          <circle cx="104" cy="321" r="3" /><circle cx="145" cy="145" r="3" />
          <circle cx="418" cy="191" r="3" /><circle cx="380" cy="374" r="3" />
          <circle cx="260" cy="83" r="2.5" /><circle cx="260" cy="438" r="2.5" />
        </g>
        <circle cx="260" cy="260" r="52" fill="#2a1f5e" fillOpacity=".5" stroke="#7a6cff" strokeOpacity=".4" />
        <circle cx="260" cy="260" r="9" fill="#7a6cff" filter="url(#node-glow)" />
        <g fill="#e9e6ff" fillOpacity=".55" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="1.5">
          <text x="68" y="346">VISION</text><text x="106" y="127">AGENTS</text>
          <text x="383" y="173">RAG</text><text x="349" y="399">INFERENCE</text>
        </g>
        <g stroke="#e9e6ff" strokeOpacity=".18">
          <path d="M260 14v18M260 488v18M14 260h18M488 260h18" />
        </g>
      </svg>
      <span className="absolute bottom-[8%] left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.24em] text-lilac/55 lg:block">Systems · Reasoning · Evidence</span>
    </div>
  )
}

export function Hero() {
  const reduceMotion = useReducedMotion()
  const entrance = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="top" className="relative flex min-h-[100dvh] flex-col overflow-hidden pt-28">
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-4 px-5 pb-12 sm:px-8 lg:grid-cols-[1.35fr_.65fr] lg:px-12">
        <div className="relative z-10 pt-8 lg:pt-0">
          <motion.p {...entrance(0.05)} className="mb-8 font-mono text-[10px] uppercase tracking-[0.22em] text-periwinkle sm:text-[11px]">
            Omar Ez-Eldin Abdullah <span className="mx-2 text-lilac/55">/</span> AI Engineer
          </motion.p>
          <motion.h1 {...entrance(0.12)} className="max-w-[980px] font-display text-[clamp(3.35rem,8vw,8.25rem)] font-light leading-[0.86] tracking-[-0.045em] text-lilac">
            Machine intelligence,<br />
            <span className="text-lilac/75">engineered</span><br />
            <em className="font-light text-periwinkle">end to end.</em>
          </motion.h1>
          <motion.div {...entrance(0.22)} className="mt-10 grid max-w-3xl gap-8 border-t border-lilac/15 pt-7 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-[58ch] text-base leading-7 text-lilac/65">
              CS graduate specializing in Agentic AI and Applied Deep Learning—from local-first LLM agents and RAG architectures to optimized computer vision and inference systems.
            </p>
            <a href="#projects" className="primary-cta group inline-flex min-h-12 w-fit items-center gap-5 px-5 font-mono text-[11px] uppercase tracking-[0.14em] text-lilac">
              Explore work <ArrowDown size={15} className="transition-transform group-hover:translate-y-1" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
        <motion.div {...entrance(0.28)} className="pointer-events-none absolute right-[-28%] top-[16%] -z-0 w-[88%] opacity-35 sm:right-[-12%] sm:w-[62%] lg:relative lg:right-auto lg:top-auto lg:z-0 lg:w-full lg:opacity-100">
          <HeroDiagram />
        </motion.div>
      </div>
      <div className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between border-t border-lilac/10 px-5 py-5 font-mono text-[9px] uppercase tracking-[0.16em] text-lilac/55 sm:px-8 sm:text-[10px] lg:px-12">
        <span>PyTorch · LangGraph · Local inference</span>
        <a href="#about" className="flex min-h-11 items-center gap-2 transition-colors hover:text-lilac">Scroll to profile <ArrowDown size={13} aria-hidden="true" /></a>
      </div>
    </section>
  )
}
