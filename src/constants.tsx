export const RUB_PER_HOUR = 1000;

export enum Actions {
  fetch = 'FETCH_TASKS',
  add = 'ADD_TASK',
  start = 'START_TASK',
  resolve = 'RESOLVE_TASK',
};

export enum Statuses {
  idle = 'idle',
  loading = 'loading',
  fail = 'fail',
};

export const Panels = {
  created: 'To do',
  started: 'In progress',
  finished: 'Done',
};