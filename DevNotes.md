# Dev notes

- Basis
- Database config.
- TypeORM.
- Authentication.
- Testing.
- Logging.
- Swagger / OpenAPI.

Basis:

- This implementation of NestJS runs in `strict mode`, ie. it was created using `nest new . --strict`.
- Use `relative` imports, ie. '../some/path', instead of `absolute` imports, ie. 'src/some/path. This will prevent problems during testing.
- Use class-validator decorators in dto and entity files.
- There is an issue with linting / formatting, specifically a 'Del `.`' warning that occurs when code has an empty block. There doesn't appear to be a rule-based linter / formatter solution to this problem.
  - For now, adding `// eslint-disable-next-line prettier/prettier` above the offending line seems to work.
- You should delete the example code (found in the `src/example` folder) from your project, once you are underway.

Database config:

- in `dbConfig`, `seedConfig` and `cliConfig` there is a typing issue with the 'type' key. It basically won't take a value from `process.env.DB_TYPE`. This value is 'postgres' for this implementation. You will need to change the value of the 'type' key in these files to whatever database driver you are using.
- Create the database manually.
  - This repo uses `typeorm-extention` to create / seed / drop the database. However, [there are problems with the create / drop functionality when using Postgres](https://github.com/tada5hi/typeorm-extension/discussions/401).
- If there are Postgres errors about uuid_v4 not being available, go to pqsql / pgAdmin / etc. and run the following, as you would run a regular SQL statement

  ```bash
  create extension "uuid-ossp";
  ```

  This will add a Postgres extension for uuid_v4.
  TypeORM:

- migrations
  - create
    ```bash
    yarn typeorm migration:create src/db/migrations/name.of.migration.here
    ```
  - generate
    - Doesn't work with typeorm 0.3.x
      ```bash
      yarn typeorm migration:generate -d ./src/config/cliConfig aMigrationName
      ```
      returns the message
      ```bash
      No changes in database schema were found - cannot generate a migration. To create a new empty migration use "typeorm migration:create" command
      ```
    - [This is a known issue](https://github.com/typeorm/typeorm/issues/5965#issuecomment-680839366) and it looks like the resolution depends on changes to the typeorm package for 0.3.x.
    - [Refer here for more information](https://stackoverflow.com/questions/72682474/typeorm-migrationgenerate-failure-not-enough-non-option-arguments-got-0-need)

Authentication:

- Passport JWT strategy is implemented. `auth` and `user` resources are provided as a starting point.
- There is an `example/protected` route to use as an example.

Testing:

- An example of protected route testing in located in `app.e2e-spec.ts`.
- As soon as you start adding functionality, tests will fail with confusing messages (ie. 'Cant find ... in ...').
  - This ie likely due to dependencies among modules. Usually this can be resolved by mocking the test subject's dependencies.
  - [Here is a good resource for setting up tests for TypeORM](https://github.com/jmcdo29/testing-nestjs/tree/main/apps/typeorm-sample/src/cat), using the 'cat' resource from the NestJS docs.
  - [This video](https://www.youtube.com/watch?v=dXOfOgFFKuY&t=776s) is also helpful.
- app.e2e-spec.ts generates TypeORM log output if `process.env.NODE_ENV` is not equal to 'test'.

Logging:

- Basic logging is available using the default logger provided by NestJS. It is sparsely implemented in this repo. It should be better implemented in an actual application.
  - Reference [this](https://javascript.plainenglish.io/how-to-use-nestjs-logger-2a9cb107bce9) doc for more things to do.
- app.e2e-spec.ts generates log output if `process.env.NODE_ENV` is not equal to 'test'

Swagger / OpenAPI

- Decorators for @nestjs/swagger are listed [here](https://www.programcreek.com/typescript/?api=@nestjs/swagger). Look at the sidebar on the right of the page.
