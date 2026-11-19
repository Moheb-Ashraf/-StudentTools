'use client'

import React, { useState } from 'react'
import FAQ from '../../components/FAQ'
import AdBanner from '../../components/AdBanner'
import ToolCard from '../../components/ToolCard'

const faqItems = [
  {
    q: 'كيف تعمل معادلة حساب الدرجة المطلوبة في الفاينال؟',
    a: 'المعادلة الرياضية هي: الدرجة المطلوبة في الفاينال = (الدرجة الإجمالية المرغوبة - (الدرجة الحالية × (1 - وزن الفاينال))) ÷ وزن الفاينال.',
  },
  {
    q: 'ماذا لو أظهرت الحاسبة أنني أحتاج أكثر من 100%؟',
    a: 'إذا كانت النتيجة أكثر من 100%، فهذا يعني أنه رياضياً لا يمكن الوصول إلى التقدير المستهدف لأن أعلى درجة ممكنة في الامتحان هي 100%. في هذه الحالة، ننصحك بتحديد تقدير واقعي أقل لمعرفة الدرجة الممكنة.',
  },
  {
    q: 'ماذا يعني "وزن الامتحان النهائي"؟',
    a: 'وزن الامتحان النهائي هو النسبة المئوية المخصصة للفاينال من مجموع المادة الكلي. على سبيل المثال، إذا كانت المادة من 100 درجة والفاينال من 40 درجة، فإن وزن الفاينال هو 40%.',
  },
]

export default function FinalGradeCalculatorPage() {
  const [current, setCurrent] = useState('')
  const [weight, setWeight] = useState('40')
  const [desired, setDesired] = useState('60')

  const c = parseFloat(current)
  const w = parseFloat(weight) / 100
  const d = parseFloat(desired)

  let result = null

  if (!isNaN(c) && !isNaN(w) && !isNaN(d) && w > 0 && w <= 1) {
    const required = (d - c * (1 - w)) / w
    result = {
      val: required.toFixed(1),
      isImpossible: required > 100,
      isPassedAlready: required <= 0,
      isAchievable: required > 0 && required <= 100,
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 font-arabic">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
          🎯 حاسبة اجتياز الامتحانات والفاينال
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
          حاسبة الدرجة المطلوبة في الفاينال
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          اعرف كم درجة تحتاج بدقة في الامتحان النهائي لتحقيق التقدير الذي تريده أو للنجاح في المادة.
        </p>
      </div>

      {/* Main Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/90 border border-white/[0.08] shadow-2xl mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              درجتك الحالية في أعمال السنة (%):
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="مثال: 70"
              className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white focus:outline-none focus:border-amber-500 text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              وزن الامتحان النهائي (%):
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="مثال: 40 أو 50"
              className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white focus:outline-none focus:border-amber-500 text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              التقدير / الدرجة الإجمالية المستهدفة (%):
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={desired}
              onChange={(e) => setDesired(e.target.value)}
              placeholder="مثال: 60 للنجاح أو 85 للامتياز"
              className="w-full bg-[#161F32] border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white focus:outline-none focus:border-amber-500 text-center"
            />
          </div>
        </div>

        {/* Quick Goal Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs font-bold">
          <span className="text-slate-400">أهداف شائعة:</span>
          {[
            { label: 'مجرد النجاح (60%)', val: '60' },
            { label: 'تقدير جيد (70%)', val: '70' },
            { label: 'تقدير جيد جداً (75%)', val: '75' },
            { label: 'تقدير امتياز (85%)', val: '85' },
          ].map((preset) => (
            <button
              key={preset.val}
              onClick={() => setDesired(preset.val)}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                desired === preset.val
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-white/[0.03] text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Live Result Display */}
        {result ? (
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#161F32] to-[#0E1524] border border-amber-500/30 text-center animate-fade-in">
            {result.isPassedAlready && (
              <>
                <div className="text-5xl mb-2">🎉</div>
                <div className="text-3xl font-black text-emerald-400 mb-2">
                  لقد حققت هدفك بالفعل!
                </div>
                <p className="text-slate-300 text-sm">
                  درجات أعمال السنة الحالية تكفيك لتحقيق {desired}% حتى بدون درجات إضافية في الفاينال.
                </p>
              </>
            )}

            {result.isAchievable && (
              <>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block mb-1">
                  الدرجة المطلوبة في امتحان الفاينال
                </span>
                <div className="text-6xl sm:text-7xl font-black text-gradient-amber mb-2">
                  {result.val}%
                </div>
                <p className="text-base font-bold text-white mb-2">
                  تحتاج إلى الحصول على {result.val}% على الأقل في الامتحان النهائي لتحقيق {desired}% كتقدير عام.
                </p>
                <p className="text-xs text-slate-400">
                  {parseFloat(result.val) <= 60
                    ? 'الهدف متاح جداً وبمجهود طبيعي يمكنك تجاوزه بسهولة! 💪'
                    : parseFloat(result.val) <= 85
                    ? 'الهدف واقعي ومتاح لكنه يتطلب منك مراجعة وحل امتحانات سابقة بتركيز 📚'
                    : 'الهدف يتطلب أداءً استثنائياً وتقريباً الدرجة الكاملة في الامتحان ⚡'}
                </p>
              </>
            )}

            {result.isImpossible && (
              <>
                <div className="text-5xl mb-2">⚠️</div>
                <div className="text-2xl font-black text-rose-400 mb-2">
                  مستحيل رياضياً تحقيق {desired}%
                </div>
                <p className="text-slate-300 text-sm mb-2">
                  الحاسبة أظهرت أنك تحتاج إلى {result.val}%، وبما أن الدرجة القصوى في الفاينال هي 100% فقط، فإن هذا التقدير غير ممكن.
                </p>
                <p className="text-xs text-amber-400">
                  نصيحة: قلل التقدير المستهدف (مثلاً جرب 70% أو 60%) لمعرفة أعلى تقدير واقعي يمكنك التخرج به.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 text-sm">
            أدخل درجاتك الحالية أعلاه وستظهر النتيجة فورياً
          </div>
        )}
      </div>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6 text-center">
          أسئلة شائعة حول حساب درجات الفاينال
        </h2>
        <FAQ items={faqItems} />
      </section>

      <AdBanner slot="final-bottom" />

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
            href="/attendance-calculator"
            icon="⏱️"
            titleAr="حاسبة نسبة الغياب والإنذار"
            titleEn="ATTENDANCE CALCULATOR"
            description="احسب نسبة غيابك وتجنب الحرمان من دخول الامتحان النهائي."
            color="rose"
          />
        </div>
      </section>
    </div>
  )
}
