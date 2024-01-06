import React from 'react';
import styles from './Button.module.scss';
import Link from 'next/link';
import classNames from 'classnames';
import Cross from '../Icons/Cross';
import Minus from '../Icons/Minus';

const Button = ({
  variant = 'default',
  onClick,
  to,
  as = 'link',
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
      case 'minus':
        return <Minus />;

      default:
        return null; // If no matching icon is found, return null or another default behavior
    }
  };

  switch (as) {
    case 'link':
      return (
        <Link href={to || ''} className={buttonClassName}>
          {text}
          {icon && renderIcon()}
        </Link>
      );
    case 'button':
      return (
        <button onClick={onClick} className={buttonClassName}>
          {text}
          {icon && renderIcon()}
        </button>
      );
  }
};

export default Button;
