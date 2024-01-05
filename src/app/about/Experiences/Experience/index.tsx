import React from 'react';
import styles from './Experience.module.scss';
import { IListOfExperience } from '..';

type IExperienceProps = {
  experience: IListOfExperience;
};

const Experience = ({ experience }: IExperienceProps) => {
  const { companyName, role, from, to } = experience;
  return (
    <div className={styles.wrapper}>
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
