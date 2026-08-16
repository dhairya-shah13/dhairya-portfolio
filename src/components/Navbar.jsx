import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import styles from './Navbar.module.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <a href="#" className={styles.logo} onClick={(e) => handleLinkClick(e, 'hero')}>
            Dhairya<span className="text-accent">˙</span>
          </a>
          
          <nav className={styles.desktopNav}>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className={styles.navLink}>About</a>
            <a href="#work" onClick={(e) => handleLinkClick(e, 'work')} className={styles.navLink}>Work</a>
            <a href="#skills" onClick={(e) => handleLinkClick(e, 'skills')} className={styles.navLink}>Skills</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className={styles.navLink}>Contact</a>
          </nav>

          <button 
            className={styles.hamburgerBtn} 
            onClick={toggleMenu} 
            aria-label="Toggle navigation menu"
            id="hamburger-menu-btn"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Full-Screen Overlay Mobile Menu */}
      <div className={`${styles.menuOverlay} ${menuOpen ? styles.menuOpen : ''}`}>
        <button 
          className={styles.closeBtn} 
          onClick={toggleMenu}
          aria-label="Close navigation menu"
          id="close-menu-btn"
        >
          <X size={24} />
        </button>

        <div className={styles.overlayContent}>
          <nav className={styles.mobileNav}>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className={styles.mobileNavLink}>About</a>
            <a href="#work" onClick={(e) => handleLinkClick(e, 'work')} className={styles.mobileNavLink}>Work</a>
            <a href="#skills" onClick={(e) => handleLinkClick(e, 'skills')} className={styles.mobileNavLink}>Skills</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className={styles.mobileNavLink}>Contact</a>
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
