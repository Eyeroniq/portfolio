import { MotionConfig } from 'motion/react'
import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Stack from './sections/Stack.jsx'
import Projects from './sections/Projects.jsx'
import Experience from './sections/Experience.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'
import TechTicker from './components/TechTicker.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import { useIntroReady } from './hooks/useIntroReady.js'
import { showExperience } from './data/portfolio.js'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'

export default function App() {
  // Smooth "gliding" scroll starts once the intro loader has gone.
  const introReady = useIntroReady()
  useSmoothScroll(introReady)

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        {/* Everything after the dark intro uses the white editorial theme. */}
        <div className="theme-light">
          <TechTicker />
          <About />
          <Stack />
          <Projects />
          {/* Hidden in production until it has real entries (see portfolio.js) */}
          {showExperience && <Experience />}
          <Contact />
        </div>
      </main>
      <div className="theme-light">
        <Footer />
      </div>
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
    </MotionConfig>
  )
}
