module.exports = {
  displayName: 'server',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.[jt]s'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage/server',
  coverageThreshold: {
    global: { branches: 70, functions: 70, lines: 70, statements: 70 }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};
