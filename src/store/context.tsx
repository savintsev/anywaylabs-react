import React, {Dispatch, createContext} from 'react';
import { useReducerAsync } from 'use-reducer-async';

import {
  reducer,
  initialState,
  asyncActionHandlers
} from './';

export const AppContext = createContext<{
  state: StateType;
  dispatch: Dispatch<TaskActions>;
}>({
  state: initialState,
  dispatch: () => null
});

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

export default {
  AppProvider,
  AppContext,
};
