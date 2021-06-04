import { Actions } from '../constants';

import {
  createdTasks,
  startedTasks,
  finishedTasks,
} from '../helpers';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_INIT':
      return {
        created: {
          ...state.created,
          status: 'loading',
        },

        started: {
          ...state.started,
          status: 'loading',
        },

        finished: {
          ...state.finished,
          status: 'loading',
        },
      };

    case 'FETCH_TASKS_SUCCESS':
      const allTasks = action.payload.tasks;

      return {
        created: {
          ...state.created,
          tasks: allTasks.filter(createdTasks),
          status: 'idle',
        },

        started: {
          ...state.started,
          tasks: allTasks.filter(startedTasks),
          status: 'idle',
        },

        finished: {
          ...state.finished,
          tasks: allTasks.filter(finishedTasks),
          status: 'idle',
        },
      };

    case 'FETCH_TASKS_FAILED':
      const error = action.payload;

      return {
        created: {
          ...state.created,
          status: 'fail',
          error,
        },

        started: {
          ...state.started,
          status: 'fail',
          error,
        },

        finished: {
          ...state.finished,
          status: 'fail',
          error,
        },
      };

    case 'ADD_TASK_INIT':
      return {
        ...state,

        created: {
          ...state.created,
          status: 'loading',
        },
      };

    case 'ADD_TASK_SUCCESS':
      return {
        ...state,

        created: {
          ...state.created,
          tasks: [
            ...state.created.tasks,
            action.payload.task
          ],
          status: 'idle',
        },
      };

    case 'ADD_TASK_FAILED':
      return {
        ...state,

        created: {
          ...state.created,
          status: 'fail',
          error: action.payload,
        },
      };

    case 'START_TASK_INIT':
      return {
        ...state,

        created: {
          ...state.created,
          status: 'loading',
        },

        started: {
          ...state.started,
          status: 'loading',
        }
      };

    case 'START_TASK_SUCCESS':
      const startedTask = action.payload.task;

      const filteredCreatedTasks = [...state.created.tasks]
        .filter(item => item.id !== startedTask.id);

      return {
        ...state,

        created: {
          ...state.created,
          tasks: filteredCreatedTasks,
          status: 'idle',
        },

        started: {
          ...state.started,
          tasks: [
            ...state.started.tasks,
            startedTask,
          ],
          status: 'idle',
        },
      };

    case 'START_TASK_FAILED':
      return {
        ...state,

        started: {
          ...state.started,
          status: 'fail',
          error: action.payload,
        },
      };

    case 'RESOLVE_TASK_INIT':
      return {
        ...state,

        started: {
          ...state.started,
          status: 'loading',
        },

        finished: {
          ...state.finished,
          status: 'loading',
        }
      };

    case 'RESOLVE_TASK_SUCCESS':
      const finishedTask = action.payload.task;

      const filteredStartedTasks = [...state.started.tasks]
        .filter(item => item.id !== finishedTask.id);

      return {
        ...state,

        started: {
          ...state.started,
          tasks: filteredStartedTasks,
          status: 'idle',
        },

        finished: {
          ...state.finished,
          tasks: [
            ...state.finished.tasks,
            finishedTask,
          ],
          status: 'idle',
        },
      };

    case 'RESOLVE_TASK_FAILED':
      return {
        ...state,

        finished: {
          ...state.finished,
          status: 'fail',
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export const asyncActionHandlers = {
  [Actions.fetch]: ({ dispatch }) => async () => {
    dispatch({ type: 'FETCH_TASKS_INIT' });

    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();

      dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_FAILED', payload: error });
    }
  },

  [Actions.add]: ({ dispatch }) => async (action) => {
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

  [Actions.start]: ({ dispatch }) => async (action) => {
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

  [Actions.resolve]: ({ dispatch }) => async (action) => {
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
