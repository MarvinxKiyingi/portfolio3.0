import React from 'react';
import styles from './NavBar.module.scss';
import Initials from '../Icons/Initials';
import SocialLinks from '../SocialLinks/SocialLinks';
import { client } from '@/app/utils/sanity/client';

export type INavItem = {
  name: string;
  _key: string;
  _type: string;
  linkUrl?: string;
};

type IAuthor = {
  _ref: string;
  _type: string;
};

type INavBar = {
  _type: string;
  name: string;
  _id: string;
  navigationType: string[];
  _updatedAt: string;
  author: IAuthor;
  _rev: string;
  _createdAt: string;
  navItems: INavItem[];
};

const NavBar = async () => {
  const navBar = await client.fetch<INavBar[]>(`*[name == "NavbarMenu"]`);
  const { navItems } = navBar[0];

  return (
    <section className={styles.wrapper}>
      <Initials />
      <SocialLinks navItems={navItems} />
    </section>
  );
};

export default NavBar;
