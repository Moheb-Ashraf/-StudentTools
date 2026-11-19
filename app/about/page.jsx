import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'من نحن (About Us)',
  description: 'تعرف على منصة أدوات الطلاب، رسالتنا وهدفنا في خدمة الطلاب الجامعيين وطلاب المدارس مجاناً وبأعلى دقة.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 font-arabic">
      <div className="p-8 sm:p-12 rounded-3xl bg-[#111827]/90 border border-white/[0.08] shadow-2xl">
        <div className="text-center mb-10 pb-8 border-b border-white/[0.08]">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-3">
            🎓 رسالتنا ورؤيتنا
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
            من نحن (About Student Tools)
          </h1>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            منصة مستقلة تهدف إلى تسهيل الحياة الأكاديمية لملايين الطلاب في الوطن العربي ومصر والعالم.
          </p>
        </div>

        <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl font-black text-white">لماذا أنشأنا منصة Student Tools؟</h2>
          <p>
            لاحظنا أن الطلاب الجامعيين في نهاية كل فصل دراسي يواجهون صعوبة بالغة في حساب المعدل التراكمي (GPA) في نظام الساعات المعتمدة، أو التحويل بين المقاييس المختلفة (مثل 4.0 و 5.0 والنسبة المئوية)، أو حساب الدرجات المطلوبة في الامتحانات النهائية لتجنب الرسوب أو للحصول على تقدير امتياز.
          </p>
          <p>
            توجد العديد من المواقع القديمة، لكن معظمها بطيء، مليء بالإعلانات المزعجة المنبثقة، أو يطلب إنشاء حساب وجمع بيانات شخصية. لذا قررنا بناء <strong>Student Tools</strong> كمنصة عصرية سريعة، تحترم خصوصية الطالب بالكامل، وتعمل لحظياً وبدون أي تعقيد.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold text-white mb-1">سرعة ولحظية</h3>
              <p className="text-xs text-slate-400">حساب فوري بمجرد كتابة الرقم دون انتظار.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-bold text-white mb-1">أمان وخصوصية</h3>
              <p className="text-xs text-slate-400">لا يتم حفظ أو مشاركة أي درجات على خوادمنا.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-bold text-white mb-1">تطبيق جوال PWA</h3>
              <p className="text-xs text-slate-400">تثبيت فوري على شاشة الهاتف للاستخدام السريع.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.08] flex justify-center gap-4">
            <Link href="/gpa-calculator" className="btn-primary text-sm">
              🎓 جرب حاسبة المعدل GPA
            </Link>
            <Link href="/contact" className="btn-secondary text-sm">
              📬 تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
