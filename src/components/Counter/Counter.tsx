import React from 'react';
import { CountProps } from '../../type';

export const Counter: React.FunctionComponent<CountProps> = ({ number }) => {
  const fixedNumber: string = number > 9 ? '9+' : `${number}`;

  return (
    <span className="counter rounded-circle ratio ratio-1x1 ">
      <span className="d-inline-flex justify-content-center align-items-center">
        {fixedNumber}
      </span>
    </span>
  )
};

export default Counter;
