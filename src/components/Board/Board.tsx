import React, { useContext, useEffect } from 'react';

import {
  Panel,
  LoadingAlert,
  ErrorAlert,
  NewTask,
} from '../';

import { AppContext } from '../../store';

import {
  createdTasks,
  startedTasks,
  finishedTasks,
  printTask,
} from '../../helpers';

const PANELS = [
  {
    title: 'To do',
    filter: createdTasks,
    controls: <NewTask />,
  },
  {
    title: 'In progress',
    filter: startedTasks,
  },
  {
    title: 'Done',
    filter: finishedTasks,
  },
];

export const Board: React.FunctionComponent = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({type: 'FETCH_TASKS'});
  }, []);

  const panelsList = PANELS.map(({ title, filter, controls }) => {
    const panelContent = state && state.tasks?.filter(filter).map(printTask);

    return (
      <Panel
        key={title}
        title={title}
        controls={controls}
      >
        {Boolean(state.status === 'idle') &&
          panelContent
        }

        {Boolean(state.status === 'loading') &&
          <LoadingAlert />
        }
      </Panel>
    );
  });


  return (
    <div role="main" className="row gx-3 flex-grow-1">
      {Boolean(state.error) ? (
          <ErrorAlert message={state.error?.message} />
        ) : (
          panelsList
        )
      }
    </div>
  );
};

export default Board;
