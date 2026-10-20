import { experience } from '../data/portfolio.js'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import './Experience.css'

const SHOW_PLACEHOLDER_HINTS = import.meta.env.DEV

export default function Experience() {
  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading index="04" label="experience" title="Experience." id="experience-title">
          Where I’ve worked, studied, and what I focused on.
        </SectionHeading>

        <ol className="timeline">
          {experience.map((item, i) => (
            <Reveal as="li" key={`${item.role}-${i}`} delay={0.06 * i} className="timeline__item">
              <p className="timeline__period mono">{item.period}</p>
              <span className="timeline__node" aria-hidden="true" />
              <div className="timeline__content">
                <h3 className="timeline__role">
                  {item.role}
                  {SHOW_PLACEHOLDER_HINTS && item.placeholder && (
                    <span className="timeline__todo mono">edit in src/data/portfolio.js</span>
                  )}
                </h3>
                <p className="timeline__org">{item.org}</p>
                {item.summary && <p className="timeline__summary">{item.summary}</p>}
                {item.tags?.length > 0 && (
                  <ul className="timeline__tags" aria-label="Focus">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
