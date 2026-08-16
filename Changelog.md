# Changelog

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
