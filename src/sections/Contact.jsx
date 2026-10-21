import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { links, profile, showExperience } from '../data/portfolio.js'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons.jsx'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import avatar480 from '../assets/avatar-480.webp'
import avatar960 from '../assets/avatar-960.webp'
import './Contact.css'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  // Tap (phones) toggles the mint reveal on the photo; desktop uses :hover.
  const [tinted, setTinted] = useState(false)
  const tintTimer = useRef(0)
  const toggleTint = () => {
    setTinted((v) => !v)
    clearTimeout(tintTimer.current)
    tintTimer.current = setTimeout(() => setTinted(false), 2400)
  }
  useEffect(() => () => clearTimeout(tintTimer.current), [])
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${links.email}`
    }
  }

  const socials = [
    { label: 'GitHub', href: links.github, icon: GithubIcon },
    { label: 'LinkedIn', href: links.linkedin, icon: LinkedinIcon },
  ]

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__inner">
        {/* Circular portrait: large beside the copy on desktop, small beside the heading on
            phones. Hover / tap reveals the mint-tinted version, like the earlier lens. */}
        <Reveal className={`contact__visual${tinted ? ' is-tinted' : ''}`} delay={0.2} y={0} onClick={toggleTint}>
          <span className="contact__orbit contact__orbit--outer" aria-hidden="true" />
          <span className="contact__orbit" aria-hidden="true" />
          <span className="contact__orb">
            <img
              className="contact__orb-img"
              src={avatar960}
              srcSet={`${avatar480} 480w, ${avatar960} 960w`}
              sizes="(max-width: 1099px) 132px, 420px"
              width="960"
              height="960"
              alt={`${profile.fullName}`}
              loading="lazy"
              decoding="async"
            />
            <span className="contact__orb-tint" aria-hidden="true">
              <img
                className="contact__orb-img"
                src={avatar960}
                srcSet={`${avatar480} 480w, ${avatar960} 960w`}
                sizes="(max-width: 1099px) 132px, 420px"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
          </span>
        </Reveal>
        <Reveal>
          <p className="contact__label mono">
            <span className="section-heading__index">{showExperience ? '05' : '04'}</span>
            <span className="section-heading__rule" aria-hidden="true" />
            contact
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="contact__title" id="contact-title">
            Have a problem worth <span className="contact__accent">automating?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="contact__lead">
            I’m open to roles, freelance projects, and collaborations around AI products and backend systems. The
            fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="contact__mail-row">
          <a className="contact__mail" href={`mailto:${links.email}`}>
            <Mail size={22} aria-hidden="true" />
            <span>{links.email}</span>
            <ArrowUpRight className="contact__mail-arrow" size={22} aria-hidden="true" />
          </a>
          <button type="button" className="contact__copy" onClick={copyEmail} aria-label="Copy email address">
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            <span className="mono">{copied ? 'copied' : 'copy'}</span>
          </button>
          <span className="visually-hidden" role="status" aria-live="polite">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </Reveal>

        <Reveal delay={0.2} className="contact__actions">
          <Button href={`mailto:${links.email}`} variant="solid" icon={ArrowUpRight}>
            Send an email
          </Button>
          {/* Profiles appear only once a real URL is set in portfolio.js */}
          {socials
            .filter(({ href }) => href)
            .map(({ label, href, icon }) => (
              <Button
                key={label}
                href={href}
                variant="outline"
                icon={icon}
                iconPosition="start"
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${label} (opens in a new tab)`}
              >
                {label}
              </Button>
            ))}
        </Reveal>

        {profile.available && (
          <Reveal delay={0.25}>
            <p className="contact__status">
              <span className="dot dot--pulse" aria-hidden="true" />
              <span className="mono">{profile.availabilityLabel.toLowerCase()}</span>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
