import React from 'react';
import Constants from 'expo-constants';
import StorybookUIRoot from '../../.storybook';

export default function StorybookProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isStorybookEnabled = Constants.expoConfig?.extra?.storybookEnabled;

  if (isStorybookEnabled) {
    return <StorybookUIRoot />;
  }

  return <>{children}</>;
}
