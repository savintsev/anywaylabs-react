import React, { Children } from 'react';
import { PanelProps } from '../types';

export const Panel: React.FC<PanelProps> = ({
  title,
  children,
  controls
}) => {
  const tasksCount: number = Children.toArray(children).length;

  return (
    <div className="col d-flex">
      <section className="flex-grow-1 p-3 border bg-light rounded">
        <header className="d-flex">
          <span className="rounded-circle bg-info px-2 py-0">
            {tasksCount}
          </span>

          <h3 className="h6">
            {title}
          </h3>
        </header>

        {Boolean(children) &&
          <div role="list">
            {children}
          </div>
        }

        {Boolean(controls) &&
          <div role="complementary">
            {controls}
          </div>
        }
      </section>
    </div>
  );
};

export default Panel;
