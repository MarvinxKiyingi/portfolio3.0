import React from 'react';
import styles from './Experience.module.scss';

const Experience = ({ experience, onMouseEnter }: IExperienceProps) => {
  const { companyName, role, from, to } = experience;

  return (
    <div className={styles.wrapper} onMouseEnter={onMouseEnter}>
      <h3 className={`body ${styles.company}`}>{companyName}</h3>
      <p className={`body ${styles.role}`}>{role}</p>
      <div className={styles.duration}>
        <p className={`body ${styles.from}`}>{from}</p>
        <p className={`body ${styles.to}`}>{to}</p>
      </div>
    </div>
  );
};

export default Experience;
