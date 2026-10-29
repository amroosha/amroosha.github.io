import { Reveal } from './Reveal'

const roles = [
  {
    title: 'AI Trainer / LLM Evaluator',
    company: 'Scale AI',
    location: 'San Francisco, CA · Remote',
    date: '05/2024—01/2026',
    points: [
      'Evaluated, annotated, and refined LLM outputs across 250+ production tasks with distinct technical requirements.',
      'Validated outputs across OOP, frontend architecture, computer vision, mathematics, and bilingual Arabic/English data; partnered with QMs on edge cases and quality standards.',
    ],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Microsystems Cloud Business Solution (MCBS)',
    location: 'Cairo, Egypt',
    date: '07/2025—10/2025',
    points: [
      'Developed modular web applications and integration workflows using TypeScript, React, and Angular, with Vite/Webpack build pipelines and E2E testing.',
      'Conducted security assessments across open ports and endpoint vulnerabilities, executing penetration tests and documenting mitigation strategies.',
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="section-shell">
      <Reveal>
        <div className="mb-14 flex flex-col justify-between gap-5 border-b border-lilac/15 pb-7 sm:flex-row sm:items-end">
          <h2 className="font-display text-[clamp(3rem,6vw,6rem)] font-light leading-none tracking-[-0.04em] text-lilac">Experience</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-lilac/55">Evaluation · Engineering · Security</p>
        </div>
      </Reveal>
      <div>
        {roles.map((role) => (
          <Reveal key={role.title}>
            <article className="grid gap-7 border-b border-lilac/15 py-10 lg:grid-cols-[.32fr_1fr] lg:gap-20 lg:py-14">
              <div>
                <p className="font-mono text-[11px] tracking-[0.08em] text-periwinkle">{role.date}</p>
                <p className="mt-3 font-mono text-[10px] uppercase leading-5 tracking-[0.1em] text-lilac/55">{role.location}</p>
              </div>
              <div>
                <h3 className="font-display text-3xl font-light tracking-[-0.02em] text-lilac sm:text-4xl">{role.title}</h3>
                <p className="mt-2 text-base text-lilac/55">{role.company}</p>
                <ul className="mt-7 grid gap-5 lg:grid-cols-2 lg:gap-10">
                  {role.points.map((point) => (
                    <li key={point} className="relative pl-5 text-[15px] leading-7 text-lilac/65 before:absolute before:left-0 before:top-[11px] before:h-1 before:w-1 before:rounded-full before:bg-periwinkle">{point}</li>
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
