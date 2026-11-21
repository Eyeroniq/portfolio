import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { GithubIcon } from '../components/BrandIcons.jsx'
import ProjectPreview from '../components/ProjectPreview.jsx'
import YouTubeLite from '../components/YouTubeLite.jsx'
import { links, profile, projects } from '../data/portfolio.js'
import { projectPages } from '../data/projectPages.js'
import '../components/Button.css'
import './ProjectPage.css'

const home = import.meta.env.BASE_URL

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked — the code is still selectable */
    }
  }
  return (
    <button type="button" className="pp-copy" onClick={copy} aria-label="Copy command">
      {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      <span className="mono">{copied ? 'copied' : 'copy'}</span>
    </button>
  )
}

/** A project's case-study page: demo video, what it does, how it's built, and how to run it. */
export default function ProjectPage({ slug }) {
  const page = projectPages[slug]
  const project = projects.find((p) => p.id === page.projectId)
  const github = project?.github
  const videos = page.videos ?? (page.youtubeId ? [{ id: page.youtubeId }] : [])

  return (
    <div className="pp theme-light">
      <header className="pp-top">
        <div className="container pp-top__inner">
          <a className="pp-brand" href={home} aria-label={`${profile.fullName} — home`}>
            {profile.monogram}
            <span aria-hidden="true" />
          </a>
          <a className="pp-back" href={`${home}#projects`}>
            <ArrowLeft size={16} aria-hidden="true" />
            All projects
          </a>
        </div>
      </header>

      <main id="main">
        {/* Intro */}
        <section className="container pp-hero">
          <p className="pp-kind mono">
            <span className="dot" aria-hidden="true" />
            {page.kind}
          </p>
          <h1 className="pp-title">{page.title}</h1>
          <p className="pp-lead">{page.lead}</p>
          <div className="pp-actions">
            {github && (
              <a className="btn btn--solid" href={github} target="_blank" rel="noreferrer noopener">
                <GithubIcon size={16} aria-hidden="true" />
                <span className="btn__label">View on GitHub</span>
              </a>
            )}
            {project?.live && (
              <a className="btn btn--outline" href={project.live} target="_blank" rel="noreferrer noopener">
                <span className="btn__label">Live demo</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            <a className="btn btn--outline" href="#run">
              <span className="btn__label">Run it on your PC</span>
            </a>
          </div>
          <dl className="pp-facts">
            {page.facts.map((f) => (
              <div key={f.label}>
                <dt className="mono">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Demo video(s) (YouTube, loaded on play) — or the animated card until a video is set */}
        <section className="container pp-video" aria-label="Demo">
          {videos.length > 1 ? (
            <div className="pp-videos">
              {videos.map((v) => (
                <figure key={v.id}>
                  <YouTubeLite id={v.id} title={`${page.title}: ${v.label}`} />
                  <figcaption>
                    <b>{v.label}</b>
                    {v.text && ` — ${v.text}`}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : videos.length === 1 ? (
            <YouTubeLite id={videos[0].id} title={`${page.title} demo`} />
          ) : (
            <div className="pp-video__card project-card">
              <ProjectPreview variant={project?.preview} />
            </div>
          )}
        </section>

        {/* What it does */}
        <section className="container pp-section">
          <h2 className="pp-h2">
            <span className="mono">01</span>What it does
          </h2>
          <div className="pp-prose">
            {page.overview.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="pp-features">
            {page.features.map((group) => (
              <div className="pp-feature" key={group.title}>
                <h3>{group.title}</h3>
                <ul className="pp-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How it's built */}
        <section className="container pp-section">
          <h2 className="pp-h2">
            <span className="mono">02</span>How it&rsquo;s built
          </h2>
          <div className="pp-prose">
            <p>{page.architecture.text}</p>
          </div>
          <ol className="pp-flow" aria-label="Request path">
            {page.architecture.flow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <table className="pp-stack">
            <caption className="visually-hidden">Tech stack</caption>
            <tbody>
              {page.stack.map((row) => (
                <tr key={row.layer}>
                  <th scope="row" className="mono">
                    {row.layer}
                  </th>
                  <td>{row.tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Results */}
        <section className="container pp-section">
          <h2 className="pp-h2">
            <span className="mono">03</span>Results
          </h2>
          <ul className="pp-list pp-list--results">
            {page.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        {/* Run it locally */}
        <section className="container pp-section" id="run">
          <h2 className="pp-h2">
            <span className="mono">04</span>Run it on your PC
          </h2>
          <p className="pp-needs">
            <b>You need:</b> {page.run.needs}
          </p>
          <ol className="pp-steps">
            {page.run.steps.map((step, i) => (
              <li key={step.title}>
                <span className="pp-steps__n mono">{String(i + 1).padStart(2, '0')}</span>
                <div className="pp-steps__body">
                  <h3>{step.title}</h3>
                  <div className="pp-code">
                    <pre>
                      <code>{step.code}</code>
                    </pre>
                    <CopyButton text={step.code} />
                  </div>
                  {step.note && <p className="pp-note">{step.note}</p>}
                </div>
              </li>
            ))}
          </ol>
          <ul className="pp-links">
            {page.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noreferrer noopener">
                  {l.label}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section className="container pp-cta">
          <h2>Questions about {page.title}?</h2>
          <p>Happy to walk through how it works, or how it could fit your team.</p>
          <div className="pp-actions">
            <a className="btn btn--solid" href={`mailto:${links.email}?subject=${encodeURIComponent(page.title)}`}>
              <Mail size={16} aria-hidden="true" />
              <span className="btn__label">{links.email}</span>
            </a>
            <a className="btn btn--outline" href={`${home}#projects`}>
              <ArrowLeft size={16} aria-hidden="true" />
              <span className="btn__label">All projects</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="container pp-footer mono">
        © {new Date().getFullYear()} {profile.fullName.toLowerCase()}
      </footer>
    </div>
  )
}
