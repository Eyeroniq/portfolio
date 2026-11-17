import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './styles/global.css'
import ProjectPage from './pages/ProjectPage.jsx'

// Project pages arrive as pre-rendered HTML (scripts/prerender.mjs); React takes it over here.
const root = document.getElementById('root')
hydrateRoot(
  root,
  <StrictMode>
    <ProjectPage slug={root.dataset.project} />
  </StrictMode>,
)
