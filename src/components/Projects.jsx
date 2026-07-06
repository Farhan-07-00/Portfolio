import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiX, FiArrowUpRight, FiChevronDown } from 'react-icons/fi'
import { Section, Reveal } from './ui/Primitives'
import { projects } from '../data/content'

const CATS = ['All', 'AI/ML', 'Full Stack', 'Tools']
const INITIAL_COUNT = 4

const GRAD = {
  'AI/ML':      'radial-gradient(ellipse at 30% 30%, rgba(168,85,247,0.25), rgba(59,130,246,0.15) 50%, transparent)',
  'Full Stack': 'radial-gradient(ellipse at 30% 30%, rgba(59,130,246,0.25), rgba(34,211,238,0.15) 50%, transparent)',
  'Tools':      'radial-gradient(ellipse at 30% 30%, rgba(249,115,22,0.2), rgba(234,179,8,0.12) 50%, transparent)',
}

function TiltCard({ p, onClick }) {
  const ref = useRef(null)
  function move(e) {
    const r = ref.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 14
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -14
    ref.current.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`
  }
  function leave() {
    ref.current.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateZ(0)'
  }

  return (
    <div
  ref={ref}
  onMouseMove={move}
  onMouseLeave={leave}
  onClick={onClick}
  className="bento tilt-card group flex flex-col overflow-hidden cursor-pointer h-[500px]"
      style={{ transition: 'transform 0.18s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s', willChange: 'transform' }}>

      {/* thumbnail */}
      <div className="relative h-44 overflow-hidden"
        style={{ background: 'var(--surface)', minHeight: '176px' }}>
        <div className="absolute inset-0" style={{ background: GRAD[p.category] || GRAD['Tools'] }} />
        {/* image zoom on hover — swap for actual screenshot */}
        {<img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]" /> }

        {/* hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}>
          <span className="text-white text-sm font-medium">View Details</span>
        </div>

        <div className="absolute top-3 right-3">
          <FiArrowUpRight size={16}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-white" />
        </div>
        <div className="absolute bottom-3 left-4">
          <span className="font-mono text-[10px] px-2 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.5)', color: 'var(--dim)', backdropFilter: 'blur(8px)' }}>
            {p.category}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="text-base font-semibold group-hover:text-accent transition-colors"
          style={{ color: 'var(--ink)' }}>
          {p.title}
        </h3>
        <p className="text-sm font-light leading-relaxed flex-1" style={{ color: 'var(--dim)' }}>
          {p.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="flex gap-3 pt-1 border-t" style={{ borderColor: 'var(--line)' }}>
          <a href={p.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs font-mono transition-colors hover:text-accent pt-3"
            style={{ color: 'rgba(255,255,255,0.8)' }}>
            <FiGithub size={13} /> Code
          </a>
          <a href={p.demo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs font-mono transition-colors hover:text-accent pt-3"
            style={{ color: 'rgba(255,255,255,0.8)' }}>
            <FiExternalLink size={13} /> Demo
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [filter,   setFilter]   = useState('All')
  const [showAll,  setShowAll]  = useState(false)
  const [modal,    setModal]    = useState(null)

  const all      = filter === 'All' ? projects : projects.filter(p => p.category === filter)
  const visible  = showAll ? all : all.slice(0, INITIAL_COUNT)

  return (
    <Section id="projects">
      <Reveal className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <p className="label">Selected Work</p>
        <div className="flex gap-2 flex-wrap">
          {CATS.map(c => (
            <button key={c} onClick={() => { setFilter(c); setShowAll(false) }}
              className="font-mono text-[11px] rounded-full px-4 py-1.5 border transition-all"
              style={{
                borderColor: filter === c ? 'var(--accent)' : 'var(--line)',
                color:        filter === c ? 'var(--accent)' : 'var(--ghost)',
                background:   filter === c ? 'rgba(var(--accent-rgb),0.08)' : 'transparent',
              }}>
              {c}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {visible.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <TiltCard p={p} onClick={() => setModal(p)} />
          </Reveal>
        ))}
      </div>

      {/* View more / less */}
      {all.length > INITIAL_COUNT && (
        <Reveal delay={0.1}>
          <div className="flex justify-center mt-10">
            <button onClick={() => setShowAll(v => !v)}
              className="flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all hover:scale-[1.02]"
              style={{ border: '1px solid var(--line-strong)', color: 'var(--ink)', background: 'rgba(255,255,255,0.04)' }}>
              {showAll ? 'Show Less' : 'View All Projects'}
              <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <FiChevronDown size={15} />
              </motion.span>
            </button>
          </div>
        </Reveal>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModal(null)}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="bento max-w-lg w-full p-8 relative max-h-[88vh] overflow-y-auto">

              <button onClick={() => setModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full transition-all hover:text-accent"
                style={{ color: 'var(--ghost)', background: 'rgba(255,255,255,0.05)' }}>
                <FiX size={15} />
              </button>

              <p className="label mb-3">{modal.category}</p>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>{modal.title}</h3>
              <p className="text-sm font-light mt-3 leading-relaxed" style={{ color: 'var(--dim)' }}>
                {modal.description}
              </p>

              <div className="mt-6 space-y-2">
                <p className="label mb-2">Key Features</p>
                {modal.features.map(f => (
                  <p key={f} className="font-mono text-xs flex gap-2" style={{ color: 'var(--ghost)' }}>
                    <span style={{ color: 'var(--accent)' }}>→</span> {f}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mt-5">
                {modal.tech.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              <div className="flex gap-3 mt-7">
                <a href={modal.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:scale-[1.02]"
                  style={{ border: '1px solid var(--line-strong)', color: 'var(--ink)', background: 'rgba(255,255,255,0.04)' }}>
                  <FiGithub size={14} /> Code
                </a>
                <a href={modal.demo} target="_blank" rel="noreferrer"
                  className="btn-accent rounded-full px-5 py-2.5 text-sm font-semibold">
                  <FiExternalLink size={14} /> Live Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
