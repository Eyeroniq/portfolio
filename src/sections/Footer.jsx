import { ArrowUp, Mail } from 'lucide-react'
import { links, profile } from '../data/portfolio.js'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons.jsx'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = [
    { label: 'Email', href: `mailto:${links.email}`, icon: Mail },
    { label: 'GitHub', href: links.github, icon: GithubIcon },
    { label: 'LinkedIn', href: links.linkedin, icon: LinkedinIcon },
  ].filter((s) => s.href)

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a className="footer__brand" href="#top" aria-label="Back to top">
          {profile.monogram}
          <span aria-hidden="true" />
        </a>

        <p className="footer__copy mono">
          © {year} {profile.name.toLowerCase()} · built with react
        </p>

        <div className="footer__end">
          <ul className="footer__socials">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <a className="footer__top" href="#top" aria-label="Back to top">
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
