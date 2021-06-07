import React, { Children } from 'react';
import { Counter } from '../';
import { PanelProps } from '../../type';

export const Panel: React.FunctionComponent<PanelProps> = ({
  title,
  children,
  controls
}) => {
  const childrenCount = Children.toArray(children).length;

  return (
    <div className="col d-flex">
      <section className="panel flex-grow-1 p-2 border rounded">
        <header className="d-flex align-items-center mb-2">
          <Counter number={childrenCount} />

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
          <div
            role="complementary"
            className="panel__controls position-sticky bottom-0"
          >
            {controls}
          </div>
        }
      </section>
    </div>
  );
};

export default Panel;
