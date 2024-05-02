import React from 'react';
import styles from './Button.module.scss';
import Link from 'next/link';
import classNames from 'classnames';
import Plus from '../Icons/Plus';

const Button = ({
  variant = 'default',
  onClick,
  to,
  as = 'link',
  text,
  className,
  id,
  icon,
  isIconRotated,
  style,
  iconStyles,
}: IButton) => {
  const buttonClassName = classNames(styles.default, className, {
    [styles.outlinedWithTint]: variant === 'outlinedWithTint',
    // Add more cases as needed
  });

  const renderIcon = () => {
    switch (icon) {
      case 'cross':
        return (
          <Plus
            className={`${isIconRotated ? styles.rotateIcon : ''}`}
            style={iconStyles}
          />
        );
      case 'minus':
        return <span>—</span>;

      default:
        return null; // If no matching icon is found, return null or another default behavior
    }
  };

  switch (as) {
    case 'link':
      return (
        <Link
          onClick={onClick}
          href={to || ''}
          className={buttonClassName}
          id={id}
          style={style}
        >
          {text}
          {icon && renderIcon()}
        </Link>
      );
    case 'button':
      return (
        <button
          onClick={onClick}
          className={buttonClassName}
          style={style}
          id={id}
        >
          {text}
          {icon && renderIcon()}
        </button>
      );
  }
};

export default Button;
