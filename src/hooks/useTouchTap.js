/**
 * Calls `onTap` for a genuine touch *tap* on `el` — finger down and up again without moving —
 * and never for the start of a scroll or swipe.
 *
 * Reacting to `pointerdown` instead would fire on every scroll gesture that happens to begin
 * on the element, which is what made the hero hint and lens jump while scrolling on phones.
 * When the browser takes over a touch for scrolling it sends `pointercancel`, so a scroll
 * never produces a tap.
 *
 * Returns a cleanup function.
 */
const MAX_MOVE = 10 // px the finger may drift and still count as a tap
const MAX_TIME = 600 // ms between down and up

export function listenForTouchTap(el, onTap) {
  let start = null

  const onDown = (e) => {
    if (e.pointerType !== 'touch' || !e.isPrimary) return
    // Taps on links / buttons inside the area belong to those controls.
    if (e.target.closest('a, button, [role="link"], [role="button"]')) return
    start = { id: e.pointerId, x: e.clientX, y: e.clientY, t: e.timeStamp }
  }
  const onUp = (e) => {
    if (!start || e.pointerId !== start.id) return
    const moved = Math.hypot(e.clientX - start.x, e.clientY - start.y)
    const quick = e.timeStamp - start.t <= MAX_TIME
    start = null
    if (moved <= MAX_MOVE && quick) onTap(e)
  }
  const onCancel = () => {
    start = null
  }

  el.addEventListener('pointerdown', onDown)
  el.addEventListener('pointerup', onUp)
  el.addEventListener('pointercancel', onCancel)
  return () => {
    el.removeEventListener('pointerdown', onDown)
    el.removeEventListener('pointerup', onUp)
    el.removeEventListener('pointercancel', onCancel)
  }
}
