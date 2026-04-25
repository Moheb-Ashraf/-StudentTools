import React from 'react'

export default function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-ink-700 border-t-ink-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-ink-500 text-xs font-bold">S</span>
        </div>
      </div>
    </div>
  )
}
