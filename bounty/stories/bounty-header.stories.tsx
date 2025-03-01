import type { Meta, StoryObj } from '@storybook/react';
import { BountyHeader } from '../components/bounty-header';

const meta = {
  title: 'Bounty/BountyHeader',
  component: BountyHeader,
} satisfies Meta<typeof BountyHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
