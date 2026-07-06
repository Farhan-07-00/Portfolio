import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/* ── Scroll progress bar ── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28 })
  return (
    <motion.div style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-accent z-[60] pointer-events-none" />
  )
}

/* ── Back to top ── */
export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  if (!show) return null
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-9 h-9 rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--dim)] hover:text-[var(--ink)] hover:border-accent transition-all font-mono text-sm flex items-center justify-center"
      aria-label="Back to top">
      ↑
    </motion.button>
  )
}

/* ── Custom cursor with glow trail ── */
export function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const posRef  = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const [isTouch,  setIsTouch]  = useState(false)
  const raf = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer:coarse)').matches) { setIsTouch(true); return }

    function onMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
      setHovered(!!e.target.closest('a,button,[role="button"],input,textarea,select'))
    }

    function lerp(a, b, t) { return a + (b - a) * t }
    function tick() {
      ringPos.current.x = lerp(ringPos.current.x, posRef.current.x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, posRef.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top  = ringPos.current.y + 'px'
      }
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* dot */}
      <div ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height] duration-100"
        style={{ width: hovered ? '10px' : '6px', height: hovered ? '10px' : '6px', background: 'var(--accent)' }}
      />
      {/* ring with glow */}
      <div ref={ringRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,box-shadow] duration-200"
        style={{
          width:     hovered ? '44px' : '30px',
          height:    hovered ? '44px' : '30px',
          borderColor: `rgba(var(--accent-rgb),${hovered ? 0.7 : 0.35})`,
          boxShadow:   hovered ? '0 0 12px rgba(var(--accent-rgb),0.4)' : 'none',
        }}
      />
    </>
  )
}
