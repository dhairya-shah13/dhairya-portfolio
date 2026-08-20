import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Award, GraduationCap } from 'lucide-react';
import { educationData, certificationsData } from '../data/siteContent.js';
import styles from './Education.module.css';

function Education() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="education" className="section-light section-padding" style={{ borderTop: '1px solid var(--border-current)' }}>
      <div className="container">
        <div className={styles.grid}>
          
          {/* Education Sub-Section */}
          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.header}>
              <GraduationCap size={24} className={styles.sectionIcon} />
              <h2 className={styles.title}>Education</h2>
            </div>

            <motion.div 
              className={styles.list}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {educationData.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className={styles.row}
                  variants={rowVariants}
                >
                  <span className={`${styles.period} numeral`}>{item.period}</span>
                  <div className={styles.content}>
                    <h3 className={styles.detail}>{item.detail}</h3>
                    <p className={styles.institution}>{item.institution}</p>
                    <span className={styles.note}>{item.note}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Certifications Sub-Section */}
          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div className={styles.header}>
              <Award size={24} className={styles.sectionIcon} />
              <h2 className={styles.title}>Certifications</h2>
            </div>

            <motion.div 
              className={styles.list}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {certificationsData.map((item, idx) => (
                <motion.a 
                  key={idx} 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.rowInteractive}
                  variants={rowVariants}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.certContent}>
                    <h3 className={styles.certName}>{item.name}</h3>
                  </div>
                  <ExternalLink size={16} className={styles.linkIcon} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Education;
