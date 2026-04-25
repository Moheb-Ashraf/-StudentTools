import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function SEOMeta({
  title,
  description,
  canonical,
  keywords,
  ogTitle,
  ogDescription,
  schemaData,
}) {
  const fullTitle = `${title} | StudentTools`
  return (
    <Helmet>
      <html lang="ar-EG" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={`https://studenttools.app${canonical}`} />}

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={`https://studenttools.app${canonical}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://studenttools.app/og-image.jpg" />
      <meta property="og:locale" content="ar_EG" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  )
}
