import type { Meta, StoryObj } from '@storybook/react';
import { BountyItem } from '../components/bounty-item';

const meta = {
  title: 'Bounty/Components/BountyItem',
  component: BountyItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClaim: { action: 'claimed' },
  },
} satisfies Meta<typeof BountyItem>;

export default meta;
type Story = StoryObj<typeof BountyItem>;

export const Default: Story = {
  args: {
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Study_Up-OhSfu9au8ZV2TIuOJrPOJmKjgu7hko.png',
    name: '김병찬, 박진명, 우이산',
    description: '김병찬(님)이 새로운 질문지를 생성했어요.',
    amount: 5000,
    onClaim: () => console.log('Claimed bounty'),
  },
};
