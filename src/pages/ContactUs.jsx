import React, { useState } from 'react'
import SEOMeta from '../components/SEOMeta'

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
  }

  return (
    <>
      <SEOMeta
        title="Contact Us | اتصل بنا"
        description="Contact Student Tools team for support, feature suggestions, and inquiries. تواصل مع فريق أدوات الطلاب."
        canonical="/contact"
      />

      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="card p-6 sm:p-10 text-ink-100">
          <div className="text-center mb-8 border-b border-ink-700/40 pb-6">
            <span className="section-tag mb-3">📬 Get in Touch / تواصل معنا</span>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-2">
              Contact Us / اتصل بنا
            </h1>
            <p className="text-ink-400 text-sm max-w-md mx-auto">
              لديك اقتراح لأداة جديدة؟ واجهتك مشكلة في الحساب؟ يسعدنا دائماً سماع رأيك!
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">تم استلام رسالتك بنجاح!</h3>
              <p className="text-ink-300 text-sm">شكراً لتواصلك معنا، سنرد على بريدك الإلكتروني في أقرب وقت.</p>
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
                <label className="block text-sm font-semibold text-ink-200 mb-1.5 text-right font-arabic">
                  الاسم / Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="محمد أحمد"
                  className="input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink-200 mb-1.5 text-right font-arabic">
                  البريد الإلكتروني / Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="student@example.com"
                  className="input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink-200 mb-1.5 text-right font-arabic">
                  الرسالة أو الاقتراح / Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="أود اقتراح إضافة حاسبة خاصة بنظام جامعتي..."
                  className="input w-full resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3.5 text-base font-bold">
                ✉️ إرسال الرسالة / Send Message
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-ink-700/30 text-center text-xs text-ink-500">
            أو تواصل معنا مباشرة عبر البريد الإلكتروني:
            <span className="block font-mono text-ink-300 mt-1">support@studenttools.app</span>
          </div>
        </div>
      </div>
    </>
  )
}
