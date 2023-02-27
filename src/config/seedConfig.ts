import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'

import { config } from 'dotenv'

const ENV = process.env.NODE_ENV
console.log('ENV: ', ENV)

const envFile = !ENV ? '.env' : `.env.${ENV}`
console.log(`Loading environment variables from file: ${envFile}`)

config({ path: envFile })

console.log('seedConfig DB_DATABASE_NAME: ', process.env.DB_DATABASE_NAME)

const options: DataSourceOptions & SeederOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  logging: false,
  // don't update database here. use migration:run instead.
  synchronize: false,
  // name: 'default',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/db/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
  seeds: ['src/db/seeds/**/*{.ts,.js}'],
  factories: ['src/db/factories/**/*{.ts,.js}'],
  // Postgres database hosting expects SSL, but localhost doesn't.
  ssl: process.env.NODE_ENV === 'deployed' ? true : false
}

export const seedConfig = new DataSource(options)
