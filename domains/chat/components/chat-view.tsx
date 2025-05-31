import React from 'react';
import { ScrollView, YStack, Paragraph, Spinner } from 'tamagui';
import { ChatMessageItem, ChatMessageItemProps } from './chat-message-item';
import { useGroupMessagesQuery } from '@/domains/group/api';
import { Pageable } from '@/domains/base/api/types';
import { ChatMessageDto } from '@/domains/group/api/types';

// TODO
// 1. 맨 처음 페이지 로딩될 때 group/api/index.tsx의 "getGroupMessages" 호출하여 데이터 받아와서 뷰에 보여주기
// 2. 실시간으로 시스템 메시지 채팅을 받아야하므로, chat/api/index.tsx에서 백엔드로 웹 소켓 연결해서 데이터 받아와서 뷰에 보여주기

export interface ChatViewMessage extends ChatMessageItemProps {
  id: string;
}

export interface ChatViewProps {
  groupId: number;
}

export function ChatView({ groupId }: ChatViewProps) {
  const initialPageable: Pageable = {
    page: 0,
    size: 20,
    sort: ['createdAt,desc'],
  };

  const { data: groupMessagesData, isLoading: isLoadingMessages } =
    useGroupMessagesQuery(groupId, initialPageable);

  const messages: ChatViewMessage[] =
    groupMessagesData?.messages.map((msg: ChatMessageDto) => ({
      id: msg.id,
      senderDisplayName: msg.senderType === 'BOT' ? 'StudyUpBot' : `사용자 ${msg.senderId}`,
      content: msg.content,
      timestamp: msg.createdAt,
      isBot: msg.senderType === 'BOT',
    })) || [];

  if (isLoadingMessages) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$yellow9" />
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="$backgroundFocus">
      <ScrollView
        flex={1}
        padding="$3"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <YStack space="$3">
          {messages.length === 0 && !isLoadingMessages && (
            <Paragraph textAlign="center" color="$gray10">
              표시할 메시지가 없습니다.
            </Paragraph>
          )}
          {messages.map((msg) => (
            <ChatMessageItem key={msg.id} {...msg} />
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  );
} 