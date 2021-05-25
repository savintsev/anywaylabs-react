export type Task = {
  id: string;
  title: string;
  createdAt: number;
  startedAt?: number;
  finishedAt?: number;
};

export type TaskResponse = {
  tasks: Task[];
};

export const fetchTasks = (url: string) =>
  fetch(url).then<TaskResponse>((r) => r.json());
