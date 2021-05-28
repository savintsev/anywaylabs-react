import React from 'react';

import {
  Board,
  ErrorAlert,
  LoadingAlert
} from './components';

import { useTasks } from './helpers';

import 'bootstrap/dist/css/bootstrap.css';

export const App: React.FunctionComponent = () => {
  const { tasks, isLoading, error } = useTasks();

  return (
    <div className="container p-3 d-flex flex-column">
      <h1 className="h6">Anyway Labs Test Project</h1>
      <p><small>Just some good deeds</small></p>

      {Boolean(error) &&
        <ErrorAlert message={error?.message} />
      }

      {Boolean(isLoading) &&
        <LoadingAlert />
      }

      {Boolean(tasks) &&
        <Board tasks={tasks} />
      }
    </div>
  )
}

export default App
