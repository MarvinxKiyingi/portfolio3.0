import React from 'react';
import styles from './NavBar.module.scss';
import SocialLinks from '../SocialLinks/SocialLinks';
import Link from 'next/link';

const NavBar = async () => {
  return (
    <section className={styles.wrapper}>
      <SocialLinks />
    </section>
  );
};

export default NavBar;
