import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Database, Cloud, FileCode, CheckCircle2 } from 'lucide-react';
import styles from './Skills.module.css';

const skillsData = [
  {
    category: 'Languages',
    icon: <FileCode size={20} />,
    items: ['Python', 'Java', 'Kotlin', 'JavaScript', 'C', 'C++']
  },
  {
    category: 'Frameworks & Libraries',
    icon: <Cpu size={20} />,
    items: ['React.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'RESTful APIs']
  },
  {
    category: 'Frontend Development',
    icon: <Terminal size={20} />,
    items: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'CSS Modules']
  },
  {
    category: 'Databases',
    icon: <Database size={20} />,
    items: ['SQL', 'MongoDB', 'Schema Design', 'Query Optimization']
  },
  {
    category: 'Cloud & DevOps',
    icon: <Cloud size={20} />,
    items: ['Docker', 'CI/CD (GitHub Actions)', 'Linux/Shell Scripting', 'Git / GitHub', 'Hostinger VPS']
  }
];

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
          {skillsData.map((skillGroup, idx) => (
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
