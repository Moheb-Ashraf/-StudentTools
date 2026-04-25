# 🎓 StudentTools — Academic Tools Website

**SEO-optimized student tools: GPA Calculator, Percentage Calculator, Final Grade Calculator**

> Target keywords: GPA Calculator, احسب GPA, حاسبة المعدل التراكمي, GPA calculator Egypt, حاسبة النسبة المئوية

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 📁 Project Structure

```
student-tools/
├── public/
│   ├── favicon.svg          # SVG favicon
│   ├── robots.txt           # SEO: allow all, point to sitemap
│   └── sitemap.xml          # SEO: all pages with hreflang
├── src/
│   ├── components/
│   │   ├── AdBanner.jsx     # Google AdSense placeholder
│   │   ├── FAQ.jsx          # Accordion FAQ (used for FAQ schema)
│   │   ├── Footer.jsx       # Internal links + Arabic keywords
│   │   ├── Navbar.jsx       # Responsive nav with mobile menu
│   │   ├── PageLoader.jsx   # Lazy load suspense fallback
│   │   ├── SEOMeta.jsx      # Per-page meta/OG/schema via react-helmet
│   │   └── ToolCard.jsx     # Card linking to other tools
│   ├── pages/
│   │   ├── Home.jsx                  # /
│   │   ├── GPACalculator.jsx         # /gpa-calculator
│   │   ├── PercentageCalculator.jsx  # /percentage-calculator
│   │   └── FinalGradeCalculator.jsx  # /final-grade-calculator
│   ├── App.jsx              # Routes with lazy loading
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind + custom design system
├── index.html               # Base HTML with fonts & OG defaults
├── vite.config.js           # Code splitting config
├── tailwind.config.js       # Custom colors, fonts, animations
├── vercel.json              # SPA rewrites + caching headers
└── package.json
```

---

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard
1. Push to GitHub
2. Go to vercel.com → New Project
3. Import repo → Framework: Vite → Deploy

The `vercel.json` handles SPA routing automatically.

---

## 💰 Enable Google AdSense

1. Sign up at [adsense.google.com](https://adsense.google.com)
2. Get your publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`)
3. In `index.html`, uncomment and update the AdSense script:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
4. In each `AdBanner.jsx`, uncomment the `<ins>` tag and add your slot IDs

---

## 🔍 SEO Checklist

### Per-page SEO (already done ✅)
- [x] Unique `<title>` and `<meta description>` (150-160 chars)
- [x] Open Graph tags (og:title, og:description, og:url, og:image)
- [x] Canonical URLs
- [x] Keywords meta tag (both Arabic + English)
- [x] H1 with primary keyword per page
- [x] H2/H3 with secondary keywords
- [x] FAQ section per page
- [x] FAQ JSON-LD structured data
- [x] Internal linking between all pages
- [x] robots.txt
- [x] sitemap.xml with hreflang (ar + en)
- [x] Organization JSON-LD schema in base HTML
- [x] ItemList schema on homepage
- [x] Arabic keywords in footer

### After deploy (you need to do):
- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- [ ] Create `og-image.jpg` (1200×630px) in `/public/`
- [ ] Add real AdSense publisher ID
- [ ] Set up Google Analytics 4
- [ ] Update `canonical` URLs with your real domain

---

## 🎯 Target Keywords

| Page | English Keywords | Arabic Keywords |
|------|-----------------|-----------------|
| / | student tools, academic tools | أدوات الطلاب |
| /gpa-calculator | GPA calculator, cumulative GPA | حاسبة المعدل التراكمي, احسب GPA |
| /percentage-calculator | percentage calculator, score percentage | حاسبة النسبة المئوية |
| /final-grade-calculator | final grade calculator, what grade do I need | حاسبة الدرجة النهائية |

---

## ⚡ Performance

- Code splitting: each page is a separate chunk (lazy loaded)
- Vendor chunk separated (react, react-dom, react-router-dom)
- CSS: Tailwind purges unused styles
- Fonts: loaded via Google Fonts CDN (preconnect)
- Images: no heavy images (SVG icons only)
- Lighthouse target: 90+ on all metrics

---

## 🛠️ Customization

### Change colors
Edit `tailwind.config.js` → `theme.extend.colors.ink`

### Add a new tool page
1. Create `src/pages/NewTool.jsx`
2. Add route in `src/App.jsx`
3. Add nav link in `src/components/Navbar.jsx`
4. Add to sitemap.xml
5. Add ToolCard links in other pages

### Update domain
Search and replace `studenttools.app` with your real domain across:
- `index.html`
- `src/components/SEOMeta.jsx`
- `public/sitemap.xml`
- All page files (canonical URLs)
