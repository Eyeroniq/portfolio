import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import ai from '../assets/orbs/ai.webp'
import fastapi from '../assets/orbs/fastapi.webp'
import postgres from '../assets/orbs/postgres.webp'
import react from '../assets/orbs/react.webp'
import python from '../assets/orbs/python.webp'
import './FloatingOrbs.css'

// Desktop: every badge sits on ONE circular orbit around the portrait (see FloatingOrbs.css),
// evenly spaced every 30° along its right-hand arc (−60° … 60°) — the left side is the
// headline, the top is the nav and the crown of the hair, the bottom is the book and the
// scroll cue. `angle` is in degrees, clockwise from 3 o'clock.
// All badges share one parallax amount, so the ring moves as one and never drifts off-circle.
// `mobile: false` hides a badge on phones/tablets (two per side there, placed by the stacked
// media query). `label` shows beneath it on small screens.
const ORBS = [
  { id: 'python', label: 'Python', src: python, size: 72, angle: -60, mobile: true },
  { id: 'fastapi', label: 'FastAPI', src: fastapi, size: 72, angle: -30, mobile: true },
  { id: 'ai', label: 'AI · LLMs', src: ai, size: 72, angle: 0, mobile: true },
  { id: 'react', label: 'React', src: react, size: 72, angle: 30, mobile: true },
  { id: 'postgres', label: 'PostgreSQL', src: postgres, size: 72, angle: 60, mobile: false },
]

// Shared pointer parallax (px of travel at the edge of the hero)
const PARALLAX_X = 20
const PARALLAX_Y = 14

// Touch / drag: badges can be grabbed and flung; on release they spring back home with a
// little overshoot. Lower stiffness / damping = looser, bouncier return.
const DRAG_ELASTIC = 0.55
const SPRING_BACK = { bounceStiffness: 320, bounceDamping: 11 }

function Orb({ orb, px, py, index, ready }) {
  const x = useTransform(px, (v) => v * PARALLAX_X)
  const y = useTransform(py, (v) => v * PARALLAX_Y)
  const [dragging, setDragging] = useState(false)

  return (
    <motion.div
      className={`orb orb--${orb.id}${orb.mobile ? '' : ' orb--desktop'}${dragging ? ' is-dragging' : ''}`}
      style={{ '--size': `${orb.size}px`, '--a': `${orb.angle}deg`, x, y }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={ready ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5, delay: 0.36 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Staggered start so the five badges never bob in unison */}
      <div
        className="orb__float"
        style={{ '--float-delay': `${-index * 0.8}s`, '--jiggle-delay': `${-index * 1.3}s` }}
      >
        {/* Grab, drag and fling; it bounces back to its place when let go */}
        <motion.div
          className="orb__drag"
          drag
          dragSnapToOrigin
          dragElastic={DRAG_ELASTIC}
          dragTransition={SPRING_BACK}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 1.14 }}
          whileDrag={{ scale: 1.16 }}
          transition={{ type: 'spring', stiffness: 420, damping: 14 }}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
        >
          <span className="orb__orbit" />
          <img
            className="orb__img"
            src={orb.src}
            alt=""
            width={orb.size}
            height={orb.size}
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <span className="orb__label">{orb.label}</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

/** Circular tech badges on one orbit that drifts gently with the pointer. */
export default function FloatingOrbs({ areaRef, enabled, ready = true }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.8 })
  const py = useSpring(my, { stiffness: 60, damping: 18, mass: 0.8 })

  useEffect(() => {
    const area = areaRef.current
    if (!area || !enabled || reduce) return
    let frame = 0
    const onMove = (e) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = area.getBoundingClientRect()
        mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
        my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
      })
    }
    const onLeave = () => {
      mx.set(0)
      my.set(0)
    }
    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
    }
  }, [areaRef, enabled, reduce, mx, my])

  return (
    <div className="orbs" aria-hidden="true">
      <span className="orbs__ring" />
      {ORBS.map((orb, i) => (
        <Orb key={orb.id} orb={orb} px={px} py={py} index={i} ready={ready} />
      ))}
    </div>
  )
}
