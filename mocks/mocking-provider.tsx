import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';

async function enableMocking() {
  const { appVariant, storybookEnabled } = Constants.expoConfig?.extra || {};
  if (appVariant !== 'development' || storybookEnabled) {
    return;
  }

  await import('../msw.polyfills');
  const { server } = await import('./server');
  server.listen({
    onUnhandledRequest: 'bypass',
  });
}

export default function MockingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMockingEnabled, setIsMockingEnabled] = useState(false);

  useEffect(() => {
    enableMocking().then(() => {
      setIsMockingEnabled(true);
    });
  }, []);

  if (!isMockingEnabled) {
    return null;
  }

  return <>{children}</>;
}
