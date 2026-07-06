import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowRight, FiGrid, FiGlobe, FiMapPin, FiDownload, FiExternalLink, FiClock, FiMessageCircle, FiFileText } from 'react-icons/fi'
import {
  SiReact,
  SiNextdotjs,
  SiPython,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiDocker,
  SiGit,
  SiPostgresql,
  SiTensorflow
} from 'react-icons/si'
import { profile, greetings } from '../data/content'

/* ── Typewriter hook ── */
function useTypewriter(words, speed = 70, pause = 1800) {
  const [text, setText] = useState('')
  const [wi,   setWi]   = useState(0)
  const [del,  setDel]  = useState(false)
  useEffect(() => {
    const w = words[wi % words.length]
    const t = !del && text.length < w.length
      ? setTimeout(() => setText(w.slice(0, text.length + 1)), speed)
      : !del && text.length === w.length
        ? setTimeout(() => setDel(true), pause)
        : del && text.length > 0
          ? setTimeout(() => setText(w.slice(0, text.length - 1)), speed / 2)
          : (() => { setDel(false); setWi(i => i + 1) })()
    return () => clearTimeout(t)
  }, [text, del, wi, words, speed, pause])
  return text
}

/* ── Magnetic wrapper ── */
function Mag({ children, strength = 0.28 }) {
  const ref = useRef(null)
  const move  = e => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width  / 2) * strength
    const y = (e.clientY - r.top  - r.height / 2) * strength
    ref.current.style.transform = `translate(${x}px,${y}px)`
  }
  const leave = () => { ref.current.style.transform = 'translate(0,0)' }
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave}
      style={{ transition:'transform 0.3s cubic-bezier(0.22,1,0.36,1)', display:'inline-flex' }}>
      {children}
    </div>
  )
}

/* ── Ripple button ── */
function RippleBtn({ children, href, className, style, onClick }) {
  const [ripples, setRipples] = useState([])
  function addRipple(e) {
    const r = e.currentTarget.getBoundingClientRect()
    const id = Date.now()
    setRipples(rs => [...rs, { x: e.clientX - r.left, y: e.clientY - r.top, id }])
    setTimeout(() => setRipples(rs => rs.filter(r => r.id !== id)), 700)
  }
  const Tag = href ? 'a' : 'button'
  return (
    <Tag href={href} onClick={e => { addRipple(e); onClick?.(e) }}
      className={`relative overflow-hidden inline-flex items-center gap-2 ${className}`}
      style={style}>
      {children}
      {ripples.map(({ x, y, id }) => (
        <span key={id} className="ripple-circle" style={{ left: x, top: y }} />
      ))}
    </Tag>
  )
}

/* ── Orbit icon ── */
function OrbitIcon({ Icon, color, angle, radius = 72, dur = '9s', delay = '0s' }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{
  animation: `orbit ${dur} linear infinite`,
  animationDelay: delay,
  '--r': `${radius}px`,
  transform: `rotate(${angle}deg)`,
  willChange: 'transform',
  backfaceVisibility: 'hidden',
}}>
     <div
  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
  style={{
    background:
      'radial-gradient(circle at 30% 30%, rgba(255,255,255,.08), rgba(12,16,30,.96))',
    border: `1px solid ${color}40`,
    color,
    transform: `rotate(-${angle}deg)`,
    backdropFilter: 'blur(16px)',
    boxShadow: `
      0 0 20px ${color}35,
      inset 0 1px 1px rgba(255,255,255,.08)
    `,
  }}
>
  <Icon size={22} />
</div>
    </div>
  )
}

const ORBIT_ICONS = [
  { Icon: SiReact,       color: '#61DAFB', dur: '16s', delay: '0s' },
  { Icon: SiNextdotjs,   color: '#FFFFFF', dur: '17s', delay: '-2s' },
  { Icon: SiTypescript,  color: '#3178C6', dur: '18s', delay: '-4s' },
  { Icon: SiPython,      color: '#3776AB', dur: '19s', delay: '-6s' },
  { Icon: SiNodedotjs,   color: '#339933', dur: '20s', delay: '-8s' },
  { Icon: SiJavascript,  color: '#F7DF1E', dur: '21s', delay: '-10s' },
  { Icon: SiTailwindcss, color: '#38BDF8', dur: '22s', delay: '-12s' },
  { Icon: SiDocker,      color: '#2496ED', dur: '23s', delay: '-14s' },
  { Icon: SiMongodb,     color: '#47A248', dur: '24s', delay: '-16s' },
  { Icon: SiGit,         color: '#F05032', dur: '25s', delay: '-18s' },
  { Icon: SiPostgresql,  color: '#336791', dur: '26s', delay: '-20s' },
  { Icon: SiTensorflow,  color: '#FF6F00', dur: '27s', delay: '-22s' },
];
function card(d = 0) {
  return {
    initial:    { opacity: 0, y: 24 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] },
  }
}

export default function Hero() {
  const [gi, setGi] = useState(0)
  const typed = useTypewriter(['Full Stack Developer', 'AI Engineer', 'ML Enthusiast', 'Problem Solver'])

  useEffect(() => {
    const iv = setInterval(() => setGi(i => (i + 1) % greetings.length), 2500)
    return () => clearInterval(iv)
  }, [])

  const mapsUrl = `https://www.google.com/maps?q=${profile.locationCoords.lat},${profile.locationCoords.lng}`

  return (
    <section id="hero" className="relative z-10 pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-site mx-auto">
      <div className="flex flex-col gap-3">

        {/* ── ROW 1: Main left card + Profile right card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-3">

          {/* ① LEFT — Name, tagline, CTAs */}
          <motion.div {...card(0.05)}
            className="bento bento-glow relative overflow-hidden min-h-[340px] p-8 flex flex-col justify-between">

            {/* background aurora inside card */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(168,85,247,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(59,130,246,0.10) 0%, transparent 50%)',
            }} />

            {/* top row */}
            <div className="relative z-10 flex items-start justify-between flex-wrap gap-3">
              {/* animated greeting */}
              <motion.div key={gi}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                className="flex items-center gap-2">
                <span className="text-xl">🖐</span>
                <span className="font-medium text-lg" style={{ color: 'var(--accent)' }}>
                  {greetings[gi].text}
                </span>
              </motion.div>

              <span className="badge">
                <span className="dot-live" /> Available for Internship
              </span>
            </div>

            {/* name */}
            <div className="relative z-10 my-5">
              <h1 className="font-bold leading-none tracking-tight" style={{ fontSize: 'clamp(52px, 6vw, 84px)' }}>
                <span style={{ color: 'var(--ink)' }}>Farhan</span><br />
                <span className="name-grad">Akthar</span>
              </h1>
            </div>

            {/* roles + tagline */}
            <div className="relative z-10 space-y-3">
              <p
  className="font-semibold text-xl min-h-[32px]"
  style={{ color: 'var(--dim)' }}
>
  {typed}
  <span className="animate-pulse text-violet-400">|</span>
</p>
              <p className="text-sm font-light leading-relaxed max-w-md" style={{ color: 'var(--ghost)' }}>
                {profile.tagline}
              </p>
            </div>

            {/* CTAs */}
            <div className="relative z-10 flex flex-wrap gap-3 mt-6">
              <Mag>
                <RippleBtn href="#contact"
                  className="btn-accent rounded-full px-6 py-3 text-sm font-semibold"
                  style={{ color: '#fff' }}>
                  Let's Talk <FiArrowRight size={15} />
                </RippleBtn>
              </Mag>
              <Mag>
                <a href="#projects"
                  className="btn-ghost rounded-full px-5 py-3 text-sm">
                  View My Work <FiGrid size={13} />
                </a>
              </Mag>
            </div>
          </motion.div>

          {/* ② RIGHT — Profile with orbit icons */}
          <motion.div {...card(0.12)}
            className="bento relative overflow-visible min-h-[340px] flex flex-col justify-between p-7">
            <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none" style={{
              background: 'radial-gradient(ellipse 80% 80% at 50% 30%, rgba(59,130,246,0.14) 0%, transparent 60%)',
            }} />

            {/* orbit system */}
            <div className="relative z-10 flex-1 flex items-center justify-center my-2">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                {/* outer dashed orbit ring */}
                <div className="absolute inset-2 rounded-full border border-dashed"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', animation: 'orbit-spin 30s linear infinite reverse' }} />
                {/* inner orbit ring */}
                <div className="absolute inset-10 rounded-full border border-dashed"
                  style={{ borderColor: 'rgba(255,255,255,0.05)', animation: 'orbit-spin 20s linear infinite' }} />

                {/* orbiting icons */}
                {ORBIT_ICONS.map(({ Icon, color, dur, delay }, i) => (
                  <OrbitIcon key={i} Icon={Icon} color={color}
                    angle={(360 / ORBIT_ICONS.length) * i} dur={dur} delay={delay} radius={150 + (i % 2) * 10} />
                ))}

                {/* profile image */}
                <div className="profile-ring absolute inset-[32px]">
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
                    style={{ background: 'var(--surface)', animation: 'float 5s ease-in-out infinite' }}>
                    {/*
                      Drop your photo in /public/assets/profile.jpg and replace:
                      <img src="/assets/profile.jpg" alt="Farhan Akthar" className="w-full h-full object-cover" />
                    */}
                    <img
  src="/assets/profile.png"
  alt="Farhan Akthar"
   className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
   draggable={false}
/>
<div
  className="absolute inset-0 rounded-full -z-10"
  style={{
    background:
      "radial-gradient(circle, rgba(99,102,241,.35), transparent 70%)",
    filter: "blur(35px)",
    transform: "scale(1.15)"
  }}
/>
                  </div>
                </div>
              </div>
            </div>

            {/* bottom row */}
            <div className="relative z-10 flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--dim)' }}>
                <FiMapPin size={13} style={{ color: 'var(--accent)' }} />
                {profile.location}
              </span>
              <a href={`https://www.google.com/maps?q=${profile.locationCoords.lat},${profile.locationCoords.lng}`}
                target="_blank" rel="noreferrer"
                className="badge hover:border-white/20 transition-colors text-xs">
                <FiGlobe size={11} /> FIND ME
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── ROW 2: Three info cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          {/* ③ Availability */}
          <motion.div {...card(0.2)} className="bento bento-glow p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.2)' }}>
                <FiClock size={14} style={{ color: 'var(--accent)' }} />
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>Availability</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--dim)' }}>
              Open to Remote&nbsp;•&nbsp;Internship&nbsp;•&nbsp;Full-time
            </p>
            <div className="mt-auto flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--dim)' }}>
              <span className="dot-live" /> Available Now
            </div>
          </motion.div>

          {/* ④ Let's Connect */}
          <motion.div {...card(0.26)} className="bento bento-glow p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <FiMessageCircle size={14} style={{ color: '#3b82f6' }} />
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>Let's Connect</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--dim)' }}>
              Have a project in mind or just want to say hi?
            </p>
            <div className="mt-auto flex items-center gap-4">
              {[
                { Icon: FiGithub,   href: profile.social.github,  label: 'GitHub'   },
                { Icon: FiLinkedin, href: profile.social.linkedin, label: 'LinkedIn' },
                { Icon: FiTwitter,  href: profile.social.twitter,  label: 'Twitter'  },
                { Icon: FiMail,     href: profile.social.email,    label: 'Email'    },
              ].map(({ Icon, href, label }) => (
                <a
  key={label}
  href={href}
  target="_blank"
  rel="noreferrer"
  aria-label={label}
  className="
    w-11
    h-11
    rounded-full
    flex
    items-center
    justify-center
    bg-white/5
    border
    border-white/10
    transition-all
    duration-300
    hover:-translate-y-1
    hover:bg-violet-500/20
    hover:border-violet-400/40
    hover:shadow-[0_10px_25px_rgba(139,92,246,.25)]
  "
  style={{ color: 'rgba(255,255,255,0.9)' }}
>
  <Icon size={18} />
</a>
              ))}
            </div>
          </motion.div>

          {/* ⑤ Resume */}
          <motion.div {...card(0.32)} className="paper-card p-6 flex flex-col gap-4">
            <div className="relative z-10 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.2)' }}>
                <FiFileText size={14} style={{ color: 'var(--accent)' }} />
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>Resume</span>
            </div>
            <p className="relative z-10 text-xs leading-relaxed" style={{ color: 'var(--dim)' }}>
              Download my resume or view online
            </p>
            <div className="relative z-10 mt-auto flex items-center gap-2 flex-wrap">
              <a href={profile.resumeUrl} download
                className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all hover:scale-[1.02]"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line-strong)', color: 'var(--ink)' }}>
                Download <FiDownload size={11} />
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all hover:scale-[1.02]"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line-strong)', color: 'var(--ink)' }}>
                View Online <FiExternalLink size={11} />
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
