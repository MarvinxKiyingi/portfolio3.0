import React from 'react';
import styles from './Knowledge.module.scss';

const Knowledge = () => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.item} ${styles.software}`}>
        <h2 className={`link ${styles.subHeading}`}>Main Software </h2>
        <p className={`body ${styles.description}`}></p>
      </div>
      <div className={`${styles.item} ${styles.languages}`}>
        <h2 className={`link ${styles.subHeading}`}>Main Languages</h2>
        <p className={`body ${styles.description}`}></p>
      </div>
    </div>
  );
};

export default Knowledge;
