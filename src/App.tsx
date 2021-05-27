import React from 'react';
import useSWR from 'swr';
import Board from './components/Board';
import { ErrorAlert, LoadingAlert } from './components/alerts';
import { fetchTasks } from './fetchers';
import 'bootstrap/dist/css/bootstrap.css';

export const App: React.FC = () => {
  const { data, error } = useSWR('/api/tasks', fetchTasks);

  return (
    <div className="container p-3 d-flex flex-column">
      <h1 className="h6">Anyway Labs Test Project</h1>
      <p><small>Just some good deeds</small></p>

      {Boolean(error) &&
        <ErrorAlert message={error.message} />
      }

      {Boolean(!error && !data) &&
        <LoadingAlert />
      }

      {Boolean(!error && data) &&
        <Board tasks={data?.tasks} />
      }
    </div>
  )
}

export default App
