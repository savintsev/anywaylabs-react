type TaskType = {
  id: string;
  title: string;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
};

type StateType = {
  tasks: TaskType[] | null;
  status: 'idle' | 'loading' | 'failed';
  error: Error | null;
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
