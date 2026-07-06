import React from 'react'
import { motion } from 'framer-motion'
import { FiMapPin } from 'react-icons/fi'
import { Section, SectionLabel, RevealItem } from './ui/Primitives'
import { profile } from '../data/content'

export default function FindMe() {
  const mapsUrl = `https://www.google.com/maps?q=${profile.locationCoords.lat},${profile.locationCoords.lng}`

  return (
    <Section id="find-me">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <RevealItem>
          <SectionLabel>Location</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-light text-ink leading-tight">
            Based in<br /><span className="text-muted">{profile.location}</span>
          </h2>
          <p className="text-muted text-sm mt-4 font-mono">{profile.availability}</p>
          <a href={mapsUrl} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-xs font-mono border border-line rounded-full px-4 py-2 text-muted hover:border-accent/50 hover:text-ink transition-all">
            <FiMapPin size={13} /> View on Google Maps
          </a>
        </RevealItem>

        <RevealItem delay={0.1}>
          {/* minimalist globe / world grid */}
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 mx-auto">
            <div className="absolute inset-0 rounded-full border border-line" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute inset-0 rounded-full border border-line"
                style={{ transform: `scale(${0.2 + i * 0.2})` }} />
            ))}
            <div className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 60% 42%, rgba(184,255,87,0.06), transparent 60%)',
              }} />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-[40%] left-[58%] w-2.5 h-2.5 rounded-full bg-accent"
            />
            <FiMapPin className="absolute top-[30%] left-[55%] text-accent" size={18} />
            <div className="absolute inset-[15%] rounded-full border border-dashed border-line opacity-40" />
          </div>
        </RevealItem>
      </div>
    </Section>
  )
}
