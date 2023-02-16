# NestJS Scaffolding

## Installation and setup

clone

install

copy sample.env?
  need to implement the process.env.... data connection stuff
    right now it's hard-coded in the dbConfig.ts and cliConfig.ts

yarn start:dev, etc.

## Tech included
* reflect-metadata
  * why is this installed? where is it used?
    * remove if we're not using it
* NestJS
  * Swagger / OpenAPI 
* TypeORM
  * typeorm-extention (for table seeding, management)
* Postgres
  
## To Do
* Tests
* Move .env to config object
  * [Try this](https://stackoverflow.com/questions/62860608/alternative-for-env-file-for-hosted-node-js-application)
* Seeding
  * Try [this](https://www.npmjs.com/package/typeorm-extension)
    * Or [this](https://stackoverflow.com/questions/72057915/seed-permanent-data-in-typeorm-v-0-3-6-with-datasource) 
    * Or [this](https://stackoverflow.com/questions/51198817/typeorm-how-to-seed-database?rq=1)
* Streaming
* File upload
