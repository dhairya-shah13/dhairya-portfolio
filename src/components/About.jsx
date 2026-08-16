import React from 'react';
import { motion } from 'motion/react';
import dhairyaPhoto from '../assets/dhairya.jpeg';
import styles from './About.module.css';

function About() {
  return (
    <section id="about" className="section-light section-padding" style={{ borderTop: '1px solid var(--border-current)' }}>
      <div className="container">
        <div className={styles.grid}>
          {/* Framed Photo Column */}
          <motion.div 
            className={styles.photoColumn}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Narrative Narrative Column */}
          <motion.div 
            className={styles.narrativeColumn}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p className={styles.eyebrow}>The Narrative</p>
            <h2 className={styles.mainTitle}>
              Combining Software Architecture with Cloud Readiness
            </h2>
            <div className={styles.bioContent}>
              <p className={styles.paragraph}>
                Proficient across the MERN stack (MongoDB, Express, React, Node.js) and Python-based frameworks like Django and Flask. I build robust back-end systems and fluid, responsive front-end interfaces, ensuring tight API contracts and seamless data synchronization.
              </p>
              <p className={styles.paragraph}>
                My engineering focus is heavily oriented toward infrastructure management. I leverage Docker for service containerization, set up automated CI/CD deployment pipelines (GitHub Actions), and author Linux shell scripts to provision and manage VPS hosts (Hostinger).
              </p>
              <p className={styles.paragraph}>
                As a project leader, I've managed source control and coordinated collaborative team workflows via Git/GitHub, taking multiple concurrent software products from initial concept to company-wide production use.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
