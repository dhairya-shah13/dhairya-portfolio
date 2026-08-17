import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUp, FileText } from 'lucide-react';
import { resumeUrl } from '../data/person.js';
import styles from './Footer.module.css';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (e, id) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <footer className={`section-dark ${styles.footer}`}>
      <div className="container">
        {/* Top footer row: Link columns & Wordmark */}
        <div className={styles.topRow}>
          <div className={styles.linksBlock}>
            <div className={styles.linkColumn}>
              <span className={styles.columnHeader}>Map</span>
              <Link to="/" className={styles.link}>
                Home
              </Link>
              <Link to="/about" className={styles.link}>
                About
              </Link>
              <Link to="/projects" className={styles.link}>
                Projects
              </Link>
              <a href="#skills" onClick={(e) => handleSectionClick(e, 'skills')} className={styles.link}>
                Skills
              </a>
              <a href="#contact" onClick={(e) => handleSectionClick(e, 'contact')} className={styles.link}>
                Contact
              </a>
            </div>

            <div className={styles.linkColumn}>
              <span className={styles.columnHeader}>Resources</span>
              <a href={resumeUrl} className={styles.link} download>
                <FileText size={13} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Resume (PDF)
              </a>
              <a href="https://github.com/dhairya-shah13" target="_blank" rel="noopener noreferrer" className={styles.link}>
                GitHub
              </a>
              <a href="https://linkedin.com/in/dhairya-shah13" target="_blank" rel="noopener noreferrer" className={styles.link}>
                LinkedIn
              </a>
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
