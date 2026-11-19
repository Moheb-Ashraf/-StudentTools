import React from 'react'
import Link from 'next/link'

const COLOR_MAP = {
  emerald: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    iconBg: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/40',
    hoverGlow: 'group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]',
    cta: 'text-emerald-400 group-hover:text-emerald-300',
  },
  indigo: {
    badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    iconBg: 'from-indigo-500/20 to-blue-500/10 text-indigo-400 border-indigo-500/30',
    hoverBorder: 'hover:border-indigo-500/40',
    hoverGlow: 'group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.2)]',
    cta: 'text-indigo-400 group-hover:text-indigo-300',
  },
  amber: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    iconBg: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/40',
    hoverGlow: 'group-hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)]',
    cta: 'text-amber-400 group-hover:text-amber-300',
  },
  cyan: {
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    iconBg: 'from-cyan-500/20 to-sky-500/10 text-cyan-400 border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-500/40',
    hoverGlow: 'group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.2)]',
    cta: 'text-cyan-400 group-hover:text-cyan-300',
  },
  rose: {
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    iconBg: 'from-rose-500/20 to-pink-500/10 text-rose-400 border-rose-500/30',
    hoverBorder: 'hover:border-rose-500/40',
    hoverGlow: 'group-hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.2)]',
    cta: 'text-rose-400 group-hover:text-rose-300',
  },
}

export default function ToolCard({
  href,
  icon,
  titleAr,
  titleEn,
  description,
  tag = 'مجاني',
  color = 'indigo',
  highlight = false,
}) {
  const c = COLOR_MAP[color] || COLOR_MAP.indigo

  return (
    <Link
      href={href}
      className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#111827]/90 to-[#0F172A]/80 border border-white/[0.08] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${c.hoverBorder} ${c.hoverGlow} ${
        highlight ? 'ring-1 ring-indigo-500/40' : ''
      }`}
    >
      <div>
        {/* Top bar: Icon & Tag */}
        <div className="flex items-center justify-between mb-5">
          <div
            className={`w-13 h-13 rounded-2xl bg-gradient-to-br border flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform ${c.iconBg}`}
          >
            <span>{icon}</span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold font-arabic border ${c.badge}`}
          >
            {tag}
          </span>
        </div>

        {/* Titles */}
        <h3 className="font-arabic font-extrabold text-xl text-white group-hover:text-white transition-colors mb-1">
          {titleAr}
        </h3>
        <p className="text-xs font-display font-semibold text-slate-400 uppercase tracking-wider mb-3">
          {titleEn}
        </p>

        {/* Description */}
        <p className="font-arabic text-sm text-slate-300/80 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
        <span className={`font-arabic text-xs font-bold flex items-center gap-2 ${c.cta}`}>
          <span>افتح الأداة الآن</span>
          <span className="transform group-hover:-translate-x-1 transition-transform">➜</span>
        </span>
        <span className="text-[11px] text-slate-500 font-arabic">بدون تسجيل</span>
      </div>
    </Link>
  )
}
