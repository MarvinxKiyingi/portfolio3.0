import React from 'react';
import styles from './NavBar.module.scss';
import Initials from '../Icons/Initials';
import SocialLinks from '../SocialLinks/SocialLinks';
import Link from 'next/link';

const NavBar = async () => {
  return (
    <section className={styles.wrapper}>
      <Link href='/' className={styles.initialsWrapper}>
        <Initials />
      </Link>
      <SocialLinks />
    </section>
  );
};

export default NavBar;
