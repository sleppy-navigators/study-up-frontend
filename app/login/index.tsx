import React from 'react';
import { useGoogleSignInMutation } from '../../hooks/useGoogleSignIn';
import { Button, YStack } from 'tamagui';

const GoogleSignInComponent = () => {
  const { mutate, isPending } = useGoogleSignInMutation();

  return (
    <YStack p="$4" gap="$4">
      <Button onPress={() => mutate()} themeInverse disabled={isPending}>
        {isPending ? 'Signing in...' : 'Sign in with Google'}
      </Button>
    </YStack>
  );
};

export default GoogleSignInComponent;
