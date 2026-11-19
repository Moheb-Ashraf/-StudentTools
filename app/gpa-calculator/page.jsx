'use client'

import React, { useState, useEffect, useCallback } from 'react'
import FAQ from '../../components/FAQ'
import AdBanner from '../../components/AdBanner'
import ToolCard from '../../components/ToolCard'

const GRADE_POINTS_4 = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
}

const LETTER_GRADES = Object.keys(GRADE_POINTS_4)

const defaultCourses = [
  { id: 1, name: 'رياضيات (Mathematics)', grade: 'A', credits: '3' },
  { id: 2, name: 'لغة إنجليزية (English)', grade: 'B+', credits: '2' },
  { id: 3, name: 'فيزياء (Physics)', grade: 'A-', credits: '3' },
  { id: 4, name: 'برمجة (Programming)', grade: 'A', credits: '3' },
]

const gpaFaq = [
  {
    q: 'كيف يُحسب المعدل التراكمي (GPA) في نظام الساعات المعتمدة في مصر؟',
    a: 'يُحسب بضرب عدد الساعات المعتمدة لكل مادة في نقاط التقدير الحاصل عليه (مثلاً A = 4، B = 3)، ثم جمع نواتج جميع المواد وقسمة المجموع الناتج على إجمالي عدد الساعات المسجلة في الفصل الدراسي.',
  },
  {
    q: 'ما هو المعدل المطلوب للتخرج بتقدير امتياز مع مرتبة الشرف؟',
    a: 'في معظم الجامعات المصرية والعربية، يتطلب تقدير امتياز معدلاً تراكمياً لا يقل عن 3.5 من 4.0 (أو 4.5 من 5.0) مع عدم الرسوب في أي مادة طوال سنوات الدراسة.',
  },
  {
    q: 'هل تنحذف موادي إذا قمت بإغلاق المتصفح؟',
    a: 'لا، موقعنا يستخدم تقنية الحفظ المحلي (LocalStorage)؛ مما يعني أن المواد والساعات والدرجات التي تدخلها تظل محفوظة على جهازك تلقائياً دون الحاجة لتسجيل حساب.',
  },
  {
    q: 'كيف أرفع معدلي التراكمي المنخفض بأسرع طريقة؟',
    a: 'أفضل استراتيجية هي التركيز على المواد ذات الساعات المعتمدة العالية (مثل 3 و 4 ساعات) لأن تأثيرها أكبر، وإعادة دراسة المواد التي حصلت فيها على تقدير F أو D إذا كانت لائحة كليتك تسمح باستبدال الدرجة.',
  },
]

export default function GPACalculatorPage() {
  const [courses, setCourses] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('student_tools_gpa_courses_v2')
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) return parsed
        }
      } catch (e) {}
    }
    return defaultCourses
  })

  const [result, setResult] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('student_tools_gpa_courses_v2', JSON.stringify(courses))
    } catch (e) {}
  }, [courses])

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { id: Date.now(), name: '', grade: 'B', credits: '3' },
    ])
  }

  const removeCourse = (id) => {
    if (courses.length <= 1) return
    setCourses((prev) => prev.filter((c) => c.id !== id))
  }

  const updateCourse = (id, field, value) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    )
  }

  const calculateGPA = useCallback(() => {
    let totalPoints = 0
    let totalCredits = 0
    const details = []

    for (const c of courses) {
      const credits = parseFloat(c.credits)
      const points = GRADE_POINTS_4[c.grade] ?? 0
      if (isNaN(credits) || credits <= 0) continue

      totalPoints += points * credits
      totalCredits += credits
      details.push({
        ...c,
        points,
        weighted: (points * credits).toFixed(2),
      })
    }

    if (totalCredits === 0) return

    const gpa = totalPoints / totalCredits
    setResult({
      gpa: gpa.toFixed(2),
      totalCredits,
      totalPoints: totalPoints.toFixed(1),
      details,
    })
  }, [courses])

  const resetAll = () => {
    setCourses([
      { id: Date.now(), name: '', grade: 'B', credits: '3' },
      { id: Date.now() + 1, name: '', grade: 'A', credits: '3' },
    ])
    setResult(null)
  }

  const gpaNum = result ? parseFloat(result.gpa) : null

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 font-arabic">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-3">
          🎓 حاسبة الساعات المعتمدة · مقياس 4.0
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
          حاسبة المعدل التراكمي (GPA)
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          أدخل موادك وساعاتها وتقديرك لتحصل على معدلك التراكمي والفصلي فوراً مع كشف تفصيلي قابل للطباعة.
        </p>
      </div>

      {/* Main Calculator Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/90 border border-white/[0.08] shadow-2xl mb-10">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-3 pb-3 mb-3 border-b border-white/[0.08] text-xs font-bold text-slate-400">
          <div className="col-span-6">اسم المادة (اختياري)</div>
          <div className="col-span-3 text-center">التقدير (Grade)</div>
          <div className="col-span-2 text-center">الساعات (Credits)</div>
          <div className="col-span-1 text-center">حذف</div>
        </div>

        {/* Courses Rows */}
        <div className="space-y-3 mb-6">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="grid grid-cols-12 gap-2 sm:gap-3 items-center p-3 rounded-2xl bg-[#0F172A]/70 border border-white/[0.04] hover:border-white/10 transition-all"
            >
              <div className="col-span-12 sm:col-span-6">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  placeholder={`مادة ${index + 1}`}
                  className="w-full bg-[#161F32] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                  className="w-full bg-[#161F32] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-emerald-500 text-center"
                >
                  {LETTER_GRADES.map((g) => (
                    <option key={g} value={g} className="bg-slate-900 text-white">
                      {g} ({GRADE_POINTS_4[g].toFixed(1)} نقطة)
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-4 sm:col-span-2">
                <input
                  type="number"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                  placeholder="ساعات"
                  className="w-full bg-[#161F32] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-bold text-center focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="col-span-2 sm:col-span-1 flex justify-center">
                <button
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length <= 1}
                  className="p-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                  title="حذف المادة"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
          <button
            onClick={addCourse}
            className="btn-secondary text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <span>➕</span>
            <span>إضافة مادة أخرى</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/[0.05]"
            >
              تفريغ المواد
            </button>
            <button
              onClick={calculateGPA}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-400 active:scale-95 transition-all"
            >
              احسب المعدل الآن ⚡
            </button>
          </div>
        </div>
      </div>

      {/* Result Display Box */}
      {result && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#111827] to-[#0A1220] border border-emerald-500/30 shadow-2xl mb-12 animate-fade-up">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
              نتيجتك الأكاديمية المحسوبة
            </span>
            <div className="inline-flex items-baseline gap-2">
              <span className="text-6xl sm:text-7xl font-black text-gradient-emerald">
                {result.gpa}
              </span>
              <span className="text-xl sm:text-2xl text-slate-400 font-bold">/ 4.0</span>
            </div>
            <div className="mt-2 text-base sm:text-lg font-bold text-white">
              {gpaNum >= 3.7 && 'تقدير: امتياز مرتفع (A+ / Excellent) 🌟'}
              {gpaNum >= 3.0 && gpaNum < 3.7 && 'تقدير: جيد جداً (Very Good) 👏'}
              {gpaNum >= 2.0 && gpaNum < 3.0 && 'تقدير: جيد / مقبول (Good / Pass) 👍'}
              {gpaNum < 2.0 && 'تنبيه: المعدل تحت 2.0 يحتاج إلى بذل مجهود إضافي ⚠️'}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              إجمالي الساعات المسجلة: <strong className="text-white">{result.totalCredits} ساعة</strong> | مجموع النقاط: <strong className="text-white">{result.totalPoints}</strong>
            </p>
          </div>

          {/* Detailed Course Breakdown */}
          <div className="overflow-x-auto rounded-2xl border border-white/[0.06] mb-6">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="bg-slate-900/80 text-slate-400 font-bold border-b border-white/[0.06]">
                <tr>
                  <th className="p-3">المادة</th>
                  <th className="p-3 text-center">التقدير</th>
                  <th className="p-3 text-center">الساعات</th>
                  <th className="p-3 text-center">نقاط المادة</th>
                  <th className="p-3 text-center">الموزون</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] bg-[#0F172A]/40">
                {result.details.map((d, i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="p-3 text-white font-medium">{d.name || `مادة ${i + 1}`}</td>
                    <td className="p-3 text-center font-bold text-emerald-400">{d.grade}</td>
                    <td className="p-3 text-center text-slate-300">{d.credits}</td>
                    <td className="p-3 text-center text-slate-400">{d.points.toFixed(1)}</td>
                    <td className="p-3 text-center font-bold text-white">{d.weighted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Print Action */}
          <div className="flex justify-center">
            <button
              onClick={() => window.print()}
              className="btn-secondary text-xs sm:text-sm flex items-center gap-2"
            >
              <span>🖨️</span>
              <span>طباعة كشف الدرجات أو حفظه PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* Guide Content */}
      <article className="p-6 sm:p-8 rounded-3xl bg-[#111827]/70 border border-white/[0.06] text-slate-300 text-sm leading-relaxed mb-12 space-y-4">
        <h2 className="text-xl font-black text-white">جدول تحويل الحروف إلى نقاط GPA (مقياس 4.0)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-center font-bold">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-emerald-400 block text-base font-black">A+ / A</span>
            <span className="text-slate-400">4.0 نقطة</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-emerald-400 block text-base font-black">A-</span>
            <span className="text-slate-400">3.7 نقطة</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-indigo-400 block text-base font-black">B+</span>
            <span className="text-slate-400">3.3 نقطة</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-indigo-400 block text-base font-black">B</span>
            <span className="text-slate-400">3.0 نقطة</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-amber-400 block text-base font-black">C+</span>
            <span className="text-slate-400">2.3 نقطة</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-amber-400 block text-base font-black">C</span>
            <span className="text-slate-400">2.0 نقطة</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-rose-400 block text-base font-black">D</span>
            <span className="text-slate-400">1.0 نقطة</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-rose-400 block text-base font-black">F</span>
            <span className="text-slate-400">0.0 نقطة (راسب)</span>
          </div>
        </div>
      </article>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6 text-center">
          أسئلة شائعة حول حساب المعدل التراكمي
        </h2>
        <FAQ items={gpaFaq} />
      </section>

      <AdBanner slot="gpa-bottom" />

      {/* Related Tools */}
      <section>
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          أدوات أكاديمية ذات صلة
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ToolCard
            href="/gpa-converter"
            icon="🔄"
            titleAr="تحويل المعدل لنسبة مئوية ومقياس 5"
            titleEn="GPA CONVERTER"
            description="حول معدلك التراكمي إلى نسبة مئوية أو حول بين مقياس 5.0 ومقياس 4.0."
            color="cyan"
          />
          <ToolCard
            href="/final-grade-calculator"
            icon="🎯"
            titleAr="حاسبة الدرجة المطلوبة في الفاينال"
            titleEn="FINAL GRADE"
            description="احسب الدرجة التي تحتاجها في الامتحان النهائي لاجتياز المادة أو تحقيق التقدير المستهدف."
            color="amber"
          />
        </div>
      </section>
    </div>
  )
}
