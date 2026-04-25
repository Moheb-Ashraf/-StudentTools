import React, { useState } from 'react'

export default function FAQ({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`faq-item ${open === i ? 'border-ink-600/60 bg-ink-900/40' : 'bg-ink-900/20'}`}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
          >
            <span className="font-semibold text-ink-100 text-sm sm:text-base">
              {item.q}
            </span>
            <svg
              className={`w-5 h-5 flex-shrink-0 text-ink-400 transition-transform duration-300 ${open === i ? 'rotate-180 text-ink-300' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-ink-400 text-sm leading-relaxed border-t border-ink-700/30 pt-4 animate-fade-in">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
