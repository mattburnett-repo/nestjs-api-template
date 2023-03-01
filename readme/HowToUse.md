# How to use

If there are questions about NestJS, the [Overview](https://docs.nestjs.com/) section of the docs is a good place to start.

If you just want to jump in and see what happens, you can [create new endpoint with nest g resource <resource.name.goes.here>](https://docs.nestjs.com/recipes/crud-generator#generating-a-new-resource), and follow the `example` code provided in this repo.

- Here is a general guide for getting started. Look at existing app / auth / example / user code for further guidance.
  - nest g resource _name-of-project_
  - Fill out as needed, referring to app / auth / example / user code when necessary
    - Use class-validator (ie. @IsUUID, @IsNotEmpty, etc.) decorators as much as possible.
    - entity
      - create an entities folder
        - create entity file (xxx.entity.ts)
      - migration:generate / migration:run
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
