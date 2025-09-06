import type { Meta, StoryObj } from '@storybook/react-vite';

import { EmotionCategoryButton as EmotionCategoryButtonComp } from './emotion-category-button';

const meta: Meta<typeof EmotionCategoryButtonComp> = {
  component: EmotionCategoryButtonComp
};

export default meta;
type Story = StoryObj<typeof EmotionCategoryButtonComp>;

export const EmotionCategoryButton: Story = {
  args: {
    children: 'Button',
  }
};
