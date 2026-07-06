import React, { useMemo } from 'react'

/* Deterministic star field — consistent across renders, SSR-safe */
const STARS = Array.from({ length: 130 }, (_, i) => ({
  cx:      ((i * 7919 + 31337) % 10000) / 100,
  cy:      ((i * 6271 + 13337) % 10000) / 100,
  r:       ((i * 3) % 3) * 0.5 + 0.4,
  opacity: ((i * 7) % 10) / 28 + 0.08,
  delay:   (i % 7) * 0.7,
  dur:     2.5 + (i % 5) * 0.6,
}))

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* ── Base deep-space gradient ── */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 100% 80% at 50% 0%, #080818, #060610 70%)',
      }} />

      {/* ── Blue ambient glow — right side ── */}
      <div className="absolute rounded-full" style={{
        width:'700px', height:'700px',
        right:'-180px', top:'0px',
        background:'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
        filter:'blur(40px)',
        animation:'aurora-drift 14s ease-in-out infinite',
        animationDelay:'-2s',
      }} />

      {/* ── Purple/magenta glow — center-left ── */}
      <div className="absolute rounded-full" style={{
        width:'600px', height:'600px',
        left:'-100px', top:'200px',
        background:'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
        filter:'blur(50px)',
        animation:'aurora-drift 16s ease-in-out infinite',
        animationDelay:'-6s',
      }} />

      {/* ── Orange ambient glow — bottom center ── */}
      <div className="absolute rounded-full" style={{
        width:'500px', height:'400px',
        left:'50%', bottom:'-80px',
        transform:'translateX(-50%)',
        background:'radial-gradient(circle, rgba(249,115,22,0.13) 0%, transparent 70%)',
        filter:'blur(50px)',
        animation:'aurora-drift 18s ease-in-out infinite',
        animationDelay:'-10s',
      }} />

      {/* ── Subtle blue glow — far left ── */}
      <div className="absolute rounded-full" style={{
        width:'400px', height:'400px',
        left:'-150px', bottom:'20%',
        background:'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
        filter:'blur(60px)',
        animation:'aurora-drift 20s ease-in-out infinite',
        animationDelay:'-4s',
      }} />

      {/* ── Animated grid texture ── */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* ── Star field (SVG) ── */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={`${s.cx}%`}
            cy={`${s.cy}%`}
            r={s.r}
            fill="white"
            opacity={s.opacity}
            style={{
              animation: `twinkle ${s.dur}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </svg>

    </div>
  )
}
