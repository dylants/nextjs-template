import type { Config } from 'jest';
import nextJest from 'next/jest.js';

export const createJestConfig = nextJest({
  dir: './',
});

export const config: Config = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: [],
  testPathIgnorePatterns: ['/node_modules/', '/integration-tests/'],
};

export default createJestConfig(config);
