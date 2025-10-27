// Custom test setup to fix Platform.OS undefined issue
import 'react-native-gesture-handler/jestSetup';

// Mock Platform before any React Native imports
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn((obj) => obj.ios || obj.default),
  Version: '14.0',
}));

// Mock React Native Testing Library host component detection
jest.mock('@testing-library/react-native', () => {
  const RTL = jest.requireActual('@testing-library/react-native');
  return {
    ...RTL,
    // Override the host component detection to avoid Platform.OS issue
    detectHostComponentNames: () => ({
      hostComponentNames: new Set(['View', 'Text', 'TouchableOpacity', 'TextInput', 'ScrollView']),
    }),
  };
});

// Mock global Platform
global.Platform = {
  OS: 'ios',
  select: jest.fn((obj) => obj.ios || obj.default),
  Version: '14.0',
};

// Setup file - configuration only, no tests
