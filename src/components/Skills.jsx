import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiHtml5, SiCss, SiTailwindcss, SiJavascript, SiTypescript, SiFramer,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiFastapi, SiDjango,
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn, SiOpencv, SiJupyter,
  SiDocker, SiGit, SiGithub, SiLinux, SiVite, SiPostman, SiVercel, SiVscodium,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { Section, Reveal } from './ui/Primitives'

const CATS = {
  Frontend: [
    { Icon: SiReact,        name: 'React',       color: '#61dafb' },
    { Icon: SiNextdotjs,    name: 'Next.js',     color: 'var(--ink)' },
    { Icon: SiJavascript,   name: 'JavaScript',  color: '#f7df1e' },
    { Icon: SiTypescript,   name: 'TypeScript',  color: '#3178c6' },
    { Icon: SiTailwindcss,  name: 'Tailwind',    color: '#38bdf8' },
    { Icon: SiHtml5,        name: 'HTML5',       color: '#e34f26' },
    { Icon: SiCss,         name: 'CSS3',        color: '#1572b6' },
    { Icon: SiFramer,       name: 'Framer Motion', color: '#0055ff' },
  ],
  Backend: [
    { Icon: SiNodedotjs,    name: 'Node.js',     color: '#339933' },
    { Icon: SiExpress,      name: 'Express',     color: 'var(--ink)' },
    { Icon: SiPython,       name: 'Python',      color: '#3572a5' },
    { Icon: SiFastapi,      name: 'FastAPI',     color: '#009688' },
    { Icon: SiDjango,       name: 'Django',      color: '#092e20' },
    { Icon: FaJava,         name: 'Java',        color: '#f89820' },
  ],
  'AI / ML': [
    { Icon: SiTensorflow,   name: 'TensorFlow',  color: '#ff6f00' },
    { Icon: SiPytorch,      name: 'PyTorch',     color: '#ee4c2c' },
    { Icon: SiScikitlearn,  name: 'Scikit-learn',color: '#f7931e' },
    { Icon: SiOpencv,       name: 'OpenCV',      color: '#5c3ee8' },
    { Icon: SiJupyter,      name: 'Jupyter',     color: '#f37626' },
    { Icon: SiPython,       name: 'NLP',         color: '#3572a5' },
  ],
  Database: [
    { Icon: SiMongodb,      name: 'MongoDB',     color: '#47a248' },
    { Icon: SiPostgresql,   name: 'PostgreSQL',  color: '#4169e1' },
  ],
  DevOps: [
    { Icon: SiDocker,       name: 'Docker',      color: '#2496ed' },
    { Icon: SiLinux,        name: 'Linux',       color: '#fcc624' },
    { Icon: SiVercel,       name: 'Vercel',      color: 'var(--ink)' },
  ],
  Tools: [
    { Icon: SiGit,          name: 'Git',         color: '#f05032' },
    { Icon: SiGithub,       name: 'GitHub',      color: 'var(--ink)' },
    { Icon: SiVite,         name: 'Vite',        color: '#646cff' },
    { Icon: SiPostman,      name: 'Postman',     color: '#ff6c37' },
    { Icon: SiVscodium,     name: 'VS Code',     color: '#007acc' },
  ],
}

function SkillCard({ Icon, name, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.45, delay, ease: [0.22,1,0.36,1] }}
      className="skill-card">
      <div className="skill-tooltip">{name}</div>
      <div className="skill-icon" style={{ color }}><Icon /></div>
      <span className="font-mono text-[10px]" style={{ color:'var(--ghost)' }}>{name}</span>
    </motion.div>
  )
}

export default function Skills() {
  const cats = Object.keys(CATS)
  const [active, setActive] = useState(cats[0])

  return (
    <Section id="skills">
      <Reveal className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <p className="label">Skills</p>
        <div className="flex gap-2 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)}
              className={`font-mono text-[11px] rounded-full px-4 py-1.5 border transition-all ${
                active === c
                  ? 'border-accent text-accent bg-[rgba(var(--accent-rgb),0.08)]'
                  : 'border-[var(--line)] text-[var(--ghost)] hover:text-[var(--dim)]'
              }`}>
              {c}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div key={active}
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.3 }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {CATS[active].map(({ Icon, name, color }, i) => (
          <SkillCard key={name} Icon={Icon} name={name} color={color} delay={i * 0.04} />
        ))}
      </motion.div>
    </Section>
  )
}
