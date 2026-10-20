import { AnimatePresence, motion } from 'motion/react'
import { useScrolled } from '../hooks/useScrolled.js'
import './ScrollIndicator.css'

export default function ScrollIndicator({ target = '#about', ready = true }) {
  const scrolled = useScrolled(40)

  return (
    <AnimatePresence>
      {!scrolled && (
        <motion.a
          href={target}
          className="scroll-indicator"
          aria-label="Scroll to the next section"
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.72 } } : undefined}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
        >
          <span className="mono">scroll to explore</span>
          <span className="scroll-indicator__track" aria-hidden="true">
            <span className="scroll-indicator__thumb" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
