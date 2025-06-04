import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatView } from '../components/chat-view';
import { YStack } from 'tamagui';
import { http, HttpResponse, type PathParams } from 'msw';
import { ChatMessageDto } from '@/domains/group/api/types';
import { SuccessResponse } from '@/domains/base/api/types';
import { ChatMessageListResponse } from '@/domains/group/api/types';
import { server } from '@/mocks/server';

const meta: Meta<typeof ChatView> = {
  title: 'Chat/ChatView',
  component: ChatView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <YStack
        width={400}
        height={700}
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4">
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

const mockBotMessages: ChatMessageDto[] = [
  {
    id: '1',
    senderId: 0,
    senderType: 'BOT',
    content: '안녕하세요! 첫 번째 시스템 메시지입니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
  },
  {
    id: '2',
    senderId: 0,
    senderType: 'BOT',
    content:
      '두 번째 메시지입니다. 이 메시지는 조금 더 길 수 있습니다. 어떻게 보이는지 확인해 보세요.',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: '3',
    senderId: 0,
    senderType: 'BOT',
    content: '세 번째 시스템 메시지입니다. 학습을 시작해볼까요?',
    createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: '4',
    senderId: 0,
    senderType: 'BOT',
    content: '네 번째 메시지: 스크롤 테스트를 위해 메시지를 추가하고 있습니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: '5',
    senderId: 0,
    senderType: 'BOT',
    content:
      '다섯 번째 메시지: 충분한 양의 콘텐츠가 있어야 스크롤이 나타납니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '6',
    senderId: 0,
    senderType: 'BOT',
    content: '여섯 번째 메시지: 계속해서 메시지를 추가합니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: '7',
    senderId: 0,
    senderType: 'BOT',
    content: '일곱 번째 메시지: 스크롤바가 보이는지 확인해주세요.',
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: '8',
    senderId: 0,
    senderType: 'BOT',
    content: '여덟 번째 메시지: 거의 다 왔습니다!',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: '9',
    senderId: 0,
    senderType: 'BOT',
    content: '아홉 번째 메시지: 마지막에서 두 번째 메시지입니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: '10',
    senderId: 0,
    senderType: 'BOT',
    content: '열 번째 메시지: 이제 충분한 스크롤이 가능할 것입니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

const API_PREFIX_URL = process.env.EXPO_PUBLIC_API_URL || '';

type GroupMessagesResolverInfo = {
  request: Request;
  params: PathParams;
};

export const EmptyView: Story = {
  args: {
    groupId: 1,
  },
  parameters: {
    msw: {
      handlers: [
        http.get<PathParams, SuccessResponse<ChatMessageListResponse>>(
          `${API_PREFIX_URL}/groups/1/messages`,
          async ({ request, params }: GroupMessagesResolverInfo) => {
            return HttpResponse.json(
              {
                message: '성공',
                code: '200',
                data: {
                  messages: [],
                  currentPage: 0,
                  pageCount: 0,
                  chatMessageCount: 0,
                },
              },
              { status: 200 }
            );
          }
        ),
      ],
    },
  },
};

export const WithBotMessages: Story = {
  args: {
    groupId: 2,
  },
  parameters: {
    msw: {
      handlers: [
        http.get<PathParams, SuccessResponse<ChatMessageListResponse>>(
          `${API_PREFIX_URL}/groups/2/messages`,
          async ({ request, params }: GroupMessagesResolverInfo) => {
            return HttpResponse.json(
              {
                message: '성공',
                code: '200',
                data: {
                  messages: mockBotMessages,
                  currentPage: 0,
                  pageCount: 1,
                  chatMessageCount: mockBotMessages.length,
                },
              },
              { status: 200 }
            );
          }
        ),
      ],
    },
  },
};
