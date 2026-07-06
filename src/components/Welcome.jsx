import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { greetings } from '../data/content'

const BOOT = [
  { text: '> Initializing portfolio…',           delay: 0    },
  { text: '> Loading components…',               delay: 400  },
  { text: '> Compiling experience data…',        delay: 750  },
  { text: '> Applying aurora theme…',            delay: 1060 },
  { text: '> Starting dev server…',              delay: 1340 },
  { text: '✓ Build complete — launching',        delay: 1640, accent: true },
]

export default function Welcome({ onDone }) {
  const [gi,    setGi]    = useState(0)
  const [phase, setPhase] = useState('greet') // 'greet' | 'boot' | 'out'
  const [lines, setLines] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem('welcomed')) { onDone(); return }

    const iv = setInterval(() => {
      setGi(i => {
        const next = i + 1
        if (next >= greetings.length) {
          clearInterval(iv)
          setPhase('boot')
          return i
        }
        return next
      })
    }, 450)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (phase !== 'boot') return
    BOOT.forEach(({ text, delay, accent }) => {
      setTimeout(() => setLines(l => [...l, { text, accent }]), delay)
    })
    setTimeout(() => {
      sessionStorage.setItem('welcomed', '1')
      setPhase('out')
      setTimeout(onDone, 550)
    }, 2500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  function skip() {
    sessionStorage.setItem('welcomed', '1')
    onDone()
  }

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{ background: '#060610' }}
    >
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
        backgroundSize: '50px 50px',
      }} />
      {/* aurora tint */}
      <div className="absolute rounded-full pointer-events-none" style={{
        width: '600px', height: '400px', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)',
        background: 'radial-gradient(ellipse, rgba(168,85,247,0.15) 0%, rgba(59,130,246,0.1) 50%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      <button onClick={skip}
        className="absolute top-6 right-7 font-mono text-xs z-10 transition-colors"
        style={{ color: 'var(--ghost)' }}
        onMouseEnter={e => e.target.style.color = 'var(--ink)'}
        onMouseLeave={e => e.target.style.color = 'var(--ghost)'}>
        skip →
      </button>

      {/* greeting phase */}
      {phase === 'greet' && (
        <AnimatePresence mode="wait">
          <motion.div key={gi}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 1.02 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="text-center select-none">
            <p className="font-sans font-light tracking-tight"
              style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
              {greetings[gi].text}
            </p>
          </motion.div>
        </AnimatePresence>
      )}

      {/* boot phase */}
      {phase === 'boot' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="w-full max-w-sm px-6 font-mono space-y-2">
          <p className="text-xs mb-4" style={{ color: 'var(--ghost)' }}>
            farhan-akthar ~ %
          </p>
          {lines.map((l, i) => (
            <motion.p key={i}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22 }}
              className="text-sm"
              style={{ color: l.accent ? 'var(--accent)' : 'var(--dim)' }}>
              {l.text}
              {i === lines.length - 1 && <span className="term-cursor" />}
            </motion.p>
          ))}
        </motion.div>
      )}

      {/* progress */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'var(--line)' }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: phase === 'greet' ? greetings.length * 0.4 : 2.4, ease: 'linear' }}
          style={{ height: '100%', background: 'var(--accent)' }}
        />
      </div>
    </motion.div>
  )
}
