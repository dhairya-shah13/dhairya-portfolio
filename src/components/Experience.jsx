import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';
import { experienceData } from '../data/siteContent.js';
import styles from './Experience.module.css';

function Experience() {
  const listItems = experienceData.bullets;

  return (
    <section id="experience" className="section-light section-padding" style={{ borderTop: '1px solid var(--border-current)' }}>
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Professional History</p>
          <h2 className={styles.title}>Relevant Experience</h2>
        </div>

        <div className={styles.timeline}>
          <motion.div 
            className={styles.timelineItem}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Timeline node dot */}
            <div className={styles.timelineDot}>
              <Briefcase size={16} color="#FFFFFF" />
            </div>

            {/* Main timeline content card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.titleGroup}>
                  <h3 className={styles.role}>{experienceData.role}</h3>
                  <span className={styles.company}>{experienceData.company}</span>
                </div>
                <div className={styles.metaGroup}>
                  <span className={styles.metaLabel}>
                    <Calendar size={14} className={styles.metaIcon} />
                    {experienceData.period}
                  </span>
                  <span className={styles.orgSize}>{experienceData.orgSize}</span>
                </div>
              </div>

              <p className={styles.description}>
                {experienceData.summary}
              </p>

              <ul className={styles.bulletList}>
                {listItems.map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    className={styles.bulletItem}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <span className={styles.bulletDot}></span>
                    <span className={styles.bulletText}>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
