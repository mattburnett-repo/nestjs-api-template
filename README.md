# NestJS API Template

<!-- Uncomment the line below when using this template for a project. -->
<!-- This project was built with the NestJS Template repo (github link goes here). -->

This repo is a scaffolded implementation of NestJS and supporting tech.

The purpose of this repo is to provide a straight-forward way to quickly stand up a RESTful API NestJS app, without having to install / configure the many packages that are useful for an average project.

This is not a turn-key API solution, but rather just a way to get started, quickly.

Starting points for database connectivity, API endpoint generation, entity creation, data seeding, testing, authentication, etc. are available 'out-of-the-box'.

Example code is provided in the `src/example` folder, which should be deleted once you are underway.

---

## Includes

- NestJS
  - Swagger / OpenAPI
  - Basic logging
  - Compodoc
- TypeORM
- Passport JS
  - JWT Strategy
- Postgres connectivity
- Testing
  - Unit testing
  - E2E / endpoint testing
- Additional packages
  - argon2
  - typeorm-extention
  - class-validator
  - cookie-parser
  - helmet
  - pg (postgres driver)
  - @jest-mock/express (for testing. mocks request and result objects)

---

## Installation and setup

### The code needs to be installed, and a database for the project needs to be created.

Create the project folder and change into it

```bash
mkdir <your project / folder name>
cd <your project / folder name>
```

Clone the repo (Don't forget the ' . ' at the end!!!)

```bash
git clone <link goes here> .
```

Install the node_modules

```bash
yarn install
```

Copy the sample.env to .env

```bash
cp sample.env .env
```

You will need a database, to connect to. Once a database is available to your project ->

Set .env vars with your project's database-specific connection info and jwt secrets.

```bash
NODE_DEV= // valid: 'test' | 'dev' | 'prod' | 'production'
API_PORT=
DB_TYPE=
DB_HOST=
DB_PORT=
DB_USER_NAME=
DB_PASSORD=
DB_DATABASE_NAME=

JWT_SECRET=
JWT_REFRESH_SECRET=
```

- If you need a JWT secret, a quick way to get one is in a terminal (use a larger randomBytes() value to make a longer secret string)

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'));"
```

If you are not using Postgres as a database, you will need to make some changes to the `dbConfig` and `cliConfig` files. More info is provided in the 'Database config' paragraph of the [Dev notes](##dev-notes) section of this document, below.

Start the app in dev / watch mode

```bash
  yarn start:dev
```

Find the app at [localhost:4000](localhost:4000). You should see a 'hello world' message.

Find the Swagger / OpenAPI docs at [localhost:4000/api](localhost:4000/api). You should see a Swagger page for 'example', 'users' and 'auth'. Schemas are displayed at the bottom.

You can then build out data seeders for your database. This template uses `factories` and `seeders`. You can find examples in their own folders under the `src/db` folder, which you can run to get a sense of how the seeding process works.

If you run the seeders 'out-of-the-box', you should have some test data in tables called `examples` and `user`.

Run the seeders using

```bash
yarn type-ext:seed
```

Look over the [Dev notes](##dev-notes) section of this document for more info specific to this implementation.

---

## How to use

If there are questions about NestJS, the [Overview](https://docs.nestjs.com/) section of the docs is a good place to start.

If you just want to jump in and see what happens, you can [create new endpoint with nest g resource <resource.name.goes.here>](https://docs.nestjs.com/recipes/crud-generator#generating-a-new-resource), and follow the `example` code provided in this repo.

This is where most of the work should be done.

- Here is a general guide for getting started. Look at existing app / auth / example / user code for further guidance.
  - nest g resource _name_
  - Fill out as needed, referring to app / auth / example / user code when necessary
    - Use class-validator (ie. @IsUUID, @IsNotEmpty, etc.) decorators as much as possible.
    - entity
      - create an entities folder
        - create entity file (xxx.entity.ts)
      - migration:generate or synchronize
        - **_ NOTE _** There is currently an issue with the typeorm cli version 0.3.x that breaks the migration functionality.
    - dto
    - service
    - controller
    - module
    - tests
  - Keep the docs up to date
    ```bash
    yarn docs:create
    ```
  - Keep the README.md file accurate and up to date.

---

## Migrations / Seeding

Create a migration

```bash
yarn migration:create src/db/migrations/name.of.migration
```

Generate a migration

```bash
SHOULD: yarn migration:generate src/db/migrations/name.of.migration
but it doesn't. There is some kind of bug in the new cli (v. 0.3.x) that doesn't make a lot of sense
```

Seed the `example` and `user` tables

```bash
yarn type-ext:seed
```

---

## Testing

Basic tests can be run using

```bash
yarn test
```

End-to-end / endpoint tests can be run using

```bash
yarn test:e2e
```

An important thing to know about testing with NestJS is that much of it depends on decoupling injected dependencies. This can be confusing at first.

[This video](https://www.youtube.com/watch?v=dXOfOgFFKuY&t=776s) is helpful, for explaining the basic concepts and has examples.

[Here](https://github.com/jmcdo29/testing-nestjs/tree/main/apps/typeorm-sample) is a helpful place, for better understanding and examples.

---

## Documentation

- This repo uses the `Compodoc` plugin. You can generate the document set with this command

```bash
yarn docs:create
```

and then view it at [localhost:8080](https://localhost:8080).

By default, Compodoc creates documentation files in a `documentation` folder, mounted on the project root.

---

## Dev notes

- Basis:
  - This implementation of NestJS runs in `strict mode`, ie. it was created using `nest new . --strict`.
  - Use `relative` imports, ie. '../some/path', instead of `absolute` imports, ie. 'src/some/path. This will prevent problems during testing.
  - Use class-validator decorators in dto and entity files.
  - There is an odd issue with linting / formatting, specifically a 'Del `.`' warning that occurs when code has an empty block. There doesn't appear to be a rule-based linter / formatter solution to this problem. For now, adding `// eslint-disable-next-line prettier/prettier` above the offending line seems to work. Perhaps your linter / formatter will provide additional suggestions, depending on what you're using.
  - You should delete the example code (found in the `src/example` folder) from your project, once you are underway.
- Database config:
  - in `dbConfig`, `seedConfig` and `cliConfig` there is an odd typing issue with the 'type' key. It basically won't take a value from `process.env.DB_TYPE`. This value is 'postgres' for this implementation. You will need to change the value of the 'type' key in these files to whatever database driver you are using.
  - This template uses `typeorm-extension` to handle interactions with the data/database. These interations are limited to creating, seeding and dropping a database.
  - If there are Postgres errors about uuid_v4 not being available, go to pqsql / pgAdmin / etc. and run the following, as you would run a regular SQL statement
    ```bash
    create extension "uuid-ossp";
    ```
    This will install a Postgres extension for uuid_v4.
- TypeORM:

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
      - [There is a known issue with this](https://github.com/typeorm/typeorm/issues/5965#issuecomment-680839366) and it looks like the resolution depends on changes to the typeorm package for 0.3.x.
      - [Refer here for more information](https://stackoverflow.com/questions/72682474/typeorm-migrationgenerate-failure-not-enough-non-option-arguments-got-0-need)

- Authentication:
  - Passport JWT strategy is implemented. `auth` and `user` resources are provided as a starting point.
  - There is an `example/protected` route you can use as an example.
- Testing:
  - An example of protected route testing in located in `app.e2e-spec.ts`.
  - As soon as you start adding functionality, tests will fail with confusing messages (ie. 'Cant find ... in ...').
    - This ie likely due to dependencies among mondules. Usually this can be resolved by mocking the test subject's dependencies.
    - [Here is a good resource for setting up tests for TypeORM](https://github.com/jmcdo29/testing-nestjs/tree/main/apps/typeorm-sample/src/cat), using the 'cat' resource from the NestJS docs.
    - [This video](https://www.youtube.com/watch?v=dXOfOgFFKuY&t=776s) is also helpful.
  - app.e2e-spec.ts generates log output if `process.env.NODE_ENV` is not equal to 'test'
    - iterations of this output equal the number of times the `beforeEach()` method of the test/s run.
- Logging:
  - Basic logging is available using the default logger provided by NestJS. It is sparsely implemented in this repo. It should be better implemented in an actual application.
    - Reference [this](https://javascript.plainenglish.io/how-to-use-nestjs-logger-2a9cb107bce9) doc for more things to do.
  - app.e2e-spec.ts generates log output if `process.env.NODE_ENV` is not equal to 'test'
- Swagger / OpenAPI
  - Decorators for @nestjs/swagger are listed [here](https://www.programcreek.com/typescript/?api=@nestjs/swagger). Look at the sidebar on the right of the page.

---

## To Do

- [More robust / detailed tests](https://docs.nestjs.com/fundamentals/testing).
  - More edge case tests are always better.
  - app.e2e-spec.ts
    - reliably turn off logging output
  - auth.e2e-spec.ts
    - figure out how to either attach req.user, or how to mock req.user.
      - underlying refresh / logout code expects this. Tests can't run witout @Req / req.user object.
- Get typeorm cli to properly work with migrations, especially migrations:generate
  - [This looks like it depends on TypeORM making changes to the cli](https://github.com/typeorm/typeorm/issues/5965#issuecomment-680839366).
- Better configuration management / config object
  - More environment-aware (ie. 'dev' / 'test' / 'production')
- Passport / Auth.
  - CASL / RBAC
- Clean / rebase / squash git before pushing to github.
  - git rebase -i <sha. run git log to show these>
  - Shft I
  - reword / squash
  - Esc :x
  - New commit message
  - Esc :x
- Admin module/s

---

## Nice to have

- [Streaming](https://docs.nestjs.com/techniques/streaming-files)
- [File upload](https://docs.nestjs.com/techniques/file-upload)
- [Cache management](https://docs.nestjs.com/techniques/caching)
- [Router module](https://docs.nestjs.com/recipes/router-module)
- [Automock](https://docs.nestjs.com/recipes/automock)
- Redis
  - Where / how
- Elastic Search
  - Where / how
