import React, { useEffect, useState } from 'react';

async function enableReactotron() {
  if (!__DEV__) {
    return;
  }

  await import('@/ReactotronConfig');
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
