import React from 'react';
import styles from './OpenLink.module.scss';
import OpenLinkIcon from '../Icons/ArrowDown';

const OpenLink = ({ href, companyName }: IListOfAgencyWork) => {
  return (
    <a className={`${styles.wrapper} body-tiny ${styles.company}`} href={href}>
      <li>
        {companyName}
        <OpenLinkIcon />
      </li>
    </a>
  );
};

export default OpenLink;
