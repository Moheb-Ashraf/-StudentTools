import React from 'react'

export const metadata = {
  title: 'سياسة الخصوصية (Privacy Policy)',
  description: 'سياسة الخصوصية وحماية بيانات الزوار والطلاب في منصة أدوات الطلاب.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 font-arabic">
      <div className="p-8 sm:p-12 rounded-3xl bg-[#111827]/90 border border-white/[0.08] shadow-2xl space-y-8">
        <div className="text-center pb-8 border-b border-white/[0.08]">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            سياسة الخصوصية (Privacy Policy)
          </h1>
          <p className="text-xs text-slate-400">آخر تحديث: {new Date().getFullYear()}</p>
        </div>

        <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            في <strong>Student Tools (أدوات الطلاب)</strong>، نضع سرية وخصوصية بيانات زوارنا الكرام على رأس أولوياتنا. توضح هذه الوثيقة نوعية المعلومات التي نتلقاها ونجمعها وكيفية استخدامها لحمايتك.
          </p>

          <h2 className="text-xl font-bold text-white">1. الدرجات والبيانات الأكاديمية</h2>
          <p>
            جميع العمليات الحسابية لحساب المعدل التراكمي (GPA)، والنسبة المئوية، ودرجات الفاينال ونسب الغياب تتم بنسبة 100% داخل متصفحك المحلي (Client-side). <strong>نحن لا نقوم بحفظ أو رفع أو مشاركة أي درجات أكاديمية خاصة بك على أي خوادم خارجية.</strong>
          </p>

          <h2 className="text-xl font-bold text-white">2. ملفات تعريف الارتباط والإعلانات (Cookies)</h2>
          <p>
            قد تستخدم شبكات الإعلانات المعتمدة مستقبلاً (مثل Google AdSense أو شركاء الإعلانات) ملفات تعريف الارتباط (Cookies) لعرض إعلانات ذات صلة باهتمامات الطلاب. يحق لك في أي وقت تعطيل ملفات تعريف الارتباط من خلال إعدادات متصفحك دون التأثير على وظائف الحاسبات.
          </p>

          <h2 className="text-xl font-bold text-white">3. ملفات السجل القياسية (Log Files)</h2>
          <p>
            مثل معظم مواقع الويب، نقوم بتسجيل معلومات قياسية مجهولة الهوية مثل نوع المتصفح وعنوان IP ومزود الخدمة وتوقيت الزيارة لأغراض مراقبة استقرار الخوادم وحمايتها من الهجمات فقط.
          </p>

          <h2 className="text-xl font-bold text-white">4. التواصل معنا</h2>
          <p>
            إذا كان لديك أي استفسار بخصوص سياسة الخصوصية، يمكنك التواصل معنا في أي وقت عبر صفحة <a href="/contact" className="text-indigo-400 underline">اتصل بنا</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
