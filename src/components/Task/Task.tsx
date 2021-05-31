import React from 'react';

import {
  Timer,
  Cost,
  Button
} from '../';

import { TaskType } from '../../types';

export const Task: React.FunctionComponent<TaskType> = ({
  title,
  createdAt,
  startedAt,
  finishedAt
}) => (
  <article className="task d-flex border bg-white shadow-sm rounded mb-2 p-2">
    <span className="icon d-flex">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
      </svg>
    </span>

    <div className="flex-grow-1 px-2">
      <h3 className="fs-6 fw-normal">{title}</h3>

      {Boolean(createdAt && startedAt && !finishedAt) &&
        <Timer startedAt={startedAt} />
      }

      {Boolean(createdAt && startedAt && finishedAt) &&
        <Cost startedAt={startedAt} finishedAt={finishedAt} />
      }
    </div>

    {Boolean(!finishedAt) &&
      <div className="d-flex align-items-center">
        <Button
          style={Boolean(startedAt) ? "success" : "primary"}
          onClick={() => {}}
        >
          {Boolean(startedAt) ? 'Resolve' : 'Start'}
        </Button>
      </div>
    }
  </article>
);

export default Task;
