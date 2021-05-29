<p align="center">
 <img width="200px" src="public/assets/images/logo.png" align="center" alt="Kampong" />
 <h2 align="center">Kampong Core Backend</h2>
 <p align="center"> Core Backend in NestJS and MongoDB for Project Kampong.</p>
</p>

## Quick Start

### Global dependencies

App requires the following dependencies to be installed locally (in the following order):

| No  | Dependency           | Installation Instruction                                                                                   |
| --- | -------------------- | ---------------------------------------------------------------------------------------------------------- |
| 1   | NodeJS v16 (via nvm) | Install nvm: https://github.com/nvm-sh/nvm <br /> Run `nvm install && nvm use` <br /> To verify: `node -v` |
| 2   | Yarn                 | Install yarn: `npm install -g yarn` <br /> To verify: `yarn -v`                                            |
| 3   | NestJS 7 (Optional)  | Install NestJS CLI: https://docs.nestjs.com <br /> To verify: `nest -v`                                    |

> **NB**: NestJS installation is recommended for dev. It is not required to run the app.

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

### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
