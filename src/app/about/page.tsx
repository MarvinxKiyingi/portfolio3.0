import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import styles from './about.module.scss';
import Knowledge from './Knowledge/Knowledge';

const About = () => {
  return (
    <div className={styles.wrapper}>
      <NavBar />

      <div className={styles.content}>
        <h1 className={`${styles.heading} heading-1`}>Heading</h1>
        <Knowledge />
      </div>
    </div>
  );
};

export default About;
