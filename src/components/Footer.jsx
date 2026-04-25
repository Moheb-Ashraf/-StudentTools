import React from 'react'
import { Link } from 'react-router-dom'

const tools = [
  { to: '/gpa-calculator', label: 'GPA Calculator', labelAr: 'حاسبة المعدل التراكمي' },
  { to: '/percentage-calculator', label: 'Percentage Calculator', labelAr: 'حاسبة النسبة المئوية' },
  { to: '/final-grade-calculator', label: 'Final Grade Calculator', labelAr: 'حاسبة الدرجة النهائية' },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink-700/30 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-ink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">S</div>
              <span className="font-display font-bold text-white">StudentTools</span>
            </div>
            <p className="text-ink-400 text-sm leading-relaxed">
              Free academic tools for students worldwide. احسب معدلك ودرجاتك بسهولة مجاناً.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Tools / الأدوات</h3>
            <ul className="space-y-2">
              {tools.map((t) => (
                <li key={t.to}>
                  <Link to={t.to} className="text-ink-400 hover:text-ink-300 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-ink-500 flex-shrink-0" />
                    <span>{t.label}</span>
                    <span className="font-arabic text-ink-600">— {t.labelAr}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Keywords / SEO text block */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Keywords</h3>
            <p className="text-ink-600 text-xs leading-relaxed font-arabic">
              حاسبة المعدل التراكمي · GPA Calculator Egypt · احسب GPA ·
              حاسبة النسبة المئوية · Final Grade Calculator · Grade Calculator Arabic ·
              حاسبة الدرجات الجامعية · طالب · معدل · كلية
            </p>
          </div>
        </div>

        <div className="border-t border-ink-700/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-500 text-xs">
            © {new Date().getFullYear()} StudentTools.app — Free for students everywhere
          </p>
          <p className="text-ink-600 text-xs font-arabic">
            مجاني للطلاب في كل مكان
          </p>
        </div>
      </div>
    </footer>
  )
}
