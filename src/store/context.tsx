import React, { Reducer, Dispatch, createContext } from 'react';
import { useReducerAsync } from 'use-reducer-async';

import {
  reducer,
  initialState,
  asyncActionHandlers
} from './';
import { ActionType, AsyncAction, StateType } from '../type';

export const AppContext = createContext<{
  state: StateType;
  dispatch: Dispatch<AsyncAction>;
}>({
  state: initialState,
  dispatch: () => null
});

export const AppProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducerAsync<
    Reducer<StateType, ActionType>,
    AsyncAction,
    AsyncAction
  >(
    reducer,
    initialState,
    asyncActionHandlers
  );

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default {
  AppProvider,
  AppContext,
};
