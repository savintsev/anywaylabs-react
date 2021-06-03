type TaskType = {
  id: string;
  title: string;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
};

type StateItemType = {
  tasks: TaskType[] | null;
  status: 'idle' | 'loading' | 'failed';
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
