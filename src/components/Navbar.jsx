import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import styles from './Navbar.module.css';

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
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            Dhairya<span className="text-accent">˙</span>
          </Link>

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

          <button
            ref={hamburgerRef}
            className={styles.hamburgerBtn}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            id="hamburger-menu-btn"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Full-Screen Overlay Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${styles.menuOverlay} ${menuOpen ? styles.menuOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
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
          <nav className={styles.mobileNav} aria-label="Mobile">
            <Link to="/" className={styles.mobileNavLink}>
              Home
            </Link>
            <Link to="/about" className={styles.mobileNavLink}>
              About
            </Link>
            <Link to="/projects" className={styles.mobileNavLink}>
              Projects
            </Link>
            <a href="#skills" onClick={(e) => goToSection(e, 'skills')} className={styles.mobileNavLink}>
              Skills
            </a>
            <a href="#contact" onClick={(e) => goToSection(e, 'contact')} className={styles.mobileNavLink}>
              Contact
            </a>
          </nav>

          <div className={styles.overlayFooter}>
            <div className={styles.socials}>
              <a href="https://github.com/dhairya-shah13" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/dhairya-shah13" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
            </div>
            <p className={styles.copyright}>© 2026 Dhairya Shah. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
