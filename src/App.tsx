import React from 'react';
import { AppProvider } from './store';
import { Board } from './components';

export const App: React.FunctionComponent = () => {
  return (
    <div className="container p-3 d-flex flex-column">
      <h1 className="fs-6">Anyway Labs Test Project</h1>
      <p className="subtitle"><small>Just some good deeds</small></p>

      <AppProvider>
        <Board />
      </AppProvider>
    </div>
  );
};

export default App;
