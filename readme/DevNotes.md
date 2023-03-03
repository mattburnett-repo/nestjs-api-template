# Dev notes

- Basis.
- Database config.
- Authentication.
- Testing.
- Logging.
- Swagger / OpenAPI.

Basis:

- This implementation of NestJS runs in `strict mode`, ie. it was created using `nest new . --strict`.
- Use `relative` imports, ie. '../some/path', instead of `absolute` imports, ie. 'src/some/path. This will prevent problems during testing.
- Use [class-validator decorators](https://www.npmjs.com/package/class-validator#validation-decorators) in dto and entity files.
- There is an issue with linting / formatting, specifically a 'Del `.`' warning that occurs when code has an empty block.
  - There doesn't appear to be a rule-based linter / formatter solution to this problem.
  - Adding `// eslint-disable-next-line prettier/prettier` above the offending line seems to work.
- You should delete the example code (found in the `src/example` folder) from your project, once you are underway.

Database config:

- in `dbConfig`, `seedConfig` and `cliConfig` there is a typing issue with the 'type' key. It basically won't take a value from `process.env.DB_TYPE`.
  - This value is 'postgres' for this implementation. Change the value of the 'type' key in these files to whatever database driver you are using.
- Create the database manually.
  - This repo uses `typeorm-extention` to create / seed / drop the database. However, [there are problems with the create / drop functionality when using Postgres](https://github.com/tada5hi/typeorm-extension/discussions/401).
- If there are Postgres errors about uuid_v4 not being available, go to pqsql / pgAdmin / etc. and run the following, as you would run a regular SQL statement

  ```bash
  create extension "uuid-ossp";
  ```

  This will add a Postgres extension for uuid_v4.

Authentication:

- Passport JWT strategy is implemented. `auth` and `user` resources are provided as a starting point.
- There is an `example/protected` route to use as an example.
- User 'testOne`/ password`testOne` are available for basic authentication.

Testing:

- Tests expect a `.env.test` file.
  - This should be similar to the other .env files in your project.
- An example of protected route testing in located in `app.e2e-spec.ts`.
- As soon as you start adding functionality, tests will fail with confusing messages (ie. 'Cant find ... in ...').
  - This ie likely due to dependencies among modules. Usually this can be resolved by mocking the test subject's dependencies.
  - [Here is a good resource for setting up tests for TypeORM](https://github.com/jmcdo29/testing-nestjs/tree/main/apps/typeorm-sample/src/cat), using the 'cat' resource from the NestJS docs.
  - [This video](https://www.youtube.com/watch?v=dXOfOgFFKuY&t=776s) is also helpful.

Logging:

- Basic logging is available using the default logger provided by NestJS. It is sparsely implemented in this repo.

Swagger / OpenAPI

- Change the title and description of the API document in the `src/main.ts` file, in the `const swaggerConfig = new DocumentBuilder()`code block.
- Decorators for @nestjs/swagger are listed [here](https://www.programcreek.com/typescript/?api=@nestjs/swagger). Look at the sidebar on the right of the page.

CI/CD

- Two GitHub Action files are provided.
  - `.github/workflows/pull_request_uni_test.yml`
  - `.github/workflows/pull_request_e2e_test.yml`
- The `.env.test` file can be useful as a source of secrets for a CI/CD pipeline, eg. GitHub Actions.
  - An example of how to implement this is in the `.github/workflows/pull_request_e2e_test.yml` file, starting with the `- name: 'Create env file'` section.
