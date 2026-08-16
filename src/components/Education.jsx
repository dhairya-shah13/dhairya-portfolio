import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Award, GraduationCap } from 'lucide-react';
import styles from './Education.module.css';

const educationData = [
  {
    period: 'Ongoing',
    detail: 'B.Tech, Information Technology',
    institution: 'Charotar University of Science and Technology (CHARUSAT)',
    note: '5th Semester · CGPA 7.5/10'
  },
  {
    period: '—',
    detail: 'Higher Secondary Certificate (Class XII)',
    institution: 'Seventh Day Adventist Higher Secondary School',
    note: '94%'
  },
  {
    period: '—',
    detail: 'Secondary School Certificate (Class X)',
    institution: 'Divine Gurukulam',
    note: '92%'
  }
];

const certificationsData = [
  {
    name: 'Microsoft Azure AI Fundamentals (AI-900) Exam Prep',
    link: 'https://drive.google.com/file/d/1Gie3IFLzNG0VFVr5YIQ-7u_HkH3bo7uO/view?usp=drive_link'
  },
  {
    name: 'Core Java Certificate',
    link: 'https://drive.google.com/file/d/1dNBnz-2SglwnQynxwL-NpWjcND2GEGt1/view?usp=drive_link'
  },
  {
    name: 'Advanced SQLite Queries with Belkasoft',
    link: 'https://drive.google.com/file/d/18x-Om5JWlMEEG1x_fNP3Vrcd_nFHdSfK/view?usp=drive_link'
  }
];

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
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="education" className="section-light section-padding" style={{ borderTop: '1px solid var(--border-current)' }}>
      <div className="container">
        <div className={styles.grid}>
          
          {/* Education Sub-Section */}
          <div className={styles.column}>
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
          </div>

          {/* Certifications Sub-Section */}
          <div className={styles.column}>
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
          </div>

        </div>
      </div>
    </section>
  );
}

export default Education;
