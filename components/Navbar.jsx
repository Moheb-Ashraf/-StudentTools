'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/gpa-calculator', label: 'حاسبة المعدل', en: 'GPA', icon: '🎓', color: 'emerald' },
  { href: '/percentage-calculator', label: 'النسبة المئوية', en: 'Percentage', icon: '📊', color: 'indigo' },
  { href: '/final-grade-calculator', label: 'الدرجة المطلوبة', en: 'Final Exam', icon: '🎯', color: 'amber' },
  { href: '/gpa-converter', label: 'تحويل المعدل', en: 'Converter', icon: '🔄', color: 'cyan' },
  { href: '/attendance-calculator', label: 'حاسبة الغياب', en: 'Attendance', icon: '⏱️', color: 'rose' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/30'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-white text-lg tracking-tight group-hover:text-indigo-300 transition-colors">
              Student<span className="text-indigo-400">Tools</span>
            </span>
            <span className="font-arabic text-[11px] text-slate-400 leading-none">
              أدوات الطلاب الذكية
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-white/[0.06] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span>{link.icon}</span>
                <span className="font-arabic">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right CTA / Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/gpa-calculator"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 hover:bg-indigo-500/20 hover:text-white text-xs font-bold transition-all"
          >
            <span>احسب GPA فوراً</span>
            <span>⚡</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F19]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 py-6 space-y-2 animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-3 mb-2 font-arabic">
            الأدوات الأكاديمية
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between p-3.5 rounded-xl font-medium transition-all ${
                pathname === link.href
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{link.icon}</span>
                <span className="font-arabic font-semibold">{link.label}</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{link.en}</span>
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-around text-xs text-slate-400">
            <Link href="/about" className="hover:text-white">من نحن</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white">اتصل بنا</Link>
            <span>·</span>
            <Link href="/privacy-policy" className="hover:text-white">الخصوصية</Link>
          </div>
        </div>
      )}
    </header>
  )
}
