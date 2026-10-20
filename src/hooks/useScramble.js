import { useEffect, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_#'

/**
 * Decodes `text` from random glyphs into the final string, left to right.
 * Returns the final text immediately when reduced motion is requested.
 * Nothing runs until `start` is true (the delay counts from then).
 */
export function useScramble(text, { delay = 0, duration = 900, enabled = true, start = true } = {}) {
  const [output, setOutput] = useState(enabled ? '' : text)

  useEffect(() => {
    if (!enabled) {
      setOutput(text)
      return
    }
    if (!start) return
    let raf = 0
    let t0 = 0
    const tick = (now) => {
      if (!t0) t0 = now
      const progress = Math.min(1, (now - t0) / duration)
      const settled = Math.floor(progress * text.length)
      let next = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (i < settled || ch === ' ') next += ch
        else next += GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setOutput(next)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [text, delay, duration, enabled, start])

  return output
}
