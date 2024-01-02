import React from 'react';
import styles from './SocialLinks.module.scss';
import Link from 'next/link';
import { client } from '@/app/utils/sanity/client';

type INavItem = {
  name: string;
  _key: string;
  _type: string;
  linkUrl?: string;
};

type ISocialLinks = {
  navItems: INavItem[];
};

const SocialLinks = async () => {
  const navBar = await client.fetch<ISocialLinks[]>(`*[name == "NavbarMenu"]`);
  const { navItems } = navBar[0];

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
