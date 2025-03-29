import { Slot } from 'expo-router';
import { ErrorFallback } from '@/components/ErrorFallback';
import { useRecoverFromError } from '@/hooks/useRecoverFromError';
import { ResetOptions } from '@/lib/errors/http';
import { ErrorBoundaryProps } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { BottomNavigation } from '@/base/components/bottom-navigation';
import { YStack } from 'tamagui';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const { recoverFromError } = useRecoverFromError();

  const handleReset = useCallback(
    async (resetOptions: ResetOptions) => {
      await recoverFromError(resetOptions);
      retry();
    },
    [recoverFromError, retry]
  );

  return <ErrorFallback error={error} onReset={handleReset} />;
}

export default function Layout() {
  const [activeTab, setActiveTab] = useState<'home' | 'community' | 'profile'>(
    'home'
  );

  return (
    <YStack flex={1} backgroundColor="$background">
      <YStack flex={1} pb="$6">
        <Slot />
      </YStack>
      <YStack position="absolute" bottom={0} left={0} right={0} zIndex={100}>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </YStack>
    </YStack>
  );
}
