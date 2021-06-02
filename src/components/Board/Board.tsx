import React, { useContext } from 'react';

import {
  Panel,
  LoadingAlert,
  ErrorAlert,
} from '../';
import { StateContext } from '../../store';
import { PANELS } from '../../constants';
import { printTask } from '../../helpers';

export const Board: React.FunctionComponent = () => {
  const state = useContext(StateContext);

  const panelsList = PANELS.map(({ title, filter, controls }, index) => {
    const panelContent = state.tasks?.filter(filter).map(printTask);

    return (
      <Panel
        key={index}
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
