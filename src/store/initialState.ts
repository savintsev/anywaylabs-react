import { StateType } from '../type';
import { Statuses, TaskStatuses } from '../constants';

export const initialState: StateType = {
  [TaskStatuses.created]: {
    tasks: [],
    status: Statuses.idle,
    error: null,
  },
  [TaskStatuses.started]: {
    tasks: [],
    status: Statuses.idle,
    error: null,
  },
  [TaskStatuses.finished]: {
    tasks: [],
    status: Statuses.idle,
    error: null,
  },
};

export default initialState;
