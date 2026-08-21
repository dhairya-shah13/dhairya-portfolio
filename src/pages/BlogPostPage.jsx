import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar, Share2 } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { getBlogPostBySlug, blogPosts } from '../data/blogs.js';
import { projects } from '../data/projects.js';
import { person } from '../data/person.js';
import {
  buildBreadcrumbSchema,
  buildBlogPostingSchema,
  buildFaqSchema,
} from '../data/schema.js';
import styles from './BlogPostPage.module.css';

function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const relatedProjects = (post.relatedProjectSlugs || [])
    .map((s) => projects.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <>
      <Seo
        title={`${post.title.split(':')[0]} | Dhairya Shah`}
        description={post.description}
        path={`/blogs/${post.slug}`}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blogs' },
          { name: post.title.split(':')[0], path: `/blogs/${post.slug}` },
        ])}
      />
      <JsonLd data={buildBlogPostingSchema(post)} />
      {post.faq && <JsonLd data={buildFaqSchema(post.faq)} />}

      {/* Header section */}
      <section className={`section-dark ${styles.headerSection}`}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/" className={styles.crumb}>
              Home
            </Link>
            <span className={styles.crumbSep}>/</span>
            <Link to="/blogs" className={styles.crumb}>
              Blog
            </Link>
            <span className={styles.crumbSep}>/</span>
            <span className={`${styles.crumb} ${styles.crumbCurrent}`}>{post.title}</span>
          </nav>

          <div className={styles.eyebrowRow}>
            <span className={styles.clusterBadge}>{post.clusterTopic}</span>
            <span className={styles.readingMeta}>
              <Clock size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
              {post.readingTime} · Published on{' '}
              {new Date(post.datePublished).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.subtitle}>{post.subtitle}</p>

          <div className={styles.authorRow}>
            <img
              src="/images/dhairya-shah.jpg"
              alt="Dhairya Shah portrait"
              className={styles.authorImg}
              width={48}
              height={48}
            />
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>Dhairya Shah</span>
              <span className={styles.authorRole}>Full-Stack Developer & DevOps Engineer · Ahmedabad, India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main article content */}
      <section className="section-light section-padding" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className={styles.contentGrid}>
            <article className={styles.mainColumn}>
              {/* TL;DR Bullet Summary (AEO / LLM Extraction) */}
              {post.tldr && post.tldr.length > 0 && (
                <div className={styles.tldrBox}>
                  <p className={styles.tldrTitle}>Executive Summary (TL;DR)</p>
                  <ul className={styles.tldrList}>
                    {post.tldr.map((bullet, idx) => (
                      <li key={idx} className={styles.tldrItem}>
                        <strong>{bullet.split(' ')[0]}</strong> {bullet.slice(bullet.indexOf(' ') + 1)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Comprehensive Comparison Table */}
              {post.comparisonTable && (
                <div>
                  <h2 className={styles.sectionHeading}>Comprehensive Comparison Matrix</h2>
                  <div className={styles.tableContainer}>
                    <table className={styles.comparisonTable}>
                      <thead className={styles.tableHeader}>
                        <tr>
                          {post.comparisonTable.headers.map((h, i) => (
                            <th key={i}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {post.comparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Content Sections with Direct Answers */}
              {post.sections &&
                post.sections.map((sec, idx) => (
                  <section key={idx} className={styles.sectionBlock}>
                    <h2 className={styles.sectionHeading}>{sec.heading}</h2>

                    {sec.directAnswer && (
                      <div className={styles.directAnswerBox}>
                        <strong>Direct Answer: </strong>
                        {sec.directAnswer}
                      </div>
                    )}

                    <div className={styles.prose}>{sec.content}</div>
                  </section>
                ))}

              {/* Tags */}
              <div className={styles.tagList}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* FAQ Section */}
              {post.faq && post.faq.length > 0 && (
                <section className={styles.faqSection}>
                  <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
                  <div className={styles.faqList}>
                    {post.faq.map((item, fIdx) => (
                      <div key={fIdx} className={styles.faqItem}>
                        <h3 className={styles.faqQuestion}>{item.question}</h3>
                        <p className={styles.faqAnswer}>{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Sidebar */}
            <aside className={styles.sideColumn}>
              <div className={styles.authorCard}>
                <h3 className={styles.authorCardTitle}>About the Author</h3>
                <p className={styles.authorCardBio}>
                  Dhairya Shah is a full-stack developer and DevOps engineer from Ahmedabad, Gujarat. He specializes
                  in production web applications across MERN and Django/Flask, Docker containerization, and automated
                  CI/CD pipelines.
                </p>
                <Link to="/about" className={styles.authorCardLink}>
                  View Full Bio & Credentials <ArrowRight size={14} />
                </Link>
                <Link to="/projects" className={styles.authorCardLink}>
                  Explore Shipped Projects <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className={styles.relatedSection}>
              <h2 className={styles.relatedHeading}>Related Technical Guides</h2>
              <div className={styles.relatedGrid}>
                {related.map((rel) => (
                  <Link key={rel.slug} to={`/blogs/${rel.slug}`} className={styles.relatedCard}>
                    <span className={styles.relatedMeta}>{rel.clusterTopic}</span>
                    <h3 className={styles.relatedTitle}>{rel.title}</h3>
                    <span className={styles.authorCardLink} style={{ marginTop: 'auto' }}>
                      Read Guide <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Applied Production Case Studies */}
          {relatedProjects.length > 0 && (
            <div className={styles.relatedSection}>
              <h2 className={styles.relatedHeading}>Applied Production Case Studies</h2>
              <div className={styles.relatedGrid}>
                {relatedProjects.map((p) => (
                  <Link key={p.slug} to={`/projects/${p.slug}`} className={styles.relatedCard}>
                    <span className={styles.relatedMeta}>{p.category}</span>
                    <h3 className={styles.relatedTitle}>{p.name}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {p.description}
                    </p>
                    <span className={styles.authorCardLink} style={{ marginTop: 'auto' }}>
                      View Technical Case Study <ArrowRight size={14} />
                    </span>
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

export default BlogPostPage;
