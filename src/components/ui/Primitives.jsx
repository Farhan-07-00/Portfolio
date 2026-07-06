import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity:0, y:22 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-50px' }}
      transition={{ duration:0.58, delay, ease:[0.22,1,0.36,1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

export function StaggerGroup({ children, className='' }) {
  return (
    <motion.div initial="hidden" whileInView="show"
      viewport={{ once:true, margin:'-50px' }}
      variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.07 } } }}
      className={className}>
      {children}
    </motion.div>
  )
}
export function StaggerItem({ children, className='' }) {
  return (
    <motion.div
      variants={{
        hidden:{ opacity:0, y:18 },
        show:{ opacity:1, y:0, transition:{ duration:0.55, ease:[0.22,1,0.36,1] } },
      }}
      className={className}>
      {children}
    </motion.div>
  )
}

export function Magnetic({ children, strength=0.3, className='' }) {
  const ref = useRef(null)
  function onMove(e) {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width  / 2) * strength
    const y = (e.clientY - r.top  - r.height / 2) * strength
    ref.current.style.transform = `translate(${x}px,${y}px)`
  }
  function onLeave() { ref.current.style.transform = 'translate(0,0)' }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition:'transform 0.3s cubic-bezier(0.22,1,0.36,1)', display:'inline-flex' }}
      className={className}>
      {children}
    </div>
  )
}

export function Section({ id, children, className='' }) {
  return (
    <section id={id} className={`px-5 sm:px-8 lg:px-16 py-20 max-w-site mx-auto ${className}`}>
      {children}
    </section>
  )
}

export function Divider() {
  return <div className="hr mx-5 sm:mx-8 lg:mx-16" />
}
