# Project Context — Dhairya Shah Portfolio

## Brand
- **Name:** Dhairya Shah
- **Alternate Name:** Dhairya Pinal Shah
- **Title / Offering:** Full-Stack Developer & DevOps Engineer
- **Audience:** Engineering leaders, tech recruiters, founders, client organizations seeking full-stack & DevOps development
- **Tone:** Technical, authoritative, factual, editorial, concise

## Project Profile
- **Primary Type:** `portfolio / personal brand`
- **Secondary Type:** `full-stack & DevOps engineering consultancy / content & engineering guides`
- **Local Profile:** `Yes` (Ahmedabad, Gujarat, India entity footprint)
- **International Profile:** `No` (Single primary English locale `en-IN` / `en-US`)
- **Page-Type → Template Map:**
  - `/` (Home): Template F (Conversion/Identity Landing) + Overview of Topic Clusters + In-Body Narrative Links
  - `/about`: Template A/F (Hybrid Entity Profile + Authority Narrative + AEO FAQ + Deep Portfolio Links)
  - `/projects`: Template B/F (Portfolio Index & Project Hub)
  - `/projects/:slug`: Template B/Case Study (Depth-gated Technical Case Studies with Specifications, Direct Answers, and Architecture Details + Bidirectional Blog Links)
  - `/blogs`: Template A/F (Technical Blog Hub & Publications Index)
  - `/blogs/:slug`: Template A/E (Deep-Dive Technical Guides & Comprehensive Comparison Matrices + Bidirectional Case Study Links)

## UI/Motion Architecture (UISKILL.md §12)
- **Motion Budget Classification:** High Brand/Marketing Portfolio with restrained, functional micro-interactions.
- **Component Foundation:** Custom Vanilla CSS Modules + Motion (`motion/react`) + Lenis Smooth Scroll + Lucide React.
- **Color Tokens:** Rich Off-Black (`--bg-dark: #0A0A0A`), Warm Off-White (`--bg-light: #F5F4F1`), Accent Red (`--accent-red: #EF4444`), Border Grays (`#242424` dark / `#E4E2DD` light).
- **Liquid Glass Tokens:**
  - Dark Surface: `rgba(15, 15, 15, 0.72)` + `backdrop-filter: blur(16px) saturate(180%) contrast(105%)` + `border: 1px solid rgba(255, 255, 255, 0.12)` + `inset 0 1px 1px 0 rgba(255, 255, 255, 0.18)` + `0 16px 40px rgba(0, 0, 0, 0.45)` shadow.
  - Light Surface: `rgba(255, 255, 255, 0.78)` + `backdrop-filter: blur(16px) saturate(180%)` + `border: 1px solid rgba(255, 255, 255, 0.85)` + `inset 0 1px 1px 0 rgba(255, 255, 255, 0.95)` + `0 12px 32px rgba(0, 0, 0, 0.05)` shadow.
  - Ambient Depth: Floating fluid liquid orbs (`liquidOrb1`, `liquidOrb2`) with keyframe animation (`liquidFloatSlow`, `liquidFloatFast`) refracting behind glass panels.
- **Typography Tokens:** Display Headings (`Inter Tight`, 800 weight, -0.04em tracking), Body (`Inter`, 400 weight, -0.01em), Numerals (`ui-monospace`, 700 weight).
- **Motion Tokens:**
  - `--duration-instant: 100ms`, `--duration-fast: 150ms`, `--duration-base: 250ms`, `--duration-slow: 400ms`, `--duration-page: 600ms`.
  - `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)`, `--ease-decelerate: cubic-bezier(0, 0, 0.2, 1)`.
- **Accessibility & Reduced Motion:** Global `<MotionConfig reducedMotion="user">` wraps the application root. CSS transitions and ambient liquid orbs collapse to 0.01ms static glassmorphism on `prefers-reduced-motion: reduce`.
- **Micro-Interactions:** 3D hover transforms with spring interpolation on featured work cards, spring scale press feedback (`:active { transform: scale(0.98); }`), customized red scrollbars on data tables, magnetic hover effect on logo and social links.

## Keyword Baseline
- `Dhairya Shah Full-Stack Developer`: rank baseline established, intent `navigational / commercial`, locale `en-IN`, last checked `2026-08-21`
- `DevOps Engineer Ahmedabad`: rank baseline established, intent `commercial / local`, locale `en-IN`, last checked `2026-08-21`
- `MERN & Django Developer`: rank baseline established, intent `commercial`, locale `en-IN`, last checked `2026-08-21`
- `SSG vs SSR vs SPA`: rank baseline established, intent `informational / commercial`, locale `en-IN`, last checked `2026-08-21`
- `Modern Web Architecture 2026`: rank baseline established, intent `informational`, locale `en-IN`, last checked `2026-08-21`
- `Docker GitHub Actions CI/CD Pipeline`: rank baseline established, intent `informational / commercial`, locale `en-IN`, last checked `2026-08-21`
- `MongoDB vs PostgreSQL 2026`: rank baseline established, intent `informational / commercial`, locale `en-IN`, last checked `2026-08-21`
- `Akids Enterprise E-commerce Case Study`: rank baseline established, intent `informational / commercial`, locale `en-IN`, last checked `2026-08-21`
- `FinTrack Personal Finance App`: rank baseline established, intent `informational / commercial`, locale `en-IN`, last checked `2026-08-21`
- `Meghdoot Motors Service Center Website`: rank baseline established, intent `commercial / local`, locale `en-IN`, last checked `2026-08-21`
- `Shrinath Sales Monitoring System`: rank baseline established, intent `commercial`, locale `en-IN`, last checked `2026-08-21`

## Site Structure
- `/` — Homepage / Entity Landing: Identity statement, featured projects, focus areas, timeline, stats, skills, contact.
- `/about` — Authority & Entity Profile: Executive TL;DR, AEO direct answer, focus domains, skills, experience, education, certifications, achievements, FAQ loops.
- `/projects` — Project Catalog & Portfolio Index: Executive TL;DR, cluster badges, 6 shipped products overview.
- `/projects/akids-enterprise` — Technical Case Study: MERN e-commerce architecture, product catalog, cart/checkout specs, highlights, cross-linked to MongoDB & SSG guides.
- `/projects/fintrack` — Technical Case Study: Multi-platform React + Kotlin architecture, financial ledger sync, report generation, cross-linked to MongoDB & SSG guides.
- `/projects/meghdoot-motors` — Technical Case Study: Maruti Suzuki authorized portal, Netlify edge deployment, mobile optimization, cross-linked to SSG & Docker guides.
- `/projects/shrinath` — Technical Case Study: Small-business sales tracking dashboard, transactional ledger, analytics summaries, cross-linked to Docker & MongoDB guides.
- `/blogs` — Technical Blog Hub: Publications index, trending architectural comparisons, DevOps walkthroughs, and database guides.
- `/blogs/ssg-vs-ssr-vs-spa-web-rendering-guide` — Technical Comparison Guide: Full comparison matrix, benchmarks, decision rubric, AEO direct answers, cross-linked to Meghdoot Motors & Akids Enterprise case studies.
- `/blogs/docker-github-actions-linux-vps-cicd-guide` — DevOps Deep Dive: Multi-stage Docker builds, GitHub Actions pipeline, zero-downtime Nginx reload, cross-linked to Akids Enterprise & Shrinath case studies.
- `/blogs/mongodb-vs-postgresql-schema-design-guide` — Database Architecture Guide: Document vs relational models, JSONB hybrid, ACID transactions, cross-linked to Akids Enterprise & FinTrack case studies.
- `public/404.html` & `/404` — Branded 404 error page.

## Topic Clusters & Internal Linking Network (SEO.md §11)

### Pillar 1: Full-Stack Web Application Engineering & Rendering
- **Core Hub:** Homepage (`/`), About (`/about`), Projects (`/projects`), Blog Hub (`/blogs`)
- **Interlinked Nodes:**
  - `/blogs/ssg-vs-ssr-vs-spa-web-rendering-guide` <───► `/projects/meghdoot-motors` & `/projects/akids-enterprise`
  - Homepage Narrative Copy & Focus Areas (01 Full-Stack Development) ───► `/blogs/ssg-vs-ssr-vs-spa-web-rendering-guide` & `/projects`

### Pillar 2: DevOps, Containerization & Cloud Infrastructure
- **Core Hub:** Homepage (`/#focus`), About (`/about#experience`), Blog Hub (`/blogs`)
- **Interlinked Nodes:**
  - `/blogs/docker-github-actions-linux-vps-cicd-guide` <───► `/projects/akids-enterprise` & `/projects/shrinath`
  - Homepage Narrative Copy & Focus Areas (02 Cloud & DevOps) ───► `/blogs/docker-github-actions-linux-vps-cicd-guide`

### Pillar 3: Database Design & Systems Architecture
- **Core Hub:** Homepage (`/#skills`), Case Studies, Blog Hub (`/blogs`)
- **Interlinked Nodes:**
  - `/blogs/mongodb-vs-postgresql-schema-design-guide` <───► `/projects/akids-enterprise` & `/projects/fintrack`
  - Homepage Narrative Copy & Focus Areas (04 Database Design) ───► `/blogs/mongodb-vs-postgresql-schema-design-guide`

## Open Audit Findings
- [x] Full Technical Blog Hub (`/blogs`) and 3 deep-dive comparison guides implemented.
- [x] `sitemap.xml` updated with all 11 canonical routes and fresh `<lastmod>2026-08-21</lastmod>`.
- [x] Schema.org `TechArticle`, `BreadcrumbList`, and `FAQPage` schemas injected across blog posts.
- [x] 100% hydration and strict Content-Security-Policy compliance verified across all routes with 0 JS errors.
- [x] Comprehensive bidirectional internal linking architecture implemented per SEO.md Section 11.

## Entity Profile
- **Canonical Name:** Dhairya Shah
- **Alternate Name:** Dhairya Pinal Shah
- **Canonical Website:** `https://www.aboutdhairya.me/`
- **Verified SameAs Profiles:**
  - GitHub: `https://github.com/dhairya-shah13`
  - LinkedIn: `https://www.linkedin.com/in/dhairya-shah13`
- **Academic Alumni:** Charotar University of Science and Technology (CHARUSAT) — B.Tech IT

## Backlink Profile
- **Target Strategy:** Technical comparison citations, developer communities, open-source repositories, technical blogging networks.
- **Toxic Link Watchlist:** Clean (0 toxic links detected).

## Local Profile
- **Canonical NAP:** Dhairya Shah, Ahmedabad, Gujarat, India, Phone: +91 99243 43003, Email: shah.dhairya.p13@gmail.com
- **Local Business Signal:** Localized software development and DevOps engineering services in Ahmedabad, Gujarat.

## Content Decay Watchlist
- All pages fresh and updated as of `2026-08-21`.

## AI Citation Log
- Tracked queries: *"SSG vs SSR vs SPA in 2026"*, *"Docker GitHub Actions Linux VPS CI/CD"*, *"MongoDB vs PostgreSQL for web apps"*, *"Who is Dhairya Shah?"*.
