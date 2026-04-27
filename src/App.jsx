import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'

const GPACalculator = lazy(() => import('./pages/GPACalculator'))
const PercentageCalculator = lazy(() => import('./pages/PercentageCalculator'))
const FinalGradeCalculator = lazy(() => import('./pages/FinalGradeCalculator'))
const Home = lazy(() => import('./pages/Home'))

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ink-950">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gpa-calculator" element={<GPACalculator />} />
            <Route path="/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/final-grade-calculator" element={<FinalGradeCalculator />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
