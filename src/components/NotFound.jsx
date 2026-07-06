import React from 'react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center section-pad bg-grad-radial">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-7xl font-bold text-gradient"
      >
        404
      </motion.h1>
      <p className="mt-4 text-slate-400 max-w-sm">
        This route doesn't exist. Whatever you were looking for isn't here.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-grad-primary text-white shadow-glow hover:scale-[1.03] transition-all"
      >
        Back to Home
      </a>
    </div>
  )
}
