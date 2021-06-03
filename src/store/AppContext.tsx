import { createContext } from 'react';

import { initialState } from '.';

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<TaskActions>;
}>({
  state: initialState,
  dispatch: () => null
});

export default AppContext;
