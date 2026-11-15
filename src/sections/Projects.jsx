import { useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { projects } from '../data/portfolio.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Button from '../components/Button.jsx'
import './Projects.css'

const featured = projects.filter((p) => p.featured)
const more = projects.filter((p) => !p.featured)

export default function Projects() {
  const [showMore, setShowMore] = useState(false)
  const toggleRef = useRef(null)

  const toggle = () => {
    setShowMore((open) => {
      // Collapsing from far down the list: bring the button back into view so the page
      // doesn't leave the reader stranded below the section.
      if (open) requestAnimationFrame(() => toggleRef.current?.scrollIntoView({ block: 'center' }))
      return !open
    })
  }

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading index="03" label="selected work" title="Projects." id="projects-title">
          AI systems, ML platforms and low-level engineering — things I’ve designed and built end to end.
        </SectionHeading>

        <div className="projects__grid">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {more.length > 0 && (
          <>
            {showMore && (
              <div className="projects__grid projects__grid--more" id="more-projects">
                {more.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={featured.length + i} />
                ))}
              </div>
            )}

            <div className="projects__more" ref={toggleRef}>
              <Button
                variant="outline"
                icon={showMore ? ChevronUp : ChevronDown}
                onClick={toggle}
                aria-expanded={showMore}
                aria-controls="more-projects"
              >
                {showMore ? 'Show fewer projects' : `Show ${more.length} more projects`}
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
