import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './BrandIcons.jsx'
import ProjectPreview from './ProjectPreview.jsx'
import Reveal from './Reveal.jsx'
import './ProjectCard.css'

// Links render only when a real URL exists — no dead or "coming soon" links.
function ProjectLink({ href, icon: Icon, label, project }) {
  if (!href) return null
  return (
    <a
      className="project-link"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${project} — ${label} (opens in a new tab)`}
    >
      <Icon size={15} aria-hidden="true" />
      {label}
      <ArrowUpRight className="project-link__arrow" size={14} aria-hidden="true" />
    </a>
  )
}

const LiveIcon = (props) => <ArrowUpRight {...props} />

export default function ProjectCard({ project, index, className = '' }) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = project.image && !imageFailed

  // Spotlight follows the pointer via CSS variables — no React re-render.
  const onPointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Reveal delay={(index % 2) * 0.1} className={`project-card-wrap ${className}`}>
      <article className="project-card" onPointerMove={onPointerMove} aria-labelledby={`project-${project.id}`}>
        <div className="project-card__media">
          {showImage ? (
            <img
              className="project-card__img"
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <ProjectPreview variant={project.preview} />
          )}
        </div>

        <div className="project-card__body">
          <p className="project-card__kind mono">
            <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>
            {project.kind}
          </p>
          <h3 className="project-card__title" id={`project-${project.id}`}>
            {project.title}
          </h3>
          <p className="project-card__desc">{project.description}</p>

          {/* Short case study — each part shows only when it has content (results: verified only). */}
          {(project.problem || project.approach?.length > 0 || project.results?.length > 0) && (
            <dl className="project-card__study">
              {project.problem && (
                <div className="project-card__part">
                  <dt className="mono">Problem</dt>
                  <dd>{project.problem}</dd>
                </div>
              )}
              {project.approach?.length > 0 && (
                <div className="project-card__part">
                  <dt className="mono">Approach</dt>
                  <dd>
                    <ul className="project-card__points">
                      {project.approach.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {project.results?.length > 0 && (
                <div className="project-card__part">
                  <dt className="mono">Results</dt>
                  <dd>
                    <ul className="project-card__points">
                      {project.results.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          )}

          <ul className="project-card__tags" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          {(project.github || project.live) && (
            <div className="project-card__links">
              <ProjectLink href={project.github} icon={GithubIcon} label="Code" project={project.title} />
              <ProjectLink href={project.live} icon={LiveIcon} label="Live demo" project={project.title} />
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}
