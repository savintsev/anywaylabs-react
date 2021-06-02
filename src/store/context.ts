import { createContext } from 'react';

import { initialState } from './';

export const StateContext = createContext<StateType>(initialState);
export const DispatchContext = createContext(() => null);

export default {
    StateContext,
    DispatchContext,
};
