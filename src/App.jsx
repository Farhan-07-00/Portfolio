import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider }    from './components/ThemeContext'
import Background           from './components/Background'
import Welcome              from './components/Welcome'
import Navbar               from './components/Navbar'
import { ScrollProgress, BackToTop, Cursor } from './components/Chrome'
import Hero                 from './components/Hero'
import About                from './components/About'
import Education            from './components/Education'
import Skills               from './components/Skills'
import Projects             from './components/Projects'
import Experience           from './components/Experience'
import Certifications       from './components/Certifications'
import Services             from './components/Services'
import Contact              from './components/Contact'
import Footer               from './components/Footer'
import { Divider }          from './components/ui/Primitives'

/* Konami code easter egg */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

function KonamiEgg() {
  const [seq,   setSeq]   = useState([])
  const [show,  setShow]  = useState(false)

  useEffect(() => {
    let fired = false
    function onKey(e) {
      setSeq(s => {
        const next = [...s, e.key].slice(-KONAMI.length)
        if (!fired && next.join(',') === KONAMI.join(',')) {
          fired = true
          setShow(true)
          setTimeout(() => setShow(false), 3500)
        }
        return next
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
          className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none">
          <div className="bento p-10 text-center max-w-sm mx-4"
            style={{ boxShadow: '0 0 60px rgba(var(--accent-rgb),0.35)' }}>
            <p className="text-5xl mb-4">🎮</p>
            <p className="font-mono text-sm font-medium mb-2" style={{ color: 'var(--accent)' }}>
              Developer Mode Unlocked
            </p>
            <p className="font-mono text-xs" style={{ color: 'var(--dim)' }}>
              Nice — you know your classics.<br />Fellow dev spotted ✓
            </p>
            <p className="font-mono text-[10px] mt-4" style={{ color: 'var(--ghost)' }}>↑↑↓↓←→←→BA</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* Console easter egg */
console.log(
  '%c FA %c Farhan Akthar\n%c AI Engineer · Full Stack Developer · Kolkata, India\n\nYou found the console — curious minds always do.\nSay hi → farhan.akthar@example.com',
  'background:#f97316;color:#fff;font-weight:700;padding:3px 8px;border-radius:4px',
  'color:#f97316;font-size:14px;font-weight:600',
  'color:#7b849a;font-size:11px'
)

export default function App() {
  const [welcomed, setWelcomed] = useState(false)

  return (
    <ThemeProvider>
      {/* Fixed background — sits behind everything */}
      <Background />

      <Cursor />
      <ScrollProgress />
      <KonamiEgg />

      <AnimatePresence>
        {!welcomed && <Welcome onDone={() => setWelcomed(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: welcomed ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Divider />
          <About />
          <Divider />
          <Projects />
          <Divider />
          <Skills />
          <Divider />
          <Experience />
          <Divider />
          <Education />
          <Divider />
          <Certifications />
          <Divider />
          <Services />
          <Divider />
          <Contact />
          <Divider />
        </main>
        <Footer />
        <BackToTop />
      </motion.div>
    </ThemeProvider>
  )
}
