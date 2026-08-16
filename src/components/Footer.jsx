import React from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';

function Footer() {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={`section-dark ${styles.footer}`}>
      <div className="container">
        
        {/* Top footer row: Link columns & Wordmark */}
        <div className={styles.topRow}>
          
          {/* Logo / Links left */}
          <div className={styles.linksBlock}>
            <div className={styles.linkColumn}>
              <span className={styles.columnHeader}>Map</span>
              <a href="#hero" onClick={(e) => handleLinkClick(e, 'hero')} className={styles.link}>Home</a>
              <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className={styles.link}>About</a>
              <a href="#work" onClick={(e) => handleLinkClick(e, 'work')} className={styles.link}>Work</a>
              <a href="#skills" onClick={(e) => handleLinkClick(e, 'skills')} className={styles.link}>Skills</a>
              <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className={styles.link}>Contact</a>
            </div>

            <div className={styles.linkColumn}>
              <span className={styles.columnHeader}>Socials</span>
              <a href="https://github.com/dhairya-shah13" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
              <a href="https://linkedin.com/in/dhairya-shah13" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
            </div>
          </div>

          {/* Scroll to top button right */}
          <button onClick={handleScrollToTop} className={styles.topBtn} aria-label="Scroll back to top">
            Back to Top
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Huge Wordmark Branding */}
        <div className={styles.wordmarkContainer}>
          <h2 className={styles.wordmark}>
            Dhairya <span className={styles.wordmarkOutline}>Shah</span>
          </h2>
        </div>

        {/* Bottom copyright bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© 2026 Dhairya Shah. All rights reserved.</p>
          <span className={`${styles.monogram} numeral`}>DS®</span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
