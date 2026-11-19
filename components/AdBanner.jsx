import React from 'react'

export default function AdBanner({ slot = 'banner', className = '' }) {
  return (
    <div
      className={`my-8 p-4 rounded-2xl bg-[#0F172A]/40 border border-white/[0.06] text-center text-xs text-slate-500 font-arabic ${className}`}
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        <span className="text-[11px] uppercase tracking-wider text-slate-500">إعلان / Advertisement</span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
      </div>
      <p className="text-slate-600 text-[11px]">مساحة إعلانية مخصصة لدعم الأدوات الأكاديمية المجانية للطلاب</p>
    </div>
  )
}
