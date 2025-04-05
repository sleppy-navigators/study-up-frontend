import React from 'react';
import { Spinner, YStack, SpinnerProps, YStackProps } from 'tamagui';

interface LoadingSpinnerProps {
  /**
   * 스피너 크기 (기본값: 'large')
   */
  size?: SpinnerProps['size'];

  /**
   * 컨테이너에 적용할 추가 스타일
   */
  containerProps?: YStackProps;

  /**
   * 스피너에 적용할 추가 속성
   */
  spinnerProps?: SpinnerProps;
}

/**
 * 로딩 스피너 컴포넌트
 * 화면 중앙에 스피너를 표시합니다.
 */
export function LoadingSpinner({
  size = 'large',
  containerProps,
  spinnerProps,
}: LoadingSpinnerProps) {
  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      {...containerProps}>
      <Spinner size={size} {...spinnerProps} />
    </YStack>
  );
}
