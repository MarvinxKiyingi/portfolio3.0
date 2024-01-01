import React from 'react';
import Marquee from 'react-fast-marquee';
import projectStyles from '../../components/Projects/Project/Project.module.scss';
import styles from '../LogoMarquee/LogoMarquee.module.scss';
import Fjallraven from './Logos/Fjallraven';
import Grandpa from './Logos/Grandpa';
import JLinderberg from './Logos/JLinderberg';
import Hestra from './Logos/Hestra';
import Lexington from './Logos/Lexington';
import Mayadelorez from './Logos/Mayadelorez';
import Aco from './Logos/Aco';
import Attendo from './Logos/Attendo';

const LogoMarquee = async () => {
  return (
    <div className={projectStyles.wrapper}>
      <h2 className={projectStyles.heading}>Worked on brands</h2>
      <Marquee
        className={styles.marqueeWrapper}
        autoFill
        gradient
        gradientColor='#f3f3f3'
      >
        <div className={styles.marqueeContentWrapper}>
          <Grandpa />
          <Fjallraven />
          <JLinderberg />
          <Hestra />
          <Aco />
          <Lexington />
          <Attendo />
          <Mayadelorez />
          <Grandpa />
          <Fjallraven />
          <JLinderberg />
          <Hestra />
          <Aco />
          <Lexington />
          <Attendo />
          <Mayadelorez />
        </div>
      </Marquee>
    </div>
  );
};

export default LogoMarquee;
