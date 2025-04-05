import type React from 'react';
import { ArrowLeft, Plus, Search, UserPlus } from '@tamagui/lucide-icons';
import { Button, H2, Paragraph, XStack, YStack } from 'tamagui';
import { usePathname, useRouter } from 'expo-router';

export interface HeaderAction {
  icon: React.ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
}

export interface HeaderProps {
  title?: string;
  onBack?: () => void;
  onAdd?: () => void;
  actions?: HeaderAction[];
  children?: React.ReactNode;
}

// 라우트별 헤더 설정
const ROUTE_HEADERS: Record<
  string,
  Omit<HeaderProps, 'onBack' | 'onAdd' | 'actions'> & {
    showBackButton?: boolean;
    showAddButton?: boolean;
  }
> = {
  '/bounty': {
    title: '바운티',
    showBackButton: true,
    children: <Paragraph theme="alt2">최대 30천원 수령 가능</Paragraph>,
  },
  '/group': {
    title: '그룹',
    showBackButton: true,
    showAddButton: true,
  },
};

export function Header(props: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // 라우트 기반 설정과 직접 전달된 props 병합
  const routeConfig = ROUTE_HEADERS[pathname] || {};

  const title = props.title || routeConfig.title || '';
  const children = props.children || routeConfig.children;

  // 뒤로가기 핸들러
  const handleBack =
    props.onBack ||
    (routeConfig.showBackButton ? () => router.back() : undefined);

  // 추가 버튼 핸들러
  const handleAdd =
    props.onAdd ||
    (routeConfig.showAddButton
      ? () => router.push('/group/create')
      : undefined);

  return (
    <YStack backgroundColor="$background">
      <XStack
        height="$6"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="$4">
        <XStack alignItems="center" gap="$2">
          {handleBack && (
            <Button
              chromeless
              onPress={handleBack}
              icon={<ArrowLeft size="$1.5" />}
            />
          )}
          <H2>{title}</H2>
        </XStack>

        <XStack gap="$2">
          {props.actions?.map((action, index) => (
            <Button
              key={index}
              size="$3"
              circular
              backgroundColor="$yellow9"
              onPress={action.onPress}
              accessibilityLabel={action.accessibilityLabel}>
              {action.icon}
            </Button>
          ))}

          {handleAdd && !props.actions && (
            <Button
              size="$3"
              circular
              backgroundColor="$yellow9"
              onPress={handleAdd}>
              <Plus size="$1.5" color="$color" />
            </Button>
          )}
        </XStack>
      </XStack>

      {children && (
        <YStack padding="$4" paddingTop="$0">
          {children}
        </YStack>
      )}
    </YStack>
  );
}

// 편의를 위한 헤더 액션 생성 함수들
export const createSearchAction = (onPress: () => void): HeaderAction => ({
  icon: <Search size="$1.5" color="$color" />,
  onPress,
  accessibilityLabel: '검색',
});

export const createInviteAction = (onPress: () => void): HeaderAction => ({
  icon: <UserPlus size="$1.5" color="$color" />,
  onPress,
  accessibilityLabel: '초대',
});
