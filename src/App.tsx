import React, { useState } from 'react'
import useSWR from 'swr';
import { fetchTasks } from './fetchers';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  // const [count, setCount] = useState(0);
  const { data, error } = useSWR('/api/tasks', fetchTasks);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="container py-3">
      <h1 className="h6">Anyway Labs Test Project</h1>

      <p>Just some good deeds</p>

      <div className="row align-items-start gx-3">
        <div className="col">
          <div className="p-3 border bg-light rounded">Custom column padding</div>
        </div>
        <div className="col">
          <div className="p-3 border bg-light rounded">Custom column padding</div>
        </div>
        <div className="col">
          <div className="p-3 border bg-light rounded">Custom column padding</div>
        </div>
      </div>
    </div>
  )
}

export default App
