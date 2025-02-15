import { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ReactNode } from 'react';

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);

interface SuspenseProviderProps {
  children: ReactNode;
}

export const SuspenseProvider = ({ children }: SuspenseProviderProps) => {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
};
