import { useEffect, useState } from 'react'

/**
 * True once the intro loader (inline in index.html) starts sliding away — or immediately
 * when there is no loader (already seen this session, reduced-motion fast path, or the
 * gate script is absent). Hero entrance animations wait on this so they play on reveal
 * instead of running unseen behind the loader.
 */
export function useIntroReady() {
  const [ready, setReady] = useState(() => typeof window === 'undefined' || window.__introReady !== false)

  useEffect(() => {
    if (ready) return
    const onStart = () => setReady(true)
    // The loader may have finished between the first render and this effect.
    if (window.__introReady) onStart()
    window.addEventListener('intro:start', onStart)
    return () => window.removeEventListener('intro:start', onStart)
  }, [ready])

  return ready
}
