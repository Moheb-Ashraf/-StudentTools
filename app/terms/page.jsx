import React from 'react'

export const metadata = {
  title: 'شروط الاستخدام (Terms of Service)',
  description: 'شروط الاستخدام وإخلاء المسؤولية لمنصة أدوات الطلاب.',
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 font-arabic">
      <div className="p-8 sm:p-12 rounded-3xl bg-[#111827]/90 border border-white/[0.08] shadow-2xl space-y-8">
        <div className="text-center pb-8 border-b border-white/[0.08]">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            شروط الاستخدام (Terms of Service)
          </h1>
          <p className="text-xs text-slate-400">تاريخ السريان: {new Date().getFullYear()}</p>
        </div>

        <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            باستخدامك لموقع <strong>Student Tools</strong>، فإنك توافق على الالتزام بشروط الاستخدام التالية:
          </p>

          <h2 className="text-xl font-bold text-white">1. الغرض التعليمي والإرشادي</h2>
          <p>
            جميع الحاسبات والمعادلات المتوفرة على الموقع مقدمة لمساعدة الطلاب كأداة إرشادية وتخطيطية لتسهيل الدراسة. بالرغم من دقة المعادلات الرياضية المستخدمة، يجب دائماً مراجعة كشف الدرجات الرسمي والمرشد الأكاديمي بجامعتك أو كليتك للتأكد من حسابات التخرج المعتمدة.
          </p>

          <h2 className="text-xl font-bold text-white">2. الاستخدام الشخصي المسموح</h2>
          <p>
            يحق لأي طالب أو معلم استخدام هذه الأدوات مجاناً ودون قيود للاستخدام الشخصي والدراسي. يمنع منعاً باتاً محاولة استغلال المنصة في أي هجمات إلكترونية أو إرسال طلبات آلية ضارة بالخوادم.
          </p>

          <h2 className="text-xl font-bold text-white">3. إخلاء المسؤولية</h2>
          <p>
            نبذل قصارى جهدنا لضمان دقة واستمرارية الخدمة، ولكننا لا نتحمل أي مسؤولية قانونية عن أي قرارات أكاديمية يتم اتخاذها دون الرجوع للوائح الكلية الرسمية.
          </p>
        </div>
      </div>
    </div>
  )
}
