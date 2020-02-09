module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  moduleNameMapper: {
    '^pixi.js$': '<rootDir>/src/mocks/pixi.js.ts',
  },
};
