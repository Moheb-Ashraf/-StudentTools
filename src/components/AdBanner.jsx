import React from 'react'

export default function AdBanner({ slot = 'banner', className = '' }) {
  return (
    <div className={`ad-placeholder ${className}`}>
      <div className="flex flex-col items-center gap-2">
        <svg className="w-6 h-6 text-ink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="text-ink-500 text-xs">
          Advertisement · إعلان
          <span className="block text-ink-700 mt-0.5">
            Google AdSense — slot: {slot}
          </span>
        </p>
      </div>
      {/* Paste your AdSense ins tag here:
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true" />
      */}
    </div>
  )
}
