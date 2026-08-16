# Design.md — Dhairya Shah Portfolio

Single-page, scrollable developer portfolio inspired by the **Norell** Framer template (creative agency layout) — reinterpreted for a full‑stack / cloud & DevOps engineer. High-contrast editorial style: oversized bold typography, alternating black/white sections, an asymmetric image collage in the hero, a red accent color, and subtle micro-interactions (hover reveals, arrow icons).

Profile photo asset: `./dhairya.jpeg` (project root) — used in hero collage and About section.

---

## 1. Global Design System

**Layout:** Single scrollable page, sticky top nav, full-bleed sections that alternate background color (`off-white` → `black` → `off-white` → `black` → `off-white`) to create rhythm as the user scrolls.

**Typography**
- Display font: a bold grotesque/neo-sans (e.g. *Neue Montreal*, *General Sans*, or *Inter Tight* at 700–800 weight) for headlines — huge scale (64–120px desktop), tight tracking, tight line-height.
- Body font: same family at 400–500 weight, 16–18px, generous line-height (1.5–1.6), muted gray (`#6b6b6b`) for secondary text.
- Numerals (stats, list indices, years) use a slightly condensed/monospaced treatment for a technical feel.

**Color palette**
| Token | Value | Use |
|---|---|---|
| `bg-light` | `#F5F4F1` (off-white, not pure white) | Light section backgrounds |
| `bg-dark` | `#0A0A0A` | Dark section backgrounds |
| `text-primary` | `#111111` on light / `#FFFFFF` on dark | Headlines, body |
| `text-muted` | `#6B6B6B` on light / `#9A9A9A` on dark | Secondary text |
| `accent` | `#EF4444` (red) | Index numbers, hover states, active underline, links |
| `border` | `#E4E2DD` on light / `#242424` on dark | Hairline dividers between list rows |

**Spacing & grid:** 12-column grid, max content width ~1280px, generous section padding (120–160px vertical on desktop, 64px on mobile). Cards/images use soft rounded corners (12–20px radius), never sharp unless intentional (index numbers, dividers).

**Interactions**
- Nav is fixed/sticky, background turns solid on scroll.
- Hover on project/journal cards: image scales slightly (1.03x), a circular red button with an arrow (↗) fades in centered on the image.
- Hover on the numbered "Focus Areas" list: the hovered row's title turns bold/white (others dim to gray), and the image + description panel on the right cross-fades to match.
- Scroll-triggered fade/slide-up animation (~24px, 400–600ms ease-out) on section entry.
- Hamburger icon (top-right, black rounded-square button) opens a full-screen menu overlay — not a real hamburger drawer needed, but styled to match the reference.

---

## 2. Section-by-Section Content

### 2.1 Navigation (sticky)
- Left: Logo — **"Dhairya˙"** or **"DS®"** wordmark.
- Center/right links: `About` · `Work` · `Skills` · `Contact`
- Right: rounded black button with hamburger icon (opens full-screen nav overlay with the same links, large type, socials at the bottom).

### 2.2 Hero
- Small badge row above headline: `Available for Work` · social icon links (GitHub, LinkedIn) · `Scroll to view more ↓` · `© 2026`
- Oversized, offset headline (mixed weight, breaks across 2–3 lines, one word overlapping/behind the photo like the reference's "nore" treatment):
  > **"Building Reliable Products — from Database to Deployed URL"**
- Sub-line: *Full-Stack Developer · Cloud & DevOps — Ahmedabad, Gujarat*
- Asymmetric photo collage block: large portrait crop of `dhairya.jpeg` inset among offset light/dark rectangular blocks (matches the Norell hero's broken-grid look), with a small circular "R"-style monogram badge (use "DS" instead) floating over one edge.

### 2.3 Intro / Proof strip
- Eyebrow: *Projects I'm proud of*
- Big two-line headline: **"Six products, shipped end-to-end"**
- Supporting paragraph (from resume summary): full-stack developer with hands-on cloud deployment experience — six live products shipped end-to-end, from database schema to server provisioning to production URL.

### 2.4 Featured Work (2-column image grid, like Norell's "Works")
Each tile: project image/placeholder, logo/name overlay bottom-left, category label, hover → scale + red arrow button linking out.
1. **Akids Enterprise** — E-commerce Platform — React · Node.js · Express · MongoDB
2. **Meghdoot Motors** — Service Center Website (Maruti Suzuki authorized) — React · HTML · CSS · JS
3. **Fintrack** — Personal Finance Management App — React · Node.js · Express · MongoDB · Kotlin
4. **Aarisha** — Collaborative Web Platform — Live site, team build
5. **Shrinath** — Sales Monitoring System — small-business sales tracking
6. **HRMS** — HR Management System — Odoo Hackathon build — React · Node.js · Express · MongoDB

Each card links to its Live Site and/or GitHub where available (from resume).

### 2.5 About
- Small framed photo crop of `dhairya.jpeg` + name label: **Dhairya Shah — Full-Stack Developer & Project Lead**
- Short narrative pulled from the professional summary: proficient across MERN and Django/Flask, growing focus on infrastructure — containerization, deployment automation, cloud-ready architecture; based in Ahmedabad, Gujarat.

### 2.6 Focus Areas (dark section, interactive numbered list — replaces Norell's "Services")
Left column: large numbered rows, hover to highlight (bold white + red index), right column shows matching image + one-line description.
1. **Full-Stack Development (01)** — MERN & Django/Flask, coordinating API contracts between React/Node front ends and Python back ends.
2. **Cloud & DevOps (02)** — Docker containerization, GitHub Actions CI/CD, Linux shell scripting, Hostinger VPS provisioning.
3. **Team & Project Leadership (03)** — Led two concurrent engineering teams at Vassu Infotech, taking both products to company-wide production use.
4. **Database Design (04)** — SQL and MongoDB schema design across ERP, inventory, and finance-tracking systems.

### 2.7 Experience (timeline-style entry, light section)
**Software Development Engineer & Project Lead — Vassu Infotech** · *May 2026 – Jul 2026*
Hardware manufacturer expanding into software & IT services (~30 employees). Bullet list styled as a clean timeline card:
- Led two concurrent development teams, taking both products from concept to company-wide production use.
- Led development & deployment of **VassuERP** (Django, Flask, SQL, MongoDB).
- Led development & deployment of **StockFlow**, an inventory management system with dedicated stock inflow/outflow modules.
- Containerized services with Docker; configured CI/CD pipelines; wrote Linux shell scripts for VPS provisioning.
- Managed source control and collaborative workflows via Git/GitHub across both teams.

### 2.8 Stats strip (light section, big numbers like Norell's "110+ / 69% / 7+ / 91%")
- **6** — Live products shipped end-to-end
- **2** — Engineering teams led simultaneously
- **30** — Person organization served company-wide
- **6+** — Languages across the stack (Python, Java, Kotlin, JS, C, C++)

### 2.9 Skills (grid of tag pills or a 2×3 category grid)
- **Languages:** Python, Java, Kotlin, JavaScript, C, C++
- **Frameworks & Libraries:** React.js, Node.js, Express.js, Django, Flask, RESTful APIs
- **Frontend:** HTML5, CSS3, JavaScript
- **Databases:** SQL, MongoDB
- **Cloud & DevOps:** Docker, CI/CD (GitHub Actions), Linux/Shell Scripting, Git, GitHub, Hostinger VPS

### 2.10 CTA banner (light, huge centered text — mirrors "Let's find the right fit")
> **"Let's build something that ships"**
Small sub-line + button linking to the contact section.

### 2.11 Education & Certifications (table/list rows, mirrors Norell's Awards timeline)
| Year/Level | Detail | Note |
|---|---|---|
| Ongoing | B.Tech, Information Technology — CHARUSAT | 5th Semester · CGPA 7.5/10 |
| — | Higher Secondary Certificate (Class XII) — Seventh Day Adventist Higher Secondary School | 94% |
| — | Secondary School Certificate (Class X) — Divine Gurukulam | 92% |

Certifications (same row style, with external link icon):
- Microsoft Azure AI Fundamentals (AI-900) Exam Prep
- Core Java
- Advanced SQLite Queries with Belkasoft

### 2.12 Achievements (small row/card list)
- Winner — Coder's Arcade
- Equal Opportunity Cell — Poster Making Event

### 2.13 Contact (dark section, split layout like Norell)
- Left: form card (light card floating on dark bg) — Name, Email, Message, Submit button (black, rounded).
- Right: large **"Get In Touch"** headline over a dim portrait background image, phone (`9924343003`), email (`shah.dhairya.p13@gmail.com`), and social links (GitHub, LinkedIn).

### 2.14 Footer
- Huge outlined/solid wordmark: **"Dhairya Shah"**
- Link columns: `Home · About · Work · Skills · Contact` / `GitHub · LinkedIn`
- Bottom bar: `© 2026 Dhairya Shah. All rights reserved.`

---

## 3. Responsive Behavior
- **Desktop (≥1280px):** full multi-column layouts as described.
- **Tablet (768–1279px):** collapse project/journal grids to 2 columns → 1 column at smaller tablet widths; hero collage simplifies to a single stacked image + headline.
- **Mobile (<768px):** all sections single-column; nav collapses to hamburger only; numbered Focus Areas list stacks with the image panel appearing directly below each active row instead of side-by-side; stats become a 2×2 grid; footer wordmark scales down and wraps.

## 4. Assets Needed
- `dhairya.jpeg` (project root) — profile photo, used in hero collage and About section.
- Placeholder project thumbnails for the 6 featured works (until real screenshots are supplied).
- Icon set: arrow (↗), hamburger, social icons (GitHub, LinkedIn), external-link icon for certifications/awards rows.
