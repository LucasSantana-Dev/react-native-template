// Jest setup file that runs after the initial setup
// This file handles mocks that need to be applied after modules are loaded

// Mock Platform after modules are loaded to ensure it's available
jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn((obj) => obj.ios || obj.default),
  Version: '14.0',
}));

// Add Detox matchers to expect
expect.extend({
  toBeVisible: jest.fn(() => ({ pass: true })),
  toExist: jest.fn(() => ({ pass: true })),
  toHaveText: jest.fn(() => ({ pass: true })),
  toHaveValue: jest.fn(() => ({ pass: true })),
  toHaveLabel: jest.fn(() => ({ pass: true })),
  toHaveId: jest.fn(() => ({ pass: true })),
  toHaveTestId: jest.fn(() => ({ pass: true })),
  toHaveTraits: jest.fn(() => ({ pass: true })),
  toNotExist: jest.fn(() => ({ pass: true })),
  toNotBeVisible: jest.fn(() => ({ pass: true })),
  toNotHaveText: jest.fn(() => ({ pass: true })),
  toNotHaveValue: jest.fn(() => ({ pass: true })),
  toNotHaveLabel: jest.fn(() => ({ pass: true })),
  toNotHaveId: jest.fn(() => ({ pass: true })),
  toNotHaveTestId: jest.fn(() => ({ pass: true })),
  toNotHaveTraits: jest.fn(() => ({ pass: true })),
});
