import React, { useEffect, useState } from 'react';
import { ScrollView, YStack, Paragraph, Spinner } from 'tamagui';
import { ChatMessageItem, ChatMessageItemProps } from './chat-message-item';
import { useGroupMessagesQuery } from '@/domains/group/api';
import { Pageable } from '@/domains/base/api/types';
import { ChatMessageDto } from '@/domains/group/api/types';
import { connectWebSocket, disconnectWebSocket } from '@/domains/chat/api';

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
  };

  const { data: groupMessagesData, isLoading: isLoadingMessages } =
    useGroupMessagesQuery(groupId, initialPageable);

  const [messages, setMessages] = useState<ChatViewMessage[]>([]);

  useEffect(() => {
    if (groupMessagesData?.messages) {
      const mappedMessages = groupMessagesData.messages.map(
        (msg: ChatMessageDto) => ({
          id: msg.id,
          senderDisplayName:
            msg.senderType === 'BOT' ? 'StudyUpBot' : `사용자 ${msg.senderId}`,
          content: msg.content,
          timestamp: msg.createdAt,
          isBot: msg.senderType === 'BOT',
        })
      );
      const sortedMessages = mappedMessages.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setMessages(sortedMessages);
    }
  }, [groupMessagesData]);

  useEffect(() => {
    if (groupId && !isLoadingMessages) {
      const handleNewMessage = (newMessageDto: ChatMessageDto) => {
        setMessages((prevMessages) => {
          if (prevMessages.some((msg) => msg.id === newMessageDto.id)) {
            return prevMessages;
          }
          const formattedNewMessage: ChatViewMessage = {
            id: newMessageDto.id,
            senderDisplayName:
              newMessageDto.senderType === 'BOT'
                ? 'StudyUpBot'
                : `사용자 ${newMessageDto.senderId}`,
            content: newMessageDto.content,
            timestamp: newMessageDto.createdAt,
            isBot: newMessageDto.senderType === 'BOT',
          };
          return [...prevMessages, formattedNewMessage].sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
        });
      };

      connectWebSocket({
        groupId,
        onMessageReceived: handleNewMessage,
        onConnect: () =>
          console.log(`ChatView: WebSocket connected for group ${groupId}`),
        onError: (error, errorMessage) =>
          console.error(
            `ChatView: WebSocket error for group ${groupId}:`,
            errorMessage,
            error
          ),
        onDisconnect: () =>
          console.log(`ChatView: WebSocket disconnected for group ${groupId}`),
      });

      return () => {
        disconnectWebSocket();
      };
    }
  }, [groupId, isLoadingMessages]);

  if (isLoadingMessages && messages.length === 0) {
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
        contentContainerStyle={{ paddingBottom: 20 }}>
        <YStack space="$3" flexDirection="column-reverse">
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
