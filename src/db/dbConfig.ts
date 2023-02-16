import { type PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// TODO: put connection info into a more secure .env / secrets / config. type of place

// More about using entity files to drive migrations:
//    https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#generating-migrations
//    TLDR: typeorm migration:generate -n

// this is for regular application / typeorm database access
const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  logging: true,
  host: 'localhost',
  port: 5432,
  username: 'e-comm_test',
  password: 'e-comm_test',
  database: 'e-comm_test',
  // FIXME: do not use 'true' in production
  synchronize: true,
};

export default dbConfig;
