import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import styles from './Cta.module.css';

function Cta() {
  const handleScrollClick = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-light section-padding" style={{ borderTop: '1px solid var(--border-current)', overflow: 'hidden' }}>
      <div className="container">
        <motion.div 
          className={styles.wrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.title}>
            Let's build <br />
            something that <span className="text-accent">ships</span>.
          </h2>
          
          <p className={styles.subline}>
            Currently open to full-stack, cloud, and DevOps engineering opportunities.
          </p>

          <a href="#contact" onClick={handleScrollClick} className={styles.ctaButton}>
            Get In Touch
            <ArrowRight size={18} className={styles.arrowIcon} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Cta;
