import React, { useEffect, useState } from 'react';

async function enableMocking() {
  if (!__DEV__) {
    return;
  }

  await import('../msw.polyfills.js');
  const { server } = await import('./server');
  server.listen();
}

export default function MockingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMockingEnabled, setIsMockingEnabled] = useState(false);

  useEffect(() => {
    enableMocking().then(() => {
      console.log('Mocking enabled');
      setIsMockingEnabled(true);
    });
  }, []);

  if (!isMockingEnabled) {
    return null;
  }

  return <>{children}</>;
}
