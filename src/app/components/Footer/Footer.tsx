import React from 'react';
import styles from './Footer.module.scss';
import Contact from './Contact/Contact';
import SocialLinks from '../SocialLinks/SocialLinks';

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <Contact />

      <div className={styles.copyrightWrapper}>
        <span className={`${styles.copyright} navigation`}>
          Marvin Kiyingi ⏤ 2024
        </span>
        <SocialLinks />
      </div>
    </div>
  );
};

export default Footer;
