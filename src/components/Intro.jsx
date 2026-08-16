import React from 'react';
import { motion } from 'motion/react';
import styles from './Intro.module.css';

function Intro() {
  return (
    <section id="intro" className="section-light section-padding">
      <div className="container">
        <motion.div 
          className={styles.contentWrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.eyebrow}>Projects I'm proud of</p>
          
          <div className={styles.grid}>
            <h2 className={styles.headline}>
              Six products,<br />
              shipped <span className="text-accent">end-to-end</span>
            </h2>
            
            <div className={styles.paragraphWrapper}>
              <p className={styles.description}>
                Full-stack developer with hands-on cloud deployment experience — six live products shipped end-to-end, from database schema to server provisioning to production URL.
              </p>
              <div className={styles.divider}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Intro;
