import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useReducerAsync } from 'use-reducer-async';

import { Task } from './components';

import {
  TasksFilter,
  TaskPrinter,
  TaskResponse,
  TasksHook,
  TimerHook,
} from './types';

export const createdTasks: ITasksFilter = task => Boolean(task.createdAt && !task.startedAt && !task.finishedAt);

export const startedTasks: ITasksFilter = task => Boolean(task.createdAt && task.startedAt && !task.finishedAt);

export const finishedTasks: ITasksFilter = task => Boolean(task.createdAt && task.startedAt && task.finishedAt);

export const printTask: TaskPrinter = ({
  id,
  title,
  createdAt,
  startedAt,
  finishedAt
}) => (
  <Task
    key={id}
    id={id}
    title={title}
    createdAt={createdAt}
    startedAt={startedAt}
    finishedAt={finishedAt}
  />
);

export const fetchTasks = (url: string) => fetch(url).then<TaskResponse>(res => res.json());

export const useTasks: TasksHook = () => {
  const { data, error } = useSWR('/api/tasks', fetchTasks);

  return {
    tasks: data?.tasks,
    isLoading: !error && !data,
    error,
  };
};

export const useTasks1 = (isFetch = false) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();
  // const [requestOptions, setRequestOptions] = useState({
  //   signal,
  // });

  const sendRequest = async (requestOptions) => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/tasks', requestOptions);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setData(await response.json());
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const taskOperations = {
    add: (title: string) => {
      // setRequestOptions(state => ({
      //   ...state,
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ title })
      // }));

      sendRequest({
        signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      }).then(() => sendRequest({signal}));
    },

    start: (id: string) => {
      // setRequestOptions(state => ({
      //   ...state,
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ id, isStart: true })
      // }));

      sendRequest({
        signal,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isStart: true })
      });
    },

    resolve: (id: string) => {
      // setRequestOptions(state => ({
      //   ...state,
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ id, isResolve: true })
      // }));

      sendRequest({
        signal,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isResolve: true })
      });
    },
  };

  useEffect(() => {
    if (isFetch) {
      sendRequest({signal});
    }

    return () => controller?.abort();
  }, [isFetch]);

  const addTask = useCallback(
    (title: string) => taskOperations.add(title), []
  );

  const startTask = useCallback(
    (id: string) => taskOperations.start(id), []
  );

  const resolveTask = useCallback(
    (id: string) => taskOperations.resolve(id), []
  );

  return {
    isLoading,
    error,
    data,
    addTask,
    startTask,
    resolveTask,
  };
};

export const useTimer: TimerHook = startedAt => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  const updateTimer = (startStamp: number): void => {
    const now = new Date();
    const nowStamp = now.getTime();

    let diff = Math.round((nowStamp - startStamp) / 1000);

    const days = Math.floor(diff / (24 * 60 * 60));
    diff = diff - (days * 24 * 60 * 60);

    const hours = Math.floor(diff / (60 * 60));
    diff = diff - (hours * 60 * 60);

    const minutes = Math.floor(diff / 60);
    diff = diff - (minutes * 60);

    const seconds = diff;

    setTime(state => ({
      ...state,
      seconds,
      minutes,
      hours,
      days,
    }));
  };

  useEffect(() => {
    const timerInerval = setInterval(updateTimer, 1000, startedAt);

    return () => clearInterval(timerInerval);
  }, []);

  return time;
};

// export const tasksReducer = (state, action) => {
//   switch(action.type) {
//     case 'ADD':
//       return 1;

//     case 'START':
//       return 2;

//     case 'RESOLVE':
//       return 3;

//     default:
//       return state;
//   }
// };

export const useDataAPI = () => {
  const dataReducer = (state, action) => {
    switch (action.type) {
      case 'a1':
        return {...state, status: 'a1'};
      case 'a2':
        return {...state, status: 'a2'};
      default:
        return state;
    }
  };

  const initialState = {
    tasks: [],
    status: 'idle',
    error: null,
  };

  const [state, dispatch] = useReducerAsync(reducer, initialState, asyncActionHandlers);

  return [state, dispatch];
};

export const TaskIcon: React.FunctionComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
    <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
  </svg>
);
