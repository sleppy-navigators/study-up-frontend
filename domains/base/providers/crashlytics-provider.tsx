import React from 'react';
import { useEffect } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';

export default function CrashlyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    crashlytics().log('App has started');
  }, []);

  return <>{children}</>;
}
