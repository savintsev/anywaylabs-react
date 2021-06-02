import React, { useReducer } from 'react';

import {
  initialState,
  StateContext,
  DispatchContext,
} from './';

export const AppProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default AppProvider;
