import type { Config } from 'jest';
import { config, createJestConfig } from './jest.config';

const extendedConfig: Config = {
  ...config,
  collectCoverageFrom: [
    'src/**/*.ts*',
    // this is meant to exclude all the pages/layouts, but not APIs and contexts
    '!src/app/**',
    'src/app/api/**',
    'src/app/**/*Context*',
  ],
  coveragePathIgnorePatterns: [
    'src/components/*',
    'src/config/*',
    'src/middleware.ts',
    'src/lib/api.ts',
    'src/lib/logger.ts',
    'src/lib/prisma.ts',
    'src/types/*',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
};

export default createJestConfig(extendedConfig);
