import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from '../components/list-item';

const meta = {
  title: 'Base/Components/ListItem',
  component: ListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: 'https://picsum.photos/200',
    title: '스터디 그룹',
    description: '새로운 그룹입니다.',
  },
};

export const WithoutImage: Story = {
  args: {
    title: '스터디 그룹',
    description: '새로운 그룹입니다.',
  },
};
