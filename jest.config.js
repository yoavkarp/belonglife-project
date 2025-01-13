module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel for JavaScript files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // File extensions to recognize
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Adds custom matchers for testing DOM elements
  testPathIgnorePatterns: ['/node_modules/', '/build/'], // Ignore these folders for tests
  transformIgnorePatterns: ['node_modules/(?!(your-module)/)'], // Transpile specific node modules
  moduleNameMapper: {
    // Handle absolute imports, e.g., if you are using absolute imports for your components
    '^@components/(.*)$': '<rootDir>/src/components/$1',
  },
  globals: {
    // You can add global settings if needed
    'ts-jest': {
      isolatedModules: true, // If you want to speed up test compilation
    },
  },
  collectCoverage: true, // Enable code coverage collection
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'], // Collect coverage from TypeScript files, excluding definition files
};
