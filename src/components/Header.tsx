import { ArrowDownToLine, ArrowUpRight } from 'lucide-react'

const navigation = [
  { label: 'Profile', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
]

export function Header() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="group flex min-h-11 items-center gap-3" aria-label="Omar Ez-Eldin Abdullah, back to top">
          <span className="font-display text-2xl tracking-tight text-lilac">OEA</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-lilac/55 sm:block">Cairo · Egypt</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="nav-link flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.13em] text-lilac/65 transition-colors hover:text-lilac">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <a
            href="/Omar-Ez-Eldin-Abdullah-CV.pdf"
            download
            className="hidden min-h-11 items-center gap-2 px-3 font-mono text-[11px] uppercase tracking-[0.12em] text-lilac/65 transition-colors hover:text-lilac sm:flex"
          >
            <ArrowDownToLine size={14} aria-hidden="true" /> CV
          </a>
          <a href="#contact" className="contact-link flex min-h-11 items-center gap-2 px-2 font-mono text-[11px] uppercase tracking-[0.12em] text-lilac sm:px-3">
            Contact <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  )
}
