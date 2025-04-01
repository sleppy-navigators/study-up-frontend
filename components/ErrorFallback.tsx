import React, { useEffect } from 'react';
import { YStack, Text, Button, XStack } from 'tamagui';
import { match, P } from 'ts-pattern';
import {
  UnauthorizedError,
  NetworkError,
  ServerError,
  ServiceUnavailableError,
  TimeoutError,
  ValidationError,
  ResetOptions,
} from '../lib/errors/http';

interface ErrorFallbackProps {
  error: Error;
  onReset: (resetOptions: ResetOptions) => void;
}

export const ErrorFallback = ({ error, onReset }: ErrorFallbackProps) => {
  const handlePress = () => {
    const resetOptions = (error as { resetOptions?: ResetOptions })
      .resetOptions || {
      shouldClearCache: true,
    };
    onReset(resetOptions);
  };

  const errorInfo = match(error)
    .with(P.instanceOf(UnauthorizedError), () => ({
      icon: '🔒',
      title: '로그인이 필요해요',
      message: error.message,
      action: {
        label: '로그인하러 가기',
        onPress: handlePress,
      },
    }))
    .with(P.instanceOf(NetworkError), () => ({
      icon: '📶',
      title: '연결 실패',
      message: error.message,
      action: {
        label: '다시 시도',
        onPress: handlePress,
      },
    }))
    .with(
      P.instanceOf(ServerError),
      P.instanceOf(ServiceUnavailableError),
      () => ({
        icon: '🔧',
        title: '서버 오류',
        message: error.message,
        action: {
          label: '새로고침',
          onPress: handlePress,
        },
      })
    )
    .with(P.instanceOf(TimeoutError), () => ({
      icon: '⏳',
      title: '요청 시간 초과',
      message: error.message,
      action: {
        label: '다시 시도',
        onPress: handlePress,
      },
    }))
    .with(P.instanceOf(ValidationError), () => ({
      icon: '📝',
      title: '입력값 오류',
      message: error.message,
      action: {
        label: '확인',
        onPress: handlePress,
      },
    }))
    .otherwise(() => ({
      icon: '😥',
      title: '오류가 발생했어요',
      message: error.message,
      action: {
        label: '다시 시도',
        onPress: handlePress,
      },
    }));

  useEffect(() => {
    if (error instanceof UnauthorizedError) {
      const resetOptions = error.resetOptions;
      onReset(resetOptions);
    }
  }, [error, onReset]);

  return (
    <YStack flex={1} gap="$4">
      <XStack justifyContent="center" alignItems="center">
        <Text fontSize="$8">{errorInfo.icon}</Text>
        <Text fontSize="$6" fontWeight="bold">
          {errorInfo.title}
        </Text>
      </XStack>
      <Text fontSize="$4" opacity={0.7}>
        {errorInfo.message}
      </Text>
      <Button
        backgroundColor="$blue9"
        paddingVertical="$3"
        paddingHorizontal="$4"
        borderRadius="$4"
        onPress={handlePress}>
        <Text color="white" fontSize="$4" fontWeight="bold">
          {errorInfo.action.label}
        </Text>
      </Button>
    </YStack>
  );
};
