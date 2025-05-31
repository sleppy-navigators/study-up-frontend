import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatView, ChatViewMessage } from '../components/chat-view';
import { YStack } from 'tamagui';

const meta: Meta<typeof ChatView> = {
  title: 'Chat/ChatView',
  component: ChatView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <YStack width={400} height={700} borderWidth={1} borderColor="$borderColor" borderRadius="$4">
        <Story />
      </YStack>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ChatView>;

const defaultTimestamp = new Date().toISOString();

export const EmptyView: Story = {
  args: {
    messages: [],
  },
};

const botMessages: ChatViewMessage[] = [
  {
    id: '1',
    senderDisplayName: 'StudyUpBot',
    content: '안녕하세요! 첫 번째 시스템 메시지입니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    isBot: true,
  },
  {
    id: '2',
    senderDisplayName: 'NotificationBot',
    content: '두 번째 메시지입니다. 이 메시지는 조금 더 길 수 있습니다. 어떻게 보이는지 확인해 보세요.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    isBot: true,
  },
  {
    id: '3',
    senderDisplayName: 'StudyUpBot',
    content: '세 번째 시스템 메시지입니다. 학습을 시작해볼까요?',
    timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    isBot: true,
  },
  {
    id: '4',
    senderDisplayName: 'StudyUpBot',
    content: '네 번째 메시지: 스크롤 테스트를 위해 메시지를 추가하고 있습니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    isBot: true,
  },
  {
    id: '5',
    senderDisplayName: 'NotificationBot',
    content: '다섯 번째 메시지: 충분한 양의 콘텐츠가 있어야 스크롤이 나타납니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    isBot: true,
  },
  {
    id: '6',
    senderDisplayName: 'StudyUpBot',
    content: '여섯 번째 메시지: 계속해서 메시지를 추가합니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    isBot: true,
  },
  {
    id: '7',
    senderDisplayName: 'NotificationBot',
    content: '일곱 번째 메시지: 스크롤바가 보이는지 확인해주세요.',
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    isBot: true,
  },
  {
    id: '8',
    senderDisplayName: 'StudyUpBot',
    content: '여덟 번째 메시지: 거의 다 왔습니다!',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    isBot: true,
  },
  {
    id: '9',
    senderDisplayName: 'NotificationBot',
    content: '아홉 번째 메시지: 마지막에서 두 번째 메시지입니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    isBot: true,
  },
  {
    id: '10',
    senderDisplayName: 'StudyUpBot',
    content: '열 번째 메시지: 이제 충분한 스크롤이 가능할 것입니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    isBot: true,
  },
];

export const WithBotMessages: Story = {
  args: {
    messages: botMessages,
  },
}; 