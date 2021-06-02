import { actionTypes } from '../constants';

type TaskPayload = {
  [actionTypes.add]: {
    id: number;
    title: string;
    createdAt: number;
    startedAt?: number;
    finishedAt?: number;
  };
  [actionTypes.start]: {
    id: number;
  };
  [actionTypes.resolve]: {
    id: number;
  };
};

export type TaskActions = ActionMap<TaskPayload>[keyof ActionMap<
  TaskPayload
>];

export const taskReducer = (state: StateType, action: TaskActions) => {
  switch (action.type) {
    case actionTypes.add:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: action.payload.id,
            title: action.payload.title,
            createdAt: action.payload.createdAt,
            startedAt: action.payload.startedAt,
            finishedAt: action.payload.finishedAt,
          }
        ]
      };

    case actionTypes.start:
      return 2;

    case actionTypes.resolve:
      return 3;

    default:
      return state;
  }
};
