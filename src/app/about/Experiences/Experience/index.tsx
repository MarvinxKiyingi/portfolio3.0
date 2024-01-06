import React from 'react';
import styles from './Experience.module.scss';

type IExperienceProps = {
  experience: IListOfExperience;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement> | undefined;
};

const Experience = ({ experience, onMouseEnter }: IExperienceProps) => {
  const { companyName, role, from, to } = experience;

  return (
    <div className={styles.wrapper} onMouseEnter={onMouseEnter}>
      <h3 className={`sub-text ${styles.company}`}>{companyName}</h3>
      <p className={`sub-text ${styles.role}`}>{role}</p>
      <div className={styles.duration}>
        <p className={`sub-text ${styles.from}`}>{from}</p>
        <p className={`sub-text ${styles.to}`}>{to}</p>
      </div>
    </div>
  );
};

export default Experience;
