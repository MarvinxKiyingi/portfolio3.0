import React from 'react';
import styles from './NavBar.module.scss';
import Initials from '../Icons/Initials';
import SocialLinks from '../SocialLinks/SocialLinks';

const NavBar = () => {
  return (
    <section className={styles.wrapper}>
      <Initials />
      <SocialLinks />
    </section>
  );
};

export default NavBar;
