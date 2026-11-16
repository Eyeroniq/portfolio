import { memo } from 'react'
import './ProjectPreview.css'

/*
 * Animated, illustrated previews — one card type per kind of project (a pipeline, a payment
 * graph, a risk dashboard, a terminal, a chat window, a shop, a storage engine), all in the
 * same visual language: mono labels, hairline surfaces, a mint accent and a gentle loop.
 * They depict the *shape* of each project; labels name its parts, never invented metrics.
 */

/* FlowForge AI — a node pipeline with a pulse travelling along it */
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

/* FraudGraph — a payment crosses the account graph, then one of four decisions lights up */
function Fraud() {
  const accounts = [
    [40, 90],
    [96, 42],
    [96, 138],
    [150, 90],
    [204, 46],
    [204, 134],
  ]
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [3, 5],
    [1, 4],
  ]
  const decisions = ['approve', 'step-up', 'review', 'block']
  return (
    <svg viewBox="0 0 400 180" className="pv-svg pv-fraud" role="presentation">
      <g className="pv-fraud__edges">
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={accounts[a][0]} y1={accounts[a][1]} x2={accounts[b][0]} y2={accounts[b][1]} />
        ))}
        <path className="pv-fraud__out" d="M164 90 H262" />
      </g>
      {accounts.map(([x, y], i) => (
        <circle key={i} className={`pv-fraud__acct${i === 3 ? ' is-payee' : ''}`} cx={x} cy={y} r={i === 3 ? 13 : 9} />
      ))}
      {decisions.map((d, i) => (
        <g key={d} className="pv-fraud__chip" style={{ '--i': i }} transform={`translate(270 ${18 + i * 38})`}>
          <rect width="104" height="26" rx="13" />
          <text x="52" y="17" textAnchor="middle">
            {d}
          </text>
        </g>
      ))}
      <circle className="pv-pulse" r="3.5">
        <animateMotion dur="2.8s" repeatCount="indefinite" path="M40 90 L96 42 L150 90 L262 90" />
      </circle>
    </svg>
  )
}

/* CreditCast — PD / LGD / EAD bars, a sliding risk grade and the decision it leads to */
function Credit() {
  const grades = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B']
  return (
    <div className="pv-credit">
      <div className="pv-credit__head">
        <span className="pv-credit__title">score applicant</span>
        <span className="pv-credit__decision">
          <b className="is-approve">approve</b>
          <b className="is-decline">decline</b>
        </span>
      </div>
      {['PD', 'LGD', 'EAD'].map((k, i) => (
        <div className="pv-credit__row" key={k}>
          <span>{k}</span>
          <i style={{ '--i': i }} />
        </div>
      ))}
      <div className="pv-credit__grades">
        {grades.map((g) => (
          <span key={g}>{g}</span>
        ))}
        <i className="pv-credit__marker" />
      </div>
      <p className="pv-credit__formula">EL = PD × LGD × EAD</p>
    </div>
  )
}

/* SageCLI — English in, one command out, a safety verdict, and nothing runs until "y" */
function Sage() {
  return (
    <div className="pv-term pv-sage">
      <div className="pv-term__bar">
        <i />
        <i />
        <i />
        <span>sage · offline</span>
      </div>
      <div className="pv-term__body">
        <p className="pv-sage__ask">
          <b>$</b> sage <span className="pv-sage__typed">"show the largest files"</span>
        </p>
        <p className="pv-sage__cmd">find . -type f -exec du -h {'{}'} + | sort -rh</p>
        <p className="pv-sage__risk">
          Risk: <em>SAFE</em>
        </p>
        <p className="pv-sage__confirm">
          Run this command? [y/N]
          <span className="pv-caret" />
        </p>
      </div>
    </div>
  )
}

/* AutoChat — a question, the assistant "typing", then an answer with citations */
function Rag() {
  return (
    <div className="pv-chat">
      <div className="pv-chat__bar">
        <span className="pv-chat__dot" />
        <span>autochat</span>
        <span className="pv-chat__docs">
          <i>pdf</i>
          <i>csv</i>
          <i>sheet</i>
        </span>
      </div>
      <div className="pv-chat__msgs">
        <div className="pv-chat__q">
          <span style={{ width: '82%' }} />
          <span style={{ width: '54%' }} />
        </div>
        <div className="pv-chat__a">
          <span className="pv-chat__typing">
            <i />
            <i />
            <i />
          </span>
          <span className="pv-chat__answer">
            <span style={{ width: '92%' }} />
            <span style={{ width: '76%' }} />
            <span className="pv-chat__cites">
              <i>[1]</i>
              <i>[2]</i>
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

/* Super Saint — a product grid; an item flies into the cart and the badge pops */
function Commerce() {
  return (
    <div className="pv-shop">
      <div className="pv-shop__top">
        <span className="pv-shop__logo" />
        <span className="pv-shop__pay">UPI · cards · COD</span>
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
      <span className="pv-shop__fly" />
    </div>
  )
}

/* lsm-tree — writes go to the WAL and memtable, then flush into levels that grow 10x deeper */
function Storage() {
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

const VARIANTS = {
  workflow: Workflow,
  fraud: Fraud,
  credit: Credit,
  sage: Sage,
  rag: Rag,
  commerce: Commerce,
  storage: Storage,
}

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
