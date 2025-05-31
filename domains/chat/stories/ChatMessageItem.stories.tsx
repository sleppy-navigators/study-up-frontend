import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessageItem } from '../components/ChatMessageItem';
import { YStack } from 'tamagui';
import { Smile, AlertTriangle } from '@tamagui/lucide-icons';

const meta: Meta<typeof ChatMessageItem> = {
  title: 'Chat/ChatMessageItem',
  component: ChatMessageItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <YStack width={350} space="$3" backgroundColor="$background" padding="$3" borderRadius="$4">
        <Story />
      </YStack>
    ),
  ],
  argTypes: {
    senderDisplayName: { control: 'text' },
    content: { control: 'text' },
    timestamp: { control: 'text' },
    isBot: { control: 'boolean' },
    botIcon: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof ChatMessageItem>;

const defaultTimestamp = new Date().toISOString();

export const DefaultBotMessage: Story = {
  render: () => (
    <ChatMessageItem
      isBot={true}
      timestamp={defaultTimestamp}
      senderDisplayName="StudyUpBot"
      content="안녕하세요! 오늘 학습할 내용을 알려드릴게요. 새로운 과제가 등록되었습니다."
    />
  ),
};

export const LongContentBotMessage: Story = {
  render: () => (
    <ChatMessageItem
      isBot={true}
      timestamp={new Date(Date.now() - 1000 * 60 * 5).toISOString()}
      senderDisplayName="NotificationBot"
      content={`이 메시지는 매우 긴 텍스트를 포함하고 있습니다. 컴포넌트가 최대 너비 제한(maxWidth="80%")을 잘 따르는지, 그리고 텍스트 줄바꿈이 올바르게 처리되는지 확인하기 위한 테스트 메시지입니다. 이렇게 계속해서 내용을 추가하여 길이를 늘려보겠습니다. 화면에서는 어떻게 보일지 궁금하네요.`}
    />
  ),
};

export const CustomIconBotMessage: Story = {
  render: () => (
    <ChatMessageItem
      isBot={true}
      timestamp={new Date(Date.now() - 1000 * 60 * 10).toISOString()}
      senderDisplayName="HelperBot"
      content="궁금한 점이 있다면 언제든지 저에게 물어보세요! 친절하게 답변해 드립니다."
      botIcon={<Smile size="$1" color="$green10" />}
    />
  ),
};

export const AlertBotMessage: Story = {
  render: () => (
    <ChatMessageItem
      isBot={true}
      timestamp={new Date(Date.now() - 1000 * 60 * 15).toISOString()}
      senderDisplayName="AlertBot"
      content="주의: 데이터 동기화 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      botIcon={<AlertTriangle size="$1" color="$red10" />}
    />
  ),
};

export const InteractiveBotMessage: Story = {
    args: {
        isBot: true,
        timestamp: new Date().toISOString(),
        senderDisplayName: 'InteractiveBot',
        content: 'Storybook Controls에서 내용을 수정해보세요!',
    },
}; 