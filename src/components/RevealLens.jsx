import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { listenForTouchTap } from '../hooks/useTouchTap.js'
import './RevealLens.css'

/**
 * A circular lens that follows the pointer and reveals `src` (the illustrated
 * version of the portrait) through a clip-path. The revealed image shares the
 * exact box + object-fit of the portrait underneath, so the two line up 1:1.
 *
 * - Mouse / pen: lens follows hover anywhere inside `areaRef`.
 * - Touch: tapping the portrait opens the lens briefly at the tap point.
 */
export default function RevealLens({ areaRef, src, srcSet, sizes, objectPosition }) {
  const boxRef = useRef(null)
  const reduce = useReducedMotion()
  const radius = useRef(140)

  const x = useMotionValue(-999)
  const y = useMotionValue(-999)
  const target = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.5 })
  const springR = useSpring(target, { stiffness: 170, damping: 22, mass: 0.7 })
  // Reduced motion: the lens tracks the pointer directly, with no easing.
  const sx = reduce ? x : springX
  const sy = reduce ? y : springY
  const r = reduce ? target : springR

  const clipPath = useMotionTemplate`circle(${r}px at ${sx}px ${sy}px)`
  const ringScale = useTransform(r, (v) => v / radius.current)
  const ringOpacity = useTransform(r, [0, 30], [0, 1])

  useEffect(() => {
    const area = areaRef.current
    const box = boxRef.current
    if (!area || !box) return

    let hideTimer
    const setRadius = () => {
      radius.current = Math.round(Math.min(132, Math.max(80, window.innerWidth * 0.082)))
      box.style.setProperty('--lens-r', `${radius.current}px`)
    }
    setRadius()

    const place = (e, jump) => {
      const rect = box.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      if (jump) {
        // Start from the pointer instead of sliding in from the last position.
        springX.jump(px)
        springY.jump(py)
      }
      x.set(px)
      y.set(py)
    }

    const onEnter = (e) => {
      if (e.pointerType === 'touch') return
      place(e, true)
      target.set(radius.current)
    }
    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      if (target.get() === 0) {
        place(e, true)
        target.set(radius.current)
      } else place(e)
    }
    const onLeave = (e) => {
      if (e.pointerType === 'touch') return
      target.set(0)
    }
    // Touch: open the lens only on a genuine tap — never when a scroll starts on the hero.
    const onTap = (e) => {
      clearTimeout(hideTimer)
      place(e, true)
      target.set(radius.current * 0.85)
      hideTimer = setTimeout(() => target.set(0), 1600)
    }

    area.addEventListener('pointerenter', onEnter)
    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerleave', onLeave)
    const stopTap = listenForTouchTap(area, onTap)
    window.addEventListener('resize', setRadius)
    return () => {
      clearTimeout(hideTimer)
      area.removeEventListener('pointerenter', onEnter)
      area.removeEventListener('pointermove', onMove)
      area.removeEventListener('pointerleave', onLeave)
      stopTap()
      window.removeEventListener('resize', setRadius)
    }
  }, [areaRef, x, y, springX, springY, target])

  return (
    <div className="lens" ref={boxRef} aria-hidden="true">
      <motion.div className="lens__reveal" style={{ clipPath, WebkitClipPath: clipPath }}>
        {/* Same offset as the hero photo plate, so the reveal lines up 1:1. */}
        <div className="lens__plate">
          <img
            className="lens__img"
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt=""
            decoding="async"
            fetchPriority="low"
            style={{ objectPosition }}
            onError={(e) => {
              e.currentTarget.closest('.lens__reveal').style.display = 'none'
            }}
          />
        </div>
        <div className="lens__tint" />
      </motion.div>
      <motion.div className="lens__ring" style={{ x: sx, y: sy, scale: ringScale, opacity: ringOpacity }}>
        <span className="lens__core" />
      </motion.div>
    </div>
  )
}
