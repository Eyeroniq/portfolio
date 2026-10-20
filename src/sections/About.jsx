import { about, profile } from '../data/portfolio.js'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading index="01" label="about" title={about.heading} id="about-title" />

        <div className="about__grid">
          <Reveal className="about__body">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="about__sign mono">
              <span className="dot" aria-hidden="true" />
              {profile.name.toLowerCase()} — {profile.role.toLowerCase()}
              {profile.location && ` · ${profile.location.toLowerCase()}`}
            </p>
          </Reveal>

          <ol className="about__principles">
            {about.principles.map((item, i) => (
              <Reveal as="li" key={item.title} delay={0.08 * i} className="about__principle">
                <span className="about__principle-index mono">0{i + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
