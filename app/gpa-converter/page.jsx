'use client'

import React, { useState } from 'react'
import FAQ from '../../components/FAQ'
import AdBanner from '../../components/AdBanner'
import ToolCard from '../../components/ToolCard'

const faqItems = [
  {
    q: 'كيف يُحول معدل 4.0 إلى نسبة مئوية % رسمياً؟',
    a: 'هناك طريقتان معتمدتان: 1) التحويل المباشر: (المعدل ÷ 4) × 100، 2) المعادلة القياسية للجامعات الأمريكية ومؤسسة WES: (المعدل × 20) + 20. تظهر لك أداتنا النتيجتين معاً لاختيار ما تعتمده كليتك.',
  },
  {
    q: 'كم يعادل معدل 3.5 من 5.0 على مقياس 4.0؟',
    a: 'معدل 3.5 من 5.0 يعادل تقريباً 2.80 على مقياس 4.0 (تقدير جيد)، ويعادل نسبة مئوية تقريبية 70%.',
  },
  {
    q: 'لماذا تستخدم بعض الجامعات مقياس 5.0 والبعض الآخر مقياس 4.0؟',
    a: 'الجامعات السعودية ومعظم جامعات الخليج تستخدم تاريخياً مقياس 5.0، بينما الجامعات المصرية والجامعات الخاصة تتبع النظام الأمريكي 4.0. يحتاج الطلاب هذا التحويل باستمرار عند التقديم للدراسات العليا أو الوظائف.',
  },
]

export default function GPAConverterPage() {
  const [mode, setMode] = useState('gpa4ToPct') // 'gpa4ToPct' | 'pctToGpa4' | 'scale5to4' | 'scale4to5'
  const [val, setVal] = useState('')

  const num = parseFloat(val)
  let result = null

  if (!isNaN(num) && num >= 0) {
    if (mode === 'gpa4ToPct' && num <= 4.0) {
      const direct = (num / 4) * 100
      const standard = Math.min(100, Math.max(0, num * 20 + 20))
      result = {
        primary: `${direct.toFixed(1)}%`,
        secondary: `أو ${standard.toFixed(1)}% (طبقاً لمعادلة WES القياسية)`,
        label: num >= 3.7 ? 'امتياز (Excellent) 🌟' : num >= 3.0 ? 'جيد جداً (Very Good)' : num >= 2.0 ? 'جيد (Good)' : 'مقبول / ضعيف',
      }
    } else if (mode === 'pctToGpa4' && num <= 100) {
      const gpa = (num / 100) * 4
      result = {
        primary: `${gpa.toFixed(2)} / 4.0`,
        secondary: num >= 85 ? 'تقدير امتياز (A)' : num >= 75 ? 'تقدير جيد جداً (B)' : num >= 65 ? 'تقدير جيد (C)' : 'تقدير مقبول / ضعيف',
        label: 'معدل تراكمي تقريبي',
      }
    } else if (mode === 'scale5to4' && num <= 5.0) {
      const gpa4 = (num * 4) / 5
      result = {
        primary: `${gpa4.toFixed(2)} / 4.0`,
        secondary: `يعادل نسبة مئوية ${((num / 5) * 100).toFixed(1)}%`,
        label: num >= 4.5 ? 'ممتاز مرتفع (A+)' : num >= 3.75 ? 'جيد جداً (B)' : num >= 2.75 ? 'جيد (C)' : 'مقبول',
      }
    } else if (mode === 'scale4to5' && num <= 4.0) {
      const gpa5 = (num * 5) / 4
      result = {
        primary: `${gpa5.toFixed(2)} / 5.0`,
        secondary: `يعادل نسبة مئوية ${((num / 4) * 100).toFixed(1)}%`,
        label: 'التحويل من مقياس 4 إلى مقياس 5',
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 font-arabic">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-3">
          🔄 محول المقاييس الأكاديمية
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
          محول المعدل التراكمي إلى نسبة مئوية
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          حول معدلك التراكمي بين مقياس 4.0 ومقياس 5.0 والنسبة المئوية بدقة وطبقاً للمعادلات المعتمدة.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 text-xs font-bold">
        {[
          { id: 'gpa4ToPct', label: 'معدل 4.0 ➜ نسبة %' },
          { id: 'pctToGpa4', label: 'نسبة % ➜ معدل 4.0' },
          { id: 'scale5to4', label: 'مقياس 5.0 ➜ مقياس 4.0' },
          { id: 'scale4to5', label: 'مقياس 4.0 ➜ مقياس 5.0' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setVal('') }}
            className={`p-3.5 rounded-2xl border transition-all text-center ${
              mode === m.id
                ? 'bg-cyan-500 text-slate-950 font-black border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-[#111827]/70 border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Main Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/90 border border-white/[0.08] shadow-2xl mb-10">
        <label className="block text-sm font-bold text-slate-200 mb-2">
          {mode === 'gpa4ToPct' && 'أدخل المعدل التراكمي من 4.0 (مثال: 3.45):'}
          {mode === 'pctToGpa4' && 'أدخل النسبة المئوية من 100 (مثال: 84.5):'}
          {mode === 'scale5to4' && 'أدخل المعدل من مقياس 5.0 (مثال: 4.25):'}
          {mode === 'scale4to5' && 'أدخل المعدل من مقياس 4.0 (مثال: 3.6):'}
        </label>

        <div className="mb-6">
          <input
            type="number"
            step="0.01"
            min="0"
            max={mode === 'pctToGpa4' ? 100 : mode === 'scale5to4' ? 5 : 4}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={mode === 'pctToGpa4' ? '85' : mode === 'scale5to4' ? '4.2' : '3.5'}
            className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-5 py-4 text-center text-3xl font-black text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Live Result Display */}
        {result ? (
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#161F32] to-[#0E1524] border border-cyan-500/30 text-center animate-fade-in">
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold block mb-1">
              النتيجة المحسوبة
            </span>
            <div className="text-5xl sm:text-6xl font-black text-white mb-2">
              {result.primary}
            </div>
            <p className="text-sm font-bold text-slate-200 mb-1">{result.label}</p>
            <p className="text-xs text-slate-400">{result.secondary}</p>
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 text-sm">
            أدخل الرقم أعلاه للحصول على النتيجة فورياً
          </div>
        )}
      </div>

      {/* Comparative Conversion Table */}
      <article className="p-6 sm:p-8 rounded-3xl bg-[#111827]/70 border border-white/[0.06] mb-12">
        <h2 className="text-xl font-black text-white mb-4">جدول مقارنة المقاييس والتقديرات الأكاديمية</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs sm:text-sm">
            <thead className="bg-slate-900/80 text-slate-400 font-bold border-b border-white/[0.06]">
              <tr>
                <th className="p-3">مقياس 4.0</th>
                <th className="p-3">مقياس 5.0</th>
                <th className="p-3">النسبة المئوية %</th>
                <th className="p-3">التقدير العام</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-slate-300">
              <tr><td className="p-3 font-bold text-emerald-400">3.70 - 4.00</td><td>4.75 - 5.00</td><td>90% - 100%</td><td>امتياز مرتفع (A+)</td></tr>
              <tr><td className="p-3 font-bold text-cyan-400">3.00 - 3.69</td><td>3.75 - 4.74</td><td>80% - 89%</td><td>جيد جداً (B)</td></tr>
              <tr><td className="p-3 font-bold text-amber-400">2.00 - 2.99</td><td>2.75 - 3.74</td><td>65% - 79%</td><td>جيد (C)</td></tr>
              <tr><td className="p-3 font-bold text-amber-500">1.00 - 1.99</td><td>1.75 - 2.74</td><td>50% - 64%</td><td>مقبول (D)</td></tr>
              <tr><td className="p-3 font-bold text-rose-400">&lt; 1.00</td><td>&lt; 1.75</td><td>&lt; 50%</td><td>راسب (F)</td></tr>
            </tbody>
          </table>
        </div>
      </article>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6 text-center">
          أسئلة شائعة حول تحويل المعدل
        </h2>
        <FAQ items={faqItems} />
      </section>

      <AdBanner slot="converter-bottom" />

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
            href="/percentage-calculator"
            icon="📊"
            titleAr="حاسبة النسبة المئوية"
            titleEn="PERCENTAGE"
            description="احسب نسبة الدرجة من المجموع والتقدير الأكاديمي."
            color="indigo"
          />
        </div>
      </section>
    </div>
  )
}
