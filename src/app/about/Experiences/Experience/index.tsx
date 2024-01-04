import React from 'react';
import styles from './Experience.module.scss';

const Experience = () => {
  return (
    <div className={`sub-text ${styles.wrapper}`}>
      <h3 className={`sub-text ${styles.company}`}>Company</h3>
      <p className={`sub-text ${styles.role}`}>Role</p>
      <div className={styles.duration}>
        <p className={styles.from}>2016</p>
        <p className={styles.to}>2022</p>
      </div>
    </div>
  );
};

export default Experience;
