export type INavItem = {
  name: string;
  _key: string;
  _type: string;
  linkUrl?: string;
};

export type ISocialLinks = {
  navItems: INavItem[];
};
