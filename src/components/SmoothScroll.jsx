import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { useReducedMotion } from 'motion/react';

function SmoothScroll({ children }) {
  const location = useLocation();
  const lenisRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip Lenis initialization if user prefers reduced motion
    if (prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    // Bind to window for global access (e.g. from Navbar)
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      cancelAnimationFrame(frameId);
      window.lenis = null;
    };
  }, [prefersReducedMotion]);

  // Handle route change scroll management (scroll to top or target hash)
  useEffect(() => {
    if (prefersReducedMotion) {
      if (location.hash) {
        const el = document.getElementById(location.hash.slice(1));
        if (el) el.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
      return;
    }

    const lenis = lenisRef.current;
    if (!lenis) return;

    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        // Wait slightly for page hydration and DOM updates
        const timer = setTimeout(() => {
          lenis.scrollTo(el, { offset: -90, immediate: false, duration: 1.2 });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      // Scroll to top immediately on route change without animation
      lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, location.hash, prefersReducedMotion]);

  return <>{children}</>;
}

export default SmoothScroll;
