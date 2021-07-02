<p align="center">
 <img width="200px" src="public/assets/images/logo.png" align="center" alt="Kampong" />
 <h2 align="center">Kampong Core Backend</h2>
 <p align="center"> Core Backend in NestJS and MongoDB for Project Kampong.</p>
</p>
<p align="center">
    <img alt="Build Passing" src="https://github.com/Project-Kampong/kampong-backend-core/actions/workflows/build.yaml/badge.svg" />
    <img alt="CodeQL Passing" src="https://github.com/Project-Kampong/kampong-backend-core/actions/workflows/codeql-analysis.yml/badge.svg" />
    <a href="https://lgtm.com/projects/g/Project-Kampong/kampong-backend-core/alerts/"><img alt="Total alerts" src="https://img.shields.io/lgtm/alerts/g/Project-Kampong/kampong-backend-core.svg?logo=lgtm&logoWidth=18"/></a>
    <a href="https://lgtm.com/projects/g/Project-Kampong/kampong-backend-core/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/Project-Kampong/kampong-backend-core.svg?logo=lgtm&logoWidth=18"/></a>
</p>

## Quick Start

### Setting up database

Refer to this [guide](https://docs.mongodb.com/drivers/node/master/quick-start/#create-a-mongodb-cluster) on creating a MongoDB cluster on Atlas.

> **NB**: After creating the cluster, take note of the cluster's **Connection String**.

### Set up config variables

1. In the file `config/sample.env`, duplicate the file and rename it to `config/config.env`.

2. Fill in all credentials required in the new file, as follows:

| Variable  | Value                                        |
| --------- | -------------------------------------------- |
| NODE_ENV  | development / production                     |
| PORT      | 5000                                         |
| MONGO_URI | Copy your MongoDB **Connection String** here |

### Running the app

There are 2 ways to run the app

1. [Manual installation](#manual-installation) (for development)
2. [Run with Docker](#run-with-docker) (for quick setup and run)

#### Manual installation

Recommended for development.

##### Global dependencies

App requires the following dependencies to be installed locally (in the following order):

| No  | Dependency           | Installation Instruction                                                                                   |
| --- | -------------------- | ---------------------------------------------------------------------------------------------------------- |
| 1   | NodeJS v16 (via nvm) | Install nvm: https://github.com/nvm-sh/nvm <br /> Run `nvm install && nvm use` <br /> To verify: `node -v` |
| 2   | NestJS 7 (Optional)  | Install NestJS CLI: https://docs.nestjs.com <br /> To verify: `nest -v`                                    |

> **NB**: NestJS installation is recommended for dev. It is not required to run the app.

##### Installation

```bash
$ npm install
```

##### Running the app

```bash
# development watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

##### Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Run with Docker

Recommended for quick setup.

1. Ensure you have Docker installed on your machine
2. Ensure `config/config.env` is set up properly in your local repo.
3. Run `docker compose up`

### API Documentation + Test Endpoints

[Swagger API](https://pkgcore-test.herokuapp.com/api/)

[GraphQL Playground](https://pkgcore-test.herokuapp.com/graphql/)
