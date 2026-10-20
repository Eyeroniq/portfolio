import { useEffect, useRef } from 'react'
import { useFinePointer } from '../hooks/useMediaQuery.js'
import './CustomCursor.css'

// How quickly the trailing ring catches up with the dot (0–1; lower = more glide).
const RING_FOLLOW = 0.18
const INTERACTIVE = 'a, button, [role="button"], [role="link"], input, textarea, select, label, .orb__drag'

/**
 * Mint dot cursor (mouse / trackpad only). The dot sits exactly on the pointer; a soft ring
 * trails behind it and grows over links and buttons. Positions are written straight to
 * `transform` in a rAF loop — no React re-renders while moving.
 */
export default function CustomCursor() {
  const fine = useFinePointer()
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!fine) return
    const root = document.documentElement
    const dot = dotRef.current
    const ring = ringRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    root.classList.add('has-custom-cursor')

    const pos = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let raf = 0
    let visible = false

    const render = () => {
      const k = reduce ? 1 : RING_FOLLOW
      ringPos.x += (pos.x - ringPos.x) * k
      ringPos.y += (pos.y - ringPos.y) * k
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      raf = requestAnimationFrame(render)
    }

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
      pos.x = e.clientX
      pos.y = e.clientY
      if (!visible) {
        // First move after entering: snap the ring so it doesn't fly in from a corner.
        ringPos.x = pos.x
        ringPos.y = pos.y
        visible = true
        root.classList.add('cursor-visible')
      }
      const hovering = e.target instanceof Element && e.target.closest(INTERACTIVE)
      root.classList.toggle('cursor-hover', Boolean(hovering))
    }
    const onLeave = () => {
      visible = false
      root.classList.remove('cursor-visible', 'cursor-hover')
    }
    const onDown = () => root.classList.add('cursor-down')
    const onUp = () => root.classList.remove('cursor-down')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      root.classList.remove('has-custom-cursor', 'cursor-visible', 'cursor-hover', 'cursor-down')
    }
  }, [fine])

  if (!fine) return null
  return (
    <>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  )
}
