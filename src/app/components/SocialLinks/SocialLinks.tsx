import React from 'react';
import styles from './SocialLinks.module.scss';
import { INavItem } from '../NavBar/NavBar';
import Link from 'next/link';

type ISocialLinks = {
  navItems: INavItem[];
};

const SocialLinks = (props: ISocialLinks) => {
  const { navItems } = props;
  return (
    <div className={styles.wrapper}>
      {navItems.map(({ _key, linkUrl, name }: INavItem) => (
        <Link key={_key} className='navigation' href={linkUrl || ''}>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
