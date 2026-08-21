import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import styles from './Intro.module.css';

function Intro() {
  return (
    <section id="intro" className="section-light section-padding">
      <div className="container">
        <motion.div
          className={styles.contentWrapper}
          initial={{ opacity: 0, y: 50, rotateX: 10, skewY: 2 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, skewY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.eyebrow}>Projects I'm proud of</p>

          <div className={styles.grid}>
            <h2 className={styles.headline}>
              Six products,<br />
              shipped <span className="text-accent">end-to-end</span>
            </h2>

            <div className={styles.paragraphWrapper}>
              {/* Homepage identity statement — the crawlable, factual answer to
                  "Who is Dhairya Shah?" (resume-sourced, written naturally). */}
              <p className={styles.description}>
                <Link
                  to="/about"
                  style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  Dhairya Shah
                </Link>{' '}
                is a full-stack developer and DevOps engineer based in Ahmedabad, Gujarat, who ships products end-to-end —{' '}
                <Link
                  to="/blogs/mongodb-vs-postgresql-schema-design-guide"
                  style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  MERN
                </Link>{' '}
                and Django/Flask applications,{' '}
                <Link
                  to="/blogs/docker-github-actions-linux-vps-cicd-guide"
                  style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  Docker containerization, CI/CD pipelines
                </Link>
                , and cloud deployment.
              </p>
              <p className={styles.description}>
                Explore{' '}
                <Link
                  to="/projects"
                  style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  six live products shipped end-to-end
                </Link>
                , from database schema to server provisioning to production URL.
              </p>
              <div className={styles.divider}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Intro;
