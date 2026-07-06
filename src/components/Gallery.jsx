import React from 'react'
import { motion } from 'framer-motion'

/* 
  Photo gallery — horizontal marquee strip like abhisheksingh.tech.
  Drop your own images in /public/assets/gallery/ and update the list below.
  Until then, gradient placeholder cards are shown.
*/
const IMAGES = [
  { bg: 'from-[#1a2e1a] to-[#0d1a0d]', label: 'Kolkata, India' },
  { bg: 'from-[#2e1a1a] to-[#1a0d0d]', label: 'Red Dead Redemption II' },
  { bg: 'from-[#1a1a2e] to-[#0d0d1a]', label: 'Inception (2010)' },
  { bg: 'from-[#2e2a1a] to-[#1a160d]', label: 'Ancient History' },
  { bg: 'from-[#1a2a2e] to-[#0d161a]', label: 'Photography' },
  { bg: 'from-[#2a1a2e] to-[#150d1a]', label: 'Travel' },
]

/* duplicated for seamless loop */
const ITEMS = [...IMAGES, ...IMAGES]

export default function Gallery() {
  return (
    <div className="py-10 overflow-hidden">
      <div className="overflow-hidden">
        <div className="gallery-track will-change-transform">
          {ITEMS.map((img, i) => (
            <div key={i} className="img-card shrink-0 w-52 h-36 sm:w-64 sm:h-44 relative cursor-pointer">
              {/* ── Replace the gradient below with an <img> once you have real photos ──
                  Example:
                  <img src="/assets/gallery/photo-1.jpg" alt={img.label} className="w-full h-full object-cover" />
              */}
              <div className={`w-full h-full bg-gradient-to-br ${img.bg}`} />
              <div className="absolute inset-0 flex items-end p-3">
                <span className="font-mono text-[10px] text-ghost/70">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
