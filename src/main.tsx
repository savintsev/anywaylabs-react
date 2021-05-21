import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { makeServer } from './mirage/server';

const environment = process.env.NODE_ENV;

if (environment !== 'production') {
  makeServer({ environment });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
