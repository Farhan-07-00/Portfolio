import React, { useRef } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { Section, Reveal } from './ui/Primitives'
import { certifications } from '../data/content'

function TiltCard({ cert }) {
  const ref = useRef(null)

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 12
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -12
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-3px)`
  }
  function onLeave() {
    if (ref.current)
      ref.current.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
    
      className="group bento rounded-3xl p-6 flex flex-col gap-4 border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
      style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.2s', willChange: 'transform' }}>

      <div className="flex items-center justify-between">
      <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-medium">
      {cert.category}
      </span>

  <a
    href={cert.verify}
    target="_blank"
    rel="noreferrer"
    className="px-3 py-1 rounded-full border border-white/10 bg-white/5 flex items-center gap-1 text-sm text-white/70 hover:border-violet-400/40 hover:text-violet-300 transition"
  >
    View
    <FiExternalLink size={15}/>
  </a>
        </div>

      <div>
        <h3 className="text-sm font-medium text-ink leading-snug">{cert.name}</h3>
        <p className="text-sm text-white/60 mt-2">{cert.issuer}</p>
        <div className="my-4 h-px bg-white/10" />
      </div>

<div className="flex items-center justify-between mt-auto">

  <div className="flex gap-2">

    <span className="badge px-3 py-1">
      Verified
    </span>

    <span className="badge px-3 py-1">
      Certificate
    </span>

  </div>

  <span className="text-white/50 text-sm">
    {cert.date}
  </span>

</div>
    </div>
  )
}

export default function Certifications() {
  return (
    <Section id="certifications">
      <Reveal>
  <div className="mb-12">

    <p className="label text-white/90 tracking-[0.25em]">
      CERTIFICATIONS
    </p>

    <h2 className="mt-3 text-4xl font-bold text-white">
      Professional Certifications
    </h2>

    <p className="mt-3 max-w-2xl text-white/60 leading-7">
      Building expertise through continuous learning, hands-on projects, and
      industry-recognized certification programs in AI, Full Stack Development,
      and Cloud Technologies.
    </p>

  </div>
</Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 0.05}>
            <TiltCard cert={cert} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
