import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { focusAreasData as baseFocusAreas } from '../data/siteContent.js';
import styles from './FocusAreas.module.css';

// Import focus area images (user can replace these files directly)
import focus1 from '../assets/focus1.jpg';
import focus2 from '../assets/focus2.jpg';
import focus3 from '../assets/focus3.jpg';
import focus4 from '../assets/focus4.jpg';

const focusImages = [focus1, focus2, focus3, focus4];
const focusAreasData = baseFocusAreas.map((item, index) => ({
  ...item,
  image: focusImages[index] || focus1,
}));

function FocusAreas() {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelCardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [-200, 200], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-200, 200], [-8, 8]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = panelCardRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      x.set(mouseX);
      y.set(mouseY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.96 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, type: "spring", stiffness: 70, damping: 13 }
    }
  };

  const panelVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, delay: 0.15 }
    }
  };

  return (
    <section id="focus" className="section-dark section-padding">
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className={styles.header} variants={headerVariants}>
          <p className={styles.eyebrow}>Services & Domain</p>
          <h2 className={styles.title}>Core Focus Areas</h2>
        </motion.div>

        <div className={styles.layoutGrid}>
          {/* Left Column: Numbered List */}
          <div className={styles.listContainer}>
            {focusAreasData.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div 
                  key={item.id}
                  className={`${styles.row} ${isActive ? styles.rowActive : styles.rowDimmed}`}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    handleMouseLeave(); // Reset rotation when card content switches
                  }}
                  onClick={() => setActiveIndex(index)}
                  variants={rowVariants}
                >
                  <div className={styles.rowHeader}>
                    <span className={`${styles.index} numeral`}>{item.id}</span>
                    <span className={styles.rowTitle}>{item.title}</span>
                  </div>
                  
                  {/* Mobile-only descriptive stack layout (Stacks underneath when active) */}
                  <div className={`${styles.mobileDescriptionPanel} ${isActive ? styles.mobileOpen : ''}`}>
                    <p className={styles.mobileDescription}>{item.description}</p>
                    <div className={styles.mobileGraphic}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className={styles.visualImg} 
                      />
                      <div className={styles.gridOverlay}></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Desktop Panel with Switch/Cross-fade */}
          <motion.div className={styles.desktopPanel} variants={panelVariants}>
            <AnimatePresence mode="wait">
              <motion.div 
                ref={panelCardRef}
                key={activeIndex}
                className={styles.panelCard}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.gradientVisual} style={{ transform: "translateZ(30px)" }}>
                  <img 
                    src={focusAreasData[activeIndex].image} 
                    alt={focusAreasData[activeIndex].title} 
                    className={styles.visualImg} 
                  />
                  <div className={styles.gridOverlay}></div>
                </div>
                
                <p className={styles.panelDescription} style={{ transform: "translateZ(15px)" }}>
                  {focusAreasData[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default FocusAreas;
