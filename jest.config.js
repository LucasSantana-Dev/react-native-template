module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.config.js',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@context/(.*)$': '<rootDir>/context/$1',
    '^@hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@services/(.*)$': '<rootDir>/services/$1',
    '^@types/(.*)$': '<rootDir>/types/$1',
  },
};
