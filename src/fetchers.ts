export type Task = {
  id: string;
  title: string;
  createdAt: number;
  startedAt: number;
  finishedAt: number;
};

type TaskResponse = {
  tasks: Task[];
};

export const fetchPeople = (url: string) =>
  fetch(url).then<TaskResponse>((r) => r.json());
