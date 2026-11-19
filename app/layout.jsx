import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  metadataBase: new URL('https://student-tools-two.vercel.app'),
  title: {
    default: 'Student Tools | أدوات الطلاب - حاسبة المعدل التراكمي GPA وحاسبات الدرجات',
    template: '%s | Student Tools',
  },
  description:
    'أدوات أكاديمية مجانية للطلاب: حاسبة المعدل التراكمي GPA، حاسبة النسبة المئوية، حاسبة درجة الامتحان النهائي، تحويل المعدل إلى نسبة مئوية ومقياس 5 إلى 4، وحاسبة نسبة الغياب والحرمان.',
  keywords: [
    'حاسبة المعدل التراكمي',
    'GPA calculator',
    'حساب GPA الساعات المعتمدة',
    'حاسبة النسبة المئوية',
    'الدرجة المطلوبة في الفاينال',
    'تحويل المعدل لنسبة مئوية',
    'حاسبة الغياب والحرمان',
    'أدوات الطلاب',
    'طلاب الجامعات مصر',
    'GPA scale 4.0 5.0',
  ],
  authors: [{ name: 'Student Tools Team' }],
  creator: 'Student Tools',
  publisher: 'Student Tools',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Student Tools | أدوات الطلاب الأكاديمية الشاملة',
    description: 'احسب معدلك التراكمي GPA، نسبتك المئوية، ودرجاتك ونسب الغياب مجاناً وبدون تسجيل.',
    url: 'https://student-tools-two.vercel.app',
    siteName: 'Student Tools',
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Tools | أدوات الطلاب',
    description: 'حاسبة المعدل التراكمي GPA وحاسبات الدرجات والغياب للطلاب مجاناً.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        {/* Google Fonts: Cairo, Plus Jakarta Sans, Sora */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Google Site Verification */}
        <meta name="google-site-verification" content="7BhiPiBLgMtOYvDWxB2U-ekTFQrqvbDCy7w5DLt2i28" />

        {/* Structured Data: WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Student Tools',
              alternateName: ['أدوات الطلاب', 'StudentTools'],
              url: 'https://student-tools-two.vercel.app',
              description: 'منصة الأدوات الأكاديمية المجانية للطلاب لحساب المعدل التراكمي والدرجات والغياب.',
              inLanguage: ['ar', 'en'],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
