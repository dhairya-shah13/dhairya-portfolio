import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found | Dhairya Shah"
        description="The page you were looking for could not be found. Return to the homepage of Dhairya Shah, full-stack developer and DevOps engineer."
        path="/404"
      />
      <section className={`section-dark ${styles.section}`}>
        <div className="container">
          <p className={`${styles.code} numeral`}>404</p>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.subline}>
            The page you're looking for doesn't exist. Head back to the homepage of Dhairya Shah — full-stack
            developer & DevOps engineer.
          </p>
          <Link to="/" className={styles.homeLink}>
            Back to Homepage
          </Link>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
