'use client'

import React, { useState } from 'react'
import FAQ from '../../components/FAQ'
import AdBanner from '../../components/AdBanner'
import ToolCard from '../../components/ToolCard'

const faqItems = [
  {
    q: 'ما هي النسبة القانونية للغياب في الجامعات قبل صدور قرار الحرمان؟',
    a: 'في معظم الجامعات الحكومية والخاصة بمصر والدول العربية، يتم حرمان الطالب من دخول الامتحان النهائي إذا تجاوزت نسبة غيابه بدون عذر مقبول 25% من إجمالي عدد المحاضرات المقررة للمادة.',
  },
  {
    q: 'كم محاضرة يحق لي غيابها في مادة مدتها 14 أسبوعاً؟',
    a: 'إذا كانت المادة محاضرة واحدة أسبوعياً (14 محاضرة في الفصل): 25% تعادل 3.5 محاضرات. هذا يعني أنه يُسمح لك بغياب 3 محاضرات كحد أقصى، والمحاضرة الرابعة تؤدي مباشرة إلى الحرمان.',
  },
  {
    q: 'هل العذر الطبي المعتمد يلغي نسبة الغياب؟',
    a: 'تقديم عذر طبي رسمي ومعتمد من الإدارة الطبية بالجامعة يرفع عادة الحد المسموح به للغياب إلى 30% أو 35% حسب موافقة مجلس الكلية.',
  },
]

export default function AttendanceCalculatorPage() {
  const [totalClasses, setTotalClasses] = useState('14')
  const [missedClasses, setMissedClasses] = useState('2')
  const [maxAllowedPercent, setMaxAllowedPercent] = useState('25')

  const total = parseFloat(totalClasses) || 0
  const missed = parseFloat(missedClasses) || 0
  const limitPct = parseFloat(maxAllowedPercent) || 25

  let currentPercent = 0
  let maxAllowedAbsences = 0
  let remainingAbsences = 0
  let status = 'safe' // 'safe' | 'warning' | 'banned'

  if (total > 0) {
    currentPercent = (missed / total) * 100
    maxAllowedAbsences = Math.floor((total * limitPct) / 100)
    remainingAbsences = maxAllowedAbsences - missed

    if (currentPercent > limitPct) {
      status = 'banned'
    } else if (remainingAbsences <= 1) {
      status = 'warning'
    } else {
      status = 'safe'
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 font-arabic">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-3">
          ⏱️ حاسبة الحضور ونسب الغياب
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
          حاسبة نسبة الغياب وحد الحرمان (25%)
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          احسب عدد المحاضرات التي غبتها بدقة واعرف كم غياباً متبقياً لك قبل صدور إنذار أو حرمان من المادة.
        </p>
      </div>

      {/* Main Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/90 border border-white/[0.08] shadow-2xl mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              إجمالي محاضرات التيرم (12 - 15):
            </label>
            <input
              type="number"
              min="1"
              value={totalClasses}
              onChange={(e) => setTotalClasses(e.target.value)}
              className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white text-center focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              المحاضرات التي غبتها حتى الآن:
            </label>
            <input
              type="number"
              min="0"
              value={missedClasses}
              onChange={(e) => setMissedClasses(e.target.value)}
              className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white text-center focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              حد الحرمان المسموح به (%):
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={maxAllowedPercent}
              onChange={(e) => setMaxAllowedPercent(e.target.value)}
              className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white text-center focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Status Output Box */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border text-center transition-all ${
            status === 'safe'
              ? 'bg-emerald-950/20 border-emerald-500/30'
              : status === 'warning'
              ? 'bg-amber-950/20 border-amber-500/30'
              : 'bg-rose-950/30 border-rose-500/40'
          }`}
        >
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
            نسبة غيابك الحالية في المادة
          </span>
          <div
            className={`text-6xl sm:text-7xl font-black mb-3 ${
              status === 'safe'
                ? 'text-emerald-400'
                : status === 'warning'
                ? 'text-amber-400'
                : 'text-rose-400'
            }`}
          >
            {currentPercent.toFixed(1)}%
          </div>

          <div className="text-lg font-bold mb-3">
            {status === 'safe' && <span className="text-emerald-300">✅ وضعك آمن — لا يوجد خطر حرمان حالياً</span>}
            {status === 'warning' && <span className="text-amber-300">⚠️ تنبيه — اقتربت بشدة من حد الحرمان!</span>}
            {status === 'banned' && <span className="text-rose-400">⛔ خطر حرمان — لقد تجاوزت النسبة القانونية المسموحة!</span>}
          </div>

          <div className="inline-block px-5 py-3 rounded-2xl bg-slate-900/80 border border-white/10 text-sm font-bold text-white">
            {remainingAbsences > 0 ? (
              <>
                متبقي لك غياب <span className="text-emerald-400 text-lg px-1">{remainingAbsences}</span> محاضرة كحد أقصى قبل صدور قرار الحرمان.
              </>
            ) : remainingAbsences === 0 ? (
              <span className="text-amber-400">أي غياب قادم سيؤدي مباشرة لصدور قرار حرمانك من المادة!</span>
            ) : (
              <span className="text-rose-400">لقد تجاوزت الحد بـ {Math.abs(remainingAbsences)} محاضرة! تواصل مع أستاذ المادة فوراً.</span>
            )}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6 text-center">
          أسئلة شائعة حول الحضور والغياب
        </h2>
        <FAQ items={faqItems} />
      </section>

      <AdBanner slot="attendance-bottom" />

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
            description="احسب درجات الفاينال المطلوبة لاجتياز المادة."
            color="amber"
          />
        </div>
      </section>
    </div>
  )
}
