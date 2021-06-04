import React from 'react';

import { ButtonProps } from '../../type';

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  type = 'button',
  style = 'primary',
  outline = false,
  icon,
  onClick
}) => {
  const className = `
    btn
    btn-sm
    btn${outline ? '-outline' : ''}-${style}
  `;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {Boolean(icon) && icon}
      {children}
    </button>
  );
};

export default Button;
