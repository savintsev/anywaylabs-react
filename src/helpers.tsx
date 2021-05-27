import React from 'react';
import Task from './components/Task';
import { TasksFilter, TaskPrinter } from './types';

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
