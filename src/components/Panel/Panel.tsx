import React, { Children } from 'react';

import { PanelProps } from '../../types';

export const Panel: React.FunctionComponent<PanelProps> = ({
  title,
  children,
  controls
}) => {
  const childrenCount: number = Children.toArray(children).length;
  const tasksCount: string = childrenCount > 9 ? '9+' : `${childrenCount}`;

  return (
    <div className="col d-flex">
      <section className="panel flex-grow-1 p-2 border rounded">
        <header className="d-flex align-items-center mb-2">
          <span className="counter rounded-circle ratio ratio-1x1 ">
            <span className="d-inline-flex justify-content-center align-items-center">
              {tasksCount}
            </span>
          </span>

          <h2 className="fs-6 mb-0 ms-2">
            {title}
          </h2>
        </header>

        {Boolean(children) &&
          <div role="list">
            {children}
          </div>
        }

        {Boolean(controls) &&
          <div role="complementary" className="position-sticky bottom-0">
            {controls}
          </div>
        }
      </section>
    </div>
  );
};

export default Panel;
