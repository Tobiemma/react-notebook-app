module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom', // Use jsdom for React testing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for JavaScript and JSX
    },
    //setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
   setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Optional: For additional setup like custom matchers
  };
  