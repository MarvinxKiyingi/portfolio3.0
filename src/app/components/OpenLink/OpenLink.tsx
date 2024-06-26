import React from 'react';
import styles from './OpenLink.module.scss';
import OpenLinkIcon from '../Icons/OpenLinkIcon';

const OpenLink = ({ href, companyName }: IListOfAgencyWork) => {
  return (
    <a
      className={`link ${styles.wrapper} body-tiny ${styles.company} `}
      href={href}
    >
      <li>
        {companyName}
        <OpenLinkIcon />
      </li>
    </a>
  );
};

export default OpenLink;
