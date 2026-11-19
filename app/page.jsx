'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import ToolCard from '../components/ToolCard'
import FAQ from '../components/FAQ'
import AdBanner from '../components/AdBanner'

const ALL_TOOLS = [
  {
    id: 'gpa',
    category: 'gpa',
    href: '/gpa-calculator',
    icon: '🎓',
    titleAr: 'حاسبة المعدل التراكمي (GPA)',
    titleEn: 'GPA CALCULATOR',
    description: 'احسب معدلك التراكمي والفصلي لنظام الساعات المعتمدة ومقياس 4.0 بدقة فورية مع خيارات تصدير النتيجة وحفظ المواد.',
    tag: 'الأكثر استخداماً 🔥',
    color: 'emerald',
    highlight: true,
  },
  {
    id: 'percentage',
    category: 'grades',
    href: '/percentage-calculator',
    icon: '📊',
    titleAr: 'حاسبة النسبة المئوية للدرجات',
    titleEn: 'PERCENTAGE CALCULATOR',
    description: 'احسب نسبتك المئوية من المجموع الكلي، ونسبة الزيادة والنقصان، والتقدير العام لشهادات الجامعة والثانوية.',
    tag: 'سريع ولحظي',
    color: 'indigo',
  },
  {
    id: 'final-grade',
    category: 'grades',
    href: '/final-grade-calculator',
    icon: '🎯',
    titleAr: 'حاسبة الدرجة المطلوبة في الفاينال',
    titleEn: 'FINAL GRADE CALCULATOR',
    description: 'اعرف كم درجة تحتاج في الامتحان النهائي لاجتياز المادة أو للحصول على تقدير امتياز بناءً على درجات أعمال السنة.',
    tag: 'منقذ الامتحانات ⚡',
    color: 'amber',
  },
  {
    id: 'converter',
    category: 'gpa',
    href: '/gpa-converter',
    icon: '🔄',
    titleAr: 'محول المعدل لنسبة ومقياس 5 إلى 4',
    titleEn: 'GPA SCALE CONVERTER',
    description: 'حول معدلك التراكمي 4.0 إلى نسبة مئوية %، أو حول بين مقياس 5.0 ومقياس 4.0 المعتمد في الجامعات السعودية والمصرية.',
    tag: 'معادلات معتمدة',
    color: 'cyan',
  },
  {
    id: 'attendance',
    category: 'attendance',
    href: '/attendance-calculator',
    icon: '⏱️',
    titleAr: 'حاسبة نسبة الغياب وحد الحرمان (25%)',
    titleEn: 'ATTENDANCE & ABSENCE',
    description: 'احسب نسبة غيابك وكم محاضرة متبقية لك قبل صدور قرار الحرمان من دخول الامتحان النهائي طبقاً للائحة كليتك.',
    tag: 'تجنب الحرمان ⚠️',
    color: 'rose',
  },
]

const homeFaq = [
  {
    q: 'ما هو نظام الساعات المعتمدة وكيف يُحسب المعدل التراكمي (GPA)؟',
    a: 'نظام الساعات المعتمدة يعتمد على ضرب نقاط كل مادة في عدد ساعاتها الدراسية، ثم جمع النواتج وقسمتها على إجمالي الساعات المسجلة. مقياس 4.0 هو النظام المعتمد في معظم الجامعات المصرية والعربية.',
  },
  {
    q: 'هل الأدوات مجانية وهل يتم حفظ أو مشاركة درجاتي؟',
    a: 'جميع الأدوات مجانية 100% وبدون أي قيود أو تسجيل. الحسابات تتم بالكامل داخل متصفحك (Client-side)، ولا يتم إرسال أو حفظ أي درجات على أي خوادم خارجية حفاظاً على خصوصيتك التامة.',
  },
  {
    q: 'كيف أحول معدل GPA من 4.0 أو 5.0 إلى نسبة مئوية %؟',
    a: 'يمكنك استخدام "أداة محول المعدل" المتوفرة على الموقع، حيث تدعم التحويل الخطي المباشر، والمعادلة القياسية لوزارة التعليم والجامعات مع جداول مقارنة التقديرات.',
  },
  {
    q: 'ما هو الحد الأقصى المسموح به للغياب في الجامعات قبل الحرمان؟',
    a: 'تنص اللائحة في أغلب الجامعات المصرية والعربية على أن حد الحرمان هو 25% من إجمالي ساعات الاتصال أو المحاضرات للفصل الدراسي. تتيح لك حاسبة الغياب حساب عدد المحاضرات المتبقية بدقة.',
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesSearch =
        tool.titleAr.includes(searchTerm) ||
        tool.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.includes(searchTerm)

      const matchesCat = activeCategory === 'all' || tool.category === activeCategory
      return matchesSearch && matchesCat
    })
  }, [searchTerm, activeCategory])

  return (
    <div className="relative overflow-hidden pb-16">
      {/* Background radial ambient lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-500/15 via-indigo-600/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-rose-500/5 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-semibold mb-6 animate-fade-in shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>منصة الطالب الجامعي الذكية · مجاني 100% بدون تسجيل</span>
        </div>

        {/* Main Title */}
        <h1 className="font-arabic font-black text-3xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-4">
          أدوات أكاديمية متكاملة
          <span className="block text-gradient-brand mt-1 sm:mt-2">
            لحساب المعدل والدرجات ونسب الغياب
          </span>
        </h1>

        <p className="font-arabic text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          احسب معدلك التراكمي (GPA) بالساعات المعتمدة، نسبتك المئوية، الدرجة المطلوبة في الفاينال، وحد الغياب القانوني — بكل سرعة وسهولة من مكان واحد.
        </p>

        {/* Search & Quick Actions */}
        <div className="max-w-2xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 ابحث عن أداة: معدل تراكمي، نسبة مئوية، فاينال، غياب..."
              className="w-full bg-[#111827]/90 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-slate-400 font-arabic text-sm sm:text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-xl transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
              >
                مسح
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-arabic text-xs sm:text-sm">
            {[
              { id: 'all', label: 'جميع الأدوات (5)' },
              { id: 'gpa', label: '🎓 حساب المعدل (GPA)' },
              { id: 'grades', label: '📊 الامتحانات والنسب' },
              { id: 'attendance', label: '⏱️ الحضور والغياب' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                    : 'bg-[#111827]/70 border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick University Presets Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400 font-arabic">
          <span className="text-slate-500">متوافق مع:</span>
          <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">جامعة القاهرة</span>
          <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">جامعة عين شمس</span>
          <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">جامعة الإسكندرية</span>
          <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">جامعة الملك سعود</span>
          <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">نظام 4.0 و 5.0</span>
        </div>
      </section>

      {/* Tools Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-arabic font-extrabold text-2xl sm:text-3xl text-white">
              الأدوات والحاسبات المتاحة
            </h2>
            <p className="font-arabic text-sm text-slate-400 mt-1">
              اختر الأداة المناسبة لاحتياجك الأكاديمي الحالي
            </p>
          </div>
          <span className="font-arabic text-xs text-indigo-400 hidden sm:inline-block">
            {filteredTools.length} أداة جاهزة للاستخدام
          </span>
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                href={tool.href}
                icon={tool.icon}
                titleAr={tool.titleAr}
                titleEn={tool.titleEn}
                description={tool.description}
                tag={tool.tag}
                color={tool.color}
                highlight={tool.highlight}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-2xl bg-[#111827]/40 border border-white/[0.06] font-arabic">
            <p className="text-lg text-slate-300 mb-2">لا توجد أدوات مطابقة لبحثك</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('all') }}
              className="btn-secondary text-xs"
            >
              عرض جميع الأدوات
            </button>
          </div>
        )}
      </section>

      {/* Why Student Tools? Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#111827] to-[#0D1322] border border-white/[0.08] relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-arabic font-extrabold text-2xl sm:text-3xl text-white mb-2">
              لماذا يفضل الطلاب منصة StudentTools؟
            </h2>
            <p className="font-arabic text-sm text-slate-400">
              صممت الأدوات لتكون الأسرع والأكثر أماناً وموثوقية
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-arabic">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl mb-3">
                ⚡
              </div>
              <h3 className="font-bold text-white text-base mb-1">حساب لحظي فوري</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                النتائج تظهر بمجرد كتابة الأرقام دون أي تحميل أو انتظار أو الحاجة لإعادة تحميل الصفحة.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl mb-3">
                🔒
              </div>
              <h3 className="font-bold text-white text-base mb-1">خصوصية 100%</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                كل العمليات الحسابية تتم محلياً على جهازك؛ لا نحفظ درجاتك ولا نطلب منك تسجيل حساب.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl mb-3">
                📱
              </div>
              <h3 className="font-bold text-white text-base mb-1">يعمل كتطبيق هاتف (PWA)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                يمكنك إضافة المنصة إلى شاشة هاتفك الرئيسية واستخدامها بسرعة وخفة حتى بدون إنترنت.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl mb-3">
                📄
              </div>
              <h3 className="font-bold text-white text-base mb-1">تصدير تقرير PDF</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                إمكانية حفظ كشف درجات المواد والمعدل التراكمي وتصديره أو طباعته بضغطة زر واحدة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <div className="text-center mb-8">
          <span className="font-arabic text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
            دليلك الأكاديمي
          </span>
          <h2 className="font-arabic font-black text-2xl sm:text-3xl text-white">
            الأسئلة الشائعة حول حساب المعدل والدرجات
          </h2>
        </div>
        <FAQ items={homeFaq} />
      </section>

      <AdBanner slot="home-bottom" className="max-w-4xl mx-auto px-4" />
    </div>
  )
}
