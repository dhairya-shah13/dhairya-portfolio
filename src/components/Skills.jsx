import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Database, Cloud, FileCode, CheckCircle2 } from 'lucide-react';
import { skillsData } from '../data/siteContent.js';
import styles from './Skills.module.css';

const categoryIcons = {
  Languages: <FileCode size={20} />,
  'Frameworks & Libraries': <Cpu size={20} />,
  'Frontend Development': <Terminal size={20} />,
  Databases: <Database size={20} />,
  'Cloud & DevOps': <Cloud size={20} />,
};

const enrichedSkills = skillsData.map((group) => ({
  ...group,
  icon: categoryIcons[group.category] || <Terminal size={20} />,
}));

function Skills() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="skills" className="section-light section-padding" style={{ borderTop: '1px solid var(--border-current)' }}>
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Capabilities & Stack</p>
          <h2 className={styles.title}>Skills Landscape</h2>
        </div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {enrichedSkills.map((skillGroup, idx) => (
            <motion.div 
              key={idx} 
              className={styles.skillCard}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
            >
              <div className={styles.cardTitleRow}>
                <div className={styles.iconWrapper}>
                  {skillGroup.icon}
                </div>
                <h3 className={styles.categoryName}>{skillGroup.category}</h3>
              </div>

              <div className={styles.pillsContainer}>
                {skillGroup.items.map((skill, sIdx) => (
                  <span key={sIdx} className={styles.pill}>
                    <CheckCircle2 size={12} className={styles.pillIcon} />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
