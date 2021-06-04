import React from 'react';

export type ErrorAlertProps = {
  message?: string;
};

export type PanelProps = {
  title: string;
  children?: React.ReactNode;
  controls?: React.ReactNode;
};

export type TimerProps = {
  startedAt?: number;
};

export type TaskType = {
  id: string;
  title: string;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
};

export type BoardProps = {
  tasks?: TaskType[];
};

export type TaskResponse = {
  tasks: TaskType[];
};

export interface TasksFilter {
  (task: TaskType): boolean;
}

export interface TaskPrinter {
  (value: TaskType, index: number, array: TaskType[]): JSX.Element;
}

export interface TasksHook {
  (): {
    tasks?: TaskType[];
    isLoading?: boolean;
    error?: Error;
  };
}

export interface TimerHook {
  (startedAt: number): {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  };
}
