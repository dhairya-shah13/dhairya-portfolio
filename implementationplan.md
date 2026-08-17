# Implementation Plan v2 — SEO / GEO / AEO Master Implementation
**Project:** Dhairya Shah — aboutdhairya.me (Vite + React 18 SPA portfolio)
**Status:** ⏳ PENDING APPROVAL (v2) — no code will be written until this plan is approved (RULES.md §2)
**Date:** 2026-08-17
**Revision log:** v2 incorporates the owner's 36-point review (2026-08-17). Overall strategy approved; corrections applied in full before implementation may begin.

---

## 1. Audit Summary (evidence from codebase + live site + resume)

### 1.1 Stack & infrastructure (inspected)
| Area | Finding |
|---|---|
| Framework | Vite 5 + React 18.3, **client-side-rendered SPA**, single page, no router |
| Styling | Vanilla CSS + CSS Modules, design tokens in `src/index.css` |
| Animation | `motion/react` (Framer Motion), Lucide icons |
| Hosting | **Vercel** (confirmed via `Server: Vercel` response header) |
| Canonical host | `https://aboutdhairya.me` → **308** → `https://www.aboutdhairya.me/` (www serves; HSTS already present, `max-age=63072000`) |
| Caching | HTML: `Cache-Control: public, max-age=0, must-revalidate` (Vercel default) |
| API surface | **None.** Contact form is client-side only (simulated submit, no backend) |
| Deploy config | No `vercel.json`, no `public/` dir, no robots.txt, no sitemap, no 404 page, no middleware |

### 1.2 Current SEO state (live checks)
- ✅ Title + meta description in `index.html` (fact-based)
- ✅ `lang="en"`, viewport, HSTS
- ❌ No robots.txt (404), no sitemap.xml (404), no canonical, no OpenGraph, no JSON-LD, no og:image
- ❌ Content is 100% JS-rendered — crawlers/answer engines see an empty `<div id="root">` in raw HTML
- ⚠️ `Access-Control-Allow-Origin: *` observed on HTML responses — **origin unknown; must be investigated, not blindly overridden** (review §19)
- ⚠️ Images total ~13 MB (focus1–4 ≈ 1.8–2.2 MB each) — LCP/bandwidth/crawler-weight problem

### 1.3 Content facts (source of truth: `Dhairya Resume.pdf` + site content)
- **Dhairya Pinal Shah** — **Full-Stack Developer | Cloud & DevOps**, Ahmedabad, Gujarat (resume header). Site brand name: **Dhairya Shah**. Same person (resume = site identity).
- Vassu Infotech (May–Jul 2026): led 2 concurrent engineering teams; **VassuERP** (Django, Flask, SQL, MongoDB) + **StockFlow** inventory; Docker, GitHub Actions CI/CD, Linux shell, Hostinger VPS; ~30-person org.
- Skills (resume): Python, Java, Kotlin, JavaScript, C, C++; React.js, Node.js, Express.js, Django, Flask, RESTful APIs; HTML5/CSS3/JS; SQL, MongoDB; Docker, CI/CD, Git/GitHub, Hostinger VPS.
- Projects: Akids Enterprise (e-commerce, React/Node/Express/Mongo, github+live), Meghdoot Motors (Maruti Suzuki service-center site, github+live), Fintrack (finance app, github only), Aarisha (team collab platform, live+team repo), Shrinath (sales monitoring, github only), HRMS (Odoo hackathon, no links).
- Education: B.Tech IT @ CHARUSAT (5th sem, CGPA 7.5/10); Class XII @ SDA HSS (94%); Class X @ Divine Gurukulam (92%).
- Certs: Microsoft Azure AI Fundamentals (AI-900) exam prep; Core Java; Advanced SQLite (Belkasoft). → AI-900 is an **additional signal only**, never an AI career claim (review §27).
- Achievements: Winner — Coder's Arcade; Equal Opportunity Cell — Poster Making.
- Profiles: GitHub `dhairya-shah13`, LinkedIn `dhairya-shah13` (both verified in site + resume). Contact: email + phone (already public on site).

**NOT supported anywhere — will NOT be claimed:** AI/ML engineering, computer vision, ANPR/OCR/YOLO, PyTorch/TensorFlow, research/publications, IEEE, Google Scholar, USC, NTT, Jio, L&T, Keck, ML expertise, Cloud Architect / Cloud Engineer / DevOps Architect / SRE titles (review §26).

### 1.4 Audit → gap summary
| Area | Gap |
|---|---|
| Crawlability | Content not in initial HTML; no robots/sitemap; JS-only |
| Technical SEO | No per-page meta, canonicals, OG, JSON-LD |
| Entity | No Person/WebSite/ProfilePage structured data, no sameAs |
| Content architecture | No /about, /projects, project pages (no /research — nothing real to publish) |
| Images | ~13 MB unoptimized, generic filenames/alt |
| Bot protection | **None** — no edge/WAF/caching/rate controls; site is defenseless against a repeat of the ~400k-request/12h Meta-crawler incident |
| Security headers | Only HSTS; no CSP, nosniff, Referrer-Policy, Permissions-Policy, frame protection |
| Perf/a11y | Heavy images; no focus-visible styles; no reduced-motion handling; preloader delays LCP |

---

## 2. Approved Decisions (user-confirmed 2026-08-17)

| # | Decision | Chosen |
|---|---|---|
| D1 | Canonical hostname | **Keep `https://www.aboutdhairya.me/`** (apex 308→www). All canonicals/sitemap/OG/JSON-LD use it. Verify full chain (review §4): `http(s)://aboutdhairya.me` and `http(s)://www.aboutdhairya.me` → exactly one final destination; no loops; no unnecessary redirect steps. |
| D2 | Professional positioning | **Fact-based**: "Dhairya Shah \| Full-Stack Developer & DevOps Engineer". No title escalation (Cloud Architect/Engineer, DevOps Architect, SRE). Azure AI-900 = "AI/ML fundamentals" signal only. Entity SEO priority: Dhairya Shah → Dhairya Pinal Shah → Dhairya → Dhairya Shah portfolio/developer/full-stack developer/DevOps/software developer/engineer → aboutdhairya → aboutdhairya.me. No keyword density; secondary terms arise naturally from verified tech/projects/DevOps/full-stack/experience. |
| D3 | Content architecture | **Hybrid**: homepage (primary brand page, not diluted) + `/about` (expands entity) + `/projects` (body of work) + `/projects/[slug]` **only for projects that pass a depth gate** (review §8). No `/research` or `/publications`. |
| D4 | Rendering | **Prerender** static HTML at build (SPA retained). Acceptance criterion: every important URL returns meaningful content in initial HTML **without JS execution** (review §11, §32). Stack conversion tested, not assumed. |

---

## 3. Scope

### In scope
All Phases P0–P5. Repo-only changes by the agent. Production bot protection is a **REQUIRED manual deployment step** (review §34) — the agent stops at repo implementation + exact configuration spec if dashboard access is unavailable (review §35).

### Explicit non-goals / out of scope
- Contact-form backend (out of scope; existing behavior preserved; disclosed as known limitation)
- `/research`, `/publications`, Google Scholar, IEEE, USC content (no factual basis)
- PWA manifest (not an installable app; no SEO value)
- Switching canonical hostname to apex (rejected in D1)
- Any claim of indexing/ranking success from local validation (review §30, §31)
- Backlink schemes, directories, profile aggregators, or fake profiles (review §29)

---

## 4. Implementation Plan by Phase

### PHASE 0 — AVAILABILITY & BOT PROTECTION (P0) — DEFENSE-IN-DEPTH

**Why (hard requirement):** A crawler must never again generate enough traffic to take the portfolio offline (~400k requests/12h previously). **IP-based rate limiting alone is NOT considered sufficient** — a botnet/proxy network distributes traffic across many IPs (review §1, §2, §33).

**Architecture — 5 layers:**

**Layer 1 — Vercel edge / Firewall rate limiting (PRIMARY, dashboard)**
- Configure a **Vercel Firewall rate-limit rule** protecting the entire public site: match all public paths, action: rate-limit/challenge with clear `429` + `Retry-After`.
- **Threshold is NOT hard-coded.** It is derived from an observed baseline, never assumed: (a) after the first production deploy, read actual request volume from Vercel Firewall logs / Analytics (humans, crawlers, per-identity rates) over a representative window; (b) estimate legitimate crawler needs for a small static site (~10 public pages — Google/Bing/AI crawlers require only modest per-minute volumes at steady state); (c) set the domain-wide limit as a documented multiple of the observed baseline with a written rationale. Rationale is included in the final report.
- **Explicit limitation:** the threshold itself does NOT prevent distributed/botnet crawling (many IPs). It is one layer; the protection model is **Bot Management + Firewall rate limiting + edge caching + DDoS protection + monitoring**.
- **Plan check before specifying any final number:** verify the availability/behavior of domain-wide rate limiting on the owner's **specific Vercel plan** (feature availability varies by plan).
- **Agent cannot access the Vercel dashboard.** Deliverable: rule specification (paths, baseline-derived threshold + rationale, action, mitigation) for the owner to configure. **REQUIRED BEFORE PRODUCTION** (review §34).
- **`vercel.json` `rateLimit`:** Do **NOT** assume this property is valid/current. Verify against the current Vercel documentation before committing anything. Vercel currently separates rate limiting from Bot Protection and routes rate limiting through Firewall/WAF rules. Only if the property is confirmed documented and supported on this plan will a matching `vercel.json` rule be added (as an in-repo complement); otherwise it is omitted and Layer 1 is enforced via the dashboard rule.

**Layer 2 — Bot Management / Bot Protection (dashboard, REQUIRED, staged rollout)**
- Enable **Vercel Bot Management / Bot Protection** (or Firewall bot rules) **starting in LOG mode**: observe traffic and rule hits first, then enforce Challenge/Deny rules based on observed abuse. **Do not immediately block all automated traffic** (final review #2).
- **Never rely on User-Agent strings** (spoofable; review §3). Detection is separate from rate limiting: bots may crawl, automated traffic is monitored, excessive traffic is rate-limited, suspicious automation is challenged/blocked.
- **Bot policy:** no blanket blocking of Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, or Meta crawlers; also no automatic whitelisting. Search-engine crawlers remain accessible. AI/answer-engine crawlers are **configurable per the owner's policy — not permanently encoded as "all allowed"**. Regardless of robots.txt, **no crawler receives unlimited access or a rate-limit bypass** (final review #4). `robots.txt` remains a crawl-preference mechanism only — never a security control (review §3, §14).

**Layer 3 — CDN / edge caching (in-repo)**
- Prerendered static HTML per route (Phase 2) — public content is served from Vercel's edge cache, not generated per request.
- Immutable long-lived caching for content-hashed `/assets/*` (`public, max-age=31536000, immutable`); short TTL for robots/sitemap; daily TTL for og-image + resume PDF. HTML keeps `must-revalidate` so the edge absorbs repeated crawler hits without origin work.
- Goal: repeated crawler requests should never create meaningful origin load.

**Layer 4 — Application-layer policy (in-repo, documented)**
- No API exists today. Documented policy: any future `/api/*` endpoint **must** receive a stricter limit (starting point: 20 req/60 s, anonymous) as part of its implementation. Preemptive Firewall rule for `/api/*` if the dashboard rule set allows path scoping.

**Layer 5 — Monitoring & visibility (dashboard + docs)**
- **Required:** Vercel Firewall logs (crawl/rate-limit visibility) and a post-activation traffic review (Firewall protects; Analytics optional).
- Document alert/detection thresholds: high request rates, crawler bursts, repeated automated traffic, abnormal 4xx/5xx spikes, origin/bandwidth spikes. Exact dashboard steps documented for the owner (review §1-Layer 5, §34).

**Verification:** Rate-limit acceptance = **actual deployed Vercel Firewall behavior**, not merely that `vercel.json` parses (review §33): controlled burst test on the deployed site → throttling observed; normal browser requests succeed; legitimate crawler (curl with a real crawler UA or Google/Bing fetch) still reaches public pages; caching headers verified via `curl -I`. If the agent cannot deploy/verify, this becomes a REQUIRED manual verification step and the DoD gates (§11) remain open.

**Rollback:** `vercel.json` changes are repo-only and reversible; dashboard rules are reversible in the dashboard. No destructive operations.

---

### PHASE 1 — ESTABLISH ENTITY (P1)

**Changes:**
1. `index.html` — fact-based fallback title/description (unchanged wording), real favicon (`public/favicon.svg`), canonical `https://www.aboutdhairya.me/`, OG/Twitter defaults.
2. New `src/components/JsonLd.jsx` — `<script type="application/ld+json">` renderer (safe; works under prerender).
3. **Homepage JSON-LD (minimal, no over-schematizing — review §6):**
   - **Person** — every field fact-checked (review §5): `name: "Dhairya Shah"`, `alternateName: "Dhairya Pinal Shah"` (resume header establishes same person; relationship made explicit; visible content consistently uses "Dhairya Shah" — review §25), `url`, `image` (stable URL from Phase 2), `jobTitle: "Full-Stack Developer & DevOps Engineer"`, fact-based description, `sameAs`: **GitHub + LinkedIn only** (verified; review §29), `address`: city/region/country only (Ahmedabad, Gujarat, IN — already public; no precise location), `alumniOf`: CHARUSAT / SDA HSS / Divine Gurukulam (resume-sourced). **`knowsAbout`: a concise set of demonstrated professional areas only** (e.g., full-stack web development, REST API design, database design, cloud deployment, CI/CD) — **NOT** a dump of every resume language/tool; individual languages are never turned into expertise claims (final review #5).
   - **WebSite** (name, url) + **ProfilePage** (mainEntity → Person). `WebPage` type on inner pages where applicable. FAQPage: **optional** — only if FAQ content is genuinely useful (on /about, see Phase 3); never mandatory (review §6).
4. **Homepage identity statement** — one natural paragraph in `Intro.jsx` (visible, integrated into the existing design, **not** an SEO article; no keyword stuffing; homepage remains the primary brand page — review §9, §10): *"Dhairya Shah is a full-stack developer and DevOps engineer based in Ahmedabad, Gujarat, who ships products end-to-end — MERN and Django/Flask, Docker containerization, CI/CD pipelines, and cloud deployment."* **Evidence check for "cloud deployment":** the resume explicitly states "hands-on cloud deployment experience" and "cloud-ready architecture" (verified in `Dhairya Resume.pdf`), so the phrase is supported. If the evidence check fails during implementation, fall back to the less aggressive "deployment" (final review #6).
5. Per-route metadata helper (`Seo`) using `useHead` from `vite-react-ssg` + `JsonLd` children.

**Verification:** `/` raw HTML (curl, no JS) contains identity statement, Person/WebSite/ProfilePage JSON-LD that parses; single H1; one canonical.

---

### PHASE 2 — TECHNICAL SEO FOUNDATION (P2)

**Changes:**
1. **Prerendering — conversion feasibility test FIRST (review §11):**
   - Add `react-router-dom` + `vite-react-ssg` only after confirming the conversion works on the current Vite 5 / React 18 stack (small spike: build with SSG entry on a scratch branch). No large-framework migration for SEO's sake.
   - `src/main.jsx` → SSG entry; `src/App.jsx` → layout (Navbar + Outlet + Footer) + `Routes`; static route list generated from project data.
   - **Acceptance criterion (review §11, §32):** `curl` every important URL (`/`, `/about`, `/projects`, each project page) and confirm the raw HTML contains meaningful text, H1, metadata, canonical, structured data where applicable, and internal links — **without JavaScript execution**.
2. **Routing / Vercel fallback verification (review §12):** verify direct navigation AND refresh to `/about`, `/projects`, `/projects/<slug>` returns the correct prerendered static document; unknown routes return a **real 404 status** (via `public/404.html` + Vercel); no reliance on unverified SPA fallback behavior after SSG.
3. **`public/` static files (new):**
   - `robots.txt` — simple: allow all, no disallows (nothing private), `Sitemap: https://www.aboutdhairya.me/sitemap.xml`. **No `Crawl-delay`** (not reliably honored); explicitly documented as crawl guidance, not security (review §14).
   - `sitemap.xml` — manual, small set (~7–10 URLs). **No `lastmod` unless reliably maintained** — omit it rather than emit today's date on every deploy (review §13). Only canonical, indexable, 200 URLs; absolute `https://www.aboutdhairya.me/...` URLs.
   - `404.html` — branded, real 404 status, links home.
   - `favicon.svg` — DS monogram.
   - `og-image.png` — 1200×630, clear "Dhairya Shah" branding, minimal text, no misleading claims, correct URL, **stable public URL** (review §17).
   - `images/dhairya-shah.jpg` — stable copy of the portrait for Person JSON-LD / OG (bundled hashed assets are unstable URLs).
   - `resume/dhairya-shah-resume.pdf` — move `Dhairya Resume.pdf` from root; linked naturally from /about + footer; no separate HTML resume page (review §15). Content already public (contact info on site); no additional personal info exposed.
4. **Image optimization (review §16 — per-image, not forced sizes):**
   - `scripts/optimize-images.mjs` (sharp, devDep), run once and committed. **Per-image budget:** project thumbnails resized to display width ×2 DPR and encoded as **WebP primary with optimized JPEG fallback** (via `<picture>`) or optimized JPEG at quality appropriate to content; hero portrait already 46 KB — left intact; focus images resized to their panel display size (no 2 MB images). Screenshots must not visibly degrade — quality chosen per image and visually checked in preview.
   - Descriptive alt text; `width`/`height` from sharp metadata (CLS); `loading="lazy"` below the fold; `fetchpriority="high"` on hero portrait.
5. **Accessibility (review §22):** global `:focus-visible` styles; `prefers-reduced-motion: reduce` media query that **keeps content visible** (fades only, never hidden state); Preloader behavior per Phase 2.6; mobile menu Escape + `aria-expanded`.
6. **Preloader / LCP (review §21):** **measure first**, don't assume. Preferred outcome: critical hero content can render immediately and the preloader is purely decorative/non-blocking (e.g., overlay with `pointer-events` and short duration; content beneath it paints normally). **SEO/UX must not depend on sessionStorage.** Repeat-visit skip is at most an optional nicety after measurement; never a dependency.
7. **Security headers & CSP (review §18, §20):** see §5 — **tested, not shipped blind**: CSP first in Report-Only, violations collected, then a minimal enforced policy. Verify headers don't break Framer Motion, fonts, images, navigation, prerendered pages.
8. **CORS `Access-Control-Allow-Origin: *` (review §19):** **investigate the source first** (dashboard header rule vs Vercel behavior) on a preview deploy. Only remove/override if it is actually set and serves no purpose for the portfolio's HTML responses. No global CORS added.

**Verification:** build + preview; curl no-JS content checks (§2.1); robots/sitemap/404/favicon/og-image/resume reachable; headers verified via `curl -I`; image sizes + visual check; keyboard/reduced-motion checks.

---

### PHASE 3 — CONTENT ARCHITECTURE (P3)

**Changes:**
1. **`/about` — "About Dhairya Shah"** (ProfilePage + Person JSON-LD):
   - H1 "About Dhairya Shah"; factual identity summary.
   - **AEO block** (review §23 — natural, not a wall): "Who is Dhairya Shah?" answered directly in prose; other answers distributed naturally across homepage/About/Projects (What does he do? What technologies? What projects? Where studied/worked? How to contact?).
   - Sections: professional focus, skills, experience (Vassu Infotech), education, certifications (AI-900 framed as AI/ML fundamentals only — review §27), achievements, external profiles, resume download, contact CTA.
   - **FAQ (optional, only if genuinely useful):** 4–5 natural Q&As + FAQPage JSON-LD **only if the content earns it**; FAQ is a content decision, not a checklist item (review §6).
2. **`/projects` — projects index:** cards for all 6 with factual summaries + external GitHub/live links.
3. **`/projects/[slug]` — PROJECT DEPTH GATE (review §8, §28):**
   - **Evaluate each project before creating a page.** Criteria to qualify: (a) more than a one-line description or a real role statement, (b) distinct stack, (c) at least one real link (github/live), (d) can support a meaningful unique narrative without fabrication.
   - Expected outcome: detail pages only for projects passing the gate (likely **Akids Enterprise, Meghdoot Motors, Fintrack, Shrinath**); **HRMS** (no links, thin) and possibly **Aarisha** (thin description) remain on `/projects` with external links only. **Quality > number of URLs.** Final set decided at implementation from the actual data; the plan does not commit to six pages.
   - Detail-page content is resume/site-sourced only: name, category, factual description, stack, role, GitHub/live links. **No invented metrics, results, or screenshots-as-facts.**
   - **Project schema (review §7):** no automatic `CreativeWork`. Use a software-related schema type only where properties can be truthfully populated (e.g., a live site/repo URL exists); never empty/speculative fields. `BreadcrumbList` (Home > Projects > Project) where navigation genuinely exists.
4. **Internal linking (review §28):** homepage → /about, /projects; project pages → /projects, /about, and related projects **only where the connection is genuinely useful** (shared stack/domain) — no forced links; descriptive anchors.
5. **Shared data (DRY):** `src/data/projects.js`, `src/data/person.js`; `FeaturedWork.jsx` refactored to consume them.
6. **Navbar/Footer:** route-aware (Home, About → /about, Projects → /projects, Skills/Contact scroll on homepage with cross-page helper); footer → /, /about, /projects, resume.

**Verification:** all created routes return 200 with unique titles/descriptions/canonicals; raw-HTML content check per route; internal-link check; no broken links; project pages that don't pass the gate are NOT created.

---

### PHASE 4 — GEO / AEO (P4)

**Changes:** consolidated from Phases 1–3; nothing extra added for its own sake:
- Consistent entity definition in crawlable HTML (homepage statement + /about "Who is" answer).
- Person JSON-LD with verified sameAs; consistent name/URL/title across all routes, OG, and schema; "Dhairya Shah" used consistently in visible content (review §25).
- Factual, specific project/experience descriptions (real stacks, roles, links).
- Strong internal linking; stable canonical host everywhere.
- FAQ only where genuinely useful (review §23).

**Verification:** every target question (Who is Dhairya Shah? What does he do? Technologies? Projects? Education? Experience? Contact?) has a natural answer somewhere in crawlable HTML; schema consistent; no FAQ wall.

---

### PHASE 5 — VALIDATION, SECOND AUDIT, REPORTING

1. **Build & preview:** `npm run build` (SSG), `npm run preview`; all routes 200.
2. **Crawler simulation (review §32, REQUIRED):** `curl` every important URL — raw HTML must contain identity text, H1, title/description/canonical, JSON-LD where applicable, and internal links **with no JS execution**. **Scope of curl evidence:** curl is used for generic HTTP/raw-HTML verification only — it is **NOT** treated as proof that Google/Bing crawls the site (final review #3).
3. **Metadata audit:** unique title/description/canonical/robots/OG per route; no duplicate titles; canonical chain verified for all 4 hostname variants (review §4).
4. **Structured data audit:** parse every JSON-LD block; validate against Schema.org; no contradictory entity info; no empty/speculative fields (review §6–7).
5. **Crawlability:** robots.txt; sitemap (only canonical/indexable/200 URLs; lastmod omitted unless reliable); internal-link check; real 404 on unknown routes.
6. **Performance:** image sizes per image; bundle; LCP measured (preloader effect measured, not assumed — review §21); CLS (width/height); reduced-motion content visibility check (review §22).
7. **Security/bot:** headers via `curl -I` (each verified against actual behavior — review §20); CSP enforced only after Report-Only pass; ACAO source investigated (review §19); no secrets introduced (grep changed files); rate-limit acceptance per §33 (deployed behavior, not config parsing).
8. **Second audit:** fix all discoverable issues; re-verify.
9. **Docs (RULES.md §8.1):** update `Context.md` (architecture: SSG + router; new structure; new `## SEO` subsection) and `Changelog.md` (single timestamp, `[Category: SEO]` / `[Category: Dev]` / `[Category: UI]` / `[Category: Audit]` subsections). (No SEO.md exists → RULES §8.1 files apply, per §55.)
10. **Final report (RULES §54 + prompt §43):** completed items per category, validation results, **required manual actions with exact steps** (review §30): sitemap URL, canonical URL, exact Search Console property to verify, exact sitemap to submit, Bing submission steps, indexing checks, Firewall/Bot-Management configuration steps. No indexing/ranking success claims beyond local validation.
11. **Brand-SERP baseline (review §31):** include a baseline/post-implementation verification plan for: "Dhairya Shah", "Dhairya Pinal Shah", "Dhairya Shah portfolio", "Dhairya Shah developer", "Dhairya Shah DevOps", "aboutdhairya", "aboutdhairya.me" — ensure first-party entity signals are consistent and the site is technically eligible for discovery/indexing. No ranking guarantees.

---

## 5. Security Headers & CSP (SECONDARY, TESTED, NON-BLOCKING — review §18, §20, final review #7)

**Priority:** CSP is secondary to SEO/crawlability/availability. **CSP work must never block or delay the core implementation** — if enforcing CSP risks breaking the site (Framer Motion, fonts, images, navigation, prerendered pages), it is deferred or kept in Report-Only and documented rather than shipping a broken portfolio.

**Protocol:** ship CSP in **Report-Only** first; collect violations from real traffic/preview; then enforce the minimal policy that works. Draft (subject to test results):

```
Content-Security-Policy-Report-Only (initial):
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;   # unsafe-inline ONLY if Framer Motion inline styles require it (verify)
  font-src https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self' https://vitals.vercel-insights.com;           # only if Vercel Analytics enabled
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self'
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()
X-Frame-Options: DENY
```
- Every directive is verified against actual site behavior (fonts, motion, images, navigation, analytics, prerendered pages) before enforcement.
- `unsafe-inline` for styles is added only if motion's runtime styles require it — never "because it's convenient".
- Headers are added for a real purpose, not checklist score (review §20).

---

## 6. New Dependencies (RULES §18 — justification)

| Dependency | Type | Why |
|---|---|---|
| `react-router-dom` ^6 | runtime | Routing for /about, /projects, /projects/[slug] (D3) |
| `vite-react-ssg` | dev | Prerender static HTML per route — **added only after a feasibility check on the current stack** (review §11); no large-framework migration |
| `sharp` | dev | Per-image optimization script + og:image generation (review §16) |

No other dependencies. Alternatives considered and rejected where documented inline (sitemap plugin, build-time image optimizer plugin, react-snap). If the SSG feasibility check fails, the plan stops at Phase 2.1 and re-planning happens before proceeding (RULES §2.4).

---

## 7. Risks, Edge Cases & Rollback (RULES §49)

| Risk | Mitigation |
|---|---|
| `vercel.json` `rateLimit` invalid/unsupported | Not assumed — verified against current Vercel docs before use; primary enforcement is the dashboard Firewall rule (required manual step) |
| IP-based limits insufficient vs distributed crawlers | Explicitly accepted limitation — mitigated by layered controls (bot management, caching, monitoring), not by IP limits alone (review §1, §2) |
| SSG conversion fails on current stack | Feasibility spike first; if it fails, pause and re-plan (no blind dependency addition) |
| CSP breaks fonts/motion/nav | Report-Only → violation review → minimal enforcement |
| SPA fallback assumptions after SSG | Direct-nav/refresh/404 behavior verified via curl on deployed preview (review §12) |
| Thin project pages | Depth gate (§Phase 3.3); weak projects stay on /projects only |
| Preloader LCP impact | Measured, not assumed; preloader made non-blocking; no sessionStorage dependency (review §21) |
| ACAO override blind | Source investigated first; changed only if it's actually set and purposeless (review §19) |
| Rate limiting throttles legit crawlers | Threshold derived from observed baseline + expected crawler volume (documented rationale, not an assumed number); bot management kept separate from rate limiting; verified crawler access retained after activation |
| Contact form non-functional | Out of scope; disclosed as known limitation |

**Rollback:** every repo change is reversible via git; dashboard rules reversible in dashboard. No destructive or irreversible operations. If the agent lacks dashboard access, implementation stops at repo completion and production bot protection is marked **REQUIRED MANUAL** (review §34–35).

---

## 8. Acceptance Criteria Mapping (prompt §44 + review)

| Criterion | Where satisfied |
|---|---|
| Entity: Dhairya Shah = primary entity; aboutdhairya.me connected; verified external profiles connected | Phases 1–3 |
| SEO: unique titles/descriptions/canonicals (final host only), sitemap, robots, indexability, internal linking, semantic HTML | Phases 1–3 |
| GEO/AEO: questions answered in natural crawlable content across homepage/About/Projects; consistent schema; no FAQ wall | Phases 1, 3, 4 |
| Performance: content in initial HTML without JS; images optimized per-image; caching; CWV measured (incl. preloader) | Phases 2, 5 |
| Bot protection (layered): Bot Management + Firewall rate limit (baseline-derived threshold) + edge caching + DDoS protection + /api policy + monitoring; bursts throttled; legit crawlers not blocked; **deployed behavior verified** | Phase 0 + required manual steps |
| Security: no secrets; no fake claims; no keyword stuffing; no doorway pages; no misleading schema; headers tested | All phases |
| Crawler simulation: every important URL returns meaningful content via curl without JS | Phase 5 (§32) |
| Brand-SERP: baseline verification plan delivered; no ranking claims | Phase 5 (§31) |

---

## 9. Required Manual Actions (owner/dashboard — agent cannot perform)

### 🔴 REQUIRED BEFORE PRODUCTION (review §34–35)
1. **Vercel Firewall rate-limit rule** for the entire public site (agent provides exact rule spec: paths, baseline-derived threshold + rationale, action, mitigation).
2. **Vercel Bot Management / Bot Protection** enabled — **in LOG mode first**, observe traffic, then enforce Challenge/Deny rules from observed abuse (final review #2).
3. **Post-activation traffic review** — confirm: rate-limit responses correct (429 + Retry-After), normal browser traffic unaffected, legitimate crawlers still reach public pages, edge caching absorbing repeat requests, monitoring/visibility available.
4. Controlled burst test on the **deployed** site (agent documents the procedure; expects throttling, not origin overload).
5. Confirm the canonical chain end-to-end for all 4 hostname variants (review §4).
6. If `Access-Control-Allow-Origin: *` is a dashboard header rule: remove it there (review §19).
7. **Search-engine verification (final review #3):** use Google Search Console / Bing Webmaster **live inspection** (URL inspection) on the deployed site — not curl-with-crawler-UA — to verify actual Google/Bing crawling; verify AI-crawler policy/behavior via robots.txt + Firewall/Bot Management logs.

### 🟡 Recommended / follow-up
7. Vercel Analytics (optional; Firewall logs are the required visibility).
8. **Search Console + Bing Webmaster** (final report includes exact property, sitemap URL, submission steps — review §30).
9. Google/Bing rendering checks (URL inspection) after production deploy.

---

## 10. Known Limitations (disclosed up front)

- Contact form remains client-side-simulated (no delivery backend) — preserved as-is; a real backend is a separate project.
- Research/publications URLs intentionally omitted (no factual content).
- Minor contrast values (e.g., #6B6B6B on #F5F4F1 ≈ 4.4:1) marginally below WCAG AA 4.5:1 for small text — optional token tweak proposed, pending approval (UI-adjacent).
- IP-based rate limits cannot fully stop distributed/botnet crawling — layered controls are the mitigation; absolute prevention is not claimed.
- Rankings/AI-overview inclusion cannot be guaranteed by any on-page work; this plan maximizes first-party signals and technical eligibility only.

---

## 11. Definition of Done (review §35 gates included)

- [ ] Plan v2 approved by project owner (this document)
- [ ] Phases executed in order P0→P5; feasibility/measurement steps performed before dependent work
- [ ] Build passes; every important URL returns meaningful content in raw HTML **without JS** (curl-verified)
- [ ] JSON-LD valid, minimal, and truthful; sitemap canonical-only with no misleading lastmod; robots.txt simple
- [ ] Headers verified against actual behavior; CSP enforced only after Report-Only pass
- [ ] Images optimized per-image without quality degradation; hero/preloader LCP effect measured
- [ ] Repo implementation complete
- [ ] 🔴 Production Vercel Firewall rate limiting configured with a baseline-derived threshold + documented rationale (or explicitly marked REQUIRED MANUAL if no dashboard access)
- [ ] 🔴 Bot Management configured; configuration published
- [ ] 🔴 Controlled test confirms excessive traffic is throttled; normal users succeed; crawlers retain access; origin protected by caching/edge; monitoring available
- [ ] Context.md + Changelog.md updated (RULES §8.1)
- [ ] Final report delivered with exact manual steps (Search Console, Bing, Firewall), sitemap/canonical URLs, brand-SERP baseline — no unearned success claims
