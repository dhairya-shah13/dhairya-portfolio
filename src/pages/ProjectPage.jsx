import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Github, ExternalLink, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { getProjectBySlug, projects } from '../data/projects.js';
import { projectImages } from '../data/projectImages.js';
import { buildBreadcrumbSchema, buildProjectSchema } from '../data/schema.js';
import styles from './ProjectPage.module.css';

function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  // Depth-gated pages only exist for detail projects; anything else 404s.
  if (!project || !project.detail) {
    return <Navigate to="/404" replace />;
  }

  const related = (project.relatedSlugs || [])
    .map((s) => projects.find((p) => p.slug === s))
    .filter(Boolean);

  const title = `${project.name} — Project | Dhairya Shah`;

  return (
    <>
      <Seo
        title={title}
        description={`${project.description} Built by Dhairya Shah (${project.tags.join(', ')}).`}
        path={`/projects/${project.slug}`}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.name, path: `/projects/${project.slug}` },
        ])}
      />
      <JsonLd data={buildProjectSchema(project)} />

      <section className={`section-dark ${styles.headerSection}`}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/" className={styles.crumb}>
              Home
            </Link>
            <span className={styles.crumbSep}>/</span>
            <Link to="/projects" className={styles.crumb}>
              Projects
            </Link>
            <span className={styles.crumbSep}>/</span>
            <span className={`${styles.crumb} ${styles.crumbCurrent}`}>{project.name}</span>
          </nav>

          <p className={styles.eyebrow}>{project.category}</p>
          <h1 className={styles.title}>{project.name}</h1>

          <div className={styles.linksRow}>
            <Link to="/projects" className={styles.backLink}>
              <ArrowLeft size={14} /> All Projects
            </Link>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                <Github size={16} /> GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                <ExternalLink size={16} /> Live Site
              </a>
            )}
            {!project.github && !project.live && (
              <span className={styles.privateLabel}>
                <Lock size={14} /> Code Private
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="section-light section-padding" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainColumn}>
              <div className={styles.imageFrame}>
                <img
                  src={projectImages[project.image]}
                  alt={`${project.name} — ${project.category} project screenshot`}
                  className={styles.projectImg}
                  width={1200}
                  height={750}
                />
              </div>

              <h2 className={styles.sectionHeading}>Overview</h2>
              <p className={styles.paragraph}>{project.description}</p>

              <h2 className={styles.sectionHeading}>Dhairya's Role</h2>
              <p className={styles.paragraph}>{project.role}</p>

              <h2 className={styles.sectionHeading}>Technology Stack</h2>
              <div className={styles.tagList}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <aside className={styles.sideColumn}>
              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>About the Developer</h3>
                <p className={styles.sideText}>
                  This project was built by Dhairya Shah, a full-stack developer and DevOps engineer based in
                  Ahmedabad, Gujarat.
                </p>
                <Link to="/about" className={styles.sideLink}>
                  About Dhairya Shah <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <div className={styles.relatedBlock}>
              <h2 className={styles.sectionHeading}>Related Projects</h2>
              <div className={styles.relatedGrid}>
                {related.map((rel) => (
                  <Link key={rel.slug} to={`/projects/${rel.slug}`} className={styles.relatedCard}>
                    <span className={styles.relatedName}>{rel.name}</span>
                    <span className={styles.relatedCategory}>{rel.category}</span>
                    <ArrowRight size={14} className={styles.relatedArrow} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProjectPage;
