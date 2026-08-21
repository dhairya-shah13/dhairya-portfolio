import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { blogPosts } from '../data/blogs.js';
import { buildBreadcrumbSchema } from '../data/schema.js';
import styles from './BlogsPage.module.css';

const blogsTldr = [
  'Technical engineering guides and architectural comparisons by Dhairya Shah.',
  'Deep dives into Web Rendering (SSG vs SSR vs SPA), DevOps Automation (Docker + GitHub Actions on Linux VPS), and Database Schema Design (MongoDB vs PostgreSQL).',
  'Packed with real-world benchmark data, high-contrast comparison matrices, and concrete implementation rules for production software.',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
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

function BlogsPage() {
  return (
    <>
      <Seo
        title="Technical Blog & Engineering Comparisons | Dhairya Shah"
        description="Read in-depth software engineering guides, architectural comparisons, and DevOps walkthroughs by Dhairya Shah. Focus on SSG vs SSR, Docker CI/CD, and MongoDB vs PostgreSQL."
        path="/blogs"
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blogs' },
        ])}
      />

      <section className={`section-dark ${styles.headerSection}`}>
        <div className="container">
          <p className={styles.eyebrow}>Insights & Engineering</p>
          <h1 className={styles.title}>Blog & Guides</h1>
          <p className={styles.subline}>
            Architectural breakdowns, detailed technology comparisons, and production DevOps playbooks from
            hands-on software development.
          </p>
        </div>
      </section>

      <section className="section-light section-padding" style={{ paddingTop: 60 }}>
        <div className="container">
          {/* TL;DR Summary Block */}
          <div className={styles.tldrBox}>
            <p className={styles.tldrTitle}>Publications Overview (TL;DR)</p>
            <ul className={styles.tldrList}>
              {blogsTldr.map((bullet, idx) => (
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
            {blogPosts.map((post) => (
              <motion.article key={post.slug} variants={cardVariants}>
                <Link to={`/blogs/${post.slug}`} className={styles.card}>
                  <div className={styles.cardMetaRow}>
                    <span className={styles.clusterBadge}>{post.clusterTopic}</span>
                    <span className={styles.dateReading}>
                      {new Date(post.datePublished).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}{' '}
                      · {post.readingTime}
                    </span>
                  </div>

                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postDesc}>{post.description}</p>

                  <div className={styles.tagList}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.readMoreRow}>
                    Read Technical Guide <ArrowRight size={16} />
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-light" style={{ borderTop: '1px solid var(--border-current)' }}>
        <div className="container" style={{ padding: '80px 40px' }}>
          <p className={styles.footerNote}>
            Explore live case studies on the <Link to="/projects" className={styles.inlineLink}>Projects page</Link>,
            read more <Link to="/about" className={styles.inlineLink}>About Dhairya Shah</Link>, or connect on{' '}
            <a
              href="https://github.com/dhairya-shah13"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

export default BlogsPage;
