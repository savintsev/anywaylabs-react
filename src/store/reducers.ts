import React, { Reducer } from 'react';
import { AsyncActionHandlers } from 'use-reducer-async';

import {
  Actions,
  API_URL,
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
  }

  case 'FETCH_TASKS_SUCCESS': {
    const allTasks = action.tasks;

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
  }

  case 'FETCH_TASKS_FAILED': {
    const { error } = action;

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
  }

  case 'ADD_TASK_INIT': {
    return {
      ...state,

      created: {
        ...state.created,
        status: 'loading',
      },
    };
  }

  case 'ADD_TASK_SUCCESS': {
    return {
      ...state,

      created: {
        ...state.created,
        tasks: [
          ...state.created.tasks,
          action.task
        ],
        status: 'idle',
      },
    };
  }

  case 'ADD_TASK_FAILED': {
    return {
      ...state,

      created: {
        ...state.created,
        status: 'fail',
        error: action.error,
      },
    };
  }

  case 'START_TASK_INIT': {
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
  }

  case 'START_TASK_SUCCESS': {
    const startedTask = action.task;

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
  }

  case 'START_TASK_FAILED': {
    return {
      ...state,

      started: {
        ...state.started,
        status: 'fail',
        error: action.error,
      },
    };
  }

  case 'RESOLVE_TASK_INIT': {
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
  }

  case 'RESOLVE_TASK_SUCCESS': {
    const finishedTask = action.task;

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
  }

  case 'RESOLVE_TASK_FAILED': {
    return {
      ...state,

      finished: {
        ...state.finished,
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
