# Changelog

## [2026-08-21 20:50] — Floating Liquid Glass Navbar Capsule Redesign (UISKILL.md)
**Type:** UI | Navbar | Glassmorphism | Layout | Responsive
**Page(s):** All pages (Navbar component)
**Summary:** Redesigned the top navigation bar into a unified floating Liquid Glass capsule (`background: rgba(14, 14, 14, 0.82)`, `backdrop-filter: blur(24px) saturate(190%)`, `border-radius: 100px`, `box-shadow: 0 16px 40px rgba(0,0,0,0.45), inset 0 1px 1px 0 rgba(255,255,255,0.2)`). Fixed underlying page text bleed-through during scrolling, eliminated desktop hamburger duplication (`display: none` on > 900px), and ensured seamless contrast across dark and light sections. Verified 100% hydration and 7/7 UX test passes.
**Keyword(s) targeted:** Liquid Glass Navbar, Glassmorphic Capsule, UI Refinement
**Files touched:** `src/components/Navbar.module.css`, `src/components/Hero.jsx`, `Context.md`, `Changelog.md`
**Audit trigger:** User instruction to ensure navbar has proper glassmorphism without text clashing.

## [2026-08-21 20:38] — Liquid Glass Design System & Fluid Ambient Depth (UISKILL.md)
**Type:** UI | Design System | Glassmorphism | Motion | Tokens | Accessibility
**Page(s):** All pages (`/`, `/about`, `/projects`, `/projects/:slug`, `/blogs`, `/blogs/:slug`)
**Summary:** Transformed the website visual presentation with a premium Liquid Glass aesthetic. Introduced multi-layer backdrop refraction (`backdrop-filter: blur(16px) saturate(180%)`), specular top light bevels (`inset 0 1px 1px 0 rgba(...)`), and GPU-composited ambient fluid liquid orbs (`liquidOrb1`, `liquidOrb2`) with keyframe animation (`liquidFloatSlow`, `liquidFloatFast`). Elevated floating navbar capsule, 3D tilt project cards, focus domain panels, technical comparison tables, TL;DR executive callouts, and author bio cards. Verified 100% hydration, 7/7 UX test passes, zero JS exceptions, and full reduced-motion accessibility.
**Keyword(s) targeted:** Liquid Glass, Glassmorphism, UI Polish, Design Tokens, Web Aesthetics
**Files touched:** `src/index.css`, `src/components/Navbar.module.css`, `src/components/Hero.jsx`, `src/components/Hero.module.css`, `src/components/FeaturedWork.module.css`, `src/components/FocusAreas.module.css`, `src/pages/BlogsPage.module.css`, `src/pages/BlogPostPage.module.css`, `src/pages/ProjectsPage.module.css`, `src/pages/ProjectPage.module.css`, `src/pages/AboutPage.module.css`, `Context.md`, `Changelog.md`
**Audit trigger:** User instruction to apply a Liquid Glass effect across the website.

## [2026-08-21 20:31] — Bidirectional Internal Linking Architecture (SEO.md §11)
**Type:** Internal Linking | Content | IA | SEO | Architecture
**Page(s):** All pages (`/`, `/about`, `/projects`, `/projects/:slug`, `/blogs`, `/blogs/:slug`)
**Summary:** Implemented comprehensive bidirectional internal linking network across all 6 technical case studies, 3 engineering comparison guides, and homepage narrative blocks. Connected case studies to matching architectural blog posts and vice versa; added interactive guide deep-links to `FocusAreas.jsx`; embedded keyword-rich contextual links inside `About.jsx` and `Intro.jsx`; eliminated orphan pages; and ensured crawl depth <= 2 across the entire site. Verified 100% hydration and 0 broken links.
**Keyword(s) targeted:** Internal Linking, Information Architecture, Topic Clusters, Crawl Depth
**Files touched:** `src/data/projects.js`, `src/data/blogs.js`, `src/data/siteContent.js`, `src/pages/ProjectPage.jsx`, `src/pages/ProjectPage.module.css`, `src/pages/BlogPostPage.jsx`, `src/components/About.jsx`, `src/components/Intro.jsx`, `src/components/FocusAreas.jsx`, `Context.md`, `Changelog.md`
**Audit trigger:** User instruction to implement best-level internal linking across the entire website.

## [2026-08-21 20:24] — UI/UX Style Consistency & Motion Choreography (UISKILL.md)
**Type:** UI | Motion | Tokens | Accessibility | Verification
**Page(s):** All routes (`/`, `/about`, `/projects`, `/projects/:slug`, `/blogs`, `/blogs/:slug`)
**Summary:** Executed full design system, micro-interaction, and motion choreography audit in accordance with `UISKILL.md`. Standardized interactive press states (`:active { transform: scale(0.98); }`), implemented custom tinted scrollbars for responsive tables in `index.css`, integrated Framer Motion staggered entrance animations (`staggerChildren: 0.08–0.1`) across `BlogsPage`, `ProjectsPage`, and `AboutPage`, and ensured 100% site-wide navigation parity by adding the Blog link to `Footer.jsx`. Verified 7/7 automated UX tests, 0 JS console exceptions, and instant fallbacks for reduced-motion users.
**Keyword(s) targeted:** UI Consistency, Motion Choreography, Accessibility, Web Performance
**Files touched:** `src/index.css`, `src/components/Footer.jsx`, `src/pages/BlogsPage.jsx`, `src/pages/ProjectsPage.jsx`, `src/pages/AboutPage.jsx`, `Context.md`, `Changelog.md`
**Audit trigger:** User instruction to apply UISKILL.md for website-wide UI style consistency and aesthetic polish.

## [2026-08-21 20:13] — Technical Blog Hub, Trending Comparisons & AEO/GEO Content
**Type:** Content | Technical | Schema | Sitemap | Routing | Audit
**Page(s):** `/blogs`, `/blogs/ssg-vs-ssr-vs-spa-web-rendering-guide`, `/blogs/docker-github-actions-linux-vps-cicd-guide`, `/blogs/mongodb-vs-postgresql-schema-design-guide`
**Summary:** Created dedicated Technical Blog Hub (`/blogs`) and three in-depth comparison/engineering guides matching the website's signature design system. Implemented high-contrast comparison matrices, direct-answer blocks (AEO), TL;DR bullet summaries, and Schema.org `TechArticle`, `BreadcrumbList`, and `FAQPage` graphs. Integrated dynamic SSG prerendering in `routes.jsx`, added Blog navigation link across desktop and mobile menus in `Navbar.jsx`, updated `sitemap.xml` with all 11 canonical routes with fresh `<lastmod>`, and verified 100% hydration with 0 JS exceptions.
**Keyword(s) targeted:** `SSG vs SSR vs SPA`, `Modern Web Architecture 2026`, `Docker GitHub Actions CI/CD Pipeline`, `Linux VPS Deployment 2026`, `MongoDB vs PostgreSQL 2026`, `Document vs Relational Schema Design`
**Files touched:** `src/data/blogs.js`, `src/data/schema.js`, `src/pages/BlogsPage.jsx`, `src/pages/BlogsPage.module.css`, `src/pages/BlogPostPage.jsx`, `src/pages/BlogPostPage.module.css`, `src/routes.jsx`, `src/components/Navbar.jsx`, `public/sitemap.xml`, `Context.md`, `Changelog.md`
**Audit trigger:** User request to create a new blog page with website theme consistency, trending engineering comparison content, and full SEO/AEO/GEO optimization.

## [2026-08-21 20:05] — End-to-End SEO, AEO, GEO & Topical Content Clustering
**Type:** Content | Technical | Schema | Sitemap | Robots | Audit
**Page(s):** `/`, `/about`, `/projects`, `/projects/akids-enterprise`, `/projects/fintrack`, `/projects/meghdoot-motors`, `/projects/shrinath`
**Summary:** Executed full-lifecycle SEO, AEO, GEO, and topical content clustering optimization in strict compliance with RULES.md and SEO.md. Implemented explicit AI-crawler management in `robots.txt` (GPTBot, ClaudeBot, PerplexityBot, etc.), updated `sitemap.xml` with verified `<lastmod>` timestamps, enriched Schema.org JSON-LD graphs (`Person`, `WebSite`, `ProfilePage`, `FAQPage`, `BreadcrumbList`, `SoftwareApplication`), generated universal TL;DR bullet summaries and AEO direct-answer blocks across all routes, structured deep technical case studies with specification tables and engineering highlights, established a 3-pillar topical clustering architecture, and verified 100% hydration and CSP compliance across all 7 routes with 0 JS exceptions.
**Keyword(s) targeted:** `Dhairya Shah Full-Stack Developer`, `DevOps Engineer Ahmedabad`, `MERN & Django Developer`, `Akids Enterprise E-commerce Case Study`, `FinTrack Personal Finance App`, `Meghdoot Motors Service Center Website`, `Shrinath Sales Monitoring System`
**Files touched:** `public/robots.txt`, `public/sitemap.xml`, `src/data/projects.js`, `src/data/schema.js`, `src/pages/AboutPage.jsx`, `src/pages/AboutPage.module.css`, `src/pages/ProjectsPage.jsx`, `src/pages/ProjectsPage.module.css`, `src/pages/ProjectPage.jsx`, `src/pages/ProjectPage.module.css`, `Context.md`, `Changelog.md`
**Audit trigger:** User instruction to execute end-to-end SEO, AEO, and GEO optimization with topical content clustering per RULES.md and SEO.md.

## [2026-08-20 12:32]

### [Category: UI] — Custom Motion, Smooth Scroll, and Animated Hamburger Button
What changed:
- Installed `lenis` and created `src/components/SmoothScroll.jsx` wrapper component. Wrapped the application layout shell to provide inertial smooth-scrolling globally, integrated with pathname/hash changes and disabled when `prefers-reduced-motion` is detected.
- Swapped static Lucide hamburger icons in `Navbar.jsx` with a custom animated SVG component using Framer Motion path morph variants (closed to open) for smooth transitioning bars.
- Enhanced viewport reveals on all homepage sections in `src/components/` (Hero, Intro, FeaturedWork, About, FocusAreas, Experience, Stats, Skills, Cta, Education, Achievements, and Contact) with unique, hardware-composited, staggered entry configurations (like clip paths, rotational skewing, perspective flip-ups, spring scale overshoots, and timeline progressions).
- Updated internal navigation listeners to call `window.lenis.scrollTo(...)` for smooth in-page routing.
Why: Satisfied user requests for a premium, highly responsive scroll experience and interactive hamburger element while maintaining accessibility guidelines.

### [Category: UI] — Awwwards-Grade Motion & Interactive Details
What changed:
- Added interactive cursor-tracking spotlight mesh glows in `Hero.jsx` and `Cta.jsx` using high-performance CSS custom variables.
- Programmed a custom `Counter` count-up stat reveal engine in `Stats.jsx` using Framer Motion's `animate` function.
- Implemented word-by-word staggered mask text typography reveals on Hero and CTA headers.
- Programmed 3D coordinate-tracking card tilt hovers with separate parallax Z-depth layers on `FeaturedWork.jsx` and `FocusAreas.jsx` cards.
- Upgraded full-screen mobile navigation overlay in `Navbar.jsx` with glassmorphic backdrop-blur, staggered links with custom skews, and slowly moving background gradient blobs.
Why: Satisfied user requirements for premium, highly engaging and eye-catching visual effects.

### [Category: UI] — Tech Marquee, Magnetic Buttons, and Reverted Grid Layout
What changed:
- Coded reusable `<Magnetic>` wrapper component using Framer Motion springs to snap targets (Logo, mobile Hamburger button, CTA links, social icons) toward the user's cursor inside a radius.
- Re-architected infinite scrolling text marquee component `<Marquee />` using `translateX(-50%)` scroll translation on the parent track, ensuring mathematically seamless endless loops.
- Reverted desktop horizontal scroll project layouts in `FeaturedWork.jsx` / `FeaturedWork.module.css` back to a clean vertical grid container, maintaining cards' 3D coordinate-tracking tilt hovers.
Why: Satisfied user request to simplify scroll hijacking while optimizing outline ticker animations.

## [2026-08-18 21:22]

### [Category: SEO] — Added Google Analytics (gtag.js) Tag to All Pages
What changed: Pasted the Google Analytics tag script (gtag.js) in `index.html` and `public/404.html`. Updated the Content-Security-Policy (CSP) in `vercel.json` and `scripts/serve-verify.mjs` to permit Google Analytics scripts, network connections (connect-src), and tracking pixels (img-src).
Why: User requested tracking integration across all pages while keeping the project's strict security settings intact.

## [2026-08-17 23:30]

### [Category: Security] — Critical CSP fix: externalized SSG inline scripts
What changed: vite-react-ssg injects two INLINE scripts per prerendered page (`window.__staticRouterHydrationData`, `window.__VITE_REACT_SSG_HASH__`). The enforced CSP (`script-src 'self'`) silently blocked them, which killed router hydration on every page (page rendered frozen server HTML, counter stuck at 0%, no errors thrown). Added `scripts/externalize-ssg-scripts.mjs` — a post-build transform that moves those inline scripts into content-hashed external files under `/assets/` (allowed by `script-src 'self'`) — and wired it into the `build` script. Verified with a production-equivalent server (CSP enforced): all 7 routes hydrate, preloader removed, h1 visible, 0 JS exceptions.
Why: The task required proving CSP does not break hydration before production; the existing CSP would have broken the deployed site silently.

### [Category: SEO] — Fixed duplicate/conflicting metadata in prerendered HTML
What changed: The index.html template carried default title/description/canonical/OG/twitter tags, and vite-react-ssg appends per-route Head output after `<head>` — producing TWO titles, TWO meta descriptions, and TWO canonicals with different URLs (e.g. `/` vs `/about`) on every page. Removed the defaults from index.html (per-route Seo injects them for all 7 routes). Now every page has exactly one title, one description, one canonical — all per-route and unique (verified 7/7 unique titles, 7/7 unique descriptions, 1 h1 per page).
Why: Conflicting duplicate canonicals are an SEO correctness bug; unique metadata per page is a hard requirement of the SEO task.

### [Category: UX] — Contact form made truthful (§25)
What changed: The simulated contact form previously showed "Thank you! Your message has been sent successfully." although nothing is delivered. On submit it now shows a truthful panel ("This demo form doesn't send messages from the site yet…") with a prefilled mailto link (`mailto:shah.dhairya.p13@gmail.com?subject=…&body=…` containing the visitor's name/email/message) so visitors can still reach Dhairya from their own email client. No delivery backend was added (out of scope); the wording is now honest. Added `scripts/verify-contact.mjs` and verified in a real browser: panel appears, no false "sent" claim, mailto prefills correctly, no JS exceptions.
Why: Task §25 requires the UI to not falsely claim message delivery.

### [Category: Dev] — Pre-deploy verification harness
What changed: Added `scripts/serve-verify.mjs` — a local static server that serves `dist/` with the exact vercel.json security headers (CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options, restricted CORS, cache headers) and Vercel-like behavior (`.html` extension resolution, real 404 via dist/404.html). Used to verify CSP compatibility, headers, 404 status, caching, and all routes before deploy.
Why: Production headers can only be verified against the deployed site, but this harness catches CSP/header integration issues locally first (it found the two critical bugs above).

## [2026-08-17 23:10]

### [Category: Dev] — SSG Conversion + Multi-Page Architecture
What changed: Converted the app from a single-page CSR-only SPA to a prerendered multi-page site. Added `react-router-dom@6.30.4` and `vite-react-ssg@0.8.9` (Vite 5/React 18 compatible; the latest 0.9.x requires Vite 6+ and was rejected to avoid a build-tool upgrade). Rewrote `src/main.jsx` as the SSG entry, added `src/routes.jsx` (homepage, /about, /projects, dynamic `/projects/:slug` with getStaticPaths, client-side 404), converted `src/App.jsx` to the layout shell (MotionConfig reducedMotion + Preloader + Navbar + Outlet + Footer), and created `src/pages/` (HomePage, AboutPage, ProjectsPage, ProjectPage, NotFoundPage). Moved the resume to `public/resume/dhairya-shah-resume.pdf` and added a stable portrait at `public/images/dhairya-shah.jpg`.
Why: The approved plan (D3/D4) requires crawlable static HTML per route and real /about + /projects URLs without a large-framework migration.
Bug fixed: project detail pages rendered empty — static route paths have no `:param`, so `useParams()` returned {}; switched to a dynamic `projects/:slug` route with getStaticPaths.

### [Category: Dev] — Shared Data Layer (DRY)
What changed: Created `src/data/projects.js`, `src/data/person.js`, `src/data/siteContent.js`, `src/data/schema.js`, `src/data/projectImages.js`. Refactored FeaturedWork, Skills, Education, Experience, Achievements, Stats, and FocusAreas to consume shared data instead of inline arrays.
Why: Homepage sections and the new About/Projects pages must share one source of truth for facts and layout data.

### [Category: Dev] — Route-Aware Navigation
What changed: Navbar now uses react-router Links (/about, /projects) plus a cross-page section-scroll helper (`navigate('/#skills')`); mobile menu closes on route change, Escape closes it, focus moves to the close button on open, and `aria-expanded`/`aria-controls` were added. Footer updated to route links + resume download.
Why: Multi-page navigation requires working cross-page deep links while preserving the original scroll UX.

### [Category: UI] — New Pages & Identity Statement
What changed: Added AboutPage (entity page with "Who is Dhairya Shah?" answer, professional focus, skills, experience, education, certifications incl. AI-900 framed as AI/ML fundamentals only, achievements, FAQ, resume CTA), ProjectsPage (6-project index), ProjectPage (breadcrumb, overview, role, stack, related projects) for the 4 depth-gated projects, and NotFoundPage. Added the homepage identity statement to Intro.jsx. All new pages use the existing design tokens and responsive breakpoints.
Why: Content architecture per the approved plan — quality over page count (Aarisha and HRMS intentionally have no detail pages due to thin first-party content).

### [Category: SEO] — Entity Metadata & Structured Data
What changed: Person, WebSite, ProfilePage JSON-LD on homepage and /about; FAQPage on /about; BreadcrumbList on projects + project pages; CreativeWork on project pages with a real URL. Seo component provides per-route title/description/canonical/OG/Twitter. index.html now has canonical, og:*, twitter:* defaults, and the real favicon. Canonical host everywhere: https://www.aboutdhairya.me.
Why: The core objective is to make aboutdhairya.me the authoritative first-party entity for Dhairya Shah, with truthful, minimal structured data only.

### [Category: SEO] — Crawlability Assets
What changed: Added `public/robots.txt` (allow-all + sitemap), `public/sitemap.xml` (7 canonical URLs, no lastmod), `public/404.html` (branded server 404, noindex), `public/favicon.svg`, `public/og-image.png` (1200×630), and the stable resume URL.
Why: Crawlability/indexability per plan sections 19-20; lastmod omitted because content-modification dates aren't reliably tracked.

### [Category: SEO] — Security Headers & Edge Caching (vercel.json)
What changed: Added vercel.json with CSP (Report-Only-first policy, `unsafe-inline` for styles only because Framer Motion sets inline styles), HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options; immutable caching for /assets/*; short TTL for robots/sitemap; daily TTL for og-image/resume; CORS restricted to the canonical origin (best-effort override of the observed Access-Control-Allow-Origin: * — if it persists post-deploy it is a dashboard header rule). No rateLimit property: per the approved plan, rate limiting is a Vercel Firewall dashboard rule (schema not verifiable from this environment) and is a REQUIRED manual pre-production step.
Why: Defense-in-depth availability protection (P0) plus baseline security hygiene without breaking the app.

### [Category: UI] — Accessibility & Performance
What changed: Global :focus-visible styles; prefers-reduced-motion media query; MotionConfig reducedMotion="user"; Preloader skipped for reduced-motion users post-hydration; hero portrait fetchpriority=high; width/height + lazy loading on images; scroll-margin-top for anchor targets.
Why: Accessibility (RULES/UISKILL) and Core Web Vitals considerations.
Bug fixed: Preloader's useReducedMotion early-return caused a React hydration mismatch on reduced-motion clients (server rendered the preloader, client returned null) — the skip now applies only after hydration via a mounted flag.

### [Category: Dev] — Image Optimization
What changed: Added `scripts/optimize-images.mjs` (sharp, per-image resize + quality) and ran it — src/assets went from 12.66 MB to 0.49 MB with filenames preserved (drop-in replacement workflow intact). Added `scripts/generate-og-image.mjs` and ran it (public/og-image.png).
Why: LCP/bandwidth/crawler-weight reduction per plan section 16.

### [Category: Audit] — Verification
What changed: Added `scripts/verify-render.mjs` (real-browser hydration + console-exception checks per route) and `scripts/verify-ux.mjs` (SPA nav, client 404, mobile menu open/Escape-close, desktop+mobile overflow, cross-page hash nav). Ran build + preview + curl no-JS content checks on all routes; validated 15/15 JSON-LD blocks; verified unique titles/descriptions, single H1 per page, and all internal links resolve (200).
Why: Acceptance criteria in implementationplan.md (crawler simulation, routing verification, second audit).

## [2026-08-17 17:35]

### [Category: Dev] — Plan v2 Approved; 7 Final Changes Applied (implementation begins next)
What changed: Owner approved the plan in principle and issued 7 final changes, all applied to `implementationplan.md`: (1) rate limiting stays baseline-derived with no "safe" number claim; (2) Bot Management rolls out in LOG mode before Challenge/Deny; (3) curl is only generic HTTP verification — actual Google/Bing crawling verified via Search Console/Bing live inspection; (4) AI-crawler policy is configurable per owner policy, never unconditional allow, and no crawler gets a rate-limit bypass; (5) Person.knowsAbout is a concise set of demonstrated professional areas, not a full skill dump; (6) "cloud deployment" kept only after evidence check (resume states "hands-on cloud deployment experience"), with "deployment" as fallback; (7) CSP is secondary and must never block or break the core implementation.
Why: Final gate before implementation per the owner's approval conditions (RULES.md §2).

## [2026-08-17 17:20]

### [Category: Dev] — Plan v2 Finalized: Baseline-Derived Rate Limit (no code changed)
What changed: Per owner's final change, removed the hard-coded 300 requests/60s "starting point" from `implementationplan.md`. The domain-wide Firewall rate-limit threshold is now derived from an observed traffic baseline (Firewall logs/Analytics after first deploy) plus expected legitimate crawler volume for a ~10-page static site, with the rationale documented in the final report; added DDoS protection to the protection model (Bot Management + Firewall rate limiting + edge caching + DDoS protection + monitoring); explicitly noted the threshold alone does not prevent distributed crawling; added a plan-level check to verify domain-wide rate-limiting availability on the owner's specific Vercel plan before any final number is specified.
Why: The owner requires that no rate-limit value be presented as inherently safe and that thresholds follow observed traffic rather than assumptions.

## [2026-08-17 17:05]

### [Category: Dev] — Implementation Plan Revised to v2 (no code changed)
What changed: Revised `implementationplan.md` to v2 incorporating the owner's 36-point review: 5-layer bot protection (Firewall rate limiting + Bot Management + CDN caching + /api policy + monitoring), removed the "300 req/min is safe" assumption, added a project-depth gate before creating /projects/[slug] pages, made FAQPage and project schema optional/evidence-gated, added Person field review (name/alternateName/address/knowsAbout), CSP Report-Only-first testing protocol, ACAO source investigation, preloader/LCP measurement requirement, no-JS crawler simulation acceptance, brand-SERP baseline, and promoted Vercel Firewall/Bot Management to REQUIRED manual pre-production steps.
Why: Owner approved the overall strategy but required these corrections before any implementation (plan-approval gate, RULES.md §2).

## [2026-08-17 16:40]

### [Category: Dev] — SEO/GEO/AEO Implementation Plan Created (no code changed)
What changed: Per RULES.md §2, audited the codebase (Vite + React 18 SPA, Vercel hosting, CSR-only, no robots/sitemap/JSON-LD/rate limiting, ~13 MB of images) and the resume, resolved four architectural decisions with the owner (canonical host = www.aboutdhairya.me; fact-based positioning as Full-Stack Developer & DevOps Engineer; hybrid /about + /projects pages; build-time prerendering), and wrote the full implementation plan to `implementationplan.md`.
Why: The owner requested a complete production SEO/GEO/AEO implementation with a plan-approval gate before any code is written.
Known limitation: Contact form is client-side simulated (no backend) — out of scope, disclosed in the plan.

## [2026-08-16 13:17]

### [Category: Dev] — Project Features & Interactivity Implementation
- **What changed:**
  - Created `Preloader.jsx` and `Preloader.module.css` to display a solid white viewport screen, count from 0% to 100%, and slide off the screen vertically using a custom ease curve, revealing the home page.
  - Integrated the `Preloader` at the top level of `App.jsx`.
  - Modified `FeaturedWork.jsx` to import and render project images (`project1.jpg` through `project6.jpg`), and reworked the cards to display a blurred liquid glass overlay (`backdrop-filter: blur(12px)`) on hover containing separate **GitHub** and **Live Site** buttons (or a **Code Private** lock badge if unavailable). Both buttons open in new tabs.
  - Modified `FocusAreas.jsx` to import and render core focus images (`focus1.jpg` through `focus4.jpg`) instead of temporary inline SVGs, and updated its CSS Module for high-contrast grayscale renders.
  - Modified `Education.jsx` and `Achievements.jsx` to use the exact Google Drive share links for credentials and awards, configuring them with `target="_blank"` and security attributes to open in new tabs.
  - Created build-stable fallback placeholders for all project and focus images to prevent Vite compile blocks.
  - Verified a successful production build (`npm run build`).
- **Why:** To fulfill user requirements for page load reveal animations, image displays, project card hover blurs with separate source/live links, and working credential anchors.
