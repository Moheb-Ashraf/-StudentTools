'use client'

import React, { useState } from 'react'
import FAQ from '../../components/FAQ'
import AdBanner from '../../components/AdBanner'
import ToolCard from '../../components/ToolCard'

const faqItems = [
  {
    q: 'كيف أحسب نسبتي المئوية من المجموع الكلي للدرجات؟',
    a: 'القاعدة الرياضية هي: (الدرجة التي حصلت عليها ÷ المجموع الكلي) × 100. على سبيل المثال، إذا حصلت على 340 من 410: (340 ÷ 410) × 100 = 82.92%.',
  },
  {
    q: 'ما هي النسبة المطلوبة للحصول على تقدير جيد جداً وامتياز؟',
    a: 'في النظام الجامعي وثانويات الدول العربية: ممتاز (امتياز): من 85% أو 90% فأكثر، جيد جداً: من 75% إلى أقل من 85%، جيد: من 65% إلى أقل من 75%، مقبول: من 50% أو 60% إلى أقل من 65%.',
  },
  {
    q: 'كيف أحسب نسبة الزيادة في الدرجات بين فصلين دراسيين؟',
    a: 'نسبة التغير = ((الدرجة الجديدة - الدرجة القديمة) ÷ الدرجة القديمة) × 100. توفر الأداة وضعاً مخصصاً لحساب نسبة الزيادة والنقصان فورياً.',
  },
]

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState('score') // 'score' | 'change' | 'find'
  
  // Mode 1: Score of Total
  const [score, setScore] = useState('')
  const [total, setTotal] = useState('')

  // Mode 2: Change
  const [oldVal, setOldVal] = useState('')
  const [newVal, setNewVal] = useState('')

  // Mode 3: Percentage of value
  const [pct, setPct] = useState('')
  const [baseVal, setBaseVal] = useState('')

  // Calculation results
  let result = null

  if (mode === 'score') {
    const s = parseFloat(score)
    const t = parseFloat(total)
    if (!isNaN(s) && !isNaN(t) && t > 0) {
      const p = (s / t) * 100
      let grade = 'راسب / غير مجتاز'
      let color = 'text-rose-400'
      if (p >= 85) { grade = 'امتياز (Excellent) 🌟'; color = 'text-emerald-400' }
      else if (p >= 75) { grade = 'جيد جداً (Very Good) 👏'; color = 'text-indigo-400' }
      else if (p >= 65) { grade = 'جيد (Good) 👍'; color = 'text-amber-400' }
      else if (p >= 50) { grade = 'مقبول (Pass)'; color = 'text-amber-500' }

      result = {
        main: `${p.toFixed(2)}%`,
        sub: `التقدير العام: ${grade}`,
        progress: Math.min(100, Math.max(0, p)),
        color,
      }
    }
  } else if (mode === 'change') {
    const o = parseFloat(oldVal)
    const n = parseFloat(newVal)
    if (!isNaN(o) && !isNaN(n) && o !== 0) {
      const diff = n - o
      const changePct = (diff / Math.abs(o)) * 100
      const isIncrease = diff >= 0
      result = {
        main: `${isIncrease ? '+' : ''}${changePct.toFixed(2)}%`,
        sub: isIncrease ? 'زيادة بنسبة إيجابية 📈' : 'انخفاض بنسبة سلبية 📉',
        progress: 100,
        color: isIncrease ? 'text-emerald-400' : 'text-rose-400',
      }
    }
  } else if (mode === 'find') {
    const p = parseFloat(pct)
    const b = parseFloat(baseVal)
    if (!isNaN(p) && !isNaN(b)) {
      const value = (p / 100) * b
      result = {
        main: value.toFixed(2),
        sub: `${p}% من ${b} يساوي ${value.toFixed(2)}`,
        progress: Math.min(100, Math.max(0, p)),
        color: 'text-indigo-400',
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 font-arabic">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-3">
          📊 حاسبة الدرجات والنسب المئوية
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
          حاسبة النسبة المئوية
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          احسب نسبتك المئوية من المجموع، أو مقدار الزيادة والانخفاض، والتقدير الأكاديمي فوراً.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8">
        {[
          { id: 'score', label: 'نسبة الدرجة من المجموع', desc: 'مثل: 380 من 410' },
          { id: 'change', label: 'نسبة الزيادة والنقصان', desc: 'مقارنة بين رقمين' },
          { id: 'find', label: 'أوجد القيمة من النسبة', desc: 'مثل: 20% من 500' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`p-4 rounded-2xl text-right transition-all border ${
              mode === m.id
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-[#111827]/70 border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <span className="block font-bold text-sm sm:text-base">{m.label}</span>
            <span className="block text-xs opacity-80 mt-0.5">{m.desc}</span>
          </button>
        ))}
      </div>

      {/* Main Calculation Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/90 border border-white/[0.08] shadow-2xl mb-10">
        {mode === 'score' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                الدرجة الحاصل عليها:
              </label>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="مثال: 375"
                className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                المجموع الكلي:
              </label>
              <input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="مثال: 410 أو 100"
                className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {mode === 'change' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                القيمة / الدرجة القديمة:
              </label>
              <input
                type="number"
                value={oldVal}
                onChange={(e) => setOldVal(e.target.value)}
                placeholder="مثال: 65"
                className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                القيمة / الدرجة الجديدة:
              </label>
              <input
                type="number"
                value={newVal}
                onChange={(e) => setNewVal(e.target.value)}
                placeholder="مثال: 80"
                className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {mode === 'find' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                النسبة المئوية المراد حسابها (%):
              </label>
              <input
                type="number"
                value={pct}
                onChange={(e) => setPct(e.target.value)}
                placeholder="مثال: 15"
                className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                من إجمالي الرقم:
              </label>
              <input
                type="number"
                value={baseVal}
                onChange={(e) => setBaseVal(e.target.value)}
                placeholder="مثال: 500"
                className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {/* Live Result Output */}
        {result ? (
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#161F32] to-[#0E1524] border border-indigo-500/30 text-center animate-fade-in">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
              النتيجة المحسوبة
            </span>
            <div className={`text-5xl sm:text-6xl font-black mb-2 ${result.color}`}>
              {result.main}
            </div>
            <p className="text-sm sm:text-base font-bold text-white mb-4">
              {result.sub}
            </p>

            {/* Visual Progress Bar */}
            <div className="max-w-xs mx-auto h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${result.progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 text-sm">
            أدخل الأرقام في الحقول أعلاه وستظهر النتيجة فورياً
          </div>
        )}
      </div>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6 text-center">
          أسئلة شائعة حول حساب النسبة المئوية
        </h2>
        <FAQ items={faqItems} />
      </section>

      <AdBanner slot="percentage-bottom" />

      {/* Related Tools */}
      <section>
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          أدوات أكاديمية ذات صلة
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ToolCard
            href="/gpa-calculator"
            icon="🎓"
            titleAr="حاسبة المعدل التراكمي (GPA)"
            titleEn="GPA CALCULATOR"
            description="احسب معدلك التراكمي والفصلي بالساعات المعتمدة."
            color="emerald"
          />
          <ToolCard
            href="/final-grade-calculator"
            icon="🎯"
            titleAr="حاسبة الدرجة المطلوبة في الفاينال"
            titleEn="FINAL GRADE"
            description="احسب الدرجة المطلوبة لاجتياز الاختبار النهائي."
            color="amber"
          />
        </div>
      </section>
    </div>
  )
}
