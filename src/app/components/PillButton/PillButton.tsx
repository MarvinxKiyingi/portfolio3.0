import React from 'react';
import styles from './PillButton.module.scss';
import Link from 'next/link';

type IPillButton = {
  to: string;
  text: string;
};

const PillButton = ({ to, text }: IPillButton) => {
  return (
    <Link href={to} className={styles.wrapper}>
      {text}
    </Link>
  );
};

export default PillButton;
