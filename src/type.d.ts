import React from 'react';
import { Actions } from './constants';

type TaskType = {
  id: string;
  title: string;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
};

type StateItemType = {
  tasks: TaskType[] | null;
  status: string;
  error: Error | null;
};

type StateType = {
  created: StateItemType;
  started: StateItemType;
  finished: StateItemType;
};

interface ITasksFilter {
  (task: TaskType): boolean;
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

type TaskPayload = {
  [Actions.fetch]: {};
  [Actions.add]: {
    title: string;
  };
  [Actions.start]: {
    id: string;
    isStart: boolean;
  };
  [Actions.resolve]: {
    id: string;
    isResolve: boolean;
  };
};

type TaskActions = ActionMap<TaskPayload>[keyof ActionMap<
  TaskPayload
>];

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

type ErrorAlertProps = {
  message?: string;
};

type LoadingProps = {
  count?: number;
};

type PanelProps = {
  title: string;
  children?: React.ReactNode;
  controls?: React.ReactNode;
};

type TimerProps = {
  startedAt?: number | null;
};
