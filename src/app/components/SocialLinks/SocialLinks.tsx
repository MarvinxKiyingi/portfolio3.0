import React from 'react';
import styles from './SocialLinks.module.scss';

const SocialLinks = () => {
  return (
    <div className={styles.wrapper}>
      <a className='navigation' href=''>
        Github
      </a>
      <a className='navigation' href=''>
        Linkedin
      </a>
    </div>
  );
};

export default SocialLinks;
