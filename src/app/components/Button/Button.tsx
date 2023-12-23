import React from 'react';
import styles from './Button.module.scss';
import Link from 'next/link';
import classNames from 'classnames';
import Cross from '../Icons/Cross';

type IButton = {
  to?: string;
  as?: 'button' | 'link';
  text: string;
  variant?: 'default' | 'outlinedWithTint';
  className?: string;
  onClick?: () => void;
  icon?: 'cross';
};

const Button = ({
  variant = 'default',
  onClick,
  to = '',
  text,
  className,
  icon,
}: IButton) => {
  const buttonClassName = classNames(styles.default, className, {
    [styles.outlinedWithTint]: variant === 'outlinedWithTint',
    // Add more cases as needed
  });

  const renderIcon = () => {
    switch (icon) {
      case 'cross':
        return <Cross />;

      default:
        return null; // If no matching icon is found, return null or another default behavior
    }
  };

  return (
    <Link onClick={onClick} href={to} className={buttonClassName}>
      {text}
      {icon && renderIcon()}
      {/* {icon === 'cross' && <Cross />} */}
    </Link>
  );
};

export default Button;
