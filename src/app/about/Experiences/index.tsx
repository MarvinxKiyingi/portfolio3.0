import React from 'react';
import styles from './Experiences.module.scss';
import Image from 'next/image';
import Experience from './Experience';

const Experiences = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.experienceContent}>
        <Experience />
        <Experience />
        <Experience />
      </div>
    </div>
  );
};

export default Experiences;
