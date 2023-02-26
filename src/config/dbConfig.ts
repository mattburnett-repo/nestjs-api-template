// https://stackoverflow.com/questions/59913475/configure-typeorm-with-one-configuration-for-cli-and-nestjs-application

import { registerAs } from '@nestjs/config'

export default registerAs('database', () => {
  return {
    type: process.env.DB_TYPE || 'postgres',
    logging: true,
    // logging: process.env.NODE_ENV === 'dev' || false,
    host: process.env.DB_HOST,
    // connectionString: process.env.DB_CONNECTION_STRING,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABSE_NAME,
    autoLoadEntities: true,
    synchronize: true,
    // synchronize: process.env.NODE_ENV !== 'prod' || false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    ssl: true,
    cli: {
      migrationsDir: '../db/migrations',
      subscribers: ['src/subscriber/**/*{.ts,.js}'],
      seeds: ['src/db/seeds/**/*{.ts,.js}'],
      factories: ['src/db/factories/**/*{.ts,.js}']
    }
  }
})
