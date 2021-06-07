import { PanelsType } from './type';

export const API_URL = '/api/tasks';

export const RUB_PER_HOUR = 1000;

export enum Actions {
  fetch = 'FETCH_TASKS',
  add = 'ADD_TASK',
  start = 'START_TASK',
  resolve = 'RESOLVE_TASK',
}

export enum Statuses {
  idle = 'idle',
  loading = 'loading',
  fail = 'fail',
}

export enum TaskStatuses {
  created = 'created',
  started = 'started',
  finished = 'finished',
}

export const Panels: PanelsType = {
  [TaskStatuses.created]: 'To do',
  [TaskStatuses.started]: 'In progress',
  [TaskStatuses.finished]: 'Done',
};
