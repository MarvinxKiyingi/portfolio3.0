import React from 'react';
import styles from './SocialLinks.module.scss';
import { INavItem } from '../NavBar/NavBar';

type ISocialLinks = {
  navItems: INavItem[];
};

const SocialLinks = (props: ISocialLinks) => {
  const { navItems } = props;
  return (
    <div className={styles.wrapper}>
      {navItems.map(({ _key, linkUrl, name }: INavItem) => (
        <a key={_key} className='navigation' href={linkUrl || ''}>
          {name}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
