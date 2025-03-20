import React from 'react';
import { Avatar, Text, XStack, YStack } from 'tamagui';
import { User } from '@/user/api/types';

interface UserListItemProps {
  user: User;
}

export function UserListItem({ user }: UserListItemProps) {
  // 사용자 이니셜 생성
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <XStack space="$3" alignItems="center" flex={1}>
      <Avatar circular size="$4" backgroundColor="$yellow9">
        <Avatar.Fallback>
          <Text color="white" fontWeight="bold">
            {getInitials(user.name)}
          </Text>
        </Avatar.Fallback>
      </Avatar>
      <YStack>
        <Text fontWeight="bold">{user.name}</Text>
        <Text fontSize="$2" color="$gray9">
          {user.email}
        </Text>
      </YStack>
    </XStack>
  );
}
