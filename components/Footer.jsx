import React from 'react'
import Link from 'next/link'

const tools = [
  { href: '/gpa-calculator', title: 'حاسبة المعدل التراكمي (GPA)', en: 'GPA Calculator' },
  { href: '/percentage-calculator', title: 'حاسبة النسبة المئوية', en: 'Percentage Calculator' },
  { href: '/final-grade-calculator', title: 'حاسبة درجة الامتحان النهائي', en: 'Final Grade Calculator' },
  { href: '/gpa-converter', title: 'تحويل المعدل إلى نسبة مئوية ومقياس 5', en: 'GPA to Percentage Converter' },
  { href: '/attendance-calculator', title: 'حاسبة نسبة الغياب وحد الحرمان (25%)', en: 'Attendance & Absence Calculator' },
]

const company = [
  { href: '/about', title: 'من نحن (About Us)' },
  { href: '/contact', title: 'اتصل بنا ومقترحات الطلاب' },
  { href: '/privacy-policy', title: 'سياسة الخصوصية (Privacy Policy)' },
  { href: '/terms', title: 'شروط الاستخدام (Terms of Service)' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#080C14] relative overflow-hidden mt-28">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-black text-base shadow-lg shadow-indigo-500/25">
                S
              </div>
              <span className="font-display font-extrabold text-white text-xl">
                Student<span className="text-indigo-400">Tools</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md font-arabic">
              المنصة الأكاديمية الشاملة والمجانية 100% لمساعدة الطلاب في الجامعات والمدارس على حساب المعدل التراكمي (GPA)، والنسبة المئوية، ودرجات الفاينال، ونسب الغياب والحرمان بدقة وسرعة فائقة دون تسجيل أو جمع بيانات شخصية.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                مجاني للأبد بدون اشتراكات
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                🔒 خصوصية تامة
              </span>
            </div>
          </div>

          {/* Col 2: Academic Tools */}
          <div>
            <h3 className="font-arabic font-bold text-white text-sm uppercase tracking-wider mb-4 border-r-2 border-indigo-500 pr-2">
              الأدوات الأكاديمية
            </h3>
            <ul className="space-y-2.5 font-arabic text-sm">
              {tools.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-slate-400 hover:text-indigo-300 transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">➜</span>
                    <span>{t.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company & Trust */}
          <div>
            <h3 className="font-arabic font-bold text-white text-sm uppercase tracking-wider mb-4 border-r-2 border-cyan-500 pr-2">
              معلومات وقوانين
            </h3>
            <ul className="space-y-2.5 font-arabic text-sm">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="text-slate-600">·</span>
                    <span>{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Student Tools (أدوات الطلاب). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">سياسة الخصوصية</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">شروط الاستخدام</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">اتصل بنا</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
