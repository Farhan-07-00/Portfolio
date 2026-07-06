import React from 'react'
import { FiBookOpen } from 'react-icons/fi'
import { Section, Reveal } from './ui/Primitives'
import { education } from '../data/content'

export default function Education() {
  console.log("Education Array:", education);
  console.log("Total Education:", education.length);
  return (
    <Section id="education">
      <Reveal>
  <div className="mb-12">
    <p className="label text-white/90 tracking-[0.25em]">
      EDUCATION
    </p>

    <h2 className="mt-3 text-4xl font-bold text-white">
      Academic Journey
    </h2>

    <p className="mt-3 max-w-2xl text-white/60 leading-7">
      
    </p>
  </div>
</Reveal>

      <div className="grid sm:grid-cols-2 gap-3">
        {education.map((edu, i) => (
          <div className={i === 0 ? "sm:col-span-2" : ""}>
  <Reveal delay={i * 0.08}>
            <div className="group relative overflow-hidden bento rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/30 hover:shadow-[0_20px_60px_rgba(139,92,246,.15)]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-300 text-xl mb-3">
                  <FiBookOpen />
                </div>
                <p className="font-mono text-[11px] text-white/40 uppercase tracking-[0.2em] mb-3">{edu.year}</p>
                
                <h3 className="text-sm font-medium text-ink leading-snug">{edu.degree}</h3>
                <p className="text-base text-white/60 mt-3">{edu.institution}</p>
                <div className="h-px bg-white/10 mt-4 mb-4" />
                
              </div>
              {edu.cgpa && (
                <span className="self-start rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 px-4 py-2 text-sm font-medium">
                  {edu.cgpa}
                </span>
              )}
            </div>
          </Reveal>
          </div>
        ))}
      </div>
    </Section>
  )
}
