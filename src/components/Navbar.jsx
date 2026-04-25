import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/gpa-calculator', label: 'GPA Calculator', labelAr: 'حاسبة المعدل' },
  { to: '/percentage-calculator', label: 'Percentage', labelAr: 'النسبة المئوية' },
  { to: '/final-grade-calculator', label: 'Final Grade', labelAr: 'الدرجة النهائية' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-ink-700/30 shadow-xl shadow-ink-950/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-ink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-ink-500/30 group-hover:bg-ink-400 transition-colors">
            S
          </div>
          <span className="font-display font-bold text-white text-lg">
            Student<span className="text-ink-400">Tools</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${location.pathname === l.to ? 'text-white bg-ink-700/40' : ''}`}
            >
              <span>{l.label}</span>
              <span className="text-xs text-ink-500 block leading-none font-arabic">{l.labelAr}</span>
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-ink-300 hover:text-white hover:bg-ink-700/30 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-ink-700/30 px-4 py-3 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                location.pathname === l.to
                  ? 'bg-ink-500/20 text-white'
                  : 'text-ink-300 hover:bg-ink-700/30 hover:text-white'
              }`}
            >
              <span className="font-medium">{l.label}</span>
              <span className="text-sm font-arabic text-ink-400">{l.labelAr}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
