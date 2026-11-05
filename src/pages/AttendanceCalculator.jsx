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
      "name": "How is student absence percentage calculated? / كيف تحسب نسبة الغياب الجامعي؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absence Percentage = (Number of Missed Lectures / Total Lectures) × 100. نسبة الغياب = (عدد المحاضرات التي غبتها ÷ إجمالي عدد المحاضرات) × 100."
      }
    },
    {
      "@type": "Question",
      "name": "What is the maximum allowed absence in Egyptian and Arab universities? / ما نسبة الغياب المسموح بها في الجامعات؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most universities set the maximum allowed absence at 25% of total classes. Exceeding 25% typically results in denial of entry to the final exam (حرمان)."
      }
    }
  ]
}

const faqItems = [
  {
    q: 'What is the deprivation limit (حد الحرمان) in universities? / ما هو حد الحرمان في الجامعات؟',
    a: 'In most Egyptian and Arab universities, a student is denied from taking the final exam (حرمان) if unexcused absences exceed 25% of total course contact hours.'
  },
  {
    q: 'How many lectures can I miss if the course is 14 weeks? / كم محاضرة يمكنني غيابها في تيرم 14 أسبوع؟',
    a: 'For a 14-week semester with 1 lecture per week (14 total): 25% equals 3.5 lectures, which means you can miss at most 3 lectures without deprivation. The 4th lecture will put you in deprivation (حرمان).'
  },
  {
    q: 'Does an excused absence count? / هل يحسب الغياب بعذر طبي؟',
    a: 'Accepted medical or official excuses usually extend the allowed absence limit up to 30% or 35% depending on your faculty council regulations.'
  }
]

export default function AttendanceCalculator() {
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
    <>
      <SEOMeta
        title="Attendance & Absence Calculator | حاسبة نسبة الغياب والحرمان من المادة للطلاب"
        description="Calculate your university absence percentage and find out how many lectures you can still miss before reaching the 25% deprivation limit (حرمان). احسب نسبة غيابك مجاناً."
        canonical="/attendance-calculator"
        schemaData={faqSchema}
      />

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="section-tag mb-3">⏱️ Absence Calculator / حاسبة الغياب</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
              University Absence Calculator
              <span className="block text-xl sm:text-2xl font-arabic font-bold text-gradient mt-1">
                حاسبة نسبة الغياب وحد الحرمان من المادة
              </span>
            </h1>
            <p className="text-ink-400 text-sm max-w-lg mx-auto">
              احسب كم محاضرة غبتها، وكم محاضرة متبقية لك قبل صدور إنذار أو قرار حرمان من دخول الامتحان النهائي.
            </p>
          </div>

          {/* Calculator Card */}
          <div className="card p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-ink-300 mb-1.5 font-arabic text-right">
                  إجمالي محاضرات التيرم (غالباً 12 - 15):
                </label>
                <input
                  type="number"
                  min="1"
                  value={totalClasses}
                  onChange={(e) => setTotalClasses(e.target.value)}
                  className="input w-full text-center text-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-300 mb-1.5 font-arabic text-right">
                  عدد المحاضرات التي غبتها حتى الآن:
                </label>
                <input
                  type="number"
                  min="0"
                  value={missedClasses}
                  onChange={(e) => setMissedClasses(e.target.value)}
                  className="input w-full text-center text-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-300 mb-1.5 font-arabic text-right">
                  نسبة الحرمان المسموحة (افتراضي 25%):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={maxAllowedPercent}
                    onChange={(e) => setMaxAllowedPercent(e.target.value)}
                    className="input w-full text-center text-lg font-bold pr-6"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 text-sm">%</span>
                </div>
              </div>
            </div>

            {/* Result Box */}
            <div
              className={`rounded-2xl p-6 text-center border transition-all ${
                status === 'safe'
                  ? 'bg-emerald-950/30 border-emerald-500/40'
                  : status === 'warning'
                  ? 'bg-amber-950/30 border-amber-500/40'
                  : 'bg-rose-950/30 border-rose-500/40'
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wider block mb-1 text-ink-400">
                نسبة الغياب الحالية / Current Absence
              </span>
              <div
                className={`text-5xl font-extrabold mb-2 ${
                  status === 'safe'
                    ? 'text-emerald-400'
                    : status === 'warning'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {currentPercent.toFixed(1)}%
              </div>

              <div className="text-sm sm:text-base font-arabic font-bold mb-2">
                {status === 'safe' && (
                  <span className="text-emerald-300">✅ وضعك آمن — لا يوجد خطر حرمان حالياً</span>
                )}
                {status === 'warning' && (
                  <span className="text-amber-300">⚠️ تنبيه — اقتربت من حد الحرمان القانوني!</span>
                )}
                {status === 'banned' && (
                  <span className="text-rose-300">⛔ خطر حرمان — لقد تجاوزت النسبة القانونية المسموحة!</span>
                )}
              </div>

              <div className="text-xs sm:text-sm font-arabic text-ink-300 bg-ink-950/40 py-2.5 px-4 rounded-xl inline-block mt-1">
                {remainingAbsences > 0 ? (
                  <>
                    متبقي لك غياب <strong className="text-white font-bold">{remainingAbsences}</strong> محاضرة كحد أقصى قبل صدور قرار الحرمان.
                  </>
                ) : remainingAbsences === 0 ? (
                  <span className="text-amber-400">أي غياب قادم سيؤدي إلى حرمانك فورياً من المادة!</span>
                ) : (
                  <span className="text-rose-400">تجاوزت الحد المسموح بـ {Math.abs(remainingAbsences)} محاضرة! راجع أستاذ المادة فوراً.</span>
                )}
              </div>
            </div>
          </div>

          {/* Guide Section */}
          <article className="card p-6 sm:p-8 mb-8 text-ink-200 font-arabic text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-white mb-3">نصائح لتجنب الحرمان في الجامعات المصرية والعربية</h2>
            <ul className="space-y-2.5 list-disc list-inside text-ink-300">
              <li><strong>متابعة كشف الحضور:</strong> تأكد دائماً أن اسمك مسجل في كشف الحضور ولا تعتمد على تسجيل الزملاء لك.</li>
              <li><strong>تقديم الأعذار الطبية فوراً:</strong> تقبل معظم الجامعات العذر الطبي المعتمد من الإدارة الطبية بالجامعة خلال 7 أيام من تاريخ الغياب.</li>
              <li><strong>الفرق بين المحاضرة والسكشن:</strong> بعض الكليات تحسب نسبة غياب المعامل والسكاشن العملية منفصلة عن المحاضرات النظرية.</li>
            </ul>
          </article>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="font-display font-bold text-xl text-white mb-4">
              Frequently Asked Questions / أسئلة شائعة
            </h2>
            <FAQ items={faqItems} />
          </section>

          <AdBanner slot="attendance-bottom" className="max-w-2xl mx-auto mb-8" />

          {/* Related Tools */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-5">
              More Student Tools / المزيد من الأدوات
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ToolCard
                to="/gpa-calculator"
                icon="🎓"
                title="GPA Calculator"
                titleAr="حاسبة المعدل التراكمي"
                description="Calculate your GPA and credit hours instantly."
                color="ink"
              />
              <ToolCard
                to="/final-grade-calculator"
                icon="🎯"
                title="Final Grade Calculator"
                titleAr="حاسبة الدرجة النهائية"
                description="Find what score you need on your final exam to pass or get an A."
                color="emerald"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
