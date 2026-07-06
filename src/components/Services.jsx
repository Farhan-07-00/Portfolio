import React from 'react'
import {
  FiCpu,
  FiCode,
  FiDatabase,
  FiServer,
  FiMonitor
} from 'react-icons/fi'
const icons = [
  <FiCpu />,
  <FiCode />,
  <FiDatabase />,
  <FiServer />,
  <FiMonitor />
]

import { Section, Reveal } from './ui/Primitives'
import { services } from '../data/content'

export default function Services() {
  return (
    <Section id="services">
      <Reveal><div className="mb-12">
    <p className="label text-white/90 tracking-[0.25em]">
      SERVICES
    </p>

    <h2 className="mt-3 text-4xl font-bold text-white">
      What I Can Build
    </h2>

    <p className="mt-3 max-w-2xl text-white/60 leading-7">
      I design and develop scalable web applications, AI-powered solutions,
      machine learning systems, and data-driven platforms that deliver exceptional user experiences.
    </p>
  </div></Reveal>

      {/* big bento grid — like reference layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05}>
            <div className="group relative overflow-hidden bento rounded-3xl p-5 flex flex-col gap-5 h-full transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/30 hover:shadow-[0_0_35px_rgba(139,92,246,0.15)]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              <div className="flex items-center justify-between">

  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-300 text-xl">

    {icons[i]}

  </div>

  <span className="text-xs uppercase tracking-[0.2em] text-white/40">
    Service
  </span>

</div>
              <h3 className="text-sm font-medium text-ink group-hover:text-lime transition-colors leading-snug">
                {s.title}
                <div className="h-px bg-white/10 my-2" />
              </h3>
              <p className="text-base text-white/65 leading-8">
                {s.description}
                <div className="flex flex-wrap gap-2 mt-6">

  {i === 0 && (
    <>
      <span className="badge">Python</span>
      <span className="badge">OpenAI</span>
      <span className="badge">FastAPI</span>
    </>
  )}

  {i === 1 && (
    <>
      <span className="badge">React</span>
      <span className="badge">Next.js</span>
      <span className="badge">MongoDB</span>
    </>
  )}

  {i === 2 && (
    <>
      <span className="badge">TensorFlow</span>
      <span className="badge">Scikit</span>
      <span className="badge">Python</span>
    </>
  )}

  {i === 3 && (
    <>
      <span className="badge">Node.js</span>
      <span className="badge">Express</span>
      <span className="badge">REST</span>
    </>
  )}

  {i === 4 && (
    <>
      <span className="badge">Tailwind</span>
      <span className="badge">CSS</span>
      <span className="badge">UI</span>
    </>
  )}

</div>
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
