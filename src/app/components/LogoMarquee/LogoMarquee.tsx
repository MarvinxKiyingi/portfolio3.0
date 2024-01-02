import React from 'react';
import Marquee from 'react-fast-marquee';
import projectStyles from '../../components/Projects/Project/Project.module.scss';
import styles from '../LogoMarquee/LogoMarquee.module.scss';
import Fjallraven from './Logos/Fjallraven';
import Grandpa from './Logos/Grandpa';
import JLinderberg from './Logos/JLinderberg';
import Hestra from './Logos/Hestra';
import Lexington from './Logos/Lexington';
import Mayadelorez from './Logos/MayaDelorez';
import Aco from './Logos/Aco';

const LogoMarquee = async () => {
  return (
    <div className={projectStyles.wrapper}>
      {/* <h2 className={projectStyles.heading}>Worked on brands</h2> */}
      <Marquee
        className={styles.marqueeWrapper}
        autoFill
        gradient
        gradientWidth={'10%'}
      >
        <div className={styles.marqueeContentWrapper}>
          <Grandpa />
          <Fjallraven />
          <JLinderberg />
          <Hestra />
          <Aco />
          <Lexington />
          <Mayadelorez />
          <Grandpa />
          <Fjallraven />
          <JLinderberg />
          <Hestra />
          <Aco />
          <Lexington />
          <Mayadelorez />
        </div>
      </Marquee>
    </div>
  );
};

export default LogoMarquee;
