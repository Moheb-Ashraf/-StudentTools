import React from 'react'
import { Link } from 'react-router-dom'
import SEOMeta from '../components/SEOMeta'

export default function AboutUs() {
  return (
    <>
      <SEOMeta
        title="About Us | من نحن"
        description="Learn about Student Tools - free academic calculators created to help students calculate GPA, grades, and academic standing easily. نبذة عن منصة أدوات الطلاب."
        canonical="/about"
      />

      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="card p-6 sm:p-10 text-ink-100">
          <div className="text-center mb-10 border-b border-ink-700/40 pb-6">
            <span className="section-tag mb-3">🎓 Our Mission / رسالتنا</span>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-2">
              About Student Tools / من نحن
            </h1>
            <p className="text-ink-400 text-base max-w-xl mx-auto">
              أدوات أكاديمية مجانية وسريعة مصممة لخدمة الطلاب في مصر والوطن العربي وجميع أنحاء العالم.
            </p>
          </div>

          <div className="space-y-8 leading-relaxed">
            <div dir="rtl" className="font-arabic space-y-4">
              <h2 className="text-2xl font-bold text-white">من نحن وماذا نقدم؟</h2>
              <p className="text-ink-300">
                منصة <strong>Student Tools (أدوات الطلاب)</strong> هي منصة مستقلة أُنشئت بهدف حل المشاكل اليومية التي تواجه الطلاب الجامعيين وطلاب المدارس. لاحظنا أن العديد من الطلاب يعانون في نهاية كل فصل دراسي في حساب المعدل التراكمي (GPA) في نظام الساعات المعتمدة، أو حساب الدرجة المطلوبة لاجتياز الاختبارات النهائية، أو حساب نسب الغياب والحرمان.
              </p>
              <p className="text-ink-300">
                لذا قمنا بتطوير هذه الأدوات لتعمل بأعلى سرعة ودقة وبشكل مجاني 100% دون الحاجة إلى إنشاء حساب أو إدخال أي بيانات شخصية، مع دعم كامل للغة العربية والإنجليزية، ودعم شاشات الهواتف المحمولة.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-ink-900/40 p-4 rounded-xl border border-ink-700/30 text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-bold text-white text-base">سرعة فائقة</h3>
                  <p className="text-ink-400 text-xs mt-1">الحساب يتم فورياً في جهازك دون أي انتظار أو تحميل.</p>
                </div>
                <div className="bg-ink-900/40 p-4 rounded-xl border border-ink-700/30 text-center">
                  <div className="text-3xl mb-2">🔒</div>
                  <h3 className="font-bold text-white text-base">أمان وخصوصية</h3>
                  <p className="text-ink-400 text-xs mt-1">لا نحفظ درجاتك ولا نشارك بياناتك مع أي طرف ثالث.</p>
                </div>
                <div className="bg-ink-900/40 p-4 rounded-xl border border-ink-700/30 text-center">
                  <div className="text-3xl mb-2">📱</div>
                  <h3 className="font-bold text-white text-base">متوافق مع الجوال</h3>
                  <p className="text-ink-400 text-xs mt-1">يعمل كتطبيق هاتف خفيف يمكنك تثبيته واستخدامه بدون نت.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-ink-700/40 pt-6 flex justify-center gap-4">
              <Link to="/gpa-calculator" className="btn-primary text-sm">
                🎓 جرب حاسبة المعدل GPA
              </Link>
              <Link to="/contact" className="btn-secondary text-sm">
                📬 تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
