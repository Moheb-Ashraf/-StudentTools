export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://student-tools-two.vercel.app/sitemap.xml',
  }
}
