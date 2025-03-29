import React from 'react';
import { Button, Spinner, Text, YStack } from 'tamagui';
import { SuspenseProvider } from '@/components/SuspenseProvider';
import { router } from 'expo-router';
import { useSignInMutation } from '@/auth/api';

function Index() {
  const { mutate, isPending } = useSignInMutation({
    onSignIn: () => router.replace('/'),
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
