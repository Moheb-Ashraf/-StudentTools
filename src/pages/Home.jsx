import React from 'react'
import { Link } from 'react-router-dom'
import SEOMeta from '../components/SEOMeta'
import ToolCard from '../components/ToolCard'
import AdBanner from '../components/AdBanner'

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Student Tools | أدوات الطلاب",
  "description": "Free academic tools: GPA calculator, percentage calculator, final grade calculator. أدوات أكاديمية مجانية للطلاب.",
  "url": "https://studenttools.app",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "url": "https://studenttools.app/gpa-calculator", "name": "GPA Calculator | حاسبة المعدل التراكمي" },
      { "@type": "ListItem", "position": 2, "url": "https://studenttools.app/percentage-calculator", "name": "Percentage Calculator | حاسبة النسبة المئوية" },
      { "@type": "ListItem", "position": 3, "url": "https://studenttools.app/final-grade-calculator", "name": "Final Grade Calculator | حاسبة الدرجة النهائية" }
    ]
  }
}

const stats = [
  { num: '100%', label: 'Free Forever', labelAr: 'مجاني للأبد' },
  { num: '3', label: 'Student Tools', labelAr: 'أداة أكاديمية' },
  { num: '0', label: 'Registration Needed', labelAr: 'بدون تسجيل' },
  { num: '4.0', label: 'GPA Scale', labelAr: 'مقياس المعدل' },
]

export default function Home() {
  return (
    <>
      <SEOMeta
        title="Student Tools | أدوات الطلاب - GPA Calculator, Grade Tools Free"
        description="Free student tools: GPA calculator, percentage calculator, final grade calculator. احسب GPA ومعدلك التراكمي. أدوات مجانية للطلاب العرب والمصريين."
        canonical="/"
        keywords="student tools, GPA calculator, حاسبة المعدل, أدوات الطلاب, percentage calculator, final grade, معدل تراكمي, حاسبة GPA, طلاب مصر"
        schemaData={homeSchema}
      />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative px-4 sm:px-6 py-20 sm:py-28 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 hero-gradient pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-ink-500/5 blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-ink-500/10 border border-ink-500/20 text-ink-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
              Free for all students · مجاني لجميع الطلاب
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              Academic Tools
              <span className="block text-gradient">for Smart Students</span>
            </h1>
            <p className="font-arabic text-xl sm:text-2xl text-ink-400 mb-2 font-semibold">
              أدوات أكاديمية للطلاب المتميزين
            </p>
            <p className="text-ink-500 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Calculate your GPA, score percentage, and required final exam grade — all in seconds, for free.
              احسب معدلك ونسبتك ودرجتك النهائية في ثوانٍ ومجاناً.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/gpa-calculator" className="btn-primary text-base px-8 py-3.5">
                🎓 Calculate Your GPA
              </Link>
              <Link to="/percentage-calculator" className="btn-secondary text-base px-8 py-3.5">
                📊 Percentage Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.num} className="card p-4 text-center">
                <p className="font-display font-extrabold text-3xl text-gradient mb-1">{s.num}</p>
                <p className="text-ink-400 text-xs">{s.label}</p>
                <p className="font-arabic text-ink-600 text-xs">{s.labelAr}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
          <div className="text-center mb-8">
            <span className="section-tag mb-3">🛠️ Our Tools</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Free Academic Calculators
              <span className="block text-base font-arabic font-normal text-ink-400 mt-1">حاسبات أكاديمية مجانية</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <ToolCard
              to="/gpa-calculator"
              icon="🎓"
              title="GPA Calculator"
              titleAr="حاسبة المعدل التراكمي"
              description="Add courses with grades and credit hours. Get your cumulative GPA instantly. احسب GPA بسهولة."
              color="ink"
            />
            <ToolCard
              to="/percentage-calculator"
              icon="📊"
              title="Percentage Calculator"
              titleAr="حاسبة النسبة المئوية"
              description="Calculate score percentages, grade percentages, and percentage changes."
              color="amber"
            />
            <ToolCard
              to="/final-grade-calculator"
              icon="🎯"
              title="Final Grade Calculator"
              titleAr="حاسبة الدرجة النهائية"
              description="Find the exact grade needed on your final exam to achieve your goal grade."
              color="emerald"
            />
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AdBanner slot="home-main" />
        </div>

        {/* Why us */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 mb-8">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-2xl text-white">
              Why StudentTools?
              <span className="block text-base font-arabic font-normal text-ink-400 mt-1">لماذا أدوات الطلاب؟</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: '⚡', title: 'Instant Results', titleAr: 'نتائج فورية', desc: 'Calculations happen as you type — no waiting, no loading.' },
              { icon: '🔒', title: '100% Free', titleAr: 'مجاني 100%', desc: 'No registration, no hidden fees, no limits. Free forever.' },
              { icon: '📱', title: 'Mobile-First', titleAr: 'يعمل على الجوال', desc: 'Works perfectly on your phone, tablet, or desktop.' },
            ].map((f) => (
              <div key={f.title} className="card p-5 text-center">
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h3 className="font-display font-bold text-white mb-0.5">{f.title}</h3>
                <p className="font-arabic text-ink-500 text-xs mb-2">{f.titleAr}</p>
                <p className="text-ink-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO text block */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
          <div className="card p-6 sm:p-8">
            <h2 className="font-display font-bold text-xl text-white mb-4">
              About Our Student Tools / عن أدوات الطلاب
            </h2>
            <div className="text-ink-400 text-sm leading-relaxed space-y-3">
              <p>
                StudentTools.app provides free academic calculators designed for university and high school students worldwide, with a special focus on Arabic-speaking students in Egypt, Saudi Arabia, UAE, Jordan, and all Arab countries. Our tools are optimized for mobile devices and work instantly without any app download or registration.
              </p>
              <p className="font-arabic text-right leading-loose">
                يوفر StudentTools.app حاسبات أكاديمية مجانية مصممة لطلاب الجامعات والثانويات حول العالم، مع تركيز خاص على الطلاب الناطقين بالعربية في مصر والسعودية والإمارات والأردن وجميع الدول العربية. أدواتنا محسّنة للأجهزة المحمولة وتعمل فوراً دون أي تنزيل لتطبيق أو تسجيل.
              </p>
              <p className="text-ink-600 text-xs font-arabic">
                أدوات الطلاب · حاسبة المعدل التراكمي · GPA Calculator Egypt · احسب GPA · حاسبة الدرجات · معدل الجامعة · نسبة مئوية · الدرجة النهائية · طلاب مصر · حاسبة مجانية
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
