import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';

const isStorybookEnabled = Constants.expoConfig?.extra?.storybookEnabled;

async function enableReactotron() {
  if (!__DEV__ || isStorybookEnabled) {
    return;
  }

  const Reactotron = require('@/ReactotronConfig').default;
  Reactotron.log('ReactotronConfig loaded');
}

export default function ReactotronProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReactotronEnabled, setIsReactotronEnabled] = useState(false);

  useEffect(() => {
    enableReactotron().then(() => {
      console.log('Reactotron enabled');
      setIsReactotronEnabled(true);
    });
  }, []);

  if (!isReactotronEnabled) {
    return null;
  }

  return <>{children}</>;
}
