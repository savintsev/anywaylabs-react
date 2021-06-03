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

export const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_INIT':
      return {
        created: {
          status: 'loading',
        },
        started: {
          status: 'loading',
        },
        finished: {
          status: 'loading',
        },
      };
    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload.tasks,
        status: 'idle',
      };
    case 'FETCH_TASKS_FAILED':
      return {
        ...state,
        status: 'fail',
        error: action.payload,
      };

    case 'ADD_TASK_INIT':
      return {
        ...state,
        status: 'loading',
      };
    case 'ADD_TASK_SUCCESS':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload.task
        ],
        status: 'idle',
      };
    case 'ADD_TASK_FAILED':
      return {
        ...state,
        status: 'fail',
        error: action.payload,
      };

    case 'START_TASK_INIT':
      return {
        ...state,
        status: 'loading',
      };
    case 'START_TASK_SUCCESS':
      const startTaskIndex = state.tasks.findIndex(item => item.id === action.payload.task.id);
      const startTasksWithNew = [...state.tasks];
      startTasksWithNew[startTaskIndex] = action.payload.task;

      return {
        ...state,
        tasks: startTasksWithNew,
        status: 'idle',
      };
    case 'START_TASK_FAILED':
      return {
        ...state,
        status: 'fail',
        error: action.payload,
      };

    case 'RESOLVE_TASK_INIT':
      return {
        ...state,
        status: 'loading',
      };
    case 'RESOLVE_TASK_SUCCESS':
      const resolveTaskIndex = state.tasks.findIndex(item => item.id === action.payload.task.id);
      const resolveTasksWithNew = [...state.tasks];
      resolveTasksWithNew[resolveTaskIndex] = action.payload.task;

      return {
        ...state,
        tasks: resolveTasksWithNew,
        status: 'idle',
      };
    case 'RESOLVE_TASK_FAILED':
      return {
        ...state,
        status: 'fail',
        error: action.payload,
      };

    default:
      throw new Error('no such action type');
  }
};

export const asyncActionHandlers = {
  FETCH_TASKS: ({ dispatch }) => async () => {
    dispatch({ type: 'FETCH_TASKS_INIT' });

    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_FAILED', payload: error });
    }
  },

  ADD_TASK: ({ dispatch }) => async (action) => {
    dispatch({ type: 'ADD_TASK_INIT' });

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: action.payload })
      });
      const data = await response.json();
      dispatch({ type: 'ADD_TASK_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'ADD_TASK_FAILED', payload: error });
    }
  },

  START_TASK: ({ dispatch }) => async (action) => {
    dispatch({ type: 'START_TASK_INIT' });

    try {
      const response = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: action.payload, isStart: true })
      });
      const data = await response.json();
      dispatch({ type: 'START_TASK_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'START_TASK_FAILED', payload: error });
    }
  },

  RESOLVE_TASK: ({ dispatch }) => async (action) => {
    dispatch({ type: 'RESOLVE_TASK_INIT' });

    try {
      const response = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: action.payload, isResolve: true })
      });
      const data = await response.json();
      dispatch({ type: 'RESOLVE_TASK_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'RESOLVE_TASK_FAILED', payload: error });
    }
  },
};
