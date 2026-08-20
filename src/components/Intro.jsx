import React from 'react';
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
                Dhairya Shah is a full-stack developer and DevOps engineer based in Ahmedabad, Gujarat, who ships
                products end-to-end — MERN and Django/Flask applications, Docker containerization, CI/CD pipelines,
                and cloud deployment.
              </p>
              <p className={styles.description}>
                Six live products shipped end-to-end, from database schema to server provisioning to production URL.
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
