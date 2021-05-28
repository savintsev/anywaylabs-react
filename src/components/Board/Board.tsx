import React from 'react';

import {
  Panel,
  Button
} from '../';

import {
  createdTasks,
  startedTasks,
  finishedTasks,
  printTask
} from '../../helpers';

import { BoardProps } from '../../types';

export const Board: React.FunctionComponent<BoardProps> = ({ tasks }) => {
  const createdItems = tasks && tasks
    .filter(createdTasks)
    .map(printTask);

  const startedItems = tasks && tasks
    .filter(startedTasks)
    .map(printTask);

  const finishedItems = tasks && tasks
    .filter(finishedTasks)
    .map(printTask);

  return (
    <div role="main" className="row gx-3 flex-grow-1">
      <Panel
        title="To do"
        controls={
          <Button>New task</Button>
        }
      >
        {createdItems}
      </Panel>

      <Panel title="In progress">
        {startedItems}
      </Panel>

      <Panel title="Done">
        {finishedItems}
      </Panel>
    </div>
  );
};

export default Board;
