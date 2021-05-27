import React from 'react';
import { TaskType } from '../types';

export const Task: React.FC<TaskType> = ({
  id,
  title,
  createdAt,
  startedAt,
  finishedAt
}) => {
  return (
    <article>
      <h3>{title}</h3>
    </article>
  );
};

export default Task;
