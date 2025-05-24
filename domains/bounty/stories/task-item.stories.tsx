import type { Meta, StoryObj } from '@storybook/react';
import { TaskItem } from '../components/task-item';

const meta = {
  title: 'Bounty/Components/TaskItem',
  component: TaskItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onVerify: { action: 'verified' },
  },
} satisfies Meta<typeof TaskItem>;

export default meta;
type Story = StoryObj<typeof TaskItem>;

export const Default: Story = {
  args: {
    title: '프로그래머스 15245 문제 풀기',
    description: '코딩테스트 준비 · Steppy Navigators',
    onVerify: () => console.log('Verified task'),
  },
};
