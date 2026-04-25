import React, { useState } from 'react'
import SEOMeta from '../components/SEOMeta'
import FAQ from '../components/FAQ'
import AdBanner from '../components/AdBanner'
import ToolCard from '../components/ToolCard'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate the grade I need on my final exam? / كيف أحسب الدرجة المطلوبة في الامتحان النهائي؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the formula: Required = (Goal - Current × (1 - Final Weight)) / Final Weight. Example: Need 70% overall, have 65% currently, final worth 40%: (70 - 65×0.6) / 0.4 = 77.5%."
      }
    },
    {
      "@type": "Question",
      "name": "What if I need more than 100% on my final? / ماذا لو احتجت أكثر من 100%؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If the calculator shows you need more than 100%, it may be mathematically impossible to achieve your goal grade. Consider what the highest achievable grade is given your current score."
      }
    }
  ]
}

const faqItems = [
  {
    q: 'How does the final grade calculator work? / كيف تعمل حاسبة الدرجة النهائية؟',
    a: 'Enter your current grade, the weight of the final exam, and your desired overall grade. The calculator uses the formula: Required Final = (Desired Grade - Current Grade × (1 - Final Weight)) / Final Weight. أدخل درجتك الحالية ووزن الامتحان النهائي والدرجة المطلوبة.'
  },
  {
    q: 'What is a "weighted" final exam? / ما هو الامتحان النهائي "الموزون"؟',
    a: 'A weighted final means it counts for a specific percentage of your total grade. For example, if your final is worth 40%, it means 40% of your total course grade comes from the final exam. الامتحان الموزون يعني أنه يحسب بنسبة معينة من درجتك الكلية.'
  },
  {
    q: 'Can I still pass if I failed my midterms? / هل يمكنني النجاح بعد الرسوب في منتصف الفصل؟',
    a: 'It depends on your current grade and the weight of the final. Use our calculator to find the exact score you need. In some cases, an excellent final exam performance can still save your grade. يعتمد على درجتك الحالية ووزن الامتحان النهائي. استخدم الحاسبة لمعرفة الدرجة المطلوبة.'
  },
  {
    q: 'What if the required grade is over 100%? / ماذا لو كانت الدرجة المطلوبة أكثر من 100%؟',
    a: 'If the calculator shows you need more than 100% on your final, achieving your goal grade is mathematically impossible. Focus instead on the best grade you can realistically achieve. إذا احتجت أكثر من 100%، فهذا يعني أن هدفك غير قابل للتحقيق رياضياً.'
  }
]

export default function FinalGradeCalculator() {
  const [current, setCurrent] = useState('')
  const [desired, setDesired] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const c = parseFloat(current)
    const d = parseFloat(desired)
    const w = parseFloat(weight) / 100
    if (isNaN(c) || isNaN(d) || isNaN(w) || w <= 0 || w > 1) return
    const required = (d - c * (1 - w)) / w
    setResult({ required: required.toFixed(1), c, d, w: weight })
  }

  const reset = () => { setCurrent(''); setDesired(''); setWeight(''); setResult(null) }

  const getStatus = (r) => {
    if (r > 100) return { label: 'Not achievable / غير قابل للتحقيق', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', icon: '❌' }
    if (r < 0) return { label: 'You\'ve already passed! / نجحت بالفعل!', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: '🎉' }
    if (r <= 60) return { label: 'Easily achievable / سهل التحقيق', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: '✅' }
    if (r <= 80) return { label: 'Achievable with effort / ممكن بجهد', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', icon: '💪' }
    return { label: 'Challenging but possible / صعب لكن ممكن', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', icon: '⚠️' }
  }

  return (
    <>
      <SEOMeta
        title="Final Grade Calculator | حاسبة الدرجة النهائية - ماذا أحتاج في الامتحان؟"
        description="Free final grade calculator. Find out what grade you need on your final exam to pass or get your desired grade. احسب الدرجة المطلوبة في الامتحان النهائي للنجاح."
        canonical="/final-grade-calculator"
        keywords="final grade calculator, حاسبة الدرجة النهائية, ماذا أحتاج في الامتحان النهائي, what grade do I need, final exam calculator, حاسبة الامتحان النهائي, grade needed calculator"
        schemaData={faqSchema}
      />

      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="hero-gradient px-4 sm:px-6 text-center mb-10">
          <div className="max-w-3xl mx-auto">
            <span className="section-tag mb-4">🎯 Exam Tool</span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-3 leading-tight">
              Final Grade Calculator
              <span className="block text-2xl sm:text-3xl mt-1 font-arabic font-bold" style={{ color: '#34d399' }}>
                حاسبة الدرجة النهائية
              </span>
            </h1>
            <p className="text-ink-400 text-base sm:text-lg max-w-xl mx-auto">
              Find out exactly what grade you need on your final exam.
              اعرف بالضبط الدرجة التي تحتاجها في الامتحان النهائي للحصول على معدلك المطلوب.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AdBanner slot="final-top" className="max-w-2xl mx-auto" />

          {/* Calculator */}
          <div className="card card-glow p-6 sm:p-8 mb-8 max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-white text-xl mb-6">
              Enter Your Details
              <span className="block text-sm font-arabic font-normal text-ink-400 mt-0.5">أدخل بياناتك</span>
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-ink-300 text-sm font-semibold mb-1.5">
                  Current Grade (%) / درجتك الحالية
                  <span className="text-ink-500 font-normal ml-2 font-arabic text-xs">درجتك قبل الامتحان النهائي</span>
                </label>
                <input
                  type="number" min="0" max="100"
                  value={current} onChange={e => setCurrent(e.target.value)}
                  className="input-field" placeholder="e.g. 72"
                />
              </div>

              <div>
                <label className="block text-ink-300 text-sm font-semibold mb-1.5">
                  Final Exam Weight (%) / وزن الامتحان النهائي
                  <span className="text-ink-500 font-normal ml-2 font-arabic text-xs">نسبة الامتحان من الدرجة الكلية</span>
                </label>
                <input
                  type="number" min="1" max="100"
                  value={weight} onChange={e => setWeight(e.target.value)}
                  className="input-field" placeholder="e.g. 40"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {['20', '25', '30', '40', '50'].map(v => (
                    <button
                      key={v}
                      onClick={() => setWeight(v)}
                      className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                        weight === v ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-ink-700/40 text-ink-500 hover:text-ink-300'
                      }`}
                    >
                      {v}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-ink-300 text-sm font-semibold mb-1.5">
                  Desired Overall Grade (%) / الدرجة المطلوبة
                  <span className="text-ink-500 font-normal ml-2 font-arabic text-xs">الدرجة الكلية التي تريدها</span>
                </label>
                <input
                  type="number" min="0" max="100"
                  value={desired} onChange={e => setDesired(e.target.value)}
                  className="input-field" placeholder="e.g. 80"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    { label: 'Pass / ناجح', val: '60' },
                    { label: 'Good / جيد', val: '70' },
                    { label: 'V.Good / جيد جداً', val: '80' },
                    { label: 'Excellent / ممتاز', val: '90' },
                  ].map(({ label, val }) => (
                    <button
                      key={val}
                      onClick={() => setDesired(val)}
                      className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                        desired === val ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-ink-700/40 text-ink-500 hover:text-ink-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={calculate}
                className="btn-primary flex-1"
                style={{ background: 'linear-gradient(135deg,#10b981,#34d399)', boxShadow: '0 8px 24px rgba(16,185,129,0.2)' }}
              >
                Calculate / احسب
              </button>
              <button onClick={reset} className="btn-secondary">Reset</button>
            </div>
          </div>

          {/* Result */}
          {result && (() => {
            const r = parseFloat(result.required)
            const status = getStatus(r)
            return (
              <div className={`card border ${status.bg} p-6 sm:p-8 mb-8 animate-fade-up max-w-2xl mx-auto text-center`}>
                <p className="text-ink-400 text-sm mb-2 font-arabic">
                  لتحقيق {result.d}% الكلية — To achieve {result.d}% overall
                </p>
                <div className={`result-badge ${status.color} mb-3`}>
                  {r > 100 ? '> 100' : r < 0 ? '0' : result.required}
                  <span className="text-ink-500 text-2xl">%</span>
                </div>
                <p className="font-bold text-base">{status.icon} {status.label}</p>

                <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-ink-900/40 rounded-xl p-3">
                    <p className="text-ink-500 text-xs mb-1">Current / الحالية</p>
                    <p className="font-bold text-ink-200 text-lg">{result.c}%</p>
                  </div>
                  <div className="bg-ink-900/40 rounded-xl p-3">
                    <p className="text-ink-500 text-xs mb-1">Final Weight / وزن النهائي</p>
                    <p className="font-bold text-ink-200 text-lg">{result.w}%</p>
                  </div>
                  <div className="bg-ink-900/40 rounded-xl p-3">
                    <p className="text-ink-500 text-xs mb-1">Desired / المطلوبة</p>
                    <p className="font-bold text-ink-200 text-lg">{result.d}%</p>
                  </div>
                </div>

                {r <= 100 && r >= 0 && (
                  <div className="mt-5">
                    <p className="text-ink-500 text-xs mb-2">Required final score progress</p>
                    <div className="h-3 bg-ink-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(r, 100)}%`,
                          background: r <= 60 ? '#10b981' : r <= 80 ? '#f59e0b' : '#f43f5e'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })()}

          <AdBanner slot="final-mid" className="max-w-2xl mx-auto" />

          {/* SEO Content */}
          <article className="card p-6 sm:p-8 mb-8">
            <h2 className="font-display font-bold text-xl text-white mb-4">
              How to Calculate Your Required Final Exam Grade
              <span className="block text-base font-arabic font-normal text-ink-400 mt-1">كيف تحسب الدرجة المطلوبة في الامتحان النهائي</span>
            </h2>
            <div className="text-ink-400 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                The <strong className="text-ink-200">final grade calculator</strong> is every student's best friend during exam season. Whether you're aiming to pass, get an A, or maintain a scholarship GPA, knowing exactly what you need on your final exam lets you study smarter and focus your energy.
              </p>
              <p className="font-arabic text-right leading-loose">
                حاسبة الدرجة النهائية هي أفضل صديق للطلاب في موسم الامتحانات. سواء كنت تريد النجاح فقط أو الحصول على امتياز أو الحفاظ على منحة دراسية، معرفة ما تحتاجه بالضبط في الامتحان النهائي يساعدك على الدراسة بذكاء.
              </p>

              <h3 className="font-display font-semibold text-white text-lg mt-6">The Formula / القانون</h3>
              <div className="bg-ink-900/60 border border-emerald-500/20 rounded-xl p-4">
                <p className="text-emerald-400 font-bold text-sm font-mono text-center mb-2">
                  Required Final = (Desired% − Current% × (1 − Weight)) ÷ Weight
                </p>
                <p className="text-ink-500 text-xs text-center font-arabic">
                  الدرجة المطلوبة = (الدرجة المطلوبة الكلية − الدرجة الحالية × (1 − وزن النهائي)) ÷ وزن النهائي
                </p>
              </div>

              <h3 className="font-display font-semibold text-white text-lg mt-6">Example / مثال</h3>
              <div className="bg-ink-900/40 rounded-xl p-4 text-sm border border-ink-700/20">
                <p className="text-ink-300 mb-1">Current grade: <strong>65%</strong> | Desired: <strong>75%</strong> | Final weight: <strong>40%</strong></p>
                <p className="text-ink-400">= (75 − 65 × 0.60) / 0.40</p>
                <p className="text-ink-400">= (75 − 39) / 0.40</p>
                <p className="text-emerald-400 font-bold">= 36 / 0.40 = <strong>90%</strong> on the final</p>
              </div>

              <h3 className="font-display font-semibold text-white text-lg mt-6">Exam Strategy Tips / نصائح للامتحان</h3>
              <ul className="space-y-2">
                {[
                  ['🎯', 'Know your number — use this calculator before each exam', 'اعرف رقمك — استخدم هذه الحاسبة قبل كل امتحان'],
                  ['📖', 'Prioritize topics by weightage in the final exam', 'أعطِ الأولوية للمواضيع الأكثر وزناً في الامتحان'],
                  ['😴', 'Sleep well before exams — sleep consolidates memory', 'نم جيداً قبل الامتحانات — النوم يعزز الذاكرة'],
                  ['🕐', 'Practice past papers under timed conditions', 'تدرب على أسئلة السنوات السابقة في وقت محدد'],
                ].map(([icon, en, ar]) => (
                  <li key={en} className="flex gap-3">
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <div>
                      <p className="text-ink-300 text-sm">{en}</p>
                      <p className="font-arabic text-ink-500 text-xs">{ar}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <section className="mb-8">
            <h2 className="font-display font-bold text-xl text-white mb-5">FAQ / أسئلة شائعة</h2>
            <FAQ items={faqItems} />
          </section>

          <AdBanner slot="final-bottom" className="max-w-2xl mx-auto" />

          <section>
            <h2 className="font-display font-bold text-xl text-white mb-5">More Tools / المزيد</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ToolCard to="/gpa-calculator" icon="🎓" title="GPA Calculator" titleAr="حاسبة المعدل التراكمي" description="Calculate your cumulative GPA across all courses." color="ink" />
              <ToolCard to="/percentage-calculator" icon="📊" title="Percentage Calculator" titleAr="حاسبة النسبة المئوية" description="Calculate score percentages and grade comparisons." color="amber" />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
