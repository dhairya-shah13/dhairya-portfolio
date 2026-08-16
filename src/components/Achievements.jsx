import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ExternalLink } from 'lucide-react';
import styles from './Achievements.module.css';

const achievementsData = [
  {
    title: "Winner — Coder's Arcade",
    description: "First place in the competitive coding event testing algorithms, data structures, and problem-solving speed.",
    link: 'https://drive.google.com/file/d/1RKbojVUY9XMGcVzAysu-Oxscl_6k_2Ag/view?usp=drive_link'
  },
  {
    title: "Equal Opportunity Cell — Poster Making Event",
    description: "Awarded recognition for creative graphic design and messaging promoting equality and accessibility.",
    link: 'https://drive.google.com/file/d/1ZQU-2qtGBc-KI9nF12QQkcs7xpLcL6h6/view?usp=drive_link'
  }
];

function Achievements() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="achievements" className="section-light section-padding" style={{ borderTop: '1px solid var(--border-current)' }}>
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Honors & Highlights</p>
          <h2 className={styles.title}>Achievements</h2>
        </div>

        <motion.div 
          className={styles.list}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {achievementsData.map((item, idx) => (
            <motion.a 
              key={idx} 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  <Trophy size={18} />
                </div>
                <div className={styles.textGroup}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDescription}>{item.description}</p>
                </div>
              </div>
              <ExternalLink size={16} className={styles.linkIcon} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Achievements;
