import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Navbar.module.css';
import Magnetic from './Magnetic.jsx';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const closeBtnRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  // Escape closes the menu; focus moves to the close button on open and returns on close.
  useEffect(() => {
    if (menuOpen) {
      closeBtnRef.current?.focus();
      const onKey = (e) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    return undefined;
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((open) => {
      const next = !open;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Section links: scroll on the homepage, otherwise navigate home with a #hash
  // (HomePage scrolls to it on mount).
  const goToSection = (e, id) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (window.lenis && el) {
        window.lenis.scrollTo(el, { offset: -90 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <Magnetic>
            <Link to="/" className={styles.logo}>
              Dhairya<span className="text-accent">˙</span>
            </Link>
          </Magnetic>

          <nav className={styles.desktopNav} aria-label="Primary">
            <Link to="/about" className={styles.navLink}>
              About
            </Link>
            <Link to="/projects" className={styles.navLink}>
              Projects
            </Link>
            <a href="#skills" onClick={(e) => goToSection(e, 'skills')} className={styles.navLink}>
              Skills
            </a>
            <a href="#contact" onClick={(e) => goToSection(e, 'contact')} className={styles.navLink}>
              Contact
            </a>
          </nav>

          <Magnetic>
            <button
              ref={hamburgerRef}
              className={styles.hamburgerBtn}
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              id="hamburger-menu-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <motion.path
                  variants={{
                    closed: { d: "M 3 6 L 21 6" },
                    open: { d: "M 4 20 L 20 4" }
                  }}
                  animate={menuOpen ? "open" : "closed"}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.path
                  d="M 3 12 L 21 12"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  animate={menuOpen ? "open" : "closed"}
                  transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.path
                  variants={{
                    closed: { d: "M 3 18 L 21 18" },
                    open: { d: "M 4 4 L 20 20" }
                  }}
                  animate={menuOpen ? "open" : "closed"}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                />
              </svg>
            </button>
          </Magnetic>
        </div>
      </header>

      {/* Full-Screen Overlay Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.menuOverlay}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Animated decorative gradient background mesh blobs */}
            <div className={styles.glowBlob1}></div>
            <div className={styles.glowBlob2}></div>

            <button
              ref={closeBtnRef}
              className={styles.closeBtn}
              onClick={toggleMenu}
              aria-label="Close navigation menu"
              id="close-menu-btn"
            >
              <X size={24} />
            </button>

            <div className={styles.overlayContent}>
              <motion.nav 
                className={styles.mobileNav} 
                aria-label="Mobile"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1
                    }
                  }
                }}
              >
                {[
                  { to: '/', label: 'Home', isLink: true },
                  { to: '/about', label: 'About', isLink: true },
                  { to: '/projects', label: 'Projects', isLink: true },
                  { to: 'skills', label: 'Skills', isLink: false },
                  { to: 'contact', label: 'Contact', isLink: false }
                ].map((item, idx) => {
                  const linkVariants = {
                    hidden: { opacity: 0, x: 50, skewX: 10 },
                    visible: { 
                      opacity: 1, 
                      x: 0, 
                      skewX: 0,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                    }
                  };

                  return (
                    <motion.div key={idx} variants={linkVariants} style={{ overflow: 'hidden' }}>
                      {item.isLink ? (
                        <Link to={item.to} className={styles.mobileNavLink}>
                          {item.label}
                        </Link>
                      ) : (
                        <a href={`#${item.to}`} onClick={(e) => goToSection(e, item.to)} className={styles.mobileNavLink}>
                          {item.label}
                        </a>
                      )}
                    </motion.div>
                  );
                })}
              </motion.nav>

              <motion.div 
                className={styles.overlayFooter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.socials}>
                  <Magnetic>
                    <a href="https://github.com/dhairya-shah13" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github size={24} />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a href="https://linkedin.com/in/dhairya-shah13" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin size={24} />
                    </a>
                  </Magnetic>
                </div>
                <p className={styles.copyright}>© 2026 Dhairya Shah. All rights reserved.</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
