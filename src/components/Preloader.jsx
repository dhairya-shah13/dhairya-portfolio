import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import styles from './Preloader.module.css';

function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Reduced-motion users get no preloader, but ONLY after hydration: the server
  // and the first client render must stay identical or React throws a hydration
  // mismatch. Removing the preloader post-mount is a normal update, not a mismatch.
  const skip = mounted && prefersReducedMotion;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (skip) {
      if (onComplete) onComplete();
      return undefined;
    }

    let start = 0;
    const duration = 1000; // 1s
    const stepTime = Math.abs(Math.floor(duration / 100));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 300); // Small pause at 100
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [skip, onComplete]);

  if (skip) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className={styles.preloader}
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }, // Custom cubic-bezier for responsive exit slide
          }}
        >
          <div className={styles.content}>
            <motion.div
              className={styles.wordmark}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Dhairya Shah<span className="text-accent">˙</span>
            </motion.div>

            <div className={styles.counterWrapper}>
              <span className={`${styles.counter} numeral`}>{count}</span>
              <span className={styles.percent}>%</span>
            </div>

            <div className={styles.progressBarWrapper}>
              <motion.div
                className={styles.progressBar}
                initial={{ width: 0 }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
