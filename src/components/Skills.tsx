import { skillGroups } from '../data/portfolio'
import { SkillTreeAtomVisuals } from './SkillTreeAtomVisuals'
import { Reveal } from './Reveal'
import { SkillIcon } from './SkillIcon'

const total = skillGroups.reduce((count, group) => count + group.skills.length, 0)

/**
 * The capability wall. Icons carry the recognition, the mono label carries the
 * name — deliberately not a text list, so it reads differently from the
 * prose around it. Now featuring Three.js Atomic Skill Tree for ML & CV.
 */
export function Skills() {
  return (
    <section aria-labelledby="capabilities-heading" className="mt-20 border-t border-line/15 pt-8">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h3 id="capabilities-heading" className="section-kicker">
            Capabilities
          </h3>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
            {total} technologies
            <span className="mx-2 text-brand/60" aria-hidden="true">/</span>
            {skillGroups.length} disciplines
          </p>
        </div>
      </Reveal>

      <div className="mt-8 space-y-7">
        {skillGroups.map((group, index) => {
          // Replace the Machine Learning & Vision group with Three.js Visual
          if (group.title === 'Machine Learning & Vision') {
            return (
              <Reveal key={group.title} delay={index * 0.045}>
                <div className="relative pt-4 pb-8">
                  <SkillTreeAtomVisuals />
                </div>
              </Reveal>
            )
          }

          return (
            <Reveal key={group.title} delay={index * 0.045}>
              <div className="grid gap-4 md:grid-cols-[.24fr_1fr] md:gap-8">
                <div className="flex items-baseline gap-3 md:block md:pt-1">
                  <span className="font-mono text-[10px] tracking-[0.12em] text-brand/75" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="font-mono text-[10px] uppercase leading-4 tracking-[0.14em] text-ink md:mt-2">
                    {group.title}
                  </h4>
                </div>

                <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9">
                  {group.skills.map((skill) => (
                    <li key={skill} className="skill-tile">
                      <SkillIcon name={skill} className="skill-tile__icon" />
                      <span className="skill-tile__label">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
