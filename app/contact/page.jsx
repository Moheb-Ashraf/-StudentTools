'use client'

import React, { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 font-arabic">
      <div className="p-8 sm:p-12 rounded-3xl bg-[#111827]/90 border border-white/[0.08] shadow-2xl">
        <div className="text-center mb-10 pb-8 border-b border-white/[0.08]">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-3">
            📬 نحن هنا لمساعدتك
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
            اتصل بنا (Contact Us)
          </h1>
          <p className="text-slate-300 text-base max-w-md mx-auto">
            لديك اقتراح لأداة جديدة؟ واجهت خطأ في الحساب؟ يسعدنا دائماً سماع رأيك.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-10 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-emerald-400 mb-2">تم استلام رسالتك بنجاح!</h3>
            <p className="text-slate-300 text-sm">شكراً لتواصلك معنا، سنرد على بريدك الإلكتروني في أقرب وقت.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-secondary text-xs mt-4"
            >
              إرسال رسالة أخرى
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                الاسم / Your Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="محمد أحمد"
                className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                البريد الإلكتروني / Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="student@example.com"
                className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                الرسالة أو الاقتراح / Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="أود اقتراح إضافة حاسبة خاصة بنظام جامعتي..."
                className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <button type="submit" className="btn-primary w-full py-4 text-base font-black">
              ✉️ إرسال الرسالة الآن
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center text-xs text-slate-500">
          أو يمكنك مراسلتنا مباشرة عبر البريد الإلكتروني المعتمد:
          <a
            href="mailto:studenttoolapp@gmail.com"
            className="block font-mono text-cyan-400 hover:text-cyan-300 mt-1 font-bold transition-colors"
          >
            studenttoolapp@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}
