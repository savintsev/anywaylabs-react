export type BoardProps = {
  tasks?: TaskType[];
};

export type ErrorAlertProps = {
  message: string;
};

export type PanelProps = {
  title: string;
  children?: React.ReactNode;
  controls?: React.ReactNode;
};

export type TaskType = {
  id: string;
  title: string;
  createdAt: number;
  startedAt?: number;
  finishedAt?: number;
};

export type TaskResponse = {
  tasks: TaskType[];
};

export interface TasksFilter {
  (task: TaskType): boolean;
};

export interface TaskPrinter {
  (value: TaskType, index: number, array: TaskType[]): JSX.Element
}
