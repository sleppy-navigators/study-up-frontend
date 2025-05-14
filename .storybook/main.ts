import { StorybookConfig } from '@storybook/react-native';
import path from 'path';

const main: StorybookConfig = {
  stories: ['../domains/*/stories/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
};

export default main;
