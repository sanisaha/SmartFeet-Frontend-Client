module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
      },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // for RTL matchers like jest-dom
  };
  