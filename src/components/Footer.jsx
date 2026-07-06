import React from 'react'
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiArrowUp } from 'react-icons/fi'
import { SiReact, SiVite, SiTailwindcss, SiFramer } from 'react-icons/si'
import { profile } from '../data/content'
import { useTheme, ACCENTS } from './ThemeContext'

const SOCIALS = [
  { icon: FiGithub, href: profile.social.github, label: 'GitHub' },
  { icon: FiLinkedin, href: profile.social.linkedin, label: 'LinkedIn' },
  { icon: FiMail, href: profile.social.email, label: 'Email' },
  { icon: FiTwitter, href: profile.social.twitter, label: 'Twitter' },
]

const STACK = [
  { icon: SiReact, name: 'React' },
  { icon: SiVite, name: 'Vite' },
  { icon: SiTailwindcss, name: 'Tailwind' },
  { icon: SiFramer, name: 'Framer' },
]

const NAV = ['About', 'Work', 'Skills', 'Experience', 'Contact']

export default function Footer() {
  const year = new Date().getFullYear()
  const { accent, setAccent } = useTheme()

  return (
    <footer className="relative z-10 px-4 sm:px-6 lg:px-8 pb-10 pt-4 max-w-site mx-auto">
      <div className="bento p-8 mb-3">
        <div className="grid sm:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <a
              href="#hero"
              className="font-signature text-2xl"
              style={{ color: 'var(--ink)' }}
            >
              farhan
            </a>

            <p
              className="font-mono text-xs mt-3 leading-relaxed"
              style={{ color: 'var(--ghost)' }}
            >
              AI Engineer &amp; Full Stack Developer
              <br />
              from {profile.location}
            </p>

            <div className="flex gap-4 mt-4">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-accent hover:shadow-[0_0_18px_var(--accent)]"
                  style={{ color: 'var(--ghost)' }}
                >
                  <Icon
                    size={18}
                    className="transition-all duration-300 group-hover:text-accent group-hover:drop-shadow-[0_0_10px_var(--accent)]"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="label mb-4">Navigate</p>

            <ul className="space-y-2">
              {NAV.map((n) => (
                <li key={n}>
                  <a
                    href={`#${n.toLowerCase()}`}
                    className="group inline-flex items-center font-mono text-xs transition-all duration-300 hover:text-accent hover:drop-shadow-[0_0_8px_var(--accent)]"
                    style={{ color: 'var(--dim)' }}
                  >
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme + Stack */}
          <div>
            <p className="label mb-4">Accent Theme</p>

            <div className="flex gap-2 mb-6">
              {ACCENTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAccent(a.id)}
                  title={a.label}
                  className="w-5 h-5 rounded-full transition-all hover:scale-125"
                  style={{
                    background: a.color,
                    boxShadow:
                      accent === a.id
                        ? `0 0 0 2px var(--bg),0 0 0 3.5px ${a.color}`
                        : 'none',
                  }}
                />
              ))}
            </div>

            <p className="label mb-3">Built with</p>

            <div className="flex flex-wrap gap-3">
              {STACK.map(({ icon: Icon, name }) => (
                <span
                  key={name}
                  className="flex items-center gap-1.5 font-mono text-[10px]"
                  style={{ color: 'var(--ghost)' }}
                >
                  <Icon size={12} className="text-accent" />
                  {name}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-1 pt-1">
        <p
          className="font-mono text-[10px]"
          style={{ color: 'var(--ghost)' }}
        >
          © {year} {profile.name} — All rights reserved
        </p>

        <p
          className="font-mono text-[10px]"
          style={{ color: 'var(--ghost)' }}
        >
          Designed &amp; Developed by {profile.name.split(' ')[0]}
        </p>

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
          className="group flex items-center gap-1.5 font-mono text-[10px] transition-all duration-300 hover:text-accent"
          style={{ color: 'var(--ghost)' }}
        >
          <FiArrowUp
            size={11}
            className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_var(--accent)]"
          />
          Back to top
        </button>
      </div>
    </footer>
  )
}