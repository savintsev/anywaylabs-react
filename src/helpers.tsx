import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import { Task } from './components';

import {
  TasksFilter,
  TaskPrinter,
  TaskResponse,
  TasksHook,
  TimerHook
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

export const fetchTasks = (url: string) =>
  fetch(url).then<TaskResponse>((r) => r.json());

export const useTasks: TasksHook = () => {
  const { data, error } = useSWR('/api/tasks', fetchTasks);

  return {
    tasks: data?.tasks,
    isLoading: !error && !data,
    error,
  }
};

export const useTimer: TimerHook = (startedAt) => {
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
