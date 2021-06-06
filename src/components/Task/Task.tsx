import React, { useContext } from 'react';

import { AppContext } from '../../store/context';
import {
  Timer,
  Cost,
  Button
} from '../';
import { TaskIcon } from '../../helpers';
import { Actions } from '../../constants';
import { TaskType } from '../../type';

export const Task: React.FunctionComponent<TaskType> = ({
  id,
  title,
  createdAt,
  startedAt,
  finishedAt
}) => {
  const { dispatch } = useContext(AppContext);

  const isCreated = Boolean(createdAt);
  const isStarted = Boolean(startedAt);
  const isFinished = Boolean(finishedAt);

  const onButtonClick = () => {
    if (isStarted) {
      dispatch({ type: Actions.resolve, payload: id });
    } else {
      dispatch({ type: Actions.start, payload: id });
    }
  };

  return (
    <article className="task d-flex border bg-white shadow-sm rounded mb-2 p-2">
      <span className="icon d-flex">
        <TaskIcon />
      </span>

      <div className="flex-grow-1 px-2">
        <h3 className="fs-6 fw-normal">
          {title}
        </h3>

        {Boolean(isCreated && isStarted && !isFinished) &&
          <Timer startedAt={startedAt} />
        }

        {Boolean(isCreated && isStarted && isFinished) &&
          <Cost startedAt={startedAt} finishedAt={finishedAt} />
        }
      </div>

      {!isFinished &&
        <div className="d-flex align-items-center">
          <Button
            style={isStarted ? "success" : "primary"}
            onClick={onButtonClick}
          >
            {isStarted ? 'Resolve' : 'Start'}
          </Button>
        </div>
      }
    </article>
  );
};

export default Task;
