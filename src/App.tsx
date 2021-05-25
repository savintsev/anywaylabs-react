import React, { useState } from 'react'
import useSWR from 'swr';
import { fetchTasks } from './fetchers';
// import logo from './logo.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0);
  const { data, error } = useSWR('/api/tasks', fetchTasks);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log({data});

  return (
    <div className="App">123
    </div>
  )
}

export default App
