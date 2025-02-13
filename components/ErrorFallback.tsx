import { YStack, Text, Button, XStack } from 'tamagui';
import { match, P } from 'ts-pattern';
import { router } from 'expo-router';
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
  error: Error & { resetOptions?: ResetOptions };
  resetError?: (resetOptions?: ResetOptions) => void;
}

export const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => {
  const errorInfo = match(error)
    .with(P.instanceOf(UnauthorizedError), () => ({
      icon: '🔒',
      title: '로그인이 필요해요',
      message: error.message,
      action: {
        label: '로그인하러 가기',
        onPress: () => router.replace('/login'),
      },
    }))
    .with(P.instanceOf(NetworkError), () => ({
      icon: '📶',
      title: '연결 실패',
      message: error.message,
      action: {
        label: '다시 시도',
        onPress: resetError,
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
          onPress: resetError,
        },
      })
    )
    .with(P.instanceOf(TimeoutError), () => ({
      icon: '⏳',
      title: '요청 시간 초과',
      message: error.message,
      action: {
        label: '다시 시도',
        onPress: resetError,
      },
    }))
    .with(P.instanceOf(ValidationError), () => ({
      icon: '📝',
      title: '입력값 오류',
      message: error.message,
      action: {
        label: '확인',
        onPress: resetError,
      },
    }))
    .otherwise(() => ({
      icon: '😥',
      title: '오류가 발생했어요',
      message: error.message,
      action: {
        label: '다시 시도',
        onPress: resetError,
      },
    }));

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
        onPress={errorInfo.action.onPress}>
        <Text color="white" fontSize="$4" fontWeight="bold">
          {errorInfo.action.label}
        </Text>
      </Button>
    </YStack>
  );
};
