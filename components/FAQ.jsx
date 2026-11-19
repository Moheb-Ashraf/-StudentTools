'use client'

import React, { useState } from 'react'

export default function FAQ({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="space-y-3 font-arabic">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-[#111827]/90 border-indigo-500/30 shadow-lg shadow-indigo-500/5'
                : 'bg-[#0F172A]/50 border-white/[0.06] hover:border-white/10'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full px-5 sm:px-6 py-4.5 text-right flex items-center justify-between gap-4 font-bold text-white text-base sm:text-lg focus:outline-none"
            >
              <span className="flex-1 leading-snug">{item.q}</span>
              <span
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs border transition-transform duration-200 flex-shrink-0 ${
                  isOpen
                    ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30 rotate-180'
                    : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
                }`}
              >
                ▼
              </span>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/[0.04] animate-fade-in">
                {item.a}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
