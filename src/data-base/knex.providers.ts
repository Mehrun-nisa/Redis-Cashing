import { knex } from 'knex';

export const knexProvider = [
  {
    provide: 'KNEX_CONNECTION',
    useFactory: async () => {
      return knex({
        client: 'mysql2',
        connection: {
          host: 'localhost',
          user: 'root',
          password: '123456789',
          database: 'redis_demo',
        },
      });
    },
  },
];
