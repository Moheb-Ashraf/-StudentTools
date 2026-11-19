'use client'

import React, { useState, useEffect, useMemo } from 'react'
import FAQ from '../../components/FAQ'
import AdBanner from '../../components/AdBanner'
import ToolCard from '../../components/ToolCard'

const DAYS = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

const COLOR_OPTIONS = [
  { id: 'indigo', name: 'أزرق', bg: 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300' },
  { id: 'emerald', name: 'أخضر', bg: 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300' },
  { id: 'amber', name: 'برتقالي', bg: 'bg-amber-600/20 border-amber-500/40 text-amber-300' },
  { id: 'cyan', name: 'سماوي', bg: 'bg-cyan-600/20 border-cyan-500/40 text-cyan-300' },
  { id: 'rose', name: 'وردي', bg: 'bg-rose-600/20 border-rose-500/40 text-rose-300' },
  { id: 'purple', name: 'بنفسجي', bg: 'bg-purple-600/20 border-purple-500/40 text-purple-300' },
]

const defaultEntries = [
  {
    id: 1,
    name: 'رياضيات متقدمة',
    day: 'الأحد',
    start: '09:00',
    end: '11:00',
    type: 'محاضرة',
    room: 'مدرج 3',
    color: 'indigo',
  },
  {
    id: 2,
    name: 'برمجة الحاسب',
    day: 'الأحد',
    start: '12:00',
    end: '14:00',
    type: 'سكشن / معمل',
    room: 'معمل 5',
    color: 'emerald',
  },
  {
    id: 3,
    name: 'فيزياء عامة',
    day: 'الثلاثاء',
    start: '10:00',
    end: '12:00',
    type: 'محاضرة',
    room: 'قاعة 102',
    color: 'amber',
  },
]

const scheduleFaq = [
  {
    q: 'كيف يكتشف صانع الجدول التعارض بين المحاضرات؟',
    a: 'يقوم النظام بحساب الفترات الزمنية لكل مادة بالدقائق، وإذا تداخلت مواعيد أي مادتين في نفس اليوم، يتم وضع علامة تحذير بارزة باللون الأحمر وتحديد وقت التداخل واسم المادتين المتعادلتين فوراً.',
  },
  {
    q: 'هل يظل الجدول محفوظاً إذا أغلقت الموقع أو الهاتف؟',
    a: 'نعم، الأداة تحفظ جدولك الدراسي وتعديلاتك تلقائياً على جهازك (LocalStorage) دون الحاجة لإنشاء حساب.',
  },
  {
    q: 'كيف أقوم بطباعة الجدول أو حفظه كصورة / PDF؟',
    a: 'يوجد زر مخصص بالأسفل باسم "طباعة أو حفظ الجدول كـ PDF" يقوم بتهيئة الجدول تلقائياً بحجم ورقة A4 أفقية منسقة وجاهزة للطباعة أو المشاركة مع أصدقائك.',
  },
]

function timeToMinutes(timeStr) {
  if (!timeStr) return 0
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + (m || 0)
}

export default function ScheduleMakerPage() {
  const [entries, setEntries] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('student_tools_schedule_data')
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) return parsed
        }
      } catch (e) {}
    }
    return defaultEntries
  })

  // Form State for Adding/Editing
  const [form, setForm] = useState({
    name: '',
    day: 'الأحد',
    start: '09:00',
    end: '11:00',
    type: 'محاضرة',
    room: '',
    color: 'indigo',
  })

  useEffect(() => {
    try {
      localStorage.setItem('student_tools_schedule_data', JSON.stringify(entries))
    } catch (e) {}
  }, [entries])

  // Conflict Detection Algorithm
  const conflicts = useMemo(() => {
    const list = []
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const a = entries[i]
        const b = entries[j]

        if (a.day === b.day) {
          const aStart = timeToMinutes(a.start)
          const aEnd = timeToMinutes(a.end)
          const bStart = timeToMinutes(b.start)
          const bEnd = timeToMinutes(b.end)

          // Overlap condition
          if (aStart < bEnd && aEnd > bStart) {
            list.push({
              courseA: a.name,
              courseB: b.name,
              day: a.day,
              timeA: `${a.start} - ${a.end}`,
              timeB: `${b.start} - ${b.end}`,
              idA: a.id,
              idB: b.id,
            })
          }
        }
      }
    }
    return list
  }, [entries])

  const addEntry = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return

    const newEntry = {
      id: Date.now(),
      ...form,
    }
    setEntries((prev) => [...prev, newEntry])
    setForm((prev) => ({
      ...prev,
      name: '',
      room: '',
      color: COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)].id,
    }))
  }

  const removeEntry = (id) => {
    setEntries((prev) => prev.filter((item) => item.id !== id))
  }

  const clearAll = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في تفريغ الجدول بالكامل؟')) {
      setEntries([])
    }
  }

  // Summary Metrics
  const activeDaysCount = useMemo(() => {
    const uniqueDays = new Set(entries.map((e) => e.day))
    return uniqueDays.size
  }, [entries])

  const totalWeeklyHours = useMemo(() => {
    let totalMins = 0
    for (const item of entries) {
      const s = timeToMinutes(item.start)
      const e = timeToMinutes(item.end)
      if (e > s) totalMins += e - s
    }
    return (totalMins / 60).toFixed(1)
  }, [entries])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 font-arabic">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-3">
          📅 المنظم الأكاديمي الذكي · كاشف التعارض
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
          صانع الجدول الدراسي وتفادي التعارض
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          رتب مواعيد محاضراتك وسكاشنك الأسبوعية، واكتشف أي تعارض في التوقيت فورياً مع إمكانية طباعة وحفظ الجدول كـ PDF.
        </p>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-[#111827]/80 border border-white/[0.06] text-center">
          <span className="text-xs text-slate-400 block mb-1">المحاضرات والسكاشن</span>
          <span className="text-2xl sm:text-3xl font-black text-white">{entries.length}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#111827]/80 border border-white/[0.06] text-center">
          <span className="text-xs text-slate-400 block mb-1">أيام الحضور في الكلية</span>
          <span className="text-2xl sm:text-3xl font-black text-cyan-400">{activeDaysCount} أيام</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#111827]/80 border border-white/[0.06] text-center">
          <span className="text-xs text-slate-400 block mb-1">إجمالي ساعات الحضور</span>
          <span className="text-2xl sm:text-3xl font-black text-indigo-400">{totalWeeklyHours} ساعة</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#111827]/80 border border-white/[0.06] text-center">
          <span className="text-xs text-slate-400 block mb-1">حالة التعارض</span>
          <span
            className={`text-2xl sm:text-3xl font-black ${
              conflicts.length === 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {conflicts.length === 0 ? '0 (مثالي 🎉)' : `${conflicts.length} تعارض ⚠️`}
          </span>
        </div>
      </div>

      {/* Conflicts Alert Box */}
      {conflicts.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/40 mb-8 animate-fade-in space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
            <span>⚠️</span>
            <span>تم اكتشاف تضارب في مواعيد الجدول:</span>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 pr-5 list-disc">
            {conflicts.map((c, idx) => (
              <li key={idx}>
                يوم <strong className="text-white">({c.day})</strong>: تعارض بين مادة{' '}
                <span className="text-rose-300 font-bold">[{c.courseA}]</span> ({c.timeA}) ومادة{' '}
                <span className="text-rose-300 font-bold">[{c.courseB}]</span> ({c.timeB})!
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Grid: Form + Visual Timetable */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Form to Add Entry (4 Cols) */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-[#111827]/90 border border-white/[0.08] shadow-2xl h-fit">
          <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
            <span>➕</span>
            <span>إضافة مادة أو سكشن للجدول</span>
          </h2>

          <form onSubmit={addEntry} className="space-y-3.5 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-300 mb-1">اسم المادة:</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="مثال: هياكل بيانات"
                className="w-full bg-[#161F32] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-300 mb-1">اليوم:</label>
                <select
                  value={form.day}
                  onChange={(e) => setForm({ ...form, day: e.target.value })}
                  className="w-full bg-[#161F32] border border-white/10 rounded-xl px-3 py-2.5 text-white font-bold focus:outline-none focus:border-cyan-500"
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d} className="bg-slate-900 text-white">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">النوع:</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-[#161F32] border border-white/10 rounded-xl px-3 py-2.5 text-white font-bold focus:outline-none focus:border-cyan-500"
                >
                  <option value="محاضرة">محاضرة</option>
                  <option value="سكشن / معمل">سكشن / معمل</option>
                  <option value="ورشة عمل">ورشة عمل</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-300 mb-1">من الساعة:</label>
                <input
                  type="time"
                  required
                  value={form.start}
                  onChange={(e) => setForm({ ...form, start: e.target.value })}
                  className="w-full bg-[#161F32] border border-white/10 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-cyan-500 text-center"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">إلى الساعة:</label>
                <input
                  type="time"
                  required
                  value={form.end}
                  onChange={(e) => setForm({ ...form, end: e.target.value })}
                  className="w-full bg-[#161F32] border border-white/10 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-cyan-500 text-center"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                المدرج أو القاعة (اختياري):
              </label>
              <input
                type="text"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                placeholder="مثال: مدرج ج، قاعة 304"
                className="w-full bg-[#161F32] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">لون المادة في الجدول:</label>
              <div className="flex gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setForm({ ...form, color: c.id })}
                    className={`w-7 h-7 rounded-lg border-2 transition-transform ${c.bg} ${
                      form.color === c.id ? 'scale-125 border-white ring-2 ring-white/30' : 'opacity-70'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3.5 text-sm font-black mt-2">
              ➕ إضافة إلى الجدول
            </button>
          </form>

          {/* Added Courses List */}
          {entries.length > 0 && (
            <div className="mt-6 pt-5 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-400">
                <span>المواد المسجلة ({entries.length})</span>
                <button onClick={clearAll} className="text-rose-400 hover:underline">
                  تفريغ الكل
                </button>
              </div>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {entries.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#161F32] border border-white/5 text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{item.name}</span>
                      <span className="text-[11px] text-slate-400">
                        {item.day} · {item.start} - {item.end}
                      </span>
                    </div>
                    <button
                      onClick={() => removeEntry(item.id)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                      title="حذف"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Visual Timetable Grid (8 Cols) */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-[#111827]/90 border border-white/[0.08] shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span>📋</span>
                <span>الجدول الدراسي الأسبوعي</span>
              </h2>

              <button
                onClick={() => window.print()}
                className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5"
              >
                <span>🖨️</span>
                <span>طباعة / حفظ PDF</span>
              </button>
            </div>

            {/* Timetable Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0A0E17]">
              <table className="w-full text-center border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 border-b border-white/[0.08]">
                    <th className="p-3 text-slate-400 font-bold border-l border-white/[0.06] w-24">
                      اليوم
                    </th>
                    <th className="p-3 text-slate-400 font-bold">المحاضرات والسكاشن المسجلة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {DAYS.map((day) => {
                    const dayEntries = entries
                      .filter((e) => e.day === day)
                      .sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start))

                    return (
                      <tr key={day} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-3 font-bold text-white bg-slate-900/60 border-l border-white/[0.06] align-top whitespace-nowrap">
                          {day}
                          {dayEntries.length > 0 && (
                            <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                              {dayEntries.length} مواد
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          {dayEntries.length > 0 ? (
                            <div className="flex flex-wrap gap-2.5">
                              {dayEntries.map((item) => {
                                const colorStyle =
                                  COLOR_OPTIONS.find((c) => c.id === item.color)?.bg ||
                                  COLOR_OPTIONS[0].bg

                                // Check if this item is in a conflict
                                const hasConflict = conflicts.some(
                                  (c) => c.idA === item.id || c.idB === item.id
                                )

                                return (
                                  <div
                                    key={item.id}
                                    className={`p-3 rounded-xl border text-right transition-all min-w-[170px] ${
                                      hasConflict
                                        ? 'bg-rose-950/50 border-rose-500 text-rose-200 ring-1 ring-rose-500/50 animate-pulse'
                                        : colorStyle
                                    }`}
                                  >
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                      <span className="font-black text-white text-xs">
                                        {item.name}
                                      </span>
                                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 font-semibold">
                                        {item.type}
                                      </span>
                                    </div>
                                    <div className="text-[11px] font-mono opacity-90 flex items-center justify-between">
                                      <span>
                                        ⏰ {item.start} - {item.end}
                                      </span>
                                      {item.room && <span>📍 {item.room}</span>}
                                    </div>
                                    {hasConflict && (
                                      <span className="block text-[10px] text-rose-400 font-bold mt-1">
                                        ⚠️ تعارض في الوقت!
                                      </span>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          ) : (
                            <span className="text-slate-600 text-xs font-arabic">
                              لا توجد محاضرات في هذا اليوم (يوم إجازة 🎉)
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center mt-4">
            يتم حفظ التعديلات على جدولك محلياً بشكل فوري. يمكنك تعديل أو حذف أي مادة في أي وقت.
          </p>
        </div>
      </div>

      {/* Guide Article */}
      <article className="p-6 sm:p-8 rounded-3xl bg-[#111827]/70 border border-white/[0.06] mb-12 text-slate-300 text-sm leading-relaxed space-y-3">
        <h2 className="text-xl font-black text-white">نصائح لبناء جدول دراسي جامعي مثالي</h2>
        <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-slate-300">
          <li><strong>تقليل فترات الفراغ (Break Times):</strong> حاول تنظيم المواد المتتالية لتجنب الانتظار 3 أو 4 ساعات فارغة بين المحاضرات.</li>
          <li><strong>تخصيص يوم إجازة (Day Off):</strong> توزيع المواد بذكاء قد يتيح لك إنهاء الجدول في 3 أو 4 أيام، مما يمنحك يوماً إضافياً للراحة أو المذاكرة.</li>
          <li><strong>تنسيق السكاشن والمعامل:</strong> احرص دائماً على تسجيل السكشن في نفس يوم المحاضرة لتجنب الحضور في الكلية من أجل سكشن نصف ساعة فقط.</li>
        </ul>
      </article>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6 text-center">
          أسئلة شائعة حول تنظيم الجدول الدراسي
        </h2>
        <FAQ items={scheduleFaq} />
      </section>

      <AdBanner slot="schedule-bottom" />

      {/* Related Tools */}
      <section>
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          أدوات أكاديمية ذات صلة
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ToolCard
            href="/attendance-calculator"
            icon="⏱️"
            titleAr="حاسبة نسبة الغياب والإنذار"
            titleEn="ATTENDANCE CALCULATOR"
            description="احسب نسبة غيابك وكم محاضرة متبقية لك لتجنب الحرمان."
            color="rose"
          />
          <ToolCard
            href="/gpa-calculator"
            icon="🎓"
            titleAr="حاسبة المعدل التراكمي (GPA)"
            titleEn="GPA CALCULATOR"
            description="احسب معدلك التراكمي والفصلي بالساعات المعتمدة."
            color="emerald"
          />
        </div>
      </section>
    </div>
  )
}
