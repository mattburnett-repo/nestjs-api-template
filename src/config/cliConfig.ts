import { DataSource, DataSourceOptions } from 'typeorm'

import { config } from 'dotenv'

const ENV = process.env.NODE_ENV
console.log('ENV: ', ENV)

const envFile = !ENV ? '.env' : `.env.${ENV}`
console.log(`Loading environment variables from file: ${envFile}`)

config({ path: envFile })

console.log('cliConfig DB_DATABASE_NAME: ', process.env.DB_DATABASE_NAME)

const configOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  logging: true,
  // don't update database here. use migration:run instead.
  synchronize: false,
  migrationsRun: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../db/migrations/*.{js,ts}'],
  migrationsTableName: 'migrations',
  // Postgres database hosting expects SSL, but localhost doesn't.
  ssl: process.env.NODE_ENV === 'deployed' ? true : false
  // subscribers: ['src/subscriber/**/*.ts']
}

export const cliConfig = new DataSource(configOptions)
