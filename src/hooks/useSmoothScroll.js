import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/*
 * "Gliding on ice" page scroll (Lenis).
 *  - LERP: lower = longer, silkier glide after each wheel/trackpad movement.
 *  - In-page links (#about, #projects, …) glide too. Lenis already honours the page's
 *    `scroll-padding-top` (space for the fixed nav), so no extra offset is added here.
 *  - Touch devices keep native scrolling (Lenis only smooths wheel input by default).
 *  - Skipped entirely for visitors who prefer reduced motion.
 */
const LERP = 0.07
const WHEEL_MULTIPLIER = 0.9
const ANCHOR_OFFSET = 0
const ANCHOR_DURATION = 1.6

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      autoRaf: true,
      lerp: LERP,
      wheelMultiplier: WHEEL_MULTIPLIER,
      anchors: { offset: ANCHOR_OFFSET, duration: ANCHOR_DURATION },
    })
    return () => lenis.destroy()
  }, [enabled])
}
