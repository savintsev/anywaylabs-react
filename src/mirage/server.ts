import {
  createServer,
  Model,
  Factory,
  Server,
  ModelInstance
} from 'miragejs';

import {
  randomEmoji,
  randomDate,
  randomBoolean
} from './helpers';

import { TaskType } from '../types';

type FactoryParams<Data> = {
  [key in keyof Partial<Data>]: () => Data[key];
} & {
  afterCreate: (task: ModelInstance<Data>, server: Server) => void;
};

export function makeServer({ environment = 'test' } = {}) {
  return createServer({
    environment,

    models: {
      task: Model.extend<Partial<TaskType>>({}),
    },

    factories: {
      task: Factory.extend<FactoryParams<TaskType>>({
        title() {
          return `Task Title ${randomEmoji()}`;
        },

        createdAt() {
          return randomDate(new Date(2021, 4, 1), new Date()).getTime();
        },

        afterCreate(task) {
          task.update({
            startedAt: randomBoolean() ? randomDate(
              new Date(2021, 0, 1),
              new Date(task.createdAt)
            ).getTime() : undefined,
          });

          task.update({
            finishedAt: randomBoolean() && task.startedAt ? randomDate(
              new Date(task.startedAt),
              new Date()
            ).getTime() : undefined
          });
        },
      }),
    },

    seeds(server) {
      server.createList('task', 5);
    },

    routes() {
      this.namespace = 'api';

      this.get('tasks');
    },
  });
};
