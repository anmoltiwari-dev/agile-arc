const nextJest = require('next/jest.js');
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  preset: "ts-jest",
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 160,
      lines: 60,
      statements: 60
    },
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports =  createJestConfig(config);