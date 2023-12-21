import React from 'react';
import styles from './NavPill.module.scss';
import Button from '../Button/Button';

const NavPill = () => {
  const navItems = [{ to: '/', text: 'Work' }];
  return (
    <div className={styles.wrapper}>
      View:
      {navItems.map((navItem, indx) => (
        <Button key={indx} {...navItem} />
      ))}
    </div>
  );
};

export default NavPill;
