import React, { useState } from 'react'
import useSWR from 'swr';
import Panel from './components/Panel';
import { fetchTasks } from './fetchers';
import 'bootstrap/dist/css/bootstrap.css';

export const App: React.FC = () => {
  // const [count, setCount] = useState(0);
  const { data, error } = useSWR('/api/tasks', fetchTasks);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="container p-3 d-flex flex-column">
      <h1 className="h6">Anyway Labs Test Project</h1>

      <p><small>Just some good deeds</small></p>

      <div className="row gx-3 flex-grow-1">
        <Panel title="To do"></Panel>
        <Panel title="In progress"></Panel>
        <Panel title="Done"></Panel>
      </div>
    </div>
  )
}

export default App
