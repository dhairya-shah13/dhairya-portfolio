import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

  return (
    <section id="focus" className="section-dark section-padding">
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Services & Domain</p>
          <h2 className={styles.title}>Core Focus Areas</h2>
        </div>

        <div className={styles.layoutGrid}>
          {/* Left Column: Numbered List */}
          <div className={styles.listContainer}>
            {focusAreasData.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div 
                  key={item.id}
                  className={`${styles.row} ${isActive ? styles.rowActive : styles.rowDimmed}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
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
                </div>
              );
            })}
          </div>

          {/* Right Column: Desktop Panel with Switch/Cross-fade */}
          <div className={styles.desktopPanel}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                className={styles.panelCard}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className={styles.gradientVisual}>
                  <img 
                    src={focusAreasData[activeIndex].image} 
                    alt={focusAreasData[activeIndex].title} 
                    className={styles.visualImg} 
                  />
                  <div className={styles.gridOverlay}></div>
                </div>
                
                <p className={styles.panelDescription}>
                  {focusAreasData[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FocusAreas;
