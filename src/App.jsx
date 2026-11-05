import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import ScrollToTop from './components/ScrollToTop'

function lazyWithRetry(componentImport) {
  return lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('chunk_retry_refreshed') || 'false'
    )

    try {
      const component = await componentImport()
      window.sessionStorage.setItem('chunk_retry_refreshed', 'false')
      return component
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.sessionStorage.setItem('chunk_retry_refreshed', 'true')
        window.location.reload()
        return { default: () => null }
      }
      throw error
    }
  })
}

const GPACalculator = lazyWithRetry(() => import('./pages/GPACalculator'))
const PercentageCalculator = lazyWithRetry(() => import('./pages/PercentageCalculator'))
const FinalGradeCalculator = lazyWithRetry(() => import('./pages/FinalGradeCalculator'))
const GPAtoPercentageConverter = lazyWithRetry(() => import('./pages/GPAtoPercentageConverter'))
const AttendanceCalculator = lazyWithRetry(() => import('./pages/AttendanceCalculator'))
const PrivacyPolicy = lazyWithRetry(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazyWithRetry(() => import('./pages/TermsOfService'))
const AboutUs = lazyWithRetry(() => import('./pages/AboutUs'))
const ContactUs = lazyWithRetry(() => import('./pages/ContactUs'))
const Home = lazyWithRetry(() => import('./pages/Home'))

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ink-950">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gpa-calculator" element={<GPACalculator />} />
            <Route path="/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/final-grade-calculator" element={<FinalGradeCalculator />} />
            <Route path="/gpa-converter" element={<GPAtoPercentageConverter />} />
            <Route path="/attendance-calculator" element={<AttendanceCalculator />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
