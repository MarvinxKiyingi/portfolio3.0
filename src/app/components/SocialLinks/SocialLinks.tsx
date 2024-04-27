import React from 'react';
import styles from './SocialLinks.module.scss';
import Link from 'next/link';
import { client } from '@/app/utils/sanity/client';
import { INavItem, ISocialLinks } from '.';

const SocialLinks = async () => {
  const navBar = await client.fetch<ISocialLinks[]>(`*[name == "NavbarMenu"]`);
  const { navItems } = navBar[0];

  return (
    <div className={styles.wrapper}>
      {navItems.map(({ _key, linkUrl, name }: INavItem) => (
        <Link key={_key} className='body-tiny link' href={linkUrl || ''}>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
