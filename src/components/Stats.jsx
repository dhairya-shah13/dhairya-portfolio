import React from 'react';
import { motion } from 'motion/react';
import { statsData } from '../data/siteContent.js';
import styles from './Stats.module.css';

function Stats() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="section-light" style={{ padding: '80px 0', borderTop: '1px solid var(--border-current)', borderBottom: '1px solid var(--border-current)' }}>
      <div className="container">
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {statsData.map((stat, idx) => (
            <motion.div 
              key={idx} 
              className={styles.statBox}
              variants={itemVariants}
            >
              <span className={`${styles.value} numeral`}>{stat.value}</span>
              <p className={styles.label}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Stats;
