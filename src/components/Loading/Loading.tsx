import * as React from 'react';
import { TaskIcon } from '../../helpers';
import { LoadingProps } from '../../type';

export const Loading: React.FunctionComponent<LoadingProps> = ({ count = 3 }) => {
  const items = [...Array(count || 3).keys()].map(item => (
    <div
      className="task loading d-flex border bg-white shadow-sm rounded mb-2 p-2"
      key={item}
    >
      <span className="icon d-flex loading__icon">
        <TaskIcon />
      </span>

      <div className="flex-grow-1 px-2">
        <div className="loading__title mb-2"></div>
        <div className="loading__meta"></div>
      </div>

      <div className="d-flex align-items-center">
        <div className="loading__button rounded"></div>
      </div>
    </div>
  ));

  return (
    <div role="alert">
      {items}
    </div>
  );
};

export default Loading;
