import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'

// Needed to access env vars.
import { config } from 'dotenv'
config()

// https://stackoverflow.com/questions/72057915/seed-permanent-data-in-typeorm-v-0-3-6-with-datasource

const options: DataSourceOptions & SeederOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSORD,
  database: process.env.DB_DATABASE_NAME,
  logging: false,
  synchronize: process.env.NODE_ENV !== 'production' || false,
  // name: 'default',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/db/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
  seeds: ['src/db/seeds/**/*{.ts,.js}'],
  factories: ['src/db/factories/**/*{.ts,.js}']
}

export const seedConfig = new DataSource(options)
