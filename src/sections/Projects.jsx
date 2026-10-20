import { projects } from '../data/portfolio.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import './Projects.css'

export default function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading index="03" label="selected work" title="Projects." id="projects-title">
          AI automation, developer tooling, and full-stack products — a few things I’ve designed and built end to end.
        </SectionHeading>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
