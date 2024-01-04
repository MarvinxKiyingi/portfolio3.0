import React from 'react';
import styles from './Experiences.module.scss';
import Image from 'next/image';
import Experience from './Experience';

const Experiences = () => {
  const imageSrc = '';
  return (
    <div className={styles.wrapper}>
      <Image className={styles.image} src='' alt='hello' fill />
      <div className={styles.experienceContent}>
        <Experience />
        <Experience />
        <Experience />
      </div>
    </div>
  );
};

export default Experiences;
