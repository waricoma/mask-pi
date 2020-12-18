module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/src/__tests__/**/*.+(ts|tsx|js)', '<rootDir>/src/__tests__/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['<rootDir>/src/lib/*.ts?(x)'],
};
