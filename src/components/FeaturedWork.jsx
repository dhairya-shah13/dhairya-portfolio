import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Lock, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects.js';
import { projectImages } from '../data/projectImages.js';
import styles from './FeaturedWork.module.css';

function FeaturedWork() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
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
            <motion.div key={project.slug} className={styles.card} variants={cardVariants} whileHover="hover">
              {/* Card Thumbnail Area */}
              <div className={styles.thumbnailContainer}>
                <div className={styles.tagList}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <span className={`${styles.projectIndex} numeral`}>{project.image.slice(-1)}</span>

                <img
                  src={projectImages[project.image]}
                  alt={`${project.name} — ${project.category} project screenshot`}
                  className={styles.projectImg}
                  loading="lazy"
                  width={800}
                  height={500}
                />

                {/* LIQUID GLASS OVERLAY ON HOVER */}
                <div className={styles.liquidGlassOverlay}>
                  <div className={styles.gridOverlay}></div>

                  <div className={styles.buttonGroup}>
                    {project.detail && (
                      <Link
                        to={`/projects/${project.slug}`}
                        className={styles.overlayBtn}
                        id={`case-study-link-${project.slug}`}
                      >
                        <ArrowRight size={18} />
                        <span>Case Study</span>
                      </Link>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.overlayBtn}
                        title="View GitHub Repository"
                        id={`github-link-${project.slug}`}
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
                        id={`live-link-${project.slug}`}
                      >
                        <ExternalLink size={18} />
                        <span>Live Site</span>
                      </a>
                    )}

                    {!project.github && !project.live && !project.detail && (
                      <div className={styles.privateLabel}>
                        <Lock size={14} />
                        <span>Code Private</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
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
