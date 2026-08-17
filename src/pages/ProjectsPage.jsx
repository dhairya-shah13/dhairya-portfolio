import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { projects } from '../data/projects.js';
import { projectImages } from '../data/projectImages.js';
import { buildBreadcrumbSchema } from '../data/schema.js';
import styles from './ProjectsPage.module.css';

function ProjectsPage() {
  return (
    <>
      <Seo
        title="Dhairya Shah Projects | Full-Stack, DevOps & Cloud"
        description="Six live products shipped end-to-end by Dhairya Shah — e-commerce, finance, sales monitoring, service-center and collaborative platforms built with React, Node.js, Django, Flask and MongoDB."
        path="/projects"
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }])} />

      <section className={`section-dark ${styles.headerSection}`}>
        <div className="container">
          <p className={styles.eyebrow}>Portfolio</p>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subline}>
            Six products shipped end-to-end by Dhairya Shah — from database schema to server provisioning to
            production URL.
          </p>
        </div>
      </section>

      <section className="section-light section-padding" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className={styles.grid}>
            {projects.map((project, index) => (
              <article key={project.slug} className={styles.card}>
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light" style={{ borderTop: '1px solid var(--border-current)' }}>
        <div className="container" style={{ padding: '80px 40px' }}>
          <p className={styles.footerNote}>
            More about Dhairya Shah on the <Link to="/about" className={styles.inlineLink}>About page</Link>, or
            browse his <a href="https://github.com/dhairya-shah13" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>GitHub</a>.
          </p>
        </div>
      </section>
    </>
  );
}

export default ProjectsPage;
