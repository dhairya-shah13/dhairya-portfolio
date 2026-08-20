import React from 'react';
import styles from './Marquee.module.css';

function Marquee() {
  const marqueeItems = [
    'MERN Stack',
    'Docker Containerization',
    'CI/CD Pipelines',
    'Cloud Architecture',
    'Django & Flask',
    'Linux Shell Scripting',
    'Database Schemas',
    'VPS Provisioning',
    'GitHub Actions'
  ];

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeTrack}>
        {/* First track copy */}
        <div className={styles.marqueeRow}>
          {marqueeItems.map((item, idx) => (
            <span key={idx} className={styles.marqueeItem}>
              {item} <span className={styles.separator}>·</span>
            </span>
          ))}
        </div>
        {/* Second track copy for seamless loop */}
        <div className={styles.marqueeRow} aria-hidden="true">
          {marqueeItems.map((item, idx) => (
            <span key={`dup-${idx}`} className={styles.marqueeItem}>
              {item} <span className={styles.separator}>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Marquee;
