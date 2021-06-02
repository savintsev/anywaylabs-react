import React from 'react';

import {
  NewTask,
} from './components';

import {
  createdTasks,
  startedTasks,
  finishedTasks,
} from './helpers';

export const RUB_PER_HOUR = 1000;

export const PANELS = [
  {
    title: 'To do',
    filter: createdTasks,
    controls: <NewTask />,
  },
  {
    title: 'In progress',
    filter: startedTasks,
  },
  {
    title: 'Done',
    filter: finishedTasks,
  },
];

export enum actionTypes {
  add = 'ADD',
  start = 'START',
  resolve = 'RESOLVE',
};
