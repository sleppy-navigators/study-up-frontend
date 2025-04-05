import React from 'react';
import { Button, Spinner, Text, YStack } from 'tamagui';
import { SuspenseProvider } from '@/components/SuspenseProvider';
import { Route, router, useLocalSearchParams } from 'expo-router';
import { useSignInMutation } from '@/auth/api';

function Index() {
  const { redirectTo } = useLocalSearchParams();
  const { mutate, isPending } = useSignInMutation({
    onSignIn: () => {
      router.replace((redirectTo as Route) || '/');
    },
  });

  const handlePress = () => {
    mutate({ provider: 'GOOGLE' });
  };

  return (
    <SuspenseProvider>
      <YStack>
        <Button onPress={handlePress} themeInverse disabled={isPending}>
          <Text>{isPending ? <Spinner /> : '구글로 로그인하기'}</Text>
        </Button>
      </YStack>
    </SuspenseProvider>
  );
}

export default Index;
