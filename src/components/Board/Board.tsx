import React, { useContext, useEffect } from 'react';

import { AppContext } from '../../store/context';
import {
  Panel,
  Loading,
  ErrorAlert,
  NewTask,
} from '../';
import { printTask } from '../../helpers';
import {
  Actions,
  Statuses,
  Panels,
  TaskStatuses,
} from '../../constants';
import { PanelType } from '../../type';

export const Board: React.FunctionComponent = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: Actions.fetch });
  }, []);

  const panelsList = Object.entries(Panels).map(panel => {
    const [key, value] = panel as PanelType;
    const currentPanel = state[key];
    const panelTasks = currentPanel.tasks?.map(printTask);

    return (
      <Panel
        key={key}
        title={value}
        controls={key === TaskStatuses.created && <NewTask />}
      >
        {currentPanel.status === Statuses.idle &&
          panelTasks
        }

        {currentPanel.status === Statuses.loading &&
          <Loading count={currentPanel.tasks?.length} />
        }

        {currentPanel.status === Statuses.fail &&
          <ErrorAlert message={currentPanel.error?.message} />
        }
      </Panel>
    );
  });

  return (
    <div role="main" className="row gx-3 flex-grow-1">
      {Boolean(state) && panelsList}
    </div>
  );
};

export default Board;
