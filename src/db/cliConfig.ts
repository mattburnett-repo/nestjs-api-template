import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

// this is for typeorm (the cli) database access, not app-level database access
//    newer versions of typeorm cli expect DataSource
//  TODO: this is referred to as 'ormconfig.ts' in some TypeORM docs

// More about using entity files to drive migrations:
//    https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#generating-migrations
//    TLDR: typeorm migration:generate -n

// added types / options for seeding
//    https://typeorm-extension.tada5hi.net/guide/seeding.html

const options: DataSourceOptions & SeederOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'e-comm_test',
  password: 'e-comm_test',
  database: 'e-comm_test',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/db/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
  seeds: ['src/db/seeds/**/*{.ts,.js}'],
  factories: ['src/db/factories/**/*{.ts,.js}'],
};

export const cliConfig = new DataSource(options);
