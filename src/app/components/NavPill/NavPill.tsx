'use client';
import React from 'react';
import styles from './NavPill.module.scss';
import Button from '../Button/Button';
import { usePathname } from 'next/navigation';

const NavPill = () => {
  const pathname = usePathname();
  const navItems = [
    { to: pathname === '/' ? '#Work' : pathname, text: 'Work' },
  ];

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
