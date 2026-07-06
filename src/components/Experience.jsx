import React from 'react'
import { Section, Reveal } from './ui/Primitives'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <Section id="experience">
      <Reveal>
  <div className="mb-12">
    <p className="label text-white/90 tracking-[0.25em]">
      EXPERIENCE
    </p>

    <h2 className="mt-3 text-4xl font-bold text-white">
      My Professional Journey
    </h2>

    <p className="mt-3 max-w-2xl text-white/60 leading-7">
      
    </p>
  </div>
</Reveal>

      <div className="relative">
        {/* vertical spine */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-white/10 to-transparent" />

        <div className="space-y-0 pl-8">
          {experience.map((exp, i) => (
            <Reveal key={exp.title + exp.duration} delay={i * 0.07}>
              <div className="relative group rounded-3xl border border-white/5 bg-white/[0.02] p-7 mb-6 transition-all duration-500 hover:border-violet-400/30 hover:bg-white/[0.04] hover:shadow-[0_20px_60px_rgba(139,92,246,.12)]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                {/* dot on spine */}
                <span className="absolute -left-9 top-8 w-4 h-4 rounded-full bg-violet-500 border-4 border-[#0b1020] shadow-[0_0_20px_rgba(139,92,246,.5)] group-hover:scale-125 transition-all duration-300" />

                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-sm font-medium text-ink">{exp.title}</h3>
                    {exp.org && <p className="text-sm text-violet-300 mt-2">@ {exp.org}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-sm text-white/50">{exp.duration}</span>
                    <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs">{exp.type}</span>
                  </div>
                </div>

                <ul className="space-y-1.5">
                  {exp.points.map(pt => (
                    <li key={pt} className="flex gap-3 text-sm text-white/70 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-violet-400 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
