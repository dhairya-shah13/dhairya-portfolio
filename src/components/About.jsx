import React from 'react';
import { motion } from 'motion/react';
import dhairyaPhoto from '../assets/dhairya.jpeg';
import styles from './About.module.css';

function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 40, y: 15 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const photoVariants = {
    hidden: { opacity: 0, x: -60, scale: 0.94, rotate: -3 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className="section-light section-padding" style={{ borderTop: '1px solid var(--border-current)' }}>
      <div className="container">
        <div className={styles.grid}>
          {/* Framed Photo Column */}
          <motion.div 
            className={styles.photoColumn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={photoVariants}
          >
            <div className={styles.photoFrame}>
              <img src={dhairyaPhoto} alt="Dhairya Shah Profile Photo" className={styles.profileImg} />
            </div>
            <div className={styles.labelWrapper}>
              <span className={`${styles.labelIndex} numeral`}>SDE / PL</span>
              <p className={styles.photoLabel}>
                <strong>Dhairya Shah</strong> <br />
                Full-Stack Developer & Project Lead
              </p>
            </div>
          </motion.div>

          {/* Narrative Column */}
          <motion.div 
            className={styles.narrativeColumn}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p className={styles.eyebrow} variants={itemVariants}>The Narrative</motion.p>
            <motion.h2 className={styles.mainTitle} variants={itemVariants}>
              Combining Software Architecture with Cloud Readiness
            </motion.h2>
            <div className={styles.bioContent}>
              <motion.p className={styles.paragraph} variants={itemVariants}>
                Proficient across the MERN stack (MongoDB, Express, React, Node.js) and Python-based frameworks like Django and Flask. I build robust back-end systems and fluid, responsive front-end interfaces, ensuring tight API contracts and seamless data synchronization.
              </motion.p>
              <motion.p className={styles.paragraph} variants={itemVariants}>
                My engineering focus is heavily oriented toward infrastructure management. I leverage Docker for service containerization, set up automated CI/CD deployment pipelines (GitHub Actions), and author Linux shell scripts to provision and manage VPS hosts (Hostinger).
              </motion.p>
              <motion.p className={styles.paragraph} variants={itemVariants}>
                As a project leader, I've managed source control and coordinated collaborative team workflows via Git/GitHub, taking multiple concurrent software products from initial concept to company-wide production use.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
