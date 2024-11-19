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

### Code Coverage

To run all the tests and include code coverage, follow the steps above for the specific test types. Then to run the tests:

```
npm run test:coverage
```
