import React from 'react'
import SEOMeta from '../components/SEOMeta'

export default function TermsOfService() {
  return (
    <>
      <SEOMeta
        title="Terms of Service | شروط الاستخدام"
        description="Terms of Service and disclaimer for StudentTools calculators. شروط الاستخدام وإخلاء المسؤولية."
        canonical="/terms"
      />

      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="card p-6 sm:p-10 text-ink-100">
          <div className="text-center mb-8 border-b border-ink-700/40 pb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-2">
              Terms of Service / شروط الاستخدام
            </h1>
            <p className="text-ink-400 text-sm">Effective Date / تاريخ السريان: {new Date().getFullYear()}</p>
          </div>

          <div className="space-y-8 text-sm sm:text-base leading-relaxed">
            {/* Arabic */}
            <div dir="rtl" className="font-arabic space-y-4 bg-ink-900/30 p-5 rounded-2xl border border-ink-700/30">
              <h2 className="text-xl font-bold text-white mb-2">أولاً: شروط الاستخدام وإخلاء المسؤولية (العربية)</h2>
              <p>
                باستخدامك لموقع <strong>Student Tools (أدوات الطلاب)</strong>، فإنك توافق على الالتزام ببنود هذه الاتفاقية:
              </p>

              <h3 className="font-bold text-ink-200 text-lg">1. الغرض التعليمي والإرشادي</h3>
              <p>
                الحاسبات والأدوات المتوفرة على الموقع مقدمة لمساعدة الطلاب كأداة إرشادية وتسهيلية فقط. بالرغم من دقة المعادلات الرياضية المستخدمة، يجب دائماً مراجعة كشف الدرجات الرسمي أو المرشد الأكاديمي بجامعتك أو كليتك للتأكد من حسابات التخرج المعتمدة.
              </p>

              <h3 className="font-bold text-ink-200 text-lg">2. الاستخدام العادل</h3>
              <p>
                يحق لأي طالب أو معلم استخدام هذه الأدوات مجاناً ودون قيود للاستخدام الشخصي والتعليمي. يمنع منعاً باتاً استخدام برمجيات الزحف الآلي الضارة أو محاولة تعطيل الخوادم بأي شكل.
              </p>

              <h3 className="font-bold text-ink-200 text-lg">3. التحديثات والتعديلات</h3>
              <p>
                نحتفظ بالحق في تحديث أو تعديل أي أداة أو شرط من شروط الاستخدام في أي وقت بهدف تحسين تجربة الطلاب.
              </p>
            </div>

            {/* English */}
            <div dir="ltr" className="space-y-4 bg-ink-900/30 p-5 rounded-2xl border border-ink-700/30">
              <h2 className="text-xl font-bold text-white mb-2 font-display">Terms of Service (English)</h2>
              <p>
                By accessing and using <strong>Student Tools</strong>, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h3 className="font-bold text-ink-200 text-lg">1. Informational & Educational Purposes Only</h3>
              <p>
                All calculations, grade scales, and GPA estimates provided on this website are for educational and planning purposes only. Formal decisions should always be cross-referenced with your official university registrar or academic advisor.
              </p>

              <h3 className="font-bold text-ink-200 text-lg">2. Permitted Use</h3>
              <p>
                You are granted a free, non-exclusive license to use these academic tools for personal study. Automated scraping or malicious traffic generation is strictly prohibited.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
