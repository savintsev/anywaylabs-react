import React from 'react';
import { Actions, TaskStatuses } from './constants';

type TaskType = {
  id: string;
  title: string;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
};

type StateItemType = {
  tasks: TaskType[];
  status: string;
  error: Error | null;
};

type StateType = {
  [TaskStatuses.created]: StateItemType;
  [TaskStatuses.started]: StateItemType;
  [TaskStatuses.finished]: StateItemType;
};

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  style?: 'primary' | 'dark' | 'success';
  outline?: boolean;
  icon?: React.ReactNode;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

type CostProps = {
  startedAt?: number | null;
  finishedAt?: number | null;
};

type CountProps = {
  number: number;
};

type ErrorAlertProps = {
  message?: string;
};

type LoadingProps = {
  count?: number;
};

type PanelType = [
  keyof typeof TaskStatuses,
  string
];

type PanelsType = {
  [key in TaskStatuses]: string;
};

type PanelProps = {
  title: string;
  children?: React.ReactNode;
  controls?: React.ReactNode;
};

type TimerProps = {
  startedAt?: number | null;
};

type ActionType =
  | { type: 'FETCH_TASKS_INIT' }
  | { type: 'FETCH_TASKS_SUCCESS'; tasks: TaskType[] }
  | { type: 'FETCH_TASKS_FAILED'; error: Error }
  | { type: 'ADD_TASK_INIT' }
  | { type: 'ADD_TASK_SUCCESS'; task: TaskType }
  | { type: 'ADD_TASK_FAILED'; error: Error }
  | { type: 'START_TASK_INIT' }
  | { type: 'START_TASK_SUCCESS'; task: TaskType }
  | { type: 'START_TASK_FAILED'; error: Error }
  | { type: 'RESOLVE_TASK_INIT' }
  | { type: 'RESOLVE_TASK_SUCCESS'; task: TaskType }
  | { type: 'RESOLVE_TASK_FAILED'; error: Error };

type AsyncAction =
  | { type: Actions.fetch }
  | { type: Actions.add; title: string }
  | { type: Actions.start; id: string }
  | { type: Actions.resolve; id: string };

interface ITimerHook {
  (startedAt: number): {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  };
}

interface ITasksFilter {
  (task: TaskType): boolean;
}

interface ITaskPrinter {
  (value: TaskType, index: number, array: TaskType[]): JSX.Element;
}
