import type { Meta, StoryObj } from '@storybook/react';
import { BountyPage } from '../pages/bounty-page';

const meta: Meta<typeof BountyPage> = {
  title: 'Base/Pages/BountyPage',
  component: BountyPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BountyPage>;

export const Default: Story = {};
