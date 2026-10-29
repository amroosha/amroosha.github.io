import { ArrowUpRight, Download } from 'lucide-react'
import { cv, email, socials } from '../data/portfolio'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <footer id="contact" className="relative z-10 overflow-hidden border-t border-line/12">
      <div className="contact-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-8 pt-24 sm:px-8 sm:pt-32 lg:px-12">
        <Reveal>
          <p className="section-kicker">Start a conversation</p>
          <h2 className="mt-8 max-w-[1000px] font-display text-[clamp(3.4rem,8.5vw,9rem)] font-light leading-[.84] tracking-[-0.05em] text-ink">
            I&rsquo;m always ready<br /><em className="text-brand">Just let me know.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 border-t border-line/15 pt-12 lg:grid-cols-[1fr_.9fr] lg:gap-24">
          <Reveal>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">Email</p>
            <a
              href={`mailto:${email}`}
              className="ghost-link group mt-5 inline-flex min-h-14 items-center gap-4 pb-2 text-[clamp(1.15rem,2.6vw,2rem)] text-ink transition-colors hover:text-brand"
            >
              {email}
              <ArrowUpRight
                size={22}
                className="shrink-0 text-brand transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={cv.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
              >
                View CV <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              <a
                href={cv.href}
                download
                className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
              >
                <Download size={12} aria-hidden="true" /> Download PDF
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">Elsewhere</p>
            <ul className="mt-5 border-t border-line/15">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-16 items-center justify-between gap-6 border-b border-line/15 py-4 transition-colors"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-[15px] text-ink transition-colors group-hover:text-brand">{social.label}</span>
                      <span className="font-mono text-[10px] text-ink-faint">{social.handle}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-brand/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
            © 2026 Omar Ez-Eldin Abdullah · Cairo, Egypt
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
            I like purple :D
          </p>
        </div>
      </div>
    </footer>
  )
}
