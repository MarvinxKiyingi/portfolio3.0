import React from 'react';
import styles from './NavPill.module.scss';
import PillButton from '../PillButton/PillButton';

const NavPill = () => {
  const navItems = [{ to: '/', text: 'Work' }];
  return (
    <div className={styles.wrapper}>
      View:
      {navItems.map((navItem, inx) => (
        <PillButton key={inx} {...navItem} />
      ))}
    </div>
  );
};

export default NavPill;
