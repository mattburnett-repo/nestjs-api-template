# NestJS API Template

<!-- Uncomment the line below when using this template for a project. -->
<!-- This project was built with the [NestJS Template](https://github.com/mattburnett-repo/nestjs-api-template). -->

This repo is a scaffolded / boilerplate implementation of NestJS and supporting modules.

The purpose of this repo is to provide a straight-forward way to quickly stand up a RESTful API NestJS app, without having to install / configure the many packages that are useful for an average project.

An instance of this repo is deployed [here](https://nestjs-api-template.fly.dev/api), where it connects to a database hosted at another domain.

- A basic CI/CD pipeline is enabled via Github Actions. It runs tests when receiving a Pull Request, then deploys the application once the tests pass and the new code has been merged.

Starting points for database connectivity, API endpoint generation, entity creation, data seeding, testing, authentication, etc. are available.

Example code is provided in the [src/example](./src/example/) folder.

## More details

- [Tech stack](./readme/TechStack.md)
- [Installation and setup](./readme/InstallationAndSetup.md)
- [Docker](./readme/Docker.md)
- [How to use](./readme/HowToUse.md)
- [Migrations / Seeding](./readme/MigrationsAndSeeding.md)
- [Testing](./readme/Testing.md)
- [Documentation](./readme/Documentation.md)
- [Dev notes](./readme/DevNotes.md)
