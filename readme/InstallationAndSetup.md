# Installation and setup

- Clone, then reset git.
- Create `.env.*` files.
- Install the code.
- Set up a database.
- Configure `.env.*` files.
- Seed the database.
- Run tests.
- Start the app.

Create the project folder and change into it

```bash
mkdir <your project / folder name>
cd <your project / folder name>
```

Clone the repo (Don't forget the ' . ' at the end!)

```bash
git clone https://github.com/mattburnett-repo/nestjs-api-template.git .
```

Delete this file. It is only necesary for deployment of the template repo.

```bash
rm -rf fly.toml
```

Edit the project information in `package.json` header.

```bash
  "name": the.project.name,
  "version": the.project.version,
  "description": the.project.description,
  "author": the.project.author,
  "private": true or false,
  "license": the.project.license,
```

Reset your project's git repository, to not use the template repo's git information.

```bash
rm -rf .git
git init
```

Copy the sample.env to the .env files

```bash
cp sample.env .env            # default .env
cp sample.env .env.local      # connects local develpment to a localhost database
cp sample.env .env.deployed   # connects local development to a remote / deployed database
cp sample.env .env.test       # for running tests locally. Also useful as a secrets source for CI/CD, eg. GitHub Actions
```

Install the node_modules

```bash
yarn install
```

Create the database manually.

- This repo uses `typeorm-extention` to create / seed / drop the database. However, [there are problems with the create / drop functionality when using Postgres](https://github.com/tada5hi/typeorm-extension/discussions/401).
  - TL;DR it's less work to create the database manually.

Once a database is available to your project, set the vars in `.env`, `.env.local`, `.env.test` and `.env.deployed` files with your project's database-specific connection info and jwt secrets.

```bash
DB_TYPE=
DB_HOST=
DB_PORT=
DB_USER_NAME=
DB_PASSWORD=
DB_DATABASE_NAME=
DB_SSL_MODE=    # Postgress specific. Usually 'false' (with single quotes) for localhost database, usually 'true' (with single quotes) for remote database

API_PORT= # 4000

SWAGGER_USER=
SWAGGER_PASSWORD=

JWT_SECRET=
JWT_REFRESH_SECRET=
```

- If you need a JWT secret, a quick way to get one is in a terminal (use a larger randomBytes() value to make a longer secret string)

  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('base64'));"
  ```

If you are not using Postgres as a database, you will need to make some changes to the `dbConfig` and `cliConfig` files. More info is provided in the 'Database config' paragraph of the [Dev notes](./DevNotes.md) document.

Create the starter database tables by generating a migration

```bash
yarn migration:generate:local src/db/migrations/generateStarterTables
```

Then run this migration

```bash
yarn migration:run:local
```

- If there are Postgres errors about uuid_v4 not being available, go to pqsql / pgAdmin / etc. and run the following, as you would run a regular SQL statement
  ```bash
  create extension "uuid-ossp";
  ```

Run the seeders using

```bash
yarn type-ext:db:seed:local
```

Run the tests

```bash
yarn test
yarn test:e2e
```

- If there are Postgres errors about uuid_v4 not being available, go to pqsql / pgAdmin / etc. and run the following, as you would run a regular SQL statement
  ```bash
  create extension "uuid-ossp";
  ```

Start the app in dev / watch mode

```bash
  yarn start:dev:local
```

Find the app at [localhost:4000](http://localhost:4000).

- You should see a 'Hello World!' message.

Find the Swagger / OpenAPI docs at [localhost:4000/api](http://localhost:4000/api).

- Log in with the values of environment variables `SWAGGER_USER` and `SWAGGER_PASSWORD`.
- You should see a Swagger page displaying the title 'Example', and sections 'default', 'example', 'users' and 'auth'.
- You can edit the API document's title and description in the file [main.ts](./src/main.ts), in the `const swaggerConfig` block.

You can then build out entities and data seeders for your database.

- There are example entities in the `src/cexample` and `src/users` folders.
- This template uses `factories` and `seeders`.
- You can find examples in their own folders under the `src/db` folder, which you can run to get a sense of how the seeding process works.

If you run the seeders 'out-of-the-box' using `yarn type-ext:db:seed:local`, you should have some test data in tables called `examples` and `user`.

- User `testOne`/ password `testOne` can be used for basic connection to the database.

Look over the [Dev notes](./DevNotes.md) page for more info.
