# NestJS API Template

<!-- Uncomment the line below when using this template for a project. -->
<!-- This project was built with the [NestJS Template]([github link goes here)](https://github.com/mattburnett-repo/nestjs-api-template). -->

This repo is a scaffolded / boilerplate implementation of NestJS and supporting modules.

It is a work-in-progress.

The purpose of this repo is to provide a straight-forward way to quickly stand up a RESTful API NestJS app, without having to install / configure the many packages that are useful for an average project.

This is not a turn-key API solution, but rather just a way to get started, quickly.

Starting points for database connectivity, API endpoint generation, entity creation, data seeding, testing, authentication, etc. are available.

Example code is provided in the `src/example` folder, which can be deleted once you are underway.

## Includes

- NestJS
  - Swagger / OpenAPI documentation
  - Basic logging
  - Compodoc
- Docker
  - Dockerfile
  - docker-compose.yaml file
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
  - uuid-ossp (postges extention to enable uuid support)
  - @jest-mock/express (for testing. mocks request and result objects)
  - express-basic-auth (provides basic authentication for Swagger API doc)

## Links to more details

- [Installation and setup](./InstallationAndSetup.md)
- [Docker](./Docker.md)
- [How to use](./HowToUse.md)
- [Migrations / Seeding](./MigrationsAndSeeding.md)
- [Testing](./Testing.md)
- [Documentation](./Documentation.md)
- [Dev notes](./DevNotes.md)
