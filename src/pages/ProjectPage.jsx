import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Github, ExternalLink, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { getProjectBySlug, projects } from '../data/projects.js';
import { blogPosts } from '../data/blogs.js';
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

  const relatedBlogs = (project.relatedBlogSlugs || [])
    .map((s) => blogPosts.find((b) => b.slug === s))
    .filter(Boolean);

  const title = `${project.name} — Technical Case Study | Dhairya Shah`;

  return (
    <>
      <Seo
        title={title}
        description={`${project.description} Engineered and deployed by Dhairya Shah (${project.tags.join(', ')}).`}
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

          {project.clusterTopic && (
            <span className={styles.clusterBadge}>{project.clusterTopic}</span>
          )}
          <p className={styles.eyebrow}>{project.category}</p>
          <h1 className={styles.title}>{project.name}</h1>

          <div className={styles.linksRow}>
            <Link to="/projects" className={styles.backLink}>
              <ArrowLeft size={14} /> All Projects
            </Link>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                <Github size={16} /> GitHub Repository
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                <ExternalLink size={16} /> Live Application
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

      <section className="section-light section-padding" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainColumn}>
              {/* Project Hero Image */}
              <div className={styles.imageFrame}>
                <img
                  src={projectImages[project.image]}
                  alt={`${project.name} — ${project.category} case study screenshot`}
                  className={styles.projectImg}
                  width={1200}
                  height={750}
                />
              </div>

              {/* TL;DR Summary Block (AEO / GEO Direct Ingestion) */}
              {project.tldr && project.tldr.length > 0 && (
                <div className={styles.tldrBox}>
                  <p className={styles.tldrTitle}>Case Study Summary (TL;DR)</p>
                  <ul className={styles.tldrList}>
                    {project.tldr.map((bullet, idx) => (
                      <li key={idx} className={styles.tldrItem}>
                        <strong>{bullet.split(' ')[0]}</strong> {bullet.slice(bullet.indexOf(' ') + 1)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Specifications Table */}
              {project.specs && (
                <div>
                  <h2 className={styles.sectionHeading}>Technical Specifications</h2>
                  <div className={styles.specTable}>
                    {Object.entries(project.specs).map(([key, val]) => (
                      <div key={key} className={styles.specRow}>
                        <span className={styles.specKey}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className={styles.specVal}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Overview */}
              <h2 className={styles.sectionHeading}>Project Overview</h2>
              <p className={styles.paragraph}>{project.description}</p>

              {/* Problem Statement */}
              {project.problem && (
                <>
                  <h2 className={styles.sectionHeading}>The Challenge</h2>
                  <p className={styles.paragraph}>{project.problem}</p>
                </>
              )}

              {/* Architectural Solution */}
              {project.solution && (
                <>
                  <h2 className={styles.sectionHeading}>Engineering Solution & Architecture</h2>
                  <p className={styles.paragraph}>{project.solution}</p>
                </>
              )}

              {/* Key Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <>
                  <h2 className={styles.sectionHeading}>Key Deliverables & Highlights</h2>
                  <ul className={styles.highlightsList}>
                    {project.highlights.map((h, i) => (
                      <li key={i} className={styles.highlightItem}>
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Dhairya's Role */}
              <h2 className={styles.sectionHeading}>Dhairya's Direct Role</h2>
              <p className={styles.paragraph}>{project.role}</p>

              {/* Technology Stack */}
              <h2 className={styles.sectionHeading}>Technologies & Tools</h2>
              <div className={styles.tagList}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sticky Sidebar */}
            <aside className={styles.sideColumn}>
              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>Lead Engineer</h3>
                <p className={styles.sideText}>
                  This project was designed, built, and deployed by Dhairya Shah — a full-stack developer & DevOps
                  engineer based in Ahmedabad, Gujarat.
                </p>
                <Link to="/about" className={styles.sideLink}>
                  About Dhairya Shah <ArrowRight size={14} />
                </Link>
                <Link to="/projects" className={styles.sideLink}>
                  Browse All Case Studies <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          </div>

          {/* Related Cluster Projects */}
          {related.length > 0 && (
            <div className={styles.relatedBlock}>
              <h2 className={styles.sectionHeading}>Related Technical Case Studies</h2>
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

          {/* Related Engineering Guides & Technical Articles */}
          {relatedBlogs.length > 0 && (
            <div className={styles.relatedBlock}>
              <h2 className={styles.sectionHeading}>Related Engineering Guides & Architecture Breakdowns</h2>
              <div className={styles.relatedGrid}>
                {relatedBlogs.map((b) => (
                  <Link key={b.slug} to={`/blogs/${b.slug}`} className={styles.relatedCard}>
                    <span className={styles.relatedCategory}>{b.clusterTopic}</span>
                    <span className={styles.relatedName}>{b.title}</span>
                    <span className={styles.relatedMetaSmall}>{b.readingTime} · Read Guide →</span>
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
