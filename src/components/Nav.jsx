import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, ArrowUpRight, Download, Mail } from 'lucide-react'
import { nav as allNav, profile, links, showExperience } from '../data/portfolio.js'
import { useScrolled } from '../hooks/useScrolled.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { usePastHero } from '../hooks/usePastHero.js'
import { useIntroReady } from '../hooks/useIntroReady.js'
import './Nav.css'

const ease = [0.22, 1, 0.36, 1]

// Experience stays out of the menu until it has real entries (see portfolio.js).
const nav = allNav.filter((item) => item.href !== '#experience' || showExperience)

export default function Nav() {
  const scrolled = useScrolled(24)
  // Over the white sections the bar flips to a light treatment.
  const light = usePastHero(64)
  const introReady = useIntroReady()
  const active = useActiveSection(nav.map((item) => item.href.slice(1)))
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  // Lock scroll, close on Escape, and keep focus inside the open menu.
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const first = panelRef.current?.querySelector('a')
    first?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll('a')]
        const idx = focusables.indexOf(document.activeElement)
        const next = e.shiftKey ? idx - 1 : idx + 1
        if (next < 0 || next >= focusables.length) {
          e.preventDefault()
          focusables[next < 0 ? focusables.length - 1 : 0].focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 900px)')
    const onChange = (e) => e.matches && setOpen(false)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''} ${light && !open ? 'is-light' : ''} ${open ? 'is-open' : ''}`}
        initial={{ opacity: 0, y: -16 }}
        animate={introReady ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0, ease }}
      >
        <div className="nav__inner container container--bleed">
          <a className="nav__brand" href="#top" aria-label={`${profile.name} — back to top`}>
            <span className="nav__brand-name">{profile.monogram}</span>
            <span className="nav__brand-dot" aria-hidden="true" />
          </a>

          <nav className="nav__links" aria-label="Primary">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={active === item.href.slice(1) ? 'is-active' : undefined}
                    aria-current={active === item.href.slice(1) ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__end">
            {profile.available && (
              <a className="nav__status" href="#contact" aria-label={`${profile.availabilityLabel} — get in touch`}>
                <span className="dot dot--pulse" aria-hidden="true" />
                <span className="mono nav__status-full">{profile.availabilityLabel}</span>
                <span className="mono nav__status-short" aria-hidden="true">
                  Available
                </span>
              </a>
            )}
            <button
              ref={toggleRef}
              className="nav__toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            className="nav__panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <nav aria-label="Mobile">
              <ul className="nav__panel-links">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.06, ease }}
                  >
                    <a href={item.href} onClick={() => setOpen(false)}>
                      <span className="mono">0{i + 1}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="nav__panel-foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              {profile.available && (
                <span className="nav__panel-status">
                  <span className="dot dot--pulse" aria-hidden="true" />
                  <span className="mono">{profile.availabilityLabel}</span>
                </span>
              )}
              {/* CV is always one tap away on mobile: a real download once links.cv is set,
                  otherwise an honest "Request CV" email. */}
              {links.cv ? (
                <a className="nav__panel-cv" href={links.cv} download onClick={() => setOpen(false)}>
                  <Download size={17} aria-hidden="true" />
                  Download CV
                </a>
              ) : (
                <a
                  className="nav__panel-cv"
                  href={`mailto:${links.email}?subject=CV%20request`}
                  onClick={() => setOpen(false)}
                >
                  <Mail size={17} aria-hidden="true" />
                  Request CV
                </a>
              )}
              <a className="nav__panel-mail" href={`mailto:${links.email}`} onClick={() => setOpen(false)}>
                {links.email}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
