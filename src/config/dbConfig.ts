import { registerAs } from '@nestjs/config'

export default registerAs('database', () => {
  return {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    autoLoadEntities: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // typeorm / synchornization logging:
    logging: process.env.NODE_ENV === 'local' ? true : false,
    // don't update database here. use migration:run:xxxxx instead.
    synchronize: false,
    migrations: [__dirname + '/../db/migrations/*.{js,ts}'],
    migrationsTableName: 'migrations',
    // Postgres database hosting expects SSL, but localhost doesn't.
    ssl:
      // eslint-disable-next-line prettier/prettier
      process.env.NODE_ENV === 'deployed' || process.env.NODE_ENV === 'production'
        ? true
        : false
  }
})
