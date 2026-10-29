import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { ProjectTree } from './components/ProjectTree'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { Contact } from './components/Contact'

export default function App() {
  return (
    <div className="relative min-h-[100dvh]">
      <div className="page-aura" aria-hidden="true" />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header />
      {/* Focus target for the skip link. It is not an interactive control, so it
          gets no ring; the scroll jump is the visible confirmation. */}
      <main id="main-content" tabIndex={-1} className="relative z-10 outline-none">
        <Hero />
        <About />
        <ProjectTree />
        <Experience />
        <Education />
      </main>
      <Contact />
    </div>
  )
}
