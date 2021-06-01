import React, { useReducer } from 'react';

import {
  Board,
  ErrorAlert,
  LoadingAlert
} from './components';

import { tasksReducer, tasksInitialState } from './helpers';

import 'bootstrap/dist/css/bootstrap.css';

export const App: React.FunctionComponent = () => {
  const [state, dispatch] = useReducer(tasksReducer, tasksInitialState);

  return (
    <div className="container p-3 d-flex flex-column">
      <h1 className="fs-6">Anyway Labs Test Project</h1>
      <p className="subtitle"><small>Just some good deeds</small></p>

      {Boolean(state.error) &&
        <ErrorAlert message={state.error?.message} />
      }

      {Boolean(state.isLoading) &&
        <LoadingAlert />
      }

      {Boolean(state.tasks) &&
        <Board tasks={state.tasks} />
      }
    </div>
  );
};

export default App;
