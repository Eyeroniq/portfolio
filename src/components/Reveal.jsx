import { motion } from 'motion/react'

/** Fades + lifts its children into view once. Used for section-level entrances. */
export default function Reveal({ as = 'div', delay = 0, y = 24, children, ...props }) {
  const Component = motion[as]
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  )
}
