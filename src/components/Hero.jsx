import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, ArrowDown } from 'lucide-react';
import dhairyaPhoto from '../assets/dhairya.jpeg';
import styles from './Hero.module.css';

function Hero() {
  // Smooth scroll helper
  const handleScrollClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('intro');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } // Custom decelerating ease
    }
  };

  const collageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero" className={`section-dark ${styles.heroSection}`}>
      <motion.div 
        className={`container ${styles.heroContainer}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Badge Row */}
        <motion.div className={styles.badgeRow} variants={itemVariants}>
          <div className={styles.statusBadge}>
            <span className={styles.pulseDot}></span>
            Available for Work
          </div>
          <div className={styles.socialLinks}>
            <a href="https://github.com/dhairya-shah13" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href="https://linkedin.com/in/dhairya-shah13" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
          </div>
          <a href="#intro" onClick={handleScrollClick} className={styles.scrollLink}>
            Scroll to view more <ArrowDown size={14} className={styles.arrowIcon} />
          </a>
          <span className={styles.yearBadge}>© 2026</span>
        </motion.div>

        {/* Hero Content Grid (Headline + Collage) */}
        <div className={styles.heroGrid}>
          <div className={styles.textBlock}>
            <motion.h1 className={styles.headline} variants={itemVariants}>
              Building <br />
              <span className={styles.outlineText}>Reliable</span> Products — <br />
              <span className={styles.overlapContainer}>
                from Database to <span className={styles.accentText}>Deployed</span> URL
              </span>
            </motion.h1>
            
            <motion.p className={styles.subline} variants={itemVariants}>
              Full-Stack Developer <span className={styles.bullet}>·</span> Cloud & DevOps <span className={styles.bullet}>·</span> Ahmedabad, Gujarat
            </motion.p>
          </div>

          {/* Asymmetric Photo Collage */}
          <motion.div className={styles.collageContainer} variants={collageVariants}>
            {/* Background offset blocks */}
            <div className={`${styles.offsetBlock} ${styles.blockLight}`}></div>
            <div className={`${styles.offsetBlock} ${styles.blockDark}`}></div>
            
            {/* The main photo frame */}
            <div className={styles.photoFrame}>
              <img src={dhairyaPhoto} alt="Dhairya Shah Portrait" className={styles.profileImg} />
              
              {/* Floating DS Monogram circular badge */}
              <div className={styles.monogramBadge}>
                <span className={styles.monogramText}>DS</span>
                <span className={styles.monogramSub}>®</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
