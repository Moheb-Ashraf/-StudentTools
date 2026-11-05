import React from 'react'
import SEOMeta from '../components/SEOMeta'

export default function PrivacyPolicy() {
  return (
    <>
      <SEOMeta
        title="Privacy Policy | سياسة الخصوصية"
        description="Privacy policy and data protection terms for StudentTools. سياسة الخصوصية وحماية البيانات في أدوات الطلاب."
        canonical="/privacy-policy"
      />

      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="card p-6 sm:p-10 text-ink-100">
          <div className="text-center mb-8 border-b border-ink-700/40 pb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-2">
              Privacy Policy / سياسة الخصوصية
            </h1>
            <p className="text-ink-400 text-sm">Last updated / آخر تحديث: {new Date().getFullYear()}</p>
          </div>

          <div className="space-y-8 text-sm sm:text-base leading-relaxed">
            {/* Arabic Section */}
            <div dir="rtl" className="font-arabic space-y-4 bg-ink-900/30 p-5 rounded-2xl border border-ink-700/30">
              <h2 className="text-xl font-bold text-white mb-2">أولاً: سياسة الخصوصية (باللغة العربية)</h2>
              <p>
                نحن في <strong>Student Tools (أدوات الطلاب)</strong> نولي سرية وخصوصية بيانات زوارنا اهتماماً بالغاً. توضح هذه الوثيقة نوعية المعلومات التي قد يتم جمعها وكيفية التعامل معها.
              </p>

              <h3 className="font-bold text-ink-200 text-lg">1. البيانات الأكاديمية والدرجات</h3>
              <p>
                جميع العمليات الحسابية مثل حساب المعدل التراكمي (GPA) والنسب المئوية تتم محلياً في متصفحك (Client-side). نحن <strong>لا نقوم</strong> بتخزين أو مشاركة أي درجات أو بيانات أكاديمية خاصة بك على أي خوادم خارجية.
              </p>

              <h3 className="font-bold text-ink-200 text-lg">2. ملفات تعريف الارتباط والإعلانات (Cookies & Ads)</h3>
              <p>
                قد نستخدم نحن أو شركاؤنا من شبكات الإعلانات المعتمدة (مثل Google AdSense، أو Adsterra، أو Monetag) ملفات تعريف الارتباط (Cookies) لعرض إعلانات مناسبة للمستخدمين بناءً على زياراتهم السابقة لهذا الموقع أو لمواقع أخرى على الإنترنت.
              </p>
              <p>
                يمكنك في أي وقت تعطيل ملفات تعريف الارتباط المخصصة للإعلانات عبر إعدادات متصفحك أو عبر زيارة إعدادات إعلانات جوجل: 
                <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-ink-400 underline mr-1">Google Ads Settings</a>.
              </p>

              <h3 className="font-bold text-ink-200 text-lg">3. ملفات السجل (Log Files)</h3>
              <p>
                مثل أغلب المواقع على الويب، قد تسجل الخوادم تلقائياً بيانات قياسية مثل: عنوان بروتوكول الإنترنت (IP)، نوع المتصفح، مزود خدمة الإنترنت (ISP)، وتاريخ ووقت الزيارة لأغراض تحليل الأداء وحماية الموقع من الهجمات الخبيثة فقط.
              </p>
            </div>

            {/* English Section */}
            <div dir="ltr" className="space-y-4 bg-ink-900/30 p-5 rounded-2xl border border-ink-700/30">
              <h2 className="text-xl font-bold text-white mb-2 font-display">Privacy Policy (English)</h2>
              <p>
                At <strong>Student Tools</strong>, the privacy of our visitors is of extreme importance to us. This privacy policy document outlines the types of personal information that is received and collected by StudentTools and how it is used.
              </p>

              <h3 className="font-bold text-ink-200 text-lg">1. Academic Data & Calculations</h3>
              <p>
                All calculations (including GPA, grade percentages, and course scores) are performed locally inside your web browser. We do not store, upload, or sell your academic records or course data.
              </p>

              <h3 className="font-bold text-ink-200 text-lg">2. Advertising & Cookies</h3>
              <p>
                Third-party ad servers or ad networks (including Google AdSense and advertising partners) use cookies, JavaScript, or Web Beacons in their respective advertisements and links that appear on StudentTools. They automatically receive your IP address when this occurs.
              </p>
              <p>
                You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers' respective websites.
              </p>

              <h3 className="font-bold text-ink-200 text-lg">3. Contact Information</h3>
              <p>
                If you have any questions or require more information about our Privacy Policy, feel free to contact us via our Contact Us page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
