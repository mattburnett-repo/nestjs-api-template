# Migrations / Seeding

- Create a migration
- Generate a migration.
- Seed the `example` and `user` tables.

Create a migration

```bash
yarn migration:create src/db/migrations/name.of.migration
```

Generate a migration

```bash
# This should work but it doesn't. There is a bug in the new cli (v. 0.3.x) that will need to be fixed by the typeorm team.
yarn migration:generate src/db/migrations/name.of.migration
```

Seed the `example` and `user` tables

```bash
yarn type-ext:db:seed
```
