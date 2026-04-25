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
      "name": "How do I calculate my score percentage? / كيف أحسب نسبتي المئوية؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divide your score by the total marks and multiply by 100. Example: 75/100 × 100 = 75%. اقسم درجتك على الدرجة الكلية واضرب في 100."
      }
    },
    {
      "@type": "Question",
      "name": "What percentage is needed to pass? / ما النسبة المطلوبة للنجاح؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most universities require 50-60% to pass. Some courses require 60% minimum. Check your university's grading policy. معظم الجامعات تتطلب 50-60% للنجاح."
      }
    }
  ]
}

const faqItems = [
  {
    q: 'How do I calculate my percentage? / كيف أحسب نسبتي المئوية؟',
    a: 'Divide your marks obtained by total marks, then multiply by 100. Formula: (Obtained ÷ Total) × 100 = Percentage%. Example: (85 ÷ 100) × 100 = 85%. اقسم درجتك على الدرجة الكلية واضرب في 100.'
  },
  {
    q: 'What is the percentage needed for distinction? / ما نسبة الامتياز؟',
    a: 'In Egypt and most Arab countries: Excellent (90-100%), Very Good (80-90%), Good (70-80%), Acceptable (60-70%), Pass (50-60%). في مصر ومعظم الدول العربية: ممتاز 90-100%، جيد جداً 80-90%، جيد 70-80%، مقبول 60-70%، ناجح 50-60%.'
  },
  {
    q: 'How do I calculate percentage increase? / كيف أحسب نسبة الزيادة؟',
    a: 'Percentage increase = ((New Value - Old Value) / Old Value) × 100. Example: From 60 to 80: ((80-60)/60) × 100 = 33.3% increase. نسبة الزيادة = ((القيمة الجديدة - القيمة القديمة) / القيمة القديمة) × 100.'
  },
  {
    q: 'What is 60 out of 80 as a percentage? / ما نسبة 60 من 80؟',
    a: '60 out of 80 = (60/80) × 100 = 75%. You can use our calculator above to solve this instantly. 60 من 80 = (60÷80) × 100 = 75%.'
  }
]

const MODES = [
  { id: 'basic', label: 'Score %', labelAr: 'نسبة الدرجة', desc: 'What % is X of Y?' },
  { id: 'increase', label: '% Change', labelAr: 'نسبة التغيير', desc: 'Increase / Decrease' },
  { id: 'find', label: 'Find Score', labelAr: 'أوجد الدرجة', desc: 'X% of Y = ?' },
]

const gradeFromPercent = (p) => {
  if (p >= 90) return { letter: 'A / ممتاز', color: 'text-emerald-400' }
  if (p >= 80) return { letter: 'B / جيد جداً', color: 'text-ink-300' }
  if (p >= 70) return { letter: 'C / جيد', color: 'text-amber-400' }
  if (p >= 60) return { letter: 'D / مقبول', color: 'text-amber-500' }
  return { letter: 'F / راسب', color: 'text-rose-400' }
}

export default function PercentageCalculator() {
  const [mode, setMode] = useState('basic')
  const [vals, setVals] = useState({ score: '', total: '', old: '', newVal: '', percent: '', base: '' })
  const [result, setResult] = useState(null)

  const set = (k, v) => setVals(p => ({ ...p, [k]: v }))

  const calculate = () => {
    if (mode === 'basic') {
      const s = parseFloat(vals.score), t = parseFloat(vals.total)
      if (isNaN(s) || isNaN(t) || t === 0) return
      const pct = (s / t) * 100
      setResult({ pct: pct.toFixed(2), grade: gradeFromPercent(pct), label: `${vals.score} out of ${vals.total}` })
    } else if (mode === 'increase') {
      const o = parseFloat(vals.old), n = parseFloat(vals.newVal)
      if (isNaN(o) || isNaN(n) || o === 0) return
      const pct = ((n - o) / o) * 100
      setResult({ pct: Math.abs(pct).toFixed(2), isIncrease: pct >= 0, label: pct >= 0 ? 'Increase / زيادة' : 'Decrease / انخفاض', noGrade: true })
    } else {
      const p = parseFloat(vals.percent), b = parseFloat(vals.base)
      if (isNaN(p) || isNaN(b)) return
      const val = (p / 100) * b
      setResult({ value: val.toFixed(2), label: `${vals.percent}% of ${vals.base}`, noGrade: true })
    }
  }

  const reset = () => { setVals({ score: '', total: '', old: '', newVal: '', percent: '', base: '' }); setResult(null) }

  return (
    <>
      <SEOMeta
        title="Percentage Calculator | حاسبة النسبة المئوية - احسب نسبتك"
        description="Free percentage calculator for students. احسب نسبتك المئوية من درجاتك. Percentage calculator Egypt, حاسبة النسبة للطلاب, calculate percentage grade online free."
        canonical="/percentage-calculator"
        keywords="percentage calculator, حاسبة النسبة المئوية, احسب النسبة, percentage grade calculator, نسبة الدرجة, percentage calculator Egypt, حاسبة النسبة للطلاب"
        schemaData={faqSchema}
      />

      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="hero-gradient px-4 sm:px-6 text-center mb-10">
          <div className="max-w-3xl mx-auto">
            <span className="section-tag mb-4">📊 Free Tool</span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-3 leading-tight">
              Percentage Calculator
              <span className="block text-gradient-gold text-2xl sm:text-3xl mt-1 font-arabic">
                حاسبة النسبة المئوية
              </span>
            </h1>
            <p className="text-ink-400 text-base sm:text-lg max-w-xl mx-auto">
              Calculate score percentages, percentage change, and more. احسب نسبتك المئوية من درجاتك مجاناً وبشكل فوري.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AdBanner slot="pct-top" className="max-w-2xl mx-auto" />

          <div className="card card-glow p-6 sm:p-8 mb-8">
            {/* Mode tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setMode(m.id); setResult(null) }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    mode === m.id
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                      : 'bg-ink-800 text-ink-400 hover:bg-ink-700 hover:text-white'
                  }`}
                >
                  <span>{m.label}</span>
                  <span className="block text-xs opacity-70 font-arabic">{m.labelAr}</span>
                </button>
              ))}
            </div>

            <h2 className="font-display font-bold text-white text-lg mb-5">
              {MODES.find(m => m.id === mode)?.desc}
            </h2>

            {mode === 'basic' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ink-400 text-sm mb-1.5">Score Obtained / الدرجة المحصل عليها</label>
                  <input type="number" value={vals.score} onChange={e => set('score', e.target.value)} className="input-field" placeholder="e.g. 85" />
                </div>
                <div>
                  <label className="block text-ink-400 text-sm mb-1.5">Total Marks / الدرجة الكاملة</label>
                  <input type="number" value={vals.total} onChange={e => set('total', e.target.value)} className="input-field" placeholder="e.g. 100" />
                </div>
              </div>
            )}

            {mode === 'increase' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ink-400 text-sm mb-1.5">Original Value / القيمة الأصلية</label>
                  <input type="number" value={vals.old} onChange={e => set('old', e.target.value)} className="input-field" placeholder="e.g. 60" />
                </div>
                <div>
                  <label className="block text-ink-400 text-sm mb-1.5">New Value / القيمة الجديدة</label>
                  <input type="number" value={vals.newVal} onChange={e => set('newVal', e.target.value)} className="input-field" placeholder="e.g. 80" />
                </div>
              </div>
            )}

            {mode === 'find' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ink-400 text-sm mb-1.5">Percentage / النسبة %</label>
                  <input type="number" value={vals.percent} onChange={e => set('percent', e.target.value)} className="input-field" placeholder="e.g. 25" />
                </div>
                <div>
                  <label className="block text-ink-400 text-sm mb-1.5">Of What Number / من أصل</label>
                  <input type="number" value={vals.base} onChange={e => set('base', e.target.value)} className="input-field" placeholder="e.g. 200" />
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={calculate} className="btn-primary flex-1" style={{ background: 'linear-gradient(135deg,#f59e0b,#fbbf24)', boxShadow: '0 8px 24px rgba(245,158,11,0.2)' }}>
                Calculate / احسب
              </button>
              <button onClick={reset} className="btn-secondary">Reset</button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="card card-glow p-6 sm:p-8 mb-8 animate-fade-up text-center">
              <p className="text-ink-400 text-sm mb-2 font-arabic">{result.label}</p>
              {result.pct && (
                <>
                  <div className="text-5xl font-extrabold font-display text-amber-400 mb-2">
                    {result.isIncrease !== undefined
                      ? `${result.isIncrease ? '+' : '-'}${result.pct}%`
                      : `${result.pct}%`}
                  </div>
                  {!result.noGrade && result.grade && (
                    <>
                      <p className={`font-bold text-lg ${result.grade.color}`}>{result.grade.letter}</p>
                      <div className="max-w-xs mx-auto mt-4">
                        <div className="h-3 bg-ink-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all duration-700"
                            style={{ width: `${Math.min(parseFloat(result.pct), 100)}%` }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {result.noGrade && (
                    <p className="text-ink-300 font-semibold">
                      {result.isIncrease ? '📈 Percentage Increase' : '📉 Percentage Decrease'}
                    </p>
                  )}
                </>
              )}
              {result.value && (
                <div className="text-5xl font-extrabold font-display text-amber-400 mb-2">
                  {result.value}
                </div>
              )}
            </div>
          )}

          <AdBanner slot="pct-mid" className="max-w-2xl mx-auto" />

          {/* SEO Content */}
          <article className="card p-6 sm:p-8 mb-8">
            <h2 className="font-display font-bold text-xl text-white mb-4">
              How to Calculate Percentage — Complete Guide
              <span className="block text-base font-arabic font-normal text-ink-400 mt-1">دليل شامل لحساب النسبة المئوية</span>
            </h2>
            <div className="text-ink-400 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                <strong className="text-ink-200">Percentage calculation</strong> is one of the most fundamental skills for students. Whether you're calculating your exam score percentage, comparing grades between semesters, or determining what score you need to pass — our free percentage calculator handles it all instantly.
              </p>
              <p className="font-arabic text-right leading-loose">
                حساب النسبة المئوية من أهم المهارات الأساسية للطلاب. سواء كنت تحسب نسبة درجة امتحانك، أو تقارن الدرجات بين فصلين دراسيين، أو تحدد الدرجة التي تحتاجها للنجاح — حاسبتنا المجانية تحل كل ذلك فوراً.
              </p>

              <h3 className="font-display font-semibold text-white text-lg mt-6">
                Egyptian Grading System / نظام التقديرات في مصر
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {[
                  ['90–100%', 'Excellent / ممتاز', 'text-emerald-400'],
                  ['80–89%', 'Very Good / جيد جداً', 'text-ink-300'],
                  ['70–79%', 'Good / جيد', 'text-amber-400'],
                  ['60–69%', 'Acceptable / مقبول', 'text-amber-500'],
                  ['50–59%', 'Pass / ناجح', 'text-orange-400'],
                  ['< 50%', 'Fail / راسب', 'text-rose-400'],
                ].map(([range, label, color]) => (
                  <div key={range} className="bg-ink-900/40 rounded-lg px-3 py-2 border border-ink-700/20">
                    <p className={`font-bold ${color} text-sm`}>{range}</p>
                    <p className="text-ink-500 text-xs font-arabic">{label}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-display font-semibold text-white text-lg mt-6">
                Percentage Formula / قانون النسبة المئوية
              </h3>
              <div className="bg-ink-900/60 border border-amber-500/20 rounded-xl p-4 text-center">
                <p className="text-amber-400 font-bold text-lg font-mono">Percentage = (Score ÷ Total) × 100</p>
                <p className="text-ink-500 text-sm mt-1 font-arabic">النسبة = (الدرجة ÷ الدرجة الكلية) × 100</p>
              </div>
            </div>
          </article>

          <section className="mb-8">
            <h2 className="font-display font-bold text-xl text-white mb-5">
              FAQ / أسئلة شائعة
            </h2>
            <FAQ items={faqItems} />
          </section>

          <AdBanner slot="pct-bottom" className="max-w-2xl mx-auto" />

          <section>
            <h2 className="font-display font-bold text-xl text-white mb-5">More Tools / المزيد</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ToolCard to="/gpa-calculator" icon="🎓" title="GPA Calculator" titleAr="حاسبة المعدل التراكمي" description="Calculate your cumulative GPA with letter grades and credit hours." color="ink" />
              <ToolCard to="/final-grade-calculator" icon="🎯" title="Final Grade Calculator" titleAr="حاسبة الدرجة النهائية" description="What grade do you need on your final exam to pass?" color="emerald" />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
