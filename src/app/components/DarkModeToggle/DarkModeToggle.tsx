'use client';
import { useEffect, useState } from 'react';
import styles from './DarkModeToggle.module.scss';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setIsDarkMode(prefersDark);

    document.documentElement.setAttribute(
      'data-theme',
      prefersDark ? 'dark' : 'light'
    );
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.setAttribute(
        'data-theme',
        newMode ? 'dark' : 'light'
      );
      return newMode;
    });
  };

  return (
    <button onClick={toggleTheme} className={styles.dot}>
      <div className={styles.ripples}>
        <div className={styles.ripple1} />
        <div className={styles.ripple2} />
        <div className={styles.ripple3} />
      </div>
    </button>
  );
};

export default DarkModeToggle;
