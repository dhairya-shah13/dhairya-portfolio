# Changelog

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
