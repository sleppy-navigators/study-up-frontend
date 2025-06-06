import React from 'react';
import Constants from 'expo-constants';

const isStorybookEnabled = Constants.expoConfig?.extra?.storybookEnabled;

function App({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

let AppEntryPoint = App;

if (isStorybookEnabled) {
  const { default: StorybookUIRoot } = require('@/.storybook');
  AppEntryPoint = StorybookUIRoot;
}

export default AppEntryPoint;
