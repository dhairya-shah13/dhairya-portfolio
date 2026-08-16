import React from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, Lock } from 'lucide-react';
import styles from './FeaturedWork.module.css';

// Import local project image placeholders
import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.jpg';
import project4 from '../assets/project4.jpg';
import project5 from '../assets/project5.jpg';
import project6 from '../assets/project6.jpg';

const projects = [
  {
    id: 1,
    name: 'Akids Enterprise',
    category: 'E-commerce Platform',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: project1,
    github: 'https://github.com/dhairya-shah13/Akids-Enterpise',
    live: 'https://www.akidsenterprise.com/'
  },
  {
    id: 2,
    name: 'Meghdoot Motors',
    category: 'Maruti Suzuki Authorized Service Center',
    tags: ['React', 'HTML', 'CSS', 'JS'],
    image: project2,
    github: 'https://github.com/dhairya-shah13/Meghdoot',
    live: 'https://meghdootmotors.netlify.app/'
  },
  {
    id: 3,
    name: 'Fintrack',
    category: 'Personal Finance Management App',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Kotlin'],
    image: project3,
    github: 'https://github.com/dhairya-shah13/FinTrack',
    live: null // GitHub only
  },
  {
    id: 4,
    name: 'Aarisha',
    category: 'Collaborative Web Platform',
    tags: ['Live Site', 'Team Build'],
    image: project4,
    github: 'https://github.com/vishuchavda78/Aarisha',
    live: 'https://aarisha.vercel.app/'
  },
  {
    id: 5,
    name: 'Shrinath',
    category: 'Sales Monitoring System',
    tags: ['Small-Business Sales Tracking'],
    image: project5,
    github: 'https://github.com/dhairya-shah13/Shrinath-SalesMonitoring',
    live: null // GitHub only
  },
  {
    id: 6,
    name: 'HRMS',
    category: 'HR Management System (Odoo Hackathon)',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: project6,
    github: null, // Code private
    live: null
  }
];

function FeaturedWork() {
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
    <section id="work" className="section-light section-padding" style={{ paddingTop: 0 }}>
      <div className="container">
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              className={styles.card}
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Card Thumbnail Area */}
              <div className={styles.thumbnailContainer}>
                
                {/* Tech tags floating */}
                <div className={styles.tagList}>
                  {project.tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                {/* Framed overlay for project index */}
                <span className={`${styles.projectIndex} numeral`}>0{project.id}</span>

                {/* The main project image */}
                <img src={project.image} alt={project.name} className={styles.projectImg} />

                {/* LIQUID GLASS OVERLAY ON HOVER */}
                <div className={styles.liquidGlassOverlay}>
                  <div className={styles.gridOverlay}></div>
                  
                  {/* Two Buttons: GitHub & Live Site */}
                  <div className={styles.buttonGroup}>
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.overlayBtn}
                        title="View GitHub Repository"
                        id={`github-link-${project.id}`}
                      >
                        <Github size={18} />
                        <span>GitHub</span>
                      </a>
                    )}
                    
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.overlayBtn}
                        title="View Live Website"
                        id={`live-link-${project.id}`}
                      >
                        <ExternalLink size={18} />
                        <span>Live Site</span>
                      </a>
                    )}

                    {!project.github && !project.live && (
                      <div className={styles.privateLabel}>
                        <Lock size={14} />
                        <span>Code Private</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Meta Content (Outside hover blur so it stays sharp) */}
              <div className={styles.meta}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectCategory}>{project.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedWork;
