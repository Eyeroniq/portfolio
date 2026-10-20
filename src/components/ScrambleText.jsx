import { memo } from 'react'
import { useScramble } from '../hooks/useScramble.js'

/**
 * Decorative "decode" animation for a short label. Isolated in its own component so the
 * per-frame updates never re-render the parent. Hidden from assistive tech — render the
 * real text separately (e.g. in a .visually-hidden span).
 */
function ScrambleText({ text, className, ...options }) {
  const output = useScramble(text, options)
  return (
    <span className={className} aria-hidden="true">
      {output || ' '}
    </span>
  )
}

export default memo(ScrambleText)
