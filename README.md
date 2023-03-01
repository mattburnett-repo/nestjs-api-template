# NestJS API Template

<!-- Uncomment the line below when using this template for a project. -->
<!-- This project was built with the [NestJS Template]([github link goes here)](https://github.com/mattburnett-repo/nestjs-api-template). -->

This repo is a scaffolded / boilerplate implementation of NestJS and supporting modules.

The purpose of this repo is to provide a straight-forward way to quickly stand up a RESTful API NestJS app, without having to install / configure the many packages that are useful for an average project.

An instance of this repo is hosted [here](https://nestjs-api-template.fly.dev/api), where it connects to a database hosted at another domain.

This is a work-in-progress.

Starting points for database connectivity, API endpoint generation, entity creation, data seeding, testing, authentication, etc. are available.

Example code is provided in the `src/example` folder.

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
