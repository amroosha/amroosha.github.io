import { ArrowUpRight } from 'lucide-react'
import { certificates, languages } from '../data/portfolio'
import { Reveal } from './Reveal'

export function Education() {
  return (
    <section id="education" className="section-shell">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-24">
        <Reveal>
          <p className="section-kicker">Education</p>
          <h2 className="mt-7 font-display text-[clamp(3.2rem,6vw,6.5rem)] font-light leading-[.92] tracking-[-0.045em] text-ink">
            Cairo<br /><em className="text-brand">University.</em>
          </h2>
          <div className="mt-10 border-t border-line/15 pt-7">
            <h3 className="text-xl text-ink">B.Sc. in Computer Science</h3>
            <p className="mt-3 max-w-[46ch] text-base leading-7 text-ink-muted">Faculty of Computers and Artificial Intelligence</p>
            <div className="mt-7 flex flex-wrap gap-x-12 gap-y-4 font-mono text-[11px] uppercase tracking-[0.1em]">
              <span className="text-ink-muted">10/2022 — 07/2026</span>
              <span className="text-ink">GPA <strong className="ml-2 font-normal text-brand">3.3 / 4.0</strong></span>
            </div>
          </div>
        </Reveal>

        <div className="lg:pt-16">
          <Reveal>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">Certificates</h3>
            <div className="mt-5 border-t border-line/15">
              {certificates.map((certificate) => (
                <a
                  key={certificate.name}
                  href={certificate.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-16 items-center justify-between gap-4 border-b border-line/15 py-4 text-[15px] text-ink-muted transition-colors hover:text-ink"
                >
                  <span>{certificate.name}</span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-brand/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">Languages</h3>
            <div className="mt-5 grid grid-cols-3 gap-4 border-t border-line/15 pt-5">
              {languages.map((language) => (
                <div key={language.name}>
                  <p className="text-[15px] text-ink">{language.name}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint">{language.level}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
