import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { GroupDetailPage } from '@/domains/group/pages/group-detail-page';

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const groupId = id ? parseInt(id, 10) : 0;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <GroupDetailPage groupId={groupId} />
    </>
  );
}
