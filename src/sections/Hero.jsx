import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowUpRight, Download, Mail } from 'lucide-react'
import { profile, links } from '../data/portfolio.js'
import { useFinePointer } from '../hooks/useMediaQuery.js'
import { useIntroReady } from '../hooks/useIntroReady.js'
import { listenForTouchTap } from '../hooks/useTouchTap.js'
import ScrambleText from '../components/ScrambleText.jsx'
import Button from '../components/Button.jsx'
import RevealLens from '../components/RevealLens.jsx'
import FloatingOrbs from '../components/FloatingOrbs.jsx'
import ScrollIndicator from '../components/ScrollIndicator.jsx'
import portrait960 from '../assets/portrait-960.webp'
import portrait1672 from '../assets/portrait-1672.webp'
import reveal960 from '../assets/reveal-960.webp'
import reveal1672 from '../assets/reveal-1672.webp'
import './Hero.css'

const ease = [0.22, 1, 0.36, 1]
const SIZES = '(max-width: 899px) 220vw, 135vw'
// Keeps the face in frame on every aspect ratio. Shared by portrait + lens so they align.
const OBJECT_POSITION = '51% 22%'

// Remembers that a touch visitor has tapped the portrait, so the "tap" hint isn't shown again.
const HINT_KEY = 'dheeraj:portrait-tapped'
const readHintSeen = () => {
  try {
    return localStorage.getItem(HINT_KEY) === '1'
  } catch {
    return false
  }
}

/*
 * Entrance sequence — each step fades + slides up, 120ms after the previous one.
 * Last step starts at 5 × STEP and runs RISE seconds, so the copy settles in < 1s.
 * Until `go` (intro loader gone) every element holds its initial state.
 */
const STEP = 0.12
const RISE = 0.36
const SEQ = { intro: 0, name: STEP, role: STEP * 2, tagline: STEP * 3, actions: STEP * 4, hint: STEP * 5 }

const rise = (delay, go) => ({
  initial: { opacity: 0, y: 16 },
  animate: go ? { opacity: 1, y: 0 } : undefined,
  transition: { duration: RISE, delay, ease },
})

export default function Hero() {
  const areaRef = useRef(null)
  const finePointer = useFinePointer()
  const reduce = useReducedMotion()
  // Hold the entrance until the intro loader slides away; all delays below count from then.
  const go = useIntroReady()
  const [portraitFailed, setPortraitFailed] = useState(false)
  const [hintSeen, setHintSeen] = useState(readHintSeen)

  // First real *tap* on the portrait (touch only, not on a link/button) retires the hint for
  // good. A scroll that merely starts on the hero is not a tap (see listenForTouchTap).
  useEffect(() => {
    const area = areaRef.current
    if (!area || hintSeen) return
    return listenForTouchTap(area, () => {
      setHintSeen(true)
      try {
        localStorage.setItem(HINT_KEY, '1')
      } catch {
        /* storage blocked — the hint just hides for this visit */
      }
    })
  }, [hintSeen])
  const showHint = finePointer || !hintSeen

  const name = profile.name.toUpperCase()

  /*
   * "hover / tap the portrait" hint. Always rendered, so its box never disappears: once
   * retired it only fades out (removing it changed the hero's height mid-scroll on phones).
   * Two placements: inline under the buttons (tablet / desktop), and pinned to the top of the
   * photo on phones — CSS shows exactly one of them.
   */
  const hint = (placement) => (
    <motion.p
      className={`hero__hint hero__hint--${placement}${showHint ? '' : ' is-retired'}`}
      aria-hidden={showHint ? undefined : 'true'}
      initial={{ opacity: 0, y: 16 }}
      animate={go ? { opacity: showHint ? 1 : 0, y: 0 } : undefined}
      transition={{ duration: showHint ? RISE : 0.35, delay: showHint ? SEQ.hint : 0, ease }}
    >
      <span className="hero__hint-pill">
        <span className="dot" aria-hidden="true" />
        <span className="mono">{finePointer ? 'hover the portrait' : 'tap the portrait'}</span>
      </span>
    </motion.p>
  )

  return (
    <section id="top" className="hero" ref={areaRef} aria-labelledby="hero-title">
      <div className="hero__media">
        {portraitFailed ? (
          <div className="hero__placeholder" role="img" aria-label="Portrait placeholder">
            <span className="mono">add your portrait → src/assets/portrait-1672.webp</span>
          </div>
        ) : (
          /* The plate covers the whole hero and overhangs the right edge (see --media-overscan). */
          <motion.div
            className="hero__plate"
            initial={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
            animate={go ? { opacity: 1, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } } : undefined}
            transition={{ duration: 1, ease }}
          >
            <img
              className="hero__portrait"
              src={portrait1672}
              srcSet={`${portrait960} 960w, ${portrait1672} 1672w`}
              sizes={SIZES}
              alt={`Portrait of ${profile.fullName} holding an open book`}
              fetchPriority="high"
              decoding="async"
              style={{ objectPosition: OBJECT_POSITION }}
              onError={() => setPortraitFailed(true)}
            />
          </motion.div>
        )}
        <div className="hero__shade" aria-hidden="true" />
        {!portraitFailed && (
          <RevealLens
            areaRef={areaRef}
            src={reveal1672}
            srcSet={`${reveal960} 960w, ${reveal1672} 1672w`}
            sizes={SIZES}
            objectPosition={OBJECT_POSITION}
          />
        )}
        {/* Badges live inside the photo block so on phones they stay anchored to the image. */}
        <FloatingOrbs areaRef={areaRef} enabled={finePointer} ready={go} />
        {hint('top')}
        {/* Labelled CV badge beside the portrait on phones — only once a real PDF is set. */}
        {links.cv && (
          <motion.a
            className="hero__cv-badge"
            href={links.cv}
            download
            aria-label="Download CV (PDF)"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={go ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.5, delay: SEQ.hint, ease }}
          >
            <span className="hero__cv-badge-circle" aria-hidden="true">
              CV
            </span>
            <span className="hero__cv-badge-label">Résumé</span>
          </motion.a>
        )}
      </div>

      <div className="hero__content container container--bleed">
        <div className="hero__copy">
          {/* Heading group — on phones this becomes the white band above the photo */}
          <div className="hero__heading">
            <motion.p className="hero__intro" {...rise(SEQ.intro, go)}>
              <span className="dot" aria-hidden="true" />
              <span className="mono">{profile.intro}</span>
            </motion.p>

            {/* The name moves as one piece — no per-letter clipping boxes behind it. */}
            <motion.h1 className="hero__title" id="hero-title" {...rise(SEQ.name, go)}>
              {/* The heading's real text is the full name; the big "DHEERAJ." is its visual form. */}
              <span className="visually-hidden">{profile.fullName}</span>
              <span className="hero__title-band" aria-hidden="true">
                {name}
                <motion.span
                  className="hero__title-dot"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={go ? { scale: 1, opacity: 1 } : undefined}
                  transition={{ type: 'spring', stiffness: 320, damping: 16, delay: SEQ.name + RISE * 0.6 }}
                />
              </span>
            </motion.h1>
          </div>

          {/* Details group — on phones this sits below the photo */}
          <div className="hero__details">
            <motion.p className="hero__role" {...rise(SEQ.role, go)}>
              <motion.span
                className="hero__role-line"
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={go ? { scaleX: 1 } : undefined}
                transition={{ duration: RISE, delay: SEQ.role + 0.08, ease }}
              />
              <span className="visually-hidden">{profile.role}</span>
              <ScrambleText
                className="hero__role-text"
                text={profile.role.toUpperCase()}
                delay={(SEQ.role + 0.08) * 1000}
                duration={560}
                enabled={!reduce}
                start={go}
              />
            </motion.p>

            <motion.p className="hero__tagline" {...rise(SEQ.tagline, go)}>
              {/* Phones show the short two-line version; everything else the full sentence. */}
              <span className="hero__tagline-full">{profile.tagline}</span>
              <span className="hero__tagline-short">{profile.taglineShort}</span>
            </motion.p>

            <motion.div className="hero__actions" {...rise(SEQ.actions, go)}>
              <Button href="#projects" variant="primary" icon={ArrowDown}>
                View Projects
              </Button>
              <Button href="#contact" icon={ArrowUpRight} className="hero__contact">
                Get in Touch
              </Button>
              {/* A real download once links.cv points at a PDF; until then an honest "Request CV" email. */}
              {links.cv ? (
                <Button href={links.cv} icon={Download} className="hero__cv" download>
                  Download CV
                </Button>
              ) : (
                <Button href={`mailto:${links.email}?subject=CV%20request`} icon={Mail} className="hero__cv">
                  Request CV
                </Button>
              )}
            </motion.div>

            {hint('inline')}
          </div>
        </div>
      </div>

      <ScrollIndicator target="#about" ready={go} />
    </section>
  )
}
