import { useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query. Returns false during SSR / unsupported envs. */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** True for mouse / trackpad users — pointer-driven effects are gated on this. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
