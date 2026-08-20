import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Lock, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects.js';
import { projectImages } from '../data/projectImages.js';
import styles from './FeaturedWork.module.css';

function ProjectCard({ project, variants }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to interpolate 3D rotations based on coordinates
  const rotateX = useSpring(useTransform(y, [-200, 200], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-8, 8]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      x.set(mouseX);
      y.set(mouseY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Card Thumbnail Area */}
      <div className={styles.thumbnailContainer} style={{ transform: "translateZ(30px)" }}>
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
      <div className={styles.meta} style={{ transform: "translateZ(15px)" }}>
        <h3 className={styles.projectName}>{project.name}</h3>
        <p className={styles.projectCategory}>{project.category}</p>
      </div>
    </motion.div>
  );
}

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
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="work" className="section-light section-padding" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className={styles.sectionHeader} style={{ marginBottom: '48px' }}>
          <p className={styles.eyebrow}>Selected Projects</p>
          <h2 className={styles.title}>Featured Work</h2>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{ perspective: 1200 }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} variants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedWork;
