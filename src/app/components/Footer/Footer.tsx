import React from 'react';
import styles from './Footer.module.scss';
import SocialLinks from '../SocialLinks/SocialLinks';

const Footer = () => {
  return (
    <div className={styles.wrapper}>
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
