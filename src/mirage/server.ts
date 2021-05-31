import {
  createServer,
  Factory,
  Model,
  ModelInstance,
  Server,
} from 'miragejs';

import {
  randomBoolean,
  randomDate,
  randomEmoji,
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
            ).getTime() : null,
          });

          task.update({
            finishedAt: randomBoolean() && task.startedAt ? randomDate(
              new Date(task.startedAt),
              new Date()
            ).getTime() : null
          });
        },
      }),
    },

    seeds(server) {
      server.createList('task', 5);
    },

    routes() {
      this.namespace = 'api';

      this.get('/tasks');

      this.post('/add', (schema, request) => {
        const body = JSON.parse(request.requestBody);
        console.log({body});
      });
    },
  });
}
