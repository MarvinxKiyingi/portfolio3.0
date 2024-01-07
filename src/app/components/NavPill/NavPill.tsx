'use client';
import React, { useState } from 'react';
import styles from './NavPill.module.scss';
import Button from '../Button/Button';
import { usePathname } from 'next/navigation';

const NavPill = () => {
  const pathname = usePathname();
  const navigateTo = pathname === '/' ? '/#Work' : '/';
  const navItems = [
    { pathname: '/', to: navigateTo, text: 'Work' },
    { pathname: '/about', to: '/about', text: 'About' },
  ];

  const activeButtonStyles = {
    backgroundColor: 'var(--button-default-bg-color)',
    color: 'var(--text-color-primary)',
  };

  return (
    <div className={styles.wrapper}>
      View:
      {navItems.map((navItem, indx) => {
        const currentPath = pathname === navItem.pathname;
        return (
          <Button
            key={indx}
            {...navItem}
            style={currentPath ? activeButtonStyles : undefined}
          />
        );
      })}
    </div>
  );
};

export default NavPill;
