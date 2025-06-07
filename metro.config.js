// metro.config.js
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const customConfig = mergeConfig(config, {
  transformer: {
    unstable_allowRequireContext: true,
  },

  resolver: {
    unstable_enablePackageExports: true,
    resolverMainFields: ['react-native', 'node', 'browser', 'main'],
    unstable_conditionNames: ['react-native', 'require', 'default'],
  },
});

const withStorybookConfig = withStorybook(customConfig, {
  // Set to false to remove storybook specific options
  // you can also use a env variable to set this
  enabled: !!process.env.STORYBOOK_ENABLED,
  // Path to your storybook config
  configPath: path.resolve(__dirname, './.storybook'),

  onDisabledRemoveStorybook: !process.env.STORYBOOK_ENABLED,

  // Optional websockets configuration
  // Starts a websocket server on the specified port and host on metro start
  // websockets: {
  //   port: 7007,
  //   host: 'localhost',
  // },
});

module.exports = withStorybookConfig;
