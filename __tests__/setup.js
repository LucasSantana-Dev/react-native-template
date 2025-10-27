// Custom test setup to fix Platform.OS undefined issue
import 'react-native-gesture-handler/jestSetup';

// Mock Platform before any React Native imports
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn(obj => obj.ios || obj.default),
  Version: '14.0',
}));

// Mock React Native Testing Library to avoid Platform.OS issues
jest.mock('@testing-library/react-native', () => {
  const RTL = jest.requireActual('@testing-library/react-native');
  return {
    ...RTL,
    render: component => {
      // Ensure Platform is available before rendering
      if (!global.Platform) {
        global.Platform = { OS: 'ios' };
      }
      return RTL.render(component);
    },
  };
});

// Mock global Platform
global.Platform = {
  OS: 'ios',
  select: jest.fn(obj => obj.ios || obj.default),
  Version: '14.0',
};

// Setup file - configuration only, no tests
