import React, { useEffect, useState } from 'react';
import { Task } from './components';
import {
  ITaskPrinter,
  ITasksFilter,
  ITimerHook
} from './type';

export const createdTasks: ITasksFilter = task => Boolean(
  task.createdAt && !task.startedAt && !task.finishedAt
);

export const startedTasks: ITasksFilter = task => Boolean(
  task.createdAt && task.startedAt && !task.finishedAt
);

export const finishedTasks: ITasksFilter = task => Boolean(
  task.createdAt && task.startedAt && task.finishedAt
);

export const printTask: ITaskPrinter = ({
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

export const useTimer: ITimerHook = startedAt => {
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

export const TaskIcon: React.FunctionComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
    <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
  </svg>
);
