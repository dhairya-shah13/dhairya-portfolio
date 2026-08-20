import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { statsData } from '../data/siteContent.js';
import styles from './Stats.module.css';

function Counter({ value }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const numericValue = parseInt(match[1], 10);
    const suffix = match[2];

    const controls = animate(0, numericValue, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest).toString() + suffix);
      }
    });

    return () => controls.stop();
  }, [value, isInView]);

  return <span ref={ref}>{displayValue}</span>;
}

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
    hidden: { opacity: 0, scale: 0.75, y: 15 },
    show: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 90,
        damping: 11
      }
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
              <span className={`${styles.value} numeral`}>
                <Counter value={stat.value} />
              </span>
              <p className={styles.label}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Stats;
