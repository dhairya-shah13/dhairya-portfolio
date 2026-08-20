import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import styles from './Cta.module.css';
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

function Cta() {
  const ctaRef = useRef(null);

  // Mouse follow logic utilizing CSS variables to avoid React re-renders
  const handleMouseMove = (e) => {
    const rect = ctaRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctaRef.current.style.setProperty('--mouse-x', `${x}px`);
      ctaRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const handleScrollClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (window.lenis && element) {
      window.lenis.scrollTo(element, { offset: -90 });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.25
      }
    }
  };

  const titleLineVariants = {
    hidden: { y: "115%", rotate: 2 },
    visible: {
      y: 0,
      rotate: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const sublineVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }
    }
  };

  return (
    <section className="section-light section-padding" style={{ borderTop: '1px solid var(--border-current)', overflow: 'hidden' }}>
      <div className="container">
        <motion.div 
          ref={ctaRef}
          className={styles.wrapper}
          initial={{ opacity: 0, scale: 0.92, clipPath: "circle(15% at 50% 50%)" }}
          whileInView={{ opacity: 1, scale: 1, clipPath: "circle(100% at 50% 50%)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          variants={containerVariants}
        >
          <h2 className={styles.title}>
            <span style={{ display: 'block' }}>
              <SplitText variants={titleLineVariants}>Let's build</SplitText>
            </span>
            <span style={{ display: 'block' }}>
              <SplitText variants={titleLineVariants}>something that</SplitText>{' '}
              <span className="text-accent">
                <SplitText variants={titleLineVariants}>ships.</SplitText>
              </span>
            </span>
          </h2>
          
          <motion.p className={styles.subline} variants={sublineVariants}>
            Currently open to full-stack, cloud, and DevOps engineering opportunities.
          </motion.p>

          <Magnetic>
            <motion.a 
              href="#contact" 
              onClick={handleScrollClick} 
              className={styles.ctaButton}
              variants={buttonVariants}
            >
              Get In Touch
              <ArrowRight size={18} className={styles.arrowIcon} />
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

export default Cta;
