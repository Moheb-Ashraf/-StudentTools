import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'

const GPACalculator = lazy(() => import('./pages/GPACalculator'))
const PercentageCalculator = lazy(() => import('./pages/PercentageCalculator'))
const FinalGradeCalculator = lazy(() => import('./pages/FinalGradeCalculator'))
const Home = lazy(() => import('./pages/Home'))
const SitemapPage = lazy(() => import('./pages/SitemapPage'))
const RobotsPage = lazy(() => import('./pages/RobotsPage'))

export default function App() {
  const path = window.location.pathname

  if (path === '/sitemap.xml') {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://student-tools-two.vercel.app/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://student-tools-two.vercel.app/gpa-calculator</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://student-tools-two.vercel.app/percentage-calculator</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://student-tools-two.vercel.app/final-grade-calculator</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`

    document.open('application/xml')
    document.write(xml)
    document.close()
    return null
  }

  if (path === '/robots.txt') {
    const txt = `User-agent: *\nAllow: /\nSitemap: https://student-tools-two.vercel.app/sitemap.xml`
    document.open('text/plain')
    document.write(txt)
    document.close()
    return null
  }

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