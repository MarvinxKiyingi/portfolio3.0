'use client';
import React, { useEffect, useState } from 'react';
import styles from './OpenLink.module.scss';
import OpenLinkIcon from '../Icons/OpenLinkIcon';

const OpenLink = ({ href, companyName, indx }: IOpenLink) => {
  const [isViewVisible, setIsViewVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsViewVisible(true);
    }, indx * 100);

    return () => clearTimeout(timer);
  }, [indx]);

  return (
    <a
      className={`link ${styles.wrapper} body-tiny ${styles.company} ${
        isViewVisible ? styles.slideIn : undefined
      } `}
      href={href}
      target='_blank'
    >
      <li>
        {companyName}
        <OpenLinkIcon />
      </li>
    </a>
  );
};

export default OpenLink;
