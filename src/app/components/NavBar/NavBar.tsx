import React from 'react';
import styles from './NavBar.module.scss';
import Initials from '../Icons/Initials';
import SocialLinks from '../SocialLinks/SocialLinks';

const NavBar = () => {
  return (
    <div className={styles.wrapper}>
      <Initials />
      <SocialLinks />
    </div>
  );
};

export default NavBar;
