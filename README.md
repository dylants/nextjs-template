# nextjs-template

A template for a Next.js application

## Getting Started

Use [nvm](https://github.com/nvm-sh/nvm) to use the project's Node version

```
nvm use
```

Install dependencies

```
npm install
```

## Config

Configuration for the application is available within the [`src/config/index.ts`](src/config/index.ts) file. See the config file for configuration elements exposed via environment variables.

## Database

This project utilizes [Prisma](https://www.prisma.io/) for its ORM, and expects a PostgreSQL database instance.

The database schema is stored in the [schema.prisma](prisma/schema.prisma) file.

### Setup Postgres

Install PostgreSQL and populate the `.env.*` files with the correct `DATABASE_URL` string to connect to PostgreSQL.

The `DATABASE_URL` should be populated as such:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/nextjs-template"
```

### Run Migrations

To run migrations:

```
npm run db:migrate
```

### Create New Migration

To create a new migration (and run it):

```
npm run db:migrate --name <migration name>
```

### Seeds

Database seeds are found in the [seeds script directory](prisma/seeds/).

To run the script to generate seed data:

```
npm run db:seed
```

Reset the database, re-run migrations, and re-seed the database:

```
npm run db:reset
```

#### Seed Configuration

The following environment variables are available to set specifics:

Number of Widgets to create (defaults to 10):

```
SEED_NUM_WIDGETS=10
```

## Run in production environment (Docker)

This application is designed to run in production using Docker. The following steps outline the process.

### Build Docker Image

To build the Docker image:

```
npm run prod:build
```

Login to Github Container Registry with Personal Access Token (requires write)
```
docker login ghcr.io -u <username>
<enter token>
```

Push the tagged image to GitHub Container Registry
```
docker push ghcr.io/dylants/nextjs-template:<tag>
```

### Run Migrations

Run the migrations on the production database:

```
npm run prod:db:migrate
```

### Run Docker Container

On production machine:

Login to Github Container Registry with Personal Access Token (requires read)
```
docker login ghcr.io -u <username>
<enter token>
```

Pull the image:
```
docker pull ghcr.io/dylants/nextjs-template:<tag>
```

Define the environment variables in the `.env.production` file. See the [docker-compose.prod.yml](docker-compose.prod.yml) file for specifics.

Start the app:
```
npm run prod:up
```

Stop the app:
```
npm run prod:down
```

## Tests

### Lint and Type Checking

This project is configured to use ESLint as the linter.

To run both lint and compile TypeScript files:

```
npm run lint
```

### Unit Tests

Jest unit tests exist along side the source files.

To run the tests:

```
npm test
```

To run tests in watch mode:

```
npm run test:watch
```

### Integration Tests

Integration tests exist in [`integration-tests`](integration-tests).

The integration tests require a test database. This is setup via Docker Compose, and requires a running Docker instance.

To run the tests:

- Start Docker ([Docker Desktop](https://docs.docker.com/desktop/) is an easy option).

- Start the test database

```
npm run ci:up
```

- Migrate and seed the test database

```
npm run ci:db:reset
```

- Run the tests

```
npm run test:ci
```

To run tests in watch mode:

```
npm run test:ci:watch
```

When tests are complete, you can shutdown the test database:

```
npm run ci:down
```

### Code Coverage

To run all the tests and include code coverage, follow the steps above for the specific test types. Then to run the tests:

```
npm run test:coverage
```

## Storybook

This app uses [Storybook](https://storybook.js.org/) to demo UI components.

To run storybook:

```
npm run storybook
```
