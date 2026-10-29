import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './Reveal'

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/omar-ez-eldin-amroosha' },
  { label: 'GitHub', href: 'https://github.com/amroosha' },
  { label: 'Codeforces', href: 'https://codeforces.com/profile/amroosha' },
]

export function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-lilac/10">
      <div className="contact-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-8 pt-24 sm:px-8 sm:pt-32 lg:px-12">
        <Reveal>
          <p className="section-kicker">Start a conversation</p>
          <h2 className="mt-8 max-w-[1000px] font-display text-[clamp(3.7rem,9vw,9.5rem)] font-light leading-[.84] tracking-[-0.05em] text-lilac">
            Let’s build what<br /><em className="text-periwinkle">thinks next.</em>
          </h2>
          <a href="mailto:omarfayed241@gmail.com" className="group mt-12 inline-flex min-h-14 items-center gap-5 border-b border-periwinkle/60 pb-3 text-lg text-lilac transition-colors hover:border-periwinkle sm:text-2xl">
            omarfayed241@gmail.com <ArrowUpRight size={22} className="text-periwinkle transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </Reveal>
        <div className="mt-24 flex flex-col gap-7 border-t border-lilac/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-lilac/55 transition-colors hover:text-lilac">
                {link.label}<ArrowUpRight size={12} aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-lilac/55">© 2026 Omar Ez-Eldin Abdullah · Cairo, Egypt</p>
        </div>
      </div>
    </footer>
  )
}
