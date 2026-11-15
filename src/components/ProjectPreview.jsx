import { memo } from 'react'
import './ProjectPreview.css'

/*
 * Abstract, illustrated previews used until real screenshots are added.
 * They depict the *shape* of each project (a pipeline, a terminal, a board, a store)
 * with skeleton content — no fake data, metrics, or UI copy.
 */

function Workflow() {
  const nodes = [
    { x: 24, y: 70, label: 'Gmail' },
    { x: 124, y: 70, label: 'FastAPI' },
    { x: 224, y: 30, label: 'Celery' },
    { x: 224, y: 110, label: 'Redis' },
    { x: 324, y: 70, label: 'LLM' },
  ]
  return (
    <svg viewBox="0 0 400 180" className="pv-svg" role="presentation">
      <g className="pv-wires">
        <path d="M84 85 H124" />
        <path d="M184 85 C204 85 204 45 224 45" />
        <path d="M184 85 C204 85 204 125 224 125" />
        <path d="M284 45 C304 45 304 85 324 85" />
        <path d="M284 125 C304 125 304 85 324 85" />
      </g>
      {nodes.map((n) => (
        <g key={n.label} className="pv-node" transform={`translate(${n.x} ${n.y})`}>
          <rect width="60" height="30" rx="8" />
          <text x="30" y="19.5" textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
      <circle className="pv-pulse" r="3.5">
        <animateMotion
          dur="3.2s"
          repeatCount="indefinite"
          path="M84 85 H124 M184 85 C204 85 204 45 224 45 M284 45 C304 45 304 85 324 85"
        />
      </circle>
    </svg>
  )
}

function Terminal() {
  return (
    <div className="pv-term">
      <div className="pv-term__bar">
        <i />
        <i />
        <i />
        <span>sage</span>
      </div>
      <div className="pv-term__body">
        <p>
          <b>$</b> sage
          <span className="pv-caret" />
        </p>
        <span className="pv-line" style={{ width: '62%' }} />
        <span className="pv-line pv-line--accent" style={{ width: '38%' }} />
        <span className="pv-line" style={{ width: '74%' }} />
        <span className="pv-line" style={{ width: '51%' }} />
        <span className="pv-line pv-line--dim" style={{ width: '66%' }} />
      </div>
    </div>
  )
}

function Board() {
  const cols = [3, 2, 2]
  return (
    <div className="pv-board">
      <div className="pv-board__top">
        <span className="pv-live">
          <i /> live
        </span>
        <span className="pv-avatars">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="pv-board__cols">
        {cols.map((count, c) => (
          <div className="pv-col" key={c}>
            <span className="pv-col__head" />
            {Array.from({ length: count }, (_, i) => (
              <span className={`pv-card ${c === 1 && i === 0 ? 'is-moving' : ''}`} key={i}>
                <span />
                <span />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Shop() {
  return (
    <div className="pv-shop">
      <div className="pv-shop__top">
        <span className="pv-shop__logo" />
        <span className="pv-shop__cart">
          <i />
        </span>
      </div>
      <div className="pv-shop__grid">
        {[0, 1, 2, 3].map((i) => (
          <span className="pv-product" key={i}>
            <span className="pv-product__img" />
            <span className="pv-product__line" />
            <span className="pv-product__line pv-product__line--short" />
          </span>
        ))}
      </div>
    </div>
  )
}

function Storage() {
  // memtable + WAL on top, then levels that grow 10x deeper down (L0, L1, L2)
  const levels = [
    { y: 92, n: 2, label: 'L0' },
    { y: 118, n: 4, label: 'L1' },
    { y: 144, n: 8, label: 'L2' },
  ]
  return (
    <svg viewBox="0 0 400 180" className="pv-svg pv-storage" role="presentation">
      <g className="pv-node pv-storage__mem" transform="translate(150 22)">
        <rect width="100" height="30" rx="8" />
        <text x="50" y="19.5" textAnchor="middle">
          memtable
        </text>
      </g>
      <g className="pv-node" transform="translate(40 22)">
        <rect width="70" height="30" rx="8" />
        <text x="35" y="19.5" textAnchor="middle">
          WAL
        </text>
      </g>
      <g className="pv-wires">
        <path d="M110 37 H150" />
        <path d="M200 52 V88" />
      </g>
      {levels.map((lvl) => (
        <g key={lvl.label} className="pv-storage__level">
          <text className="pv-storage__label" x="40" y={lvl.y + 12}>
            {lvl.label}
          </text>
          {Array.from({ length: lvl.n }, (_, i) => {
            const w = (300 - 4 * (lvl.n - 1)) / lvl.n
            return <rect key={i} x={70 + i * (w + 4)} y={lvl.y} width={w} height="16" rx="3" />
          })}
        </g>
      ))}
      <circle className="pv-pulse" r="3.5">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M110 37 H150 M200 52 V88" />
      </circle>
    </svg>
  )
}

const VARIANTS = { workflow: Workflow, terminal: Terminal, board: Board, shop: Shop, storage: Storage }

function ProjectPreview({ variant }) {
  const Variant = VARIANTS[variant] ?? Workflow
  return (
    <div className={`pv pv--${variant}`} aria-hidden="true">
      <div className="pv__grid" />
      <Variant />
    </div>
  )
}

export default memo(ProjectPreview)
