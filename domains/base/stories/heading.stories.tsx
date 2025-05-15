import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from '../components/heading';

const meta: Meta = {
  title: 'Base/Components/Heading',
  component: Heading1,
} satisfies Meta<typeof Heading1>;

const STORY_TEXT = 'Lorem ipsum dolor sit amet';

export default meta;

export const H1: StoryObj = {
  render: () => <Heading1>{STORY_TEXT}</Heading1>,
};

export const H2: StoryObj = {
  render: () => <Heading2>{STORY_TEXT}</Heading2>,
};

export const H3: StoryObj = {
  render: () => <Heading3>{STORY_TEXT}</Heading3>,
};

export const H4: StoryObj = {
  render: () => <Heading4>{STORY_TEXT}</Heading4>,
};

export const H5: StoryObj = {
  render: () => <Heading5>{STORY_TEXT}</Heading5>,
};

export const H6: StoryObj = {
  render: () => <Heading6>{STORY_TEXT}</Heading6>,
};
