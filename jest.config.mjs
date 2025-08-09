import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testEnvironment: "jest-environment-jsdom",

  // Test file patterns
  testMatch: [
    "**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)",
    "**/*.(test|spec).(js|jsx|ts|tsx)",
  ],

  // Coverage configuration
  collectCoverageFrom: [
    "src/components/**/*.{js,jsx,ts,tsx}",
    "!src/components/**/*.stories.{js,jsx,ts,tsx}",
    "!src/components/**/index.{js,jsx,ts,tsx}",
  ],

  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
