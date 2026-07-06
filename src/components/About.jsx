import React from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Section, Reveal, StaggerGroup, StaggerItem } from './ui/Primitives'
import { aboutBio, aboutStats } from '../data/content'

const coreStack = ['Next.js & React', 'Node.js & TS', 'Python & ML', 'Tailwind CSS']
import {
  FiGitBranch,
  FiDatabase,
  FiCloud,
  FiCpu,
  FiCode
} from "react-icons/fi";
const otherStack = [
  { icon: FiCpu, text: "TensorFlow" },
  { icon: FiCpu, text: "PyTorch" },
  { icon: FiCloud, text: "Docker" },
  { icon: FiCloud, text: "AWS" },
  { icon: FiDatabase, text: "MongoDB" },
  { icon: FiDatabase, text: "PostgreSQL" },
  { icon: FiCode, text: "REST APIs" },
  { icon: FiGitBranch, text: "Git & GitHub" },
  { icon: FiCpu, text: "OpenCV" },
  { icon: FiCpu, text: "Scikit-learn" },
]


export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <Section id="about">
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-20">

        {/* left: bio + stats */}
        <div>
          <Reveal><p className="label mb-6">About</p></Reveal>
          <Reveal delay={0.05}>
            <div className="space-y-4">
              {aboutBio.map((p, i) => (
                <p key={i} className="text-[14px] text-white/65 leading-9 font-light">{p}</p>
              ))}
            </div>
          </Reveal>

          <div ref={ref} className="grid grid-cols-2 gap-5 mt-10">
            {aboutStats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 + i * 0.05}>
                <div className="bento p-5">
                  <div className="text-3xl font-light text-ink">
                    {inView ? <CountUp end={s.value} duration={1.6} /> : 0}{s.suffix}
                  </div>
                  <p className="font-mono text-xs tracking-[0.2em] text-ghost mt-1 uppercase tracking-widest">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* right: stack */}
        <div>
          <Reveal><p className="label mb-6">Stack</p></Reveal>

          <Reveal delay={0.05}>
            <div className="bento p-6 mb-4">
              <p className="font-mono text-xs tracking-[0.2em] text-ghost uppercase tracking-widest mb-4">Core</p>
              <div className="flex flex-wrap gap-2">
                {coreStack.map(s => (
                  <span key={s}
                    className="font-mono text-xs border bg-violet-500/10
                                                                         border-violet-500/30
text-violet-300 rounded-full px-3 py-1">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

         <Reveal delay={0.1}>
  <div className="bento p-7">
    <p className="font-mono text-xs tracking-[0.2em] text-ghost uppercase tracking-widest mb-4">
      Other
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {otherStack.map(({ icon: Icon, text }) => (
        <div
  key={text}
  className="
    group
    flex
    items-center
    gap-3
    rounded-xl
    border
    border-white/5
    bg-white/[0.03]
    px-4
    py-3
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-violet-400/30
    hover:bg-white/[0.05]
    hover:shadow-[0_12px_35px_rgba(139,92,246,.18)]
"
>
          <Icon
  size={18}
  className="text-violet-300 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
/>

          <span className="text-sm text-white/70">
            {text}
          </span>
        </div>
      ))}
    </div>

  </div>
</Reveal>
        </div>
      </div>
    </Section>
  )
}
