import React from 'react';
import { Paragraph, XStack, YStack } from 'tamagui';
import { format } from 'date-fns';
import { Bot } from '@tamagui/lucide-icons'; // 예시 아이콘

interface ChatMessageItemProps {
  senderDisplayName: string;
  content: string;
  timestamp: string; // ISO 8601 형식 또는 ZonedDateTime 문자열 표현
  isBot: boolean;
  botIcon?: React.ReactNode;
}

export function ChatMessageItem({
  senderDisplayName,
  content,
  timestamp,
  isBot,
  botIcon = <Bot size="$1" color="$blue10" />, // 기본 봇 아이콘
}: ChatMessageItemProps) {
  const alignItems = 'flex-start';
  const backgroundColor = '$blue2';
  const textColor = '$gray12';
  const senderColor = '$blue10';

  return (
    <YStack
      paddingHorizontal="$3"
      paddingVertical="$2"
      alignItems={alignItems}
      space="$1"
      alignSelf={alignItems}
      maxWidth="80%"
    >
      {isBot && (
        <XStack alignItems="center" space="$2">
          {botIcon}
          <Paragraph size="$2" color={senderColor} fontWeight="bold">
            {senderDisplayName}
          </Paragraph>
        </XStack>
      )}
      <YStack
        backgroundColor={backgroundColor}
        paddingVertical="$2"
        paddingHorizontal="$3"
        borderRadius="$4"
        marginLeft={isBot ? "$3" : "$0"}
      >
        <Paragraph color={textColor}>{content}</Paragraph>
      </YStack>
      <Paragraph
        size="$1"
        color="$gray8"
        textAlign="left"
        marginLeft={isBot ? "$3" : "$0"}
      >
        {format(new Date(timestamp), 'yyyy-MM-dd HH:mm')}
      </Paragraph>
    </YStack>
  );
} 