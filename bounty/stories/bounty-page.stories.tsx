import type { Meta, StoryObj } from '@storybook/react';
import { BountyPage } from '../pages/bounty-page';

const meta = {
  title: 'Bounty/Pages/BountyPage',
  component: BountyPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BountyPage>;

export default meta;
type Story = StoryObj<typeof BountyPage>;

export const Default: Story = {};
