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
} from '../../constants';

export const Board: React.FunctionComponent = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: Actions.fetch });
  }, []);

  const panelsList = Object.entries(Panels).map(([key, value]) => {
    const panelTasks = state[key].tasks?.map(printTask);

    return (
      <Panel
        key={key}
        title={value}
        controls={key === 'created' && <NewTask />}
      >
        {state[key].status === Statuses.idle &&
          panelTasks
        }

        {state[key].status === Statuses.loading &&
          <Loading count={state[key].tasks?.length} />
        }

        {state[key].status === Statuses.fail &&
          <ErrorAlert message={state[key].error?.message} />
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
