# Context

Dhairya Shah Portfolio website project.

## System Architecture
- **Framework:** React + Vite 5 (single-page app converted to **prerendered multi-page** via `vite-react-ssg` + `react-router-dom`)
- **Rendering:** Build-time static HTML per route (SSG), SPA hydration on the client. Every route ships meaningful content in the initial HTML — no JS required for crawlability.
- **Routing:** `/` (homepage, primary entity landing), `/about`, `/projects`, `/projects/[slug]` (4 depth-gated projects: akids-enterprise, meghdoot-motors, fintrack, shrinath). Client-side `*` → NotFoundPage; server 404s → `public/404.html`.
- **Styling:** Vanilla CSS & CSS Modules (no CSS frameworks, CSS custom variables for tokens)
- **Animations:** Framer Motion (`motion/react`) wrapped in `<MotionConfig reducedMotion="user">`; Preloader skipped for reduced-motion users (post-hydration) and removed on completion
- **Icons:** Lucide React
- **Hosting:** Vercel — `https://aboutdhairya.me` → 308 → `https://www.aboutdhairya.me` (canonical host)
- **Meta/head:** `Seo` component (title/description/canonical/OG/Twitter per route) via vite-react-ssg `<Head>`; JSON-LD via `JsonLd` component

## Folder and File Structure
- `index.html` — Entry HTML: favicon, canonical, OG defaults, Google Fonts
- `package.json` — scripts: `dev` (vite CSR), `build` (vite-react-ssg build), `preview`, `generate:og`, `optimize:images`
- `vercel.json` — Security headers (CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy, frame protection), edge caching (immutable `/assets/*`, robots/sitemap, og-image/resume), CORS restricted to canonical origin. **No `rateLimit` property** — rate limiting is a Vercel Firewall dashboard rule (see final report; REQUIRED manual pre-production step).
- `Context.md`, `Changelog.md` — shared operating docs (this file)
- `implementationplan.md` — Approved SEO/GEO/AEO implementation plan (v2, with the final baseline-derived rate-limit revision)
- `public/` — Static files: `robots.txt`, `sitemap.xml` (7 canonical URLs, no lastmod), `404.html`, `favicon.svg`, `og-image.png` (1200×630), `images/dhairya-shah.jpg` (stable portrait URL), `resume/dhairya-shah-resume.pdf` (moved from repo root)  - `scripts/` — `generate-og-image.mjs`, `optimize-images.mjs`, `externalize-ssg-scripts.mjs` (post-build: moves SSG inline hydration scripts to content-hashed /assets/ files so the strict CSP doesn't block them), `serve-verify.mjs` (local production-equivalent server with vercel.json headers + real 404 for pre-deploy verification), `verify-render.mjs` (real-browser hydration/console check), `verify-ux.mjs` (nav/menu/404/overflow/hash-nav checks), `verify-contact.mjs` (contact form truthfulness)
- `src/`
  - `main.jsx` — SSG entry (`ViteReactSSG({ routes })`)
  - `routes.jsx` — Route tree (dynamic `projects/:slug` with `getStaticPaths`)
  - `App.jsx` — Layout shell (MotionConfig > Preloader + Navbar + main/Outlet + Footer)
  - `index.css` — Global styles + design tokens; `:focus-visible`, `prefers-reduced-motion` media query, `scroll-margin-top` for anchors
  - `data/` — Single source of truth: `person.js` (entity), `projects.js` (6 projects, `detail` flag), `siteContent.js` (skills/education/experience/certs/achievements/focus/stats), `schema.js` (JSON-LD builders), `projectImages.js`
  - `pages/` — `HomePage.jsx`, `AboutPage.jsx` (+CSS), `ProjectsPage.jsx` (+CSS), `ProjectPage.jsx` (+CSS), `NotFoundPage.jsx` (+CSS)
  - `components/` — Seo, JsonLd (new); Preloader, Navbar (route-aware, Escape + focus), Footer (route-aware + resume), Intro (homepage identity statement), FeaturedWork (data-driven + case-study links), Skills/Education/Experience/Achievements/Stats/FocusAreas (shared data), Hero (fetchpriority), Contact, Cta
  - `assets/` — Optimized images (~0.5 MB total, down from ~13 MB)

## Feature List
- [x] All original homepage features preserved (preloader, sticky nav, hero collage, hover glass overlays, interactive focus areas, timeline, stats, skills, education/certs, achievements, contact form)
- [x] Prerendered static HTML for every route (no-JS crawlable)
- [x] `/about` entity page: who-is answer, professional focus, skills, experience, education, certifications, achievements, FAQ, resume download
- [x] `/projects` index + 4 depth-gated project detail pages (breadcrumbs, roles, stack, links, related projects)
- [x] Person / WebSite / ProfilePage / FAQPage / BreadcrumbList / CreativeWork JSON-LD (all fact-based)
- [x] Per-route unique titles, descriptions, canonicals, OpenGraph, Twitter cards
- [x] robots.txt, sitemap.xml, branded 404, real favicon, og:image
- [x] Security headers (CSP etc.) + edge caching via vercel.json; CSP verified compatible with hydration (externalized SSG inline scripts, scripts/serve-verify.mjs)
- [x] Accessibility: focus-visible styles, reduced-motion support, Escape-to-close menu, focus management, single H1 per page, descriptive alt text, width/height + lazy loading on images

## Conventions
- Use CSS Variables declared in `:root` of `src/index.css` for color, spacing, duration, and ease tokens.
- New pages follow the existing design system (section-dark/section-light rhythm, container, eyebrow/title patterns, red accent).
- All project/entity facts come from `src/data/*` — sourced from `Dhairya Resume.pdf` and the original site. No fabricated claims.
- Write semantic HTML5 layout tags (`header`, `main`, `section`, `footer`).
- Set motion speeds based on `UISKILL.md` standards (100ms-600ms transitions, easing curves).

## SEO
- **Canonical host:** `https://www.aboutdhairya.me/` (apex 308-redirects to www; all canonicals, sitemap, OG, JSON-LD use it).
- **Positioning (fact-based):** "Dhairya Shah | Full-Stack Developer & DevOps Engineer". Azure AI-900 certification is presented as AI/ML fundamentals only — **no** AI/ML engineering, research, IEEE, or USC claims (not supported by the resume/site).
- **Entity:** Person JSON-LD on homepage + /about (name Dhairya Shah, alternateName Dhairya Pinal Shah, sameAs = GitHub + LinkedIn only, city/region address, concise knowsAbout).
- **Structured data:** Person, WebSite, ProfilePage (homepage + about), FAQPage (about), BreadcrumbList (projects + project pages), CreativeWork (project pages with a real URL). No empty/speculative fields.
- **Sitemap:** static `public/sitemap.xml` (7 URLs, `lastmod` omitted intentionally — no reliable content-modification tracking).
- **robots.txt:** allow-all crawl guidance + sitemap reference; not a security mechanism.
- **Bot protection (defense-in-depth, P0):** Vercel Firewall rate-limit rule (baseline-derived threshold — REQUIRED manual dashboard step), Bot Management in LOG mode first, edge caching, /api stricter-limit policy, monitoring. IP-based limits alone are NOT considered sufficient against distributed crawlers. `vercel.json` intentionally contains no `rateLimit` property (schema not verified from this environment; Firewall is the primary layer).
- **AEO/GEO:** identity statement on homepage; "Who is Dhairya Shah?" answer + FAQ on /about; factual project descriptions; answers distributed naturally across pages (no FAQ walls).
- **Images:** per-image optimization (12.66 MB → 0.49 MB), descriptive alt, width/height, lazy loading below the fold, fetchpriority on the hero portrait.

## UI/Motion
- Chosen foundation: React, Vite, CSS, Framer Motion (`motion/react`).
- Colors: Off-white (`#F5F4F1`) and dark (`#0A0A0A`) section background alternating rhythm.
- Red accent (`#EF4444`) used carefully for interactive highlights and highlights.
- Motion budget: Interactive marketing site. High polish, fast transitions, clear user triggers.
- Transitions: `--duration-fast` 150ms hovers, `--duration-base` 250ms reveals/menus, `--duration-slow` 400ms larger slides, `--duration-page` 600ms hero.
- Reduced motion: global `MotionConfig reducedMotion="user"` + CSS media query + Preloader skip (post-hydration, to avoid hydration mismatch).

## Known Limitations
- Contact form remains client-side simulated (no delivery backend) — the UI is now truthful about this and offers a prefilled mailto fallback; a real backend is a separate project.
- Research/publications URLs intentionally omitted (no factual content).
- Minor contrast values (e.g., #6B6B6B on #F5F4F1 ≈ 4.4:1) marginally below WCAG AA 4.5:1 for small text — optional token tweak.
- **Dependency audit (§24) — documented, not destabilized.** `npm audit --omit=dev` reports 2 moderate react-router advisories (GHSA-wrjc-x8rr-h8h6 open redirect via backslash in `<Link>`/`useNavigate`; GHSA-337j-9hxr-rhxg constructor injection via `deserializeErrors()` in SSR hydration; plus GHSA-jjmj-jmhj-qwj2 open-redirect for react-router-dom 6.30.2-6.30.4). **Not exploitable in this deployment:** all `<Link>`/`navigate()` targets are hardcoded internal paths (no user-controlled `to`), and the site is fully static — no runtime SSR, no loaders/actions, so `deserializeErrors()` is never reached. The fix requires react-router 7.18.2 (breaking major) which breaks the verified vite-react-ssg@0.8.9 (v6) integration — flagged as a future upgrade task. Dev-only advisories (vite dev-server, esbuild, launch-editor) have no production exposure (static output only). Do not upgrade to satisfy npm audit; do it as part of a planned framework migration.
- Ranking/AI-overview inclusion cannot be guaranteed; this work maximizes first-party signals and technical eligibility only.
