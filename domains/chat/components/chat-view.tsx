import React from 'react';
import { ScrollView, YStack, Paragraph } from 'tamagui';
import { ChatMessageItem, ChatMessageItemProps } from './chat-message-item';

export interface ChatViewMessage extends ChatMessageItemProps {
  id: string;
}

export interface ChatViewProps {
  messages: ChatViewMessage[];
}

export function ChatView({ messages }: ChatViewProps) {
  return (
    <YStack flex={1} backgroundColor="$backgroundFocus">
      <ScrollView
        flex={1}
        padding="$3"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <YStack space="$3">
          {messages.length === 0 && (
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