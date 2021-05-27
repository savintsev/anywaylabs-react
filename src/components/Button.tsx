import React from 'react';

export const Button: React.FC = ({ children }) => {
  return (
    <button type="button" className="btn btn-primary">
      {children}
    </button>
  );
};

export default Button;
