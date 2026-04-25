import React from 'react'
import { Link } from 'react-router-dom'

export default function ToolCard({ to, icon, title, titleAr, description, color = 'ink' }) {
  const colors = {
    ink: 'from-ink-500/20 to-ink-600/10 border-ink-500/30 hover:border-ink-400/50',
    amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 hover:border-amber-400/50',
    emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 hover:border-emerald-400/50',
    rose: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 hover:border-rose-400/50',
  }

  const iconColors = {
    ink: 'bg-ink-500/20 text-ink-300',
    amber: 'bg-amber-500/20 text-amber-300',
    emerald: 'bg-emerald-500/20 text-emerald-300',
    rose: 'bg-rose-500/20 text-rose-300',
  }

  return (
    <Link
      to={to}
      className={`block p-5 rounded-2xl border bg-gradient-to-br ${colors[color]} 
                  transition-all duration-300 hover:-translate-y-1 group card-glow`}
    >
      <div className={`w-10 h-10 rounded-xl ${iconColors[color]} flex items-center justify-center mb-3 text-xl`}>
        {icon}
      </div>
      <h3 className="font-display font-bold text-white text-base mb-0.5">{title}</h3>
      <p className="font-arabic text-ink-500 text-xs mb-2">{titleAr}</p>
      <p className="text-ink-400 text-sm">{description}</p>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink-300 group-hover:text-white mt-3 transition-colors">
        Try it free
        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  )
}
