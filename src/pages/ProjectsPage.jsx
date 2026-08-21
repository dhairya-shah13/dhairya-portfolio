import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { projects } from '../data/projects.js';
import { projectImages } from '../data/projectImages.js';
import { buildBreadcrumbSchema } from '../data/schema.js';
import styles from './ProjectsPage.module.css';

const projectsTldr = [
  'Six live software products engineered and shipped end-to-end by Dhairya Shah.',
  'Covering diverse domains: E-commerce, automotive service portals, personal finance tracking, and sales analytics.',
  'Technologies: React.js, Node.js, Express.js, MongoDB, Kotlin, Django, Flask, Docker, and Netlify/Vercel edge hosting.',
  'Structured architecture: decoupled REST APIs, normalized document/relational schemas, and mobile-first responsive design.',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

function ProjectsPage() {
  return (
    <>
      <Seo
        title="Dhairya Shah Projects | Full-Stack, DevOps & Cloud Case Studies"
        description="Explore six live products shipped end-to-end by Dhairya Shah — e-commerce, finance, sales monitoring, service-center and collaborative platforms built with React, Node.js, Express, Kotlin and MongoDB."
        path="/projects"
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />

      <section className={`section-dark ${styles.headerSection}`}>
        <div className="container">
          <p className={styles.eyebrow}>Portfolio & Case Studies</p>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subline}>
            Six products shipped end-to-end by Dhairya Shah — from database schema to server provisioning to
            production URL.
          </p>
        </div>
      </section>

      <section className="section-light section-padding" style={{ paddingTop: 60 }}>
        <div className="container">
          {/* TL;DR Summary Block for Fast AI / Reader Ingestion */}
          <div className={styles.tldrBox}>
            <p className={styles.tldrTitle}>Portfolio Overview (TL;DR)</p>
            <ul className={styles.tldrList}>
              {projectsTldr.map((bullet, idx) => (
                <li key={idx} className={styles.tldrItem}>
                  <strong>{bullet.split(' ')[0]}</strong> {bullet.slice(bullet.indexOf(' ') + 1)}
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, index) => (
              <motion.article key={project.slug} className={styles.card} variants={cardVariants}>
                <div className={styles.thumbnailContainer}>
                  <img
                    src={projectImages[project.image]}
                    alt={`${project.name} — ${project.category} project screenshot`}
                    className={styles.projectImg}
                    loading="lazy"
                    width={800}
                    height={500}
                  />
                  <span className={`${styles.projectIndex} numeral`}>0{index + 1}</span>
                  <div className={styles.tagList}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.meta}>
                  {project.clusterTopic && (
                    <span className={styles.clusterBadge}>{project.clusterTopic}</span>
                  )}
                  <h2 className={styles.projectName}>{project.name}</h2>
                  <p className={styles.projectCategory}>{project.category}</p>
                  <p className={styles.projectDescription}>{project.description}</p>
                </div>

                <div className={styles.linkRow}>
                  {project.detail && (
                    <Link to={`/projects/${project.slug}`} className={styles.caseStudyLink}>
                      Case Study <ArrowRight size={14} />
                    </Link>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                      aria-label={`${project.name} GitHub repository`}
                      title="View GitHub Repository"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                      aria-label={`${project.name} live website`}
                      title="View Live Website"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-light" style={{ borderTop: '1px solid var(--border-current)' }}>
        <div className="container" style={{ padding: '80px 40px' }}>
          <p className={styles.footerNote}>
            Explore more background on the <Link to="/about" className={styles.inlineLink}>About page</Link>, or
            view source repositories on <a href="https://github.com/dhairya-shah13" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>GitHub</a>.
          </p>
        </div>
      </section>
    </>
  );
}

export default ProjectsPage;
