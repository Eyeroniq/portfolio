import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import ProjectPage from './pages/ProjectPage.jsx'
import { projectPages } from './data/projectPages.js'

// Used only at build time by scripts/prerender.mjs to write each page's HTML.
export const slugs = Object.keys(projectPages)
export const pageMeta = (slug) => projectPages[slug]
export function render(slug) {
  return renderToString(
    <StrictMode>
      <ProjectPage slug={slug} />
    </StrictMode>,
  )
}
