import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { GroupDetailPage } from '@/group/pages/group-detail-page-new';

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const groupId = id ? parseInt(id, 10) : 0;

  return <GroupDetailPage groupId={groupId} />;
}
