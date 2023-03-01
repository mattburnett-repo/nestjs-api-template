# Migrations / Seeding

- Create a migration.
- Generate a migration.
- Run a migration.
- Seed the `example` and `user` tables.

This repo uses v.0.3.x of the typeorm CLI.

- Because of the way this version of the CLI works, include the full path to the migrations directory after the script name.
- In the following examples, the migrations directory is `src/db/migrations`.

If you have added `NODE_ENV` vars to your npm scripts, you should add the var name to the end of the `migration:xxx` script name.

- For example, if you have added `NODE_ENV=local` var to the `migration:generate` script, you should rename the script to `migration:generate:local`.

Create a migration

```bash
yarn migration:create src/db/migrations/name.of.migration
```

Generate a migration

```bash
yarn migration:generate src/db/migrations/name.of.migration
```

Run a migration

```bash
yarn migration:run
```

Seed the `example` and `user` tables

```bash
yarn type-ext:db:seed
```
