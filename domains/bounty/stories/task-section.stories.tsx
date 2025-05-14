import type { Meta, StoryObj } from '@storybook/react';
import { TaskSection } from '../components/task-section';
import type { TaskItemProps } from '../components/task-item';

const meta = {
  title: 'Bounty/Components/TaskSection',
  component: TaskSection,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof TaskSection>;

export default meta;
type Story = StoryObj<typeof TaskSection>;

const exampleItems: TaskItemProps[] = [
  {
    title: '프로그래머스 15245 문제 풀기',
    description: '코딩테스트 준비 · Steppy Navigators',
    onVerify: () => console.log('Verified task 1'),
  },
  {
    title: 'React Native Expo 앱 빌드',
    description: '모바일 개발 · Study Up',
    onVerify: () => console.log('Verified task 2'),
  },
];

export const Default: Story = {
  args: {
    items: exampleItems,
  },
};
