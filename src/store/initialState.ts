import { StateType } from '../type';
import { TaskStatuses } from '../constants';

export const initialState: StateType = {
  [TaskStatuses.created]: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  [TaskStatuses.started]: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  [TaskStatuses.finished]: {
    tasks: [],
    status: 'idle',
    error: null,
  },
};

export default initialState;
