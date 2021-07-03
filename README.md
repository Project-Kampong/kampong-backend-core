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

1. Set up database. Refer to this [guide](https://docs.mongodb.com/drivers/node/master/quick-start/#create-a-mongodb-cluster) on creating a MongoDB cluster on Atlas.
    > **NB**: After creating the cluster, take note of the cluster's **Connection String**.

    > **NB2**: Skip this step if setting up with [VSCode Dev Container](#develop-in-vscode-dev-container).
2. Set up config variables

    a. In the file `config/sample.env`, duplicate the file and rename it to `config/config.env`.

    b. Fill in all credentials required in the new file, as follows:
    | Variable  | Value                                        |
    | --------- | -------------------------------------------- |
    | NODE_ENV  | development / production                     |
    | PORT      | 5000                                         |
    | MONGO_URI | Copy your MongoDB **Connection String** from previous step here.<br/> **(Skip if setting up with [VSCode Dev Container](#develop-in-vscode-dev-container))** |
3. See [App Setup](#app-setup) to setup the app

## App Setup

There are 3 ways to setup the app

1. [Develop in VSCode Dev Container](#develop-in-vscode-dev-container) (RECOMMENDED)
2. [Run with Docker Compose](#run-with-docker-compose)
3. [Manual installation](#manual-installation)

### Develop in VSCode Dev Container

Recommended for development.

#### Pre-requisite
- [VSCode](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/)
- [VSCode Extension Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 

#### Steps 

1. Open repo in VSCode.
2. VSCode will prompt to open the workspace in the remote container. `Folder contains a dev container configuration file. Reopen folder to develop in a container`
3. Select `Reopen in container`, VSCode will setup a fully ready environment.
4. Refer to the bottom left-hand corner of VSCode to verify that container is setup. It should have a text stating `Dev Container: Kampong Backend Core Development`
5. To run app, see [Running the app](#running-the-app)


### Run with Docker Compose

Recommended for quick setup. (Eg. to boot app quickly for testing with a frontend framework)

#### Pre-requisite
- [Docker](https://www.docker.com/)

#### Steps

1. Ensure `config/config.env` is set up in your local repo.
2. Run `docker compose up`
3. App will setup and run automatically.

### Manual installation

#### Pre-requisite

App requires the following dependencies to be installed locally (in the following order):

- [NodeJS v16 (via nvm)](https://github.com/nvm-sh/nvm) To verify: `nvm -v`
- [NestJS 7 (Optional)](https://docs.nestjs.com) To verify: `nest -v`

> **NB**: NestJS installation is required for development. It is not required to run the app.

#### Steps

1. Run `nvm install && nvm use` 
2. Verify node version with `node -v`
3. Run `npm install`
4. To run app, see [Running the app](#running-the-app)


## Running the app

```bash
# development watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### API Documentation + Test Endpoints

[Swagger API](https://pkgcore-test.herokuapp.com/api/)

[GraphQL Playground](https://pkgcore-test.herokuapp.com/graphql/)
