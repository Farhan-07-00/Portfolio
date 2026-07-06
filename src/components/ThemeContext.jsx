import React, { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)

export const ACCENTS = [
  { id: 'orange', label: 'Orange', color: '#f97316' },
  { id: 'lime',   label: 'Lime',   color: '#b8ff57' },
  { id: 'violet', label: 'Violet', color: '#a78bfa' },
  { id: 'cyan',   label: 'Cyan',   color: '#22d3ee' },
]

export function ThemeProvider({ children }) {
  const [mode,   setMode]   = useState(() => localStorage.getItem('theme-mode')   || 'dark')
  const [accent, setAccent] = useState(() => localStorage.getItem('theme-accent') || 'orange')

  useEffect(() => {
    document.documentElement.classList.toggle('light', mode === 'light')
    document.documentElement.setAttribute('data-accent', accent)
    localStorage.setItem('theme-mode',   mode)
    localStorage.setItem('theme-accent', accent)
  }, [mode, accent])

  const toggleMode = () => setMode(m => m === 'dark' ? 'light' : 'dark')

  return (
    <Ctx.Provider value={{ mode, toggleMode, accent, setAccent, ACCENTS }}>
      {children}
    </Ctx.Provider>
  )
}

export function useTheme() { return useContext(Ctx) }
