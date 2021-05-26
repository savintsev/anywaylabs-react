import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { makeServer } from './mirage/server';
import './assets/main.css';

const environment = process.env.NODE_ENV;

if (environment !== 'production') {
  makeServer({ environment });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
