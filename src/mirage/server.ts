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

import { TaskType } from '../type';

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

      this.post('/tasks', (schema, request) => {
        const body = JSON.parse(request.requestBody);

        return schema.tasks.create({
          createdAt: new Date().getTime(),
          title: body.title,
          startedAt: null,
          finishedAt: null,
        });
      });

      this.patch('/tasks', (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const { id } = body;
        const task = schema.tasks.find(id);

        if (body.isStart) {
          return task.update({ startedAt: new Date().getTime() });
        }
        if (body.isResolve) {
          return task.update({ finishedAt: new Date().getTime() });
        }

        return null;
      });
    },
  });
}
