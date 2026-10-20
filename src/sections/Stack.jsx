import { BrainCircuit, Database, LayoutTemplate, Server, Wrench } from 'lucide-react'
import { stack } from '../data/portfolio.js'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import './Stack.css'

const ICONS = {
  ai: BrainCircuit,
  backend: Server,
  frontend: LayoutTemplate,
  data: Database,
  tools: Wrench,
}

export default function Stack() {
  return (
    <section id="stack" className="section stack" aria-labelledby="stack-title">
      <div className="container">
        <SectionHeading index="02" label="tech stack" title="The toolkit." id="stack-title">
          The tools I reach for most — grouped by where they sit in a system.
        </SectionHeading>

        <ul className="stack__grid">
          {stack.map((group, i) => {
            const Icon = ICONS[group.id] ?? Wrench
            return (
              <Reveal as="li" key={group.id} delay={0.06 * i} className={`stack__group stack__group--${group.id}`}>
                <div className="stack__head">
                  <span className="stack__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3>{group.title}</h3>
                    <p className="mono">{group.note}</p>
                  </div>
                </div>
                <ul className="stack__items" aria-label={`${group.title} technologies`}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
