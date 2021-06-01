import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

import { Task } from './components';

import {
  TasksFilter,
  TaskPrinter,
  TaskResponse,
  TasksHook,
  TimerHook,
} from './types';

export const createdTasks: TasksFilter = task => Boolean(task.createdAt && !task.startedAt && !task.finishedAt);

export const startedTasks: TasksFilter = task => Boolean(task.createdAt && task.startedAt && !task.finishedAt);

export const finishedTasks: TasksFilter = task => Boolean(task.createdAt && task.startedAt && task.finishedAt);

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

export const tasksInitialState = {
  isLoading: false,
  error: null,
  tasks: 0
};

export const tasksReducer = (state, action) => {
  switch(action.type) {
    case 'ADD':
      return 1;

    case 'START':
      return 2;

    case 'RESOLVE':
      return 3;

    default:
      throw new Error('Unknown action type. Check reducer');
  }
};
