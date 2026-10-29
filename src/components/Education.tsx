import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './Reveal'

const certificates = [
  { name: '2023 ECPC Qualifications Day 5', url: 'https://drive.google.com/file/d/1sQh3Qnfls-UDQ4-tTduW5nxnb7lYN96I/view?usp=sharing' },
  { name: 'MCBS internship completion', url: 'https://drive.google.com/file/d/1tqDBM9D-Vi0xS-1TJaid2dHfRoG9LwQ2/view' },
  { name: 'Digitera Certificate', url: 'https://drive.google.com/file/d/1_VQwiii3PS6NAV4tAoASJjypCkaw_TTY/view?usp=sharing' },
]

export function Education() {
  return (
    <section id="education" className="section-shell">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-24">
        <Reveal>
          <p className="section-kicker">Education</p>
          <h2 className="mt-7 font-display text-[clamp(3.2rem,6vw,6.5rem)] font-light leading-[.92] tracking-[-0.045em] text-lilac">Cairo<br /><em className="text-periwinkle">University.</em></h2>
          <div className="mt-10 border-t border-lilac/15 pt-7">
            <h3 className="text-xl text-lilac">B.Sc. in Computer Science</h3>
            <p className="mt-3 max-w-[46ch] text-base leading-7 text-lilac/55">Faculty of Computers and Artificial Intelligence</p>
            <div className="mt-7 flex flex-wrap gap-x-12 gap-y-4 font-mono text-[11px] uppercase tracking-[0.1em]">
              <span className="text-lilac/60">10/2022—07/2026</span>
              <span className="text-lilac">GPA <strong className="ml-2 font-normal text-periwinkle">3.3 / 4.0</strong></span>
            </div>
          </div>
        </Reveal>
        <div className="lg:pt-16">
          <Reveal>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-lilac/60">Certificates</h3>
            <div className="mt-5 border-t border-lilac/15">
              {certificates.map((certificate) => (
                <a key={certificate.name} href={certificate.url} target="_blank" rel="noreferrer" className="group flex min-h-16 items-center justify-between gap-4 border-b border-lilac/15 py-4 text-[15px] text-lilac/70 transition-colors hover:text-lilac">
                  <span>{certificate.name}</span><ArrowUpRight size={16} className="shrink-0 text-periwinkle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-12">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-lilac/60">Languages</h3>
            <div className="mt-5 grid grid-cols-3 gap-4 border-t border-lilac/15 pt-5">
              {[['Arabic', 'Native'], ['English', 'Proficient'], ['French', 'Basic']].map(([language, level]) => (
                <div key={language}><p className="text-[15px] text-lilac">{language}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-lilac/55">{level}</p></div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
