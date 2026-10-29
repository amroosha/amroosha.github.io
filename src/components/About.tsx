import { Reveal } from './Reveal'
import { Skills } from './Skills'

export function About() {
  return (
    <section id="about" className="section-shell">
      <div className="grid gap-12 lg:grid-cols-[.32fr_1fr] lg:gap-20">
        <Reveal>
          <p className="section-kicker">Profile / capabilities</p>
          <p className="mt-5 max-w-[30ch] font-mono text-[10px] uppercase leading-6 tracking-[0.14em] text-ink-faint">
            Engineering intelligence from data to deployment.
          </p>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="max-w-[900px] font-display text-[clamp(2.6rem,5vw,5rem)] font-light leading-[1.02] tracking-[-0.035em] text-ink">
              I build AI systems that <em className="text-brand">retrieve, reason,</em> and hold up in the real world.
            </h2>
            <p className="mt-8 max-w-[68ch] text-base leading-7 text-ink-muted">
              My work spans end-to-end RAG architectures, local-first LLM agents, and automated computer vision pipelines.
              I care about domain adaptation, thoughtful data engineering, and optimized local inference that makes accurate
              AI practical beyond the demo.
            </p>
          </Reveal>
        </div>
      </div>

      <Skills />
    </section>
  )
}
