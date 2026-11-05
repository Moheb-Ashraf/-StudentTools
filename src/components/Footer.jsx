import React from 'react'
import { Link } from 'react-router-dom'

const tools = [
  { to: '/gpa-calculator', label: 'GPA Calculator', labelAr: 'حاسبة المعدل التراكمي' },
  { to: '/percentage-calculator', label: 'Percentage Calculator', labelAr: 'حاسبة النسبة المئوية' },
  { to: '/final-grade-calculator', label: 'Final Grade Calculator', labelAr: 'حاسبة الدرجة النهائية' },
  { to: '/gpa-converter', label: 'GPA Converter', labelAr: 'تحويل المعدل لنسبة' },
  { to: '/attendance-calculator', label: 'Attendance Calculator', labelAr: 'حاسبة نسبة الغياب' },
]

const legalLinks = [
  { to: '/privacy-policy', label: 'Privacy Policy', labelAr: 'سياسة الخصوصية' },
  { to: '/terms', label: 'Terms of Service', labelAr: 'شروط الاستخدام' },
  { to: '/about', label: 'About Us', labelAr: 'من نحن' },
  { to: '/contact', label: 'Contact Us', labelAr: 'اتصل بنا' },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink-700/30 mt-20 bg-ink-950/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-ink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">S</div>
              <span className="font-display font-bold text-white">StudentTools</span>
            </div>
            <p className="text-ink-400 text-sm leading-relaxed mb-4">
              منصة مجانية للأدوات والحاسبات الأكاديمية لمساعدة الطلاب الجامعيين وطلاب المدارس في حساب معدلاتهم ودرجاتهم ونسب الغياب بسهولة وبدون تسجيل.
            </p>
            <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-full">
              🟢 مجاني وآمن 100%
            </span>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Academic Tools / الأدوات</h3>
            <ul className="space-y-2">
              {tools.map((t) => (
                <li key={t.to}>
                  <Link to={t.to} className="text-ink-400 hover:text-ink-200 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-500 flex-shrink-0" />
                    <span>{t.label}</span>
                    <span className="font-arabic text-ink-600 text-xs">— {t.labelAr}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Information / معلومات</h3>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-ink-400 hover:text-ink-200 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-600 flex-shrink-0" />
                    <span>{l.label}</span>
                    <span className="font-arabic text-ink-500 text-xs font-semibold">— {l.labelAr}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-700/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-500">
          <p>
            © {new Date().getFullYear()} Student Tools. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-ink-300">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-ink-300">Terms</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-ink-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
