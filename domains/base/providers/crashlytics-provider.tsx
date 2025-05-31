import React from 'react';
import { useEffect } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';

async function initializeCrashlytics() {
  console.log('Crashlytics is initializing...');
  await crashlytics().setCrashlyticsCollectionEnabled(true);
  console.log('Crashlytics has been initialized.');
  crashlytics().crash();
  console.log('Crashlytics has crashed for testing.');
}

export default function CrashlyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initializeCrashlytics();
  }, []);

  return <>{children}</>;
}
