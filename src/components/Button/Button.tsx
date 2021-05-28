import React from 'react';

export const Button: React.FunctionComponent = ({ children }) => {
  return (
    <button type="button" className="btn btn-primary">
      {children}
    </button>
  );
};

export default Button;
