
// yurpp faking react native components into normal components 
jest.mock('react-native', () => {
  const React = require('react');
  const createComponent = (name) => {
    const Component = ({ children, ...props }) =>
      React.createElement(name, props, children);
    Component.displayName = name;
    return Component;
  };

  return {
    StyleSheet: {
      create: (styles) => styles,
      flatten: (style) => style,
    },
    Text: createComponent('Text'),
    View: createComponent('View'),
    Pressable: createComponent('Pressable'),
    ScrollView: createComponent('ScrollView'),
    TextInput: createComponent('TextInput'),
    Platform: {
      OS: 'ios',
      select: (options) => options.ios || options.default,
    },
    Dimensions: {
      get: () => ({ width: 375, height: 667 }),
    },
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-sqlite', () => ({
  openDatabaseSync: jest.fn(() => ({
    execSync: jest.fn(),
    getFirstAsync: jest.fn(async () => null),
    getAllAsync: jest.fn(async () => []),
    runAsync: jest.fn(async () => ({ lastInsertRowId: 1, changes: 1 })),
  })),
}));

jest.mock('expo-router', () => {
  const router = {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  };

  return {
    Link: ({ children, ...props }) => {
    const React = require('react');
    const { Text } = require('react-native');

    return React.createElement(Text, props, children);
    },
    useRouter: () => router,
    useLocalSearchParams: () => ({}),
    useGlobalSearchParams: () => ({}),
  };
});

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
}));
