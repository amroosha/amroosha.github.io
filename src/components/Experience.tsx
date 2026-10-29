import { roles } from '../data/portfolio'
import { Reveal } from './Reveal'

export function Experience() {
  return (
    <section id="experience" className="section-shell">
      <Reveal>
        <div className="mb-12 flex flex-col justify-between gap-5 border-b border-line/15 pb-7 sm:flex-row sm:items-end">
          <h2 className="font-display text-[clamp(3rem,6vw,6rem)] font-light leading-none tracking-[-0.04em] text-ink">
            Experience
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            Evaluation · Engineering · Research
          </p>
        </div>
      </Reveal>

      <div>
        {roles.map((role, index) => (
          <Reveal key={`${role.company}-${role.title}`} delay={index * 0.04}>
            <article className="grid gap-7 border-b border-line/12 py-11 lg:grid-cols-[210px_1fr] lg:gap-16 lg:py-14">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-[11px] tracking-[0.06em] text-brand">{role.period}</p>
                <p className="mt-2 max-w-[18ch] font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-ink-faint">
                  {role.location}
                </p>
                <span className="mt-5 hidden h-px w-10 bg-line/30 lg:block" aria-hidden="true" />
              </div>

              <div>
                <h3 className="font-display text-[1.9rem] font-light leading-[1.1] tracking-[-0.025em] text-ink sm:text-[2.35rem]">
                  {role.title}
                </h3>
                <p className="mt-1.5 text-[15px] text-ink-muted">{role.company}</p>

                <p className="mt-6 max-w-[58ch] text-[15px] leading-7 text-ink-muted">{role.summary}</p>

                <ul className="mt-6 grid max-w-[76ch] gap-3">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3.5 text-[15px] leading-7 text-ink-muted">
                      <span className="mt-[11px] h-[3px] w-[3px] shrink-0 rounded-full bg-brand/70" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line/12 pt-5">
                  {role.tags.map((tag) => (
                    <li key={tag} className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
