import React from 'react';
import Panel from './Panel';
import Button from './Button';
import { BoardProps } from '../types';
import {
  createdTasks,
  startedTasks,
  finishedTasks,
  printTask
} from '../helpers';

export const Board: React.FC<BoardProps> = ({ tasks }) => {
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
