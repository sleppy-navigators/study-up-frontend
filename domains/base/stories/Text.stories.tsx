import { H1, H2, H3, H4, H5, Paragraph as ParagraphText, Text } from 'tamagui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Base/Components/Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

export const Heading1: Story = {
  render: () => (
    <H1>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </H1>
  ),
};

export const Heading2: Story = {
  render: () => (
    <H2>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </H2>
  ),
};

export const Heading3: Story = {
  render: () => (
    <H3>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </H3>
  ),
};

export const Heading4: Story = {
  render: () => (
    <H4>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </H4>
  ),
};

export const Heading5: Story = {
  render: () => (
    <H5>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </H5>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <ParagraphText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </ParagraphText>
  ),
};
