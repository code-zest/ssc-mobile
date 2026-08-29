/* eslint-env jest */
jest.mock('react-native-worklets', () => {
  return {
    makeShareable: jest.fn(),
    createShareable: jest.fn(),
    makeShareableCloneRecursive: jest.fn(),
    makeMutable: jest.fn(() => ({ value: 0 })),
  };
});

require('react-native-reanimated').setUpTests();

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Keychain
jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(() => Promise.resolve()),
  getGenericPassword: jest.fn(() => Promise.resolve(false)),
  resetGenericPassword: jest.fn(() => Promise.resolve()),
}));

// Silence React Native warnings in tests
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
