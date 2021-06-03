import React from 'react';
import { useReducerAsync } from 'use-reducer-async';

import {
  reducer,
  initialState,
  asyncActionHandlers,
  AppContext,
} from './';

export const AppProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducerAsync(
    reducer,
    initialState,
    asyncActionHandlers
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
