import React from 'react';

type Props = {
  title: string
};

export const Panel: React.FC<Props> = ({ title }) => {
  return (
    <div className="col d-flex">
      <article className="flex-grow-1 p-3 border bg-light rounded">
        <header className="d-flex">
          <span className="rounded-circle bg-info px-2 py-0">5</span>
          <h3 className="h6">{title}</h3>
        </header>
      </article>
    </div>
  );
};

export default Panel;
