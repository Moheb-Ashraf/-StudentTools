import React, { useState, useCallback } from 'react'
import SEOMeta from '../components/SEOMeta'
import FAQ from '../components/FAQ'
import AdBanner from '../components/AdBanner'
import ToolCard from '../components/ToolCard'

const GRADE_POINTS = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0,
}

const LETTER_GRADES = Object.keys(GRADE_POINTS)

const getGPAColor = (gpa) => {
  if (gpa >= 3.7) return 'text-emerald-400'
  if (gpa >= 3.0) return 'text-ink-300'
  if (gpa >= 2.0) return 'text-amber-400'
  return 'text-rose-400'
}

const getGPALabel = (gpa) => {
  if (gpa >= 3.7) return { en: 'Excellent / ممتاز', ar: 'احسنت!' }
  if (gpa >= 3.0) return { en: 'Good / جيد جداً', ar: 'أداء جيد' }
  if (gpa >= 2.0) return { en: 'Satisfactory / مقبول', ar: 'يمكن تحسينه' }
  return { en: 'Needs Improvement / ضعيف', ar: 'يحتاج مجهود' }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is GPA and how is it calculated? / ما هو GPA وكيف يُحسب؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GPA (Grade Point Average) is calculated by multiplying each course grade points by its credit hours, summing all results, then dividing by total credit hours. المعدل التراكمي يُحسب بضرب نقاط كل مادة في عدد الساعات ثم القسمة على إجمالي الساعات."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good GPA? / ما هو المعدل الجيد؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generally, 3.5+ is excellent, 3.0-3.5 is good, 2.0-3.0 is satisfactory. Requirements vary by university and program. عموماً 3.5 فأكثر ممتاز، 3.0-3.5 جيد جداً، 2.0-3.0 مقبول."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate my GPA in Egypt? / كيف أحسب المعدل في مصر؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Egyptian universities use a 4.0 scale. Enter your courses with their grades (A, B, C...) and credit hours. The tool calculates your cumulative GPA instantly. الجامعات المصرية تستخدم نظام 4.0. أدخل موادك مع الدرجات والساعات المعتمدة."
      }
    },
    {
      "@type": "Question",
      "name": "Can I calculate my GPA for free? / هل يمكنني حساب المعدل مجاناً؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Our GPA calculator is completely free with no registration required. نعم! حاسبة المعدل مجانية تماماً بدون تسجيل."
      }
    }
  ]
}

const faqItems = [
  {
    q: 'What is GPA? / ما هو المعدل التراكمي GPA؟',
    a: 'GPA (Grade Point Average) is a numerical representation of your academic performance on a scale of 0.0 to 4.0. It is calculated by multiplying each course\'s grade points by its credit hours, summing the results, and dividing by total credit hours. المعدل التراكمي هو مقياس رقمي لأدائك الأكاديمي من 0 إلى 4.0، يُحسب بضرب نقاط كل مادة في ساعاتها المعتمدة.'
  },
  {
    q: 'How do I calculate GPA? / كيف أحسب المعدل التراكمي؟',
    a: 'Example: If you have Math (A, 3 credits) and English (B+, 2 credits): (4.0×3 + 3.3×2) / (3+2) = (12+6.6)/5 = 18.6/5 = 3.72 GPA. مثال: رياضيات A (3 ساعات) + إنجليزي B+ (2 ساعات): (4.0×3 + 3.3×2) / (3+2) = 3.72.'
  },
  {
    q: 'What GPA do I need for graduate school? / ما المعدل المطلوب للدراسات العليا؟',
    a: 'Most graduate programs require a minimum GPA of 3.0, with competitive programs often requiring 3.5+. Check your specific program requirements. معظم برامج الدراسات العليا تتطلب 3.0 على الأقل، والبرامج التنافسية تتطلب 3.5 فأكثر.'
  },
  {
    q: 'How can I improve my GPA? / كيف أرفع معدلي؟',
    a: 'Retake failed courses, prioritize high-credit courses, seek tutoring, attend all classes, and submit all assignments. أعد المواد الراسبة، أعطِ الأولوية للمواد ذات الساعات العالية، استعن بمدرس خصوصي، احضر جميع المحاضرات.'
  }
]

let idCounter = 0
const uid = () => ++idCounter

const defaultSubjects = [
  { id: uid(), name: 'Mathematics', grade: 'A', credits: '3' },
  { id: uid(), name: 'English', grade: 'B+', credits: '2' },
  { id: uid(), name: 'Physics', grade: 'A-', credits: '3' },
]

export default function GPACalculator() {
  const [subjects, setSubjects] = useState(defaultSubjects)
  const [result, setResult] = useState(null)

  const addSubject = () => {
    setSubjects(prev => [...prev, { id: uid(), name: '', grade: 'B', credits: '3' }])
  }

  const removeSubject = (id) => {
    if (subjects.length === 1) return
    setSubjects(prev => prev.filter(s => s.id !== id))
  }

  const updateSubject = (id, field, value) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const calculate = useCallback(() => {
    let totalPoints = 0
    let totalCredits = 0
    const details = []
    for (const s of subjects) {
      const credits = parseFloat(s.credits)
      const points = GRADE_POINTS[s.grade]
      if (isNaN(credits) || credits <= 0) continue
      totalPoints += points * credits
      totalCredits += credits
      details.push({ ...s, points, weighted: (points * credits).toFixed(2) })
    }
    if (totalCredits === 0) return
    const gpa = totalPoints / totalCredits
    setResult({ gpa: gpa.toFixed(2), totalCredits, details })
  }, [subjects])

  const reset = () => {
    setSubjects(defaultSubjects.map(s => ({ ...s, id: uid() })))
    setResult(null)
  }

  return (
    <>
      <SEOMeta
        title="GPA Calculator | حاسبة المعدل التراكمي - احسب GPA مجاناً"
        description="Free GPA calculator for students. احسب معدلك التراكمي GPA بسهولة وسرعة. GPA calculator Egypt, حاسبة المعدل الجامعي, calculate cumulative GPA online free."
        canonical="/gpa-calculator"
        keywords="GPA calculator, حاسبة المعدل التراكمي, احسب GPA, GPA calculator Egypt, حاسبة المعدل الجامعي, cumulative GPA, معدل تراكمي, GPA calculator Arabic"
        schemaData={faqSchema}
      />

      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="hero-gradient px-4 sm:px-6 text-center mb-10">
          <div className="max-w-3xl mx-auto">
            <span className="section-tag mb-4">
              🎓 Free Academic Tool
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white mb-3 leading-tight">
              GPA Calculator
              <span className="block text-gradient text-2xl sm:text-3xl mt-1 font-arabic">
                حاسبة المعدل التراكمي
              </span>
            </h1>
            <p className="text-ink-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Calculate your cumulative GPA instantly. احسب معدلك التراكمي بسهولة وسرعة — مجاناً بدون تسجيل.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AdBanner slot="gpa-top" className="max-w-2xl mx-auto" />

          {/* Calculator Card */}
          <div className="card card-glow p-6 sm:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-white text-xl">
                Enter Your Courses
                <span className="block text-sm font-arabic font-normal text-ink-400 mt-0.5">أدخل موادك الدراسية</span>
              </h2>
              <button onClick={addSubject} className="btn-primary text-sm px-4 py-2">
                + Add Course
              </button>
            </div>

            {/* Headers */}
            <div className="hidden sm:grid grid-cols-12 gap-3 mb-3 px-1">
              <div className="col-span-5 text-xs font-semibold text-ink-500 uppercase tracking-wider">Course Name</div>
              <div className="col-span-3 text-xs font-semibold text-ink-500 uppercase tracking-wider">Grade</div>
              <div className="col-span-3 text-xs font-semibold text-ink-500 uppercase tracking-wider">Credit Hours</div>
              <div className="col-span-1" />
            </div>

            {/* Subject rows */}
            <div className="space-y-3">
              {subjects.map((s, i) => (
                <div key={s.id} className="grid grid-cols-12 gap-3 items-center animate-fade-up"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}>
                  <div className="col-span-12 sm:col-span-5">
                    <input
                      type="text"
                      placeholder={`Course ${i + 1}`}
                      value={s.name}
                      onChange={e => updateSubject(s.id, 'name', e.target.value)}
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-3">
                    <select
                      value={s.grade}
                      onChange={e => updateSubject(s.id, 'grade', e.target.value)}
                      className="input-field text-sm"
                    >
                      {LETTER_GRADES.map(g => (
                        <option key={g} value={g}>{g} ({GRADE_POINTS[g].toFixed(1)})</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-5 sm:col-span-3">
                    <input
                      type="number"
                      min="0.5" max="10" step="0.5"
                      value={s.credits}
                      onChange={e => updateSubject(s.id, 'credits', e.target.value)}
                      className="input-field text-sm"
                      placeholder="Credits"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex justify-end">
                    <button
                      onClick={() => removeSubject(s.id)}
                      disabled={subjects.length === 1}
                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button onClick={calculate} className="btn-primary flex-1">
                Calculate GPA / احسب المعدل
              </button>
              <button onClick={reset} className="btn-secondary">
                Reset
              </button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="card card-glow p-6 sm:p-8 mb-8 animate-fade-up text-center">
              <p className="text-ink-400 text-sm mb-2 font-arabic">معدلك التراكمي / Your GPA</p>
              <div className={`result-badge ${getGPAColor(parseFloat(result.gpa))} mb-2`}>
                {result.gpa}
                <span className="text-ink-500 text-2xl"> / 4.0</span>
              </div>
              <p className="font-semibold text-ink-300 mb-1">{getGPALabel(parseFloat(result.gpa)).en}</p>
              <p className="font-arabic text-ink-400 text-sm mb-5">{getGPALabel(parseFloat(result.gpa)).ar}</p>

              {/* Progress bar */}
              <div className="max-w-xs mx-auto mb-6">
                <div className="h-3 bg-ink-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      parseFloat(result.gpa) >= 3.7 ? 'bg-emerald-400' :
                      parseFloat(result.gpa) >= 3.0 ? 'bg-ink-400' :
                      parseFloat(result.gpa) >= 2.0 ? 'bg-amber-400' : 'bg-rose-400'
                    }`}
                    style={{ width: `${(parseFloat(result.gpa) / 4.0) * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-ink-500 text-xs">
                Total Credit Hours: <strong className="text-ink-300">{result.totalCredits}</strong> &nbsp;|&nbsp; إجمالي الساعات المعتمدة
              </p>

              {/* Breakdown */}
              <div className="mt-5 text-left overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-ink-500 text-xs uppercase tracking-wider border-b border-ink-700/30">
                      <th className="text-left pb-2">Course</th>
                      <th className="text-center pb-2">Grade</th>
                      <th className="text-center pb-2">Credits</th>
                      <th className="text-center pb-2">Points</th>
                      <th className="text-center pb-2">Weighted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.details.map((d, i) => (
                      <tr key={i} className="border-b border-ink-800/40 hover:bg-ink-800/20">
                        <td className="py-2 text-ink-300">{d.name || `Course ${i + 1}`}</td>
                        <td className="py-2 text-center font-bold text-white">{d.grade}</td>
                        <td className="py-2 text-center text-ink-400">{d.credits}</td>
                        <td className="py-2 text-center text-ink-400">{d.points.toFixed(1)}</td>
                        <td className="py-2 text-center text-ink-300">{d.weighted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <AdBanner slot="gpa-mid" className="max-w-2xl mx-auto" />

          {/* SEO Content */}
          <article className="card p-6 sm:p-8 mb-8 prose-custom">
            <h2 className="font-display font-bold text-xl text-white mb-4">
              What is GPA? How to Calculate Your Grade Point Average
              <span className="block text-base font-arabic font-normal text-ink-400 mt-1">
                ما هو GPA؟ كيف تحسب معدلك التراكمي؟
              </span>
            </h2>

            <div className="text-ink-400 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                The <strong className="text-ink-200">GPA (Grade Point Average)</strong> is the cornerstone of academic performance measurement used by universities worldwide, including Egyptian universities, Saudi universities, and all Arab institutions following the American system. Your cumulative GPA determines your academic standing, scholarship eligibility, and graduate school prospects.
              </p>
              <p className="font-arabic text-right leading-loose">
                المعدل التراكمي (GPA) هو المقياس الأكاديمي المستخدم في الجامعات حول العالم، بما في ذلك الجامعات المصرية والسعودية وجميع المؤسسات العربية التي تتبع النظام الأمريكي. يحدد معدلك التراكمي مكانتك الأكاديمية، وأهليتك للمنح الدراسية، وفرص الدراسات العليا.
              </p>

              <h3 className="font-display font-semibold text-white text-lg mt-6">
                How GPA is Calculated — Example / مثال تطبيقي
              </h3>
              <div className="bg-ink-900/60 border border-ink-700/30 rounded-xl p-4 font-mono text-sm">
                <p className="text-emerald-400 mb-2">// Example: 3 courses</p>
                <p className="text-ink-300">Mathematics: A (4.0) × 3 credits = 12.0</p>
                <p className="text-ink-300">English: B+ (3.3) × 2 credits = 6.6</p>
                <p className="text-ink-300">Physics: A- (3.7) × 3 credits = 11.1</p>
                <div className="border-t border-ink-700/30 mt-2 pt-2">
                  <p className="text-white font-bold">GPA = (12.0 + 6.6 + 11.1) / (3+2+3) = 29.7 / 8 = <span className="text-emerald-400">3.71</span></p>
                </div>
              </div>

              <h3 className="font-display font-semibold text-white text-lg mt-6">
                GPA Scale & Grade Points / مقياس GPA ونقاط الدرجات
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {Object.entries(GRADE_POINTS).map(([g, p]) => (
                  <div key={g} className="flex justify-between bg-ink-900/40 rounded-lg px-3 py-2 border border-ink-700/20">
                    <span className="font-bold text-white">{g}</span>
                    <span className="text-ink-400">{p.toFixed(1)} pts</span>
                  </div>
                ))}
              </div>

              <h3 className="font-display font-semibold text-white text-lg mt-6">
                Tips to Improve Your GPA / نصائح لرفع معدلك
              </h3>
              <ul className="space-y-2">
                {[
                  ['📚', 'Attend all lectures — presence correlates strongly with grades', 'احضر جميع المحاضرات — الحضور يرتبط بقوة بالدرجات'],
                  ['⚡', 'Prioritize high-credit courses — they impact your GPA more', 'أعطِ الأولوية للمواد ذات الساعات العالية'],
                  ['🔁', 'Retake failed or low-grade courses when possible', 'أعد المواد الراسبة أو منخفضة الدرجة'],
                  ['📅', 'Form study groups and set a consistent revision schedule', 'كوّن مجموعات دراسة وضع جدولاً منتظماً للمراجعة'],
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

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="font-display font-bold text-xl text-white mb-5">
              Frequently Asked Questions
              <span className="block text-base font-arabic font-normal text-ink-400 mt-1">أسئلة شائعة</span>
            </h2>
            <FAQ items={faqItems} />
          </section>

          <AdBanner slot="gpa-bottom" className="max-w-2xl mx-auto" />

          {/* Related Tools */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-5">
              More Student Tools / المزيد من الأدوات
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ToolCard
                to="/percentage-calculator"
                icon="📊"
                title="Percentage Calculator"
                titleAr="حاسبة النسبة المئوية"
                description="Calculate your score percentage and grade percentage instantly."
                color="amber"
              />
              <ToolCard
                to="/final-grade-calculator"
                icon="🎯"
                title="Final Grade Calculator"
                titleAr="حاسبة الدرجة النهائية"
                description="Find out what grade you need on your final exam."
                color="emerald"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
