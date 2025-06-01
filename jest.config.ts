import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});
const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': '@swc/jest',
  },
  transformIgnorePatterns: [
    // Исключаем jose и openid-client из игнорирования
    '/node_modules/(?!(jose|openid-client)/)',
  ],
};

export default createJestConfig(config);
