import React, { useEffect, useState } from 'react';
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

export const useTasks1 = () => {
  const controller = new AbortController();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [requestOptions, setRequestOptions] = useState({
    signal: controller.signal,
  });

  const fetchData = async () => {
    try {
      const response = await fetch('/api/tasks', requestOptions);

      setData(await response.json());
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = (title: string) => {
    setRequestOptions(state => ({
      ...state,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    }));

    fetchData();
  };

  const startTask = (id: string, isStart: boolean) => {
    setRequestOptions(state => ({
      ...state,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isStart })
    }));

    fetchData();
  };

  const resolveTask = (id: string, isResolve: boolean) => {
    setRequestOptions(state => ({
      ...state,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isResolve })
    }));

    fetchData();
  };

  useEffect(() => {

    setIsLoading(true);

    (async () => {
      try {
        const response = await fetch('/api/tasks', requestOptions);

        setData(await response.json());
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller?.abort();
  }, []);

  return {
    tasks: data?.tasks,
    isLoading,
    error,
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
