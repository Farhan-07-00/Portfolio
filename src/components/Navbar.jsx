import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useTheme, ACCENTS } from './ThemeContext'
import { profile } from '../data/content'

const NAV = [
  { label: 'About',      href: '#about'          },
  { label: 'Work',       href: '#projects'        },
  { label: 'Skills',     href: '#skills'          },
  { label: 'Experience', href: '#experience'      },
  { label: 'Contact',    href: '#contact'         },
]

export default function Navbar() {
  const { mode, toggleMode, accent, setAccent } = useTheme()
  const [active,      setActive]      = useState('')
  const [open,        setOpen]        = useState(false)
  const [showPicker,  setShowPicker]  = useState(false)
  const [scrolled,    setScrolled]    = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
      let cur = ''
      NAV.forEach(l => {
        const el = document.querySelector(l.href)
        if (el && el.getBoundingClientRect().top < 160) cur = l.href
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-6 pt-4">

      {/* ── FLOATING PILL NAVBAR ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[900px] flex items-center justify-between px-6 py-3 rounded-[50px]"
        style={{
          background: scrolled ? 'rgba(8,10,24,0.92)' : 'rgba(10,12,28,0.85)',
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 4px 24px rgba(0,0,0,0.4)',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      >
        {/* LEFT — signature logo */}
        <a href="#hero" className="font-signature text-2xl select-none"
          style={{ color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1 }}>
          farhan
        </a>

        {/* CENTER — nav links (desktop) */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV.map(l => (
            <li key={l.href}>
              <a href={l.href}
                className="relative text-sm font-medium transition-colors"
                style={{ color: active === l.href ? 'var(--ink)' : 'var(--dim)' }}
                onMouseEnter={e => { if (active !== l.href) e.currentTarget.style.color = 'var(--ink)' }}
                onMouseLeave={e => { if (active !== l.href) e.currentTarget.style.color = 'var(--dim)' }}
              >
                {l.label}
                {active === l.href && (
                  <motion.span layoutId="nav-pill"
                    className="absolute -bottom-0.5 left-0 right-0 h-px rounded-full"
                    style={{ background: 'var(--accent)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT — controls */}
        <div className="flex items-center gap-2">
          {/* accent picker */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowPicker(p => !p)}
              className="w-5 h-5 rounded-full border border-white/20 hover:scale-110 transition-transform"
              style={{ background: 'var(--accent)' }}
              aria-label="Accent colour"
            />
            <AnimatePresence>
              {showPicker && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-8 rounded-2xl p-3 flex gap-2"
                  style={{ background: 'var(--surface)', border: '1px solid var(--line)', zIndex: 60 }}
                >
                  {ACCENTS.map(a => (
                    <button key={a.id}
                      onClick={() => { setAccent(a.id); setShowPicker(false) }}
                      title={a.label}
                      className="w-5 h-5 rounded-full transition-transform hover:scale-125"
                      style={{
                        background: a.color,
                        boxShadow: accent === a.id ? `0 0 0 2px var(--card), 0 0 0 3px ${a.color}` : 'none',
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* theme toggle */}
          <button onClick={toggleMode} aria-label="Toggle theme"
            className="p-2 rounded-full transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--dim)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {mode === 'dark' ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>

          {/* resume */}
          <a href={profile.resumeUrl} download
            className="hidden md:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all hover:scale-[1.02]"
            style={{
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'var(--ink)',
              background: 'rgba(255,255,255,0.05)',
            }}>
            Resume <span className="text-xs">↓</span>
          </a>

          {/* profile avatar with glow ring */}
          <div className="hidden md:block relative">
            <div className="w-10 h-10 rounded-full p-[2px]"
              style={{
                background: 'conic-gradient(from 180deg, #3b82f6, #8b5cf6, #f97316, #3b82f6)',
                boxShadow: '0 0 16px rgba(59,130,246,0.5)',
              }}>
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
                style={{ background: 'var(--surface)' }}>
                {/* 
                  ── Replace this with <img> once you have your photo:
                  <img src="/assets/profile.jpg" alt="Farhan" className="w-full h-full object-cover" />
                */}
                <img src="public/assets/profile2.jpg.png" alt="Farhan" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </div>

          {/* mobile menu toggle */}
          <button className="md:hidden p-2 rounded-full transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--dim)' }}
            onClick={() => setOpen(o => !o)}
            aria-label="Menu">
            {open ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="absolute top-[72px] left-4 right-4 rounded-[24px] p-5 flex flex-col gap-4"
            style={{ background: 'rgba(8,10,24,0.96)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(20px)' }}
          >
            {NAV.map(l => (
              <a key={l.href} href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium transition-colors"
                style={{ color: active === l.href ? 'var(--accent)' : 'var(--dim)' }}>
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: 'var(--line)' }}>
              <button onClick={toggleMode}
                className="p-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--dim)' }}>
                {mode === 'dark' ? <FiSun size={13} /> : <FiMoon size={13} />}
              </button>
              {ACCENTS.map(a => (
                <button key={a.id} onClick={() => setAccent(a.id)}
                  className="w-5 h-5 rounded-full hover:scale-110 transition-transform"
                  style={{ background: a.color, boxShadow: accent === a.id ? `0 0 0 2px var(--bg), 0 0 0 3px ${a.color}` : 'none' }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
