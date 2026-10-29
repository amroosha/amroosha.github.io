import { skillGroups } from '../data/portfolio'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" className="section-shell">
      <div className="grid gap-12 lg:grid-cols-[.32fr_1fr] lg:gap-20">
        <Reveal>
          <p className="section-kicker">Profile / capabilities</p>
          <p className="mt-5 max-w-[30ch] font-mono text-[10px] uppercase leading-6 tracking-[0.14em] text-lilac/55">Engineering intelligence from data to deployment.</p>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="max-w-[900px] font-display text-[clamp(2.6rem,5vw,5rem)] font-light leading-[1.02] tracking-[-0.035em] text-lilac">
              I build AI systems that <em className="text-periwinkle">retrieve, reason,</em> and hold up in the real world.
            </h2>
            <p className="mt-8 max-w-[68ch] text-base leading-7 text-lilac/65">
              My work spans end-to-end RAG architectures, local-first LLM agents, and automated computer vision pipelines. I care about domain adaptation, thoughtful data engineering, and optimized local inference that makes accurate AI practical beyond the demo.
            </p>
          </Reveal>
          <div className="mt-16 border-t border-lilac/15">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.035}>
                <div className="grid gap-3 border-b border-lilac/15 py-6 md:grid-cols-[.7fr_1.3fr] md:gap-8">
                  <h3 className="font-mono text-[11px] uppercase leading-5 tracking-[0.1em] text-lilac">{group.title}</h3>
                  <p className="max-w-[65ch] text-[15px] leading-7 text-lilac/55">{group.skills}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
