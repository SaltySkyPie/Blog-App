## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

### This is not implemented yet

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Migration


```bash
# generate migration from *.entity.ts files or entities defined in .env
$ npm run migration:generate <path to to be generated migration file>
# example: npm run migration:generate ./migrations/initial
```

```bash
# create empty migration file
$ npm run migration:create <path to to be generated migration file>
# example: npm run migration:create ./migrations/initial
```

Migrations are automatically run on application start. If you want to run them manually, use:

```bash
# run migrations
$ npm run migration:run
```

