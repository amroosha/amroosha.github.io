import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { ProjectTree } from './components/ProjectTree'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { Contact } from './components/Contact'

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-midnight text-lilac">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header />
      <main id="main-content">
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
