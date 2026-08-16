# Context

Dhairya Shah Portfolio website project.

## System Architecture
- **Framework:** React + Vite (Single-page app, fully scrollable)
- **Styling:** Vanilla CSS & CSS Modules (no CSS frameworks, CSS custom variables for tokens)
- **Animations:** Framer Motion (via `motion/react`) for entrance loading, scroll-triggered fades, card hover transitions, and interactive list cross-fades
- **Icons:** Lucide React (arrow, external-link, hamburger, github, linkedin, calendar, briefcase, trophy, lock)

## Folder and File Structure
- `index.html` — Entry HTML structure loading Google Fonts (Inter, Inter Tight)
- `package.json` — Dependencies and scripts
- `vite.config.js` — Vite configuration
- `Context.md` — Project context and conventions (this file)
- `Changelog.md` — History of modifications
- `src/`
  - `main.jsx` — Entry script for React rendering
  - `index.css` — Global stylesheets and design tokens (variables)
  - `App.jsx` — Main container rendering all sections in order
  - `assets/` — Project assets (images, graphics)
    - `dhairya.jpeg` — Profile picture
    - `project1.jpg` to `project6.jpg` — Uploaded project screenshots (Vite bundles dynamically)
    - `focus1.jpg` to `focus4.jpg` — Uploaded focus area graphics (Vite bundles dynamically)
  - `components/` — Individual section components
    - `Preloader.jsx` — Solid white page reveal loader with count animation
    - `Navbar.jsx` — Sticky header nav with smooth scroll and mobile menu
    - `Hero.jsx` — Asymmetric broke-grid portrait hero header
    - `Intro.jsx` — Headline and professional proof summary strip
    - `FeaturedWork.jsx` — Two-column project grid with hover effects and links
    - `About.jsx` — Framed photo crop narrative about Dhairya
    - `FocusAreas.jsx` — Dark layout with interactive focus area listings and side visual panel
    - `Experience.jsx` — Timeline card of Vassu Infotech SDE role
    - `Stats.jsx` — Stats metrics summary strip
    - `Skills.jsx` — Category-based skills table / grid
    - `Cta.jsx` — Call-to-action transition banner
    - `Education.jsx` — Education & Certifications lists with drive links
    - `Achievements.jsx` — Achievements listings with drive links
    - `Contact.jsx` — Floating form & details grid layout
    - `Footer.jsx` — Giant wordmark footer & quick links

## Feature List
- [x] Solid white preloader reveal with counting animation and Framer Motion slide-up exit
- [x] Sticky navbar with scroll-based background color transition and full-screen mobile menu overlay
- [x] Broken-grid asymmetric collage hero using custom CSS offsets
- [x] Custom hover animations (liquid glass frosted blur overlay with separate GitHub and Live Site buttons)
- [x] State-driven interactive Focus Areas row lists with image visual panel on the right (stacks on mobile)
- [x] Timeline-style professional history display
- [x] Table/timeline structures for education, certifications, and achievements linked to active assets
- [x] Responsive layouts scaling from desktop (>=1280px) to tablet (768px-1279px) and mobile (<768px)
- [x] Clean contact form layout with input validation

## Conventions
- Use CSS Variables declared in `:root` of `src/index.css` for color, spacing, duration, and ease tokens.
- Maintain a clean single-page scroll layout, anchoring sections with clean `id` selectors.
- Set motion speeds based on `UISKILL.md` standards (100ms-600ms transitions, easing curves).
- Write semantic HTML5 layout tags (`header`, `main`, `section`, `footer`).

## SEO
- Single H1 tag on the page.
- Descriptive Meta Title and Meta Description tags in `index.html`.
- Accessible image alt texts.
- Accessible buttons and interactive targets with unique IDs.

## UI/Motion
- Chosen foundation: React, Vite, CSS, Framer Motion (`motion/react`).
- Colors: Off-white (`#F5F4F1`) and dark (`#0A0A0A`) section background alternating rhythm.
- Red accent (`#EF4444`) used carefully for interactive highlights and highlights.
- Motion budget: Interactive marketing site. High polish, fast transitions, clear user triggers.
- Transitions:
  - `--duration-fast`: 150ms for hovers and micro-interactions.
  - `--duration-base`: 250ms for scroll reveals and menu openings.
  - `--duration-slow`: 400ms for larger slide animations.
  - `--ease-standard`: `cubic-bezier(0.4, 0, 0.2, 1)` default curves.
