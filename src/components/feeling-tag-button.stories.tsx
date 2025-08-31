import type { Meta, StoryObj } from '@storybook/react-vite';

import { FeelingTagButton as FeelingTagButtonComp } from './feeling-tag-button';

const meta: Meta<typeof FeelingTagButtonComp> = {
  component: FeelingTagButtonComp
};

export default meta;
type Story = StoryObj<typeof FeelingTagButtonComp>;

export const FeelingTagButton: Story = {
  args: {
    children: '☺️ 기쁨',
  }
};
