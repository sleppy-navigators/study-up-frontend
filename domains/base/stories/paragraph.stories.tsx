import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '../components/paragraph';
import { YStack, XStack } from 'tamagui';
import { Star } from '@tamagui/lucide-icons';
import { Text } from 'tamagui';
const STORY_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const LONG_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
    4
  );
const MAX_LINES = 2;

const meta: Meta<typeof Paragraph> = {
  title: 'Base/Components/Paragraph',
  component: Paragraph,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {
  render: () => <Paragraph>{STORY_TEXT}</Paragraph>,
};

export const SizeVariants: Story = {
  render: () => (
    <YStack gap="$2">
      <Paragraph size="$2">Small size ($2)</Paragraph>
      <Paragraph size="$4">Default size ($4)</Paragraph>
      <Paragraph size="$6">Large size ($6)</Paragraph>
    </YStack>
  ),
};

export const ThemeVariants: Story = {
  render: () => (
    <YStack gap="$2">
      <Paragraph theme="alt1">Theme: alt1</Paragraph>
      <Paragraph theme="alt2">Theme: alt2</Paragraph>
    </YStack>
  ),
};

export const Truncated: Story = {
  render: () => <Paragraph numberOfLines={MAX_LINES}>{LONG_TEXT}</Paragraph>,
};

export const WithAccessibilityLabel: Story = {
  render: () => (
    <Paragraph accessibilityLabel="Descriptive paragraph for screen readers">
      {STORY_TEXT}
    </Paragraph>
  ),
};

export const ConditionalStyling: Story = {
  render: () => (
    <Paragraph
      color="purple"
      fontWeight="bold"
      backgroundColor="#f3e8ff"
      padding={8}>
      Paragraph with custom conditional styling
    </Paragraph>
  ),
};

export const InContext: Story = {
  render: () => (
    <YStack gap="$3">
      <Paragraph>Above the stack</Paragraph>
      <XStack gap="$2" alignItems="center">
        <Paragraph>Left</Paragraph>
        <Paragraph>Right</Paragraph>
      </XStack>
      <Paragraph>Below the stack</Paragraph>
    </YStack>
  ),
};

export const WithInlineElements: Story = {
  render: () => (
    <Paragraph>
      <Star size={16} color="#fbbf24" style={{ marginRight: 4 }} />
      <Text tag="b">Important:</Text> This is a paragraph with an inline icon
      and bold text.
    </Paragraph>
  ),
};
