import { memo } from 'react'
import { useReducedMotion } from 'motion/react'
import {
  siCelery,
  siDocker,
  siExpress,
  siFastapi,
  siGit,
  siGithub,
  siGooglegemini,
  siJavascript,
  siLangchain,
  siLinux,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siVite,
} from 'simple-icons'
import { ticker } from '../data/portfolio.js'
import './TechTicker.css'

// Official brand marks (simple-icons, CC0). Labels override a few long official titles.
const ICONS = {
  javascript: { icon: siJavascript },
  typescript: { icon: siTypescript },
  react: { icon: siReact },
  nextjs: { icon: siNextdotjs },
  tailwind: { icon: siTailwindcss },
  nodejs: { icon: siNodedotjs },
  express: { icon: siExpress },
  python: { icon: siPython },
  fastapi: { icon: siFastapi },
  celery: { icon: siCelery },
  redis: { icon: siRedis },
  postgresql: { icon: siPostgresql },
  mongodb: { icon: siMongodb },
  socketio: { icon: siSocketdotio, label: 'Socket.IO' },
  docker: { icon: siDocker },
  git: { icon: siGit },
  github: { icon: siGithub },
  gemini: { icon: siGooglegemini, label: 'Gemini' },
  linux: { icon: siLinux },
  vite: { icon: siVite },
  langchain: { icon: siLangchain },
}

const items = ticker.map((key) => ICONS[key]).filter(Boolean)

function List({ hidden = false }) {
  return (
    <ul className="ticker__list" aria-hidden={hidden || undefined}>
      {items.map(({ icon, label }) => (
        <li className="ticker__item" key={icon.slug}>
          <svg className="ticker__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d={icon.path} />
          </svg>
          <span className="ticker__label">{label ?? icon.title}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * Slim, full-bleed marquee of the tools I use. Two identical lists slide left by exactly
 * one list-width (-50% of the track), so the loop is seamless. Pauses on hover/focus.
 * With reduced motion it becomes a static, horizontally scrollable row.
 */
function TechTicker() {
  const reduce = useReducedMotion()

  return (
    <section className="ticker" aria-label="Technologies I work with">
      <div
        className="ticker__viewport"
        // Only a tab stop when it is a scrollable row (reduced motion).
        tabIndex={reduce ? 0 : undefined}
        role={reduce ? 'region' : undefined}
        aria-label={reduce ? 'Technologies, scrollable' : undefined}
      >
        <div className="ticker__track">
          <List />
          <List hidden />
        </div>
      </div>
    </section>
  )
}

export default memo(TechTicker)
