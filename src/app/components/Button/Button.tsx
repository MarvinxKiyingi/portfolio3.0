import React from 'react';
import styles from './Button.module.scss';
import Link from 'next/link';
import classNames from 'classnames';

type IButton = {
  to?: string;
  as?: 'button' | 'link';
  text: string;
  variant?: 'default' | 'outlinedWithTint';
  className?: string;
  onClick?: () => void;
};

const Button = ({
  variant = 'default',
  onClick,
  to = '',
  text,
  className,
}: IButton) => {
  const buttonClassName = classNames(styles.default, className, {
    [styles.outlinedWithTint]: variant === 'outlinedWithTint',
    // Add more cases as needed
  });

  return (
    <Link onClick={onClick} href={to} className={buttonClassName}>
      {text}
    </Link>
  );
};

export default Button;
