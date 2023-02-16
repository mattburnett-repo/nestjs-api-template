// https://stackoverflow.com/questions/72682474/typeorm-migrationgenerate-failure-not-enough-non-option-arguments-got-0-need

//  There is a problem with v. 0.3.x of the typeorm cli.
// https://github.com/typeorm/typeorm/issues/5965#issuecomment-680839366
// https://github.com/typeorm/typeorm/issues/8762
//    not much to do about this until typeorm fixes the issue.

import { DataSource } from 'typeorm'
import { config } from 'dotenv'

config()
for (const envName of Object.keys(process.env)) {
  process.env[envName] = process.env[envName].replace(/\\n/g, '\n')
}

const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  migrationsRun: false,
  // entities: [__dirname + '/**/entities/*.entity.{js,ts}'],
  entities: [__dirname + '../**/entities/**/*.ts'],
  migrations: [__dirname + '/dist/src/migrations/*.{js,ts}'],
  // entities: ['src/entity/**/*.ts'],
  // migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts']
  //  FIXME: this should know where the migration directory is located
  // cli: {
  //   entitiesDir: 'src/entity',
  //   migrationsDir: 'src/migration',
  //   subscribersDir: 'src/subscriber'
  // }
})

module.exports = {
  connectionSource
}
