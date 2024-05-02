import React from 'react';

const OpenLinkIcon = ({
  color = 'var(--text-color-primary)',
  className,
  style,
}: {
  color?: string;
  className?: string;
  style?: object;
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='17'
      height='17'
      fill='none'
      className={className}
      style={style}
    >
      <svg
        width='17'
        height='16'
        viewBox='0 0 17 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M15.6967 8.17868H8.62565M1.55458 8.17868H8.62565M8.62565 8.17868L8.62565 15.2497M8.62565 8.17868V1.10761'
          stroke={color}
          strokeWidth='1.2'
          strokeLinecap='round'
        />
      </svg>
    </svg>
  );
};

export default OpenLinkIcon;
