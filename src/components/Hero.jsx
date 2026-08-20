import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, ArrowDown } from 'lucide-react';
import dhairyaPhoto from '../assets/dhairya.jpeg';
import styles from './Hero.module.css';
import Magnetic from './Magnetic.jsx';

// Helper component to split text into words and wrap in a masked animate container
function SplitText({ children, variants }) {
  const words = children.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            variants={variants}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </>
  );
}

function Hero() {
  const heroRef = useRef(null);

  // Mouse follow logic utilizing CSS variables to avoid React re-renders
  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  // Smooth scroll helper using Lenis if available
  const handleScrollClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('intro');
    if (window.lenis && element) {
      window.lenis.scrollTo(element, { offset: -90 });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const titleLineVariants = {
    hidden: { y: "115%", rotate: 3 },
    visible: {
      y: 0,
      rotate: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const sublineVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const blockLeftVariants = {
    hidden: { opacity: 0, x: -40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
    }
  };

  const blockRightVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }
    }
  };

  const photoFrameVariants = {
    hidden: { opacity: 0, scale: 0.92, rotate: -2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 1, type: "spring", stiffness: 60, damping: 15, delay: 0.2 }
    }
  };

  return (
    <section 
      ref={heroRef} 
      id="hero" 
      className={`section-dark ${styles.heroSection}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        className={`container ${styles.heroContainer}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Badge Row */}
        <motion.div className={styles.badgeRow} variants={badgeVariants}>
          <div className={styles.statusBadge}>
            <span className={styles.pulseDot}></span>
            Available for Work
          </div>
          <div className={styles.socialLinks}>
            <Magnetic>
              <a href="https://github.com/dhairya-shah13" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://linkedin.com/in/dhairya-shah13" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            </Magnetic>
          </div>
          <Magnetic>
            <a href="#intro" onClick={handleScrollClick} className={styles.scrollLink}>
              Scroll to view more <ArrowDown size={14} className={styles.arrowIcon} />
            </a>
          </Magnetic>
          <span className={styles.yearBadge}>© 2026</span>
        </motion.div>

        {/* Hero Content Grid (Headline + Collage) */}
        <div className={styles.heroGrid}>
          <div className={styles.textBlock}>
            <h1 className={styles.headline}>
              <span style={{ display: 'block' }}>
                <SplitText variants={titleLineVariants}>Building</SplitText>
              </span>
              <span style={{ display: 'block' }}>
                <span className={styles.outlineText}>
                  <SplitText variants={titleLineVariants}>Reliable</SplitText>
                </span>
                <span> </span>
                <SplitText variants={titleLineVariants}>Products —</SplitText>
              </span>
              <span style={{ display: 'block' }}>
                <span className={styles.overlapContainer}>
                  <SplitText variants={titleLineVariants}>from Database to</SplitText>
                  <span> </span>
                  <span className={styles.accentText}>
                    <SplitText variants={titleLineVariants}>Deployed</SplitText>
                  </span>
                  <span> </span>
                  <SplitText variants={titleLineVariants}>URL</SplitText>
                </span>
              </span>
            </h1>
            
            <motion.p className={styles.subline} variants={sublineVariants}>
              Full-Stack Developer <span className={styles.bullet}>·</span> Cloud & DevOps <span className={styles.bullet}>·</span> Ahmedabad, Gujarat
            </motion.p>
          </div>

          {/* Asymmetric Photo Collage */}
          <div className={styles.collageContainer}>
            {/* Background offset blocks */}
            <motion.div 
              className={`${styles.offsetBlock} ${styles.blockLight}`}
              variants={blockLeftVariants}
            ></motion.div>
            <motion.div 
              className={`${styles.offsetBlock} ${styles.blockDark}`}
              variants={blockRightVariants}
            ></motion.div>
            
            {/* The main photo frame */}
            <motion.div className={styles.photoFrame} variants={photoFrameVariants}>
              <img
                src={dhairyaPhoto}
                alt="Portrait of Dhairya Shah"
                className={styles.profileImg}
                width={640}
                height={640}
                fetchpriority="high"
              />
              
              {/* Floating DS Monogram circular badge */}
              <div className={styles.monogramBadge}>
                <span className={styles.monogramText}>DS</span>
                <span className={styles.monogramSub}>®</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
