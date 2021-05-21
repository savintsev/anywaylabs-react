import { createServer, Model, Factory } from 'miragejs';
import faker from 'faker';
import { Task } from '../fetchers';

export function makeServer({ environment = 'test' } = {}) {
  return createServer({
    environment,


    factories: {
      task: Factory.extend<Partial<Task>>({
        get title() {
          return faker.random.words();
        },
      }),
    },

    models: {
      task: Model.extend<Partial<Task>>({}),
    },

    routes() {
      this.namespace = 'api';

      this.get('tasks');
    },

    seeds(server) {
      server.createList('task', 20);
    },
  });
};
