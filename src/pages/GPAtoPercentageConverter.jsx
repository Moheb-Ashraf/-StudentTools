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
      "name": "How do you convert a 4.0 GPA to a percentage? / كيف تحول المعدل 4.0 إلى نسبة مئوية؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common formula: Percentage = (GPA / 4.0) × 100. Some universities use the formula: Percentage = (GPA × 20) + 20. Our tool supports both conversion methods."
      }
    },
    {
      "@type": "Question",
      "name": "How do you convert a 5.0 GPA to a 4.0 scale? / كيف تحول المعدل من مقياس 5.0 إلى 4.0؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard conversion: GPA 4.0 = (GPA 5.0 × 4) / 5, or by subtracting 1 from the 5.0 scale."
      }
    }
  ]
}

const faqItems = [
  {
    q: 'How to convert 4.0 GPA to percentage? / كيف أحول معدل 4.0 إلى نسبة مئوية؟',
    a: 'There are two popular formulas: Linear scaling (GPA ÷ 4 × 100) and standard US/WES scale ((GPA × 20) + 20). You can toggle between both formulas directly in our calculator.'
  },
  {
    q: 'What is a 3.0 GPA in percentage? / ما هي النسبة المئوية لمعدل 3.0 من 4.0؟',
    a: 'A 3.0 out of 4.0 GPA is equivalent to 75% on standard direct scaling, or 80% on the standard grade equivalent (Grade B / جيد جداً).'
  },
  {
    q: 'What is a 3.5 GPA out of 5.0 in a 4.0 scale? / كم يعادل 3.5 من 5 على مقياس 4؟',
    a: '3.5 out of 5.0 corresponds to approximately 2.80 on a 4.0 scale (Good / جيد).'
  }
]

export default function GPAtoPercentageConverter() {
  const [mode, setMode] = useState('gpa4ToPercent') // 'gpa4ToPercent' | 'percentToGpa4' | 'scale5to4'
  const [val, setVal] = useState('')

  const num = parseFloat(val)

  let result = null
  let note = ''

  if (!isNaN(num) && num >= 0) {
    if (mode === 'gpa4ToPercent' && num <= 4.0) {
      const direct = (num / 4) * 100
      const standard = Math.min(100, Math.max(0, num * 20 + 20))
      result = {
        primary: `${direct.toFixed(1)}%`,
        secondary: `أو ${standard.toFixed(1)}% (حسب معادلة التحويل المعتمدة بجامعتك)`,
        label: num >= 3.7 ? 'ممتاز (Excellent)' : num >= 3.0 ? 'جيد جداً (Very Good)' : num >= 2.0 ? 'جيد / مقبول (Pass)' : 'راسب / إنذار'
      }
    } else if (mode === 'percentToGpa4' && num <= 100) {
      const gpa = (num / 100) * 4
      result = {
        primary: `${gpa.toFixed(2)} / 4.0`,
        secondary: num >= 85 ? 'تقدير امتياز (A)' : num >= 75 ? 'تقدير جيد جداً (B)' : num >= 65 ? 'تقدير جيد (C)' : 'تقدير مقبول / ضعيف',
        label: `معدل تراكمي تقريبي`
      }
    } else if (mode === 'scale5to4' && num <= 5.0) {
      const gpa4 = (num * 4) / 5
      result = {
        primary: `${gpa4.toFixed(2)} / 4.0`,
        secondary: `يعادل تقريباً ${((num / 5) * 100).toFixed(1)}%`,
        label: 'التحويل من مقياس 5 إلى مقياس 4'
      }
    }
  }

  return (
    <>
      <SEOMeta
        title="GPA to Percentage Converter | تحويل المعدل التراكمي إلى نسبة مئوية ومقياس 5 إلى 4"
        description="Free GPA to percentage converter: convert 4.0 GPA to %, percentage to GPA, and 5.0 scale to 4.0 scale instantly with official formulas. احسب نسبتك المئوية من GPA."
        canonical="/gpa-converter"
        schemaData={faqSchema}
      />

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="section-tag mb-3">🔄 GPA Converter / محول المعدل</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
              GPA to Percentage Converter
              <span className="block text-xl sm:text-2xl font-arabic font-bold text-gradient mt-1">
                تحويل المعدل التراكمي إلى نسبة مئوية
              </span>
            </h1>
            <p className="text-ink-400 text-sm max-w-lg mx-auto">
              حول معدلك التراكمي من 4.0 أو 5.0 إلى نسبة مئوية مئوية بكل سهولة طبقاً للمعادلات المعتمدة.
            </p>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
            <button
              onClick={() => { setMode('gpa4ToPercent'); setVal('') }}
              className={`p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mode === 'gpa4ToPercent' ? 'bg-ink-500 text-white shadow-lg shadow-ink-500/25' : 'card text-ink-300 hover:text-white'
              }`}
            >
              GPA (4.0) ➜ نسبة مئوية %
            </button>
            <button
              onClick={() => { setMode('percentToGpa4'); setVal('') }}
              className={`p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mode === 'percentToGpa4' ? 'bg-ink-500 text-white shadow-lg shadow-ink-500/25' : 'card text-ink-300 hover:text-white'
              }`}
            >
              نسبة مئوية % ➜ GPA (4.0)
            </button>
            <button
              onClick={() => { setMode('scale5to4'); setVal('') }}
              className={`p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                mode === 'scale5to4' ? 'bg-ink-500 text-white shadow-lg shadow-ink-500/25' : 'card text-ink-300 hover:text-white'
              }`}
            >
              مقياس 5.0 ➜ مقياس 4.0
            </button>
          </div>

          {/* Calculator Card */}
          <div className="card p-6 sm:p-8 mb-8">
            <label className="block text-sm font-semibold text-ink-200 mb-2 font-arabic text-right">
              {mode === 'gpa4ToPercent' && 'أدخل معدلك التراكمي من 4.0 (مثال: 3.45):'}
              {mode === 'percentToGpa4' && 'أدخل النسبة المئوية من 100 (مثال: 84.5):'}
              {mode === 'scale5to4' && 'أدخل المعدل من مقياس 5.0 (مثال: 4.2):'}
            </label>

            <div className="relative mb-6">
              <input
                type="number"
                step="0.01"
                min="0"
                max={mode === 'percentToGpa4' ? 100 : mode === 'scale5to4' ? 5 : 4}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                placeholder={mode === 'percentToGpa4' ? '85' : '3.5'}
                className="input w-full text-center text-2xl font-bold py-3.5"
              />
            </div>

            {result ? (
              <div className="bg-ink-900/60 border border-ink-500/30 rounded-2xl p-6 text-center animate-fade-in">
                <span className="text-xs uppercase tracking-wider text-ink-400 font-semibold block mb-1">
                  النتيجة المحسوبة
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-gradient mb-2">
                  {result.primary}
                </div>
                <div className="text-sm font-arabic text-ink-300 mb-1">{result.label}</div>
                <div className="text-xs font-arabic text-ink-500">{result.secondary}</div>
              </div>
            ) : (
              <div className="text-center py-6 text-ink-500 text-sm font-arabic">
                أدخل الرقم أعلاه للحصول على النتيجة فورياً
              </div>
            )}
          </div>

          {/* Guide Table */}
          <article className="card p-6 sm:p-8 mb-8 text-ink-200 font-arabic text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-white mb-4">جدول تحويل المعدل التراكمي (GPA) التقريبي</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-ink-700/40 text-ink-400 text-xs">
                    <th className="py-2.5">مقياس 4.0</th>
                    <th className="py-2.5">مقياس 5.0</th>
                    <th className="py-2.5">النسبة المئوية التقريبية</th>
                    <th className="py-2.5">التقدير الأكاديمي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-800/40 text-xs sm:text-sm">
                  <tr><td className="py-2 font-bold text-emerald-400">3.7 - 4.0</td><td>4.75 - 5.0</td><td>90% - 100%</td><td>امتياز (Excellent)</td></tr>
                  <tr><td className="py-2 font-bold text-ink-300">3.0 - 3.69</td><td>3.75 - 4.74</td><td>80% - 89%</td><td>جيد جداً (Very Good)</td></tr>
                  <tr><td className="py-2 font-bold text-amber-400">2.0 - 2.99</td><td>2.75 - 3.74</td><td>65% - 79%</td><td>جيد (Good)</td></tr>
                  <tr><td className="py-2 font-bold text-amber-500">1.0 - 1.99</td><td>1.75 - 2.74</td><td>50% - 64%</td><td>مقبول (Pass)</td></tr>
                  <tr><td className="py-2 font-bold text-rose-400">&lt; 1.0</td><td>&lt; 1.75</td><td>&lt; 50%</td><td>راسب (Fail)</td></tr>
                </tbody>
              </table>
            </div>
          </article>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="font-display font-bold text-xl text-white mb-4">
              Frequently Asked Questions / أسئلة شائعة
            </h2>
            <FAQ items={faqItems} />
          </section>

          <AdBanner slot="converter-bottom" className="max-w-2xl mx-auto mb-8" />

          {/* Related Tools */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-5">
              More Academic Tools / المزيد من الأدوات
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ToolCard
                to="/gpa-calculator"
                icon="🎓"
                title="GPA Calculator"
                titleAr="حاسبة المعدل التراكمي"
                description="Calculate your semester and cumulative GPA with course credit hours."
                color="ink"
              />
              <ToolCard
                to="/attendance-calculator"
                icon="⏱️"
                title="Attendance Calculator"
                titleAr="حاسبة نسبة الغياب والحرمان"
                description="Find out how many classes you can miss before getting banned."
                color="rose"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
