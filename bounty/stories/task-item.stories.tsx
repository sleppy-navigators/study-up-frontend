import type { Meta, StoryObj } from '@storybook/react';
import { TaskItem } from '../components/task-item';

const meta: Meta<typeof TaskItem> = {
  title: 'Base/Components/TaskItem',
  component: TaskItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onVerify: { action: 'verified' },
  },
};

export default meta;
type Story = StoryObj<typeof TaskItem>;

export const Default: Story = {
  args: {
    title: '프로그래머스 15245 문제 풀기',
    provider: '코딩테스트 준비 · Steppy Navigators',
    onVerify: () => console.log('Verified task'),
  },
};
