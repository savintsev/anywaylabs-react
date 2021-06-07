import React, { Reducer } from 'react';
import { AsyncActionHandlers } from 'use-reducer-async';

import {
  Actions,
  API_URL,
  TaskStatuses,
} from '../constants';
import {
  createdTasks,
  startedTasks,
  finishedTasks,
} from '../helpers';
import {
  ActionType,
  AsyncAction,
  StateType,
} from '../type';

export const reducer: Reducer<StateType, ActionType> = (state, action) => {
  switch (action.type) {
  case 'FETCH_TASKS_INIT': {
    return {
      [TaskStatuses.created]: {
        ...state[TaskStatuses.created],
        status: 'loading',
      },

      [TaskStatuses.started]: {
        ...state[TaskStatuses.started],
        status: 'loading',
      },

      [TaskStatuses.finished]: {
        ...state[TaskStatuses.finished],
        status: 'loading',
      },
    };
  }

  case 'FETCH_TASKS_SUCCESS': {
    const allTasks = action.tasks;

    return {
      [TaskStatuses.created]: {
        ...state[TaskStatuses.created],
        tasks: allTasks.filter(createdTasks),
        status: 'idle',
      },

      [TaskStatuses.started]: {
        ...state[TaskStatuses.started],
        tasks: allTasks.filter(startedTasks),
        status: 'idle',
      },

      [TaskStatuses.finished]: {
        ...state[TaskStatuses.finished],
        tasks: allTasks.filter(finishedTasks),
        status: 'idle',
      },
    };
  }

  case 'FETCH_TASKS_FAILED': {
    const { error } = action;

    return {
      [TaskStatuses.created]: {
        ...state[TaskStatuses.created],
        status: 'fail',
        error,
      },

      [TaskStatuses.started]: {
        ...state[TaskStatuses.started],
        status: 'fail',
        error,
      },

      [TaskStatuses.finished]: {
        ...state[TaskStatuses.finished],
        status: 'fail',
        error,
      },
    };
  }

  case 'ADD_TASK_INIT': {
    return {
      ...state,

      [TaskStatuses.created]: {
        ...state[TaskStatuses.created],
        status: 'loading',
      },
    };
  }

  case 'ADD_TASK_SUCCESS': {
    return {
      ...state,

      [TaskStatuses.created]: {
        ...state[TaskStatuses.created],
        tasks: [
          ...state[TaskStatuses.created].tasks,
          action.task
        ],
        status: 'idle',
      },
    };
  }

  case 'ADD_TASK_FAILED': {
    return {
      ...state,

      [TaskStatuses.created]: {
        ...state[TaskStatuses.created],
        status: 'fail',
        error: action.error,
      },
    };
  }

  case 'START_TASK_INIT': {
    return {
      ...state,

      [TaskStatuses.created]: {
        ...state[TaskStatuses.created],
        status: 'loading',
      },

      [TaskStatuses.started]: {
        ...state[TaskStatuses.started],
        status: 'loading',
      }
    };
  }

  case 'START_TASK_SUCCESS': {
    const startedTask = action.task;

    const filteredCreatedTasks = [...state[TaskStatuses.created].tasks]
      .filter(item => item.id !== startedTask.id);

    return {
      ...state,

      [TaskStatuses.created]: {
        ...state[TaskStatuses.created],
        tasks: filteredCreatedTasks,
        status: 'idle',
      },

      [TaskStatuses.started]: {
        ...state[TaskStatuses.started],
        tasks: [
          ...state[TaskStatuses.started].tasks,
          startedTask,
        ],
        status: 'idle',
      },
    };
  }

  case 'START_TASK_FAILED': {
    return {
      ...state,

      [TaskStatuses.started]: {
        ...state[TaskStatuses.started],
        status: 'fail',
        error: action.error,
      },
    };
  }

  case 'RESOLVE_TASK_INIT': {
    return {
      ...state,

      [TaskStatuses.started]: {
        ...state[TaskStatuses.started],
        status: 'loading',
      },

      [TaskStatuses.finished]: {
        ...state[TaskStatuses.finished],
        status: 'loading',
      }
    };
  }

  case 'RESOLVE_TASK_SUCCESS': {
    const finishedTask = action.task;

    const filteredStartedTasks = [...state[TaskStatuses.started].tasks]
      .filter(item => item.id !== finishedTask.id);

    return {
      ...state,

      [TaskStatuses.started]: {
        ...state[TaskStatuses.started],
        tasks: filteredStartedTasks,
        status: 'idle',
      },

      [TaskStatuses.finished]: {
        ...state[TaskStatuses.finished],
        tasks: [
          ...state[TaskStatuses.finished].tasks,
          finishedTask,
        ],
        status: 'idle',
      },
    };
  }

  case 'RESOLVE_TASK_FAILED': {
    return {
      ...state,

      [TaskStatuses.finished]: {
        ...state[TaskStatuses.finished],
        status: 'fail',
        error: action.error,
      },
    };
  }

  default:
    return state;
  }
};

export const asyncActionHandlers: AsyncActionHandlers<React.Reducer<StateType, ActionType>, AsyncAction> = {
  [Actions.fetch]: ({ dispatch }) => async () => {
    dispatch({ type: 'FETCH_TASKS_INIT' });

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const { tasks } = data;

      if (!tasks) {
        throw new Error('Can\'t fetch tasks. Server error');
      }

      dispatch({
        type: 'FETCH_TASKS_SUCCESS',
        tasks
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_TASKS_FAILED',
        error
      });
    }
  },

  [Actions.add]: ({ dispatch }) => async action => {
    dispatch({ type: 'ADD_TASK_INIT' });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: action.title
        })
      });
      const data = await response.json();
      const { task } = data;

      if (!task) {
        throw new Error('Task not added. Server error');
      }

      dispatch({
        type: 'ADD_TASK_SUCCESS',
        task
      });
    } catch (error) {
      dispatch({
        type: 'ADD_TASK_FAILED',
        error
      });
    }
  },

  [Actions.start]: ({ dispatch }) => async action => {
    dispatch({ type: 'START_TASK_INIT' });

    try {
      const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: action.id,
          isStart: true
        })
      });
      const data = await response.json();
      const { task } = data;

      if (!task) {
        throw new Error('Task not started. Server error');
      }

      dispatch({
        type: 'START_TASK_SUCCESS',
        task
      });
    } catch (error) {
      dispatch({
        type: 'START_TASK_FAILED',
        error
      });
    }
  },

  [Actions.resolve]: ({ dispatch }) => async action => {
    dispatch({ type: 'RESOLVE_TASK_INIT' });

    try {
      const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: action.id,
          isResolve: true
        })
      });
      const data = await response.json();
      const { task } = data;

      if (!task) {
        throw new Error('Task not resolved. Server error');
      }

      dispatch({
        type: 'RESOLVE_TASK_SUCCESS',
        task
      });
    } catch (error) {
      dispatch({
        type: 'RESOLVE_TASK_FAILED',
        error
      });
    }
  },
};
